import {InverterSettingsDto, InverterStatus} from './dto/inverter-settings.dto';
import {InverterModel} from '../types';
import {localize} from '../localize/localize';

export class FoxESS implements InverterSettingsDto {
    brand = InverterModel.FoxESS;
    image = 'data:image/png;base64,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';
    statusGroups: InverterStatus = {
        standby: {states: ['waiting'], color: 'blue', message: localize('common.standby')},
        selftest: {states: ['self test'], color: 'yellow', message: localize('common.selftest')},
        ongrid: {states: ['on grid'], color: 'green', message: localize('common.ongrid')},
        offgrid: {states: ['off grid / eps'], color: 'green', message: localize('common.offgrid')},
        fault: {states: ['recoverable fault', 'unrecoverable fault'], color: 'red', message: localize('common.fault')},
        check: {states: ['checking'], color: 'orange', message: localize('common.check')},
    }
}
