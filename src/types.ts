import { LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

declare global {
    interface HTMLElementTagNameMap {
        'sunsynk-power-flow-card': LovelaceCard;
    }
}

export interface sunsynkPowerFlowCardConfig extends LovelaceCardConfig {
    battery: {
        show: boolean;
        energy: number;
        shutdown_soc: number;
        invert_power: string;
        colour: string;
        show_daily: string;
        animation_speed: number;
        max_power: number;
        full_capacity: number;
        empty_capacity: number;
    }
}

export interface inverterProg {
    entityID: string;
    show?: string;
    charge?: string;
    capacity: number;
}
