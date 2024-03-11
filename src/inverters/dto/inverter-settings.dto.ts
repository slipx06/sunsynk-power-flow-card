import {InverterModel} from '../../types';

export class InverterSettingsDto {
    brand!: InverterModel;
    model?: string; // not currently used, but could be used to support multiple models per brand, where simple rules changes.
    statusGroups!: InverterStatus;
    batteryStatusGroups?: InverterStatus;
    image!: string

    constructor() {
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
