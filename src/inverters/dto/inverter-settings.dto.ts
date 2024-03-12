import {InverterModel} from '../../types';

export class InverterSettingsDto {
    brand!: InverterModel;
    model?: string; // not currently used, but could be used to support multiple models per brand, where simple rules changes.
    statusGroups!: InverterStatus;
    batteryStatusGroups?: InverterStatus;
    image!: string

    constructor() {
    }

    getBatteryCapacity(battery_power: number, grid_status: string, shutdown: number, inverter_prog, state_battery_soc) {
        let battery_capacity = 0;
        if (battery_power > 0) {
            if (grid_status === 'off' || grid_status === '0' || grid_status.toLowerCase() === 'off-grid' || !inverter_prog.show || parseInt(state_battery_soc.state) <= inverter_prog.capacity) {
                battery_capacity = shutdown;
            } else {
                battery_capacity = inverter_prog.capacity;
            }
        } else if (battery_power < 0) {
            if (grid_status === 'off' || grid_status === '0' || grid_status.toLowerCase() === 'off-grid' || !inverter_prog.show || parseInt(state_battery_soc.state) >= inverter_prog.capacity) {
                battery_capacity = 100;
            } else if (parseInt(state_battery_soc.state) < inverter_prog.capacity) {
                battery_capacity = inverter_prog.capacity;
            }
        }
        return battery_capacity;
    }
}

export type InverterStatus = {
    [key in InverterStatuses]?: InverterStatusConfig
}

export enum InverterStatuses {
    Standby = 'standby',
    SelfTest = 'selftest',
    Normal = 'normal',
    Alarm = 'alarm',
    Fault = 'fault',
    Idle = 'idle',
    NormalStop = 'normalstop',
    Shutdown = 'shutdown',
    OnGrid = 'ongrid',
    OffGrid = 'offgrid',
    Check = 'check',
    NoBattery = 'noBattery',
    Discharging = 'discharging',
    Charging = 'charging',
    Waiting = 'waiting',
    Exporting = 'exporting',
    Importing = 'importing',
    Flash = 'flash',
    Offline = 'offline',
    Running = 'running',
    SleepMode = 'sleepmode'
}

export interface InverterStatusConfig {
    states: string[],
    color: string,
    message: string
}
