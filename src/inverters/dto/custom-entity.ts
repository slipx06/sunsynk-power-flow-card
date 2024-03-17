import {HassEntity} from 'home-assistant-js-websocket/dist/types';
import {Utils} from '../../helpers/utils';
import {UnitOfElectricalCurrent, UnitOfEnergy, UnitOfPower} from '../../const';

/**
 * CustomEntity interface represents a custom entity in Home Assistant.
 * - this entity aids in reducing common boiler plate code. the end goal is that we can just use the state object instead of multiple vars
 */
export interface CustomEntity extends HassEntity {
    state: string,

    /**
     * Extension of Utils.toNum, returns the state in a number
     * @param decimals
     * @param invert
     */
    toNum(decimals?: number, invert?: boolean): number;

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

    getUOM(): UnitOfPower | UnitOfEnergy | UnitOfElectricalCurrent
}

// Function to convert HassEntity to CustomEntity
export function convertToCustomEntity(entity: any): CustomEntity {
    return {
        ...entity,
        toNum: (decimals?: number, invert?: boolean) => Utils.toNum(entity?.state, decimals, invert),
        isValid: () => entity?.state !== null && entity.state !== undefined && entity.state !== 'unknown' || false,
        notEmpty: () => entity?.state !== '' || false,
        isNaN: () => Number.isNaN(entity?.state) || true,
        toPower: (invert?: boolean) => (entity.attributes?.unit_of_measurement || '').toLowerCase() === 'kw'
            ? Utils.toNum(((entity?.state || '0') * 1000), 0, invert)
            : Utils.toNum((entity?.state || '0'), 0, invert) || 0,
        toPowerString: (scale?: boolean, decimals?: number, invert?: boolean) =>
            scale ?
                Utils.convertValueNew(entity?.state, entity?.attributes?.unit_of_measurement, decimals || 0) :
                `${Utils.toNum(entity?.state, decimals, invert)} ${entity?.attributes?.unit_of_measurement}`,
        toString: () => entity?.state?.toString() || '',
        getUOM: () => entity?.attributes?.unit_of_measurement || ''
    }
}
