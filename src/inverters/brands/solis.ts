import {InverterSettingsDto, InverterStatus} from '../dto/inverter-settings.dto';
import {InverterModel} from '../../types';
import {localize} from '../../localize/localize';

/* Solis Status Codes
* Page 22-23: https://www.scss.tcd.ie/Brian.Coghlan/Elios4you/RS485_MODBUS-Hybrid-BACoghlan-201811228-1854.pdf
*
*/

export class Solis extends InverterSettingsDto {
    brand = InverterModel.Solis;
    statusGroups: InverterStatus = {
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
    };
    image = 'data:image/png;base64,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'
}
