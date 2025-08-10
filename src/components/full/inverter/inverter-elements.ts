// inverter-elements.ts
import { svg, html } from "lit";
import { localize } from "../../../localize/localize";
import { Utils } from "../../../helpers/utils";
import {
	AutarkyType,
	DataDto,
	sunsynkPowerFlowCardConfig,
} from "../../../types";
import { icons } from "../../../helpers/icons";
import { UnitOfElectricalCurrent, UnitOfPower } from "../../../const";
import { createTextWithPopup, renderText } from "../../../helpers/text-utils";
import { renderPath } from "../../../helpers/render-path";

export const renderInverterElements = (
	data: DataDto,
	inverterImg: string,
	config: sunsynkPowerFlowCardConfig,
) => {
	const {
		inverterColour,
		largeFont,
		enableAutarky,
		enableTimer,
		priorityLoad,
	} = data;

	const { auto_scale, three_phase } = config.inverter;

	return html`
		<!-- Inverter Elements -->
		<svg
			id="Inverter"
			style="overflow: visible"
			x="${config.wide ? "20%" : "3%"}"
			y="2.5%"
		>
			<rect
				x="145.15"
				y="162"
				width="70"
				height="${three_phase ? 60 : 50}"
				rx="7.5"
				ry="7.5"
				fill="none"
				stroke="${inverterColour}"
				pointer-events="all"
			/>
			<text x="167" y="306" class="st3 left-align" fill="${inverterColour}">
				${data.inverterStateMsg}
			</text>
			${renderText(
				"autarkye_value",
				212,
				283,
				enableAutarky === AutarkyType.No,
				enableAutarky === AutarkyType.Energy ? "st4 st8 left-align" : "st12",
				inverterColour,
				`${data.autarkyEnergy}%`,
				true,
			)}
			${renderText(
				"ratioe_value",
				256,
				283,
				enableAutarky === AutarkyType.No,
				enableAutarky === AutarkyType.Energy ? "st4 st8 left-align" : "st12",
				inverterColour,
				`${data.ratioEnergy}%`,
				true,
			)}
			${renderText(
				"autarkyp_value",
				212,
				283,
				enableAutarky === AutarkyType.No,
				enableAutarky === AutarkyType.Power ? "st4 st8 left-align" : "st12",
				inverterColour,
				`${data.autarkyPower}%`,
				true,
			)}
			${renderText(
				"ratiop_value",
				256,
				283,
				enableAutarky === AutarkyType.No,
				enableAutarky === AutarkyType.Power ? "st4 st8 left-align" : "st12",
				inverterColour,
				`${data.ratioPower}%`,
				true,
			)}
			${renderText(
				"autarky",
				212,
				295,
				enableAutarky === AutarkyType.No,
				"st3 left-align",
				inverterColour,
				localize("common.autarky"),
				true,
			)}
			${renderText(
				"ratio",
				256,
				295,
				enableAutarky === AutarkyType.No,
				"st3 left-align",
				inverterColour,
				localize("common.ratio"),
				true,
			)}
			<circle
				id="standby"
				cx="160"
				cy="304"
				r="3.5"
				fill="${data.inverterStateColour}"
			/>
			${renderPath(
				"inverter-path",
				three_phase ? "M 180 223 L 180 235" : "M 180 212 L 180 235",
				true,
				config.battery.dynamic_colour && config.load.dynamic_colour
					? data.flowInvColour
					: inverterColour,
				data.minLineWidth,
			)}
			${config.inverter?.navigate
				? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54"
                            height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                            opacity="${!data.genericInverterImage ? 0 : 1}">
                            <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                            fill="${inverterColour}" stroke="none">
                                <path d="${icons.inverter}"/>
                            </g>
                        </svg>
                    </a>`
				: svg`
                    <svg xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54"
                        height="79" viewBox="0 0 74 91" preserveAspectRatio="xMidYMid meet"
                        opacity="${!data.genericInverterImage ? 0 : 1}">
                        <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)"
                        fill="${inverterColour}" stroke="none">
                            <path d="${icons.inverter}"/>
                        </g>
                    </svg>`}
			<a
				href="#"
				@click=${(e) => Utils.handlePopup(e, config.entities.use_timer_248)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="timer"
					x="210"
					y="${enableAutarky != AutarkyType.No ? "232" : "249"}"
					width="18"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						display="${data.stateUseTimer.state == "on" && enableTimer !== "no"
							? ""
							: "none"}"
						fill="${inverterColour}"
						d="${icons.timerOn}"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="timer_off"
					x="210"
					y="${enableAutarky != AutarkyType.No ? "232" : "249"}"
					width="18"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						display="${data.stateUseTimer.state == "off" && enableTimer !== "no"
							? ""
							: "none"}"
						fill="${inverterColour}"
						d="${icons.timerOff}"
					/>
				</svg>
				${renderText(
					"timer_text_on",
					228.5,
					enableAutarky != AutarkyType.No ? 243 : 260,
					data.stateUseTimer.state == "on" && enableTimer !== "no",
					"st3 left-align",
					inverterColour,
					localize("common.timer_on"),
				)}
				${renderText(
					"timer_text_off",
					228.5,
					enableAutarky != AutarkyType.No ? 243 : 260,
					data.stateUseTimer.state == "off" && enableTimer !== "no",
					"st3 left-align",
					inverterColour,
					localize("common.timer_off"),
				)}
			</a>
			<a
				href="#"
				@click=${(e) => Utils.handlePopup(e, config.entities.priority_load_243)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="pbat"
					x="210"
					y="${enableAutarky != "no" ? "251" : "268"}"
					width="18"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						display="${priorityLoad === "off" &&
						(priorityLoad !== "no" || !priorityLoad)
							? ""
							: "none"}"
						fill="${inverterColour}"
						d="${icons.priorityLoadOff}"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="pload"
					x="210"
					y="${enableAutarky != "no" ? "251" : "268"}"
					width="18"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						display="${priorityLoad === "on" &&
						(priorityLoad !== "no" || !priorityLoad)
							? ""
							: "none"}"
						fill="${inverterColour}"
						d="${icons.priorityLoadOn}"
					/>
				</svg>
				${renderText(
					"priority_text_load",
					228.5,
					enableAutarky != AutarkyType.No ? 262 : 280,
					priorityLoad === "on" && (priorityLoad !== "no" || !priorityLoad),
					"st3 left-align",
					inverterColour,
					localize("common.priority_load"),
				)}
				${renderText(
					"priority_text_batt",
					228.5,
					enableAutarky != AutarkyType.No ? 262 : 280,
					priorityLoad === "off" && (priorityLoad !== "no" || !priorityLoad),
					"st3 left-align",
					inverterColour,
					localize("common.priority_batt"),
				)}
			</a>
			${config.inverter?.navigate
				? svg`
                    <a href="#" @click=${(e) => Utils.handleNavigation(e, config.inverter.navigate)}>
                        <image x="155" y="224.75" width="53" height="72"
                            class="${!data.genericInverterImage ? "" : "st12"}"
                            href="${inverterImg}"
                            preserveAspectRatio="none"/>
                    </a>`
				: svg`
                    <image x="155" y="224.75" width="53" height="72"
                        class="${!data.genericInverterImage ? "" : "st12"}"
                        href="${inverterImg}"
                        preserveAspectRatio="none"/>`}
			<a
				href="#"
				@click=${(e) => Utils.handlePopup(e, data.inverterProg.entityID)}
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="prog_grid_on"
					x="265"
					y="${enableAutarky != AutarkyType.No ? "232" : "249"}"
					width="20"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						display="${data.inverterProg.show === false || enableTimer === "no"
							? "none"
							: ""}"
						class="${data.inverterProg.charge === "none" ||
						(data.stateUseTimer.state != "off" &&
							data.stateUseTimer.state != "on")
							? "st12"
							: ""}"
						fill="${inverterColour}"
						d="${icons.progGridOn}"
					/>
				</svg>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					id="prog_grid_off"
					x="265"
					y="${enableAutarky != AutarkyType.No ? "232" : "249"}"
					width="20"
					height="18"
					viewBox="0 0 24 24"
				>
					<path
						display="${data.inverterProg.show === false || enableTimer === "no"
							? "none"
							: ""}"
						class="${data.inverterProg.charge === "none" &&
						(data.stateUseTimer.state === "off" ||
							data.stateUseTimer.state === "on")
							? ""
							: "st12"}"
						fill="${inverterColour}"
						d="${icons.progGridOff}"
					/>
				</svg>
			</a>
			${createTextWithPopup(
				"inverter_current_164",
				180.5,
				three_phase ? 188 : 199,
				config.entities.inverter_current_164 === "none" ||
					!config.entities.inverter_current_164,
				`${largeFont !== true ? "st14" : "st4"} st8`,
				inverterColour,
				`${data.inverterCurrent} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.inverter_current_164),
				true,
			)}
			${createTextWithPopup(
				"inverter_current_L2",
				180.5,
				201,
				!!(three_phase && config.entities?.inverter_current_L2),
				`${largeFont !== true ? "st14" : "st4"} st8`,
				inverterColour,
				`${data.inverterCurrentL2} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.inverter_current_L2),
			)}
			${createTextWithPopup(
				"inverter_current_L3",
				180.5,
				214,
				!!(three_phase && config.entities?.inverter_current_L3),
				`${largeFont !== true ? "st14" : "st4"} st8`,
				inverterColour,
				`${data.inverterCurrentL3} ${UnitOfElectricalCurrent.AMPERE}`,
				(e) => Utils.handlePopup(e, config.entities.inverter_current_L3),
			)}
			${createTextWithPopup(
				"inverter_power_175",
				180.5,
				three_phase ? 174 : 178,
				config.entities.inverter_power_175 === "none",
				`${largeFont !== true ? "st14" : "st4"} st8`,
				inverterColour,
				auto_scale
					? `${Utils.convertValue(data.autoScaledInverterPower, data.decimalPlaces) || 0}`
					: `${data.autoScaledInverterPower} ${UnitOfPower.WATT}`,
				(e) => Utils.handlePopup(e, config.entities.inverter_power_175),
				true,
			)}
			${createTextWithPopup(
				"ac_temp",
				[4, 5, 6].includes(config.solar?.mppts) && !config.wide ? 110 : 134,
				[4, 5, 6].includes(config.solar?.mppts) && !config.wide ? 237 : 153,
				!!(
					config.entities?.radiator_temp_91 && data.stateRadiatorTemp.isValid()
				),
				"st3 left-align",
				inverterColour,
				`AC: ${data.stateRadiatorTemp.toNum(1)}°`,
				(e) => Utils.handlePopup(e, config.entities.radiator_temp_91),
			)}
			${createTextWithPopup(
				"dc_temp",
				110,
				266,
				!!(
					config.entities?.dc_transformer_temp_90 &&
					data.stateDCTransformerTemp.isValid()
				),
				"st3 left-align",
				inverterColour,
				`DC: ${data.stateDCTransformerTemp.toNum(1)}°`,
				(e) => Utils.handlePopup(e, config.entities.dc_transformer_temp_90),
			)}
		</svg>
	`;
};
