// load-elements.ts
import {svg, html} from 'lit';
import {localize} from '../../../localize/localize';
import {Utils} from '../../../helpers/utils';
import {DataDto, sunsynkPowerFlowCardConfig} from '../../../types';
import {UnitOfPower} from '../../../const';
import {getFullLayoutIconConfigs} from '../../shared/load/icon-configs';
import {renderStaticLoadIcon} from '../../shared/load/render-static-load-icon';
import {createTextWithPopup, renderText} from '../../../helpers/text-utils';
import {renderIcon} from '../../../helpers/render-icon';
import {renderPath} from '../../../helpers/render-path';
import {renderCircle} from '../../../helpers/render-circle';

export const renderLoadElements = (data: DataDto, config: sunsynkPowerFlowCardConfig) => {
    const {
        showAux,
        additionalLoad,
        largeFont,
        dynamicColourEssentialLoad1,
        dynamicColourEssentialLoad2,
        dynamicColourEssentialLoad3,
        dynamicColourEssentialLoad4,
        dynamicColourEssentialLoad5,
        dynamicColourEssentialLoad6,
        decimalPlaces,
        loadColour,
        flowColour,
        solarColour,
        gridColour,
        batteryColour,
        essentialPower
    } = data;

    const {
        auto_scale,
        load1_name,
        load1_switch,
        load2_name,
        load2_switch,
        load3_name,
        load3_switch,
        load4_name,
        load4_switch,
        load5_name,
        load5_switch,
        load6_name,
        load6_switch,
        dynamic_colour
    } = config.load;

    return html`
        <!-- Load Elements -->
        <svg id="Load" style="overflow: visible; border: 1px solid red;" x="${config.wide ? '30%' : '3%'}" y="2.5%">
            <svg id="es-load5" 
                    style="overflow: visible" 
                    viewBox="${config.wide && [5, 6].includes(additionalLoad) ? "0 0 720 405" : "0 0 0 0"}" 
                    x="5%">
                <rect id="es-load5" x="413"
                    y="30" width="35" height="20" rx="4.5" ry="4.5"
                    fill="none" stroke="${dynamicColourEssentialLoad5}" pointer-events="all"
                    display="${[5, 6].includes(additionalLoad) ? '' : 'none'}"/>
                ${renderText(
                    'ess-load5',
                    418,
                    59,
                    [5, 6].includes(additionalLoad),
                    'st3 st8 left-align',
                    dynamicColourEssentialLoad5,
                    load5_name
                )}
                <g display="${[5, 6].includes(additionalLoad) ? '' : 'none'}">
                    ${renderIcon(load5_switch, data.iconEssentialLoad5, 'essload5-small-icon', 421, 5)}
                </g>
                ${createTextWithPopup(
                    'ess_load5_value_extra',
                    418,
                    70,
                    !!config.entities?.essential_load5_extra && [5, 6].includes(additionalLoad) && !showAux && data.stateEssentialLoad5Extra.isValid(),
                    'st3 left-align',
                    dynamicColourEssentialLoad5,
                    `${data.stateEssentialLoad5Extra.toNum(1)} ${data.stateEssentialLoad5Extra?.getUOM()}`,
                    (e) => Utils.handlePopup(e, config.entities.essential_load5_extra)
                )}
                ${createTextWithPopup(
                    'ess_load5_value',
                    430,
                    41,
                    [5, 6].includes(additionalLoad) && data.stateEssentialLoad5.isValid(),
                    'st3',
                    dynamicColourEssentialLoad5,
                    data.stateEssentialLoad5.toPowerString(auto_scale, decimalPlaces),
                    (e) => Utils.handlePopup(e, config.entities.essential_load5)
                )}
            </svg>
            <svg id="es-load6" 
                    style="overflow: visible" 
                    viewBox="${config.wide && [6].includes(additionalLoad) ? "0 0 720 405" : "0 0 0 0"}" 
                    x="5%">
                <rect id="es-load6" x="413"
                    y="149" width="35" height="20" rx="4.5" ry="4.5"
                    fill="none" stroke="${dynamicColourEssentialLoad6}" pointer-events="all"
                    display="${[5, 6].includes(additionalLoad) ? '' : 'none'}"/>
                ${renderText(
                    'ess-load6',
                    418,
                    178,
                    [5, 6].includes(additionalLoad),
                    'st3 st8 left-align',
                    dynamicColourEssentialLoad6,
                    load6_name
                )}
                <g display="${[5, 6].includes(additionalLoad) ? '' : 'none'}">
                    ${renderIcon(load6_switch, data.iconEssentialLoad6, 'essload6-small-icon', 421, 123)}
                </g>
                ${createTextWithPopup(
                    'ess_load6_value_extra',
                    418,
                    190,
                    !!config.entities?.essential_load6_extra && [5, 6].includes(additionalLoad) && !showAux && data.stateEssentialLoad6Extra.isValid(),
                    'st3 left-align',
                    dynamicColourEssentialLoad6,
                    `${data.stateEssentialLoad6Extra.toNum(1)} ${data.stateEssentialLoad6Extra?.getUOM()}`,
                    (e) => Utils.handlePopup(e, config.entities.essential_load6_extra)
                )}
                ${createTextWithPopup(
                    'ess_load6_value',
                    430,
                    160,
                    [5, 6].includes(additionalLoad) && data.stateEssentialLoad6.isValid(),
                    'st3',
                    dynamicColourEssentialLoad6,
                    data.stateEssentialLoad6.toPowerString(auto_scale, decimalPlaces),
                    (e) => Utils.handlePopup(e, config.entities.essential_load6)
                )}
            </svg>
            <rect x="236" y="103" width="70" height="30" rx="4.5" ry="4.5" fill="none"
                stroke="${loadColour}" pointer-events="all"/>
            <rect id="es-load1" x="374" y="${!showAux ? '30' : '143'}" width="70" height="30"
                rx="4.5" ry="4.5" fill="none" stroke="${dynamicColourEssentialLoad1}" pointer-events="all"
                display="${additionalLoad === 1 ? '' : 'none'}"/>
            <rect id="es-load2" x="${!showAux ? '376' : '373'}"
                y="${!showAux ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${dynamicColourEssentialLoad1}" pointer-events="all"
                display="${[2, 4, 5, 6].includes(additionalLoad) ? '' : 'none'}"/>
            <rect id="es-load2" x="${!showAux ? '413' : '410'}"
                y="${!showAux ? '30' : '149'}" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${dynamicColourEssentialLoad2}" pointer-events="all"
                display="${[2, 4, 5, 6].includes(additionalLoad) ? '' : 'none'}"/>
            <rect id="es-load4" x="376"
                y="149" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${dynamicColourEssentialLoad3}" pointer-events="all"
                display="${!showAux && [3, 4, 5, 6].includes(additionalLoad) ? '' : 'none'}"/>
            <rect id="es-load4" x="413"
                y="149" width="35" height="20" rx="4.5" ry="4.5"
                fill="none" stroke="${dynamicColourEssentialLoad4}" pointer-events="all"
                display="${!showAux && [3, 4, 5, 6].includes(additionalLoad) ? '' : 'none'}"/>
            
            ${renderText(
                'essential_name',
                411,
                157,
                [0].includes(additionalLoad) || (!showAux && [1, 2].includes(additionalLoad)),
                'st3 st8',
                loadColour,
                config.load.essential_name || localize('common.essential')
            )}
            ${renderText(
                'ess_load',
                411,
                130,
                ([1, 2].includes(additionalLoad) && showAux) || (!showAux && [4, 5, 6].includes(additionalLoad)),
                'st3 st8',
                loadColour,
                config.load.essential_name || localize('common.essential')
            )}
            ${renderText(
                'ess-load1',
                416,
                !showAux ? 70 : 181,
                additionalLoad === 1,
                'st3 left-align',
                dynamicColourEssentialLoad1,
                load1_name
            )}
            ${renderText(
                'ess-load2',
                !showAux ? 405 : 402,
                !showAux ? 59 : 178,
                [2, 4, 5, 6].includes(additionalLoad),
                'st3 st8 right-align',
                dynamicColourEssentialLoad1,
                load1_name
            )}
            ${renderText(
                'ess-load2',
                !showAux ? 418 : 415,
                !showAux ? 59 : 178,
                [2, 4, 5, 6].includes(additionalLoad),
                'st3 st8 left-align',
                dynamicColourEssentialLoad2,
                load2_name
            )}
            ${renderText(
                'ess-load4',
                405,
                178,
                [4, 5, 6].includes(additionalLoad),
                'st3 st8 right-align',
                dynamicColourEssentialLoad3,
                load3_name
            )}
            ${renderText(
                'ess-load4',
                418,
                178,
                [4, 5, 6].includes(additionalLoad),
                'st3 st8 left-align',
                dynamicColourEssentialLoad4,
                load4_name
            )}
            ${renderText(
                'daily_load',
                additionalLoad === 0 ? '377' : '238',
                additionalLoad === 0 ? 71 : 93,
                !data.loadShowDaily || showAux,
                'st3 left-align',
                loadColour,
                config.load.label_daily_load || localize('common.daily_load'),
                true
            )}
            ${renderText(
                'load-power-3P',
                237,
                142,
                config.inverter.three_phase && !!config.entities?.load_power_L1,
                'st3 left-align',
                loadColour,
                `${config.inverter.three_phase && config.entities?.load_power_L1 ? data.loadPowerL1 : '0'} ${config.inverter.three_phase && config.entities?.load_power_L2 ? '| ' + data.loadPowerL2 : ''} ${config.inverter.three_phase && config.entities?.load_power_L3 ? '| ' + data.loadPowerL3 : ''} ${UnitOfPower.WATT}`
            )}
            ${renderPath(
                'es-load1',
                'M 409 143 L 409 135',
                showAux && [1, 2].includes(additionalLoad),
                data.load1Colour,
                1
            )}
            ${renderPath(
                'es-load1',
                'M 412 143 L 412 135',
                !showAux && [4, 5, 6].includes(additionalLoad),
                data.load2Colour,
                1
            )}
            ${renderPath(
                'es-load1',
                'M 412 80 L 412 60',
                !showAux && additionalLoad === 1,
                data.load1Colour,
                1
            )}
            ${renderPath(
                'es-load2',
                'M 412 80 L 412 53',
                !showAux && [2, 4, 5, 6].includes(additionalLoad),
                data.load1Colour,
                1
            )}
            <svg id="load-flow">
                ${renderPath(
                    'es-line2',
                    'M 306 118 L 371 118',
                    true,
                    dynamic_colour ? flowColour : loadColour,
                    data.loadLineWidth
                )}
                ${renderCircle(
                    'es-dot',
                    Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8),
                    essentialPower  <= 0 ? 'transparent' : (dynamic_colour ? flowColour : loadColour),
                    data.durationCur['load'],
                    "0;1",
                    "#es-line2",
                    config.load.invert_flow === true
                )}
                ${renderCircle(
                    'es-dot',
                    Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8),
                    essentialPower >= 0 ? 'transparent' : (dynamic_colour ? flowColour : loadColour),
                    data.durationCur['load'],
                    "1;0",
                    "#es-line2",
                    config.load.invert_flow === true
                )}
            </svg>
            <svg id="load1-flow">
                ${renderPath(
                    'es-line',
                    config.wide ? 'M 236 118 L 118 118 Q 108 118 108 128 L 108 162' : 'M 236 118 L 190 118 Q 180 118 180 128 L 180 162',
                    true,
                    dynamic_colour ? flowColour : loadColour,
                    data.loadLineWidth
                )}    
                ${renderCircle(
                    'es-dot',
                    Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8),
                    essentialPower  <= 0 ? 'transparent' : (dynamic_colour ? flowColour : loadColour),
                    data.durationCur['load'],
                    "1;0",
                    "#es-line",
                    config.load.invert_flow === true
                )}
                ${renderCircle(
                    'es-dot',
                    Math.min(2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0), 8),
                    essentialPower >= 0 ? 'transparent' : (dynamic_colour ? flowColour : loadColour),
                    data.durationCur['load'],
                    "0;1",
                    "#es-line",
                    config.load.invert_flow === true
                )}
            </svg>
            <!-- Essential Icon -->
            
            <a href="#" @click=${(e) => config.load.navigate ? Utils.handleNavigation(e, config.load.navigate) : null}>
                <svg xmlns="http://www.w3.org/2000/svg" id="essen_aux" x="373.5"
                        y="${data.essIconSize === 1 ? "82.5" : "78.5"}" width="77"
                        height="77" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${solarColour}"/>
                                <stop offset="100%"
                                    stop-color="${solarColour}"/>
                            </linearGradient>
                        </defs>
                        <path display="${[1, 2].includes(additionalLoad) && !showAux ? '' : 'none'}"
                            fill="${dynamic_colour ? `url(#Lg-${data.timestamp_id})` : loadColour}"
                            d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux" x="390" y="89" width="38"
                        height="38" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${solarColour}"/>
                                <stop offset="100%"
                                    stop-color="${solarColour}"/>
                            </linearGradient>
                        </defs>
                        <path display="${([1, 2].includes(additionalLoad) && showAux) ? '' : 'none'}"
                            fill="${dynamic_colour ? `url(#Lg-${data.timestamp_id})` : loadColour}"
                            d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_noaux_four" x="387" y="77" width="50"
                        height="50" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${solarColour}"/>
                                <stop offset="100%"
                                    stop-color="${solarColour}"/>
                            </linearGradient>
                        </defs>
                        <path display="${[4, 5, 6].includes(additionalLoad) && !showAux ? '' : 'none'}"
                            fill="${dynamic_colour ? `url(#Lg-${data.timestamp_id})` : loadColour}"
                            d="${data.essIcon}"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id="essen_default" x="373.5"
                        y="${data.essIconSize === 1 ? "82.5" : "78.5"}" width="77"
                        height="77" viewBox="0 0 24 24">
                        <defs>
                            <linearGradient id="Lg-${data.timestamp_id}" x1="0%" x2="0%" y1="100%" y2="0%">
                                <stop offset="0%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.gridPercentage > 0 ? gridColour : (data.batteryPercentage > 0 ? batteryColour : solarColour)}"/>
                                <stop offset="${data.gridPercentage}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${data.batteryPercentage > 0 ? batteryColour : solarColour}"/>
                                <stop offset="${(data.gridPercentage + data.batteryPercentage)}%"
                                    stop-color="${solarColour}"/>
                                <stop offset="100%"
                                    stop-color="${solarColour}"/>
                            </linearGradient>
                        </defs>
                        <path display="${[1, 2, 3, 4, 5, 6].includes(additionalLoad) ? 'none' : ''}"
                            fill="${dynamic_colour ? `url(#Lg-${data.timestamp_id})` : loadColour}"
                            d="${data.essIcon}"/>
                    </svg>
            </a>
            }
            <!-- Render Static Icons e.g. Boiler, Aircon, Oven and Pump etc -->
            ${getFullLayoutIconConfigs(data).map(iconConfig => renderStaticLoadIcon(data, iconConfig))}

            <g display="${[2, 4, 5, 6].includes(additionalLoad) ? '' : 'none'}">
                ${renderIcon(load1_switch, data.iconEssentialLoad1, 'essload1-small-icon', showAux ? 371 : 384, showAux ? 123 : 5)}
            </g>
            <g display="${[2, 4, 5, 6].includes(additionalLoad) ? '' : 'none'}">
                ${renderIcon(load2_switch, data.iconEssentialLoad2, 'essload2-small-icon', showAux ? 429 : 421, showAux ? 123 : 5)}              
            </g>
            <g display="${[4, 5, 6].includes(additionalLoad) ? '' : 'none'}">
                ${renderIcon(load3_switch, data.iconEssentialLoad3, 'essload3-small-icon', 371, 123)}
            </g>
            <g display="${[4, 5, 6].includes(additionalLoad) ? '' : 'none'}">
                ${renderIcon(load4_switch, data.iconEssentialLoad4, 'essload4-small-icon', 429, 123)}
            </g>
            <g display="${additionalLoad === 1 ? '' : 'none'}">
                ${renderIcon(load1_switch, data.iconEssentialLoad1, 'essload1-icon-full', 336, showAux ? 140 : 27)}
            </g>

            ${createTextWithPopup(
                'daily_load_value_aux',
                238,
                80,
                !data.loadShowDaily || !showAux || !data.stateDayLoadEnergy.isValid(),
                'st10 left-align',
                loadColour,
                data.stateDayLoadEnergy.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_load_energy_84),
                true
            )}
            ${createTextWithPopup(
                'daily_load_value',
                additionalLoad === 0 ? 377 : 238,
                additionalLoad === 0 ? 57 : 80,
                !data.loadShowDaily || showAux || !data.stateDayLoadEnergy.isValid(),
                'st10 left-align',
                loadColour,
                data.stateDayLoadEnergy.toPowerString(true, data.decimalPlacesEnergy),
                (e) => Utils.handlePopup(e, config.entities.day_load_energy_84),
                true
            )}
            ${createTextWithPopup(
                'ess_load1_value_extra',
                430,
                23,
                !!config.entities?.essential_load1_extra && additionalLoad === 1 && !showAux && data.stateEssentialLoad1Extra.isValid(),
                'st3 right-align',
                dynamicColourEssentialLoad1,
                `${data.stateEssentialLoad1Extra.toNum(1)} ${data.stateEssentialLoad1Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.essential_load1_extra)
            )}
            ${createTextWithPopup(
                'ess_load1_value_extra',
                360,
                136,
                config.entities?.essential_load1_extra && additionalLoad === 1 && showAux && data.stateEssentialLoad1Extra.isValid(),
                'st3 st8',
                dynamicColourEssentialLoad1,
                `${data.stateEssentialLoad1Extra.toNum(1)} ${data.stateEssentialLoad1Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.essential_load1_extra)
            )}
            ${createTextWithPopup(
                'ess_load2_value_extra',
                405,
                70,
                !!config.entities?.essential_load1_extra && [2, 4, 5, 6].includes(additionalLoad) && !showAux && data.stateEssentialLoad1Extra.isValid(),
                'st3 right-align',
                dynamicColourEssentialLoad1,
                `${data.stateEssentialLoad1Extra.toNum(1)} ${data.stateEssentialLoad1Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.essential_load1_extra)
            )}
            ${createTextWithPopup(
                'ess_load2_value_extra',
                418,
                70,
                !!config.entities?.essential_load2_extra && [2, 4, 5, 6].includes(additionalLoad) && !showAux && data.stateEssentialLoad2Extra.isValid(),
                'st3 left-align',
                dynamicColourEssentialLoad2,
                `${data.stateEssentialLoad2Extra.toNum(1)} ${data.stateEssentialLoad2Extra?.getUOM()}`,
                (e) => Utils.handlePopup(e, config.entities.essential_load2_extra)
            )}
            ${config.entities?.essential_power && config.entities.essential_power !== 'none'
                ? svg`
                    ${createTextWithPopup(
                        'ess_power',
                        270,
                        119,
                        true,
                        `${largeFont !== true ? 'st14' : 'st4'} st8`,
                        loadColour,
                        auto_scale
                            ? `${Utils.convertValue(essentialPower, decimalPlaces) || 0}`
                            : `${essentialPower || 0} ${UnitOfPower.WATT}`,
                        (e) => Utils.handlePopup(e, config.entities.essential_power),
                        false
                    )}`
                : svg`
                    ${renderText(
                        'ess_power',
                        270,
                        119,
                        true,
                        `${largeFont !== true ? 'st14' : 'st4'} st8`,
                        loadColour,
                        auto_scale
                            ? `${Utils.convertValue(essentialPower, decimalPlaces) || 0}`
                            : `${essentialPower || 0} ${UnitOfPower.WATT}`,
                        false
                    )}`
            }   
            ${createTextWithPopup(
                'ess_load1_value',
                409,
                showAux ? 158 : 47,
                additionalLoad === 1 && data.stateEssentialLoad1.isValid(),
                `${largeFont !== true ? 'st14' : 'st4'} st8`,
                dynamicColourEssentialLoad1,
                data.stateEssentialLoad1.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.essential_load1)
            )}
            ${createTextWithPopup(
                'ess_load2_value',
                showAux ? 391 : 394,
                showAux ? 160 : 41,
                [2, 4, 5, 6].includes(additionalLoad) && data.stateEssentialLoad2.isValid(),
                'st3',
                dynamicColourEssentialLoad1,
                data.stateEssentialLoad1.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.essential_load1)
            )}
            ${createTextWithPopup(
                'ess_load2_value',
                showAux ? 427 : 430,
                showAux ? 160 : 41,
                [2, 4, 5, 6].includes(additionalLoad) && data.stateEssentialLoad2.isValid(),
                'st3',
                dynamicColourEssentialLoad2,
                data.stateEssentialLoad2.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.essential_load2)
            )}
            ${createTextWithPopup(
                'ess_load3_value',
                392,
                160,
                [4, 5, 6].includes(additionalLoad) && data.stateEssentialLoad3.isValid(),
                'st3',
                dynamicColourEssentialLoad3,
                data.stateEssentialLoad3.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.essential_load3)
            )}
            ${createTextWithPopup(
                'ess_load4_value',
                430,
                160,
                [4, 5, 6].includes(additionalLoad) && data.stateEssentialLoad4.isValid(),
                'st3',
                dynamicColourEssentialLoad4,
                data.stateEssentialLoad4.toPowerString(auto_scale, decimalPlaces),
                (e) => Utils.handlePopup(e, config.entities.essential_load4)
            )}
        </svg>
    `;
}