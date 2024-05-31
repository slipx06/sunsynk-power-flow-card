import {version} from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2, 3, 4]
export const validnonLoadValues = [0, 1, 2, 3]
export const valid3phase = [true, false]
export const validaux = [true, false]
export const validauxLoads = [0, 1, 2]
export const validGridDisconnected = ['off', '0', 'off-grid', 'off grid', 'offgrid']
export const validGridConnected = ['on', '1', 'on-grid', 'on grid', 'ongrid']

export const EDITOR_NAME = 'sunsynk-content-card-editor';
export const MAIN_NAME = 'sunsynk-power-flow-card';

export const enum SensorDeviceClass {
    DATE = "date",
    ENUM = "enum",
    TIMESTAMP = "timestamp",
    APPARENT_POWER = "apparent_power",
    ATMOSPHERIC_PRESSURE = "atmospheric_pressure",
    BATTERY = "battery",
    CO = "carbon_monoxide",
    CO2 = "carbon_dioxide",
    CURRENT = "current",
    ENERGY = "energy",
    ENERGY_STORAGE = "energy_storage",
    FREQUENCY = "frequency",
    IRRADIANCE = "irradiance",
    MONETARY = "monetary",
    POWER_FACTOR = "power_factor",
    POWER = "power",
    REACTIVE_POWER = "reactive_power",
    TEMPERATURE = "temperature",
    VOLTAGE = "voltage"
}

export const enum UnitOfPower {
    WATT = "W",
    KILO_WATT = "kW",
    MEGA_WATT = "MW",
    BTU_PER_HOUR = "BTU/h",
}

export const enum UnitOfEnergy {
    GIGA_JOULE = "GJ",
    KILO_WATT_HOUR = "kWh",
    MEGA_JOULE = "MJ",
    MEGA_WATT_HOUR = "MWh",
    WATT_HOUR = "Wh",
}

export const enum UnitOfElectricalCurrent {
    MILLIAMPERE = "mA",
    AMPERE = "A"
}

export const enum UnitOfElectricPotential {
    MILLIVOLT = "mV",
    VOLT = "V"
}

export type UnitOfEnergyOrPower = UnitOfEnergy | UnitOfPower;

type ConversionRule = {
    threshold: number;
    divisor: number;
    targetUnit: UnitOfEnergyOrPower;
    decimal?: number;
};

export const unitOfEnergyConversionRules: Record<UnitOfEnergyOrPower, ConversionRule[]> = {
    [UnitOfEnergy.WATT_HOUR]: [{threshold: 1e6, divisor: 1e6, targetUnit: UnitOfEnergy.MEGA_WATT_HOUR}, {
        threshold: 1e3,
        divisor: 1e3,
        targetUnit: UnitOfEnergy.KILO_WATT_HOUR,
        decimal: 1
    }],
    [UnitOfEnergy.KILO_WATT_HOUR]: [{
        threshold: 1e3,
        divisor: 1e3,
        targetUnit: UnitOfEnergy.MEGA_WATT_HOUR,
        decimal: 2
    }],
    [UnitOfEnergy.MEGA_WATT_HOUR]: [],
    [UnitOfEnergy.GIGA_JOULE]: [{threshold: 1e3, divisor: 1e3, targetUnit: UnitOfEnergy.MEGA_JOULE}],
    [UnitOfEnergy.MEGA_JOULE]: [],
    [UnitOfPower.WATT]: [{threshold: 1e6, divisor: 1e6, targetUnit: UnitOfPower.MEGA_WATT}, {
        threshold: 1e3,
        divisor: 1e3,
        targetUnit: UnitOfPower.KILO_WATT,
    }],
    [UnitOfPower.KILO_WATT]: [{
        threshold: 1e3,
        divisor: 1e3,
        targetUnit: UnitOfPower.MEGA_WATT,
    }],
    [UnitOfPower.MEGA_WATT]: [],
    [UnitOfPower.BTU_PER_HOUR]: [],
};
