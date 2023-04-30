# Sunsynk-Home-Assistant-Power-Flow-Card
An animated Home Assistant card to emulate the Sunsynk power flow that's shown on the Inverter screen.

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

![image](https://user-images.githubusercontent.com/7227275/235325991-f14d4a53-45a0-4468-8a92-36e65c36282f.png)

*Lite Version*

![image](https://user-images.githubusercontent.com/7227275/235306279-93b0748e-5f94-46ec-b3cc-07e112f5e117.png)

*Simple Version*

![image](https://user-images.githubusercontent.com/7227275/235306297-ec7821b9-0b2b-4270-9539-618c650869cf.png)

*Full Version*

## Usage

1. Create a new directory under `www` and name it `sunsynk-power-flow-card` e.g www/sunsynk-power-flow-card/
2. Copy the `sunsynk-power-flow.js` into the directory
3. Add the resource to your Dashboard. You can append the filename with a `?ver=x` and increment x each time you download a new version to force a reload and avoid using a cached version. It is also a good idea to clear your browser cache.

![image](https://user-images.githubusercontent.com/7227275/235327407-5930ff4f-baa2-4122-bb36-35fd1622ecb5.png)

4. Add the `Custom: Sunsynk Power Flow Card` to your Dashboard view. 

![image](https://user-images.githubusercontent.com/7227275/235375690-65d17663-e117-4626-9151-1a41979a13b8.png)

It will show the following:

![image](https://user-images.githubusercontent.com/7227275/235375757-b635c538-cf29-45e3-9db2-5425a00724cb.png)

### Card Options

The card requires that all of these attributes be defined. 

| Attribute | Default | Description |
| --- | --- | --- |
|type: | `custom:sunsynk-power-flow-card` | The custom card |
|cardstyle: | `lite` | Selects the card layout that is used  (lite, simple, full) |
|dailyusage: | `yes` | Toggles the Daily Totals (yes/no) |
|battery_energy: | `15960` | Total Battery Energy in Wh (e.g. 3 x 5.32kWh = 15960) or set to "hidden" to hide|
|battery_shutdown_soc: | `20` |The battery shutdown percentage to calculate remaining runtime |
|solar_installed:| `yes` | Toggle display of solar information (yes/no)|
|entities:||List of sensor entities. See required [Entities](#entities) below|

### Entities
Entity attributes below have been appended with the modbus register # e.g. `pv2_power_187` to indicate which Sunsynk register should be read when configuring your sensors. Replace the default sensors with your own specific sensor names. It is important that your sensors read the expected modbus register value. If you have missing sensors for any attribute set it to `none` i.e. `solarday_108: none` and it will use a default value of 0.

| Attribute | Default | Description |
| --- | --- | --- |
|use_timer_248: | `switch.toggle_system_timer` | Displays "Use timer" status as an icon next to the inverter. Set to "no" to hide |
|priority_load_243: | `switch.toggle_priority_load` | Shows if energy pattern is set to Priority Load or Priority Battery as an icon next to the inverter. Set to "no" to hide|
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
|grid_status_194: | `binary_sensor.grid_connected_status` | Grid Connected Status (on/off) |
|inverter_status_59: | `sensor.overall_state` | Inverter Status (0-standby, 1-selftest, 2-normal, 3-alarm, 4-fault) |
|aux_power_166: | `sensor.aux_output_power` | Auxilary Power (W) |

The card calculates the sensors below based on supplied attributes in the config so you dont need to define them in Home Assistant
 
 ```
 totalsolar = pv1_power_186 + pv2_power_187
 nonessential = grid_external_power_172 - inverter_load_grid_169
 essential = inverter_out_175 - (aux_power_166 - inverter_load_grid_169 )
 ```
