import { version } from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2]


/* Lux Status Codes
*
* Some codes may be missing, these are the ones we are aware of
* If you know any codes not in this list please let us know
*
* 0 = Standby
* 4 = Solar > Load - Surplus > Grid
* 7 = Charger Off (needs to be confirmed)
* 12 = Solar > Battery Charging
* 16 = Battery Discharging > LOAD - Surplus > Grid
* 20 = Solar + Battery Discharging > LOAD - Surplus > Grid
* 32 = Charging (needs to be confirmed)
* 40 = Solar + Grid > Battery Charging
* 64 = No AC Power (needs to be confirmed)
*/
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
        normal: { states: ['4', '12', '16', '20', '40'], color: 'green', message: 'Normal' },
        alarm: { states: ['7', '64'], color: 'orange', message: 'Alarm' },
        fault: { states: [], color: 'red', message: 'Fault' },
    }

};
