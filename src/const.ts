import {version} from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2, 4]
export const validnonLoadValues = [0, 1, 2, 3]
export const valid3phase = [true, false]
export const validaux = [true, false]

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
