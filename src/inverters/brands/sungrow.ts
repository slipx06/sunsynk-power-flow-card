import {InverterSettingsDto, InverterStatus} from '../dto/inverter-settings.dto';
import {InverterModel} from '../../types';
import {localize} from '../../localize/localize';

/* Sungrow Status Codes
* source https://github.com/mkaiser/Sungrow-SHx-Inverter-Modbus-Home-Assistant
*
* Running
* Off-grid Charge
* Update Failed
* Maintain mode
* Forced mode
* Off-grid mode
* Un-Initialized
* Initial Standby
* Shutdown
* Standby
* Emergency Stop
* Startup
* AFCI self test shutdown
* Intelligent Station Building Status
* Safe Mode
* Open Loop
* Restarting
* External EMS mode
* Fault
* Stop
* De-rating Running
* Dispatch Run
* Warn Running
* Unknown
*/


export class Sungrow extends InverterSettingsDto {
    brand = InverterModel.Sungrow;
    statusGroups: InverterStatus = {
        standby: {states: ['standby','initial standby'], color: 'blue', message: localize('common.standby')},
        selftest: {states: ['startup'], color: 'blue', message: localize('common.selftest')},
        running: { states: ['running'], color: 'green', message: localize('common.running')},
        offgrid: {states:['off-grid mode'], color: 'orange', message: localize('common.offgrid')},
        externalcontrol: {states:['external ems mode','forced mode'], color: 'green', message: localize('common.externalcontrol')},
        shutdown: {states: ['shutdown','restarting','afci self test shutdown'], color: 'red', message: localize('common.shutdown')},
        normalstop: {states: ['stop'], color: 'yellow', message: localize('common.normalstop')},
        alarm: {states: ['warn running'],color: 'orange', message: localize('common.alarm')},
        sustain: {states:['de-rating running'], color: 'red', message: localize('common.sustain')},
        fault: {
            states: ['update failed', 'maintain mode','emergency stop','fault','unknown','un-initialized','open loop','safe mode','dispatch run'],
            color: 'red',
            message: localize('common.fault')
        },
        
    };
    image = 'data:image/png;base64,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'
}