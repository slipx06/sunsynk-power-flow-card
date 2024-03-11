import {InverterSettingsDto, InverterStatus} from '../dto/inverter-settings.dto';
import {InverterModel} from '../../types';
import {localize} from '../../localize/localize';

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

export class Lux extends InverterSettingsDto {
    brand = InverterModel.Lux;
    statusGroups: InverterStatus = {
        standby: {states: ['0'], color: 'blue', message: localize('common.standby')},
        selftest: {states: [], color: 'yellow', message: localize('common.selftest')},
        normal: {
            states: ['2', '4', '5', '8', '9', '10', '11', '12', '16', '20', '32', '40'],
            color: 'green',
            message: localize('common.normal')
        },
        alarm: {states: ['7', '17', '64', '136', '192'], color: 'orange', message: localize('common.alarm')},
        fault: {states: ['1'], color: 'red', message: localize('common.fault')},
    }
    image = 'data:image/png;base64,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';
}
