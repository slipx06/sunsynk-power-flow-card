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
}

export namespace CustomEntity {
    export function toNum(entity: { state:any }, decimals?: number, invert?: boolean): number {
        return Utils.toNum(entity?.state, decimals, invert);
    }

    export function isValid(entity: { state:any }) {
        return entity?.state !== null && entity.state !== undefined;
    }

    export function notEmpty(entity: { state:any }) {
        return entity?.state !== ''
    }

    export function isNaN(entity: { state:any }) {
        return Number.isNaN(entity?.state)
    }

    export function toPower(entity: { state:any, attributes:any }, invert?: boolean): number {
        return (entity.attributes?.unit_of_measurement || '').toLowerCase() === 'kw'
            ? Utils.toNum(((entity?.state || '0') * 1000), 0, invert)
            : Utils.toNum((entity?.state || '0'), 0, invert)
    }
    // Function to convert HassEntity to CustomEntity
    export function convertToCustomEntity(entity: any): CustomEntity {
        return {
            ...entity,
            toNum: (decimals?: number, invert?: boolean) => CustomEntity.toNum(entity, decimals, invert),
            isValid: () => CustomEntity?.isValid(entity) || false,
            notEmpty: () => CustomEntity?.notEmpty(entity) || false,
            isNaN: () => CustomEntity?.isNaN(entity) || true,
            toPower: (invert?: boolean) => CustomEntity?.toPower(entity, invert) || 0
        }
    }
}
