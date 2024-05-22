import {InverterModel} from '../../types';

export class InverterSettingsDto {
    brand!: InverterModel;
    model?: string; // not currently used, but could be used to support multiple models per brand, where simple rules changes.
    statusGroups!: InverterStatus;
    batteryStatusGroups?: InverterStatus;
    image!: string

    constructor() {
    }

    getBatteryCapacity(batteryPower: number, gridStatus: string, shutdown: number, inverterProg, stateBatterySOC) {
        let batteryCapacity = 0;
        if (batteryPower > 0) {
            if (gridStatus === 'off' || gridStatus === '0' || gridStatus.toLowerCase() === 'off-grid' || !inverterProg.show || parseInt(stateBatterySOC.state) <= inverterProg.capacity) {
                batteryCapacity = shutdown;
            } else {
                batteryCapacity = inverterProg.capacity;
            }
        } else if (batteryPower < 0) {
            if (gridStatus === 'off' || gridStatus === '0' || gridStatus.toLowerCase() === 'off-grid' || !inverterProg.show || parseInt(stateBatterySOC.state) >= inverterProg.capacity) {
                batteryCapacity = 100;
            } else if (parseInt(stateBatterySOC.state) < inverterProg.capacity) {
                batteryCapacity = inverterProg.capacity;
            }
        }
        return batteryCapacity;
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
    SleepMode = 'sleepmode',
    Off = 'off',
    LowPower = 'lowpower',
    Bulk = 'bulk',
    Absorption = 'absorption',
    Float = 'float',
    Storage = 'storage',
    Equalize = 'equalize',
    Passthru = 'passthru',
    Inverting = 'inverting',
    PowerAssist = 'powerassist',
    PowerSupply = 'powersupply',
    Sustain = 'sustain',
    ExternalControl = 'externalcontrol'
}

export interface InverterStatusConfig {
    states: string[],
    color: string,
    message: string
}
