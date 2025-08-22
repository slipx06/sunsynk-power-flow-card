// bat-elements.ts
import { html } from 'lit';
import { localize } from '../../../localize/localize';
import { Utils } from '../../../helpers/utils';
import { DataDto, sunsynkPowerFlowCardConfig } from '../../../types';
import {
	UnitOfElectricalCurrent,
	UnitOfElectricPotential,
	UnitOfPower,
	UnitOfEnergy,
} from '../../../const';
import { createTextWithPopup, renderText } from '../../../helpers/text-utils';
import { renderPath } from '../../../helpers/render-path';
import { renderCircle } from '../../../helpers/render-circle';

export const renderBatteryElements = (
	data: DataDto,
	config: sunsynkPowerFlowCardConfig,
) => {
	const {
		batteryCount,
		batteryColour,
		battery2Colour,
		largeFont,
		decimalPlaces,
		batteryPower,
		battery2Power,
		isFloating,
		isFloating2,
		batteryShutdown,
		batteryShutdown2,
	} = data;

	const { auto_scale, show_absolute } = config.battery;

	return html`
		<!-- Battery Elements -->
		<svg
			id="Battery"
			style="overflow: visible; display: ${!config.show_battery
				? 'none'
				: 'inline'};"
			x="${config.wide ? '3%' : '3%'}"
			y="2.5%"
		>
			<svg
				id="battery_total_power"
				style="display: ${config.wide && batteryCount === 2
					? 'inline'
					: 'none'};"
			>
				<rect
					x="86"
					y="265"
					width="70"
					height="30"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${batteryColour}"
					pointer-events="all"
					class="${data.compactMode ? '' : ''}"
				/>
				${renderText(
					'battery_power_total',
					120,
					282,
					true,
					`${largeFont !== true ? 'st14' : 'st4'} st8`,
					batteryColour,
					auto_scale
						? `${Utils.convertValue(data.batteryPowerTotal, decimalPlaces) || 0}`
						: `${Utils.toNum(data.batteryPowerTotal || 0, 0)} ${UnitOfPower.WATT}`,
				)}
			</svg>
			<svg id="battery1_icon" x="${batteryCount === 2 ? '12.25%' : '0%'}">
				<a
					href="#"
					@click=${(e) =>
						config.battery.navigate
							? Utils.handleNavigation(e, config.battery.navigate)
							: null}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="bat"
						x="74.5"
						y="${config.battery?.show_remaining_energy ? '294' : '296.25'}"
						width="82"
						height="82"
						preserveAspectRatio="none"
						viewBox="0 0 24 24"
					>
						<defs>
							<linearGradient id="bLg-bat1" x1="0%" x2="0%" y1="100%" y2="0%">
								<stop
									offset="0%"
									stop-color="${data.gridPercentageBat > 0
										? data.gridColour
										: data.pvPercentageBat > 0
											? data.solarColour
											: batteryColour}"
								/>
								<stop
									offset="${data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat}%"
									stop-color="${data.gridPercentageBat > 0
										? data.gridColour
										: data.pvPercentageBat > 0
											? data.solarColour
											: batteryColour}"
								/>
								<stop
									offset="${data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat}%"
									stop-color="${data.pvPercentageBat > 0
										? data.solarColour
										: batteryColour}"
								/>
								<stop
									offset="${(data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat) +
									(data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
									stop-color="${data.pvPercentageBat > 0
										? data.solarColour
										: batteryColour}"
								/>
								<stop
									offset="${(data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat) +
									(data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
									stop-color="${batteryColour}"
								/>
								<stop offset="100%" stop-color="${batteryColour}" />
							</linearGradient>
						</defs>
						<path
							fill="${config.battery.dynamic_colour
								? `url(#bLg-bat1)`
								: batteryColour}"
							d="${config.battery.linear_gradient
								? data.battery0
								: data.batteryIcon}"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="bat"
						x="74.5"
						y="${config.battery?.show_remaining_energy ? '294' : '296.25'}"
						width="82"
						height="82"
						preserveAspectRatio="none"
						viewBox="0 0 24 24"
					>
						<defs>
							<linearGradient id="sLg-bat1" x1="0%" x2="0%" y1="100%" y2="0%">
								<stop offset="0%" stop-color="red" />
								<stop offset="100%" stop-color="${data.stopColour}" />
								<animate
									attributeName="${config.battery.animate ? 'y2' : 'none'}"
									dur="6s"
									values="100%; 0%"
									repeatCount="indefinite"
								/>
							</linearGradient>
						</defs>
						<path
							fill="${config.battery.linear_gradient
								? `url(#sLg-bat1)`
								: batteryColour}"
							display="${!config.battery.linear_gradient ? 'none' : ''}"
							d="${data.batteryCharge}"
						/>
					</svg>
				</a>
				${createTextWithPopup(
					'battery_temp_182',
					93.7,
					295,
					!data.stateBatteryTemp.isValid(),
					config.entities?.battery_temp_182 ? 'st3 left-align' : 'st12',
					batteryColour,
					`${data.stateBatteryTemp.toNum(1)}°`,
					(e) => Utils.handlePopup(e, config.entities.battery_temp_182),
					true,
				)}
				${createTextWithPopup(
					'battery_soh',
					93.7,
					295,
					!data.stateBatterySOH.isValid() ||
						!!config.entities?.battery_temp_182,
					config.entities?.battery_soh ? 'st3 left-align' : 'st12',
					batteryColour,
					`${data.stateBatterySOH.toNum(0)}%`,
					(e) => Utils.handlePopup(e, config.entities.battery_soh),
					true,
				)}
				${renderText(
					'battery_remaining_energy',
					101,
					378,
					!config.battery.show_remaining_energy,
					'remaining-energy',
					batteryColour,
					!config.battery.remaining_energy_to_shutdown
						? `${Utils.toNum((data.batteryEnergy * (data.stateBatterySoc.toNum() / 100)) / 1000, 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
						: `${Utils.toNum((data.batteryEnergy * ((data.stateBatterySoc?.toNum() - data.batteryOneShutdown) / 100)) / 1000, 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`,
					true,
				)}
			</svg>
			<svg
				id="battery2_icon"
				style="overflow: visible; display: ${batteryCount === 2
					? 'inline'
					: 'none'};"
				x="${batteryCount === 2 ? '19%' : '0%'}"
			>
				<a
					href="#"
					@click=${(e) =>
						config.battery2.navigate
							? Utils.handleNavigation(e, config.battery2.navigate)
							: null}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="bat"
						x="74.5"
						y="${config.battery2?.show_remaining_energy ? '294' : '296.25'}"
						width="82"
						height="82"
						preserveAspectRatio="none"
						viewBox="0 0 24 24"
					>
						<defs>
							<linearGradient id="b2Lg-bat2" x1="0%" x2="0%" y1="100%" y2="0%">
								<stop
									offset="0%"
									stop-color="${data.gridPercentageBat > 0
										? data.gridColour
										: data.pvPercentageBat > 0
											? data.solarColour
											: battery2Colour}"
								/>
								<stop
									offset="${data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat}%"
									stop-color="${data.gridPercentageBat > 0
										? data.gridColour
										: data.pvPercentageBat > 0
											? data.solarColour
											: battery2Colour}"
								/>
								<stop
									offset="${data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat}%"
									stop-color="${data.pvPercentageBat > 0
										? data.solarColour
										: battery2Colour}"
								/>
								<stop
									offset="${(data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat) +
									(data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
									stop-color="${data.pvPercentageBat > 0
										? data.solarColour
										: battery2Colour}"
								/>
								<stop
									offset="${(data.gridPercentageBat < 2
										? 0
										: data.gridPercentageBat) +
									(data.pvPercentageBat < 2 ? 0 : data.pvPercentageBat)}%"
									stop-color="${battery2Colour}"
								/>
								<stop offset="100%" stop-color="${battery2Colour}" />
							</linearGradient>
						</defs>
						<path
							fill="${config.battery2.dynamic_colour
								? `url(#b2Lg-bat2)`
								: battery2Colour}"
							d="${config.battery2.linear_gradient
								? data.battery20
								: data.battery2Icon}"
						/>
					</svg>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						id="bat"
						x="74.5"
						y="${config.battery2?.show_remaining_energy ? '294' : '296.25'}"
						width="82"
						height="82"
						preserveAspectRatio="none"
						viewBox="0 0 24 24"
					>
						<defs>
							<linearGradient id="s2Lg-bat2" x1="0%" x2="0%" y1="100%" y2="0%">
								<stop offset="0%" stop-color="red" />
								<stop offset="100%" stop-color="${data.stop2Colour}" />
								<animate
									attributeName="${config.battery2.animate ? 'y2' : 'none'}"
									dur="6s"
									values="100%; 0%"
									repeatCount="indefinite"
								/>
							</linearGradient>
						</defs>
						<path
							fill="${config.battery2.linear_gradient
								? `url(#s2Lg-bat2)`
								: battery2Colour}"
							display="${!config.battery2.linear_gradient ? 'none' : ''}"
							d="${data.battery2Charge}"
						/>
					</svg>
				</a>
				${createTextWithPopup(
					'battery2_temp_182',
					93.7,
					295,
					!data.stateBattery2Temp.isValid(),
					config.entities?.battery2_temp_182 ? 'st3 left-align' : 'st12',
					battery2Colour,
					`${data.stateBattery2Temp.toNum(1)}°`,
					(e) => Utils.handlePopup(e, config.entities.battery2_temp_182),
					true,
				)}
				${createTextWithPopup(
					'battery2_soh',
					93.7,
					295,
					!data.stateBattery2SOH.isValid() ||
						!!config.entities?.battery2_temp_182,
					config.entities?.battery2_soh ? 'st3 left-align' : 'st12',
					battery2Colour,
					`${data.stateBattery2SOH.toNum(0)}%`,
					(e) => Utils.handlePopup(e, config.entities.battery2_soh),
					true,
				)}
				${renderText(
					'battery2_remaining_energy',
					101,
					378,
					!config.battery2.show_remaining_energy,
					'remaining-energy',
					battery2Colour,
					!config.battery2.remaining_energy_to_shutdown
						? `${Utils.toNum((data.battery2Energy * (data.stateBattery2Soc.toNum() / 100)) / 1000, 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`
						: `${Utils.toNum((data.battery2Energy * ((data.stateBattery2Soc?.toNum() - data.batteryTwoShutdown) / 100)) / 1000, 2)} ${UnitOfEnergy.KILO_WATT_HOUR}`,
					true,
				)}
			</svg>
			<svg
				id="battery1_remaining"
				style="overflow: visible; display: ${batteryCount === 1
					? 'inline'
					: 'none'};"
			>
				${renderText(
					'duration_text',
					132,
					368,
					true,
					'st3 left-align',
					data.batteryEnergy === 0 ||
						(config.battery.invert_flow === true
							? batteryPower >= 0
							: batteryPower <= 0) ||
						isFloating
						? 'transparent'
						: batteryColour,
					`${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}`,
				)}
				${renderText(
					'duration_text_charging',
					132,
					368,
					true,
					'st3 left-align',
					data.batteryEnergy === 0 ||
						(config.battery.invert_flow === true
							? batteryPower <= 0
							: batteryPower >= 0) ||
						isFloating
						? 'transparent'
						: batteryColour,
					`${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')} @${data.formattedResultTime}`,
				)}
				${renderText(
					'floating',
					132,
					368,
					true,
					'st3 left-align',
					data.batteryEnergy === 0 || !isFloating
						? 'transparent'
						: batteryColour,
					localize('common.battery_floating'),
				)}
				${renderText(
					'battery_soc_184',
					202,
					327,
					!data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
					`${config.battery.hide_soc ? 'st12' : 'st14 left-align'}`,
					batteryColour,
					`${batteryShutdown}%`,
				)}
				${renderText(
					'battery_soc_184',
					202,
					340,
					!data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
					`${config.battery.hide_soc ? 'st12' : 'st14 left-align'}`,
					batteryColour,
					`${data.shutdownOffGrid}%`,
				)}
				<svg
					id="Battery1_SOC"
					style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' ||
					!data.stateBatterySoc.isValid()
						? 'none'
						: 'inline'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						132.5,
						333,
						config.entities.battery_soc_184 === 'none' ||
							!data.stateBatterySoc.isValid(),
						'st13 st8 left-align',
						batteryColour,
						!data.inverterProg.show && config.battery.shutdown_soc_offgrid
							? config.battery.hide_soc
								? data.stateBatterySoc.toDisplay()
								: `${data.stateBatterySoc.toNum(0)}% | `
							: config.battery.hide_soc
								? data.stateBatterySoc.toDisplay()
								: `${data.stateBatterySoc.toNum(0)}%`,
						(e) => Utils.handlePopup(e, config.entities.battery_soc_184),
						true,
					)}
				</svg>
				<svg
					id="Battery1_SOC_Program_Capacity"
					style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' ||
					!data.stateBatterySoc.isValid() ||
					config.battery.hide_soc ||
					!data.inverterProg.show
						? 'none'
						: 'inline'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						132.5,
						333,
						true,
						'st13 st8 left-align',
						batteryColour,
						`${data.stateBatterySoc.toNum(0)}% | ${data.inverterProg.capacity || 0}%`,
						(e) => Utils.handlePopup(e, config.entities.battery_soc_184),
					)}
				</svg>
				<svg
					id="Battery1_SOC_Shutdown"
					style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' &&
					data.stateBatterySoc.isValid() &&
					!config.battery.hide_soc &&
					!data.inverterProg.show &&
					config.battery?.shutdown_soc &&
					!config.battery?.shutdown_soc_offgrid
						? 'inline'
						: 'none'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						132.5,
						333,
						true,
						'st13 st8 left-align',
						batteryColour,
						`${data.stateBatterySoc.toNum(0)}% | ${batteryShutdown || 0}%`,
						(e) => Utils.handlePopup(e, config.entities.battery_soc_184),
					)}
				</svg>
				${renderText(
					'duration',
					132,
					352,
					true,
					`${largeFont !== true ? 'st14' : 'st4'} left-align`,
					data.batteryEnergy === 0 || isFloating || batteryPower === 0
						? 'transparent'
						: batteryColour,
					data.batteryDuration,
				)}
			</svg>

			<svg
				id="two_batteries_battery1_remaining"
				style="overflow: visible; display: ${batteryCount === 2
					? 'inline'
					: 'none'};"
				x="-20%"
			>
				${renderText(
					'duration_text',
					258,
					368,
					true,
					'st3 right-align',
					data.batteryEnergy === 0 ||
						(config.battery.invert_flow === true
							? batteryPower >= 0
							: batteryPower <= 0) ||
						isFloating
						? 'transparent'
						: batteryColour,
					`${localize('common.runtime_to')} ${data.batteryCapacity}% @${data.formattedResultTime}`,
				)}
				${renderText(
					'duration_text_charging',
					258,
					368,
					true,
					'st3 right-align',
					data.batteryEnergy === 0 ||
						(config.battery.invert_flow === true
							? batteryPower <= 0
							: batteryPower >= 0) ||
						isFloating
						? 'transparent'
						: batteryColour,
					`${localize('common.to')} ${data.batteryCapacity}% ${localize('common.charge')} @${data.formattedResultTime}`,
				)}
				${renderText(
					'floating',
					258,
					368,
					true,
					'st3 right-align',
					data.batteryEnergy === 0 || !isFloating
						? 'transparent'
						: batteryColour,
					localize('common.battery_floating'),
				)}
				${renderText(
					'battery_soc_184',
					187,
					327,
					!data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
					`${config.battery.hide_soc ? 'st12' : 'st14 right-align'}`,
					batteryColour,
					`${batteryShutdown}%`,
				)}
				${renderText(
					'battery_soc_184',
					187,
					340,
					!data.inverterProg.show && config.battery?.shutdown_soc_offgrid,
					`${config.battery.hide_soc ? 'st12' : 'st14 right-align'}`,
					batteryColour,
					`${data.shutdownOffGrid}%`,
				)}
				<svg
					id="Battery1_SOC"
					style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' ||
					!data.stateBatterySoc.isValid()
						? 'none'
						: 'inline'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						258,
						333,
						config.entities.battery_soc_184 === 'none' ||
							!data.stateBatterySoc.isValid(),
						'st13 st8 right-align',
						batteryColour,
						!data.inverterProg.show && config.battery.shutdown_soc_offgrid
							? config.battery.hide_soc
								? data.stateBatterySoc.toDisplay()
								: `| ${data.stateBatterySoc.toNum(0)}%`
							: config.battery.hide_soc
								? data.stateBatterySoc.toDisplay()
								: `${data.stateBatterySoc.toNum(0)}%`,
						(e) => Utils.handlePopup(e, config.entities.battery_soc_184),
						true,
					)}
				</svg>
				<svg
					id="Battery1_SOC_Program_Capacity"
					style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 === 'none' ||
					!data.stateBatterySoc.isValid() ||
					config.battery.hide_soc ||
					!data.inverterProg.show
						? 'none'
						: 'inline'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						258,
						333,
						true,
						'st13 st8 right-align',
						batteryColour,
						`${data.inverterProg.capacity || 0}% | ${data.stateBatterySoc.toNum(0)}%`,
						(e) => Utils.handlePopup(e, config.entities.battery_soc_184),
					)}
				</svg>
				<svg
					id="Battery1_SOC_Shutdown"
					style="overflow: visible; 
                        display: ${config.entities.battery_soc_184 !== 'none' &&
					data.stateBatterySoc.isValid() &&
					!config.battery.hide_soc &&
					!data.inverterProg.show &&
					config.battery?.shutdown_soc &&
					!config.battery?.shutdown_soc_offgrid
						? 'inline'
						: 'none'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						258,
						333,
						true,
						'st13 st8 right-align',
						batteryColour,
						`${batteryShutdown || 0}% | ${data.stateBatterySoc.toNum(0)}%`,
						(e) => Utils.handlePopup(e, config.entities.battery_soc_184),
					)}
				</svg>
				${renderText(
					'duration',
					258,
					352,
					true,
					`${largeFont !== true ? 'st14' : 'st4'} right-align`,
					data.batteryEnergy === 0 || isFloating || batteryPower === 0
						? 'transparent'
						: batteryColour,
					data.batteryDuration,
				)}
			</svg>
			<svg
				id="battery2_remaining"
				style="overflow: visible; display: ${batteryCount === 2
					? 'inline'
					: 'none'};"
				x="${batteryCount === 2 ? '25%' : '0%'}"
			>
				${renderText(
					'duration_text',
					132,
					368,
					true,
					'st3 left-align',
					data.battery2Energy === 0 ||
						(config.battery2.invert_flow === true
							? battery2Power >= 0
							: battery2Power <= 0) ||
						isFloating2
						? 'transparent'
						: battery2Colour,
					`${localize('common.runtime_to')} ${data.battery2Capacity}% @${data.formattedResultTime2}`,
				)}
				${renderText(
					'duration_text_charging',
					132,
					368,
					true,
					'st3 left-align',
					data.battery2Energy === 0 ||
						(config.battery2.invert_flow === true
							? battery2Power <= 0
							: battery2Power >= 0) ||
						isFloating2
						? 'transparent'
						: battery2Colour,
					`${localize('common.to')} ${data.battery2Capacity}% ${localize('common.charge')} @${data.formattedResultTime2}`,
				)}
				${renderText(
					'floating',
					132,
					368,
					true,
					'st3 left-align',
					data.battery2Energy === 0 || !isFloating2
						? 'transparent'
						: battery2Colour,
					localize('common.battery_floating'),
				)}
				${renderText(
					'battery_soc_184',
					202,
					327,
					!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid,
					`${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}`,
					battery2Colour,
					`${batteryShutdown2}%`,
				)}
				${renderText(
					'battery_soc_184',
					202,
					340,
					!data.inverterProg.show && config.battery2?.shutdown_soc_offgrid,
					`${config.battery2.hide_soc ? 'st12' : 'st14 left-align'}`,
					battery2Colour,
					`${data.shutdownOffGrid2}%`,
				)}
				<svg
					id="Battery2_SOC"
					style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 ===
						'none' || !data.stateBattery2Soc.isValid()
						? 'none'
						: 'inline'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						132,
						333,
						config.entities.battery2_soc_184 === 'none' ||
							!data.stateBattery2Soc.isValid(),
						'st13 st8 left-align',
						battery2Colour,
						!data.inverterProg.show && config.battery2.shutdown_soc_offgrid
							? config.battery2.hide_soc
								? data.stateBattery2Soc.toDisplay()
								: `${data.stateBattery2Soc.toNum(0)}% |`
							: config.battery2.hide_soc
								? data.stateBattery2Soc.toDisplay()
								: `${data.stateBattery2Soc.toNum(0)}%`,
						(e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
						true,
					)}
				</svg>
				<svg
					id="Battery2_SOC_Program_Capacity"
					style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 ===
						'none' ||
					!data.stateBattery2Soc.isValid() ||
					config.battery2.hide_soc ||
					!data.inverterProg.show
						? 'none'
						: 'inline'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						132,
						333,
						config.entities.battery2_soc_184 === 'none' ||
							!data.stateBattery2Soc.isValid(),
						'st13 st8 left-align',
						battery2Colour,
						`${data.stateBattery2Soc.toNum(0)}% | ${data.inverterProg.capacity || 0}%`,
						(e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
						true,
					)}
				</svg>
				<svg
					id="Battery2_SOC_Shutdown"
					style="overflow: visible; 
                        display: ${config.entities.battery2_soc_184 !==
						'none' &&
					data.stateBattery2Soc.isValid() &&
					!config.battery2.hide_soc &&
					!data.inverterProg.show &&
					config.battery2?.shutdown_soc &&
					!config.battery2?.shutdown_soc_offgrid
						? 'inline'
						: 'none'};"
				>
					${createTextWithPopup(
						'battery_soc_184',
						132,
						333,
						config.entities.battery2_soc_184 === 'none' ||
							!data.stateBattery2Soc.isValid(),
						'st13 st8 left-align',
						battery2Colour,
						`${data.stateBattery2Soc.toNum(0)}% | ${batteryShutdown2 || 0}%`,
						(e) => Utils.handlePopup(e, config.entities.battery2_soc_184),
						true,
					)}
				</svg>
				${renderText(
					'duration',
					132,
					352,
					true,
					`${largeFont !== true ? 'st14' : 'st4'} left-align`,
					data.battery2Energy === 0 || isFloating2 || battery2Power === 0
						? 'transparent'
						: battery2Colour,
					data.batteryDuration2,
				)}
				<circle
					id="bat2"
					cx="136"
					cy="377"
					r="3"
					display="${config.entities?.battery2_status === 'none' ||
					!config.entities?.battery2_status
						? 'none'
						: ''}"
					fill="${data.battery2StateColour}"
				/>
				<text x="144" y="378" class="st3 left-align" fill="${battery2Colour}">
					${data.battery2StateMsg}
				</text>
			</svg>
			<svg id="battery1_data" x="${batteryCount === 2 ? '16.25%' : '0%'}">
				<rect
					x="6"
					y="${batteryCount === 2 ? '320.75' : '300.75'}"
					width="${batteryCount === 2 ? 40 : 70}"
					height="${batteryCount === 2 ? 50 : 70}"
					rx="${batteryCount === 2 ? 4.5 : 10.5}"
					ry="${batteryCount === 2 ? 4.5 : 10.5}"
					fill="none"
					stroke="${batteryColour}"
					pointer-events="all"
				/>
				${createTextWithPopup(
					'battery_voltage_183',
					batteryCount === 2 ? 25 : 41,
					batteryCount === 2 ? 329.5 : 317,
					config.entities.battery_voltage_183 === 'none' ||
						!config.entities.battery_voltage_183,
					batteryCount === 2
						? 'st3 st8'
						: largeFont !== true
							? 'st14 st8'
							: 'st4 st8',
					batteryColour,
					`${data.batteryVoltage} ${UnitOfElectricPotential.VOLT}`,
					(e) => Utils.handlePopup(e, config.entities.battery_voltage_183),
					true,
				)}
				${createTextWithPopup(
					'battery_power_190',
					batteryCount === 2 ? 25 : 41,
					batteryCount === 2 ? 362 : 356,
					config.entities.battery_power_190 === 'none',
					batteryCount === 2
						? 'st3 st8'
						: largeFont !== true
							? 'st14 st8'
							: 'st4 st8',
					batteryColour,
					auto_scale
						? `${
								show_absolute
									? `${Math.abs(parseFloat(Utils.convertValue(batteryPower, decimalPlaces)))} ${Utils.convertValue(batteryPower, decimalPlaces).split(' ')[1]}`
									: Utils.convertValue(batteryPower, decimalPlaces) || '0'
							}`
						: `${
								show_absolute
									? `${Math.abs(batteryPower)} ${UnitOfPower.WATT}`
									: `${batteryPower || 0} ${UnitOfPower.WATT}`
							}`,
					(e) => Utils.handlePopup(e, config.entities.battery_power_190),
					true,
				)}
				${createTextWithPopup(
					'battery_current_191',
					batteryCount === 2 ? 25 : 41,
					batteryCount === 2 ? 345.75 : 336,
					config.entities.battery_current_191 === 'none' ||
						!data.stateBatteryCurrent.isValid(),
					batteryCount === 2
						? 'st3 st8'
						: largeFont !== true
							? 'st14 st8'
							: 'st4 st8',
					batteryColour,
					`${
						show_absolute
							? Math.abs(Utils.toNum(data.stateBatteryCurrent.state, 1))
							: Utils.toNum(data.stateBatteryCurrent.state, 1)
					} ${UnitOfElectricalCurrent.AMPERE}`,
					(e) => Utils.handlePopup(e, config.entities.battery_current_191),
					true,
				)}
			</svg>
			<svg
				id="battery2_data"
				style="overflow: visible; display: ${batteryCount === 2
					? 'inline'
					: 'none'};"
				x="36%"
			>
				<rect
					x="6"
					y="320.75"
					width="40"
					height="50"
					rx="4.5"
					ry="4.5"
					fill="none"
					stroke="${battery2Colour}"
					pointer-events="all"
				/>
				${createTextWithPopup(
					'battery2_voltage_183',
					25,
					329.5,
					config.entities.battery2_voltage_183 === 'none' ||
						!config.entities.battery2_voltage_183,
					'st3 st8',
					battery2Colour,
					`${data.battery2Voltage} ${UnitOfElectricPotential.VOLT}`,
					(e) => Utils.handlePopup(e, config.entities.battery2_voltage_183),
					true,
				)}
				${createTextWithPopup(
					'battery2_power_190',
					25,
					362,
					config.entities.battery2_power_190 === 'none',
					'st3 st8',
					battery2Colour,
					config.battery2.auto_scale
						? `${
								config.battery2.show_absolute
									? `${Math.abs(parseFloat(Utils.convertValue(battery2Power, decimalPlaces)))} ${Utils.convertValue(battery2Power, decimalPlaces).split(' ')[1]}`
									: Utils.convertValue(battery2Power, decimalPlaces) || '0'
							}`
						: `${
								config.battery2.show_absolute
									? `${Math.abs(battery2Power)} ${UnitOfPower.WATT}`
									: `${battery2Power || 0} ${UnitOfPower.WATT}`
							}`,
					(e) => Utils.handlePopup(e, config.entities.battery2_power_190),
					true,
				)}
				${createTextWithPopup(
					'battery2_current_191',
					25,
					345.75,
					config.entities.battery2_current_191 === 'none' ||
						!data.stateBattery2Current.isValid(),
					'st3 st8',
					battery2Colour,
					`${
						config.battery2.show_absolute
							? Math.abs(Utils.toNum(data.stateBattery2Current.state, 1))
							: Utils.toNum(data.stateBattery2Current.state, 1)
					} ${UnitOfElectricalCurrent.AMPERE}`,
					(e) => Utils.handlePopup(e, config.entities.battery2_current_191),
					true,
				)}
			</svg>
			<circle
				id="bat"
				cx="${batteryCount === 2
					? '-8'
					: !config.battery.show_remaining_energy
						? '73'
						: '8'}"
				cy="377"
				r="3"
				display="${config.entities?.battery_status === 'none' ||
				!config.entities?.battery_status
					? 'none'
					: ''}"
				fill="${data.batteryStateColour}"
			/>
			${renderText(
				'battery_state_msg',
				batteryCount === 2
					? 0
					: !config.battery.show_remaining_energy
						? 80
						: 15,
				378,
				true,
				'st3 left-align',
				batteryColour,
				data.batteryStateMsg,
			)}
			<svg
				id="battery_daily"
				x="${batteryCount === 2 ? '-2%' : '0%'}"
				y="${batteryCount === 2 ? '2%' : '0%'}"
			>
				${renderText(
					'daily_bat_charge',
					4.5,
					251,
					data.batteryShowDaily !== true,
					'st3 left-align',
					batteryColour,
					localize('common.daily_charge'),
					true,
				)}
				${renderText(
					'daily_bat_discharge',
					4.5,
					285,
					data.batteryShowDaily !== true,
					'st3 left-align',
					batteryColour,
					localize('common.daily_discharge'),
					true,
				)}
				${createTextWithPopup(
					'daily_bat_charge_value',
					4.5,
					237,
					data.batteryShowDaily !== true ||
						!data.stateDayBatteryCharge.isValid(),
					'st10 left-align',
					batteryColour,
					data.stateDayBatteryCharge.toPowerString(
						true,
						data.decimalPlacesEnergy,
					),
					(e) => Utils.handlePopup(e, config.entities.day_battery_charge_70),
					true,
				)}
				${createTextWithPopup(
					'daily_bat_discharge_value',
					4.5,
					271,
					data.batteryShowDaily !== true ||
						!data.stateDayBatteryDischarge.isValid(),
					'st10 left-align',
					batteryColour,
					data.stateDayBatteryDischarge.toPowerString(
						true,
						data.decimalPlacesEnergy,
					),
					(e) => Utils.handlePopup(e, config.entities.day_battery_discharge_71),
					true,
				)}
			</svg>
			<svg id="battery-flow">
				${renderPath(
					'bat-line',
					config.wide
						? batteryCount === 2
							? 'M 279 280 L 156 281'
							: 'M 279 280 L 96 280 Q 86 280 86 290 L 86 297'
						: 'M 155 280 L 96 280 Q 86 280 86 290 L 86 297',
					true,
					config.battery.dynamic_colour ? data.flowBatColour : batteryColour,
					data.batLineWidth,
				)}
				${renderCircle(
					'power-dot-discharge',
					Math.min(
						2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					data.batteryPowerTotal < 0 || data.batteryPowerTotal === 0
						? 'transparent'
						: batteryColour,
					data.durationCur['battery'],
					'1;0',
					'#bat-line',
					config.battery.invert_flow,
				)}
				${renderCircle(
					'power-dot-charge',
					Math.min(
						2 + data.batLineWidth + Math.max(data.minLineWidth - 2, 0),
						8,
					),
					data.batteryPowerTotal > 0 || data.batteryPowerTotal === 0
						? 'transparent'
						: config.battery.dynamic_colour
							? data.flowBatColour
							: batteryColour,
					data.durationCur['battery'],
					'0;1',
					'#bat-line',
					config.battery.invert_flow,
				)}
			</svg>
		</svg>
	`;
};
