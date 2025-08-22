// load-elements.ts
import { svg, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';
import { guard } from 'lit/directives/guard.js';
import { localize } from '../../../localize/localize';
import { Utils } from '../../../helpers/utils';
import { DataDto, sunsynkPowerFlowCardConfig } from '../../../types';
import { UnitOfPower } from '../../../const';
import { renderIcon } from '../../../helpers/render-icon';
import { renderStaticLoadIcon } from '../../shared/load/render-static-load-icon';
import { getCompactLayoutIconConfigs } from '../../shared/load/icon-configs';
import { createTextWithPopup, renderText } from '../../../helpers/text-utils';
import { renderPath } from '../../../helpers/render-path';
import { renderCircle } from '../../../helpers/render-circle';

export const renderLoadElements = (
	data: DataDto,
	config: sunsynkPowerFlowCardConfig,
) => {
	const {
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
		batteryColour,
		essentialPower,
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
		dynamic_colour,
	} = config.load;

	return html`
		<!-- Load Elements -->
		<svg id="Load" style="overflow: visible" x="${config.wide ? '30%' : '0%'}">
			<rect
				x="304"
				y="203.5"
				width="70"
				height="30"
				rx="4.5"
				ry="4.5"
				fill="none"
				stroke="${loadColour}"
				pointer-events="all"
			/>
			<svg id="Esential-Load1" style="overflow: visible">
				<rect
					id="es-load1"
					x="406"
					y="116.5"
					width="70"
					height="30"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${dynamicColourEssentialLoad1}"
					pointer-events="all"
					display="${[1, 2, 3].includes(additionalLoad) ? '' : 'none'}"
				/>
				${renderText(
					'es-load1',
					441,
					108,
					[1, 2, 3].includes(additionalLoad),
					'st3',
					dynamicColourEssentialLoad1,
					load1_name,
				)}
				${createTextWithPopup(
					'ess_load1',
					440,
					133,
					[1, 2, 3].includes(additionalLoad) &&
						data.stateEssentialLoad1.isValid(),
					`${largeFont !== true ? 'st14' : 'st4'} st8`,
					dynamicColourEssentialLoad1,
					data.stateEssentialLoad1?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load1),
				)}
				${createTextWithPopup(
					'ess_load1_extra',
					448,
					157,
					!!config.entities?.essential_load1_extra &&
						[1, 2, 3].includes(additionalLoad) &&
						data.stateEssentialLoad1Extra.isValid(),
					'st3 left-align',
					dynamicColourEssentialLoad1,
					`${data.stateEssentialLoad1Extra.toNum(1)} ${data.stateEssentialLoad1Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load1_extra),
				)}
				<g display="${[0, 4, 5, 6].includes(additionalLoad) ? 'none' : ''}">
					${renderIcon(
						load1_switch,
						data.iconEssentialLoad1,
						'essload1-icon',
						371,
						114,
					)}
				</g>
			</svg>
			<svg id="Esential-Load2" style="overflow: visible">
				<rect
					id="es-load2"
					x="406"
					y="290"
					width="70"
					height="30"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${dynamicColourEssentialLoad2}"
					pointer-events="all"
					display="${additionalLoad === 2 ? '' : 'none'}"
				/>
				${renderText(
					'es-load2',
					441,
					330.5,
					additionalLoad === 2,
					'st3',
					dynamicColourEssentialLoad2,
					load2_name,
				)}
				${createTextWithPopup(
					'ess_load2',
					440,
					306.5,
					additionalLoad === 2 && data.stateEssentialLoad2.isValid(),
					`${largeFont !== true ? 'st14' : 'st4'} st8`,
					dynamicColourEssentialLoad2,
					data.stateEssentialLoad2?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load2),
				)}
				${createTextWithPopup(
					'ess_load2_extra',
					448,
					282,
					!!config.entities?.essential_load2_extra &&
						additionalLoad === 2 &&
						data.stateEssentialLoad2Extra.isValid(),
					'st3 left-align',
					dynamicColourEssentialLoad2,
					`${data.stateEssentialLoad2Extra.toNum(1)} ${data.stateEssentialLoad2Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load2_extra),
				)}
				<g display="${additionalLoad === 2 ? '' : 'none'}">
					${renderIcon(
						config.load.load2_switch,
						data.iconEssentialLoad2,
						'essload2-icon',
						371,
						288,
					)}
				</g>
			</svg>
			<svg id="Esential-Load3" style="overflow: visible">
				<rect
					id="es-load2"
					x="405"
					y="290"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad2}"
					pointer-events="all"
					display="${additionalLoad === 3 ? '' : 'none'}"
				/>
				<rect
					id="es-load3"
					x="441"
					y="290"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad3}"
					pointer-events="all"
					display="${additionalLoad === 3 ? '' : 'none'}"
				/>
				${renderText(
					'es-load2',
					438,
					320,
					additionalLoad === 3,
					'st3 st8 right-align',
					dynamicColourEssentialLoad2,
					load2_name,
				)}
				${renderText(
					'es-load3',
					444,
					320,
					additionalLoad === 3,
					'st3 st8 left-align',
					dynamicColourEssentialLoad3,
					load3_name,
				)}
				<g display="${additionalLoad === 3 ? '' : 'none'}">
					${renderIcon(
						config.load.load2_switch,
						data.iconEssentialLoad2,
						'essload2-small-icon',
						412,
						264,
					)}
				</g>
				<g display="${additionalLoad === 3 ? '' : 'none'}">
					${renderIcon(
						config.load.load3_switch,
						data.iconEssentialLoad3,
						'essload3-small-icon',
						449,
						264,
					)}
				</g>
				${createTextWithPopup(
					'ess_load2_extra',
					438,
					332,
					!!config.entities?.essential_load2_extra &&
						additionalLoad === 3 &&
						data.stateEssentialLoad2Extra.isValid(),
					'st3 right-align',
					dynamicColourEssentialLoad2,
					`${data.stateEssentialLoad2Extra.toNum(1)} ${data.stateEssentialLoad2Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load2_extra),
				)}
				${createTextWithPopup(
					'ess_load3_extra',
					444,
					332,
					!!config.entities?.essential_load3_extra &&
						additionalLoad === 3 &&
						data.stateEssentialLoad3Extra.isValid(),
					'st3 left-align',
					dynamicColourEssentialLoad3,
					`${data.stateEssentialLoad3Extra.toNum(1)} ${data.stateEssentialLoad3Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load3_extra),
				)}
				${createTextWithPopup(
					'ess_load4',
					423,
					301,
					additionalLoad === 3 && data.stateEssentialLoad2.isValid(),
					'st3',
					dynamicColourEssentialLoad2,
					data.stateEssentialLoad2?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load2),
				)}
				${createTextWithPopup(
					'ess_load4',
					459,
					301,
					additionalLoad === 3 && data.stateEssentialLoad3.isValid(),
					'st3',
					dynamicColourEssentialLoad3,
					data.stateEssentialLoad3?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load3),
				)}
			</svg>
			<svg id="Esential-Load4" style="overflow: visible">
				<rect
					id="es-load3"
					x="405"
					y="290"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad3}"
					pointer-events="all"
					display="${additionalLoad >= 4 ? '' : 'none'}"
				/>
				<rect
					id="es-load1"
					x="405"
					y="107"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad1}"
					pointer-events="all"
					display="${additionalLoad >= 4 ? '' : 'none'}"
				/>
				<rect
					id="es-load2"
					x="441"
					y="107"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad2}"
					pointer-events="all"
					display="${additionalLoad >= 4 ? '' : 'none'}"
				/>
				<rect
					id="es-load4"
					x="441"
					y="290"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad4}"
					pointer-events="all"
					display="${additionalLoad >= 4 ? '' : 'none'}"
				/>
				${renderText(
					'es-load1',
					438,
					136,
					additionalLoad >= 4,
					'st3 st8 right-align',
					dynamicColourEssentialLoad1,
					load1_name,
				)}
				${renderText(
					'es-load2',
					444,
					136,
					additionalLoad >= 4,
					'st3 st8 left-align',
					dynamicColourEssentialLoad2,
					load2_name,
				)}
				${renderText(
					'es-load3',
					438,
					320,
					additionalLoad >= 4,
					'st3 st8 right-align',
					dynamicColourEssentialLoad3,
					load3_name,
				)}
				${renderText(
					'es-load4',
					444,
					320,
					additionalLoad >= 4,
					'st3 st8 left-align',
					dynamicColourEssentialLoad4,
					load4_name,
				)}
				<g display="${additionalLoad >= 4 ? '' : 'none'}">
					${renderIcon(
						load1_switch,
						data.iconEssentialLoad1,
						'essload1-small-icon',
						412,
						81,
					)}
				</g>
				<g display="${additionalLoad >= 4 ? '' : 'none'}">
					${renderIcon(
						load2_switch,
						data.iconEssentialLoad2,
						'essload2-small-icon',
						449,
						81,
					)}
				</g>
				<g display="${additionalLoad >= 4 ? '' : 'none'}">
					${renderIcon(
						load3_switch,
						data.iconEssentialLoad3,
						'essload3-small-icon',
						412,
						264,
					)}
				</g>
				<g display="${additionalLoad >= 4 ? '' : 'none'}">
					${renderIcon(
						load4_switch,
						data.iconEssentialLoad4,
						'essload4-small-icon',
						449,
						264,
					)}
				</g>
				${createTextWithPopup(
					'ess_load1_extra',
					438,
					147,
					!!config.entities?.essential_load1_extra &&
						additionalLoad >= 4 &&
						data.stateEssentialLoad1Extra.isValid(),
					'st3 right-align',
					dynamicColourEssentialLoad1,
					`${data.stateEssentialLoad1Extra.toNum(1)} ${data.stateEssentialLoad1Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load1_extra),
				)}
				${createTextWithPopup(
					'ess_load2_extra',
					444,
					147,
					!!config.entities?.essential_load2_extra &&
						additionalLoad >= 4 &&
						data.stateEssentialLoad2Extra.isValid(),
					'st3 left-align',
					dynamicColourEssentialLoad2,
					`${data.stateEssentialLoad2Extra.toNum(1)} ${data.stateEssentialLoad2Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load2_extra),
				)}
				${createTextWithPopup(
					'ess_load3_extra',
					438,
					332,
					!!config.entities?.essential_load3_extra &&
						additionalLoad >= 4 &&
						data.stateEssentialLoad3Extra.isValid(),
					'st3 right-align',
					dynamicColourEssentialLoad3,
					`${data.stateEssentialLoad3Extra.toNum(1)} ${data.stateEssentialLoad3Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load3_extra),
				)}
				${createTextWithPopup(
					'ess_load4_extra',
					444,
					332,
					!!config.entities?.essential_load4_extra &&
						additionalLoad >= 4 &&
						data.stateEssentialLoad4Extra.isValid(),
					'st3 left-align',
					dynamicColourEssentialLoad4,
					`${data.stateEssentialLoad4Extra.toNum(1)} ${data.stateEssentialLoad4Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load4_extra),
				)}
				${createTextWithPopup(
					'ess_load4',
					423,
					118,
					additionalLoad >= 4 && data.stateEssentialLoad1.isValid(),
					'st3',
					dynamicColourEssentialLoad1,
					data.stateEssentialLoad1?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load1),
				)}
				${createTextWithPopup(
					'ess_load4',
					459,
					118,
					additionalLoad >= 4 && data.stateEssentialLoad2.isValid(),
					'st3',
					dynamicColourEssentialLoad2,
					data.stateEssentialLoad2?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load2),
				)}
				${createTextWithPopup(
					'ess_load4',
					423,
					301,
					additionalLoad >= 4 && data.stateEssentialLoad3.isValid(),
					'st3',
					dynamicColourEssentialLoad3,
					data.stateEssentialLoad3?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load3),
				)}
				${createTextWithPopup(
					'ess_load4',
					459,
					301,
					additionalLoad >= 4 && data.stateEssentialLoad4.isValid(),
					'st3',
					dynamicColourEssentialLoad4,
					data.stateEssentialLoad4?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load4),
				)}
			</svg>
			<svg
				id="Esential-Load5"
				style="overflow: visible; display: ${[5, 6].includes(additionalLoad)
					? config.wide ||
						(!config.wide && [1, 2, 3].includes(config.solar.mppts))
						? 'inline'
						: 'none'
					: `none`};"
				x="${config.wide ? '-5%' : '-7.35%'}"
			>
				<rect
					id="es-load5"
					x="405"
					y="107"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad5}"
					pointer-events="all"
					display="${[5, 6].includes(additionalLoad) ? '' : 'none'}"
				/>
				${renderText(
					'es-load5',
					437,
					136,
					[5, 6].includes(additionalLoad),
					'st3 st8 right-align',
					dynamicColourEssentialLoad5,
					load5_name,
				)}
				<g display="${[5, 6].includes(additionalLoad) ? '' : 'none'}">
					${renderIcon(
						load5_switch,
						data.iconEssentialLoad5,
						'essload5-small-icon',
						412,
						81,
					)}
				</g>
				${createTextWithPopup(
					'ess_load5_extra',
					437,
					147,
					!!config.entities?.essential_load5_extra &&
						[5, 6].includes(additionalLoad) &&
						data.stateEssentialLoad5Extra.isValid(),
					'st3 right-align',
					dynamicColourEssentialLoad5,
					`${data.stateEssentialLoad5Extra.toNum(1)} ${data.stateEssentialLoad5Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load5_extra),
				)}
				${createTextWithPopup(
					'ess_load5',
					423,
					118,
					[5, 6].includes(additionalLoad) && data.stateEssentialLoad5.isValid(),
					'st3',
					dynamicColourEssentialLoad5,
					data.stateEssentialLoad5?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load5),
				)}
			</svg>
			<svg
				id="Esential-Load6"
				style="overflow: visible; display: ${[6].includes(additionalLoad)
					? config.wide ||
						(!config.wide && [1, 2, 3].includes(config.solar.mppts))
						? 'inline'
						: 'none'
					: `none`};"
				x="${config.wide ? '-5%' : '-7.35%'}"
			>
				<rect
					id="es-load6"
					x="405"
					y="290"
					width="35"
					height="20"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${data.dynamicColourEssentialLoad6}"
					pointer-events="all"
					display="${additionalLoad === 6 ? '' : 'none'}"
				/>
				${renderText(
					'es-load6',
					437,
					320,
					additionalLoad === 6,
					'st3 st8 right-align',
					dynamicColourEssentialLoad6,
					load6_name,
				)}
				<g display="${additionalLoad === 6 ? '' : 'none'}">
					${renderIcon(
						load6_switch,
						data.iconEssentialLoad6,
						'essload6-small-icon',
						412,
						264,
					)}
				</g>
				${createTextWithPopup(
					'ess_load6_extra',
					437,
					332,
					!!config.entities?.essential_load6_extra &&
						additionalLoad === 6 &&
						data.stateEssentialLoad6Extra.isValid(),
					'st3 right-align',
					dynamicColourEssentialLoad6,
					`${data.stateEssentialLoad6Extra.toNum(1)} ${data.stateEssentialLoad6Extra.getUOM()}`,
					(e) => Utils.handlePopup(e, config.entities.essential_load6_extra),
				)}
				${createTextWithPopup(
					'ess_load6',
					423,
					301,
					additionalLoad === 6 && data.stateEssentialLoad6.isValid(),
					'st3',
					dynamicColourEssentialLoad6,
					data.stateEssentialLoad6?.toPowerString(auto_scale, decimalPlaces),
					(e) => Utils.handlePopup(e, config.entities.essential_load6),
				)}
			</svg>
			${renderText(
				'daily_load',
				[2, 3, 4, 5, 6].includes(additionalLoad) ? '365' : '412',
				[2, 3, 4, 5, 6].includes(additionalLoad) ? '189' : '282.1',
				!data.loadShowDaily,
				'st3 left-align',
				loadColour,
				config.load.label_daily_load || localize('common.daily_load'),
				true,
			)}
			${renderText(
				'load-power-3P',
				304,
				241,
				config.inverter.three_phase && !!config.entities?.load_power_L1,
				'st3 left-align',
				loadColour,
				config.inverter.three_phase && config.entities?.load_power_L1
					? `${auto_scale ? Utils.convertValue(data.loadPowerL1, decimalPlaces) || 0 : `${data.loadPowerL1 || 0}`}${
							config.inverter.three_phase && config.entities?.load_power_L2
								? ` | ${auto_scale ? Utils.convertValue(data.loadPowerL2, decimalPlaces) || 0 : `${data.loadPowerL2 || 0}`}`
								: ''
						}${
							config.inverter.three_phase && config.entities?.load_power_L3
								? ` | ${auto_scale ? Utils.convertValue(data.loadPowerL3, decimalPlaces) || 0 : `${data.loadPowerL3 || 0}`}`
								: ''
						}${auto_scale ? '' : ` ${UnitOfPower.WATT}`}`
					: '0',
			)}
			<svg id="load-flow">
				${renderPath(
					'es-line',
					config.wide ? 'M 304 218.5 L 117 218.5' : 'M 304 218.5 L 264.7 218.5',
					true,
					dynamic_colour ? flowColour : loadColour,
					data.loadLineWidth,
				)}
				${renderCircle(
					'es-dot',
					Math.min(
						2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					essentialPower === 0 || essentialPower < 0
						? 'transparent'
						: `${dynamic_colour ? flowColour : loadColour}`,
					data.durationCur['load'],
					'1;0',
					'#es-line',
					config.load.invert_flow === true,
				)}
				${renderCircle(
					'es-dot',
					Math.min(
						2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					essentialPower === 0 || essentialPower > 0
						? 'transparent'
						: `${dynamic_colour ? flowColour : loadColour}`,
					data.durationCur['load'],
					'0;1',
					'#es-line',
					config.load.invert_flow,
				)}
			</svg>
			<svg id="load-flow1">
				${renderPath(
					'es-line1',
					'M 374 218.5 L 402.38 218.5',
					true,
					dynamic_colour ? flowColour : loadColour,
					data.loadLineWidth,
				)}
				${renderCircle(
					'es-dot',
					Math.min(
						2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					essentialPower === 0 || essentialPower < 0
						? 'transparent'
						: `${dynamic_colour ? flowColour : loadColour}`,
					data.durationCur['load'],
					'0;1',
					'#es-line1',
					config.load.invert_flow === true,
				)}
				${renderCircle(
					'es-dot',
					Math.min(
						2 + data.loadLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					essentialPower === 0 || essentialPower > 0
						? 'transparent'
						: `${dynamic_colour ? flowColour : loadColour}`,
					data.durationCur['load'],
					'1;0',
					'#es-line1',
					config.load.invert_flow === true,
				)}
			</svg>
			${renderPath(
				'es-load1',
				'M 441 180 L 441 147',
				additionalLoad === 1,
				data.load1Colour,
				1,
			)}
			${renderPath(
				'es-load1',
				'M 441 180 L 441 147',
				[2, 3, 4, 5, 6].includes(additionalLoad),
				data.load1Colour,
				1,
			)}
			${renderPath(
				'es-load2',
				'M 441 290 L 441 257',
				[2, 3, 4, 5, 6].includes(additionalLoad),
				data.load2Colour,
				1,
			)}
			<a
				href="#"
				@click=${config.load?.navigate
					? (e) => Utils.handleNavigation(e, config.load.navigate)
					: null}
			>
				<svg
					id="essen"
					x="${data.essIconSize === 1 ? '405' : '402'}"
					y="${data.essIconSize === 1 ? '186' : '177.5'}"
					width="${data.essIconSize === 1 ? '75' : '79'}"
					height="${data.essIconSize === 1 ? '75' : '79'}"
					viewBox="0 0 24 24"
				>
					<defs>
						<linearGradient
							id="Lg-esscompact"
							x1="0%"
							x2="0%"
							y1="100%"
							y2="0%"
						>
							<stop
								offset="0%"
								stop-color="${data.gridPercentage > 0
									? data.gridColour
									: data.batteryPercentage > 0
										? batteryColour
										: solarColour}"
							/>
							<stop
								offset="${data.gridPercentage}%"
								stop-color="${data.gridPercentage > 0
									? data.gridColour
									: data.batteryPercentage > 0
										? batteryColour
										: solarColour}"
							/>
							<stop
								offset="${data.gridPercentage}%"
								stop-color="${data.batteryPercentage > 0
									? batteryColour
									: solarColour}"
							/>
							<stop
								offset="${data.gridPercentage + data.batteryPercentage}%"
								stop-color="${data.batteryPercentage > 0
									? batteryColour
									: solarColour}"
							/>
							<stop
								offset="${data.gridPercentage + data.batteryPercentage}%"
								stop-color="${solarColour}"
							/>
							<stop offset="100%" stop-color="${solarColour}" />
						</linearGradient>
					</defs>
					<path
						fill="${dynamic_colour ? `url(#Lg-esscompact)` : loadColour}"
						d="${data.essIcon}"
					/>
				</svg>
			</a>
			${createTextWithPopup(
				'daily_load_value',
				[2, 3, 4, 5, 6].includes(additionalLoad) ? '365' : '412',
				[2, 3, 4, 5, 6].includes(additionalLoad) ? '175' : '267.9',
				!data.loadShowDaily || !data.stateDayLoadEnergy.isValid(),
				'st10 left-align',
				loadColour,
				data.stateDayLoadEnergy?.toPowerString(true, data.decimalPlacesEnergy),
				(e) => Utils.handlePopup(e, config.entities.day_load_energy_84),
				true,
			)}
			${config.entities?.essential_power &&
			config.entities.essential_power !== 'none'
				? svg`
                    ${createTextWithPopup(
											'ess_power',
											340.1,
											219.2,
											true,
											`${largeFont !== true ? 'st14' : 'st4'} st8`,
											loadColour,
											auto_scale
												? `${Utils.convertValue(essentialPower, decimalPlaces) || 0}`
												: `${essentialPower || 0} ${UnitOfPower.WATT}`,
											(e) =>
												Utils.handlePopup(e, config.entities.essential_power),
										)}`
				: svg`
                    ${renderText(
											'ess_power',
											340.1,
											219.2,
											true,
											`${largeFont !== true ? 'st14' : 'st4'} st8`,
											loadColour,
											auto_scale
												? `${Utils.convertValue(essentialPower, decimalPlaces) || 0}`
												: `${essentialPower || 0} ${UnitOfPower.WATT}`,
										)}`}
			${guard(
				[
					data.additionalLoad,
					data.showAux,
					data.iconEssentialLoad1,
					data.iconEssentialLoad2,
					// Include dynamic colours so icon fill updates when they change
					data.dynamicColourEssentialLoad1,
					data.dynamicColourEssentialLoad2,
				],
				() =>
					repeat(
						getCompactLayoutIconConfigs(data),
						(iconConfig) => iconConfig.id,
						(iconConfig) => renderStaticLoadIcon(data, iconConfig),
					),
			)}
		</svg>
	`;
};
