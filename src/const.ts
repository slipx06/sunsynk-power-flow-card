import { version } from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2]

export const inverterStatusGroups = {
    sunsynk: {
        standby: { states: ['0', 'standby'], color: 'blue', message: 'Standby' },
        selftest: { states: ['1', 'selftest'], color: 'yellow', message: 'Selftest' },
        normal: { states: ['2', 'normal', 'ok'], color: 'green', message: 'Normal' },
        alarm: { states: ['3', 'alarm'], color: 'orange', message: 'Alarm' },
        fault: { states: ['4', 'fault'], color: 'red', message: 'Fault' },
    },
    lux: {
        standby: { states: ['0'], color: 'blue', message: 'Standby' },
        selftest: { states: [], color: 'yellow', message: 'Selftest' },
        normal: { states: ['12', '20', '16', '4', '40'], color: 'green', message: 'Normal' },
        alarm: { states: ['64', '7'], color: 'orange', message: 'Alarm' },
        fault: { states: [], color: 'red', message: 'Fault' },
    }

};
