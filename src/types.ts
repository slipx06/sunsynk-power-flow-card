import { LovelaceCard, LovelaceCardConfig } from 'custom-card-helpers';
import { CustomEntity } from './inverters/dto/custom-entity';

declare global {
	interface HTMLElementTagNameMap {
		'sunsynk-power-flow-card': LovelaceCard;
	}
}

export enum InverterModel {
	Azzurro = 'azzurro',
	CESBatteryBox = 'ces-battery-box',
	Deye = 'deye',
	E3dc = 'e3dc',
	Easun = 'easun',
	Ferroamp = 'ferroamp',
	FoxESS = 'foxess',
	Fronius = 'fronius',
	Goodwe = 'goodwe',
	GoodweGridMode = 'goodwe_gridmode',
	Growatt = 'growatt',
	Huawei = 'huawei',
	Linky = 'linky',
	Lux = 'lux',
	MakeSkyBlue = 'makeskyblue',
	MPPSolar = 'mppsolar',
	PowMr = 'powmr',
	Sigenergy = 'sigenergy',
	SMASolar = 'smasolar',
	Sofar = 'sofar',
	SolarEdge = 'solaredge',
	Solax = 'solax',
	Solis = 'solis',
	Solinteg = 'solinteg',
	Sungrow = 'sungrow',
	Sunsynk = 'sunsynk',
	Victron = 'victron',
}

export enum CardStyle {
	Compact = 'compact',
	Lite = 'lite',
	Full = 'full',
}

export enum AutarkyType {
	Energy = 'energy',
	Power = 'power',
	No = 'no',
}

export interface sunsynkPowerFlowCardConfig extends LovelaceCardConfig {
	type: string;
	cardstyle: CardStyle;
	wide?: boolean;
	large_font?: boolean;
	show_solar: boolean;
	show_battery: boolean;
	show_grid: boolean;
	card_height?: string;
	card_width?: string;
	decimal_places?: number;
	decimal_places_energy?: number;
	dynamic_line_width?: boolean;
	max_line_width: number;
	min_line_width: number;
	inverter: {
		modern: boolean;
		colour: string;
		autarky: AutarkyType;
		model: InverterModel;
		auto_scale: boolean;
		three_phase: boolean;
		navigate: string;
	};
	battery: {
		count: number;
		energy: any;
		shutdown_soc: any;
		shutdown_soc_offgrid: any;
		soc_end_of_charge: any;
		hide_soc: boolean;
		invert_power: boolean;
		colour: string;
		charge_colour: string;
		show_daily: boolean;
		animation_speed: number;
		max_power: any;
		full_capacity: number;
		empty_capacity: number;
		show_absolute: boolean;
		auto_scale: boolean;
		show_remaining_energy: boolean;
		remaining_energy_to_shutdown: boolean;
		dynamic_colour: boolean;
		linear_gradient: boolean;
		animate: boolean;
		path_threshold: number;
		navigate: string;
		invert_flow: boolean;
		soc_decimal_places?: number;
	};
	battery2: {
		energy: any;
		shutdown_soc: any;
		shutdown_soc_offgrid: any;
		soc_end_of_charge: any;
		hide_soc: boolean;
		invert_power: boolean;
		colour: string;
		charge_colour: string;
		full_capacity: number;
		empty_capacity: number;
		show_absolute: boolean;
		auto_scale: boolean;
		show_remaining_energy: boolean;
		remaining_energy_to_shutdown: boolean;
		dynamic_colour: boolean;
		linear_gradient: boolean;
		animate: boolean;
		path_threshold: number;
		navigate: string;
		invert_flow: boolean;
		soc_decimal_places?: number;
	};
	solar: {
		colour: string;
		show_daily: boolean;
		mppts: number;
		animation_speed: number;
		max_power: number;
		pv1_name: string;
		pv1_max_power: number;
		pv2_name: string;
		pv2_max_power: number;
		pv3_name: string;
		pv3_max_power: number;
		pv4_name: string;
		pv4_max_power: number;
		pv5_name: string;
		pv5_max_power: number;
		pv6_name: string;
		pv6_max_power: number;
		auto_scale: boolean;
		display_mode: number;
		dynamic_colour: boolean;
		efficiency: number;
		off_threshold: number;
		navigate: string;
		invert_flow: boolean;
		custom_label: string;
	};
	load: {
		colour: string;
		off_colour: string;
		dynamic_colour: boolean;
		aux_dynamic_colour: boolean;
		dynamic_icon: boolean;
		show_daily: boolean;
		invert_aux: boolean;
		invert_load: boolean;
		show_absolute_aux: boolean;
		animation_speed: number;
		max_power: number;
		aux_name: string;
		aux_daily_name: string;
		aux_type: string;
		aux_colour: string;
		aux_off_colour: string;
		off_threshold: number;
		load1_max_threshold: number;
		load2_max_threshold: number;
		load3_max_threshold: number;
		load4_max_threshold: number;
		load5_max_threshold: number;
		load6_max_threshold: number;
		max_colour: string;
		additional_loads: number;
		aux_loads: number;
		aux_load1_name: string;
		aux_load2_name: string;
		aux_load1_icon: string;
		aux_load2_icon: string;
		load1_name: string;
		load2_name: string;
		load3_name: string;
		load4_name: string;
		load5_name: string;
		load6_name: string;
		load1_switch: string;
		load2_switch: string;
		load3_switch: string;
		load4_switch: string;
		load5_switch: string;
		load6_switch: string;
		load1_icon: string;
		load2_icon: string;
		load3_icon: string;
		load4_icon: string;
		load5_icon: string;
		load6_icon: string;
		show_aux: boolean;
		show_daily_aux: boolean;
		auto_scale: boolean;
		essential_name: string;
		path_threshold: number;
		navigate: string;
		invert_flow: boolean;
		label_daily_load: string;
	};
	grid: {
		colour: string;
		grid_name: string;
		label_daily_grid_buy: string;
		label_daily_grid_sell: string;
		export_colour: string;
		no_grid_colour: string;
		grid_off_colour: string;
		show_daily_buy: boolean;
		show_daily_sell: boolean;
		show_nonessential: boolean;
		nonessential_icon: string;
		nonessential_name: string;
		additional_loads: number;
		load1_name: string;
		load2_name: string;
		load3_name: string;
		load1_icon: string;
		load2_icon: string;
		load3_icon: string;
		invert_grid: boolean;
		animation_speed: number;
		max_power: number;
		auto_scale: boolean;
		energy_cost_decimals: number;
		show_absolute: boolean;
		off_threshold: number;
		import_icon: string;
		export_icon: string;
		disconnected_icon: string;
		navigate: string;
		invert_flow: boolean;
	};
	entities: CardConfigEntities;
}

