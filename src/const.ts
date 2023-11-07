import { version } from '../package.json';
import { localize } from './localize/localize';

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


/* Solis Status Codes
* Page 22: https://www.scss.tcd.ie/Brian.Coghlan/Elios4you/RS485_MODBUS-Hybrid-BACoghlan-201811228-1854.pdf
*/
export const inverterStatusGroups = {
    sunsynk: {
        standby: { states: ['0', 'standby', 'Stand-by'], color: 'blue', message: localize('common.standby') },
        selftest: { states: ['1', 'selftest', 'Self-checking'], color: 'yellow', message: localize('common.selftest') },
        normal: { states: ['2', 'normal', 'ok', 'Normal'], color: 'green', message: localize('common.normal') },
        alarm: { states: ['3', 'alarm'], color: 'orange', message: localize('common.alarm') },
        fault: { states: ['4', 'fault', 'FAULT'], color: 'red', message: localize('common.fault') },
    },
    lux: {
        standby: { states: ['0'], color: 'blue', message: localize('common.standby') },
        selftest: { states: [], color: 'yellow', message: localize('common.selftest') },
        normal: { states: ['2', '4', '5', '8', '9', '10', '11', '12', '16', '20', '32', '40'], color: 'green', message: localize('common.normal') },
        alarm: { states: ['7', '17','64', '136', '192'], color: 'orange', message: localize('common.alarm') },
        fault: { states: ['1'], color: 'red', message: localize('common.fault') },
    },
    goodwe_gridmode: {
        idle: { states: ['0', 'Idle'], color: 'blue', message: localize('common.idle') },
        exporting: { states: ['1', 'Exporting'], color: 'green', message: localize('common.exporting') },
        importing: { states: ['2', 'Importing'], color: 'red', message: localize('common.importing') },
    },    
    goodwe: {
        standby: { states: ['0', 'Wait Mode'], color: 'blue', message: localize('common.standby') },
        normal: { states: ['1', '2', 'Normal (On-Grid)', 'Normal (Off-Grid)'], color: 'green', message: localize('common.normal') },
        fault: { states: ['3', 'Fault Mode'], color: 'red', message: localize('common.fault') },
        flash: { states: ['4', 'Flash Mode'], color: 'yellow', message: localize('common.flash') },
        check: { states: ['5', 'Check Mode'], color: 'orange', message: localize('common.check') },
    }  ,
    solis: {
        standby: { states: ['0'], color: 'blue', message: localize('common.standby') },
        selftest: { states: [], color: 'yellow', message: localize('common.selftest') },
        normal: { states: ['3','4'], color: 'green', message: localize('common.normal') },
        alarm: { states: ['10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26','27'], color: 'orange', message: localize('common.alarm') },
        fault: { states: ['23','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','50','51','52','53','54','55','56','57'], color: 'red', message: localize('common.fault') },
    }

};

export const batteryStatusGroups = {
    goodwe_gridmode: {
        noBattery: { states: ['0'], color: 'yellow', message: localize('common.no_battery') },
        standby: { states: ['1'], color: 'blue', message: localize('common.standby') },
        discharging: { states: ['2'], color: 'red', message: localize('common.discharging') },
		charging: { states: ['3'], color: 'green', message: localize('common.charging') },
		waiting: { states: ['4', '5'], color: 'yellow', message: localize('common.waiting') },
    },
    goodwe: {
        noBattery: { states: ['0'], color: 'yellow', message: localize('common.no_battery') },
        standby: { states: ['1'], color: 'blue', message: localize('common.standby') },
        discharging: { states: ['2'], color: 'red', message: localize('common.discharging') },
		charging: { states: ['3'], color: 'green', message: localize('common.charging') },
		waiting: { states: ['4', '5'], color: 'yellow', message: localize('common.waiting') },
    }
};
