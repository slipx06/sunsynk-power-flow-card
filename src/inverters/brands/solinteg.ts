import {
	InverterSettingsDto,
	InverterStatus,
} from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class Solinteg extends InverterSettingsDto {
	brand = InverterModel.Solinteg;
	statusGroups: InverterStatus = {
		normal: {
			states: ['2', 'On Grid generating', 'On Grid'],
			color: 'green',
			message: localize('common.normal'),
		},
		standby: {
			states: ['0', 'waiting', 'wait'],
			color: 'blue',
			message: localize('common.standby'),
		},
		selftest: {
			states: ['1', 'Self checking', 'check'],
			color: 'yellow',
			message: localize('common.selftest'),
		},
		offgrid: {
			states: ['5', 'Off Grid generating', 'Off Grid'],
			color: 'green',
			message: localize('common.offgrid'),
		},
		fault: {
			states: ['3', 'Fault', 'permanentfaultmode', 'fault'],
			color: 'red',
			message: localize('common.fault'),
		},
		check: {
			states: ['4', 'Firmware upgrade', 'flash'],
			color: 'orange',
			message: localize('common.check'),
		},
	};
	image =
		'data:image/png;base64,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';
}
