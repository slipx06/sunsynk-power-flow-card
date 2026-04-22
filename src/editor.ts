import { html, css, LitElement, TemplateResult } from 'lit';
import {
	fireEvent,
	HomeAssistant,
	LovelaceCardEditor,
} from 'custom-card-helpers';

import {
	AutarkyType,
	CardStyle,
	InverterModel,
	sunsynkPowerFlowCardConfig,
} from './types';
import { customElement, property } from 'lit/decorators.js';
import { localize } from './localize/localize';
import { capitalize } from 'lodash';
import defaults from './defaults';
import { EDITOR_NAME, SensorDeviceClass } from './const';
import { LovelaceConfig } from 'custom-card-helpers/src/types';

@customElement(EDITOR_NAME)
export class SunSynkCardEditor
	extends LitElement
	implements LovelaceCardEditor
{
	@property() public hass!: HomeAssistant;
	@property() private _config!: sunsynkPowerFlowCardConfig;
	@property() lovelace?: LovelaceConfig;

	// Cache for performance
	private _cachedSanitizedConfig?: sunsynkPowerFlowCardConfig;
	private _configVersion = 0;
	private _lastCachedVersion = -1;

	private static readonly _labelCache = new Map<string, string>();

	// Static color name mapping (avoid recreating on every call)
	private static readonly COLOR_NAME_MAP: Record<string, string> = {
		grey: '#9e9e9e',
		gray: '#9e9e9e',
		pink: '#ffc0cb',
		orange: '#ffa500',
		red: '#ff0000',
		green: '#008000',
		blue: '#0000ff',
		yellow: '#ffff00',
		purple: '#800080',
		black: '#000000',
		white: '#ffffff',
	};

	// Precompiled regex patterns for helper text matching (avoid recreating on every call)
	private static readonly PATTERN_LOAD_NAME = /^load\d+_name$/;
	private static readonly PATTERN_LOAD_ICON = /^load\d+_icon$/;
	private static readonly PATTERN_LOAD_SWITCH = /^load\d+_switch$/;
	private static readonly PATTERN_LOAD_THRESHOLD = /^load\d+_max_threshold$/;
	private static readonly PATTERN_AUX_LOAD_NAME = /^aux_load\d+_name$/;
	private static readonly PATTERN_AUX_LOAD_ICON = /^aux_load\d+_icon$/;
	private static readonly PATTERN_PV_NAME = /^pv[1-6]_name$/;
	private static readonly PATTERN_SHOW_SECTION =
		/^show_(inverter|battery|battery2|solar|load|grid)$/;
	private static readonly PATTERN_SHOW_DAILY = /^show_daily(_.*)?$/;
	private static readonly PATTERN_ANY_NAME = /^.*_name$/;
	private static readonly PATTERN_DYNAMIC_ICON = /dynamic_icon$/;
	private static readonly PATTERN_ANY_SWITCH = /^.*_switch$/;
	private static readonly PATTERN_MAX_THRESHOLD = /^.*_max_threshold$/;
	private static readonly PATTERN_DYNAMIC_COLOUR = /dynamic_colour$/;
	private static readonly PATTERN_ANY_COLOUR = /^.*_colour$/;
	private static readonly PATTERN_OFF_COLOUR = /^.*_off_colour$/;
	private static readonly PATTERN_MAX_POWER = /^.*_max_power$/;

	// Precompiled regex for color normalization
	private static readonly PATTERN_COLOUR_SUFFIX = /colour$/i;
	private static readonly PATTERN_DYNAMIC_COLOUR_SUFFIX = /dynamic_colour$/i;

	// Static lookup for help text (faster than switch-case)
	private static readonly HELP_TEXT: Record<string, string> = {
		large_font: 'Use a larger font for card entities.',
		wide: 'Use a wide layout for the card.',
		additional_loads: 'Number of additional loads to configure (0–6).',
		colour: 'Primary colour for this element.',
		efficiency:
			'Show the effeciency of the mppts strings based on their max power.',
		display_mode:
			'Chose how to display solar information next to the sun icon.',
		custom_label: 'Custom label shown in the UI.',
		label_daily_grid_buy: 'Label for daily grid buy.',
		label_daily_grid_sell: 'Label for daily grid sell.',
		count: 'Number of batteries to display.',
		energy: 'Total available energy of the battery in Wh.',
		shutdown_soc: 'State of charge below which the battery is considered off.',
		shutdown_soc_offgrid:
			'State of charge below which the battery is considered off when off-grid.',
		soc_end_of_charge:
			'State of charge at which the battery is considered fully charged.',
		invert_power: 'Invert the direction of power flow animation.',
		hide_soc: 'Hide additional current program capacity (SOC) or shutdown SOC.',
		show_absolute: 'Show absolute values for power.',
		show_remaining_energy: 'Show remaining energy of the battery.',
		remaining_energy_to_shutdown:
			'Show remaining energy of the battery until it shuts down.',
		invert_flow: 'Invert the direction of power flow.',
		linear_gradient: 'Display battery SOC as a linear gradient.',
		invert_load:
			'Set to true if your sensor provides a negative number when the load is drawing power',
		modern: 'Change inverter icon.',
		invert_grid:
			'Enable if your sensor provides a negative number for grid import and positive number for grid export.',
		aux_loads: 'Number of auxiliary loads to configure (0–2).',
		show_nonessential: 'Show non-essential loads.',
		show_aux:
			'Show the Aux subsection (separate auxiliary load configuration).',
		label_daily_load:
			'Alternate label for the daily load value displayed under Load.',
		label_daily_chrg:
			'Alternate label for the daily charge value displayed under Battery.',
		label_daily_dischrg:
			'Alternate label for the daily discharge value displayed under Battery.',
		label_autarky:
			'Alternate label for the autarky value displayed under Inverter.',
		label_ratio: 'Alternat label for the ratio value displayed under Inverter.',
		navigate: 'Optional navigation path to open when the icon is clicked.',
		import_icon:
			'Icon shown for the import flow. Can be set using a template sensor.',
		export_icon:
			'Icon shown for the export flow. Can be set using a template sensor.',
		disconnected_icon:
			'Icon shown when the grid is disconnected. Can be set using a template sensor.',
		aux_name: 'Aux group title shown in the UI.',
		aux_daily_name: 'Label used for daily Aux value.',
		aux_type: 'Icon shown for the Aux group.',
		invert_aux: 'Invert the direction of Aux flow arrows.',
		show_absolute_aux: 'Show Aux values as absolute (no sign) for clarity.',
		aux_dynamic_colour:
			'Aux elements on the card will be greyed out if aux power is 0.',
		aux_colour: 'Primary colour for Aux flow.',
		aux_off_colour: 'Colour used when Aux path is off/idle.',
		show_daily_aux: 'Display daily Aux energy beneath the Aux section.',
		decimal_places: 'Number of decimal places for power values (0-3).',
		decimal_places_energy: 'Number of decimal places for energy values (0-3).',
		soc_decimal_places: 'Decimal places for State of Charge display (0-3).',
		dynamic_line_width:
			'Animate line widths based on power level. Disable for a flatter look.',
		animation_speed: 'Adjusts the speed of flow animations. Higher = faster.',
		off_threshold: 'Below this power value the path is considered off/idle.',
		path_threshold:
			'The colour of the path will change to the source colour if the percentage supply by a single source equals or exceeds this value.',
		max_power: 'Optional cap used for scaling and progress calculations.',
		title_size: "CSS font-size for title, e.g. '1.2em' or '18px'.",
		card_height:
			'Card height: text value (e.g. 360) or an entity providing a numeric height.',
		card_width:
			'Card width: text value (e.g. 640) or an entity providing a numeric width.',
		center_no_grid:
			'When Grid is hidden, shift and narrow the view to center Solar/Battery/Loads.',
	};

	// Utility: Parse unknown to finite number
	private static _toFiniteNum(x: unknown): number | undefined {
		if (typeof x === 'number' && Number.isFinite(x)) return x;
		if (typeof x === 'string' && x.trim() !== '') {
			const n = Number(x);
			return Number.isFinite(n) ? n : undefined;
		}
		return undefined;
	}

	// Utility: Clamp to 0-255 range
	private static _clamp255(n: number): number {
		return Math.max(0, Math.min(255, Math.round(n)));
	}

	static get styles() {
		return css`
			:host {
				display: block;
				box-sizing: border-box;
				width: 100%;
				max-width: 100%;
			}
			ha-form {
				width: 100%;
			}
			/* No global grid column override; Entities section is scoped via schema */
		`;
	}

	// Provide helper text hints in the editor form
	private _computeHelperCallback = (data: unknown): string | undefined => {
		// ha-form may call this for group/expandable items or items without a name
		if (!data || typeof data !== 'object') return undefined;
		const name = (data as { name?: string }).name;
		if (!name) return undefined;

		/*
		// Localization (commented out until help text is added to language files)
		const key = `config.helper.${name}`;
		try {
			const localized = localize(key);
			if (localized && localized !== key) return localized;
		} catch {
			// fall through to defaults below when localization lookup fails
		}
		*/

		// Pattern-based helper hints for dynamic load/aux subfields
		if (SunSynkCardEditor.PATTERN_LOAD_NAME.test(name))
			return 'Label for additional load.';
		if (SunSynkCardEditor.PATTERN_LOAD_ICON.test(name))
			return 'Additional load icon (Can be set via template sensor).';
		if (SunSynkCardEditor.PATTERN_LOAD_SWITCH.test(name))
			return 'Switch entity to control this additional load (optional).';
		if (SunSynkCardEditor.PATTERN_LOAD_THRESHOLD.test(name))
			return 'Set the threshold that will activate the Max Colour.';
		if (SunSynkCardEditor.PATTERN_AUX_LOAD_NAME.test(name))
			return 'Label for auxiliary load.';
		if (SunSynkCardEditor.PATTERN_AUX_LOAD_ICON.test(name))
			return 'Icon will be used for this auxiliary load.';

		// Global patterns across sections (safe and generic)
		if (SunSynkCardEditor.PATTERN_PV_NAME.test(name))
			return 'Custom label for a PV input.';
		if (name === 'mppts')
			return 'Number of MPPT inputs available on your inverter.';
		if (name === 'three_phase')
			return 'Enable if your system/card should display in three-phase mode.';
		if (SunSynkCardEditor.PATTERN_SHOW_SECTION.test(name))
			return 'Show or hide this section in the card.';
		if (SunSynkCardEditor.PATTERN_SHOW_DAILY.test(name))
			return 'Display daily energy on the card.';
		if (name === 'auto_scale')
			return 'Automatically scale values based on recent ranges.';
		if (SunSynkCardEditor.PATTERN_ANY_NAME.test(name))
			return 'Custom label shown in the UI.';
		if (SunSynkCardEditor.PATTERN_DYNAMIC_ICON.test(name))
			return 'The icon will change to represent power source.';
		if (SunSynkCardEditor.PATTERN_ANY_SWITCH.test(name))
			return 'Optional switch entity to control this element.';
		if (SunSynkCardEditor.PATTERN_MAX_THRESHOLD.test(name))
			return 'Maximum threshold used for progress/flow scaling.';
		// Must come before the generic *_colour rule; match both 'dynamic_colour' and '*_dynamic_colour'
		if (SunSynkCardEditor.PATTERN_DYNAMIC_COLOUR.test(name))
			return 'Change colour dynamically based on power level.';
		if (SunSynkCardEditor.PATTERN_ANY_COLOUR.test(name))
			return 'Primary colour for this element.';
		if (SunSynkCardEditor.PATTERN_OFF_COLOUR.test(name))
			return 'Colour used when the element is off/idle.';
		if (SunSynkCardEditor.PATTERN_MAX_POWER.test(name))
			return 'Optional cap used for scaling and progress calculations.';

		// Static lookups (O(1))
		if (name === 'max_line_width' || name === 'min_line_width') {
			const min = Number(this._config?.min_line_width ?? 1);
			const max = Number(this._config?.max_line_width ?? 1);
			if (min > max)
				return 'Warning: min_line_width is greater than max_line_width.';
			return name === 'max_line_width'
				? 'Maximum dynamic line width (1-8).'
				: 'Minimum dynamic line width (1-8).';
		}

		return SunSynkCardEditor.HELP_TEXT[name];
	};

	// Humanize a schema name like "inverter_voltage_154" -> "Inverter Voltage 154"
	private _prettyLabel(name: string): string {
		const cached = SunSynkCardEditor._labelCache.get(name);
		if (cached) return cached;
		const result = name
			.replace(/_/g, ' ')
			.replace(/\b\w/g, (c) => c.toUpperCase());
		SunSynkCardEditor._labelCache.set(name, result);
		return result;
	}

	// Safe localize with fallback (treat 'unknown'/'undefined' as missing)
	private _t(key: string, fallback: string): string {
		try {
			const v = localize(key);
			if (typeof v === 'string') {
				const lower = v.toLowerCase();
				if (v && v !== key && lower !== 'unknown' && lower !== 'undefined') {
					return v;
				}
			}
		} catch {
			// fall through to fallback
		}
		return fallback;
	}

	// Map common CSS color names to hex; accept string, {r,g,b} object, or [r,g,b] array; return undefined if invalid
	private _normalizeColor(value?: unknown): string | undefined {
		if (value == null) return undefined;
		// If provided as an object or array with r,g,b channels (numbers or numeric strings)
		if (typeof value === 'object') {
			let r: unknown;
			let g: unknown;
			let b: unknown;
			if (Array.isArray(value) && value.length >= 3) {
				[r, g, b] = value as unknown[];
			} else {
				const v = value as Record<string, unknown>;
				r = v.r;
				g = v.g;
				b = v.b;
			}
			const rr = SunSynkCardEditor._toFiniteNum(r);
			const gg = SunSynkCardEditor._toFiniteNum(g);
			const bb = SunSynkCardEditor._toFiniteNum(b);
			if (rr === undefined || gg === undefined || bb === undefined)
				return undefined;
			const toHex = (n: number) =>
				SunSynkCardEditor._clamp255(n).toString(16).padStart(2, '0');
			return `#${toHex(rr)}${toHex(gg)}${toHex(bb)}`;
		}
		if (typeof value !== 'string') return undefined;
		const hex = value.trim();
		const lower = hex.toLowerCase();
		const fromMap = SunSynkCardEditor.COLOR_NAME_MAP[lower];
		let candidate = fromMap ?? hex;
		// Expand #rgb shorthand to #rrggbb
		const m = /^#([0-9a-f]{3})$/i.exec(candidate);
		if (m) {
			const [r, g, b] = m[1].split('');
			candidate = `#${r}${r}${g}${g}${b}${b}`;
		}
		return /^#([0-9a-f]{6})$/i.test(candidate) ? candidate : undefined;
	}

	// Convert supported inputs into [r, g, b] array for ha-form color_rgb
	private _toRgb(value?: unknown): [number, number, number] | undefined {
		if (value == null) return undefined;

		// Array [r,g,b]
		if (Array.isArray(value) && value.length >= 3) {
			const [r, g, b] = value as unknown[];
			const rr = SunSynkCardEditor._toFiniteNum(r);
			const gg = SunSynkCardEditor._toFiniteNum(g);
			const bb = SunSynkCardEditor._toFiniteNum(b);
			if (rr == null || gg == null || bb == null) return undefined;
			return [
				SunSynkCardEditor._clamp255(rr),
				SunSynkCardEditor._clamp255(gg),
				SunSynkCardEditor._clamp255(bb),
			];
		}

		// Object { r,g,b }
		if (typeof value === 'object') {
			const v = value as Record<string, unknown>;
			const rr = SunSynkCardEditor._toFiniteNum(v.r);
			const gg = SunSynkCardEditor._toFiniteNum(v.g);
			const bb = SunSynkCardEditor._toFiniteNum(v.b);
			if (rr != null && gg != null && bb != null) {
				return [
					SunSynkCardEditor._clamp255(rr),
					SunSynkCardEditor._clamp255(gg),
					SunSynkCardEditor._clamp255(bb),
				];
			}
		}

		// String: hex name or rgb(..)
		if (typeof value === 'string') {
			const s = value.trim();
			// rgb(a) pattern
			const m =
				/^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(s);
			if (m) {
				return [
					SunSynkCardEditor._clamp255(Number(m[1])),
					SunSynkCardEditor._clamp255(Number(m[2])),
					SunSynkCardEditor._clamp255(Number(m[3])),
				];
			}
			const hex = this._normalizeColor(s);
			if (!hex) return undefined;
			const r = parseInt(hex.slice(1, 3), 16);
			const g = parseInt(hex.slice(3, 5), 16);
			const b = parseInt(hex.slice(5, 7), 16);
			return [r, g, b];
		}
		return undefined;
	}

	// Produce a safe CSS color for preview chips from any input
	private _toCssColor(value?: unknown): string | undefined {
		if (value == null) return undefined;
		// Allow CSS variables directly
		if (typeof value === 'string' && value.trim().startsWith('var(')) {
			return value.trim();
		}
		// Prefer hex if we can normalize
		const hex = this._normalizeColor(value);
		if (hex) return hex;
		// Fallback: if it's a string (named color), let the browser try it
		if (typeof value === 'string') return value;
		return undefined;
	}

	// Safely extract a string value from an object by key
	private static _getStr(obj: unknown, key: string): string | undefined {
		if (!obj || typeof obj !== 'object') return undefined;
		const val = (obj as Record<string, unknown>)[key];
		return typeof val === 'string' ? val : undefined;
	}

	// Shared color normalization visitor - recursively converts colour values to hex strings
	private _normalizeColorsInObject(obj: unknown): unknown {
		if (Array.isArray(obj)) return obj;
		if (!obj || typeof obj !== 'object') return obj;
		const rec = obj as Record<string, unknown>;
		for (const [k, val] of Object.entries(rec)) {
			if (
				typeof k === 'string' &&
				SunSynkCardEditor.PATTERN_COLOUR_SUFFIX.test(k) &&
				!SunSynkCardEditor.PATTERN_DYNAMIC_COLOUR_SUFFIX.test(k)
			) {
				rec[k] = this._normalizeColor(val) ?? undefined;
			} else if (val && typeof val === 'object') {
				rec[k] = this._normalizeColorsInObject(val) as unknown;
			}
		}
		return rec;
	}

	// Helper to convert colour fields in a section to RGB format for ha-form
	private _convertSectionColours(
		section: Record<string, unknown> | undefined,
		colourFields: string[],
	): Record<string, unknown> | undefined {
		if (!section) return undefined;
		const result = { ...section };
		for (const field of colourFields) {
			result[field] = this._toRgb(section[field]) ?? undefined;
		}
		return result;
	}

	// Return a sanitized config so ha-form color_rgb selectors receive proper [r,g,b] values
	private _sanitizedConfig(): sunsynkPowerFlowCardConfig {
		// Return cached version if config hasn't changed
		if (
			this._cachedSanitizedConfig &&
			this._lastCachedVersion === this._configVersion
		) {
			return this._cachedSanitizedConfig;
		}

		const c = this._config;
		const copy: Record<string, unknown> = {
			...(this._config as unknown as Record<string, unknown>),
		};

		// top-level title colour as RGB object
		copy.title_colour =
			this._toRgb((c as unknown as Record<string, unknown>)['title_colour']) ??
			undefined;

		// Convert section colours to RGB format
		copy.inverter = this._convertSectionColours(
			c.inverter as Record<string, unknown>,
			['colour'],
		);
		copy.solar = this._convertSectionColours(
			c.solar as Record<string, unknown>,
			['colour'],
		);
		copy.battery = this._convertSectionColours(
			c.battery as Record<string, unknown>,
			['colour', 'charge_colour'],
		);
		copy.battery2 = this._convertSectionColours(
			c.battery2 as Record<string, unknown>,
			['colour', 'charge_colour'],
		);
		copy.load = this._convertSectionColours(c.load as Record<string, unknown>, [
			'colour',
			'off_colour',
			'max_colour',
			'aux_colour',
			'aux_off_colour',
		]);
		copy.grid = this._convertSectionColours(c.grid as Record<string, unknown>, [
			'colour',
			'no_grid_colour',
			'export_colour',
			'grid_off_colour',
		]);

		// Cache the result
		this._cachedSanitizedConfig = copy as unknown as sunsynkPowerFlowCardConfig;
		this._lastCachedVersion = this._configVersion;

		return this._cachedSanitizedConfig;
	}

	public setConfig(config: sunsynkPowerFlowCardConfig): void {
		// Migrate any existing *_colour arrays/objects in incoming config to hex strings
		const clone = JSON.parse(JSON.stringify(config)) as Record<string, unknown>;
		this._normalizeColorsInObject(clone);
		this._config = {
			...defaults,
			...this._config,
			...(clone as unknown as sunsynkPowerFlowCardConfig),
		};
		this._configVersion++;
	}

	protected render(): TemplateResult | void {
		if (!this._config || !this.hass) {
			return html``;
		}

		// Build General section schema with conditional fields
		const generalGridSchema: Array<Record<string, unknown>> = [
			{ name: 'large_font', selector: { boolean: {} } },
			{ name: 'wide', selector: { boolean: {} } },
			{ name: 'card_height', selector: { text: {} } },
			{ name: 'card_width', selector: { text: {} } },
			{ name: 'show_solar', selector: { boolean: {} } },
			{ name: 'show_battery', selector: { boolean: {} } },
			{ name: 'show_grid', selector: { boolean: {} } },
			{ name: 'center_no_grid', selector: { boolean: {} } },
			{
				name: 'decimal_places',
				selector: { number: { min: 0, max: 3, step: 1, mode: 'box' } },
			},
			{
				name: 'decimal_places_energy',
				selector: { number: { min: 0, max: 3, step: 1, mode: 'box' } },
			},
			{ name: 'dynamic_line_width', selector: { boolean: {} } },
		];
		if (this._config.dynamic_line_width) {
			generalGridSchema.push(
				{
					name: 'max_line_width',
					selector: { number: { min: 1, max: 8, step: 1, mode: 'box' } },
				},
				{
					name: 'min_line_width',
					selector: { number: { min: 1, max: 8, step: 1, mode: 'box' } },
				},
			);
		}

		return html`
			<ha-form
				.hass=${this.hass}
				.data=${this._sanitizedConfig()}
				.computeLabel=${this._computeLabelCallback.bind(this)}
				.computeHelper=${this._computeHelperCallback.bind(this)}
				.schema=${[
					{
						type: 'expandable',
						title: this._title('title'),
						schema: [
							{
								type: 'grid',
								schema: [
									{ name: 'title', selector: { text: {} } },
									{ name: 'title_colour', selector: { color_rgb: {} } },
									{ name: 'title_size', selector: { text: {} } },
								],
							},
						],
					},
					{
						name: 'cardstyle',
						selector: {
							select: {
								options: Object.values(CardStyle).map((x) => ({
									label: capitalize(x),
									value: x,
								})),
							},
						},
					},
					{
						type: 'expandable',
						title: this._title('general'),
						schema: [
							{ type: 'grid', schema: generalGridSchema },
							{
								type: 'expandable',
								title: this._title('sensor'),
								schema: [
									{
										type: 'grid',
										schema: [
											{ name: 'card_height', selector: { entity: {} } },
											{ name: 'card_width', selector: { entity: {} } },
										],
									},
								],
							},
						],
					},
					{
						type: 'expandable',
						title: this._title('inverter'),
						schema: [
							{
								name: 'inverter',
								type: 'grid',
								schema: [
									{ name: 'three_phase', selector: { boolean: {} } },
									{ name: 'auto_scale', selector: { boolean: {} } },
									{
										name: 'model',
										selector: {
											select: {
												options: Object.values(InverterModel).map((x) => ({
													label: capitalize(x),
													value: x,
												})),
											},
										},
									},
									{ name: 'modern', selector: { boolean: {} } },
									{
										name: 'autarky',
										selector: {
											select: {
												options: Object.values(AutarkyType).map((x) => ({
													label: capitalize(x),
													value: x,
												})),
											},
										},
									},
									{ name: 'colour', selector: { color_rgb: {} } },
									{ name: 'navigate', selector: { text: {} } },
									{ name: 'label_autarky', selector: { text: {} } },
									{ name: 'label_ratio', selector: { text: {} } },
								],
							},
						],
					},
					...(this._config.show_solar
						? [
								{
									type: 'expandable',
									title: this._title('solar'),
									schema: [
										{
											name: 'solar',
											type: 'grid',
											schema: [
												{
													name: 'mppts',
													selector: { number: { min: 1, max: 6 } },
												},
												{ name: 'show_daily', selector: { boolean: {} } },
												{ name: 'pv1_name', selector: { text: {} } },
												{ name: 'pv2_name', selector: { text: {} } },
												{ name: 'pv3_name', selector: { text: {} } },
												{ name: 'pv4_name', selector: { text: {} } },
												{ name: 'pv5_name', selector: { text: {} } },
												{ name: 'pv6_name', selector: { text: {} } },
												{ name: 'auto_scale', selector: { boolean: {} } },
												{
													name: 'display_mode',
													selector: { number: { mode: 'box', min: 1, max: 3 } },
												},
												{ name: 'colour', selector: { color_rgb: {} } },
												{ name: 'dynamic_colour', selector: { boolean: {} } },
												{ name: 'animation_speed', selector: { number: {} } },
												{ name: 'max_power', selector: { number: {} } },
												{ name: 'pv1_max_power', selector: { number: {} } },
												{ name: 'pv2_max_power', selector: { number: {} } },
												{ name: 'pv3_max_power', selector: { number: {} } },
												{ name: 'pv4_max_power', selector: { number: {} } },
												{ name: 'pv5_max_power', selector: { number: {} } },
												{ name: 'pv6_max_power', selector: { number: {} } },
												{
													name: 'efficiency',
													selector: { number: { mode: 'box', min: 0, max: 3 } },
												},
												{ name: 'off_threshold', selector: { number: {} } },
												{ name: 'navigate', selector: { text: {} } },
												{ name: 'custom_label', selector: { text: {} } },
												{ name: 'invert_flow', selector: { boolean: {} } },
											],
										},
										{
											type: 'expandable',
											title: this._title('sensor'),
											schema: [
												{
													name: 'solar',
													type: 'grid',
													schema: [
														{ name: 'max_power', selector: { entity: {} } },
														{ name: 'pv1_max_power', selector: { entity: {} } },
														{ name: 'pv2_max_power', selector: { entity: {} } },
														{ name: 'pv3_max_power', selector: { entity: {} } },
														{ name: 'pv4_max_power', selector: { entity: {} } },
														{ name: 'pv5_max_power', selector: { entity: {} } },
														{ name: 'pv6_max_power', selector: { entity: {} } },
													],
												},
											],
										},
									],
								},
							]
						: []),
					...(this._config.show_battery
						? [
								{
									type: 'expandable',
									title: this._title('battery'),
									schema: [
										{
											name: 'battery',
											type: 'grid',
											schema: [
												{
													name: 'count',
													selector: { number: { mode: 'box', min: 1, max: 2 } },
												},
												{ name: 'show_daily', selector: { boolean: {} } },
												{ name: 'animation_speed', selector: { number: {} } },
												{ name: 'max_power', selector: { number: {} } },
												{ name: 'path_threshold', selector: { number: {} } },
												{ name: 'label_daily_chrg', selector: { text: {} } },
												{ name: 'label_daily_dischrg', selector: { text: {} } },
											],
										},
										{
											type: 'expandable',
											title: this._title('bat1'),
											schema: [
												{
													name: 'battery',
													type: 'grid',
													schema: [
														{
															name: 'energy',
															selector: { number: { min: 0 } },
														},
														{
															name: 'shutdown_soc',
															selector: {
																number: { mode: 'box', min: 0, max: 100 },
															},
														},
														{
															name: 'shutdown_soc_offgrid',
															selector: {
																number: { mode: 'box', min: 0, max: 100 },
															},
														},
														{
															name: 'soc_end_of_charge',
															selector: {
																number: { mode: 'box', min: 80, max: 100 },
															},
														},
														{
															name: 'soc_decimal_places',
															selector: {
																number: {
																	min: 0,
																	max: 3,
																	step: 1,
																	mode: 'box',
																},
															},
														},
														{ name: 'auto_scale', selector: { boolean: {} } },
														{ name: 'invert_power', selector: { boolean: {} } },
														{
															name: 'show_absolute',
															selector: { boolean: {} },
														},
														{ name: 'colour', selector: { color_rgb: {} } },
														{
															name: 'charge_colour',
															selector: { color_rgb: {} },
														},
														{
															name: 'dynamic_colour',
															selector: { boolean: {} },
														},
														{
															name: 'linear_gradient',
															selector: { boolean: {} },
														},
														{ name: 'animate', selector: { boolean: {} } },
														{ name: 'hide_soc', selector: { boolean: {} } },
														{
															name: 'show_remaining_energy',
															selector: { boolean: {} },
														},
														{
															name: 'remaining_energy_to_shutdown',
															selector: { boolean: {} },
														},
														{ name: 'navigate', selector: { text: {} } },
														{ name: 'invert_flow', selector: { boolean: {} } },
													],
												},
												{
													type: 'expandable',
													title: this._title('sensor'),
													schema: [
														{
															name: 'battery',
															type: 'grid',
															schema: [
																{ name: 'energy', selector: { entity: {} } },
																{
																	name: 'shutdown_soc',
																	selector: { entity: {} },
																},
																{
																	name: 'shutdown_soc_offgrid',
																	selector: { entity: {} },
																},
																{
																	name: 'soc_end_of_charge',
																	selector: { entity: {} },
																},
																{ name: 'max_power', selector: { entity: {} } },
															],
														},
													],
												},
											],
										},
										...(Number(this._config.battery?.count ?? 1) === 2
											? [
													{
														type: 'expandable',
														title: this._title('bat2'),
														schema: [
															{
																name: 'battery2',
																type: 'grid',
																schema: [
																	{
																		name: 'energy',
																		selector: { number: { min: 0 } },
																	},
																	{
																		name: 'shutdown_soc',
																		selector: {
																			number: { mode: 'box', min: 0, max: 100 },
																		},
																	},
																	{
																		name: 'shutdown_soc_offgrid',
																		selector: {
																			number: { mode: 'box', min: 0, max: 100 },
																		},
																	},
																	{
																		name: 'soc_end_of_charge',
																		selector: {
																			number: {
																				mode: 'box',
																				min: 80,
																				max: 100,
																			},
																		},
																	},
																	{
																		name: 'soc_decimal_places',
																		selector: { number: {} },
																	},
																	{
																		name: 'auto_scale',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'invert_power',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'show_absolute',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'colour',
																		selector: { color_rgb: {} },
																	},
																	{
																		name: 'charge_colour',
																		selector: { color_rgb: {} },
																	},
																	{
																		name: 'dynamic_colour',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'linear_gradient',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'animate',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'hide_soc',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'show_remaining_energy',
																		selector: { boolean: {} },
																	},
																	{
																		name: 'remaining_energy_to_shutdown',
																		selector: { boolean: {} },
																	},
																	{ name: 'navigate', selector: { text: {} } },
																	{
																		name: 'invert_flow',
																		selector: { boolean: {} },
																	},
																],
															},
															{
																type: 'expandable',
																title: this._title('sensor'),
																schema: [
																	{
																		name: 'battery2',
																		type: 'grid',
																		schema: [
																			{
																				name: 'energy',
																				selector: { entity: {} },
																			},
																			{
																				name: 'shutdown_soc',
																				selector: { entity: {} },
																			},
																			{
																				name: 'shutdown_soc_offgrid',
																				selector: { entity: {} },
																			},
																			{
																				name: 'soc_end_of_charge',
																				selector: { entity: {} },
																			},
																		],
																	},
																],
															},
														],
													},
												]
											: []),
									],
								},
							]
						: []),
					// Load options section (restored)
					{
						type: 'expandable',
						title: this._title('load'),
						schema: [
							{
								name: 'load',
								type: 'grid',
								schema: [
									{ name: 'show_daily', selector: { boolean: {} } },
									{ name: 'auto_scale', selector: { boolean: {} } },
									{ name: 'colour', selector: { color_rgb: {} } },
									{ name: 'off_colour', selector: { color_rgb: {} } },
									{ name: 'max_colour', selector: { color_rgb: {} } },
									{ name: 'dynamic_colour', selector: { boolean: {} } },
									{ name: 'dynamic_icon', selector: { boolean: {} } },
									{ name: 'invert_load', selector: { boolean: {} } },
									{ name: 'essential_name', selector: { text: {} } },
									{
										name: 'additional_loads',
										selector: { number: { mode: 'box', min: 0, max: 6 } },
									},
									...((this._config.load?.additional_loads ?? 0) >= 1
										? [
												{ name: 'load1_name', selector: { text: {} } },
												{ name: 'load1_icon', selector: { icon: {} } },
												{ name: 'load1_switch', selector: { entity: {} } },
												{
													name: 'load1_max_threshold',
													selector: { number: {} },
												},
											]
										: []),
									...((this._config.load?.additional_loads ?? 0) >= 2
										? [
												{ name: 'load2_name', selector: { text: {} } },
												{ name: 'load2_icon', selector: { icon: {} } },
												{ name: 'load2_switch', selector: { entity: {} } },
												{
													name: 'load2_max_threshold',
													selector: { number: {} },
												},
											]
										: []),
									...((this._config.load?.additional_loads ?? 0) >= 3
										? [
												{ name: 'load3_name', selector: { text: {} } },
												{ name: 'load3_icon', selector: { icon: {} } },
												{ name: 'load3_switch', selector: { entity: {} } },
												{
													name: 'load3_max_threshold',
													selector: { number: {} },
												},
											]
										: []),
									...((this._config.load?.additional_loads ?? 0) >= 4
										? [
												{ name: 'load4_name', selector: { text: {} } },
												{ name: 'load4_icon', selector: { icon: {} } },
												{ name: 'load4_switch', selector: { entity: {} } },
												{
													name: 'load4_max_threshold',
													selector: { number: {} },
												},
											]
										: []),
									...((this._config.load?.additional_loads ?? 0) >= 5
										? [
												{ name: 'load5_name', selector: { text: {} } },
												{ name: 'load5_icon', selector: { icon: {} } },
												{ name: 'load5_switch', selector: { entity: {} } },
												{
													name: 'load5_max_threshold',
													selector: { number: {} },
												},
											]
										: []),
									...((this._config.load?.additional_loads ?? 0) >= 6
										? [
												{ name: 'load6_name', selector: { text: {} } },
												{ name: 'load6_icon', selector: { icon: {} } },
												{ name: 'load6_switch', selector: { entity: {} } },
												{
													name: 'load6_max_threshold',
													selector: { number: {} },
												},
											]
										: []),
									{ name: 'animation_speed', selector: { number: {} } },
									{ name: 'max_power', selector: { number: {} } },
									{ name: 'off_threshold', selector: { number: {} } },
									{ name: 'path_threshold', selector: { number: {} } },
									{ name: 'navigate', selector: { text: {} } },
									{ name: 'label_daily_load', selector: { text: {} } },
									{ name: 'invert_flow', selector: { boolean: {} } },
									{ name: 'show_aux', selector: { boolean: {} } },
								],
							},
							...(this._config.load?.show_aux
								? [
										{
											type: 'expandable',
											title: this._title('aux'),
											schema: [
												{
													name: 'load',
													type: 'grid',
													schema: [
														{ name: 'aux_name', selector: { text: {} } },
														{ name: 'aux_daily_name', selector: { text: {} } },
														{ name: 'aux_type', selector: { icon: {} } },
														{ name: 'invert_aux', selector: { boolean: {} } },
														{
															name: 'show_absolute_aux',
															selector: { boolean: {} },
														},
														{
															name: 'aux_dynamic_colour',
															selector: { boolean: {} },
														},
														{ name: 'aux_colour', selector: { color_rgb: {} } },
														{
															name: 'aux_off_colour',
															selector: { color_rgb: {} },
														},
														{
															name: 'aux_loads',
															selector: {
																number: { mode: 'box', min: 0, max: 2 },
															},
														},
														...((this._config.load?.aux_loads ?? 0) >= 1
															? [
																	{
																		name: 'aux_load1_name',
																		selector: { text: {} },
																	},
																	{
																		name: 'aux_load1_icon',
																		selector: { icon: {} },
																	},
																]
															: []),
														...((this._config.load?.aux_loads ?? 0) >= 2
															? [
																	{
																		name: 'aux_load2_name',
																		selector: { text: {} },
																	},
																	{
																		name: 'aux_load2_icon',
																		selector: { icon: {} },
																	},
																]
															: []),
														{
															name: 'show_daily_aux',
															selector: { boolean: {} },
														},
													],
												},
											],
										},
									]
								: []),
							{
								type: 'expandable',
								title: this._title('sensor'),
								schema: [
									{
										name: 'load',
										type: 'grid',
										schema: [
											...((this._config.load?.additional_loads ?? 0) >= 1
												? [{ name: 'load1_icon', selector: { entity: {} } }]
												: []),
											...((this._config.load?.additional_loads ?? 0) >= 2
												? [{ name: 'load2_icon', selector: { entity: {} } }]
												: []),
											...((this._config.load?.additional_loads ?? 0) >= 3
												? [{ name: 'load3_icon', selector: { entity: {} } }]
												: []),
											...((this._config.load?.additional_loads ?? 0) >= 4
												? [{ name: 'load4_icon', selector: { entity: {} } }]
												: []),
											...((this._config.load?.aux_loads ?? 0) >= 1
												? [{ name: 'aux_load1_icon', selector: { entity: {} } }]
												: []),
											...((this._config.load?.aux_loads ?? 0) >= 2
												? [{ name: 'aux_load2_icon', selector: { entity: {} } }]
												: []),
											{ name: 'max_power', selector: { entity: {} } },
										],
									},
								],
							},
						],
					},
					...(this._config.show_grid
						? [
								{
									type: 'expandable',
									title: this._title('grid'),
									schema: [
										{
											name: 'grid',
											type: 'grid',
											schema: [
												{ name: 'show_daily_buy', selector: { boolean: {} } },
												{ name: 'show_daily_sell', selector: { boolean: {} } },
												{ name: 'show_daily_cost', selector: { boolean: {} } },
												{ name: 'daily_cost_prefix', selector: { text: {} } },
												{ name: 'daily_cost_suffix', selector: { text: {} } },
												{ name: 'auto_scale', selector: { boolean: {} } },
												{ name: 'invert_grid', selector: { boolean: {} } },
												{ name: 'colour', selector: { color_rgb: {} } },
												{ name: 'no_grid_colour', selector: { color_rgb: {} } },
												{ name: 'export_colour', selector: { color_rgb: {} } },
												{
													name: 'grid_off_colour',
													selector: { color_rgb: {} },
												},
												{ name: 'grid_name', selector: { text: {} } },
												{
													name: 'label_daily_grid_buy',
													selector: { text: {} },
												},
												{
													name: 'label_daily_grid_sell',
													selector: { text: {} },
												},
												{ name: 'show_absolute', selector: { boolean: {} } },
												{
													name: 'energy_cost_decimals',
													selector: { number: { mode: 'box', min: 0, max: 3 } },
												},
												{
													name: 'show_nonessential',
													selector: { boolean: {} },
												},
												{
													name: 'additional_loads',
													selector: { number: { mode: 'box', min: 0, max: 3 } },
												},
												{ name: 'nonessential_name', selector: { text: {} } },
												{ name: 'nonessential_icon', selector: { icon: {} } },
												{ name: 'load1_name', selector: { text: {} } },
												{ name: 'load1_icon', selector: { icon: {} } },
												{ name: 'load2_name', selector: { text: {} } },
												{ name: 'load2_icon', selector: { icon: {} } },
												{ name: 'load3_name', selector: { text: {} } },
												{ name: 'load3_icon', selector: { icon: {} } },
												{ name: 'animation_speed', selector: { number: {} } },
												{ name: 'max_power', selector: { number: {} } },
												{ name: 'off_threshold', selector: { number: {} } },
												{ name: 'import_icon', selector: { icon: {} } },
												{ name: 'export_icon', selector: { icon: {} } },
												{ name: 'disconnected_icon', selector: { icon: {} } },
												{ name: 'navigate', selector: { text: {} } },
												{ name: 'invert_flow', selector: { boolean: {} } },
											],
										},
										{
											type: 'expandable',
											title: this._title('sensor'),
											schema: [
												{
													name: 'grid',
													type: 'grid',
													schema: [
														{ name: 'load1_icon', selector: { entity: {} } },
														{ name: 'load2_icon', selector: { entity: {} } },
														{ name: 'load3_icon', selector: { entity: {} } },
														{ name: 'max_power', selector: { entity: {} } },
														{ name: 'import_icon', selector: { entity: {} } },
														{ name: 'export_icon', selector: { entity: {} } },
														{
															name: 'disconnected_icon',
															selector: { entity: {} },
														},
													],
												},
											],
										},
									],
								},
							]
						: []),
					{
						type: 'expandable',
						title: this._title('entities'),
						schema: [
							{
								type: 'expandable',
								title: this._title('sol'),
								schema: [
									{
										name: 'entities',
										type: 'grid',
										schema: [
											{
												name: 'day_pv_energy_108',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'pv1_power_186',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'pv2_power_187',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'pv3_power_188',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'pv4_power_189',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'pv5_power',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'pv6_power',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'pv1_voltage_109',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'pv1_current_110',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'pv2_voltage_111',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'pv2_current_112',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'pv3_voltage_113',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'pv3_current_114',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'pv4_voltage_115',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'pv4_current_116',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'pv5_voltage',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'pv5_current',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'pv6_voltage',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'pv6_current',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'pv_total',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{ name: 'solar_sell_247', selector: { entity: {} } },
											{
												name: 'total_pv_generation',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'remaining_solar',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'environment_temp',
												selector: {
													entity: {
														device_class: SensorDeviceClass.TEMPERATURE,
													},
												},
											},
										],
									},
								],
							},
							{
								type: 'expandable',
								title: this._title('bat'),
								schema: [
									{
										name: 'entities',
										type: 'grid',
										schema: [
											{
												name: 'day_battery_charge_70',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'day_battery_discharge_71',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
										],
									},
									{
										type: 'expandable',
										title: this._title('bat1'),
										schema: [
											{
												name: 'entities',
												type: 'grid',
												schema: [
													{
														name: 'battery_power_190',
														selector: {
															entity: { device_class: SensorDeviceClass.POWER },
														},
													},
													{
														name: 'battery_current_191',
														selector: {
															entity: {
																device_class: SensorDeviceClass.CURRENT,
															},
														},
													},
													{
														name: 'battery_temp_182',
														selector: {
															entity: {
																device_class: SensorDeviceClass.TEMPERATURE,
															},
														},
													},
													{
														name: 'battery_voltage_183',
														selector: {
															entity: {
																device_class: SensorDeviceClass.VOLTAGE,
															},
														},
													},
													{
														name: 'battery_soc_184',
														selector: {
															entity: {
																device_class: SensorDeviceClass.BATTERY,
															},
														},
													},
													{
														name: 'battery_rated_capacity',
														selector: { entity: {} },
													},
													{ name: 'battery_soh', selector: { entity: {} } },
													{
														name: 'battery_current_direction',
														selector: { entity: {} },
													},
													{ name: 'battery_status', selector: { entity: {} } },
												],
											},
										],
									},
									...(Number(this._config.battery?.count ?? 1) === 2
										? [
												{
													type: 'expandable',
													title: this._title('bat2'),
													schema: [
														{
															name: 'entities',
															type: 'grid',
															schema: [
																{
																	name: 'battery2_power_190',
																	selector: {
																		entity: {
																			device_class: SensorDeviceClass.POWER,
																		},
																	},
																},
																{
																	name: 'battery2_current_191',
																	selector: {
																		entity: {
																			device_class: SensorDeviceClass.CURRENT,
																		},
																	},
																},
																{
																	name: 'battery2_temp_182',
																	selector: {
																		entity: {
																			device_class:
																				SensorDeviceClass.TEMPERATURE,
																		},
																	},
																},
																{
																	name: 'battery2_voltage_183',
																	selector: {
																		entity: {
																			device_class: SensorDeviceClass.VOLTAGE,
																		},
																	},
																},
																{
																	name: 'battery2_soc_184',
																	selector: {
																		entity: {
																			device_class: SensorDeviceClass.BATTERY,
																		},
																	},
																},
																{
																	name: 'battery2_rated_capacity',
																	selector: { entity: {} },
																},
																{
																	name: 'battery2_soh',
																	selector: { entity: {} },
																},
																{
																	name: 'battery2_current_direction',
																	selector: { entity: {} },
																},
																{
																	name: 'battery2_status',
																	selector: { entity: {} },
																},
															],
														},
													],
												},
											]
										: []),
								],
							},
							{
								type: 'expandable',
								title: this._title('inv'),
								schema: [
									{
										name: 'entities',
										type: 'grid',
										schema: [
											{ name: 'inverter_status_59', selector: { entity: {} } },
											{ name: 'use_timer_248', selector: { entity: {} } },
											{ name: 'priority_load_243', selector: { entity: {} } },
											{
												name: 'inverter_voltage_154',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'inverter_voltage_L2',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'inverter_voltage_L3',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'load_frequency_192',
												selector: {
													entity: { device_class: SensorDeviceClass.FREQUENCY },
												},
											},
											{
												name: 'inverter_current_164',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'inverter_current_L2',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'inverter_current_L3',
												selector: {
													entity: { device_class: SensorDeviceClass.CURRENT },
												},
											},
											{
												name: 'inverter_power_175',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'grid_power_169',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'dc_transformer_temp_90',
												selector: {
													entity: {
														device_class: SensorDeviceClass.TEMPERATURE,
													},
												},
											},
											{
												name: 'radiator_temp_91',
												selector: {
													entity: {
														device_class: SensorDeviceClass.TEMPERATURE,
													},
												},
											},
											{ name: 'prog1_time', selector: { entity: {} } },
											{ name: 'prog1_capacity', selector: { entity: {} } },
											{ name: 'prog1_charge', selector: { entity: {} } },
											{ name: 'prog2_time', selector: { entity: {} } },
											{ name: 'prog2_capacity', selector: { entity: {} } },
											{ name: 'prog2_charge', selector: { entity: {} } },
											{ name: 'prog3_time', selector: { entity: {} } },
											{ name: 'prog3_capacity', selector: { entity: {} } },
											{ name: 'prog3_charge', selector: { entity: {} } },
											{ name: 'prog4_time', selector: { entity: {} } },
											{ name: 'prog4_capacity', selector: { entity: {} } },
											{ name: 'prog4_charge', selector: { entity: {} } },
											{ name: 'prog5_time', selector: { entity: {} } },
											{ name: 'prog5_capacity', selector: { entity: {} } },
											{ name: 'prog5_charge', selector: { entity: {} } },
											{ name: 'prog6_time', selector: { entity: {} } },
											{ name: 'prog6_capacity', selector: { entity: {} } },
											{ name: 'prog6_charge', selector: { entity: {} } },
										],
									},
								],
							},
							{
								type: 'expandable',
								title: this._title('ld'),
								schema: [
									{
										name: 'entities',
										type: 'grid',
										schema: [
											{
												name: 'day_load_energy_84',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'day_aux_energy',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'essential_power',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load1',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load2',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load3',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load4',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load5',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load6',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'essential_load1_extra',
												selector: { entity: {} },
											},
											{
												name: 'essential_load2_extra',
												selector: { entity: {} },
											},
											{
												name: 'essential_load3_extra',
												selector: { entity: {} },
											},
											{
												name: 'essential_load4_extra',
												selector: { entity: {} },
											},
											{
												name: 'essential_load5_extra',
												selector: { entity: {} },
											},
											{
												name: 'essential_load6_extra',
												selector: { entity: {} },
											},
											{
												name: 'load_power_L1',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'load_power_L2',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'load_power_L3',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'aux_power_166',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'aux_load1',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'aux_load2',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{ name: 'aux_load1_extra', selector: { entity: {} } },
											{ name: 'aux_load2_extra', selector: { entity: {} } },
											{
												name: 'aux_connected_status',
												selector: { entity: {} },
											},
										],
									},
								],
							},
							{
								type: 'expandable',
								title: this._title('gri'),
								schema: [
									{
										name: 'entities',
										type: 'grid',
										schema: [
											{
												name: 'day_grid_import_76',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'day_grid_export_77',
												selector: {
													entity: { device_class: SensorDeviceClass.ENERGY },
												},
											},
											{
												name: 'grid_daily_cost',
												selector: { entity: {} },
											},
											{
												name: 'grid_ct_power_172',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'grid_ct_power_L2',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'grid_ct_power_L3',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'grid_ct_power_total',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'grid_voltage',
												selector: {
													entity: { device_class: SensorDeviceClass.VOLTAGE },
												},
											},
											{
												name: 'nonessential_power',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'non_essential_load1',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'non_essential_load2',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'non_essential_load3',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
											{
												name: 'non_essential_load1_extra',
												selector: { entity: {} },
											},
											{
												name: 'non_essential_load2_extra',
												selector: { entity: {} },
											},
											{
												name: 'non_essential_load3_extra',
												selector: { entity: {} },
											},
											{
												name: 'grid_connected_status_194',
												selector: { entity: {} },
											},
											{ name: 'energy_cost_buy', selector: { entity: {} } },
											{ name: 'energy_cost_sell', selector: { entity: {} } },
											{ name: 'prepaid_units', selector: { entity: {} } },
											{
												name: 'max_sell_power',
												selector: {
													entity: { device_class: SensorDeviceClass.POWER },
												},
											},
										],
									},
								],
							},
						],
					},
				]}
				@value-changed=${this._valueChanged.bind(this)}
			></ha-form>
		`;
	}

	// (header removed)

	private _emitConfig(config: sunsynkPowerFlowCardConfig): void {
		this._config = config;
		this._configVersion++;
		// Clear cache when config changes
		this._cachedSanitizedConfig = undefined;
		this._lastCachedVersion = -1;
		fireEvent(this, 'config-changed', { config });
	}

	// (header reset actions removed)

	private _withSuffix(base: string, condition: boolean): string {
		const key = condition ? 'config.inline.shown' : 'config.inline.hidden';
		const fallback = condition ? 'shown' : 'hidden';
		return `${base} (${this._t(key, fallback)})`;
	}

	private _computeLabelCallback = (data: {
		name?: string;
		label?: string;
		title?: string;
	}): string => {
		// For group/expandable items, prefer provided label/title if exists
		if (typeof data?.label === 'string' && data.label.trim()) return data.label;
		if (typeof data?.title === 'string' && data.title.trim()) return data.title;

		const name = typeof data?.name === 'string' ? data.name : '';
		if (!name) return '';
		// Base label from i18n with graceful fallback
		const base = this._t(`config.${name}`, this._prettyLabel(name));

		const cfg = this._config as unknown as Record<string, unknown>;
		switch (name) {
			case 'show_solar':
				return this._withSuffix(base, Boolean(cfg.show_solar));
			case 'show_battery':
				return this._withSuffix(base, Boolean(cfg.show_battery));
			case 'show_grid':
				return this._withSuffix(base, Boolean(cfg.show_grid));
			case 'dynamic_line_width': {
				const on = Boolean(cfg.dynamic_line_width);
				if (!on) {
					return `${base} (${this._t('config.inline.disabled', 'disabled')})`;
				}
				const max = cfg.max_line_width as number | undefined;
				const min = cfg.min_line_width as number | undefined;
				if (typeof max === 'number' && typeof min === 'number') {
					return `${base} (min ${min} – max ${max})`;
				}
				return `${base} (${this._t('config.inline.enabled', 'enabled')})`;
			}
			case 'three_phase': {
				const on = Boolean(
					cfg?.inverter &&
						(cfg.inverter as Record<string, unknown>).three_phase,
				);
				const v = on ? '3P' : '1P';
				return `${base} (${v})`;
			}
			default:
				return base;
		}
	};

	private _title(opt) {
		// Use the same robust fallback as _t to handle missing/invalid translations
		return this._t(`config.cat_title.${opt}`, opt);
	}

	private _valueChanged(ev: CustomEvent): void {
		// ha-form returns color_rgb as arrays or {r,g,b}; ensure all '*_colour' values become hex strings before emitting
		const v = ev.detail.value as Record<string, unknown>;
		// IMPORTANT: do NOT mutate v (the form's live value). Clone before normalization to avoid breaking the picker UI.
		const out = JSON.parse(JSON.stringify(v)) as Record<string, unknown>;
		this._normalizeColorsInObject(out);

		// Normalize dynamic line width values if present
		if (out && typeof out === 'object' && out.dynamic_line_width) {
			const clampInt = (
				n: unknown,
				min: number,
				max: number,
			): number | undefined => {
				const num = SunSynkCardEditor._toFiniteNum(n);
				if (num !== undefined)
					return Math.max(min, Math.min(max, Math.round(num)));
				return undefined;
			};
			const max = clampInt(out.max_line_width, 1, 8);
			const min = clampInt(out.min_line_width, 1, 8);
			if (max !== undefined) out.max_line_width = max;
			if (min !== undefined) out.min_line_width = min;
			const curMax = out.max_line_width as number | undefined;
			const curMin = out.min_line_width as number | undefined;
			if (
				typeof curMin === 'number' &&
				typeof curMax === 'number' &&
				curMin > curMax
			) {
				// If swapped, align min to max to keep consistent
				out.min_line_width = curMax;
			}
		}
		// Update local config and emit cloned hex-normalized config; this keeps the form's RGB value intact
		this._emitConfig(out as unknown as sunsynkPowerFlowCardConfig);
	}
}
