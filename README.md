# Sunsynk-Power-Flow-Card
An animated Home Assistant card to emulate the power flow that's shown on the Sunsynk Inverter screen. You can use this for Deye as well as other Inverters as long as you have the required sensor data. See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki) for integration methods and examples.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/slipx06/sunsynk-power-flow-card?style=for-the-badge) <a href="https://www.buymeacoffee.com/slipx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="29" width="120"></a>

## Features
* Option to switch between two card styles: `lite` or `full`.
* Animated power flow based on positive/negative/zero sensor values with configurable dynamic speed. (Supports inverted battery, AUX and grid power).
* Dynamic battery image based on SOC (empty->low->medium->high). 
* Grid connected status.
* Inverter status (standby, normal, self-test, alarm, fault).  
* Configurable battery size and shutdown SOC to calculate and display remaining battery runtime based on current battery usage and system time slot setting i.e. SOC, Grid Charge. Can be toggled off.
* Daily Totals that can be toggled on or off.
* Hide all solar data if not installed or specify number of mppts in use. Set custom MPPT labels. 
* "Use Timer" setting and "Energy Pattern" setting (Priority Load or Priority Battery) shown as dynamic icons with ability to hide if not required. If setup as switches can be toggled by clicking on the card
* Panel mode for bigger card
* AUX and Non-essential can be hidden from the full card or assigned configurable labels
* Customisable - Change colours and images
* Most entities can be clicked to show more-info dialog
* Optional data points include self sufficiency and ratio percentages, battery temperature, AC and DC temperature
* Display up to two non-essential, essential and AUX loads
* Display energy cost per kWh and solar sell status

## Screenshots

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/1c44a09b-2914-4cbd-919d-477789137acd)
![sunsynk-power-flow-lite](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/ab615245-cee6-4502-b9bc-649566a6eb54)


