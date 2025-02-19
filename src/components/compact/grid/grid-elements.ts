// grid-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfPower, validGridConnected, validGridDisconnected} from '../../../const';


export const renderGridElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Grid Elements -->
        <svg id="Grid" style="overflow: visible">
            <rect x="103" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.gridColour}" pointer-events="all"
                display="${!config.show_grid ? 'none' : ''}"/>
            <text id="daily_grid_buy" x="5" y="282.1" class="st3 left-align"
                fill="${data.gridShowDailyBuy !== true ? 'transparent' : `${data.gridColour}`}"
                display="${!config.show_grid ? 'none' : ''}">
                ${config.grid.label_daily_grid_buy || localize('common.daily_grid_buy')}
            </text>
            <text id="daily_grid_sell" x="5" y="179" class="st3 left-align"
                fill="${data.gridShowDailySell !== true ? 'transparent' : `${data.gridColour}`}"
                display="${!config.show_grid ? 'none' : ''}">
                ${config.grid.label_daily_grid_sell || localize('common.daily_grid_sell')}
            </text>
            <text x="5" y="${config.grid.show_daily_buy ? '294' : '267'}" class="st3 st8 left-align" fill="${data.gridColour}"
                display="${!config.show_grid ? 'none' : ''}">
                ${config.grid.grid_name || localize('common.grid_name')}
            </text>
            <svg id="grid-flow">
                <path id="grid-line" d="${config.wide ? 'M 173 218 L 287 218': 'M 173 218 L 214 218'}" fill="none" stroke="${data.gridColour}"
                    stroke-width="${data.gridLineWidth}" stroke-miterlimit="10" pointer-events="stroke"
                    display="${!config.show_grid ? 'none' : ''}"/>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                        display="${!config.show_grid ? 'none' : ''}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line"/>
                    </animateMotion>
                </circle>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                        display="${!config.show_grid ? 'none' : ''}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="grid1-flow">
                <path id="grid-line1" d="M 103 218 L 64.5 218" fill="none" stroke="${data.gridColour}"
                    stroke-width="${data.gridLineWidth}" stroke-miterlimit="10" pointer-events="stroke"
                    display="${!config.show_grid ? 'none' : ''}"/>
                <circle id="grid-dot1" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                        display="${!config.show_grid ? 'none' : ''}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line1"/>
                    </animateMotion>
                </circle>
                <circle id="grid-dot1" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                        display="${!config.show_grid ? 'none' : ''}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line1"/>
                    </animateMotion>
                </circle>
            </svg>
            ${config.grid?.navigate
                ? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.grid.navigate)}>
                        <svg id="transmission_on" x="-0.5" y="187.5"
                            width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                fill="${data.gridColour}"
                                display="${!config.show_grid || data.totalGridPower < 0 || config.grid.import_icon ? 'none' : ''}"
                                d="${icons.gridOn}"/>
                        </svg>
                        <svg id="transmission_off" x="-0.5" y="187.5"
                            width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${validGridConnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                fill="${data.gridOffColour}" display="${!config.show_grid || config.grid.disconnected_icon ? 'none' : ''}"
                                d="${icons.gridOff}"/>
                        </svg>
                        <svg id="grid_export" x="-0.5" y="187.5"
                            width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                fill="${data.gridColour}"
                                display="${!config.show_grid || data.totalGridPower >= 0 || config.grid.export_icon ? 'none' : ''}"
                                d="${icons.gridExportCompact}"/>
                        </svg>
                    </a>`
                : svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                        <svg id="transmission_on" x="-0.5" y="187.5"
                            width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                fill="${data.gridColour}"
                                display="${!config.show_grid || data.totalGridPower < 0 || config.grid.import_icon ? 'none' : ''}"
                                d="${icons.gridOn}"/>
                        </svg>
                        <svg id="transmission_off" x="-0.5" y="187.5"
                            width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${validGridConnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                fill="${data.gridOffColour}" display="${!config.show_grid || config.grid.disconnected_icon ? 'none' : ''}"
                                d="${icons.gridOff}"/>
                        </svg>
                        <svg id="grid_export" x="-0.5" y="187.5"
                            width="64.5" height="64.5" viewBox="0 0 24 24">
                            <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                                fill="${data.gridColour}"
                                display="${!config.show_grid || data.totalGridPower >= 0 || config.grid.export_icon ? 'none' : ''}"
                                d="${icons.gridExportCompact}"/>
                        </svg>
                    </a>`
            }                    
            ${config.grid?.navigate
                    ? svg`
                        <a href="#" @click=${(e) => Utils.handleNavigation(e, config.grid.navigate)}>
                            <g display="${config.show_grid && (config.grid.import_icon || config.grid.disconnected_icon || config.grid.export_icon) ? '' : 'none'}">
                                <foreignObject x="-0.5" y="187.5" width="70" height="70">
                                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 70px; height: 70px;">
                                        <ha-icon icon="${data.customGridIcon}" class="grid-icon"></ha-icon>
                                    </div>
                                </foreignObject>
                            </g>
                        </a>`
                    : svg`
                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                            <g display="${config.show_grid && (config.grid.import_icon || config.grid.disconnected_icon || config.grid.export_icon) ? '' : 'none'}">
                                <foreignObject x="-0.5" y="187.5" width="70" height="70">
                                    <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 70px; height: 70px;">
                                        <ha-icon icon="${data.customGridIcon}" class="grid-icon"></ha-icon>
                                    </div>
                                </foreignObject>
                            </g>
                        </a>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_grid_import_76)}>
                <text id="daily_grid_buy_value" x="5" y="267.9" class="st10 left-align"
                    display="${!config.show_grid || data.gridShowDailyBuy !== true || !data.stateDayGridImport.isValid() ? 'none' : ''}"
                    fill="${data.gridColour}">
                    ${data.stateDayGridImport?.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.day_grid_export_77)}>
                <text id="daily_grid_sell_value" x="5" y="165" class="st10 left-align"
                    display="${!config.show_grid || data.gridShowDailySell !== true || !data.stateDayGridExport.isValid() ? 'none' : ''}"
                    fill="${data.gridColour}">
                    ${data.stateDayGridExport?.toPowerString(true, data.decimalPlacesEnergy)}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.max_sell_power)}>
                <text id="max_sell_power" x="5" y="150" class="st3 left-align"
                    fill="${['off', '0'].includes(data.stateSolarSell.state) ? 'grey' : data.gridColour}"
                    display="${!config.show_grid || !data.stateMaxSellPower.isValid || !config.entities?.max_sell_power ? 'none' : ''}">
                    ${localize('common.limit')}: ${data.stateMaxSellPower.toPowerString(config.grid.auto_scale, data.decimalPlaces)}
                </text>
            </a>
            ${config.inverter.three_phase
                ? config.entities?.grid_ct_power_total
                        ? svg`
                            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_total)}>
                            <text id="data.totalGridPower" x="135" y="219.2"
                                    display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
                                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                                ${config.grid.auto_scale
                                ? `${config.grid.show_absolute
                                        ? `${Math.abs(parseFloat(Utils.convertValue(data.totalGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.totalGridPower, data.decimalPlaces).split(' ')[1]}`
                                        : Utils.convertValue(data.totalGridPower, data.decimalPlaces) || 0}`
                                : `${config.grid.show_absolute
                                        ? `${Math.abs(data.totalGridPower)} ${UnitOfPower.WATT}`
                                        : `${data.totalGridPower || 0} ${UnitOfPower.WATT}`
                                }`
                        }
                            </text>
                        </a>`
                        : svg`
                            <text id="grid_total_power" x="135" y="219.2"
                                    display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
                                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                                    ${config.grid.auto_scale
                                ? `${config.grid.show_absolute
                                        ? `${Math.abs(parseFloat(Utils.convertValue(data.totalGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.totalGridPower, data.decimalPlaces).split(' ')[1]}`
                                        : Utils.convertValue(data.totalGridPower, data.decimalPlaces) || 0}`
                                : `${config.grid.show_absolute
                                        ? `${Math.abs(data.totalGridPower)} ${UnitOfPower.WATT}`
                                        : `${data.totalGridPower || 0} ${UnitOfPower.WATT}`
                                }`
                        }
                            </text>`
                : svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)}>
                        <text id="grid_total_power" x="135" y="219.2"
                                display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
                                class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                            ${config.grid.auto_scale
                    ? `${config.grid.show_absolute
                            ? `${Math.abs(parseFloat(Utils.convertValue(data.totalGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.totalGridPower, data.decimalPlaces).split(' ')[1]}`
                            : Utils.convertValue(data.totalGridPower, data.decimalPlaces) || 0}`
                    : `${config.grid.show_absolute
                            ? `${Math.abs(data.totalGridPower)} ${UnitOfPower.WATT}`
                            : `${data.totalGridPower || 0} ${UnitOfPower.WATT}`
                    }`
                }
                        </text>
                    </a>`
            }
            ${data.totalGridPower >= 0
                ? svg`
                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_buy)}>
                            <text id="energy_cost" x="105" y="195" class="${!config.show_grid ? 'st12' : 'st3 left-align'}" 
                                    fill="${data.gridColour}" 
                                    display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() ? '' : 'none'}" >
                                ${data.energyCost} ${data.stateEnergyCostBuy.getUOM()}
                            </text>
                        </a>`
                : svg`
                        <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_sell)}>
                            <text id="energy_cost" x="105" y="195"  class="${!config.show_grid ? 'st12' : 'st3 left-align'}" 
                                    fill="${data.gridColour}" 
                                    display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() ? '' : 'none'}" >
                                ${data.energyCost} ${data.stateEnergyCostSell.getUOM()}
                            </text>
                        </a>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.prepaid_units)}>
            <text id="prepaid" x="31.5" y="253"
                    class="${config.entities?.prepaid_units ? 'st3' : 'st12'}"
                    fill="${data.gridColour}" display="${!config.show_grid || !data.statePrepaidUnits.isValid() ? 'none' : ''}">
                ${data.statePrepaidUnits.toNum(1)}
            </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)}>
                <text id="grid-power-L1" x="80" y="241"
                    display="${config.inverter.three_phase ? '' : 'none'}"
                    class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                    fill="${data.gridColour}">
                    ${config.load.auto_scale ? `${Utils.convertValue(data.gridPower, data.decimalPlaces) || 0}` : `${data.gridPower || 0} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_L2)}>
                <text id="grid-power-L2" x="80" y="254"
                    display="${config.inverter.three_phase && config.entities?.grid_ct_power_L2 ? '' : 'none'}"
                    class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                    fill="${data.gridColour}">
                    ${config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL2, data.decimalPlaces) || 0}` : `${data.gridPowerL2 || 0} ${UnitOfPower.WATT}`}
                </text>
            </a>
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_L3)}>
                <text id="grid-power-L3" x="80" y="267"
                    display="${config.inverter.three_phase && config.entities?.grid_ct_power_L3 ? '' : 'none'}"
                    class="${!config.show_grid ? 'st12' : 'st3 left-align'}"
                    fill="${data.gridColour}">
                    ${config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL3, data.decimalPlaces) || 0}` : `${data.gridPowerL3 || 0} ${UnitOfPower.WATT}`}
                </text>
            </a>
        </svg>
    `;
}