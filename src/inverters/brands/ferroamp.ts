import { InverterSettingsDto } from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class Ferroamp extends InverterSettingsDto {
	brand = InverterModel.Ferroamp;
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
