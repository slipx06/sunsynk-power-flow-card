import { version } from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2]


/* Lux Status Codes
*
* Some codes may be missing, these are the ones we are aware of
* If you know any codes not in this list please let us know
*
* 0 = Standby
* 1 = Error
* 2 = Inverting
* 4 = Solar > Load - Surplus > Grid
* 5 = Float
* 7 = Charger Off
* 8 = Supporting
* 9 = Selling
* 10 = Pass through
* 11 = Offsetting
* 12 = Solar > Battery Charging
* 16 = Battery Discharging > LOAD - Surplus > Grid
* 17 = Temperature over range
* 20 = Solar + Battery Discharging > LOAD - Surplus > Grid
* 32 = AC Battery Charging
* 40 = Solar + Grid > Battery Charging
* 64 = No Grid : Battery > EPS
* 136 = No Grid : Solar > EPS - Surplus > Battery Charging
* 192 = No Grid : Solar + Battery Discharging > EPS
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
        normal: { states: ['2','4','5','7', '8', '9', '10', '11', '12', '16', '20', '32', '40'], color: 'green', message: 'Normal' },
        alarm: { states: ['7', '17','64', '136', '192'], color: 'orange', message: 'Alarm' },
        fault: { states: ['1'], color: 'red', message: 'Fault' },
    }

};
