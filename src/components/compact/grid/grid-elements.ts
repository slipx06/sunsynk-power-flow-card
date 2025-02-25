// grid-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfPower, validGridConnected, validGridDisconnected} from '../../../const';
import {createTextWithPopup, renderText} from '../../shared/text-utils';

const renderGridIcons = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    const isGridConnected = validGridConnected.includes(data.gridStatus.toLowerCase());
    const isGridDisconnected = validGridDisconnected.includes(data.gridStatus.toLowerCase());
    const showGrid = config.show_grid;
    const totalGridPower = data.totalGridPower;

    return svg`
        <svg id="transmission_on" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24">
            <path class="${isGridDisconnected ? 'st12' : ''}"
                fill="${data.gridColour}"
                display="${!showGrid || totalGridPower < 0 || config.grid.import_icon ? 'none' : ''}"
                d="${icons.gridOn}"/>
        </svg>
        <svg id="transmission_off" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24">
            <path class="${isGridConnected ? 'st12' : ''}"
                fill="${data.gridOffColour}" display="${!showGrid || config.grid.disconnected_icon ? 'none' : ''}"
                d="${icons.gridOff}"/>
        </svg>
        <svg id="grid_export" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24">
            <path class="${isGridDisconnected ? 'st12' : ''}"
                fill="${data.gridColour}"
                display="${!showGrid || totalGridPower >= 0 || config.grid.export_icon ? 'none' : ''}"
                d="${icons.gridExportCompact}"/>
        </svg>
    `;
};

const renderGridTotalPower = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    const totalGridPower = data.totalGridPower;
    const auto_scale = config.grid.auto_scale;
    const show_absolute = config.grid.show_absolute;
    const decimalPlaces = data.decimalPlaces;

    let powerValue: string | number;

    if (auto_scale) {
        const convertedValue = Utils.convertValue(totalGridPower, decimalPlaces);
        powerValue = show_absolute
            ? `${Math.abs(parseFloat(convertedValue))} ${convertedValue.split(' ')[1]}`
            : convertedValue || '0';
    } else {
        powerValue = show_absolute
            ? Math.abs(totalGridPower)
            : totalGridPower || 0;
    }

    return svg`
        <text id="grid_total_power" x="135" y="219.2"
            display="${!config.show_grid || config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
            class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
            ${powerValue} ${!auto_scale ? UnitOfPower.WATT : ''}
        </text>
    `;
};

