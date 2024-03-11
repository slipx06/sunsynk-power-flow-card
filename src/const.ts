import {version} from '../package.json';

export const CARD_VERSION = version;

export const validLoadValues = [0, 1, 2, 4]
export const validnonLoadValues = [0, 1, 2, 3]
export const valid3phase = [true, false]
export const validaux = [true, false]
/* Lux Status Codes
*
* Some codes may be missing, these are the ones we are aware of
* If you know any codes not in this list please let us know
*
* 0 = Standby
* 1 = Error
* 2 = Inverting
* 4 = Solar > Load - Surplus > Grid
* 5 = Float
* 7 = Charger Off
* 8 = Supporting
* 9 = Selling
* 10 = Pass through
* 11 = Offsetting
* 12 = Solar > Battery Charging
* 16 = Battery Discharging > LOAD - Surplus > Grid
* 17 = Temperature over range
* 20 = Solar + Battery Discharging > LOAD - Surplus > Grid
* 32 = AC Battery Charging
* 40 = Solar + Grid > Battery Charging
* 64 = No Grid : Battery > EPS
* 136 = No Grid : Solar > EPS - Surplus > Battery Charging
* 192 = No Grid : Solar + Battery Discharging > EPS
*/


/* Solis Status Codes
* Page 22-23: https://www.scss.tcd.ie/Brian.Coghlan/Elios4you/RS485_MODBUS-Hybrid-BACoghlan-201811228-1854.pdf
*
*/

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
