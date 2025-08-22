import { InverterSettingsDto } from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class PowMr extends InverterSettingsDto {
	brand = InverterModel.PowMr;
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