*Lite Version*

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/1b381ecf-7205-44ea-baba-1b45925a81d6)
![sunsynk-power-flow-full](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/bf119d16-b049-4bd9-8906-0c9697ab386d)





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
|card_height:| Optional | `396px` | Sets the card height in pixels `400px` |
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
|autarky:| Optional| `power`| Display autarky and ratio as a percentage using either realtime power or daily energy values. Set to `no` to hide (`energy/power/no`). <br />Autarky is the percentage of self sufficiency through Home Production. Ratio is the percentage of produced electricity used by the home. <br />It is calculated based on the formula below and borrowed from the [Power Distribution Card](https://github.com/JonahKr/power-distribution-card)  <br /><ul><li>Autarky in Percent = Home Production / Home Consumption </li><li>Ratio in Percent = Home Consumption / Home Production</li></ul>|


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
|full_capacity: | Optional| `80` | If SOC >= to this value the Fully Charged battery image will be shown. Accepts any value between 80-100|
|empty_capacity: | Optional | `30` | If SOC <= to this value the Empty battery image will be shown. Accepts any value between 1-30

### Solar
These attributes are only needed if `show_solar` is set to `yes` 
| Attribute | Requirement |Default | Description |
| --- | --- | --- |--- |
|colour:| Optional | `orange` | Changes the colour of all the solar card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional | `no` | Toggles the Daily Total (`yes/no`) |
|mppts: | **Required** | `two` | Specify the number of MPPT's in use `one`, `two`, `three` or `four` |
|animation_speed: | Optional | `9` | Set slowest animation speed in seconds, depending on Power produced | 
|max_power: | Optional | `8000` | Maximun Power draw to calculate animation speed |
|pv1_name: | Optional | `PV1` | Set the disaply name for MPPT1 |
|pv2_name: | Optional | `PV2` | Set the disaply name for MPPT2 |
|pv3_name: | Optional | `PV3` | Set the disaply name for MPPT3 |
|pv4_name: | Optional | `PV4` | Set the disaply name for MPPT4 |

### Load
| Attribute | Requirement | Default | Description |
| --- | --- | --- |--- |
|colour:| Optional |`'#5fb6ad'`| Changes the colour of all the load card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional |`no` | Toggles the Daily Total `yes/no` Only displayed if `show_aux` is set to `no` |
|show_aux: | Optional | `no` | Toggles the display of Aux (`yes/no`) |
|invert_aux: | Optional | `no` | Set to `yes` if your sensor provides a positive number for AUX input and negative number for AUX output  |
|animation_speed: | Optional | `8` | Set slowest animation speed in seconds, depending on Power draw | 
|max_power: | Optional | `8000` | Maximun Power draw to calculate animation speed |
|aux_name: | Optional | `Auxilary` | Set the display name for the Auxilary Load
|aux_type: | Optional | `default` | Changes the AUX image using preset or any mdi icon e.g. `mdi:ev-station`. Presets are: `gen`, `inverter` `default`, `oven`, `pump`, `aircon` and `boiler`.
|aux_colour:| Optional | `the load colour` | Changes the colour of all the AUX card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|aux_off_colour:| Optional| `the load colour` | Changes the colour of the AUX icon and label when disconnected. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|aux_loads:| Optional | `no` | Display additional loads on the AUX side (`no/one/two`)
|aux_load1_name: |Optional | | Set the display name for the AUX Load 1
|aux_load2_name: |Optional | | Set the display name for the AUX Load 2
|aux_load1_icon: | Optional | | Change the aux load 1 image using any mdi icon e.g. `mdi:ev-station`
|aux_load2_icon: | Optional | | Change the aux load 2 image using any mdi icon e.g. `mdi:ev-station`
|additional_loads: | Optional | `no` | Display additional loads on the essential side (`one/two/no`) 
|load1_name: | Optional |  | Set the display name for the Essential Load 1
|load2_name: | Optional |  | Set the display name for the Essential Load 2
|load1_icon: | Optional | none | Change the essential load 1 image using preset or any mdi icon e.g. `mdi:ev-station` Presets are: `boiler`, `pump`, `aircon`, `oven` |
|load2_icon: | Optional | none | Change the essential load 2 image using preset or any mdi icon e.g. `mdi:ev-station` Presets are: `boiler`, `pump`, `aircon`, `oven` |

### Grid
| Attribute | Requirement | Default | Description |
| --- | --- | --- | --- |
|colour:| Optional | `'#5490c2'`| Changes the colour of all the grid card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|no_grid_colour:| Optional | `'#a40013'`|Changes the colour of the grid disconnected icon. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc)|
|show_daily_buy: | Optional | `no` | Toggles the Daily Buy Total (`yes/no`) |
|show_daily_sell: | Optional | `no` | Toggles the Daily Sell Total (`yes/no`) |
|show_nonessential: | Optional |`yes` | Toggles the display of Non-Essential (`yes/no`)|
|nonessential_icon: | Optional | `default` | Change the nonessential image using presets or any mdi icon e.g. `mdi:ev-station`. Presets are: <br /> <img height="25px" src="https://api.iconify.design/mdi/house-import-outline.svg"> `default`  <img height="25px" src="https://api.iconify.design/fluent/oven-32-regular.svg"> `oven`, <img height="25px" src="https://api.iconify.design/material-symbols/water-heater.svg"> `boiler` </br> <br/> <img height="25px" src="https://api.iconify.design/material-symbols/water-pump-outline.svg"> `pump`,  <img height="25px" src="https://api.iconify.design/mdi/air-conditioner.svg"> `aircon` </br> |
|nonessential_name: | Optional | `Non Essential` |Set the display name for the Non-Essential Load
|additional_loads: | Optional |`no`| Toggle the display of additional loads on the non-essential side (`one/two/no`)
|load1_name: | Optional |  | Set the display name for the Non-Essential Load 1
|load2_name: | Optional |  |Set the display name for the Non-Essential Load 2
|load1_icon: | Optional | `default` | Change the nonessential load 1 image using presets or any mdi icon e.g. `mdi:ev-station`. Presets are: `default`, `oven`, `boiler`, `pump`, `aircon` |
|load2_icon: | Optional | `default` | Change the nonessential load 2 image using presets or any mdi icon e.g. `mdi:ev-station`. Presets are: `default`, `oven`, `boiler`, `pump`, `aircon` |
|invert_grid:| Optional | `no`| Set to `yes` if your sensor provides a negative number for Grid import and positive number for Grid export |
|animation_speed: | Optional | `8` | Set slowest animation speed in seconds, depending on Power draw | 
|max_power: | Optional | `8000` | Maximun Power draw to calculate animation speed |

