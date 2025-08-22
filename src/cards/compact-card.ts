import { html } from 'lit';
import { cache } from 'lit/directives/cache.js';
import { keyed } from 'lit/directives/keyed.js';
import { DataDto, sunsynkPowerFlowCardConfig } from '../types';
import { renderSolarElements } from '../components/compact/pv/pv-elements';
import { renderBatteryElements } from '../components/compact/bat/bat-elements';
import { renderGridElements } from '../components/compact/grid/grid-elements';
import { renderLoadElements } from '../components/compact/load/load-elements';
import { renderInverterElements } from '../components/compact/inverter/inverter-elements';
import { getDynamicStyles } from '../style';

export const compactCard = (
	config: sunsynkPowerFlowCardConfig,
	inverterImg: string,
	data: DataDto,
) => {
	const titleKey = config.title
		? `${config.title}|${config.title_colour ?? ''}|${config.title_size ?? ''}`
		: 'no-title';
	const titleTemplate = config.title
		? cache(
				keyed(
					titleKey,
					html`
						<h1
							style="text-align: center; color: ${config.title_colour ||
							'inherit'}; font-size: ${config.title_size || '32px'};"
						>
							${config.title}
						</h1>
					`,
				),
			)
		: '';
	return html`
		<ha-card>
			${getDynamicStyles(data)}
			<div class="container card">
				${titleTemplate}
				<svg
					viewBox="${config.wide
						? '0 0 720 405'
						: `-2 ${data.viewBoxYLite} 490 ${data.viewBoxHeightLite}`}"
					preserveAspectRatio="xMidYMid meet"
					height="${data.cardHeight}"
					width="${data.cardWidth}"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<!-- Solar Elements -->
					${renderSolarElements(data, config)}

					<!-- Battery Elements -->
					${renderBatteryElements(data, config)}

					<!-- Grid Elements -->
					${renderGridElements(data, config)}

					<!-- Load Elements -->
					${renderLoadElements(data, config)}

					<!-- Inverter Elements -->
					${renderInverterElements(data, inverterImg, config)}
				</svg>
			</div>
		</ha-card>
	`;
};
