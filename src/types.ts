import {LovelaceCard, LovelaceCardConfig} from "custom-card-helpers";

declare global {
    interface HTMLElementTagNameMap {
        'sunsynk-power-flow-card': LovelaceCard;
    }
}

export enum InverterModel {
    Sunsynk = 'sunsynk',
    Lux = 'lux',
    GoodweGridMode = 'goodwe_gridmode',
    Goodwe = 'goodwe',
    Solis = 'solis',
    Huawei = 'huawei',
}

export enum CardStyle {
    Lite = 'lite',
    Full = 'full'
}

export enum AutarkyType {
    Energy = 'energy',
    Power = 'power',
    No = 'no'
}

export interface sunsynkPowerFlowCardConfig extends LovelaceCardConfig {
    type: string;
    cardstyle: CardStyle;
    panel_mode?: boolean;
    large_font?: boolean;
    show_solar: boolean;
    card_height?: string;
    card_width?: string;
    decimal_places?: number;
    inverter: {
        modern: boolean;
        colour: string;
        autarky: AutarkyType;
        model: InverterModel;
        auto_scale: boolean;
        three_phase: boolean;
    }
    battery: {
        energy: number;
        shutdown_soc: number;
        invert_power: boolean;
        colour: string;
        show_daily: boolean;
        animation_speed: number;
        max_power: number;
        full_capacity: number;
        empty_capacity: number;
        show_absolute: boolean;
        auto_scale: boolean;
    }
    solar: {
        colour: string;
        show_daily: boolean;
        mppts: number;
        animation_speed: number;
        max_power: number;
        pv1_name: string;
        pv2_name: string;
        pv3_name: string;
        pv4_name: string;
        auto_scale: boolean;
        display_mode: number;
    }
    load: {
        colour: string;
        dynamic_colour: boolean;
        show_daily: boolean;
        invert_aux: boolean;
        show_absolute_aux: boolean,
        animation_speed: number;
        max_power: number;
        aux_name: string;
        aux_type: string;
        aux_colour: string;
        aux_off_colour: string;
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
        load1_icon: string;
        load2_icon: string;
        load3_icon: string;
        load4_icon: string;
        show_aux: boolean;
        show_daily_aux: boolean;
        auto_scale: boolean;
        essential_name: string,
    }
    grid: {
        colour: string;
        export_colour: string;
        no_grid_colour: string;
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
    }
    entities: CardConfigEntities
}

export interface CardConfigEntities {
    use_timer_248: any,
    priority_load_243: any,
    inverter_voltage_154: string,
    load_frequency_192: string,
    inverter_current_164: string,
    inverter_power_175: string,
    grid_connected_status_194: string,
    inverter_status_59: string,
    day_battery_charge_70: string,
    day_battery_discharge_71: string,
    battery_voltage_183: string,
    battery_soc_184: string,
    battery_power_190: string,
    battery_current_191: string,
    battery_rated_capacity: string;
    grid_power_169: string,
    grid_voltage: string,
    day_grid_import_76: string,
    day_grid_export_77: string,
    grid_ct_power_172: string,
    grid_ct_power_total: string,
    day_load_energy_84: string,
    essential_power: string,
    nonessential_power: string,
    aux_power_166: string,
    day_pv_energy_108: string,
    pv1_power_186: string,
    pv2_power_187: string,
    pv1_voltage_109: string,
    pv1_current_110: string,
    pv2_voltage_111: string,
    pv2_current_112: string,
    pv3_voltage_113: string,
    pv3_current_114: string,
    pv3_power_188: string,
    pv4_voltage_115: string,
    pv4_current_116: string,
    pv4_power_189: string,
    remaining_solar: string,
    battery_temp_182: string,
    dc_transformer_temp_90: string,
    environment_temp: string,
    radiator_temp_91: string,
    non_essential_load1: string,
    non_essential_load2: string,
    non_essential_load3: string,
    essential_load1: string
    energy_cost_buy: string,
    solar_sell_247: string,
    essential_load2: string,
    essential_load4: string,
    battery_status: string,
    aux_load1_extra: string,
    aux_load2_extra: string,
    pv_total: string,
    aux_connected_status: string,
    aux_load1: string,
    aux_load2: string,
    day_aux_energy: string,
    energy_cost_sell: string,
    essential_load1_extra: string,
    essential_load2_extra: string,
    inverter_voltage_L2: string,
    inverter_voltage_L3: string,
    inverter_current_L2: string,
    inverter_current_L3: string,
    grid_ct_power_L2: string,
    grid_ct_power_L3: string,
    load_power_L1: string,
    load_power_L2: string,
    load_power_L3: string,
    total_pv_generation: string,
    essential_load3: string,
    battery_current_direction: string,

    prog1_time: string,
    prog2_time: string,
    prog3_time: string,
    prog4_time: string,
    prog5_time: string,
    prog6_time: string,
    prog1_capacity: string,
    prog2_capacity: string,
    prog3_capacity: string,
    prog4_capacity: string,
    prog5_capacity: string,
    prog6_capacity: string,
    prog1_charge: string,
    prog2_charge: string,
    prog3_charge: string,
    prog4_charge: string,
    prog5_charge: string,
    prog6_charge: string,
}

export interface InverterSettings {
    entityID: string;
    show?: boolean;
    charge?: string;
    capacity: number;
}