### Entities
Entity attributes below have been appended with the modbus register # e.g. `pv2_power_187` to indicate which Sunsynk register should be read when configuring your sensors. Replace the default sensors with your own specific sensor names. It is important that your sensors read the expected modbus register value. If you have missing sensors for any attribute set it to none i.e. `day_pv_energy_108: none`. This will hide the sensor data from the card. To display a placeholder with a default value of 0 set it to `zero` or any other value i.e. `solarday_108: zero`.

See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki/Sensor-Mappings) for more information on sensor mappings if using other integration methods.

| Attribute |  Requirement | Default | Description |
| --- | --- | --- | --- |
|use_timer_248: | Optional | `switch.sunsynk_toggle_system_timer` | Displays "Use timer" status as an icon next to the inverter. Set to `no` to hide |
|priority_load_243: | Optional |`switch.sunsynk_toggle_priority_load` | Shows if energy pattern is set to Priority Load or Priority Battery as an icon next to the inverter. Set to `no` to hide|
|day_battery_discharge_71: | Optional |`ssensor.sunsynk_day_battery_discharge` | Daily Battery Usage (kWh) |
|day_battery_charge_70: | Optional |`sensor.sunsynk_day_battery_charge` | Daily Battery Charge (kWh) |
|day_load_energy_84: | Optional | `sensor.sunsynk_day_load_energy` | Daily Load (kWh) |
|day_grid_import_76: | Optional | `sensor.sunsynk_day_grid_import` | Daily Grid Import (kWh) |
|day_grid_export_77: | Optional | `sensor.sunsynk_day_grid_export` | Daily Grid Export (kWh) |
|day_pv_energy_108: | Optional | `sensor.sunsynk_day_pv_energy` | Daily Solar Usage (kWh |
|inverter_voltage_154: | Optional | `sensor.sunsynk_inverter_voltage` | Inverter Voltage (V) |
|load_frequency_192: | Optional | `sensor.sunsynk_load_frequency` | Load Frequency (Hz) |
|inverter_current_164: | Optional | `sensor.sunsynk_inverter_current` | Inverter Current (A) |
|inverter_power_175: | Optional | `sensor.sunsynk_inverter_power` | Inverter Power (W). Required if the essential_power attribute is set to `none` |
|grid_power_169: | Optional | `sensor.sunsynk_grid_power` | Grid Power (W) See NOTE below. Use **167** (Grid LD Power) if non-essential and essential readings are wrong. Required if the nonessential_power attribute is set to `none` |
|pv1_power_186: | Optional | `sensor.sunsynk_pv1_power` | PV String 1 Power (W)|
|pv2_power_187: | Optional | `sensor.sunsynk_pv2_power` | PV String 2 Power (W)  |
|pv3_power_188: | Optional | `sensor.sunsynk_pv3_power` | PV String 3 Power (W)  |
|pv4_power_189: | Optional | `sensor.sunsynk_pv4_power` | PV String 4 Power (W)  |
|pv_total:| Optional | `none` | Provide a sensor for total pv power. If omitted the card uses internal logic to calculate this based on the pv1-4 power (W)
|battery_voltage_183: | Optional | `sensor.sunsynk_battery_voltage` | Battery Voltage (V) |
|battery_soc_184: | **Required** | `sensor.sunsynk_battery_soc` | Battery State of Charge (%) |
|battery_power_190: | **Required** | `sensor.sunsynk_battery_power` | Battery Power (W). Requires a negative number for battery charging and a positive number for battery discharging. Set the `invert_power:` battery attribute to `yes` if your sensor reports this the other way around |
|battery_current_191: | **Required** |`sensor.sunsynk_battery_current` | Battery Current (A) | 
|essential_power: | Optional | `none` | The card will automatically calculate this sensor based on the formula below if the attribute is set to `none`. You can overide this by supplying a sensor that measures essential power e.g. `Load power Essential` in the case of Solar Assistant.  (W) |
|essential_load1: | Optional | | Sensor that contains the power of your essential load 1 (W)|
|essential_load2: | Optional | | Sensor that contains the power of your essential load 2 (W)|
|nonessential_power| Optional | `none`| The card will automatically calculate this sensor based on the formula below if the attribute is set to `none`. You can overide this by supplying a sensor that measures non-essential power e.g.  `Load power Non-Essential` in the case of Solar Assistant.  (W)
|non_essential_load1: | Optional | |Sensor that contains the power of your non-essential load 1 (W)|
|non_essential_load2: | Optional | |Sensor that contains the power of your non-essential load 2 (W)
|grid_ct_power_172: | **Required** | `sensor.sunsynk_grid_ct_power`  | Grid CT Power (W)|
|pv1_voltage_109: | Optional | `sensor.sunsynk_pv1_voltage` | PV String 1 Voltage (V) |
|pv1_current_110: | Optional | `sensor.sunsynk_pv1_current` | PV String 1 Current (A)|
|pv2_voltage_111: | Optional | `sensor.sunsynk_pv2_voltage` | PV String 2 Voltage (V)|
|pv2_current_112: | Optional | `sensor.sunsynk_pv2_current` | PV String 2 Current (A)|
|pv3_voltage_113: | Optional | `sensor.sunsynk_pv3_voltage` | PV String 3 Voltage (V) |
|pv3_current_114: | Optional | `sensor.sunsynk_pv3_current` | PV String 3 Current (A)|
|pv4_voltage_115: | Optional | `sensor.sunsynk_pv4_voltage` | PV String 4 Voltage (V)|
|pv4_current_116: | Optional | `sensor.sunsynk_pv4_current` | PV String 4 Current (A)|
|grid_connected_status_194: | Optional | `binary_sensor.sunsynk_grid_connected_status` | Grid Connected Status `on/off` or `1/0` |
|inverter_status_59: | Optional | `sensor.sunsynk_overall_state` | Inverter Status `0, 1, 2, 3, 4` or `standby, selftest, normal, alarm, fault` |
|aux_power_166: | Optional | `sensor.sunsynk_aux_power` | Auxilary Power (W) |
|aux_load1:| Optional |  | Sensor that contains the power of your AUX load 1 (W) |
|aux_load2:| Optional |  | Sensor that contains the power of your AUX load 2 (W) |
|aux_connected_status: |Optional | None | AUX Connected Status `on/off` or `1/0`
|remaining_solar: | Optional | `sensor.solcast_forecast_remaining_today`| The remaining solar forecast for the day (kWh) |
|battery_temp_182:| Optional | `sensor.sunsynk_battery_temperature` | Battery Temperature (℃)|
|radiator_temp_91:| Optional | `sensor.sunsynk_radiator_temperature` | Inverter AC Temperature (℃)|
|dc_transformer_temp_90:| Optional | `sensor.sunsynk_dc_transformer_temperature` | Inverter DC Temperature (℃)|
|prog1_time:| Optional | `sensor.sunsynk_time_slot_1` | Program 1 start time (`HH:MM`)
|prog1_capacity:| Optional | `number.sunsynk_system_mode_soc_time1` | Program 1 capacity (SOC) setting
|prog1_charge:| Optional | `switch.sunsynk_system_mode_grid_charge_time1` | Program 1 charge options (`on/off`, `1/0`, `No Grid or Gen`)
|prog2_time:| Optional | `sensor.sunsynk_time_slot_2` | Program 2 start time (`HH:MM`)
|prog2_capacity:| Optional | `number.sunsynk_system_mode_soc_time2` | Program 2 capacity (SOC) setting
|prog2_charge:| Optional | `switch.sunsynk_system_mode_grid_charge_time2` | Program 2 charge options (`on/off`, `1/0`, `No Grid or Gen`)
|prog3_time:| Optional | `sensor.sunsynk_time_slot_3` | Program 3 start time (`HH:MM`)
|prog3_capacity:| Optional | `number.sunsynk_system_mode_soc_time3` | Program 3 capacity (SOC) setting
|prog3_charge:| Optional | `switch.sunsynk_system_mode_grid_charge_time3` | Program 3 charge options (`on/off`, `1/0`, `No Grid or Gen`)
|prog4_time:| Optional | `sensor.sunsynk_time_slot_4` | Program 4 start time (`HH:MM`)
|prog4_capacity:| Optional | `number.sunsynk_system_mode_soc_time4` | Program 4 capacity (SOC) setting
|prog4_charge:| Optional | `switch.sunsynk_system_mode_grid_charge_time4` | Program 4 charge options (`on/off`, `1/0`, `No Grid or Gen`)
|prog5_time:| Optional | `sensor.sunsynk_time_slot_5` | Program 5 start time (`HH:MM`)
|prog5_capacity:| Optional | `number.sunsynk_system_mode_soc_time5` | Program 5 capacity (SOC) setting
|prog5_charge:| Optional | `switch.sunsynk_system_mode_grid_charge_time5` | Program 5 charge options (`on/off`, `1/0`, `No Grid or Gen`)
|prog6_time:| Optional | `sensor.sunsynk_time_slot_6` | Program 6 start time (`HH:MM`)
|prog6_capacity:| Optional | `number.sunsynk_system_mode_soc_time6` | Program 6 capacity (SOC) setting
|prog6_charge:| Optional | `switch.sunsynk_system_mode_grid_charge_time6` | Program 6 charge options (`on/off`, `1/0`, `No Grid or Gen`)
|energy_cost:| Optional | | Sensor that provides current energy cost per kWh
|solar_sell_247:|Optional | `switch.sunsynk_toggle_solar_sell` | Displays icons to indicate if sell solar is active or not. The switch can be toggled by clicking on the icon (`on/off`, `1/0`)
   
The card calculates the sensors below based on supplied attributes in the config so you dont need to define them in Home Assistant. NOTE if your essential and non-essential readings are innacurate replace sensor 169 with 167. Alternatively provide the card with sensors that calculate this data i.e essential_power: and nonessential_power:
 
 ```
 totalsolar = pv1_power_186 + pv2_power_187 + pv3_power_188 + pv4_power_189
 nonessential = grid_ct_power_172 - grid_power_169
 essential = inverter_power_175 + grid_power_169 - aux_power_166
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
  inverter_power_175: sensor.sunsynk_inverter_power
  grid_power_169: sensor.sunsynk_grid_power
  battery_soc_184: sensor.sunsynk_battery_soc
  battery_power_190: sensor.sunsynk_battery_power
  battery_current_191: sensor.sunsynk_battery_current
  grid_ct_power_172: sensor.sunsynk_grid_ct_power
```
#### Minimum Configuration (Solar) #####

```yaml
type: custom:sunsynk-power-flow-card
cardstyle: full
show_solar: 'yes'
solar:
  mppts: one
battery:
  energy: 15960
  shutdown_soc: 20
entities:
  inverter_power_175: sensor.sunsynk_inverter_power
  grid_power_169: sensor.sunsynk_grid_power
  battery_soc_184: sensor.sunsynk_battery_soc
  battery_power_190: sensor.sunsynk_battery_power
  battery_current_191: sensor.sunsynk_battery_current
  grid_ct_power_172: sensor.sunsynk_grid_ct_power
  pv1_power_186: sensor.sunsynk_pv1_power
```

#### Minimal Configuration (No Solar) #####

```yaml
type: custom:sunsynk-power-flow-card
cardstyle: full
show_solar: 'no'
battery:
  energy: 15960
  shutdown_soc: 20
entities:
  inverter_voltage_154: sensor.sunsynk_inverter_voltage
  load_frequency_192: sensor.sunsynk_load_frequency
  inverter_current_164: sensor.sunsynk_inverter_current
  inverter_power_175: sensor.sunsynk_inverter_power
  grid_power_169: sensor.sunsynk_grid_power
  battery_voltage_183: sensor.sunsynk_battery_voltage
  battery_soc_184: sensor.sunsynk_battery_soc
  battery_power_190: sensor.sunsynk_battery_power
  battery_current_191: sensor.sunsynk_battery_current
  grid_ct_power_172: sensor.sunsynk_grid_ct_power
  grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
  inverter_status_59: sensor.overall_state
```
#### Minimal Configuration (Solar) #####

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
  inverter_voltage_154: sensor.sunsynk_inverter_voltage
  load_frequency_192: sensor.sunsynk_load_frequency
  inverter_current_164: sensor.sunsynk_inverter_current
  inverter_power_175: sensor.sunsynk_inverter_power
  grid_power_169: sensor.sunsynk_grid_power
  battery_voltage_183: sensor.sunsynk_battery_voltage
  battery_soc_184: sensor.sunsynk_battery_soc
  battery_power_190: sensor.sunsynk_battery_power
  battery_current_191: sensor.sunsynk_battery_current
  grid_ct_power_172: sensor.sunsynk_grid_ct_power
  grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
  inverter_status_59: sensor.sunsynk_overall_state
  pv1_power_186: sensor.sunsynk_pv1_power
  pv2_power_187: sensor.sunsynk_pv2_power
  pv1_voltage_109: sensor.sunsynk_pv1_voltage
  pv1_current_110: sensor.sunsynk_pv1_current
  pv2_voltage_111: sensor.sunsynk_pv2_voltage
  pv2_current_112: sensor.sunsynk_pv2_current
```
#### Minimal Configuration (Solar + Daily Totals) #####

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
  inverter_voltage_154: sensor.sunsynk_inverter_voltage
  load_frequency_192: sensor.sunsynk_load_frequency
  inverter_current_164: sensor.sunsynk_inverter_current
  inverter_power_175: sensor.sunsynk_inverter_power
  grid_power_169: sensor.sunsynk_grid_power
  battery_voltage_183: sensor.sunsynk_battery_voltage
  battery_soc_184: sensor.sunsynk_battery_soc
  battery_power_190: sensor.sunsynk_battery_power
  battery_current_191: sensor.sunsynk_battery_current
  grid_ct_power_172: sensor.sunsynk_grid_ct_power
  grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
  inverter_status_59: sensor.sunsynk_overall_state
  pv1_power_186: sensor.sunsynk_pv1_power
  pv2_power_187: sensor.sunsynk_pv2_power
  pv1_voltage_109: sensor.sunsynk_pv1_voltage
  pv1_current_110: sensor.sunsynk_pv1_current
  pv2_voltage_111: sensor.sunsynk_pv2_voltage
  pv2_current_112: sensor.sunsynk_pv2_current
  day_pv_energy_108: sensor.sunsynk_day_pv_energy
  day_battery_charge_70: sensor.sunsynk_day_battery_charge
  day_battery_discharge_71: sensor.sunsynk_day_battery_discharge
  day_load_energy_84: sensor.sunsynk_day_load_energy
  day_grid_import_76: sensor.sunsynk_day_grid_import
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
  colour: grey
  autarky: 'power'
battery:
  energy: 15960
  shutdown_soc: 20
  invert_power: 'no'
  colour: pink
  show_daily: 'yes'
  animation_speed: 6
  max_power: 4500
  full_capacity: 80
  empty_capacity: 30
solar:
  colour: orange
  show_daily: 'yes'
  mppts: two
  animation_speed: 9
  max_power: 8000
  pv1_name: North
  pv2_name: North
  pv3_name: East
  pv4_name: West
load:
  colour: '#5fb6ad'
  show_daily: 'yes'
  show_aux: 'yes'
  invert_aux: 'no'
  aux_name: Generator
  aux_type: gen
  aux_colour: green
  aux_off_colour: red
  aux_loads: two
  aux_load1_name: Aux load 1
  aux_load2_name: Aux load 2
  aux_load1_icon: mdi:air-filter
  aux_load2_icon: mdi:stove
  animation_speed: 8
  max_power: 8000
  additional_loads: two
  load1_name: Geyser
  load2_name: Pool
  load1_icon: boiler
  load2_icon: mdi:pool
grid:
  colour: '#5490c2'
  show_daily_buy: 'yes'
  show_daily_sell: 'yes'
  no_grid_colour: '#a40013'
  show_nonessential: 'yes'
  invert_grid: 'no'
  nonessential_name: Non Essential
  nonessential_icon: oven
  additional_loads: two
  load1_name: Load 1
  load2_name: Load 2
  load1_icon: boiler
  load2_icon: mdi:ev-station
  animation_speed: 8
  max_power: 8000
entities:
  use_timer_248: switch.sunsynk_toggle_system_timer
  priority_load_243: switch.sunsynk_toggle_priority_load
  day_battery_charge_70: sensor.sunsynk_day_battery_charge
  day_battery_discharge_71: sensor.sunsynk_day_battery_discharge
  day_load_energy_84: sensor.sunsynk_day_load_energy
  day_grid_import_76: sensor.sunsynk_day_grid_import
  day_grid_export_77: sensor.sunsynk_day_grid_export
  day_pv_energy_108: sensor.sunsynk_day_pv_energy
  inverter_voltage_154: sensor.sunsynk_inverter_voltage
  load_frequency_192: sensor.sunsynk_load_frequency
  inverter_current_164: sensor.sunsynk_inverter_current
  inverter_power_175: sensor.sunsynk_inverter_power
  grid_power_169: sensor.sunsynk_grid_power
  pv1_power_186: sensor.sunsynk_pv1_power
  pv2_power_187: sensor.sunsynk_pv2_power
  pv3_power_188: none
  pv4_power_189: none
  pv_total: sensor.sunsynk_totalsolar
  pv1_voltage_109: sensor.sunsynk_pv1_voltage
  pv1_current_110: sensor.sunsynk_pv1_current
  pv2_voltage_111: sensor.sunsynk_pv2_voltage
  pv2_current_112: sensor.sunsynk_pv2_current
  pv3_voltage_113: none
  pv3_current_114: none
  pv4_voltage_115: none
  pv4_current_116: none
  battery_voltage_183: sensor.sunsynk_battery_voltage
  battery_soc_184: sensor.sunsynk_battery_soc
  battery_power_190: sensor.sunsynk_battery_power
  battery_current_191: sensor.sunsynk_battery_current
  essential_power: none
  essential_load1: sensor.tuya_geyser_current_consumption
  essential_load2: sensor.load2_power
  nonessential_power: none
  non_essential_load1: sensor.nonessential1_power
  non_essential_load2: sensor.nonessential2_power
  grid_ct_power_172: sensor.sunsynk_grid_ct_power
  grid_connected_status_194: binary_sensor.sunsynk_grid_connected_status
  inverter_status_59: sensor.sunsynk_overall_state
  aux_power_166: sensor.sunsynk_aux_power
  aux_connected_status: binary_sensor.sunsynk_aux_connected_status
  aux_load1: sensor.aux1_power
  aux_load2: sensor.aux2_power
  remaining_solar: sensor.solcast_forecast_remaining_today
  battery_temp_182: sensor.sunsynk_battery_temperature
  radiator_temp_91: sensor.sunsynk_radiator_temperature
  dc_transformer_temp_90: sensor.sunsynk_dc_transformer_temperature
  prog1_time: sensor.sunsynk_time_slot_1
  prog1_capacity: number.sunsynk_system_mode_soc_time1
  prog1_charge: switch.sunsynk_system_mode_grid_charge_time1
  prog2_time: sensor.sunsynk_time_slot_2
  prog2_capacity: number.sunsynk_system_mode_soc_time2
  prog2_charge: switch.sunsynk_system_mode_grid_charge_time2
  prog3_time: sensor.sunsynk_time_slot_3
  prog3_capacity: number.sunsynk_system_mode_soc_time3
  prog3_charge: switch.sunsynk_system_mode_grid_charge_time3
  prog4_time: sensor.sunsynk_time_slot_4
  prog4_capacity: number.sunsynk_system_mode_soc_time4
  prog4_charge: switch.sunsynk_system_mode_grid_charge_time4
  prog5_time: sensor.sunsynk_time_slot_5
  prog5_capacity: number.sunsynk_system_mode_soc_time5
  prog5_charge: switch.sunsynk_system_mode_grid_charge_time5
  prog6_time: sensor.sunsynk_time_slot_6
  prog6_capacity: number.sunsynk_system_mode_soc_time6
  prog6_charge: switch.sunsynk_system_mode_grid_charge_time6
  energy_cost: sensor.tibber_energy_cost
  solar_sell_247: switch.sunsynk_toggle_solar_sell
```
