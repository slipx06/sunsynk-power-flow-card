import {html} from 'lit';
import {DataDto, sunsynkPowerFlowCardConfig} from '../types';
import {getDynamicStyles } from '../style';
import {renderSolarElements} from '../components/full/pv/pv_elements';
import {renderBatteryElements} from '../components/full/bat/bat-elements';
import {renderGridElements} from '../components/full/grid/grid-elements';
import {renderLoadElements} from '../components/full/load/load-elements';
import {renderAuxLoadElements} from '../components/full/auxload/aux-elements';
import {renderInverterElements} from '../components/full/inverter/inverter-elements';


export const fullCard = (config: sunsynkPowerFlowCardConfig, inverterImg: string, data: DataDto) => {
    return html`
        <ha-card>
            ${getDynamicStyles(data)}
            <div class="container card">
                ${config.title ? html`<h1
                        style="text-align: center; color: ${config.title_colour || 'inherit'}; font-size: ${config.title_size || '32px'};">
                    ${config.title}</h1>` : ''}
                <svg viewBox="${config.wide ? "0 0 720 405" : "0 0 483 405"}"
                    preserveAspectRatio="xMidYMid meet"
                    height="${data.cardHeight}"
                    width="${data.cardWidth}"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink">

                    <!-- Solar Elements -->
                    ${renderSolarElements(data, config)}
                    
                    <!-- Battery Elements -->
                    ${renderBatteryElements(data, config)}

                    <!-- Grid Elements -->
                    ${renderGridElements(data, config)}

                    <!-- Load Elements -->
                    ${renderLoadElements(data, config)}
                    
                    <!-- AUX Elements -->
                    ${renderAuxLoadElements(data, config)}
                    
                    <!-- Inverter Elements -->
                    ${renderInverterElements(data, inverterImg, config)}
                     
                </svg>
            </div>
        </ha-card>
    `;
}
