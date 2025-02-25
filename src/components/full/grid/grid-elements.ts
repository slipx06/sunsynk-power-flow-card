// grid-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {icons} from '../../../helpers/icons';
import {UnitOfElectricPotential, UnitOfPower, validGridConnected, validGridDisconnected} from '../../../const';
import {getNonEssentialIconConfigs} from '../../shared/grid/icon-configs';
import {renderStaticGridIcon} from '../../shared/grid/render-static-grid-icon';
import {renderIcon} from '../../shared/render-icon';
import {createTextWithPopup, renderText} from '../../shared/text-utils';


export const renderGridElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    return html`
        <!-- Grid Elements -->
        <svg id="Grid"
        style="overflow: visible; display: ${!config.show_grid ? 'none' : 'inline'};"
        x="${config.wide ? '30%' : '3%'}" y="2.5%">
        
            <svg id="nonessential3" style="overflow: visible">
                <rect id="noness3" x="266" y="310" width="35" height="20" rx="4.5" ry="4.5"
                    display="${data.nonessentialLoads === 3 && (config.battery.hide_soc || config.wide) ? '' : 'none'}"
                    fill="none" stroke="${data.dynamicColourNonEssentialLoad3}"
                    pointer-events="all"
                    class="${!data.showNonessential || data.nonessentialLoads === 1 ? 'st12' : ''}"/>
                ${renderText(
                    'noness3',
                    284,
                    338,
                    !data.showNonessential || [0, 1, 2].includes(data.nonessentialLoads),
                    config.battery.hide_soc || config.wide ? 'st3 st8' : 'st12',
                    data.dynamicColourNonEssentialLoad3,
                    config.grid.load3_name,
                    true
                )}
                <g display="${!data.showNonessential || [0, 1, 2].includes(data.nonessentialLoads) ? 'none' : ''}">
                    <foreignObject x="269" y="341" width="30" height="30" 
                        display="${(config.battery.hide_soc || config.wide) && data.nonessentialLoads === 3 ? '' : 'none'}">
                        <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; width: 30px; height: 30px;">
                            <ha-icon icon="${data.iconNonessentialLoad3}" class="nonessload3-icon"></ha-icon>
                        </div>
                    </foreignObject>
                </g>
                ${createTextWithPopup(
                    'noness3_value',
                    283,
                    321,
                    !data.showNonessential || [0, 1, 2].includes(data.nonessentialLoads) || !data.stateNonessentialLoad3.isValid(),
                    config.battery.hide_soc || config.wide ? 'st3' : 'st12',
                    data.dynamicColourNonEssentialLoad3,
                    data.stateNonessentialLoad3.toPowerString(config.grid.auto_scale, data.decimalPlaces),
                    (e) => Utils.handlePopup(e, config.entities.non_essential_load3),
                    true
                )}
                ${createTextWithPopup(
                    'non_ess_load3_value_extra',
                    300,
                    305,
                    config.entities?.non_essential_load3_extra && data.nonessentialLoads === 3 && data.stateNonEssentialLoad3Extra.isValid() && config.show_grid && config.wide && data.showNonessential,
                    'st3 right-align',
                    data.dynamicColourNonEssentialLoad3,
                    `${data.stateNonEssentialLoad3Extra.toNum(1)} ${data.stateNonEssentialLoad3Extra?.getUOM()}`,
                    (e) => Utils.handlePopup(e, config.entities.non_essential_load3_extra),
                )}
            </svg>
            <rect x="234" y="153" width="70" height="70" rx="10.5" ry="10.5" fill="none"
                stroke="${data.gridColour}" pointer-events="all"/>
            <rect x="386" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.gridColour}" pointer-events="all"/>
            <rect id="nonesstotal" x="304" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${data.gridColour}" pointer-events="all"
                class="${!data.showNonessential ? 'st12' : ''}"/>
            <rect id="noness1" x="304" y="310" width="70" height="20" rx="4.5" ry="4.5"
                display="${data.nonessentialLoads === 1 ? '' : 'none'}" fill="none"
                stroke="${data.dynamicColourNonEssentialLoad1}"
                pointer-events="all"
                class="${!data.showNonessential ? 'st12' : ''}"/>
            <rect id="noness1" x="303" y="310" width="35" height="20" rx="4.5" ry="4.5"
                display="${[2, 3].includes(data.nonessentialLoads) ? '' : 'none'}"
                fill="none" stroke="${data.dynamicColourNonEssentialLoad1}"
                pointer-events="all"
                class="${!data.showNonessential || data.nonessentialLoads === 1 ? 'st12' : ''}"/>
            <rect id="noness2" x="340" y="310" width="35" height="20" rx="4.5" ry="4.5"
                display="${[2, 3].includes(data.nonessentialLoads) ? '' : 'none'}"
                fill="none" stroke="${data.dynamicColourNonEssentialLoad2}"
                pointer-events="all"
                class="${!data.showNonessential || data.nonessentialLoads === 1 ? 'st12' : ''}"/>
            ${renderText(
                'noness1',
                340,
                338,
                !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads),
                'st3 st8',
                data.dynamicColourNonEssentialLoad1,
                config.grid.load1_name,
                true
            )}
            ${renderText(
                'noness2',
                321,
                338,
                !data.showNonessential || [0, 1].includes(data.nonessentialLoads),
                'st3 st8',
                data.dynamicColourNonEssentialLoad1,
                config.grid.load1_name,
                true
            )}
            ${renderText(
                'noness2',
                358,
                338,
                !data.showNonessential || [0, 1].includes(data.nonessentialLoads),
                'st3 st8',
                data.dynamicColourNonEssentialLoad2,
                config.grid.load2_name,
                true
            )}  
            ${renderText(
                'grid_name',
                421,
                377,
                true,
                'st3 st8',
                data.gridColour,
                config.grid.grid_name || localize('common.grid_name'),
            )}
            ${renderText(
                'daily_grid_buy',
                !data.showNonessential ? '311' : '347',
                !data.showNonessential ? '368' : (config.entities?.max_sell_power ? '256' : '253'),
                data.gridShowDailyBuy !== true,
                'st3 left-align',
                data.gridColour,
                config.grid.label_daily_grid_buy || localize('common.daily_grid_buy'),
                true
            )}
            ${renderText(
                'daily_grid_sell',
                !data.showNonessential ? '311' : '347',
                !data.showNonessential ? '337' : (config.entities?.max_sell_power ? '225' : '222'),
                data.gridShowDailySell !== true,
                'st3 left-align',
                data.gridColour,
                config.grid.label_daily_grid_sell || localize('common.daily_grid_sell'),
                true
            )}
            ${renderText(
                'noness',
                340,
                377,
                !data.showNonessential,
                'st3 st8',
                data.gridColour,
                config.grid.nonessential_name || localize('common.nonessential_name'),
                true
            )}
            <svg id="grid-flow">
                <path id="grid-line" d="M 304 188 L 411 188 Q 421 188 421 198 L421 265" fill="none"
                    stroke="${data.gridColour}" stroke-width="${data.gridLineWidth}" stroke-miterlimit="10"
                    pointer-events="stroke"/>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line"/>
                    </animateMotion>
                </circle>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="grid1-flow">
                <path id="grid-line1"
                    d="${config.inverter.three_phase ? 'M 421 295 L 421 337' : 'M 421 295 L 421 310.5'}"
                    fill="none" stroke="${data.gridColour}" stroke-width="${data.gridLineWidth}"
                    stroke-miterlimit="10"
                    pointer-events="stroke"/>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower < 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}">
                    <animateMotion dur="${data.durationCur['grid'] / 1.5}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"} 
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line1"/>
                    </animateMotion>
                </circle>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.totalGridPower > 0 || data.totalGridPower === 0 ? 'transparent' : `${data.gridColour}`}">
                    <animateMotion dur="${data.durationCur['grid'] / 1.5}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"} 
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid-line1"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="ne1-flow">
                <path id="ne-line1" d="M 339 295 L 339 310" fill="none" stroke="${data.gridColour}"
                    stroke-width="${data.nonessLineWidth}" stroke-miterlimit="10"
                    class="${!data.showNonessential ? 'st12' : ''}" pointer-events="stroke"/>
                <circle id="ne-dot1" cx="0" cy="0"
                        r="${Math.min(2 + data.nonessLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        class="${!data.showNonessential ? 'st12' : ''}"
                        fill="${data.nonessentialPower <= 0 ? 'transparent' : data.gridColour}">
                    <animateMotion dur="${data.durationCur['ne'] / 1.5}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#ne-line1"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="ne-flow">
                <path id="ne-line" d="M 339 265 L 339 188" fill="none" stroke="${data.gridColour}"
                    stroke-width="${data.nonessLineWidth}" stroke-miterlimit="10"
                    class="${!data.showNonessential ? 'st12' : ''}" pointer-events="stroke"/>
                <circle id="ne-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.nonessLineWidth + Math.max(data.minLineWidth - 2, 0), 5)}"
                        class="${!data.showNonessential ? 'st12' : ''}"
                        fill="${data.nonessentialPower <= 0 ? 'transparent' : data.gridColour}">
                    <animateMotion dur="${data.durationCur['ne']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#ne-line"/>
                    </animateMotion>
                </circle>
            </svg>
            <svg id="grid2-flow">
                <path id="grid2-line" d="${config.wide ? 'M143 187 234 187': 'M215 187 234 187'}" fill="none"
                    stroke="${data.gridColour}" stroke-width="${data.grid169LineWidth}" stroke-miterlimit="10"
                    pointer-events="stroke"/>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.autoScaledGridPower < 0 || data.autoScaledGridPower === 0 ? 'transparent' : data.gridColour}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("1;0") : "1;0"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid2-line"/>
                    </animateMotion>
                </circle>
                <circle id="grid-dot" cx="0" cy="0"
                        r="${Math.min(2 + data.gridLineWidth + Math.max(data.minLineWidth - 2, 0), 8)}"
                        fill="${data.autoScaledGridPower > 0 || data.autoScaledGridPower === 0 ? 'transparent' : data.gridColour}">
                    <animateMotion dur="${data.durationCur['grid']}s" repeatCount="indefinite"
                                keyPoints=${config.grid.invert_flow === true ? Utils.invertKeyPoints("0;1") : "0;1"}
                                keyTimes="0;1" calcMode="linear">
                        <mpath xlink:href="#grid2-line"/>
                    </animateMotion>
                </circle>
            </svg>

            <a href="#" @click=${(e) => config.grid.navigate ? Utils.handleNavigation(e, config.grid.navigate) : null}>
                <svg xmlns="http://www.w3.org/2000/svg" id="transmission_on"
                    x="${config.inverter.three_phase ? '404' : '389'}"
                    y="${config.inverter.three_phase ? '339' : '308'}"
                    width="${config.inverter.three_phase ? '34' : '65'}"
                    height="${config.inverter.three_phase ? '34' : '65'}" viewBox="0 0 24 24">
                    <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                        fill="${data.gridColour}"
                        display="${data.totalGridPower < 0 || config.grid.import_icon ? 'none' : ''}"
                        d="${icons.gridOn}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="transmission_off"
                    x="${config.inverter.three_phase ? '404' : '389'}"
                    y="${config.inverter.three_phase ? '339' : '308'}"
                    width="${config.inverter.three_phase ? '34' : '65'}"
                    height="${config.inverter.three_phase ? '34' : '65'}" viewBox="0 0 24 24">
                    <path class="${validGridConnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                        fill="${data.gridOffColour}" display="${config.grid.disconnected_icon ? 'none' : ''}"
                        d="${icons.gridOff}"/>
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" id="grid_export"
                    x="${config.inverter.three_phase ? '404' : '389'}"
                    y="${config.inverter.three_phase ? '339' : '308'}"
                    width="${config.inverter.three_phase ? '34' : '65'}"
                    height="${config.inverter.three_phase ? '34' : '65'}" viewBox="0 0 24 24">
                    <path class="${validGridDisconnected.includes(data.gridStatus.toLowerCase()) ? 'st12' : ''}"
                        fill="${data.gridColour}"
                        display="${data.totalGridPower >= 0 || config.grid.export_icon ? 'none' : ''}"
                        d="${icons.gridExport}"/>
                </svg>
            </a>
            }       
            ${config.grid?.navigate
                ? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.grid.navigate)}>
                        <g display="${config.show_grid && (config.grid.import_icon || config.grid.disconnected_icon || config.grid.export_icon) ? '' : 'none'}">
                            <foreignObject x="${config.inverter.three_phase ? '404' : '389'}" 
                                        y="${config.inverter.three_phase ? '339' : '308'}" 
                                        width="${config.inverter.three_phase ? '34' : '65'}" 
                                        height="${config.inverter.three_phase ? '34' : '65'}">
                                <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; 
                                        width: ${config.inverter.three_phase ? '34px' : '65px'}; height: ${config.inverter.three_phase ? '34px' : '65px'};">
                                    <ha-icon icon="${data.customGridIcon}" class="${config.inverter.three_phase ? 'grid-icon-small' : 'grid-icon'}"></ha-icon>
                                </div>
                            </foreignObject>
                        </g>
                    </a>`
                : svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_connected_status_194)}>
                        <g display="${config.show_grid && (config.grid.import_icon || config.grid.disconnected_icon || config.grid.export_icon) ? '' : 'none'}">
                            <foreignObject x="${config.inverter.three_phase ? '404' : '389'}" 
                                        y="${config.inverter.three_phase ? '339' : '308'}" 
                                        width="${config.inverter.three_phase ? '34' : '65'}" 
                                        height="${config.inverter.three_phase ? '34' : '65'}" style="position: fixed; ">
                                <div xmlns="http://www.w3.org/1999/xhtml" style="position: fixed; 
                                        width: ${config.inverter.three_phase ? '34px' : '65px'}; height: ${config.inverter.three_phase ? '34px' : '65px'};">
                                    <ha-icon icon="${data.customGridIcon}" class="${config.inverter.three_phase ? 'grid-icon-small' : 'grid-icon'}"></ha-icon>
                                </div>
                            </foreignObject>
                        </g>
                    </a>`
            }
            <!-- Nonessential Icons-->
            ${getNonEssentialIconConfigs(data).map(iconConfig => renderStaticGridIcon(iconConfig))}

            <g display="${!data.showNonessential || [1, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}">
                ${renderIcon(
                    undefined,
                    data.nonessentialIcon,
                    'noness-icon',
                    303.5,
                    303.5,
                    85,
                    85
                )}
            </g>
            <g display="${!data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}">
                ${renderIcon(
                    undefined, 
                    data.iconNonessentialLoad1,
                    'nonessload1-icon', 
                    306, 
                    341
                )}
            </g>
            <g display="${!data.showNonessential || [0, 1].includes(data.nonessentialLoads) ? 'none' : ''}">
                ${renderIcon(
                    undefined,
                    data.iconNonessentialLoad2,
                    'nonessload2-icon',
                    343,
                    341
                )}    
            </g>
            <g display="${!data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) ? 'none' : ''}">
                ${renderIcon(
                    undefined,
                    data.iconNonessentialLoad1,
                    'nonessload1-icon',
                    324.5, 
                    341
                )}
            </g>
            ${createTextWithPopup(
                'daily_grid_buy_value',
                !data.showNonessential ? '311' : '347',
                !data.showNonessential ? '354' : (config.entities?.max_sell_power ? '242' : '239'),
                data.gridShowDailyBuy !== true || !data.stateDayGridImport.isValid(),
                'st10 left-align',
                data.gridColour,
                data.stateDayGridImport.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_grid_import_76),
                true
            )}
            ${createTextWithPopup(
                'daily_grid_sell_value',
                !data.showNonessential ? '311' : '347',
                !data.showNonessential ? '323' : (config.entities?.max_sell_power ? '212' : '209'),
                data.gridShowDailySell !== true || !data.stateDayGridExport.isValid(),
                'st10 left-align',
                data.gridColour,
                data.stateDayGridExport.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_grid_export_77),
                true
            )}
            ${createTextWithPopup(
                'max_sell_power',
                !data.showNonessential ? '311' : '347',
                !data.showNonessential ? '309' : '198',
                !data.stateMaxSellPower.isValid || !config.entities?.max_sell_power,
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
                        <text id="grid_total_power" x="420" y="281.5"
                            display="${config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
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
                        <text id="grid_total_power" x="420" y="281.5"
                            display="${config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
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
                        <text id="grid_total_power" x="420" y="281.5"
                            display="${config.entities.grid_ct_power_172 === 'none' ? 'none' : ''}"
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
            ${config.entities?.nonessential_power && config.entities.nonessential_power !== 'none'
                ? svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.nonessential_power)}>
                        <text id="non_ess_power" x="338" y="281.5" display="${!data.showNonessential ? 'none' : ''}" 
                            class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                            fill="${data.gridColour}">
                            ${config.grid.auto_scale ? `${Utils.convertValue(data.nonessentialPower, data.decimalPlaces) || 0}` : `${data.nonessentialPower || 0} ${UnitOfPower.WATT}`}
                        </text>
                    </a>`
                : svg`
                    <text id="non_ess_power" x="338" y="281.5"
                        display="${!data.showNonessential ? 'none' : ''}" 
                        class="${data.largeFont !== true ? 'st14' : 'st4'} st8" 
                        fill="${data.gridColour}">
                        ${config.grid.auto_scale ? `${Utils.convertValue(data.nonessentialPower, data.decimalPlaces) || 0}` : `${data.nonessentialPower || 0} ${UnitOfPower.WATT}`}
                    </text>`
            }
            ${data.totalGridPower >= 0
                ? svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_buy)}>
                        <text id="energy_cost" x="414" y="305" class="st3 right-align" 
                                fill="${data.gridColour}" 
                                display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() && !config.entities.non_essential_load2_extra ? '' : 'none'}" >
                            ${data.energyCost} ${data.stateEnergyCostBuy?.getUOM()}
                        </text>
                        <text id="energy_cost" x="${config.inverter?.three_phase ? '414' : '430'}" y="305" class="${config.inverter?.three_phase ? 'st3 right-align' : 'st3 left-align'}" 
                                fill="${data.gridColour}" 
                                display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() && config.entities.non_essential_load2_extra ? '' : 'none'}" >
                            ${data.energyCost}
                        </text>
                        <text id="energy_cost" x="${config.inverter?.three_phase ? '414' : '437'}" y="318" class="${config.inverter?.three_phase ? 'st3 right-align' : 'st3 left-align'}" 
                                fill="${data.gridColour}" 
                                display="${config.entities?.energy_cost_buy && data.stateEnergyCostBuy.isValid() && config.entities.non_essential_load2_extra ? '' : 'none'}" >
                            ${data.stateEnergyCostBuy?.getUOM()}
                        </text>
                    </a>`
                : svg`
                    <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.energy_cost_sell)}>
                        <text id="energy_cost" x="414" y="305"  class="st3 right-align" 
                                fill="${data.gridColour}" 
                                display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() && !config.entities.non_essential_load2_extra ? '' : 'none'}" >
                            ${data.energyCost} ${data.stateEnergyCostSell?.getUOM()}
                        </text>
                        <text id="energy_cost" x="${config.inverter?.three_phase ? '414' : '430'}" y="305"  class="${config.inverter?.three_phase ? 'st3 right-align' : 'st3 left-align'}" 
                                fill="${data.gridColour}" 
                                display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() && config.entities.non_essential_load2_extra ? '' : 'none'}" >
                            ${data.energyCost}
                        </text>
                        <text id="energy_cost" x="${config.inverter?.three_phase ? '414' : '437'}" y="318"  class="${config.inverter?.three_phase ? 'st3 right-align' : 'st3 left-align'}" 
                                fill="${data.gridColour}" 
                                display="${config.entities?.energy_cost_sell && data.stateEnergyCostSell.isValid() && config.entities.non_essential_load2_extra ? '' : 'none'}" >
                            ${data.stateEnergyCostSell?.getUOM()}
                        </text>
                    </a>`
            }
            <a href="#" @click=${(e) => Utils.handlePopup(e, config.entities.grid_power_169)}>
                <text id="grid_power_169" x="270"
                    y="${config.inverter.three_phase ? '216' : '209'}"
                    display="${config.entities.grid_power_169 === 'none' ? 'none' : ''}"
                    class="${data.largeFont !== true ? 'st14' : 'st4'} st8" fill="${data.gridColour}">
                    ${config.grid.auto_scale
                            ? `${config.grid.show_absolute
                                    ? `${Math.abs(parseFloat(Utils.convertValue(data.autoScaledGridPower, data.decimalPlaces)))} ${Utils.convertValue(data.autoScaledGridPower, data.decimalPlaces).split(' ')[1]}`
                                    : Utils.convertValue(data.autoScaledGridPower, data.decimalPlaces) || 0}`
                            : `${config.grid.show_absolute
                                    ? `${Math.abs(data.autoScaledGridPower)} ${UnitOfPower.WATT}`
                                    : `${data.autoScaledGridPower || 0} ${UnitOfPower.WATT}`
                            }`
                    }
                </text>
            </a>
            ${createTextWithPopup(
                'prepaid',
                428,
                258,
                !data.statePrepaidUnits.isValid(),
                config.entities?.prepaid_units ? 'st3 left-align' : 'st12',
                data.gridColour,
                data.statePrepaidUnits.toNum(1).toString(),
                (e) => Utils.handlePopup(e, config.entities.prepaid_units),
                true
            )}
            ${createTextWithPopup(
                'grid-power-L1',
                428,
                305,
                config.inverter.three_phase,
                'st3 left-align',
                data.gridColour,
                config.load.auto_scale ? `${Utils.convertValue(data.gridPower, data.decimalPlaces) || 0}` : `${data.gridPower || 0} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.grid_ct_power_172)
            )}
            ${createTextWithPopup(
                'grid-power-L2',
                428,
                318,
                !!(config.inverter.three_phase && config.entities?.grid_ct_power_L2),
                'st3 left-align',
                data.gridColour,
                config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL2, data.decimalPlaces) || 0}` : `${data.gridPowerL2 || 0} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.grid_ct_power_L2),
            )}
            ${createTextWithPopup(
                'grid-power-L3',
                428,
                331,
                !!(config.inverter.three_phase && config.entities?.grid_ct_power_L3),
                'st3 left-align',
                data.gridColour,
                config.load.auto_scale ? `${Utils.convertValue(data.gridPowerL3, data.decimalPlaces) || 0}` : `${data.gridPowerL3 || 0} ${UnitOfPower.WATT}`,
                (e) => Utils.handlePopup(e, config.entities.grid_ct_power_L3),
            )}
            ${createTextWithPopup(
                'inverter_voltage_154',
                270,
                config.inverter.three_phase ? 164 : 170.4,
                config.entities.inverter_voltage_154 === 'none' || !config.entities.inverter_voltage_154,
                `${data.largeFont !== true ? 'st14' : 'st4'} st8`,
                data.gridColour,
                `${data.inverterVoltage} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.inverter_voltage_154),
                true
            )}          
            ${createTextWithPopup(
                'inverter_voltage_L2',
                270,
                177,
                !!(config.inverter.three_phase && config.entities?.inverter_voltage_L2),
                data.largeFont !== true ? 'st14 st8' : 'st4 st8',
                data.gridColour,
                `${data.inverterVoltageL2} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.inverter_voltage_L2),
            )}
            ${createTextWithPopup(
                'inverter_voltage_L3',
                270,
                190,
                !!(config.inverter.three_phase && config.entities?.inverter_voltage_L3),
                data.largeFont !== true ? 'st14 st8' : 'st4 st8',
                data.gridColour,
                `${data.inverterVoltageL3} ${UnitOfElectricPotential.VOLT}`,
                (e) => Utils.handlePopup(e, config.entities.inverter_voltage_L3),
            )}
            ${createTextWithPopup(
                'load_frequency_192',
                270,
                config.inverter.three_phase ? '203' : '189.5',
                config.entities.load_frequency_192 === 'none' || !config.entities.load_frequency_192,
                data.largeFont !== true ? 'st14' : 'st4',
                data.gridColour,
                `${data.loadFrequency} Hz`,
                (e) => Utils.handlePopup(e, config.entities.load_frequency_192),
                true
            )}
            ${createTextWithPopup(
                'noness1_value',
                340,
                321,
                !data.showNonessential || [0, 2, 3].includes(data.nonessentialLoads) || !data.stateNonessentialLoad1.isValid(),
                'st3',
                data.dynamicColourNonEssentialLoad1,
                data.stateNonessentialLoad1.toPowerString(config.grid.auto_scale, data.decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.non_essential_load1),
                true
            )}
            ${createTextWithPopup(
                'noness2_value',
                320,
                321,
                !data.showNonessential || [0, 1].includes(data.nonessentialLoads) || !data.stateNonessentialLoad1.isValid(),
                'st3',
                data.dynamicColourNonEssentialLoad1,
                data.stateNonessentialLoad1.toPowerString(config.grid.auto_scale, data.decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.non_essential_load1),
                true
            )}      
            ${createTextWithPopup(
                'noness2_value',
                357,
                321,
                !data.showNonessential || [0, 1].includes(data.nonessentialLoads) || !data.stateNonessentialLoad2.isValid(),
                'st3',
                data.dynamicColourNonEssentialLoad2,
                data.stateNonessentialLoad2.toPowerString(config.grid.auto_scale, data.decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.non_essential_load2),
                true
            )}
            ${createTextWithPopup(
                'non_ess_load1_value_extra',
                335,
                305,
                config.entities?.non_essential_load1_extra && [1, 2, 3].includes(data.nonessentialLoads) && data.stateNonEssentialLoad1Extra.isValid() && config.show_grid && data.showNonessential,
                'st3 right-align',
                data.dynamicColourNonEssentialLoad1,
                `${data.stateNonEssentialLoad1Extra.toNum(1)} ${data.stateNonEssentialLoad1Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.non_essential_load1_extra),
            )}
            ${createTextWithPopup(
                'non_ess_load2_value_extra',
                342,
                305,
                config.entities?.non_essential_load2_extra && [2, 3].includes(data.nonessentialLoads) && data.stateNonEssentialLoad2Extra.isValid() && config.show_grid && data.showNonessential,
                'st3 left-align',
                data.dynamicColourNonEssentialLoad2,
                `${data.stateNonEssentialLoad2Extra.toNum(1)} ${data.stateNonEssentialLoad2Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.non_essential_load2_extra),
            )}
        </svg>
    `;
}