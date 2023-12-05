import {css, CSSResultGroup, html, LitElement, TemplateResult} from 'lit';
import {fireEvent, HomeAssistant, LovelaceCardEditor} from 'custom-card-helpers';

import {ScopedRegistryHost} from '@lit-labs/scoped-registry-mixin';
import {CardStyle, InverterModel, sunsynkPowerFlowCardConfig} from './types';
import {customElement, property, state} from 'lit/decorators.js';
import {localize} from './localize/localize';
import {capitalize} from 'lodash';

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
                        /*{name: "entity", selector: {entity: {domain: "power"}}},
                        {name: "battery_sensor", selector: {entity: {device_class: "battery"}}},*/
                        {
                            type: "grid",
                            schema: [
                                {name: "title", selector: { text: {}}},
                                {name: "title_colour", selector: {text: {}}},
                                {name: "title_size", selector: {text: {}}},
                                {name: "decimal_places", selector: {number: {}}},
                            ]
                        },{
                            name: "cardstyle",
                            selector: {
                                select: {
                                    options: Object.values(CardStyle).map(x => ({label: capitalize(x), value: x}))
                                }
                            }
                        },{
                            type: "grid",
                            schema: [
                                {name: "large_font", selector: {boolean: {}}},
                                {name: "panel_mode", selector: {boolean: {}}},
                            ]
                        },{
                            type: "grid",
                            schema: [
                                {name: "show_solar",selector: {boolean: {}}},
                                {name: "show_battery",selector: {boolean: {}}},
                                {name: "show_grid",selector: {boolean: {}}},  
                            ]
                        },{
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
                                            options: [{label: 'No', value: 'no'},
                                                {label: 'Energy', value: 'energy'},
                                                {label: 'Power', value: 'power'}
                                            ]
                                        }
                                    }
                                },
                            ]
                        },{
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
                        }, {
                            name: "battery",
                            type: "grid",
                            schema: [
                                {name: 'show_daily', selector: {boolean: {}}},
                                {name: 'energy', selector: {number: {min: 0,}}},
                                {name: 'shutdown_soc', selector: {number: {min: 0, max: 100,}}},
                                {name: 'colour', selector: {color_rgb: {}}},
                                {name: 'animation_speed', selector: {number: {}}},
                                {name: 'max_power', selector: {number: {}}}
                            ]
                        }, {
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
                        }, {
                            name: "grid",
                            type: "grid",
                            schema: [
                                {name: 'show_daily_buy', selector: {boolean: {}}},
                                {name: 'no_grid_colour', selector: {color_rgb: {}}},
                                {name: 'animation_speed', selector: {number: {}}},
                                {name: 'max_power', selector: {number: {}}},
                                {name: "invert_grid", selector: {boolean: {}}}
                            ]
                        }, {
                            name: "entities",
                            type: "grid",
                            schema: [
                                {name: "battery_rated_capacity", selector: {entity: {}}},
                                {name: "battery_temp_182", selector: {entity: {}}},
                                {name: "dc_transformer_temp_90", selector: {entity: {}}},
                                {name: "day_battery_charge_70", selector: {entity: {}}},
                                {name: "day_battery_discharge_71", selector: {entity: {}}},
                                {name: "day_load_energy_84", selector: {entity: {}}},
                                {name: "day_grid_import_76", selector: {entity: {}}},
                                {name: "day_grid_export_77", selector: {entity: {}}},
                                {name: "day_pv_energy_108", selector: {entity: {}}},
                                {name: "inverter_voltage_154", selector: {entity: {}}},
                                {name: "load_frequency_192", selector: {entity: {}}},
                                {name: "inverter_current_164", selector: {entity: {}}},
                                {name: "inverter_power_175", selector: {entity: {}}},
                                {name: "grid_power_169", selector: {entity: {}}},
                                {name: "battery_voltage_183", selector: {entity: {}}},
                                {name: "battery_soc_184", selector: {entity: {}}},
                                {name: "battery_power_190", selector: {entity: {}}},
                                {name: "battery_current_191", selector: {entity: {}}},
                                {name: "essential_power", selector: {entity: {}}},
                                {name: "essential_load1", selector: {entity: {}}},
                                {name: "essential_load2", selector: {entity: {}}},
                                {name: "grid_ct_power_172", selector: {entity: {}}},
                                {name: "pv1_voltage_109", selector: {entity: {}}},
                                {name: "pv1_current_110", selector: {entity: {}}},
                                {name: "pv1_power_186", selector: {entity: {}}},
                                {name: "pv2_power_187", selector: {entity: {}}},
                                {name: "pv_total", selector: {entity: {}}},
                                {name: "pv2_voltage_111", selector: {entity: {}}},
                                {name: "pv2_current_112", selector: {entity: {}}},
                                {name: "grid_voltage", selector: {entity: {}}},
                                {name: "battery_current_direction", selector: {entity: {}}},
                                {name: "inverter_status_59", selector: {entity: {}}},
                                {name: "remaining_solar", selector: {entity: {}}},
                            ]
                        }
                    ]}
                    @value-changed=${(e) => this._valueChanged(e)}
            ></ha-form>
        `;
    }

    private _computeLabelCallback = (data) => {
        return localize(`config.${data.name}`) ?? data.name
    }

    private _valueChanged(ev): void {
        console.log(ev.detail.value)
        console.log(ev)
        this.setConfig(ev.detail.value)
        fireEvent(this, 'config-changed', {config: this._config});
    }

    static styles: CSSResultGroup = css`
      ha-formfield {
        height: 20px !important;
      }

      mwc-select,
      mwc-textfield {
        display: block;
      }

      mwc-formfield {
        height: 20px !important;
        display: flex;
      }

      mwc-switch {
        --mdc-theme-secondary: var(--switch-checked-color);
      }
    `;
}
