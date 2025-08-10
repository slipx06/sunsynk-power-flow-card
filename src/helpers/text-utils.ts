import { svg } from "lit";

export const createTextWithPopup = (
	id: string,
	x: number | string,
	y: number | string,
	displayCondition: boolean,
	className: string,
	fill: string,
	text: string,
	onClick: (e: Event) => void,
	hideOnCondition: boolean = false, // Default behavior: hide when condition is false
) => {
	return svg`
        <a href="#" @click=${onClick}>
            <text id="${id}" x="${x}" y="${y}" 
                display="${hideOnCondition ? (displayCondition ? "none" : "") : displayCondition ? "" : "none"}" 
                class="${className}" 
                fill="${fill}">
                ${text}
            </text>
        </a>
    `;
};

export const renderText = (
	id: string,
	x: number | string,
	y: number | string,
	displayCondition: boolean,
	className: string,
	fill: string,
	text: string,
	hideOnCondition: boolean = false, // Default behavior: hide when condition is false
) => {
	return svg`
        <text id="${id}" x="${x}" y="${y}" 
            display="${hideOnCondition ? (displayCondition ? "none" : "") : displayCondition ? "" : "none"}"
            class="${className}" 
            fill="${fill}">
            ${text}
        </text>
    `;
};
