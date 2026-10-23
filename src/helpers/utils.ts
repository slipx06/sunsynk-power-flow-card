import {
	unitOfEnergyConversionRules,
	UnitOfEnergyOrPower,
	UnitOfPower,
	UnitOfEnergy,
} from '../const';
import { globalData } from './globals';
import type { HomeAssistant } from 'custom-card-helpers';

export class Utils {
	static toNum(
		val: string | number,
		decimals: number = -1,
		invert: boolean = false,
	): number {
		let numberValue = Number(val);
		if (Number.isNaN(numberValue)) {
			return 0;
		}
		if (decimals >= 0) {
			numberValue = parseFloat(numberValue.toFixed(decimals));
		}
		if (invert) {
			numberValue *= -1;
		}
		return numberValue;
	}

	static invertKeyPoints(keyPoints: string) {
		return keyPoints.split(';').reverse().join(';');
	}

	static formatNumberLocale(value: number, decimals: number): string {
		const fractionDigits = Number.isNaN(decimals) ? 2 : decimals;

		// Prefer Home Assistant's configured number format if available
		//const hass: any = (globalData as any).hass;
		const hass = globalData.hass as HomeAssistant | null;
		const nf: string | undefined = hass?.locale?.number_format;
		const langFromHass: string | undefined =
			hass?.selectedLanguage || hass?.locale?.language || hass?.language;

		let locale: string | undefined;
		let useGrouping = true;

		switch (nf) {
			case 'auto':
			case 'language':
				// Use HA language as locale if available, else fall back to browser
				locale = langFromHass;
				break;
			case 'system':
				// Let browser/OS decide fully
				locale = undefined;
				break;
			case 'comma_decimal': // 1,234,567.89
				locale = 'en-US';
				break;
			case 'decimal_comma': // 1.234.567,89
				locale = 'de-DE';
				break;
			case 'space_comma': //
				locale = 'fr-FR';
				break;
			case 'none': // 123456789.89 (no grouping)
				locale = langFromHass;
				useGrouping = false;
				break;
			default:
				// Unknown format: fall back to browser/OS locale
				locale = undefined;
		}

		return value.toLocaleString(locale, {
			minimumFractionDigits: fractionDigits,
			maximumFractionDigits: fractionDigits,
			useGrouping,
		});
	}

	static convertValue(value, decimal = 2) {
		decimal = Number.isNaN(decimal) ? 2 : decimal;
		if (Math.abs(value) >= 1000000) {
			const scaled = value / 1000000;
			return `${Utils.formatNumberLocale(scaled, decimal)} MW`;
		} else if (Math.abs(value) >= 1000) {
			const scaled = value / 1000;
			return `${Utils.formatNumberLocale(scaled, decimal)} kW`;
		} else {
			const rounded = Math.round(value);
			return `${rounded.toLocaleString(undefined)} W`;
		}
	}

	static convertValueNew(
		value: string | number,
		unit: UnitOfEnergyOrPower | string = '',
		decimal: number = 2,
	) {
		decimal = isNaN(decimal) ? 2 : decimal;
		const numberValue = Number(value);
		if (isNaN(numberValue)) return 0;

		const rules = unitOfEnergyConversionRules[unit];
		if (!rules)
			return `${Utils.formatNumberLocale(numberValue, decimal)} ${unit}`;

		if (unit === UnitOfEnergy.WATT_HOUR && Math.abs(numberValue) < 1000) {
			const rounded = Math.round(numberValue);
			return `${rounded.toLocaleString(undefined)} ${unit}`;
		}

		if (unit === UnitOfPower.WATT && Math.abs(numberValue) < 1000) {
			const rounded = Math.round(numberValue);
			return `${rounded.toLocaleString(undefined)} ${unit}`;
		}

		if (unit === UnitOfPower.KILO_WATT && Math.abs(numberValue) < 1) {
			const watts = Math.round(numberValue * 1000);
			return `${watts.toLocaleString(undefined)} W`;
		}

		if (unit === UnitOfPower.MEGA_WATT && Math.abs(numberValue) < 1) {
			const kw = numberValue * 1000;
			return `${Utils.formatNumberLocale(kw, decimal)} kW`;
		}

		for (const rule of rules) {
			if (Math.abs(numberValue) >= rule.threshold) {
				const divided = numberValue / rule.divisor;
				const dec = rule.decimal || decimal;
				const convertedValue = Utils.formatNumberLocale(divided, dec);
				return `${convertedValue} ${rule.targetUnit}`;
			}
		}

		return `${Utils.formatNumberLocale(numberValue, decimal)} ${unit}`;
	}

	static handlePopup(event, entityId) {
		if (!entityId) {
			return;
		}
		event.preventDefault();
		this._handleClick(event, { action: 'more-info' }, entityId);
	}

	static handleNavigation(event, navigationPath) {
		if (!navigationPath) {
			return;
		}
		event.preventDefault();
		this._handleClick(
			event,
			{ action: 'navigate', navigation_path: navigationPath },
			null,
		);
	}

	private static _handleClick(event, actionConfig, entityId) {
		if (!event || (!entityId && !actionConfig.navigation_path)) {
			return;
		}

		event.stopPropagation();

		// Home Assistant runs the action itself, so the dialog and the page it
		// opens know where they came from and their back button returns here.
		event.target.dispatchEvent(
			new CustomEvent('hass-action', {
				bubbles: true,
				composed: true,
				detail: {
					config: { entity: entityId ?? undefined, tap_action: actionConfig },
					action: 'tap',
				},
			}),
		);
	}

	static toHexColor(color: string): string {
		if (!color) {
			return 'grey';
		}
		if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)) {
			return color.toUpperCase();
		}

		const match = color.match(
			/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
		);
		if (match) {
			const [r, g, b] = match.slice(1, 4).map(Number);
			return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1).toUpperCase()}`;
		}
		// probs a color name
		return color;
	}
}
