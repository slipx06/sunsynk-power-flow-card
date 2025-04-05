import {InverterSettingsDto} from '../dto/inverter-settings.dto';
import {InverterModel} from '../../types';
import {localize} from '../../localize/localize';

export class Sigenergy extends InverterSettingsDto {
    brand = InverterModel.Sigenergy;
    statusGroups = {
        standby: {states: ['0', 'standby', 'stand-by'], color: 'blue', message: localize('common.standby')},
        selftest: {states: ['1', 'selftest', 'self-checking'], color: 'yellow', message: localize('common.selftest')},
        normal: {states: ['2', 'normal', 'ok'], color: 'green', message: localize('common.normal')},
        alarm: {states: ['3', 'alarm'], color: 'orange', message: localize('common.alarm')},
        fault: {states: ['4', 'fault'], color: 'red', message: localize('common.fault')},
    };
    image = 'data:image/png;base64,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'
}
