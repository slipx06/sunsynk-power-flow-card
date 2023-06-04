# Sunsynk-Power-Flow-Card
An animated Home Assistant card to emulate the power flow that's shown on the Sunsynk Inverter screen. You can use this for Deye as well as other Inverters as long as you have the required sensor data. See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki) for integration methods and examples.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/slipx06/sunsynk-power-flow-card?style=for-the-badge) <a href="https://www.buymeacoffee.com/slipx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="29" width="120"></a>

## Features
* Option to switch between two card styles: `lite` or `full`.
* Animated power flow based on positive/negative/zero sensor values with configurable dynamic speed. (Supports inverted battery,AUX and grid power).
* Dynamic battery image based on SOC (empty->low->medium->high). 
* Grid connected status.
* Inverter status (standby, normal, self-test, alarm, fault).  
* Configurable battery size and shutdown SOC to calculate and display remaining battery runtime based on current battery usage and system time slot setting i.e. SOC, Grid Charge. Can be toggled off.
* Daily Totals that can be toggled on or off.
* Hide all solar data if not installed or specify number of mppts in use.
* "Use Timer" setting and "Energy Pattern" setting (Priority Load or Priority Battery) shown as dynamic icons with ability to hide if not required. If setup as switches can be toggled by clicking on the card
* Panel mode for bigger card
* AUX and Non-essential can be hidden from the full card.
* Customisable - Change colours and inverter image
* Most entities can be clicked to show more-info dialog
* Optional data points include self sufficiency and ratio percentages, battery temperature, AC and DC temperature

## Screenshots

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/bc693061-b6b2-48a2-a880-48b01bb3a5de)
![sunsynk-power-flow-lite](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/24a7367f-7593-4bf1-a83c-cdedf8a49622)


*Lite Version*

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/ccbad4d9-6ab9-4b60-af12-fdd51ce8c5d4)
![sunsynk-power-flow-full](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/34ce79d5-8024-442a-851f-da2a90cbf42f)


*Full Version*

## Installation
The card can be installed manually or via HACS

### Manual Installation
1. Create a new directory under `www` and name it `sunsynk-power-flow-card` e.g www/sunsynk-power-flow-card/
2. Copy the `sunsynk-power-flow-card.js` into the directory
3. Add the resource to your Dashboard. You can append the filename with a `?ver=x` and increment x each time you download a new version to force a reload and avoid using a cached version. It is also a good idea to clear your browser cache.

