import {InverterSettingsDto, InverterStatus} from '../dto/inverter-settings.dto';
import {InverterModel} from '../../types';
import {localize} from '../../localize/localize';

export class Solax extends InverterSettingsDto {
	brand = InverterModel.Solax;
	statusGroups: InverterStatus = {
		normal: {
			states: ['2', 'normal', 'normalmode', 'normal mode'],
			color: 'green',
			message: localize('common.normal'),
		},
		standby: {
			states: ['0', 'waiting', 'waitmode', '9', 'idle', 'idlemode', 'idle mode', '10', 'standby', 'standbymode'],
			color: 'blue',
			message: localize('common.standby'),
		},
		selftest: {
			states: ['8', 'self testing', 'selftest', 'self test'],
			color: 'yellow',
			message: localize('common.selftest'),
		},
		offgrid: {
			states: ['6', 'off-grid waiting', 'epscheckmode', '7', 'off-grid', 'epsmode', 'eps mode'],
			color: 'green',
			message: localize('common.offgrid'),
		},
		fault: {
			states: ['4', 'permanent fault', 'permanentfaultmode', 'permanent fault mode', '3', 'fault', 'faultmode'],
			color: 'red',
			message: localize('common.fault'),
		},
		check: {
			states: ['1', 'checking', 'checkmode', '5', 'update', 'updatemode', 'update mode', 'eps check mode'],
			color: 'orange',
			message: localize('common.check'),
		},
	};
	image =
		'data:image/png;base64,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';
}
