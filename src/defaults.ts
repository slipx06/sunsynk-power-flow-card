import { localize } from "./localize/localize";


export default {
    cardstyle: 'lite',
    panel_mode: false,
    large_font: false,
    show_solar: true,
    card_height: '396px',
    inverter: {
        modern: true,
        colour: 'grey',
        autarky: 'power'
    },
    battery: {
        energy: 0,
        shutdown_soc: 20,
        invert_power: false,
        colour: 'pink',
        show_daily: false,
        animation_speed: 6,
        max_power: 4500,
        full_capacity: 80,
        empty_capacity: 30,
    },
    solar: {
        colour: 'orange',
        show_daily: false,
        mppts: 2,
        animation_speed: 9,
        max_power: 8000,
        pv1_name: localize('common.pv1_name'),
        pv2_name: localize('common.pv2_name'),
        pv3_name: localize('common.pv3_name'),
        pv4_name: localize('common.pv4_name'),
    },
    load: {
        colour: '#5fb6ad',
        show_daily: false,
        show_aux: false,
        invert_aux: false,
        animation_speed: 4,
        max_power: 8000,
        aux_name: localize('common.aux_name'),
        aux_type: 'default',
        additional_loads: 0,
        load1_icon: 'default',
        load2_icon: 'default',
        load1_name: localize('common.load1_name'),
        load2_name: localize('common.load2_name'),

    },
    grid: {
        colour: '#5490c2',
        no_grid_colour: '#a40013',
        show_daily_buy: false,
        show_daily_sell: false,
        show_nonessential: true,
        nonessential_icon: 'default',
        nonessential_name: localize('common.nonessential_name'),
        additional_loads: 0,
        load1_name: localize('common.load1_name'),
        load2_name: localize('common.load2_name'),
        load1_icon: 'default',
        load2_icon: 'default',
        invert_grid: false,
        aimation_speed: 8,
        max_power: 8000
    },

}

export const validNonEssDualLoadValues = [0,1,2]
export const validAdditionalLoadValues = [0,1,2]
