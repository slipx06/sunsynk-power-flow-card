# Sunsynk-Power-Flow-Card
An animated Home Assistant card to emulate the Sunsynk power flow that's shown on the Inverter screen.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/slipx06/sunsynk-power-flow-card?style=for-the-badge)

## Features
* Option to switch between three card styles: `lite`, `simple` or `full`.
* Animated power flow based on positive/negative/zero sensor values.
* Dynamic battery image based on SOC (empty->low->medium->high). 
* Grid connected status. A red dot is displayed when the grid is disconnected.
* Inverter status (standby, normal, self-test, alarm, fault) is displayed as a colour coded dot.  
* Configurable battery size and shutdown SOC to calculate and display remaining battery runtime based on current battery usage. Can be toggled off.
* Daily Totals that can be toggled on or off.
* Hide all solar data if not installed.
* "Use Timer" setting and "Energy Pattern" setting (Priority Load or Priority Battery) shown as dynamic icons with ability to hide if not required.

## Screenshots

![image](https://user-images.githubusercontent.com/7227275/235432195-08f35c72-fa6f-4a31-af80-dcfa7657a14c.png)

*Lite Version*

![image](https://user-images.githubusercontent.com/7227275/235432326-70ad2f47-fd50-42f8-af5f-d7a4d1da08ea.png)

*Simple Version*

![image](https://user-images.githubusercontent.com/7227275/235432368-a083301d-601c-4e21-9415-e4a5ee09e8a6.png)

*Full Version*

## Installation
The card can be installed manually or via HACS

### Manual Installation
1. Create a new directory under `www` and name it `sunsynk-power-flow-card` e.g www/sunsynk-power-flow-card/
2. Copy the `sunsynk-power-flow-card.js` into the directory
3. Add the resource to your Dashboard. You can append the filename with a `?ver=x` and increment x each time you download a new version to force a reload and avoid using a cached version. It is also a good idea to clear your browser cache.

![image](https://user-images.githubusercontent.com/7227275/235441241-93ab0c7d-341d-428f-8ca8-60ec932dde2d.png)

### Installation using HACS
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration)
You can add to HACS as a Custom Repo

## Usage
Add the `Custom: Sunsynk Power Flow Card` to your Dashboard view. 

![image](https://user-images.githubusercontent.com/7227275/235375690-65d17663-e117-4626-9151-1a41979a13b8.png)

It will show the following:

![image](https://user-images.githubusercontent.com/7227275/235710241-56732e5f-89e4-4b02-b22f-254912c14d3a.png)

### Card Options

The card requires that all of these attributes be defined. 

| Attribute | Default | Description |
| --- | --- | --- |
|type: | `custom:sunsynk-power-flow-card` | The custom card |
|cardstyle: | `lite` | Selects the card layout that is used  `lite, simple, full` |
|show_daily: | `yes` | Toggles the Daily Totals `yes/no` |
|battery_energy: | `15960` | Total Battery Energy in Wh (e.g. 3 x 5.32kWh = 15960). If set to `hidden` the remaining battery runtime will be hidden|
|battery_shutdown_soc: | `20` |The battery shutdown percentage used to calculate remaining runtime |
|show_solar:| `yes` | Toggle display of solar information `yes/no`|
|entities:||List of sensor entities. See required [Entities](#entities) below|

### Entities
Entity attributes below have been appended with the modbus register # e.g. `pv2_power_187` to indicate which Sunsynk register should be read when configuring your sensors. Replace the default sensors with your own specific sensor names. It is important that your sensors read the expected modbus register value. If you have missing sensors for any attribute set it to none i.e. `solarday_108: none` and it will use a default value of 0.

| Attribute | Default | Description |
| --- | --- | --- |
|use_timer_248: | `switch.toggle_system_timer` | Displays "Use timer" status as an icon next to the inverter. Set to `no` to hide |
|priority_load_243: | `switch.toggle_priority_load` | Shows if energy pattern is set to Priority Load or Priority Battery as an icon next to the inverter. Set to `no` to hide|
|batdischargeday_71: | `sensor.battery_discharge_day` | Daily Battery Usage (kWh) |
|batchargeday_70: | `sensor.battery_charge_day` | Daily Battery Charge (kWh) |
|loadday_84: | `sensor.daily_load_power_kwh` | Daily Load (kWh) |
|gridday_76: | `sensor.grid_import_day_buy` | Daily Grid Import (kWh) |
|solarday_108: | `sensor.daily_pv_power_kwh` | Daily Solar Usage (kWh |
|inverter_grid_voltage_154: | `sensor.grid_inverter_voltage` | Grid Voltage (V) |
|inverter_load_freq_192: | `sensor.load_frequency` | Load Frequency (Hz) |
|inverter_out_164: | `sensor.inverter_output_current` | Inverter Output Current (A) |
|inverter_out_175: | `sensor.inverter_output_power` | Inverter Output Power (W) |
|inverter_load_grid_169: | `sensor.grid_inverter_load` | Inverter Load (W) |
|pv2_power_187: | `sensor.pv2_power` | PV String 1 Power (W)  |
|pv1_power_186: | `sensor.pv1_power` | PV String 2 Power (W)|
|battery_voltage_183: | `sensor.battery_voltage` | Battery Voltage (V) |
|battery_soc_184: | `sensor.battery_soc` | Battery State of Charge (%) |
|battery_out_190: | `sensor.battery_output_power` | Battery Output Power (W). Requires a negative number for battery charging and a positive number for battery discharging |
|ess_power: | `sensor.sunsynk_essential_load` | This sensor is only used for the simple and lite cards. You can use register 178. It is automatically calculated for the full card based on other attributes. (W) |
|grid_external_power_172: | `sensor.grid_external_power`  | Grid External Power (W)|
|pv1_v_109: | `sensor.dc1_voltage` | PV String 1 Voltage (V) |
|pv1_i_110: | `sensor.dc1_current` | PV String 1 Current (A)|
|pv2_v_111: | `sensor.dc2_voltage` | PV String 2 Voltage (V)|
|pv2_i_112: | `sensor.dc2_current` | PV String 2 Current (A)|
|grid_status_194: | `binary_sensor.grid_connected_status` | Grid Connected Status `on/off` |
|inverter_status_59: | `sensor.overall_state` | Inverter Status `0, 1, 2, 3, 4` or `standby, selftest, normal, alarm, fault` |
|aux_power_166: | `sensor.aux_output_power` | Auxilary Power (W) |

The card calculates the sensors below based on supplied attributes in the config so you dont need to define them in Home Assistant
 
 ```
 totalsolar = pv1_power_186 + pv2_power_187
 nonessential = grid_external_power_172 - inverter_load_grid_169
 essential = inverter_out_175 - (aux_power_166 - inverter_load_grid_169 )
 ```
The modbus registers can be visualised on the `full` card below:

![image](https://user-images.githubusercontent.com/7227275/235479493-b322d5b2-f2b1-431f-9048-f845fc2989b4.png)
