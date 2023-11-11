import {version} from '../package.json';
import {localize} from './localize/localize';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2, 4]
export const valid3phase = [true, false]
export const sunsynkBase64Img = 'data:image/png;base64,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'
export const solisBase64Img = 'data:image/png;base64,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'
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
* Page 22-23: https://www.scss.tcd.ie/Brian.Coghlan/Elios4you/RS485_MODBUS-Hybrid-BACoghlan-201811228-1854.pdf
*
*/
export const inverterStatusGroups = {
    sunsynk: {
        standby: {states: ['0', 'standby', 'Stand-by'], color: 'blue', message: localize('common.standby')},
        selftest: {states: ['1', 'selftest', 'Self-checking'], color: 'yellow', message: localize('common.selftest')},
        normal: {states: ['2', 'normal', 'ok', 'Normal'], color: 'green', message: localize('common.normal')},
        alarm: {states: ['3', 'alarm'], color: 'orange', message: localize('common.alarm')},
        fault: {states: ['4', 'fault', 'FAULT'], color: 'red', message: localize('common.fault')},
    },
    lux: {
        standby: {states: ['0'], color: 'blue', message: localize('common.standby')},
        selftest: {states: [], color: 'yellow', message: localize('common.selftest')},
        normal: {
            states: ['2', '4', '5', '8', '9', '10', '11', '12', '16', '20', '32', '40'],
            color: 'green',
            message: localize('common.normal')
        },
        alarm: {states: ['7', '17', '64', '136', '192'], color: 'orange', message: localize('common.alarm')},
        fault: {states: ['1'], color: 'red', message: localize('common.fault')},
    },
    goodwe_gridmode: {
        idle: {states: ['0', 'Idle'], color: 'blue', message: localize('common.idle')},
        exporting: {states: ['1', 'Exporting'], color: 'green', message: localize('common.exporting')},
        importing: {states: ['2', 'Importing'], color: 'red', message: localize('common.importing')},
    },
    goodwe: {
        standby: {states: ['0', 'Wait Mode'], color: 'blue', message: localize('common.standby')},
        ongrid: {
            states: ['1', 'Normal (On-Grid)'], color: 'green', message: localize('common.ongrid') },
        offgrid: { states: ['2', 'Normal (Off-Grid)'],
            color: 'green',
            message: localize('common.offgrid')
        },
        fault: {states: ['3', 'Fault Mode'], color: 'red', message: localize('common.fault')},
        flash: {states: ['4', 'Flash Mode'], color: 'yellow', message: localize('common.flash')},
        check: {states: ['5', 'Check Mode'], color: 'orange', message: localize('common.check')},
    },
    solis: {
        normal: {
            states: ['0', '3'],
            color: 'green',
            message: localize('common.normal'),
        },
        standby: {
            states: ['1', '2'],
            color: 'blue',
            message: localize('common.standby'),
        },
        alarm: {
            states: ['4140', '4100', '4112', '4113', '4114', '4115', '4116', '4120', '4122', '4123', '4124', '4125', '4127', '4128', '4129', '4130', '4132', '4133', '4134', '4135', '4136', '4137', '4138', '4144', '4145', '4146', '4147', '4148', '4150', '4151', '4152'],
            color: 'red',
            message: localize('common.alarm'),
        },
        fault: {
            states: ['4117', '4118', '4119', '4121', '4131', '4134', '4135', '4164', '4167', '4144'],
            color: 'red',
            message: localize('common.fault'),
        },
        selftest: {
            states: ['4139'],
            color: 'purple',
            message: localize('common.selftest'),
        },
    }

};

export const batteryStatusGroups = {
    goodwe_gridmode: {
        noBattery: {states: ['0'], color: 'yellow', message: localize('common.no_battery')},
        standby: {states: ['1'], color: 'blue', message: localize('common.standby')},
        discharging: {states: ['2'], color: 'red', message: localize('common.discharging')},
        charging: {states: ['3'], color: 'green', message: localize('common.charging')},
        waiting: {states: ['4', '5'], color: 'yellow', message: localize('common.waiting')},
    },
    goodwe: {
        noBattery: {states: ['0'], color: 'yellow', message: localize('common.no_battery')},
        standby: {states: ['1'], color: 'blue', message: localize('common.standby')},
        discharging: {states: ['2'], color: 'red', message: localize('common.discharging')},
        charging: {states: ['3'], color: 'green', message: localize('common.charging')},
        waiting: {states: ['4', '5'], color: 'yellow', message: localize('common.waiting')},
    }
};
