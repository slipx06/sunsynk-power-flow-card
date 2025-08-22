import { svg } from 'lit';
import { DataDto, sunsynkPowerFlowCardConfig } from '../../../types';

export function renderPV(
	id: string,
	x: string,
	y: string,
	data: DataDto,
	config: sunsynkPowerFlowCardConfig,
) {
	// Only vary gradient id when efficiency > 0 and gradient is used.
	// When efficiency is 0, we render a stable grey stroke without a gradient to avoid paint churn.
	// Stable ID per PV element; Shadow DOM scoping prevents cross-card collisions
	const gradientId = `${id}LG`;
	const efficiencyMap = {
		pvtotal: 'totalPVEfficiency',
		pv1: 'PV1Efficiency',
		pv2: 'PV2Efficiency',
		pv3: 'PV3Efficiency',
		pv4: 'PV4Efficiency',
		pv5: 'PV5Efficiency',
		pv6: 'PV6Efficiency',
	};
	const efficiencyPropertyName = efficiencyMap[id] || 'totalPVEfficiency';
	// Coerce efficiency to a number and clamp to [0, 100] to ensure valid gradient offsets
	type EfficiencyKey =
		| 'totalPVEfficiency'
		| 'PV1Efficiency'
		| 'PV2Efficiency'
		| 'PV3Efficiency'
		| 'PV4Efficiency'
		| 'PV5Efficiency'
		| 'PV6Efficiency';
	const effKey = efficiencyPropertyName as EfficiencyKey as keyof DataDto;
	const efficiencyRaw = data[effKey] as unknown;
	const parsed =
		typeof efficiencyRaw === 'number'
			? efficiencyRaw
			: parseFloat(String(efficiencyRaw ?? '').replace('%', ''));
	const efficiency = Math.max(
		0,
		Math.min(100, Number.isFinite(parsed) ? (parsed as number) : 0),
	);
	const solarColour = data.solarColour;
	const useGradient =
		[1, 3].includes(config.solar.efficiency) && efficiency > 0;
	const strokeColor = efficiency === 0 ? 'grey' : solarColour;
	const gradientUrl = useGradient ? `url(#${gradientId})` : strokeColor;
	let className = '';

	if (id === 'pv2' && config.solar.mppts === 1) {
		className = 'st12';
	} else if (id === 'pv3' && [1, 2].includes(config.solar.mppts)) {
		className = 'st12';
	} else if (id === 'pv4' && [1, 2, 3].includes(config.solar.mppts)) {
		className = 'st12';
	} else if (id === 'pv5' && [1, 2, 3, 4].includes(config.solar.mppts)) {
		className = 'st12';
	} else if (id === 'pv6' && [1, 2, 3, 4, 5].includes(config.solar.mppts)) {
		className = 'st12';
	}

	const style =
		id === 'pvtotal' && config.solar.mppts === 1 ? 'display: none;' : '';

	return svg`
		<svg
			id="${id}"
			x="${x}"
			y="${y}"
			width="70"
			height="30"
			viewBox="0 0 70 30"
			overflow="visible"
		>
			${
				useGradient
					? svg`<defs>
						<linearGradient
							id="${gradientId}"
							x1="0%"
							x2="0%"
							y1="100%"
							y2="0%"
							gradientUnits="objectBoundingBox"
						>
							<stop offset="0%" stop-color="${solarColour}" />
							<stop offset="${efficiency}%" stop-color="${solarColour}" />
							<stop offset="${efficiency}%" stop-color="grey" />
							<stop offset="100%" stop-color="grey" />
						</linearGradient>
					</defs>`
					: svg``
			}
			<rect
				id="${id}"
				width="70"
				height="30"
				rx="4.5"
				ry="4.5"
				fill="none"
				stroke="${gradientUrl}"
				stroke-width="1"
				pointer-events="all"
				class="${className}"
				style="${style}"
			/>
		</svg>
	`;
}
