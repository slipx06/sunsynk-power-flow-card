// solar-elements.ts
import { html, svg } from 'lit';
import { localize } from '../../../localize/localize';
import { Utils } from '../../../helpers/utils';
import { DataDto, sunsynkPowerFlowCardConfig } from '../../../types';
import {
	UnitOfElectricalCurrent,
	UnitOfElectricPotential,
	UnitOfPower,
} from '../../../const';
import { icons } from '../../../helpers/icons';
import { renderPV } from '../../shared/pv/render-pv';
import { renderPVFlow } from '../../shared/pv/render-pv-flow';
import { createTextWithPopup, renderText } from '../../../helpers/text-utils';

export const renderSolarElements = (
	data: DataDto,
	config: sunsynkPowerFlowCardConfig,
) => {
	const {
		solarColour,
		decimalPlaces,
		totalPV,
		minLineWidth,
		solarShowDaily,
		largeFont,
		durationCur,
	} = data;

	const { auto_scale, efficiency, mppts, display_mode, invert_flow } =
		config.solar;

	return html`
		<!-- Solar Elements -->
		<svg
			id="Solar"
			style="overflow: visible; display: ${!config.show_solar
				? 'none'
				: 'inline'};"
			x="${config.wide ? '10%' : '0%'}"
		>
			${renderPV('pvtotal', '205', '116.5', data, config)}
			${renderPV('pv1', mppts === 1 ? '205' : '154', '54.5', data, config)}
			${renderPV('pv2', '254', '54.5', data, config)}
			${renderPV('pv3', '78', '54.5', data, config)}
			${renderPV('pv4', '330', '54.5', data, config)}
			<svg
				id="PV5"
				style="overflow: visible; display: ${config.show_solar &&
				config.wide &&
				[5, 6].includes(mppts)
					? 'inline'
					: 'none'};"
				x="-10.5%"
			>
				${renderPV('pv5', '78', '54.5', data, config)}
				${renderText(
					'pv5_name',
					105,
					94,
					true,
					'st3 st8 right-align',
					solarColour,
					config.solar.pv5_name || localize('common.pv5_name'),
				)}
				${renderText(
					'pv5_efficiency',
					105,
					106,
					[0, 1].includes(efficiency),
					[2, 3].includes(efficiency) ? 'st3 st8 right-align' : 'st12',
					solarColour,
					`${data.PV5Efficiency}%`,
					true,
				)}
				${renderPVFlow(
					'pv5',
					'M 113 84 L 113 125 Q 113 132 120 132 L 280 132',
					solarColour,
					data.pv5LineWidth,
					data.pv5PowerWatts,
					durationCur['pv5'],
					invert_flow,
					minLineWidth,
				)}
				${createTextWithPopup(
					'pv5_voltage',
					120,
					106,
					!config.entities.pv5_voltage ||
						config.entities.pv5_voltage === 'none' ||
						!data.statePV5Voltage.isValid(),
					'st3 left-align',
					solarColour,
					`${data.statePV5Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
					(e) => Utils.handlePopup(e, config.entities.pv5_voltage),
					true,
				)}
				${createTextWithPopup(
					'pv5_current',
					120,
					94,
					!config.entities.pv5_current ||
						config.entities.pv5_current === 'none' ||
						!data.statePV5Current.isValid(),
					'st3 left-align',
					solarColour,
					`${data.statePV5Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
					(e) => Utils.handlePopup(e, config.entities.pv5_current),
					true,
				)}
				${createTextWithPopup(
					'pv5_power',
					113,
					71,
					!data.statePV5Power.isValid(),
					`${largeFont !== true ? 'st14' : 'st4'} st8`,
					solarColour,
					auto_scale
						? `${Utils.convertValue(data.pv5PowerWatts, decimalPlaces) || 0}`
						: `${Utils.toNum(data.pv5PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
					(e) => Utils.handlePopup(e, config.entities.pv5_power),
					true,
				)}
			</svg>
			<svg
				id="PV6"
				style="overflow: visible; display: ${config.show_solar &&
				config.wide &&
				mppts === 6
					? 'inline'
					: 'none'};"
				x="10.5%"
			>
				${renderPV('pv6', '330', '54.5', data, config)}
				${renderText(
					'pv6_name',
					357,
					94,
					true,
					'st3 st8 right-align',
					solarColour,
					config.solar.pv6_name || localize('common.pv6_name'),
				)}
				${renderText(
					'pv6_efficiency',
					357,
					106,
					[0, 1].includes(efficiency),
					[2, 3].includes(efficiency) ? 'st3 st8 right-align' : 'st12',
					solarColour,
					`${data.PV6Efficiency}%`,
					true,
				)}
				${renderPVFlow(
					'pv6',
					'M 365 85 L 365 125 Q 365 132 358 132 L 200 132',
					solarColour,
					data.pv6LineWidth,
					data.pv6PowerWatts,
					durationCur['pv6'],
					invert_flow,
					minLineWidth,
				)}
				${createTextWithPopup(
					'pv6_voltage',
					372,
					106,
					!config.entities.pv6_voltage ||
						config.entities.pv6_voltage === 'none' ||
						!data.statePV6Voltage.isValid(),
					'st3 left-align',
					solarColour,
					`${data.statePV6Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
					(e) => Utils.handlePopup(e, config.entities.pv6_voltage),
					true,
				)}
				${createTextWithPopup(
					'pv6_current',
					372,
					94,
					!config.entities.pv6_current ||
						config.entities.pv6_current === 'none' ||
						!data.statePV6Current.isValid(),
					'st3 left-align',
					solarColour,
					`${data.statePV6Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
					(e) => Utils.handlePopup(e, config.entities.pv6_current),
					true,
				)}
				${createTextWithPopup(
					'pv6_power',
					366,
					71,
					!data.statePV6Power.isValid(),
					`${largeFont !== true ? 'st14' : 'st4'} st8`,
					solarColour,
					auto_scale
						? `${Utils.convertValue(data.pv6PowerWatts, decimalPlaces) || 0}`
						: `${Utils.toNum(data.pv6PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
					(e) => Utils.handlePopup(e, config.entities.pv6_power),
					true,
				)}
			</svg>
			${renderText(
				'daily_solar',
				200,
				40,
				display_mode === 1,
				'st3 left-align',
				!solarShowDaily || !config.show_solar ? 'transparent' : solarColour,
				config.solar.custom_label || localize('common.daily_solar'),
			)}
			${renderText(
				'remaining_solar',
				200,
				40,
				display_mode === 2,
				'st3 left-align',
				!solarShowDaily || !config.show_solar ? 'transparent' : solarColour,
				config.solar.custom_label || localize('common.daily_solar_left'),
			)}
			${renderText(
				'total_solar_generation',
				200,
				40,
				display_mode === 3,
				'st3 left-align',
				!solarShowDaily || !config.show_solar ? 'transparent' : solarColour,
				config.solar.custom_label || localize('common.total_solar_generation'),
				false,
			)}
			${renderText(
				'tomorrow_solar',
				200,
				40,
				display_mode === 4,
				'st3 left-align',
				!solarShowDaily ? 'transparent' : solarColour,
				config.solar.custom_label ||
					localize('common.daily_solar_left_tomorrow'),
				false,
			)}
			${renderText(
				'pv1_name',
				mppts === 1 ? '230' : '179',
				94,
				true,
				'st3 st8 right-align',
				solarColour,
				config.solar.pv1_name || localize('common.pv1_name'),
			)}
			${renderText(
				'pv1_efficiency',
				mppts === 1 ? '230' : '179',
				106,
				[0, 1].includes(efficiency),
				[2, 3].includes(efficiency) ? 'st3 st8 right-align' : 'st12',
				solarColour,
				`${data.PV1Efficiency}%`,
				true,
			)}
			${renderText(
				'pv2_name',
				281,
				94,
				mppts === 1,
				'st3 st8 right-align',
				solarColour,
				config.solar.pv2_name || localize('common.pv2_name'),
				true,
			)}
			${renderText(
				'pv2_efficiency',
				281,
				106,
				mppts === 1 || [0, 1].includes(efficiency),
				[2, 3].includes(efficiency) ? 'st3 st8 right-align' : 'st12',
				solarColour,
				`${data.PV2Efficiency}%`,
				true,
			)}
			${renderText(
				'pv3_name',
				105,
				94,
				[1, 2].includes(mppts),
				'st3 st8 right-align',
				solarColour,
				config.solar.pv3_name || localize('common.pv3_name'),
				true,
			)}
			${renderText(
				'pv3_efficiency',
				105,
				106,
				[1, 2].includes(mppts) || [0, 1].includes(efficiency),
				[2, 3].includes(efficiency) ? 'st3 st8 right-align' : 'st12',
				solarColour,
				`${data.PV3Efficiency}%`,
				true,
			)}
			${renderText(
				'pv4_name',
				357,
				94,
				[1, 2, 3].includes(mppts),
				'st3 st8 right-align',
				solarColour,
				config.solar.pv4_name || localize('common.pv4_name'),
				true,
			)}
			${renderText(
				'pv4_efficiency',
				357,
				106,
				[1, 2, 3].includes(mppts) || [0, 1].includes(efficiency),
				[2, 3].includes(efficiency) ? 'st3 st8 right-align' : 'st12',
				solarColour,
				`${data.PV4Efficiency}%`,
				true,
			)}
			${renderText(
				'total_pv_efficiency',
				215,
				156,
				mppts === 1,
				[2, 3].includes(efficiency) ? 'st3 st8' : 'st12',
				solarColour,
				`${data.totalPVEfficiency}%`,
				true,
			)}
			${renderPVFlow(
				'pv1',
				mppts === 1
					? 'M 239.23 84 L 239 190'
					: 'M 187 84 L 187 122 Q 187 132 195 132 L 205 132.03',
				solarColour,
				data.pv1LineWidth,
				data.pv1PowerWatts,
				durationCur['pv1'],
				invert_flow,
				minLineWidth,
			)}
			${renderPVFlow(
				'pv2',
				'M 289 84.5 L 289 125 Q 289 132 282 132 L 275 132',
				solarColour,
				data.pv2LineWidth,
				data.pv2PowerWatts,
				durationCur['pv2'],
				invert_flow,
				minLineWidth,
				mppts === 1 ? 'st12' : '',
			)}
			${renderPVFlow(
				'pv3',
				'M 113 84 L 113 125 Q 113 132 120 132 L 205 132.03',
				solarColour,
				data.pv3LineWidth,
				data.pv3PowerWatts,
				durationCur['pv3'],
				invert_flow,
				minLineWidth,
				[1, 2].includes(mppts) ? 'st12' : '',
			)}
			${renderPVFlow(
				'pv4',
				'M 365 85 L 365 125 Q 365 132 358 132 L 275 132',
				solarColour,
				data.pv4LineWidth,
				data.pv4PowerWatts,
				durationCur['pv4'],
				invert_flow,
				minLineWidth,
				[1, 2, 3].includes(mppts) ? 'st12' : '',
			)}
			${renderPVFlow(
				'solar',
				'M 239 190 L 239 147',
				solarColour,
				data.solarLineWidth,
				totalPV,
				durationCur['solar'],
				invert_flow,
				minLineWidth,
				mppts === 1 ? 'st12' : '',
				'1;0',
			)}
			${config.solar?.navigate
				? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.solar.navigate)}>
                        <svg id="sun" x="154" y="10" width="40" height="40"
                            viewBox="0 0 24 24">
                            <path fill="${solarColour}"
                                d="${icons.sun}"/>
                        </svg>
                    </a>`
				: svg`
                    <svg id="sun" x="154" y="10" width="40" height="40"
                        viewBox="0 0 24 24">
                        <path fill="${solarColour}"
                            d="${icons.sun}"/>
                    </svg>`}
			<a
				href="#"
				@click=${(e) => Utils.handlePopup(e, config.entities.solar_sell_247)}
			>
				<svg
					id="solar_sell_on"
					x="245"
					y="150"
					width="18"
					height="18"
					viewBox="0 0 30 30"
				>
					<path
						display="${!config.entities.solar_sell_247 ||
						data.stateSolarSell.state === 'off' ||
						data.stateSolarSell.state === '0' ||
						!config.show_solar ||
						!['1', 'on'].includes(data.stateSolarSell.state)
							? 'none'
							: ''}"
						fill="${solarColour}"
						d="${icons.solarSellOn}"
					/>
				</svg>
				<svg
					id="solar_sell_off"
					x="245"
					y="150"
					width="18"
					height="18"
					viewBox="0 0 30 30"
				>
					<path
						display="${!config.entities.solar_sell_247 ||
						data.stateSolarSell.state === 'on' ||
						data.stateSolarSell.state === '1' ||
						!config.show_solar ||
						!['0', 'off'].includes(data.stateSolarSell.state)
							? 'none'
							: ''}"
						fill="${solarColour}"
						d="${icons.solarSellOff}"
					/>
				</svg>
			</a>
			${createTextWithPopup(
				'daily_solar_value',
				200,
				26,
				display_mode === 1 && data.stateDayPVEnergy.isValid(),
				'st10 left-align',
				!solarShowDaily ? 'transparent' : solarColour,
				data.stateDayPVEnergy?.toPowerString(true, data.decimalPlacesEnergy),
				(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
			)}
			${createTextWithPopup(
				'remaining_solar_value',
				200,
				26,
				display_mode === 2 && data.stateDayPVEnergy.isValid(),
				'st10 left-align',
				!solarShowDaily ? 'transparent' : solarColour,
				`${data.stateDayPVEnergy?.toPowerString(true, data.decimalPlacesEnergy)} / ${data.remainingSolar}`,
				(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
			)}
			${createTextWithPopup(
				'total_solar_value',
				200,
				26,
				display_mode === 3 && data.stateDayPVEnergy.isValid(),
				'st10 left-align',
				!solarShowDaily ? 'transparent' : solarColour,
				`${data.stateDayPVEnergy?.toPowerString(true, data.decimalPlacesEnergy)} / ${data.totalSolarGeneration}`,
				(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
			)}
			${createTextWithPopup(
				'tomorrow_solar_value',
				200,
				26,
				display_mode === 4 && data.stateDayPVEnergy.isValid(),
				'st10 left-align',
				!solarShowDaily ? 'transparent' : solarColour,
				`${data.stateDayPVEnergy.toPowerString(true, data.decimalPlacesEnergy)} / ${data.remainingSolar} / ${data.tomorrowSolar}`,
				(e) => Utils.handlePopup(e, config.entities.day_pv_energy_108),
			)}
			${createTextWithPopup(
				'pv1_voltage',
				mppts === 1 ? '244.7' : '194',
				106,
				!config.entities.pv1_voltage_109 ||
					config.entities.pv1_voltage_109 === 'none' ||
					!data.statePV1Voltage.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV1Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
				(e) => Utils.handlePopup(e, config.entities.pv1_voltage_109),
				true,
			)}
			${createTextWithPopup(
				'pv1_current',
				mppts === 1 ? '244.7' : '194',
				94,
				!config.entities.pv1_current_110 ||
					config.entities.pv1_current_110 === 'none' ||
					!data.statePV1Current.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV1Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.pv1_current_110),
				true,
			)}
			${createTextWithPopup(
				'pv2_voltage',
				296,
				106,
				!config.entities.pv2_voltage_111 ||
					config.entities.pv2_voltage_111 === 'none' ||
					mppts === 1 ||
					!data.statePV2Voltage.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV2Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
				(e) => Utils.handlePopup(e, config.entities.pv2_voltage_111),
				true,
			)}
			${createTextWithPopup(
				'pv2_current',
				296,
				94,
				!config.entities.pv2_current_112 ||
					config.entities.pv2_current_112 === 'none' ||
					mppts === 1 ||
					!data.statePV2Current.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV2Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.pv2_current_112),
				true,
			)}
			${createTextWithPopup(
				'pv3_voltage',
				120,
				106,
				!config.entities.pv3_voltage_113 ||
					config.entities.pv3_voltage_113 === 'none' ||
					[1, 2].includes(mppts) ||
					!data.statePV3Voltage.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV3Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
				(e) => Utils.handlePopup(e, config.entities.pv3_voltage_113),
				true,
			)}
			${createTextWithPopup(
				'pv3_current',
				120,
				94,
				!config.entities.pv3_current_114 ||
					config.entities.pv3_current_114 === 'none' ||
					[1, 2].includes(mppts) ||
					!data.statePV3Current.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV3Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.pv3_current_114),
				true,
			)}
			${createTextWithPopup(
				'pv4_voltage',
				372,
				106,
				!config.entities.pv4_voltage_115 ||
					config.entities.pv4_voltage_115 === 'none' ||
					[1, 2, 3].includes(mppts) ||
					!data.statePV4Voltage.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV4Voltage.toNum(1)} ${UnitOfElectricPotential.VOLT}`,
				(e) => Utils.handlePopup(e, config.entities.pv4_voltage_115),
				true,
			)}
			${createTextWithPopup(
				'pv4_current',
				372,
				94,
				!config.entities.pv4_current_116 ||
					config.entities.pv4_current_116 === 'none' ||
					[1, 2, 3].includes(mppts) ||
					!data.statePV4Current.isValid(),
				'st3 left-align',
				solarColour,
				`${data.statePV4Current.toNum(1)} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.pv4_current_116),
				true,
			)}
			${createTextWithPopup(
				'environ_temp',
				154,
				45,
				!data.stateEnvironmentTemp.isValid(),
				config.entities?.environment_temp ? 'st3 left-align' : 'st12',
				solarColour,
				`${data.stateEnvironmentTemp.toNum(1)}°`,
				(e) => Utils.handlePopup(e, config.entities.environment_temp),
				true,
			)}
			${config.entities?.pv_total
				? svg`
                    ${createTextWithPopup(
											'pvtotal_power',
											238.8,
											133.9,
											mppts === 1 || !data.statePVTotal.isValid(),
											`${largeFont !== true ? 'st14' : 'st4'} st8`,
											solarColour,
											auto_scale
												? config.entities?.pv_total
													? `${Utils.convertValueNew(totalPV, data.statePVTotal.getUOM(), decimalPlaces)}`
													: `${Utils.convertValue(totalPV, decimalPlaces) || 0}`
												: `${Utils.toNum(totalPV || 0, 0)} ${UnitOfPower.WATT}`,
											(e) => Utils.handlePopup(e, config.entities.pv_total),
											true,
										)}`
				: svg`
                    ${renderText(
											'pvtotal_power',
											238.8,
											133.9,
											mppts === 1 || !data.statePVTotal.isValid(),
											`${largeFont !== true ? 'st14' : 'st4'} st8`,
											solarColour,
											auto_scale
												? config.entities?.pv_total
													? `${Utils.convertValueNew(totalPV, data.statePVTotal.getUOM(), decimalPlaces)}`
													: `${Utils.convertValue(totalPV, decimalPlaces) || 0}`
												: `${Utils.toNum(totalPV || 0, 0)} ${UnitOfPower.WATT}`,
											true,
										)}`}
			${createTextWithPopup(
				'pv1_power_186',
				mppts === 1 ? '238.8' : '188.1',
				71,
				!data.statePV1Power.isValid(),
				`${largeFont !== true ? 'st14' : 'st4'} st8`,
				solarColour,
				auto_scale
					? `${Utils.convertValue(data.pv1PowerWatts, decimalPlaces) || 0}`
					: `${Utils.toNum(data.pv1PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.pv1_power_186),
				true,
			)}
			${createTextWithPopup(
				'pv2_power_187',
				289.5,
				71,
				mppts === 1 || !data.statePV2Power.isValid(),
				`${largeFont !== true ? 'st14' : 'st4'} st8`,
				solarColour,
				auto_scale
					? `${Utils.convertValue(data.pv2PowerWatts, decimalPlaces) || 0}`
					: `${Utils.toNum(data.pv2PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.pv2_power_187),
				true,
			)}
			${createTextWithPopup(
				'pv3_power_188',
				113,
				71,
				[1, 2].includes(mppts) || !data.statePV3Power.isValid(),
				`${largeFont !== true ? 'st14' : 'st4'} st8`,
				solarColour,
				auto_scale
					? `${Utils.convertValue(data.pv3PowerWatts, decimalPlaces) || 0}`
					: `${Utils.toNum(data.pv3PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.pv3_power_188),
				true,
			)}
			${createTextWithPopup(
				'pv4_power_189',
				366,
				71,
				[1, 2, 3].includes(mppts) || !data.statePV4Power.isValid(),
				`${largeFont !== true ? 'st14' : 'st4'} st8`,
				solarColour,
				auto_scale
					? `${Utils.convertValue(data.pv4PowerWatts, decimalPlaces) || 0}`
					: `${Utils.toNum(data.pv4PowerWatts || 0, 0)} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.pv4_power_189),
				true,
			)}
		</svg>
	`;
};