export interface CardConfigEntities {
	use_timer_248: any;
	priority_load_243: any;
	inverter_voltage_154: string;
	load_frequency_192: string;
	inverter_current_164: string;
	inverter_power_175: string;
	grid_connected_status_194: string;
	inverter_status_59: string;
	day_battery_charge_70: string;
	day_battery_discharge_71: string;
	battery_voltage_183: string;
	battery_soc_184: string;
	battery_power_190: string;
	battery_current_191: string;
	battery_rated_capacity: string;
	battery_soh: string;
	battery2_voltage_183: string;
	battery2_soc_184: string;
	battery2_power_190: string;
	battery2_current_191: string;
	battery2_rated_capacity: string;
	battery2_soh: string;
	grid_power_169: string;
	grid_voltage: string;
	day_grid_import_76: string;
	day_grid_export_77: string;
	grid_ct_power_172: string;
	grid_ct_power_total: string;
	day_load_energy_84: string;
	essential_power: string;
	nonessential_power: string;
	aux_power_166: string;
	day_pv_energy_108: string;
	pv1_power_186: string;
	pv2_power_187: string;
	pv1_voltage_109: string;
	pv1_current_110: string;
	pv2_voltage_111: string;
	pv2_current_112: string;
	pv3_voltage_113: string;
	pv3_current_114: string;
	pv3_power_188: string;
	pv4_voltage_115: string;
	pv4_current_116: string;
	pv4_power_189: string;
	pv5_voltage: string;
	pv5_current: string;
	pv5_power: string;
	pv6_voltage: string;
	pv6_current: string;
	pv6_power: string;
	remaining_solar: string;
	battery_temp_182: string;
	battery2_temp_182: string;
	dc_transformer_temp_90: string;
	environment_temp: string;
	radiator_temp_91: string;
	non_essential_load1: string;
	non_essential_load2: string;
	non_essential_load3: string;
	non_essential_load1_extra: string;
	non_essential_load2_extra: string;
	non_essential_load3_extra: string;
	essential_load1: string;
	essential_load2: string;
	essential_load3: string;
	essential_load4: string;
	essential_load5: string;
	essential_load6: string;
	energy_cost_buy: string;
	solar_sell_247: string;
	battery_status: string;
	battery2_status: string;
	aux_load1_extra: string;
	aux_load2_extra: string;
	pv_total: string;
	aux_connected_status: string;
	aux_load1: string;
	aux_load2: string;
	day_aux_energy: string;
	energy_cost_sell: string;
	essential_load1_extra: string;
	essential_load2_extra: string;
	essential_load3_extra: string;
	essential_load4_extra: string;
	essential_load5_extra: string;
	essential_load6_extra: string;
	inverter_voltage_L2: string;
	inverter_voltage_L3: string;
	inverter_current_L2: string;
	inverter_current_L3: string;
	grid_ct_power_L2: string;
	grid_ct_power_L3: string;
	load_power_L1: string;
	load_power_L2: string;
	load_power_L3: string;
	total_pv_generation: string;
	battery_current_direction: string;
	prepaid_units: string;
	prog1_time: string;
	prog2_time: string;
	prog3_time: string;
	prog4_time: string;
	prog5_time: string;
	prog6_time: string;
	prog1_capacity: string;
	prog2_capacity: string;
	prog3_capacity: string;
	prog4_capacity: string;
	prog5_capacity: string;
	prog6_capacity: string;
	prog1_charge: string;
	prog2_charge: string;
	prog3_charge: string;
	prog4_charge: string;
	prog5_charge: string;
	prog6_charge: string;
	max_sell_power: string;
}

