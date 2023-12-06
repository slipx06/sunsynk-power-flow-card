import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {fireEvent, HomeAssistant, LovelaceCardEditor} from 'custom-card-helpers';

import {ScopedRegistryHost} from '@lit-labs/scoped-registry-mixin';
import {AutarkyType, CardStyle, InverterModel, sunsynkPowerFlowCardConfig} from './types';
import {customElement, property, state} from 'lit/decorators.js';
import {localize} from './localize/localize';
import {capitalize} from 'lodash';
import {SensorDeviceClass} from './const';

@customElement('content-card-editor')
export class SunSynkCardEditor extends ScopedRegistryHost(LitElement) implements LovelaceCardEditor {
    @property({attribute: false}) public hass?: HomeAssistant;
    @state() private _config?: sunsynkPowerFlowCardConfig;

    public setConfig(config: sunsynkPowerFlowCardConfig): void {
        this._config = config;
    }

    protected render(): TemplateResult | void {
        if (!this.hass || !this._config) {
            return html``;
        }

        return html`
            <ha-form
                    .hass=${this.hass}
                    .data=${this._config}
                    .computeLabel=${this._computeLabelCallback}
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
                                    {name: "decimal_places", selector: {number: {}}},
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
                                    {name: "show_solar", selector: {boolean: {}}},
                                    {name: "show_battery", selector: {boolean: {}}},
                                    {name: "show_grid", selector: {boolean: {}}},
                                ]
                            }]
                        },
                        {
                            type: "expandable",
                            title: this._title('inverter'),
                            schema: [{
                                name: "inverter",
                                type: "grid",
                                schema: [
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
                                    {
                                        name: 'modern',
                                        selector: {boolean: {}}
                                    },
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
                                    {name: 'mppts', selector: {number: {min: 0, max: 4,}}},
                                    {name: 'show_daily', selector: {boolean: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: 'colour', selector: {color_rgb: {}}},
                                    {name: 'pv1_name', selector: {text: {}}},
                                    {name: 'pv2_name', selector: {text: {}}},
                                ]
                            }]
                        }, {
                            type: "expandable",
                            title: this._title('battery'),
                            schema: [{
                                name: "battery",
                                type: "grid",
                                schema: [
                                    {name: 'show_daily', selector: {boolean: {}}},
                                    {name: 'energy', selector: {number: {min: 0,}}},
                                    {name: 'shutdown_soc', selector: {number: {mode: 'box', min: 0, max: 100,}}},
                                    {name: 'colour', selector: {color_rgb: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}}
                                ]
                            }]
                        },
                        {
                            type: "expandable",
                            title: this._title('load'),
                            schema: [{
                                name: "load",
                                type: "grid",
                                schema: [
                                    {name: 'show_aux', selector: {boolean: {}}},
                                    {name: 'show_daily', selector: {boolean: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: 'load1_name', selector: {text: {}}},
                                    {name: 'load1_icon', selector: {icon: {}}},
                                    {name: 'load2_name', selector: {text: {}}},
                                    {name: 'load2_icon', selector: {icon: {}}}
                                ]
                            }]
                        }, {
                            type: "expandable",
                            title: this._title('grid'),
                            schema: [{
                                name: "grid",
                                type: "grid",
                                schema: [
                                    {name: 'show_daily_buy', selector: {boolean: {}}},
                                    {name: 'no_grid_colour', selector: {color_rgb: {}}},
                                    {name: 'animation_speed', selector: {number: {}}},
                                    {name: 'max_power', selector: {number: {}}},
                                    {name: "invert_grid", selector: {boolean: {}}}
                                ]
                            }]
                        }, {
                            type: "expandable",
                            title: this._title('entities'),
                            schema: [{
                                name: "entities",
                                type: "grid",
                                schema: [
                                    {name: "battery_rated_capacity", selector: {entity: {}}},
                                    {name: "battery_temp_182", selector: {entity: {device_class: SensorDeviceClass.TEMPERATURE}}},
                                    {name: "dc_transformer_temp_90", selector: {entity: {device_class: SensorDeviceClass.TEMPERATURE}}},
                                    {name: "day_battery_charge_70", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                    {name: "day_battery_discharge_71", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                    {name: "day_load_energy_84", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                    {name: "day_grid_import_76", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                    {name: "day_grid_export_77", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                    {name: "day_pv_energy_108", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                    {name: "inverter_voltage_154", selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}},
                                    {name: "load_frequency_192", selector: {entity: {device_class: SensorDeviceClass.FREQUENCY}}},
                                    {name: "inverter_current_164", selector: {entity: {device_class: SensorDeviceClass.CURRENT}}},
                                    {name: "inverter_power_175", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "grid_power_169", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "battery_voltage_183", selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}},
                                    {name: "battery_soc_184", selector: {entity: {device_class: SensorDeviceClass.BATTERY}}},
                                    {name: "battery_power_190", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "battery_current_191", selector: {entity: {device_class: SensorDeviceClass.CURRENT}}},
                                    {name: "essential_power", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "essential_load1", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "essential_load2", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "grid_ct_power_172", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "pv1_voltage_109", selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}},
                                    {name: "pv1_current_110", selector: {entity: {device_class: SensorDeviceClass.CURRENT}}},
                                    {name: "pv1_power_186", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "pv2_power_187", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "pv_total", selector: {entity: {device_class: SensorDeviceClass.POWER}}},
                                    {name: "pv2_voltage_111", selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}},
                                    {name: "pv2_current_112", selector: {entity: {device_class: SensorDeviceClass.CURRENT}}},
                                    {name: "grid_voltage", selector: {entity: {device_class: SensorDeviceClass.VOLTAGE}}},
                                    {name: "battery_current_direction", selector: {entity: {}}},
                                    {name: "inverter_status_59", selector: {entity: {}}},
                                    {name: "remaining_solar", selector: {entity: {device_class: SensorDeviceClass.ENERGY}}},
                                ]
                            }]
                        }
                    ]}
                    @value-changed=${(e) => this._valueChanged(e)}
            ></ha-form>
        `;
    }

    private _computeLabelCallback = (data) => {
        return localize(`config.${data.name}`) ?? data.name
    }

    private _title(opt) {
        return localize(`config.cat_title.${opt}`) ?? opt
    }

    private _valueChanged(ev): void {
        this.setConfig(ev.detail.value)
        fireEvent(this, 'config-changed', {config: this._config});
    }

    static styles: CSSResultGroup = css`

    `;
}
