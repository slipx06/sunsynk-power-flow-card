import { LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

declare global {
    interface HTMLElementTagNameMap {
        'sunsynk-power-flow-card': LovelaceCard;
    }
}

export interface sunsynkPowerFlowCardConfig extends LovelaceCardConfig {
    battery: {
        energy: number;
        shutdown_soc: number;
        invert_power: boolean;
        colour: string;
        show_daily: boolean;
        animation_speed: number;
        max_power: number;
        full_capacity: number;
        empty_capacity: number;
    }
}

export interface inverterProg {
    entityID: string;
    show?: boolean;
    charge?: string;
    capacity: number;
}