import {HassEntity} from 'home-assistant-js-websocket/dist/types';
import {Utils} from '../../helpers/utils';

/**
 * CustomEntity interface represents a custom entity in Home Assistant.
 * - this entity aids in reducing common boiler plate code. the end goal is that we can just use the state object instead of multiple vars
 */
export interface CustomEntity extends HassEntity {
    state: any,

    /**
     * Extension of Utils.toNum, returns the state in a number
     * @param decimals
     * @param invert
     */
    toNum(decimals?: number, invert?: boolean): number;

    /**
     * Checks that the state is not null or undefined
     */
    isValid(): boolean;

    /**
     * Checks that the state is not equal to ''
     */
    notEmpty(): boolean;

    isNaN(): boolean;

    /**
     * Auto converts the state to watts/kilowatts
     * @param invert
     */
    toPower(invert?: boolean): number;

    /**
     * returns the state, and default to 0
     */
    stateDefaultZero(): number;
}

export namespace CustomEntity {
    export function stateDefaultZero(entity: CustomEntity): any {
        return entity.state || '0'
    }
    export function toNum(entity: CustomEntity, decimals?: number, invert?: boolean): number {
        return Utils.toNum(entity.state, decimals, invert);
    }

    export function isValid(entity: CustomEntity) {
        return entity.state !== null && entity.state !== undefined;
    }

    export function notEmpty(entity: CustomEntity) {
        return entity.state !== ''
    }

    export function isNaN(entity: CustomEntity) {
        return Number.isNaN(entity.state)
    }

    export function toPower(entity: CustomEntity, invert?: boolean): number {
        return (entity.attributes?.unit_of_measurement || '').toLowerCase() === 'kw'
            ? Utils.toNum((entity.stateDefaultZero() * 1000), 0, invert)
            : entity.toNum(0, invert)
    }
}
