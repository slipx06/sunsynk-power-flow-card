import { version } from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2, 4]
export const valid3phase = [true, false]

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
        standby: { states: ['0', 'standby', 'Stand-by'], color: 'blue', message: 'Standby' },
        selftest: { states: ['1', 'selftest', 'Self-checking'], color: 'yellow', message: 'Selftest' },
        normal: { states: ['2', 'normal', 'ok', 'Normal'], color: 'green', message: 'Normal' },
        alarm: { states: ['3', 'alarm'], color: 'orange', message: 'Alarm' },
        fault: { states: ['4', 'fault', 'FAULT'], color: 'red', message: 'Fault' },
    },
    lux: {
        standby: { states: ['0'], color: 'blue', message: 'Standby' },
        selftest: { states: [], color: 'yellow', message: 'Selftest' },
        normal: { states: ['2','4','5','7', '8', '9', '10', '11', '12', '16', '20', '32', '40'], color: 'green', message: 'Normal' },
        alarm: { states: ['7', '17','64', '136', '192'], color: 'orange', message: 'Alarm' },
        fault: { states: ['1'], color: 'red', message: 'Fault' },
    },
    goodwe: {
        idle: { states: ['0'], color: 'blue', message: 'Idle' },
        exporting: { states: ['1'], color: 'green', message: 'Export' },
        importing: { states: ['2'], color: 'red', message: 'Import' },
    }    

};

export const batteryStatusGroups = {
    goodwe: {
        noBattery: { states: ['0'], color: 'yellow', message: 'No Battery' },
        standby: { states: ['1'], color: 'blue', message: 'Standby' },
        discharging: { states: ['2'], color: 'red', message: 'Discharging' },
		charging: { states: ['3'], color: 'green', message: 'Charging' },
		waiting: { states: ['4','5'], color: 'yellow', message: 'Waiting' },
    }

};