export interface InverterSettings {
	entityID: string;
	show?: boolean;
	charge?: string;
	capacity: number;
}

export interface DataDto {
	timestamp_id: number;
	config: sunsynkPowerFlowCardConfig;
	compactMode;
	viewBoxYLite;
	viewBoxHeightLite;
	cardHeight;
	cardWidth;
	loadColour;
	load1Colour;
	load2Colour;
	batteryColour;
	battery2Colour;
	gridColour;
	isFloating;
	isFloating2;
	isFloatingCombined;
	inverterColour;
	solarColour;
	auxOffColour;
	batteryEnergy;
	battery2Energy;
	batteryTotalEnergy;
	largeFont;
	batteryPower;
	battery2Power;
	batteryPowerTotal;
	batteryDuration;
	batteryDuration2;
	batteryCapacity;
	battery2Capacity;
	additionalLoad;
	essIconSize;
	essIcon;
	batteryStateMsg;
	battery2StateMsg;
	solarShowDaily;
	batteryPercentage;
	pvPercentage;
	loadShowDaily;
	loadPowerL1;
	loadPowerL2;
	loadPowerL3;
	durationCur;
	gridPower;
	gridPowerL2;
	gridPowerL3;
	decimalPlaces;
	decimalPlacesEnergy;
	loadFrequency;
	gridShowDailyBuy;
	gridShowDailySell;
	batteryShowDaily;
	inverterModel;
	batteryShutdown;
	batteryShutdown2;
	enableAutarky;
	autarkyPower;
	ratioPower;
	ratioEnergy;
	autarkyEnergy;
	shutdownOffGrid;
	shutdownOffGrid2;
	batteryOneShutdown;
	batteryTwoShutdown;
	energyCost;
	inverterCurrent;
	inverterCurrentL2;
	inverterCurrentL3;
	inverterVoltage;
	inverterVoltageL2;
	inverterVoltageL3;
	batteryVoltage;
	battery2Voltage;
	batLineWidth;
	totalGridPower;
	solarLineWidth;
	totalPV;
	loadLineWidth;
	pvPercentageBat;
	gridPercentageBat;
	genericInverterImage;
	battery0;
	battery20;
	essentialPower: number;
	pv1LineWidth;
	pv2LineWidth;
	pv3LineWidth;
	pv4LineWidth;
	pv5LineWidth;
	pv6LineWidth;
	gridLineWidth;
	pv1PowerWatts;
	pv2PowerWatts;
	pv3PowerWatts;
	pv4PowerWatts;
	pv5PowerWatts;
	pv6PowerWatts;
	batteryStateColour;
	battery2StateColour;
	inverterStateColour;
	iconEssentialLoad1;
	iconEssentialLoad2;
	iconEssentialLoad3;
	iconEssentialLoad4;
	iconEssentialLoad5;
	iconEssentialLoad6;
	enableTimer;
	priorityLoad;
	inverterImg;
	remainingSolar;
	totalSolarGeneration;
	minLineWidth;
	stopColour;
	stop2Colour;
	gridStatus;
	batteryCharge;
	battery2Charge;
	gridOffColour;
	batteryIcon;
	battery2Icon;
	formattedResultTime;
	formattedResultTime2;
	showAux;
	nonessentialIcon;
	showNonessential;
	auxStatus;
	nonessentialLoads;
	additionalAuxLoad;
	iconNonessentialLoad1;
	iconNonessentialLoad2;
	iconNonessentialLoad3;
	inverterStateMsg;
	auxType;
	showDailyAux;
	nonessentialPower;
	auxPower;
	nonessLineWidth;
	grid169LineWidth;
	auxLineWidth;
	iconAuxLoad1;
	iconAuxLoad2;
	autoScaledInverterPower;
	autoScaledGridPower;
	auxDynamicColour;
	auxDynamicColourLoad1;
	auxDynamicColourLoad2;
	stateDayLoadEnergy: CustomEntity;
	stateDayBatteryDischarge: CustomEntity;
	stateDayGridImport: CustomEntity;
	stateDayBatteryCharge: CustomEntity;
	stateDayGridExport: CustomEntity;
	stateDayPVEnergy: CustomEntity;
	stateDayAuxEnergy: CustomEntity;
	inverterProg;
	stateUseTimer: CustomEntity;
	stateBatterySoc: CustomEntity;
	stateBattery2Soc: CustomEntity;
	stateEnergyCostSell: CustomEntity;
	stateEnergyCostBuy: CustomEntity;
	stateEssentialLoad1: CustomEntity;
	stateEssentialLoad2: CustomEntity;
	stateEssentialLoad3: CustomEntity;
	stateEssentialLoad4: CustomEntity;
	stateEssentialLoad5: CustomEntity;
	stateEssentialLoad6: CustomEntity;
	stateEssentialLoad1Extra: CustomEntity;
	stateEssentialLoad2Extra: CustomEntity;
	stateEssentialLoad3Extra: CustomEntity;
	stateEssentialLoad4Extra: CustomEntity;
	stateEssentialLoad5Extra: CustomEntity;
	stateEssentialLoad6Extra: CustomEntity;
	stateNonEssentialLoad1Extra: CustomEntity;
	stateNonEssentialLoad2Extra: CustomEntity;
	stateNonEssentialLoad3Extra: CustomEntity;
	statePV4Current: CustomEntity;
	statePV1Current: CustomEntity;
	statePV2Current: CustomEntity;
	statePV3Current: CustomEntity;
	statePV5Current: CustomEntity;
	statePV6Current: CustomEntity;
	stateRadiatorTemp: CustomEntity;
	stateBatteryCurrent: CustomEntity;
	stateBattery2Current: CustomEntity;
	stateEnvironmentTemp: CustomEntity;
	statePV1Voltage: CustomEntity;
	statePV2Voltage: CustomEntity;
	statePV3Voltage: CustomEntity;
	statePV4Voltage: CustomEntity;
	statePV5Voltage: CustomEntity;
	statePV6Voltage: CustomEntity;
	stateBatteryTemp: CustomEntity;
	stateBattery2Temp: CustomEntity;
	statePrepaidUnits: CustomEntity;
	stateDCTransformerTemp: CustomEntity;
	stateSolarSell: CustomEntity;
	statePV2Power: CustomEntity;
	statePV3Power: CustomEntity;
	statePV4Power: CustomEntity;
	statePV5Power: CustomEntity;
	statePV6Power: CustomEntity;
	statePVTotal: CustomEntity;
	statePV1Power: CustomEntity;
	stateAuxLoad1Extra: CustomEntity;
	stateAuxLoad2Extra: CustomEntity;
	stateAuxLoad1: CustomEntity;
	stateAuxLoad2: CustomEntity;
	stateNonessentialLoad1: CustomEntity;
	stateNonessentialLoad2: CustomEntity;
	stateNonessentialLoad3: CustomEntity;
	stateMaxSellPower: CustomEntity;
	totalPVEfficiency;
	PV1Efficiency;
	PV2Efficiency;
	PV3Efficiency;
	PV4Efficiency;
	PV5Efficiency;
	PV6Efficiency;
	gridPercentage;
	flowColour;
	flowBatColour;
	flowInvColour;
	dynamicColourEssentialLoad1;
	dynamicColourEssentialLoad2;
	dynamicColourEssentialLoad3;
	dynamicColourEssentialLoad4;
	dynamicColourEssentialLoad5;
	dynamicColourEssentialLoad6;
	dynamicColourNonEssentialLoad1;
	dynamicColourNonEssentialLoad2;
	dynamicColourNonEssentialLoad3;
	stateBatterySOH: CustomEntity;
	stateBattery2SOH: CustomEntity;
	customGridIcon;
	customGridIconColour;
	maximumSOC;
	batteryCount;
}
