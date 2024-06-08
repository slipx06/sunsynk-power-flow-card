import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {fireEvent, HomeAssistant, LovelaceCardEditor} from 'custom-card-helpers';

import {AutarkyType, CardStyle, InverterModel, sunsynkPowerFlowCardConfig} from './types';
import {customElement, property} from 'lit/decorators.js';
import {localize} from './localize/localize';
import {capitalize} from 'lodash';
import {EDITOR_NAME, SensorDeviceClass} from './const';
import {LovelaceConfig} from 'custom-card-helpers/src/types';

@customElement(EDITOR_NAME)
export class SunSynkCardEditor extends LitElement implements LovelaceCardEditor {
    @property() public hass!: HomeAssistant;
    @property() private _config!: sunsynkPowerFlowCardConfig;
    @property() lovelace?: LovelaceConfig;

    public setConfig(config: sunsynkPowerFlowCardConfig): void {
        this._config = {...this._config, ...config};
    }

    protected render(): TemplateResult | void {
        if (!this._config || !this.hass) {
            return html``;
        }

        return html`
            <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .computeLabel=${this._computeLabelCallback.bind(this)}
                    .schema=${[
                        {
                            type: "expandable",
                            title: this._title('title'),
                            schema: [{
                                type: "grid",
                                schema: [
                                    {name: "title", selector: {text: {}}},
                                    {name: "title_colour", selector: {color_rgb: {}}},
                                    {name: "title_size", selector: {text: {}}},
                                ]
                            }]
                        },
                        {
                            name: "cardstyle",
                            selector: {
                                select: {
                                    options: Object.values(CardStyle).map(x => ({label: capitalize(x), value: x}))
                                }
                            }
                        },
                        {
                            type: "expandable",
                            title: this._title('general'),
                            schema: [{
                                type: "grid",
                                schema: [
                                    {name: "large_font", selector: {boolean: {}}},
                                    {name: "panel_mode", selector: {boolean: {}}},
                                    {name: 'card_height', selector: {text: {}}},
                                    {name: 'card_width', selector: {text: {}}},
                                    {name: "show_solar", selector: {boolean: {}}},
                                    {name: "show_battery", selector: {boolean: {}}},
                                    {name: "show_grid", selector: {boolean: {}}},
                                    {name: "decimal_places", selector: {number: {}}},
                                    {name: "decimal_places_energy", selector: {number: {}}},
                                    {name: "dynamic_line_width", selector: {boolean: {}}},
                                    {name: "max_line_width", selector: {number: {}}},
                                    {name: "min_line_width", selector: {number: {}}},
                                ]
                            }, {
                                type: "expandable",
                                title: this._title('sensor'),
                                schema: [{
                                    type: "grid",
                                    schema: [
                                        {name: 'card_height', selector: {entity: {}}},
                                        {name: 'card_width', selector: {entity: {}}},
                                    ]
                                }]
                            }]
                        },
                        {
                            type: "expandable",
                            title: this._title('inverter'),
                            schema: [{
                                name: "inverter",
                                type: "grid",
                                schema: [
                                    {name: 'three_phase', selector: {boolean: {}}},
                                    {name: 'auto_scale', selector: {boolean: {}}},
                                    {
                                        name: 'model',
                                        selector: {
                                            select: {
                                                options: Object.values(InverterModel).map(x => ({
                                                    label: capitalize(x),
                                                    value: x
                                                }))
                                            }
                                        }
                                    },
                                    {name: 'modern', selector: {boolean: {}}},
                                    {
                                        name: 'autarky',
                                        selector: {
                                            select: {
                                                options: Object.values(AutarkyType).map(x => ({
                                                    label: capitalize(x),
                                                    value: x
                                                }))
                                            }
                                        }
                                    },
                                    {name: 'colour', selector: {color_rgb: {}}},
                                ]
                            }]
                        },
                        {
                            type: "expandable",
                            title: this._title('solar'),
                            schema: [{
                                name: "solar",
                                type: "grid",
                                schema: [
                                    {name: 'mppts', selector: {number: {min: 1, max: 4,}}},
                                    {name: 'show_daily', selector: {boolean: {}}},
                                    {name: 'pv1_name', selector: {text: {}}},
                                    {name: 'pv2_name', selector: {text: {}}},
                                    {name: 'pv3_name', selector: {text: {}}},
                                    {name: 'pv4_name', selector: {text: {}}},
                                    {name: 'auto_scale', selector: {boolean: {}}},
                                    {name: 'display_mode', selector: {number: {mode: 'box', min: 1, max: 3,}}},
                                    {name: 'colour', selector: {color_rgb: {}}},
                                    {name: 'dynamic_colour', selector: {boolean: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: 'pv1_max_power', selector: {number: {}}},
                                    {name: 'pv2_max_power', selector: {number: {}}},
                                    {name: 'pv3_max_power', selector: {number: {}}},
                                    {name: 'pv4_max_power', selector: {number: {}}},
                                    {name: 'efficiency', selector: {number: {mode: 'box', min: 0, max: 3,}}},
                                    {name: 'off_threshold', selector: {number: {}}},
                                ]
                            }, {
                                type: "expandable",
                                title: this._title('sensor'),
                                schema: [{
                                    name: "solar",
                                    type: "grid",
                                    schema: [
                                        {name: 'max_power', selector: {entity: {}}},
                                        {name: 'pv1_max_power', selector: {entity: {}}},
                                        {name: 'pv2_max_power', selector: {entity: {}}},
                                        {name: 'pv3_max_power', selector: {entity: {}}},
                                        {name: 'pv4_max_power', selector: {entity: {}}},
                                    ]
                                }]
                            }]
                        }, {
                            type: "expandable",
                            title: this._title('battery'),
                            schema: [{
                                name: "battery",
                                type: "grid",
                                schema: [
                                    {name: 'energy', selector: {number: {min: 0,}}},
                                    {name: 'shutdown_soc', selector: {number: {mode: 'box', min: 0, max: 100,}}},
                                    {
                                        name: 'shutdown_soc_offgrid',
                                        selector: {number: {mode: 'box', min: 0, max: 100,}}
                                    },
                                    {name: 'show_daily', selector: {boolean: {}}},
                                    {name: 'auto_scale', selector: {boolean: {}}},
                                    {name: 'invert_power', selector: {boolean: {}}},
                                    {name: 'show_absolute', selector: {boolean: {}}},
                                    {name: 'colour', selector: {color_rgb: {}}},
                                    {name: 'charge_colour', selector: {color_rgb: {}}},
                                    {name: 'dynamic_colour', selector: {boolean: {}}},
                                    {name: 'linear_gradient', selector: {boolean: {}}},
                                    {name: 'animate', selector: {boolean: {}}},
                                    {name: 'hide_soc', selector: {boolean: {}}},
                                    {name: 'show_remaining_energy', selector: {boolean: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: 'path_threshold', selector: {number: {}}},
                                ]
                            }, {
                                type: "expandable",
                                title: this._title('sensor'),
                                schema: [{
                                    name: "battery",
                                    type: "grid",
                                    schema: [
                                        {name: "energy", selector: {entity: {}}},
                                        {name: 'shutdown_soc', selector: {entity: {}}},
                                        {name: 'shutdown_soc_offgrid', selector: {entity: {}}},
                                        {name: 'max_power', selector: {entity: {}}},
                                    ]
                                }]
                            }]
                        },
                        {
                            type: "expandable",
                            title: this._title('load'),
                            schema: [{
                                name: "load",
                                type: "grid",
                                schema: [
                                    {name: 'show_daily', selector: {boolean: {}}},
                                    {name: 'auto_scale', selector: {boolean: {}}},
                                    {name: 'colour', selector: {color_rgb: {}}},
                                    {name: 'dynamic_colour', selector: {boolean: {}}},
                                    {name: 'dynamic_icon', selector: {boolean: {}}},
                                    {name: 'invert_load', selector: {boolean: {}}},
                                    {name: 'essential_name', selector: {text: {}}},
                                    {name: 'additional_loads', selector: {number: {mode: 'box', min: 0, max: 4,}}},
                                    {name: 'load1_name', selector: {text: {}}},
                                    {name: 'load1_icon', selector: {icon: {}}},
                                    {name: 'load2_name', selector: {text: {}}},
                                    {name: 'load2_icon', selector: {icon: {}}},
                                    {name: 'load3_name', selector: {text: {}}},
                                    {name: 'load3_icon', selector: {icon: {}}},
                                    {name: 'load4_name', selector: {text: {}}},
                                    {name: 'load4_icon', selector: {icon: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: 'off_threshold', selector: {number: {}}},
                                    {name: 'path_threshold', selector: {number: {}}},
                                ]
                            }, {
                                type: "expandable",
                                title: this._title('aux'),
                                schema: [{
                                    name: "load",
                                    type: "grid",
                                    schema: [
                                        {name: 'show_aux', selector: {boolean: {}}},
                                        {name: 'aux_name', selector: {text: {}}},
                                        {name: 'aux_daily_name', selector: {text: {}}},
                                        {name: 'aux_type', selector: {icon: {}}},
                                        {name: 'invert_aux', selector: {boolean: {}}},
                                        {name: 'show_absolute_aux', selector: {boolean: {}}},
                                        {name: 'aux_dynamic_colour', selector: {boolean: {}}},
                                        {name: 'aux_colour', selector: {color_rgb: {}}},
                                        {name: 'aux_off_colour', selector: {color_rgb: {}}},
                                        {name: 'aux_loads', selector: {number: {mode: 'box', min: 0, max: 2,}}},
                                        {name: 'aux_load1_name', selector: {text: {}}},
                                        {name: 'aux_load1_icon', selector: {icon: {}}},
                                        {name: 'aux_load2_name', selector: {text: {}}},
                                        {name: 'aux_load2_icon', selector: {icon: {}}},
                                        {name: 'show_daily_aux', selector: {boolean: {}}},
                                    ]
                                }]
                            }, {
                                type: "expandable",
                                title: this._title('sensor'),
                                schema: [{
                                    name: "load",
                                    type: "grid",
                                    schema: [
                                        {name: 'load1_icon', selector: {entity: {}}},
                                        {name: 'load2_icon', selector: {entity: {}}},
                                        {name: 'load3_icon', selector: {entity: {}}},
                                        {name: 'load4_icon', selector: {entity: {}}},
                                        {name: 'aux_load1_icon', selector: {entity: {}}},
                                        {name: 'aux_load2_icon', selector: {entity: {}}},
                                        {name: 'max_power', selector: {entity: {}}},
                                    ]
                                }]
                            }]
                        },
                        {
                            type: "expandable",
                            title: this._title('grid'),
                            schema: [{
                                name: "grid",
                                type: "grid",
                                schema: [
                                    {name: 'show_daily_buy', selector: {boolean: {}}},
                                    {name: 'show_daily_sell', selector: {boolean: {}}},
                                    {name: 'auto_scale', selector: {boolean: {}}},
                                    {name: "invert_grid", selector: {boolean: {}}},
                                    {name: 'colour', selector: {color_rgb: {}}},
                                    {name: 'no_grid_colour', selector: {color_rgb: {}}},
                                    {name: 'export_colour', selector: {color_rgb: {}}},
                                    {name: 'grid_off_colour', selector: {color_rgb: {}}},
                                    {name: 'grid_name', selector: {text: {}}},
                                    {name: 'label_daily_grid_buy', selector: {text: {}}},
                                    {name: 'label_daily_grid_sell', selector: {text: {}}},
                                    {name: 'show_absolute', selector: {boolean: {}}},
                                    {name: 'energy_cost_decimals', selector: {number: {mode: 'box', min: 0, max: 3,}}},
                                    {name: 'show_nonessential', selector: {boolean: {}}},
                                    {name: 'additional_loads', selector: {number: {mode: 'box', min: 0, max: 3,}}},
                                    {name: 'nonessential_name', selector: {text: {}}},
                                    {name: 'nonessential_icon', selector: {icon: {}}},
                                    {name: 'load1_name', selector: {text: {}}},
                                    {name: 'load1_icon', selector: {icon: {}}},
                                    {name: 'load2_name', selector: {text: {}}},
                                    {name: 'load2_icon', selector: {icon: {}}},
                                    {name: 'load3_name', selector: {text: {}}},
                                    {name: 'load3_icon', selector: {icon: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: 'off_threshold', selector: {number: {}}},
                                    {name: 'import_icon', selector: {icon: {}}},
                                    {name: 'export_icon', selector: {icon: {}}},
                                    {name: 'disconnected_icon', selector: {icon: {}}},
                                ]
                            }, {
                                type: "expandable",
                                title: this._title('sensor'),
                                schema: [{
                                    name: "grid",
                                    type: "grid",
                                    schema: [
                                        {name: 'load1_icon', selector: {entity: {}}},
                                        {name: 'load2_icon', selector: {entity: {}}},
                                        {name: 'load3_icon', selector: {entity: {}}},
                                        {name: 'max_power', selector: {entity: {}}},
                                        {name: 'import_icon', selector: {entity: {}}},
                                        {name: 'export_icon', selector: {entity: {}}},
                                        {name: 'disconnected_icon', selector: {entity: {}}},
                                    ]
                                }]
                            }]
                        }, {
                            type: "expandable",
                            title: this._title('entities'),
                            schema: [{
                                type: "expandable",
                                title: this._title('sol'),
                                schema: [{
                                    name: "entities",
                                    type: "grid",
                                    schema: [
                                        {
                                            name: "day_pv_energy_108",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "pv1_power_186",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "pv2_power_187",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "pv3_power_188",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "pv4_power_189",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "pv1_voltage_109",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "pv1_current_110",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "pv2_voltage_111",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "pv2_current_112",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "pv3_voltage_113",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "pv3_current_114",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "pv4_voltage_115",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "pv4_current_116",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {name: "pv_total", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                        {name: "solar_sell_247", selector: {entity: {}}},
                                        {
                                            name: "total_pv_generation",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "remaining_solar",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "environment_temp",
                                            selector: {entity: {device_class: SensorDeviceClass.TEMPERATURE}}
                                        },
                                    ]
                                }]
                            }, {
                                type: "expandable",
                                title: this._title('bat'),
                                schema: [{
                                    name: "entities",
                                    type: "grid",
                                    schema: [
                                        {
                                            name: "battery_power_190",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "battery_current_191",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "battery_temp_182",
                                            selector: {entity: {device_class: SensorDeviceClass.TEMPERATURE}}
                                        },
                                        {
                                            name: "battery_voltage_183",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "battery_soc_184",
                                            selector: {entity: {device_class: SensorDeviceClass.BATTERY}}
                                        },
                                        {
                                            name: "day_battery_charge_70",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "day_battery_discharge_71",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {name: "battery_rated_capacity", selector: {entity: {}}},
                                        {name: "battery_soh", selector: {entity: {}}},
                                        {name: "battery_current_direction", selector: {entity: {}}},
                                        {name: "battery_status", selector: {entity: {}}},
                                    ]
                                }]
                            }, {
                                type: "expandable",
                                title: this._title('inv'),
                                schema: [{
                                    name: "entities",
                                    type: "grid",
                                    schema: [
                                        {name: "inverter_status_59", selector: {entity: {}}},
                                        {name: "use_timer_248", selector: {entity: {}}},
                                        {name: "priority_load_243", selector: {entity: {}}},
                                        {
                                            name: "inverter_voltage_154",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "inverter_voltage_L2",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "inverter_voltage_L3",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "load_frequency_192",
                                            selector: {entity: {device_class: SensorDeviceClass.FREQUENCY}}
                                        },
                                        {
                                            name: "inverter_current_164",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "inverter_current_L2",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "inverter_current_L3",
                                            selector: {entity: {device_class: SensorDeviceClass.CURRENT}}
                                        },
                                        {
                                            name: "inverter_power_175",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "grid_power_169",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "dc_transformer_temp_90",
                                            selector: {entity: {device_class: SensorDeviceClass.TEMPERATURE}}
                                        },
                                        {
                                            name: "radiator_temp_91",
                                            selector: {entity: {device_class: SensorDeviceClass.TEMPERATURE}}
                                        },
                                        {name: "prog1_time", selector: {entity: {}}},
                                        {name: "prog1_capacity", selector: {entity: {}}},
                                        {name: "prog1_charge", selector: {entity: {}}},
                                        {name: "prog2_time", selector: {entity: {}}},
                                        {name: "prog2_capacity", selector: {entity: {}}},
                                        {name: "prog2_charge", selector: {entity: {}}},
                                        {name: "prog3_time", selector: {entity: {}}},
                                        {name: "prog3_capacity", selector: {entity: {}}},
                                        {name: "prog3_charge", selector: {entity: {}}},
                                        {name: "prog4_time", selector: {entity: {}}},
                                        {name: "prog4_capacity", selector: {entity: {}}},
                                        {name: "prog4_charge", selector: {entity: {}}},
                                        {name: "prog5_time", selector: {entity: {}}},
                                        {name: "prog5_capacity", selector: {entity: {}}},
                                        {name: "prog5_charge", selector: {entity: {}}},
                                        {name: "prog6_time", selector: {entity: {}}},
                                        {name: "prog6_capacity", selector: {entity: {}}},
                                        {name: "prog6_charge", selector: {entity: {}}},
                                    ]
                                }]
                            }, {
                                type: "expandable",
                                title: this._title('ld'),
                                schema: [{
                                    name: "entities",
                                    type: "grid",
                                    schema: [
                                        {
                                            name: "day_load_energy_84",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "day_aux_energy",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "essential_power",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "essential_load1",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "essential_load2",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "essential_load3",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "essential_load4",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {name: "essential_load1_extra", selector: {entity: {}}},
                                        {name: "essential_load2_extra", selector: {entity: {}}},
                                        {name: "essential_load3_extra", selector: {entity: {}}},
                                        {name: "essential_load4_extra", selector: {entity: {}}},
                                        {
                                            name: "load_power_L1",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "load_power_L2",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "load_power_L3",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "aux_power_166",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "aux_load1",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "aux_load2",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {name: "aux_load1_extra", selector: {entity: {}}},
                                        {name: "aux_load2_extra", selector: {entity: {}}},
                                        {name: "aux_connected_status", selector: {entity: {}}},
                                    ]
                                }]
                            }, {
                                type: "expandable",
                                title: this._title('gri'),
                                schema: [{
                                    name: "entities",
                                    type: "grid",
                                    schema: [
                                        {
                                            name: "day_grid_import_76",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "day_grid_export_77",
                                            selector: {entity: {device_class: SensorDeviceClass.ENERGY}}
                                        },
                                        {
                                            name: "grid_ct_power_172",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "grid_ct_power_L2",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "grid_ct_power_L3",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "grid_ct_power_total",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "grid_voltage",
                                            selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}
                                        },
                                        {
                                            name: "nonessential_power",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "non_essential_load1",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "non_essential_load2",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {
                                            name: "non_essential_load3",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                        {name: "non_essential_load1_extra", selector: {entity: {}}},
                                        {name: "non_essential_load2_extra", selector: {entity: {}}},
                                        {name: "grid_connected_status_194", selector: {entity: {}}},
                                        {name: "energy_cost_buy", selector: {entity: {}}},
                                        {name: "energy_cost_sell", selector: {entity: {}}},
                                        {name: "prepaid_units", selector: {entity: {}}},
                                        {
                                            name: "max_sell_power",
                                            selector: {entity: {device_class: SensorDeviceClass.POWER}}
                                        },
                                    ]
                                }]
                            }]
                        }
                    ]}
                    @value-changed=${this._valueChanged.bind(this)}
            ></ha-form>
        `;
    }

    private _computeLabelCallback = (data) => localize(`config.${data.name}`) ?? data.name

    private _title(opt) {
        return localize(`config.cat_title.${opt}`) ?? opt
    }

    private _valueChanged(ev: CustomEvent): void {
        fireEvent(this, 'config-changed', {config: ev.detail.value});
    }
}