![image](https://user-images.githubusercontent.com/7227275/235441241-93ab0c7d-341d-428f-8ca8-60ec932dde2d.png)

### Installation using HACS
[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://my.home-assistant.io/redirect/hacs_repository/?repository=sunsynk-power-flow-card&category=plugin&owner=slipx06)
You can add to HACS as a Custom Repo

## Usage
Add the `Custom: Sunsynk Power Flow Card` to your Dashboard view. 

![image](https://user-images.githubusercontent.com/7227275/235375690-65d17663-e117-4626-9151-1a41979a13b8.png)

### Card Options

The card can be configured through the following attributes: 

| Attribute | Requirement | Default |Description |
| --- | --- | --- | --- |
|type: | **Required** | `custom:sunsynk-power-flow-card`| The custom card |
|cardstyle: | **Required** | `lite` | Selects the card layout that is used  `lite or full` |
|panel_mode:| Optional | `no` |Toggles panel mode removing any card height restrictions. For use with Panel(1 card) view types or grid layouts|
|large_font:| Optional | `no` | Increases font size of sensor data `yes/no`|
|show_solar:|**Required** |`yes` | Toggle display of solar information `yes/no`|
|inverter: | Optional | See optional [Inverter](#inverter) attributes below  |List of inverter attributes.  |
|battery: | **Required**  |See required [Battery](#battery) attributes below | List of battery attributes.  |
|solar: | Optional |See optonal [Solar](#solar) attributes below | List of solar attributes.  |
|load: | Optional | See optional [Load](#load) attributes below|List of load attributes.  |
|grid: | Optional | See optional [Grid](#grid) attributes below| List of grid attributes.  |
|entities:|**Required** |See required [Entities](#entities) attributes below | List of sensor entities. |

### Inverter
| Attribute | Requirement |Default | Description |
| --- | --- | --- |--- |
|modern:| Optional |`yes`| Changes the inverter image.|
|colour:| Optional |`grey`| Changes the colour of the inverter. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|autarky:| Optional| `yes`| Display autarky and ratio as a prercentage. Set to `no` to hide (`yes/no`). <br />Autarky is the percentage of self sufficiency through Home Production. Ratio is the percentage of produced electricity used by the home. <br />It is calculated based on the formula below and borrowed from the [Power Distribution Card](https://github.com/JonahKr/power-distribution-card)  <br /><ul><li>Autarky in Percent = Home Production(Daily Solar + Daily Battery Discharge + Daily Grid Sell)*100 / Home Consumption (Daily Load + Daily Grid Buy + Daily Battery Charge)</li><li>Ratio in Percent = Home Consumption(Daily Load + Daily Grid Buy +Daily Battery Charge) / Home Production(Daily Solar + Daily Battery Discharge + Daily Grid Sell)*100</li></ul>|


### Battery
Note that the card will always display batter power as a positive number regardless of your sensor value. The animated dot will change direction depending on the charging or discharging state. The `invert_power` attribute can be used to reverse direction if needed by your sensor.

| Attribute | Requirement |Default | Description |
| --- | --- | --- |--- |
|energy: | **Required** | `15960` | Total Battery Energy in Wh (e.g. 3 x 5.32kWh = 15960). If set to `hidden` the remaining battery runtime will be hidden|
|shutdown_soc: | **Required** | `20` |The battery shutdown percentage used to calculate remaining runtime |
|invert_power:| Optional | `no`|Set to `yes` if your sensor provides a positive number for battery charge and negative number for battery discharge|
|colour:| Optional| `pink`| Changes the colour of all the battery card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional| `no` | Toggles the Daily Total (`yes/no`) |  
|animation_speed: | Optional | `6` | Set slowest animation speed in seconds, depending on Power draw | 
|max_power: | Optional | `4500` | Maximun Power draw to calculate animation speed |

### Solar
These attributes are only needed if `show_solar` is set to `yes` 
| Attribute | Requirement |Default | Description |
| --- | --- | --- |--- |
|colour:| Optional | `orange` | Changes the colour of all the solar card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional | `no` | Toggles the Daily Total (`yes/no`) |
|mppts: | **Required** | `two` | Specify the number of MPPT's in use `one`, `two`, `three` or `four` |
|animation_speed: | Optional | `9` | Set slowest animation speed in seconds, depending on Power produced | 
|max_power: | Optional | `8000` | Maximun Power draw to calculate animation speed |

### Load
| Attribute | Requirement | Default | Description |
| --- | --- | --- |--- |
|colour:| Optional |`'#5fb6ad'`| Changes the colour of all the load card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional |`no` | Toggles the Daily Total `yes/no` Only displayed if `show_aux` is set to `no` |
|show_aux: | Optional | `no` | Toggles the display of Aux (`yes/no`) |
|invert_aux: | Optional | `no` | Set to `yes` if your sensor provides a positive number for AUX input and negative number for AUX output  |
|animation_speed: | Optional | `8` | Set slowest animation speed in seconds, depending on Power draw | 
|max_power: | Optional | `8000` | Maximun Power draw to calculate animation speed |

### Grid
| Attribute | Requirement | Default | Description |
| --- | --- | --- | --- |
|colour:| Optional | `'#5490c2'`| Changes the colour of all the grid card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|no_grid_colour:| Optional | `'#a40013'`|Changes the colour of the grid disconnected icon. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc)|
|show_daily_buy: | Optional | `no` | Toggles the Daily Buy Total (`yes/no`) |
|show_daily_sell: | Optional | `no` | Toggles the Daily Sell Total (`yes/no`) |
|show_nonessential: | Optional |`yes` | Toggles the display of Non-Essential (`yes/no`)|
|invert_grid:| Optional | `no`| Set to `yes` if your sensor provides a negative number for Grid import and positive number for Grid export |
|animation_speed: | Optional | `8` | Set slowest animation speed in seconds, depending on Power draw | 
|max_power: | Optional | `8000` | Maximun Power draw to calculate animation speed |

### Entities
Entity attributes below have been appended with the modbus register # e.g. `pv2_power_187` to indicate which Sunsynk register should be read when configuring your sensors. Replace the default sensors with your own specific sensor names. It is important that your sensors read the expected modbus register value. If you have missing sensors for any attribute set it to none i.e. `solarday_108: none` and it will use a default value of 0.

See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki/Sensor-Mappings) for more information on sensor mappings if using other integration methods.

| Attribute |  Requirement | Default | Description |
| --- | --- | --- | --- |
|use_timer_248: | Optional | `switch.toggle_system_timer` | Displays "Use timer" status as an icon next to the inverter. Set to `no` to hide |
|priority_load_243: | Optional |`switch.toggle_priority_load` | Shows if energy pattern is set to Priority Load or Priority Battery as an icon next to the inverter. Set to `no` to hide|
|batdischargeday_71: | Optional |`sensor.battery_discharge_day` | Daily Battery Usage (kWh) |
|batchargeday_70: | Optional |`sensor.battery_charge_day` | Daily Battery Charge (kWh) |
|loadday_84: | Optional | `sensor.daily_load_power_kwh` | Daily Load (kWh) |
|grid_buy_day_76: | Optional | `sensor.grid_import_day_buy` | Daily Grid Import (kWh) |
|grid_sell_day_77: | Optional | `sensor.grid_export_day_sell` | Daily Grid Export (kWh) |
|solarday_108: | Optional | `sensor.daily_pv_power_kwh` | Daily Solar Usage (kWh |
|inverter_grid_voltage_154: | **Required** | `sensor.grid_inverter_voltage` | Inverter Output Voltage (V) |
|inverter_load_freq_192: | **Required** | `sensor.load_frequency` | Load Frequency (Hz) |
|inverter_out_164: | **Required** | `sensor.inverter_output_current` | Inverter Output Current (A) |
|inverter_out_175: | **Required** | `sensor.inverter_output_power` | Inverter Output Power (W) |
|inverter_load_grid_169: | **Required** | `sensor.grid_inverter_load` | Total Grid Power (W) |
|pv1_power_186: | Optional | `sensor.pv1_power` | PV String 1 Power (W)|
|pv2_power_187: | Optional | `sensor.pv2_power` | PV String 2 Power (W)  |
|pv3_power_188: | Optional | `sensor.pv3_power` | PV String 3 Power (W)  |
|pv4_power_189: | Optional | `sensor.pv4_power` | PV String 4 Power (W)  |
|battery_voltage_183: | **Required** | `sensor.battery_voltage` | Battery Voltage (V) |
|battery_soc_184: | **Required** | `sensor.battery_soc` | Battery State of Charge (%) |
|battery_out_190: | **Required** | `sensor.battery_output_power` | Battery Output Power (W). Requires a negative number for battery charging and a positive number for battery discharging. Set the `invert_power:` battery attribute to `yes` if your sensor reports this the other way around |
|battery_current_191: | **Required** |`sensor.battery_output_current` | Battery Current (A) | 
|essential_power: | Optional | `none` | The card will automatically calculate this sensor based on the formula below if the attribute is set to `none`. You can overide this by supplying a sensor that measures essential power e.g. register 178 or `Load power Essential` in the case of Solar Assistant.  (W) |
|nonessential_power| Optional | `none`| The card will automatically calculate this sensor based on the formula below if the attribute is set to `none`. You can overide this by supplying a sensor that measures non-essential power e.g.  `Load power Non-Essential` in the case of Solar Assistant.  (W)
|grid_external_power_172: | **Required** | `sensor.grid_external_power`  | Grid External Power (W)|
|pv1_v_109: | Optional | `sensor.dc1_voltage` | PV String 1 Voltage (V) |
|pv1_i_110: | Optional | `sensor.dc1_current` | PV String 1 Current (A)|
|pv2_v_111: | Optional | `sensor.dc2_voltage` | PV String 2 Voltage (V)|
|pv2_i_112: | Optional | `sensor.dc2_current` | PV String 2 Current (A)|
|pv3_v_113: | Optional | `sensor.dc3_voltage` | PV String 3 Voltage (V) |
|pv3_i_114: | Optional | `sensor.dc3_current` | PV String 3 Current (A)|
|pv4_v_115: | Optional | `sensor.dc4_voltage` | PV String 4 Voltage (V)|
|pv4_i_116: | Optional | `sensor.dc4_current` | PV String 4 Current (A)|
|grid_status_194: | **Required** | `binary_sensor.grid_connected_status` | Grid Connected Status `on/off` or `1/0` |
|inverter_status_59: | **Required** | `sensor.overall_state` | Inverter Status `0, 1, 2, 3, 4` or `standby, selftest, normal, alarm, fault` |
|aux_power_166: | Optional | `sensor.aux_output_power` | Auxilary Power (W) |
|remaining_solar: | Optional | `sensor.solcast_forecast_remaining_today`| The remaining solar forecast for the day (kWh) |
|battery_temp:| Optional | `sensor.ss_battery_temperature` | Battery Temperature (℃)|
|inverter_ac_temp:| Optional | `sensor.ss_dc_radiator_temperature` | Inverter AC Temperature (℃)|
|inverter_dc_temp:| Optional | `sensor.ss_dc_transformer_temperature` | Inverter DC Temperature (℃)|
|prog1_time:| Optional | `select.ss_prog1_time` | Program 1 start time (`HH:MM`)
|prog1_capacity:| Optional | `number.ss_prog1_capacity` | Program 1 capacity (SOC) setting
|prog1_charge:| Optional | `select.ss_prog1_charge` | Program 1 charge options (`on/off`, `0/1`, `No Grid or Gen`)
|prog2_time:| Optional | `select.ss_prog2_time` | Program 2 start time (`HH:MM`)
|prog2_capacity:| Optional | `number.ss_prog2_capacity` | Program 2 capacity (SOC) setting
|prog2_charge:| Optional | `select.ss_prog2_charge` | Program 2 charge options (`on/off`, `0/1`, `No Grid or Gen`)
|prog3_time:| Optional | `select.ss_prog3_time` | Program 3 start time (`HH:MM`)
|prog3_capacity:| Optional | `number.ss_prog3_capacity` | Program 3 capacity (SOC) setting
|prog3_charge:| Optional | `select.ss_prog3_charge` | Program 3 charge options (`on/off`, `0/1`, `No Grid or Gen`)
|prog4_time:| Optional | `select.ss_prog4_time` | Program 4 start time (`HH:MM`)
|prog4_capacity:| Optional | `number.ss_prog4_capacity` | Program 4 capacity (SOC) setting
|prog4_charge:| Optional | `select.ss_prog4_charge` | Program 4 charge options (`on/off`, `0/1`, `No Grid or Gen`)
|prog5_time:| Optional | `select.ss_prog5_time` | Program 5 start time (`HH:MM`)
|prog5_capacity:| Optional | `number.ss_prog5_capacity` | Program 5 capacity (SOC) setting
|prog5_charge:| Optional | `select.ss_prog5_charge` | Program 5 charge options (`on/off`, `0/1`, `No Grid or Gen`)
|prog6_time:| Optional | `select.ss_prog6_time` | Program 6 start time (`HH:MM`)
|prog6_capacity:| Optional | `number.ss_prog6_capacity` | Program 6 capacity (SOC) setting
|prog6_charge:| Optional | `select.ss_prog6_charge` | Program 6 charge options (`on/off`, `0/1`, `No Grid or Gen`)
   
The card calculates the sensors below based on supplied attributes in the config so you dont need to define them in Home Assistant
 
 ```
 totalsolar = pv1_power_186 + pv2_power_187 + pv3_power_188 + pv4_power_189
 nonessential = grid_external_power_172 - inverter_load_grid_169
 essential = inverter_out_175 - (aux_power_166 - inverter_load_grid_169 )
 ```
The modbus registers can be visualised on the `full` card below:

![image](https://user-images.githubusercontent.com/7227275/235479493-b322d5b2-f2b1-431f-9048-f845fc2989b4.png)


### Example Card Configuration
#### Minimum Configuration (No Solar) #####

```yaml
type: custom:sunsynk-power-flow-card
cardstyle: full
show_solar: 'no'
battery:
  energy: 15960
  shutdown_soc: 20
entities:
  inverter_grid_voltage_154: sensor.grid_inverter_voltage
  inverter_load_freq_192: sensor.load_frequency
  inverter_out_164: sensor.inverter_output_current
  inverter_out_175: sensor.inverter_output_power
  inverter_load_grid_169: sensor.grid_inverter_load
  battery_voltage_183: sensor.battery_voltage
  battery_soc_184: sensor.battery_soc
  battery_out_190: sensor.battery_output_power
  battery_current_191: sensor.battery_output_current
  grid_external_power_172: sensor.grid_external_power
  grid_status_194: binary_sensor.grid_connected_status
  inverter_status_59: sensor.overall_state
```
#### Minimum Configuration (Solar) #####

```yaml
type: custom:sunsynk-power-flow-card
cardstyle: full
show_solar: 'yes'
solar:
  mppts: two
battery:
  energy: 15960
  shutdown_soc: 20
load:
  show_aux: 'no'
entities:
  inverter_grid_voltage_154: sensor.grid_inverter_voltage
  inverter_load_freq_192: sensor.load_frequency
  inverter_out_164: sensor.inverter_output_current
  inverter_out_175: sensor.inverter_output_power
  inverter_load_grid_169: sensor.grid_inverter_load
  battery_voltage_183: sensor.battery_voltage
  battery_soc_184: sensor.battery_soc
  battery_out_190: sensor.battery_output_power
  battery_current_191: sensor.battery_output_current
  grid_external_power_172: sensor.grid_external_power
  grid_status_194: binary_sensor.grid_connected_status
  inverter_status_59: sensor.overall_state
  pv1_power_186: sensor.pv1_power
  pv2_power_187: sensor.pv2_power
  pv1_v_109: sensor.dc1_voltage
  pv1_i_110: sensor.dc1_current
  pv2_v_111: sensor.dc2_voltage
  pv2_i_112: sensor.dc2_current
```
#### Minimum Configuration (Solar + Daily Totals) #####

```yaml
type: custom:sunsynk-power-flow-card
cardstyle: full
show_solar: 'yes'
solar:
  mppts: two
  show_daily: 'yes'
battery:
  energy: 15960
  shutdown_soc: 20
  show_daily: 'yes'
load:
  show_daily: 'yes'
grid:
  show_daily_buy: 'yes'
entities:
  inverter_grid_voltage_154: sensor.grid_inverter_voltage
  inverter_load_freq_192: sensor.load_frequency
  inverter_out_164: sensor.inverter_output_current
  inverter_out_175: sensor.inverter_output_power
  inverter_load_grid_169: sensor.grid_inverter_load
  battery_voltage_183: sensor.battery_voltage
  battery_soc_184: sensor.battery_soc
  battery_out_190: sensor.battery_output_power
  battery_current_191: sensor.battery_output_current
  grid_external_power_172: sensor.grid_external_power
  grid_status_194: binary_sensor.grid_connected_status
  inverter_status_59: sensor.overall_state
  pv1_power_186: sensor.pv1_power
  pv2_power_187: sensor.pv2_power
  pv1_v_109: sensor.dc1_voltage
  pv1_i_110: sensor.dc1_current
  pv2_v_111: sensor.dc2_voltage
  pv2_i_112: sensor.dc2_current
  solarday_108: sensor.daily_pv_power_kwh
  batchargeday_70: sensor.battery_charge_day
  batdischargeday_71: sensor.battery_discharge_day
  loadday_84: sensor.daily_load_power_kwh
  grid_buy_day_76: sensor.grid_import_day_buy
```
#### Full Configuration (All Options) #####

```yaml
type: custom:sunsynk-power-flow-card
cardstyle: full
panel_mode: 'no'
large_font: 'no'
show_solar: 'yes'
inverter:
  modern: 'yes'
  colour: 'grey'
  autarky: 'yes'
battery:
  energy: 15960
  shutdown_soc: 20
  invert_power: 'no'
  colour: pink
  show_daily: 'yes'
  animation_speed: 6
  max_power: 4500
solar:
  colour: orange
  show_daily: 'yes'
  mppts: two
  animation_speed: 9
  max_power: 8000
load:
  colour: '#5fb6ad'
  show_daily: 'yes'
  show_aux: 'yes'
  invert_aux: 'no'
  animation_speed: 8
  max_power: 8000
grid:
  colour: '#5490c2'
  show_daily_buy: 'yes'
  show_daily_sell: 'yes'
  no_grid_colour: '#a40013'
  show_nonessential: 'no'
  invert_grid: `no`
  animation_speed: 8
  max_power: 8000
entities:
  use_timer_248: switch.toggle_system_timer
  priority_load_243: switch.toggle_priority_load
  batchargeday_70: sensor.battery_charge_day
  batdischargeday_71: sensor.battery_discharge_day
  loadday_84: sensor.daily_load_power_kwh
  grid_buy_day_76: sensor.grid_import_day_buy
  grid_sell_day_77: none
  solarday_108: sensor.daily_pv_power_kwh
  inverter_grid_voltage_154: sensor.grid_inverter_voltage
  inverter_load_freq_192: sensor.load_frequency
  inverter_out_164: sensor.inverter_output_current
  inverter_out_175: sensor.inverter_output_power
  inverter_load_grid_169: sensor.grid_power
  pv1_power_186: sensor.pv1_power
  pv2_power_187: sensor.pv2_power
  pv3_power_188: none
  pv4_power_189: none
  battery_voltage_183: sensor.battery_voltage
  battery_soc_184: sensor.battery_soc
  battery_out_190: sensor.battery_output_power
  battery_current_191: sensor.battery_output_current
  essential_power: none
  nonessential_power: none
  grid_external_power_172: sensor.grid_external_power
  pv1_v_109: sensor.dc1_voltage
  pv1_i_110: sensor.dc1_current
  pv2_v_111: sensor.dc2_voltage
  pv2_i_112: sensor.dc2_current
  pv3_v_113: none
  pv3_i_114: none
  pv4_v_115: none
  pv4_i_116: none
  grid_status_194: binary_sensor.grid_connected_status
  inverter_status_59: sensor.overall_state
  aux_power_166: sensor.aux_output_power
  remaining_solar: sensor.solcast_forecast_remaining_today
  battery_temp: sensor.ss_battery_temperature
  inverter_ac_temp: sensor.ss_dc_radiator_temperature
  inverter_dc_temp: sensor.ss_dc_transformer_temperature
  prog1_time: select.ss_prog1_time
  prog1_capacity: number.ss_prog1_capacity
  prog1_charge: select.ss_prog1_charge
  prog2_time: select.ss_prog2_time
  prog2_capacity: number.ss_prog2_capacity
  prog2_charge: select.ss_prog2_charge
  prog3_time: select.ss_prog3_time
  prog3_capacity: number.ss_prog3_capacity
  prog3_charge: select.ss_prog3_charge
  prog4_time: select.ss_prog4_time
  prog4_capacity: number.ss_prog4_capacity
  prog4_charge: select.ss_prog4_charge
  prog5_time: select.ss_prog5_time
  prog5_capacity: number.ss_prog5_capacity
  prog5_charge: select.ss_prog5_charge
  prog6_time: select.ss_prog6_time
  prog6_capacity: number.ss_prog6_capacity
  prog6_charge: select.ss_prog6_charge
```
