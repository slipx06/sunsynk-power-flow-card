import { HassEntity } from 'home-assistant-js-websocket/dist/types';
import { Utils } from '../../helpers/utils';
import {
	Percentage,
	UnitOfElectricalCurrent,
	UnitOfEnergy,
	UnitOfPower,
} from '../../const';

/**
 * CustomEntity interface represents a custom entity in Home Assistant.
 * - this entity aids in reducing common boiler plate code. the end goal is that we can just use the state object instead of multiple vars
 */
export interface CustomEntity extends HassEntity {
	state: string;
	decimals: number;
	measurement:
		| UnitOfPower
		| UnitOfEnergy
		| UnitOfElectricalCurrent
		| Percentage
		| 'NA';

	/**
	 * Extension of Utils.toNum, returns the state in a number
	 * @param decimals
	 * @param invert
	 */
	toNum(decimals?: number, invert?: boolean): number;

	/**
	 * Desired display output, extrapolated from decimals and measurement
	 */
	toDisplay(): string;

	toString(): string;

	/**
	 * Checks that the state is not null, undefined or unknown
	 */
	isValid(): boolean;

	/**
	 * Checks that the state is not equal to ''
	 */
	notEmpty(): boolean;

	isNaN(): boolean;

	/**
	 * Auto converts the state to watts/kilowatts
	 * @param invert
	 */
	toPower(invert?: boolean): number;

	/**
	 * Auto converts the state to watts/kilowatts, with the suffix
	 * @param invert
	 * @param decimals
	 * @param scale
	 */
	toPowerString(scale?: boolean, decimals?: number, invert?: boolean): string;

	getUOM(): UnitOfPower | UnitOfEnergy | UnitOfElectricalCurrent;
}

// Function to convert HassEntity to CustomEntity
export function convertToCustomEntity(
	entity: any,
	measurement:
		| UnitOfPower
		| UnitOfEnergy
		| UnitOfElectricalCurrent
		| Percentage
		| 'NA' = 'NA',
	decimals: number = -1,
): CustomEntity {
	// Attempt to reuse cached wrapper when a stable identity is present
	const cacheableId = entity?.entity_id as string | undefined;
	const convertKey = cacheableId
		? `${cacheableId}|${String(entity?.state)}|${measurement}|${decimals}|${String(
				entity?.attributes?.unit_of_measurement || '',
			)}`
		: undefined;
	if (convertKey) {
		const existing = __convertEntityCache.get(convertKey);
		if (existing) return existing;
	}

	const wrapped: CustomEntity = {
		...entity,
		measurement: measurement,
		decimals: decimals,
		toNum: (decimals?: number, invert?: boolean) =>
			Utils.toNum(entity?.state, decimals, invert),
		isValid: () =>
			(entity?.state !== null &&
				entity.state !== undefined &&
				entity.state !== 'unknown') ||
			false,
		notEmpty: () =>
			(entity?.state !== '' &&
				entity?.state !== null &&
				entity?.state !== 'unknown' &&
				entity.state !== undefined) ||
			false,
		isNaN: () => entity?.state === null || Number.isNaN(entity?.state),
		toPower: (invert?: boolean) => {
			const unit = (entity.attributes?.unit_of_measurement || '').toLowerCase();
			if (unit === 'kw' || unit === 'kwh') {
				return Utils.toNum((entity?.state || '0') * 1000, 0, invert);
			} else if (unit === 'mw' || unit === 'mwh') {
				return Utils.toNum((entity?.state || '0') * 1000000, 0, invert);
			} else {
				return Utils.toNum(entity?.state || '0', 0, invert) || 0;
			}
		},
		toPowerString: (scale?: boolean, decimals?: number, invert?: boolean) => {
			const uom = entity?.attributes?.unit_of_measurement || '';
			const key = `${entity?.state}|${uom}|${scale ? 1 : 0}|${decimals ?? -1}|${
				invert ? 1 : 0
			}`;
			const cached = __toPowerStringCache.get(key);
			if (cached !== undefined) return cached;
			const scaled = scale
				? Utils.convertValueNew(entity?.state, uom, decimals || 0)
				: null;
			const result = scale
				? typeof scaled === 'number'
					? `${scaled} ${uom}`
					: String(scaled)
				: `${Utils.toNum(entity?.state, 0, invert)} ${uom}`;
			if (__toPowerStringCache.size > __TO_POWER_STRING_CACHE_MAX) {
				__toPowerStringCache.clear();
			}
			__toPowerStringCache.set(key, result);
			return result;
		},
		toString: () => entity?.state?.toString() || '',
		getUOM: () => entity?.attributes?.unit_of_measurement || '',
		toDisplay: () => toDisplayFunction(entity.state, measurement, decimals),
	};

	if (convertKey) {
		if (__convertEntityCache.size > __CONVERT_ENTITY_CACHE_MAX) {
			__convertEntityCache.clear();
		}
		__convertEntityCache.set(convertKey, wrapped);
	}
	return wrapped;
}

// Lightweight memoization cache for number formatting to reduce repeated work during renders
const __toDisplayCache = new Map<string, string>();
const __TO_DISPLAY_CACHE_MAX = 2048; // soft cap; cache will be cleared when exceeded

// Memoization caches for power string and entity conversion
const __toPowerStringCache = new Map<string, string>();
const __TO_POWER_STRING_CACHE_MAX = 2048;
const __convertEntityCache = new Map<string, CustomEntity>();
const __CONVERT_ENTITY_CACHE_MAX = 4096;

function toDisplayFunction(
	state: string,
	measurement:
		| UnitOfPower
		| UnitOfEnergy
		| UnitOfElectricalCurrent
		| Percentage
		| 'NA',
	decimals?: number,
): string {
	//console.log(state, measurement, decimals);
	if (state == null) return state;
	if (Number.isNaN(state)) return `${state}${measurement}`;

	// Build a stable cache key
	const key = `${state}|${measurement}|${decimals ?? -1}`;
	const cached = __toDisplayCache.get(key);
	if (cached !== undefined) return cached;

	const stateDec =
		decimals != null && decimals >= 0
			? parseFloat(state).toFixed(decimals)
			: state;
	const suffix = measurement != 'NA' && measurement ? measurement : '';
	const result = `${stateDec}${suffix}`;

	// Maintain a soft cap on cache size to avoid unbounded growth
	if (__toDisplayCache.size > __TO_DISPLAY_CACHE_MAX) {
		__toDisplayCache.clear();
	}
	__toDisplayCache.set(key, result);
	return result;
}
