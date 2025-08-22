import { svg } from 'lit';
import { Utils } from '../../../helpers/utils';

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
	const finalKeyPoints =
		invertFlow === true ? Utils.invertKeyPoints(keyPoints) : keyPoints;
	// Show animation dot whenever power is strictly positive (avoid rounding to 0)
	const showDot = powerWatts > 0;
	// Ensure a valid positive duration; default to 1s if unset/invalid
	const dur = Number.isFinite(duration) && duration > 0 ? duration : 1;

	return svg`
		<svg
			id="${id}-flow"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			overflow="visible"
		>
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
			${
				showDot
					? svg`<circle
						id="${id}-dot"
						r="${Math.min(2 + lineWidth + Math.max(minLineWidth - 2, 0), 8)}"
						fill="${color}"
						class="${className}"
					>
						<animateMotion
							dur="${dur}s"
							repeatCount="indefinite"
							keyPoints="${finalKeyPoints}"
							keyTimes="0;1"
							calcMode="linear"
							rotate="auto"
						>
							<mpath href="#${lineId}" xlink:href="#${lineId}" />
						</animateMotion>
					</circle>`
					: svg``
			}
		</svg>
	`;
}