export const renderGridElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    
    const gridFlowKeyPoints = config.grid.invert_flow
        ? Utils.invertKeyPoints(data.totalGridPower < 0 ? "1;0" : "0;1")
        : data.totalGridPower < 0 ? "1;0" : "0;1";

    const grid1FlowKeyPoints = config.grid.invert_flow
        ? Utils.invertKeyPoints(data.totalGridPower < 0 ? "0;1" : "1;0")
        : data.totalGridPower < 0 ? "0;1" : "1;0";

    return html`
        <!-- Grid Elements -->
        <svg id="Grid" style="overflow: visible">
            <rect x="103" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.gridColour}" pointer-events="all"
                display="${!config.show_grid ? 'none' : ''}"/>
            ${renderText(
                'daily_grid_buy',
                5,
                282.1,
                !config.show_grid,
                'st3 left-align',
                data.gridShowDailyBuy !== true ? 'transparent' : data.gridColour,
                config.grid.label_daily_grid_buy || localize('common.daily_grid_buy'),
                true
            )}
            ${renderText(
                'daily_grid_sell',
                5,
                179,
                !config.show_grid,
                'st3 left-align',
                data.gridShowDailySell !== true ? 'transparent' : data.gridColour,
                config.grid.label_daily_grid_sell || localize('common.daily_grid_sell'),
                true
            )}
            ${renderText(
                'grid_name',
                5,
                config.grid.show_daily_buy ? '294' : '267',
                !config.show_grid,
                'st3 st8 left-align',
                data.gridColour,
                config.grid.grid_name || localize('common.grid_name'),
                true
            )}
            <svg id="grid-flow">
                <path id="grid-line" d="${config.wide ? 'M 173 218 L 287 218': 'M 173 218 L 214 218'}" fill="none" stroke="${data.gridColour}"
                    stroke-width="${data.gridLineWidth}" stroke-miterlimit="10" pointer-events="stroke"
                    display="${!config.show_grid ? 'none' : ''}"/>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                        display="${!config.show_grid ? 'none' : ''}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${gridFlowKeyPoints}
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
                        fill="${data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}"
                        display="${!config.show_grid ? 'none' : ''}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${grid1FlowKeyPoints}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line1"/>
                    </animateMotion>
                </circle>
            </svg>
            ${config.grid?.navigate
                ? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.grid.navigate)}>
                        ${renderGridIcons(data, config)}
                    </a>`
                : svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                        ${renderGridIcons(data, config)}
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
            ${createTextWithPopup(
                'daily_grid_buy_value',
                5,
                267.9,
                !config.show_grid || data.gridShowDailyBuy !== true || !data.stateDayGridImport.isValid(),
                'st10 left-align',
                data.gridColour,
                data.stateDayGridImport?.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_grid_import_76),
                true
            )}
            ${createTextWithPopup(
                'daily_grid_sell_value',
                5,
                165,
                !config.show_grid || data.gridShowDailySell !== true || !data.stateDayGridExport.isValid(),
                'st10 left-align',
                data.gridColour,
                data.stateDayGridExport?.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_grid_export_77),
                true
            )}
            ${createTextWithPopup(
                'max_sell_power',
                5,
                150,
                !config.show_grid || !data.stateMaxSellPower.isValid || !config.entities?.max_sell_power,
                'st3 left-align',
                ['off', '0'].includes(data.stateSolarSell.state) ? 'grey' : data.gridColour,
                `${localize('common.limit')}: ${data.stateMaxSellPower.toPowerString(config.grid.auto_scale, data.decimalPlaces)}`,
                (e) => Utils.handlePopup(e, config.entities.max_sell_power),
                true
            )}
            ${config.inverter.three_phase
                ? config.entities?.grid_ct_power_total
                        ? svg`
                            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_total)}>
                            ${renderGridTotalPower(data, config)}
                        </a>`
                        : svg`
                            ${renderGridTotalPower(data, config)}`
                : svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)}>
                        ${renderGridTotalPower(data, config)}
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
            ${createTextWithPopup(
                'prepaid',
                31.5,
                253,
                !config.show_grid || !data.statePrepaidUnits.isValid(),
                config.entities?.prepaid_units ? 'st3' : 'st12',
                data.gridColour,
                data.statePrepaidUnits.toNum(1).toString(),
                (e) => Utils.handlePopup(e, config.entities.prepaid_units),
                true
            )}
            ${createTextWithPopup(
                'grid-power-L1',
                80,
                241,
                config.inverter.three_phase,
                !config.show_grid ? 'st12' : 'st3 left-align',
                data.gridColour,
                config.load.auto_scale ? `${Utils.convertValue(data.gridPower, data.decimalPlaces) || 0}` : `${data.gridPower || 0} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.grid_ct_power_172),
            )}
            ${createTextWithPopup(
                'grid-power-L2',
                80,
                254,
                !!(config.inverter.three_phase && config.entities?.grid_ct_power_L2),
                !config.show_grid ? 'st12' : 'st3 left-align',
                data.gridColour,
                config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL2, data.decimalPlaces) || 0}` : `${data.gridPowerL2 || 0} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.grid_ct_power_L2),
            )}
            ${createTextWithPopup(
                'grid-power-L3',
                80,
                267,
                !!(config.inverter.three_phase && config.entities?.grid_ct_power_L3),
                !config.show_grid ? 'st12' : 'st3 left-align',
                data.gridColour,
                config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL3, data.decimalPlaces) || 0}` : `${data.gridPowerL3 || 0} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.grid_ct_power_L3),
            )}
        </svg>
    `;
}