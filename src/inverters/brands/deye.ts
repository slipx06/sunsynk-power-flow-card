import { InverterSettingsDto } from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class Deye extends InverterSettingsDto {
	brand = InverterModel.Deye;
	statusGroups = {
		standby: {
			states: ['0', 'standby', 'stand-by'],
			color: 'blue',
			message: localize('common.standby'),
		},
		selftest: {
			states: ['1', 'selftest', 'self-checking'],
			color: 'yellow',
			message: localize('common.selftest'),
		},
		normal: {
			states: ['2', 'normal', 'ok'],
			color: 'green',
			message: localize('common.normal'),
		},
		alarm: {
			states: ['3', 'alarm'],
			color: 'orange',
			message: localize('common.alarm'),
		},
		fault: {
			states: ['4', 'fault'],
			color: 'red',
			message: localize('common.fault'),
		},
	};
	image =
		'data:image/png;base64,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';
}
