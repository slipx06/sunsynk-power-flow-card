import {InverterModel} from '../../types';

export interface InverterSettingsDto {
    brand: InverterModel,
    statusGroups: InverterStatus,
    batteryStatusGroups?: InverterStatus,
    image: string
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
