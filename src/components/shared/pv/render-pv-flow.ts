import {html} from 'lit';
import {Utils} from '../../../helpers/utils';

export function renderPVFlow(
	id: string,
	path: string,
	color: string,
	lineWidth: number,
	powerWatts: number,
	duration: number,
	invertFlow: boolean,
	minLineWidth: number,
	className: string = '',
	keyPoints: string = '0;1',
) {
	const lineId = `${id}-line`;
	const finalKeyPoints = invertFlow === true ? Utils.invertKeyPoints(keyPoints) : keyPoints;

	return html`
		<svg id="${id}-flow">
			<path
				id="${lineId}"
				d="${path}"
				fill="none"
				stroke="${color}"
				stroke-width="${lineWidth}"
				stroke-miterlimit="10"
				pointer-events="stroke"
				class="${className}"
			/>
			<circle
				id="${id}-dot"
				r="${Math.min(2 + lineWidth + Math.max(minLineWidth - 2, 0), 8)}"
				fill="${Math.round(powerWatts) <= 0 ? 'transparent' : `${color}`}"
				class="${className}"
			>
				<animateMotion
					dur="${duration}s"
					repeatCount="indefinite"
					keyPoints=${finalKeyPoints}
					keyTimes="0;1"
					calcMode="linear"
					rotate="auto"
				>
					<mpath href="#${lineId}" />
				</animateMotion>
			</circle>
		</svg>
	`;
}
