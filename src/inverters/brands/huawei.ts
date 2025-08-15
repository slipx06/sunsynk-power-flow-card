import {
	InverterSettingsDto,
	InverterStatus,
} from '../dto/inverter-settings.dto';
import { InverterModel } from '../../types';
import { localize } from '../../localize/localize';

export class Huawei extends InverterSettingsDto {
	brand = InverterModel.Huawei;
	batteryStatusGroups: InverterStatus = {
		offline: {
			states: ['0', 'offline'],
			color: 'yellow',
			message: localize('common.offline'),
		},
		standby: {
			states: ['1', 'standby'],
			color: 'blue',
			message: localize('common.standby'),
		},
		running: {
			states: ['2', 'running'],
			color: 'green',
			message: localize('common.running'),
		},
		fault: {
			states: ['3', 'fault'],
			color: 'red',
			message: localize('common.fault'),
		},
		sleepmode: {
			states: ['4', 'sleep_mode'],
			color: 'yellow',
			message: localize('common.sleepmode'),
		},
	};
	statusGroups: InverterStatus = {
		standby: {
			states: ['standby'],
			color: 'blue',
			message: localize('common.standby'),
		},
		selftest: {
			states: ['spot check'],
			color: 'yellow',
			message: localize('common.selftest'),
		},
		normal: {
			states: [
				'grid-connected, grid-connected normally',
				'grid-connected, grid connection with derating due to power rationing',
			],
			color: 'green',
			message: localize('common.normal'),
		},
		shutdown: {
			states: ['shutdown'],
			color: 'red',
			message: localize('common.shutdown'),
		},
		normalstop: {
			states: ['normal stop'],
			color: 'yellow',
			message: localize('common.normalstop'),
		},
		alarm: {
			states: [
				'grid-connected, grid connection with derating due to internal causes of the solar inverter',
			],
			color: 'orange',
			message: localize('common.alarm'),
		},
		fault: {
			states: ['stop due to faults', 'stop due to power rationing'],
			color: 'red',
			message: localize('common.fault'),
		},
	};
	image =
		'data:image/png;base64,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';
}
