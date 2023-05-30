# Sunsynk-Power-Flow-Card
An animated Home Assistant card to emulate the Sunsynk power flow that's shown on the Inverter screen. See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki) for integration methods and examples.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/slipx06/sunsynk-power-flow-card?style=for-the-badge)

## Features
* Option to switch between two card styles: `lite` or `full`.
* Animated power flow based on positive/negative/zero sensor values. (Supports inverted battery and AUX power).
* Dynamic battery image based on SOC (empty->low->medium->high). 
* Grid connected status.
* Inverter status (standby, normal, self-test, alarm, fault).  
* Configurable battery size and shutdown SOC to calculate and display remaining battery runtime based on current battery usage. Can be toggled off.
* Daily Totals that can be toggled on or off.
* Hide all solar data if not installed or specify number of mppts in use.
* "Use Timer" setting and "Energy Pattern" setting (Priority Load or Priority Battery) shown as dynamic icons with ability to hide if not required. If setup as switches can be toggled by clicking on the card
* Panel mode for bigger card
* AUX and Non-essential can be hidden from the full card.
* Customisable - Change colours and inverter image
* Most entities can be clicked to show more-info dialog

## Screenshots

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/7c05290e-1d8f-4b1b-b82a-134ebd90d29c)
![sunsynk-power-flow-lite](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/24a7367f-7593-4bf1-a83c-cdedf8a49622)


*Lite Version*

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/ed73cde6-6368-4969-b50a-8ca6b4ec894a)
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
|autarky:| Optional| `yes`| Display autarky and ratio as a prercentage. Set to `no` to hide (`yes/no`)|


### Battery
Note that the card will always display batter power as a positive number regardless of your sensor value. The animated dot will change direction depending on the charging or discharging state. The `invert_power` attribute can be used to reverse direction if needed by your sensor.

| Attribute | Requirement |Default | Description |
| --- | --- | --- |--- |
|energy: | **Required** | `15960` | Total Battery Energy in Wh (e.g. 3 x 5.32kWh = 15960). If set to `hidden` the remaining battery runtime will be hidden|
|shutdown_soc: | **Required** | `20` |The battery shutdown percentage used to calculate remaining runtime |
|invert_power:| Optional | `no`|Set to `yes` if your sensor provides a positive number for battery charge and negative number for battery discharge|
|colour:| Optional| `pink`| Changes the colour of all the battery card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional| `no` | Toggles the Daily Total (`yes/no`) |  

### Solar
These attributes are only needed if `show_solar` is set to `yes` 
| Attribute | Requirement |Default | Description |
| --- | --- | --- |--- |
|colour:| Optional | `orange` | Changes the colour of all the solar card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional | `no` | Toggles the Daily Total (`yes/no`) |
|mppts: | **Required** | `two` | Specify the number of MPPT's in use `one`, `two`, `three` or `four` |

### Load
| Attribute | Requirement | Default | Description |
| --- | --- | --- |--- |
|colour:| Optional |`'#5fb6ad'`| Changes the colour of all the load card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|show_daily: | Optional |`no` | Toggles the Daily Total `yes/no` Only displayed if `show_aux` is set to `no` |
|show_aux: | Optional | `no` | Toggles the display of Aux (`yes/no`) |
|invert_aux: | Optional | `no` | Set to `yes` if your sensor provides a positive number for AUX input and negative number for AUX output  |

### Grid
| Attribute | Requirement | Default | Description |
| --- | --- | --- | --- |
|colour:| Optional | `'#5490c2'`| Changes the colour of all the grid card objects. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc) |
|no_grid_colour:| Optional | `'#a40013'`|Changes the colour of the grid disconnected icon. Hex codes (`'#66ff00'` etc) or names (`red`, `green`, `blue` etc)|
|show_daily_buy: | Optional | `no` | Toggles the Daily Buy Total (`yes/no`) |
|show_daily_sell: | Optional | `no` | Toggles the Daily Sell Total (`yes/no`) |
|show_nonessential: | Optional |`yes` | Toggles the display of Non-Essential (`yes/no`)|

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
battery:
  energy: 15960
  shutdown_soc: 20
  invert_power: 'no'
  colour: pink
  show_daily: 'yes'
solar:
  colour: orange
  show_daily: 'yes'
  mppts: two
load:
  colour: '#5fb6ad'
  show_daily: 'yes'
  show_aux: 'yes'
  invert_aux: 'no'
grid:
  colour: '#5490c2'
  show_daily_buy: 'yes'
  show_daily_sell: 'yes'
  no_grid_colour: '#a40013'
  show_nonessential: 'no'
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
```
## Solarman ##
If you are using Solarman you can configre your card using the following sensors. You will also need to create the template sensors below for grid_status_194 and inverter_status_59.

#### Template Sensors ####
```yaml
sensors:
  sunsynkcard_gridstatus:
    friendly_name: Gridstatus
    value_template: |
      {% if is_state('sensor.solarman_grid_connected_status', 'On-Grid') %}
        1
      {% else %}
        0
      {% endif %}
  sunsynkcard_inverterstatus:
    friendly_name: InverterStatus
    value_template: |
      {% if is_state('sensor.solarman_running_status', 'Stand-by') %}
        0
      {% elif is_state('sensor.solarman_running_status', 'Self-Checking') %}
        1
      {% elif is_state('sensor.solarman_running_status', 'Normal') %}
        2
      {% elif is_state('sensor.solarman_running_status', 'Fault') %}
        4
      {% endif %}
```

#### Configuration (Solarman Sensors) #####
```yaml
type: custom:sunsynk-power-flow-card
cardstyle: lite
panel_mode: 'no'
show_solar: 'yes'
battery:
  energy: 15960
  shutdown_soc: 20
  show_daily: 'yes'
solar:
  show_daily: 'yes'
  mppts: two
load:
  show_daily: 'yes'
  show_aux: 'no'
grid:
  show_daily_buy: 'yes'
entities:
  batchargeday_70: sensor.solarman_daily_battery_charge
  batdischargeday_71: sensor.solarman_daily_battery_discharge
  loadday_84: sensor.solarman_daily_load_consumption
  grid_buy_day_76: sensor.solarman_daily_energy_bought
  grid_sell_day_77: sensor.solarman_daily_energy_sold
  solarday_108: sensor.solarman_daily_production
  inverter_grid_voltage_154: sensor.solarman_grid_voltage_l1
  inverter_load_freq_192: sensor.solarman_load_frequency
  inverter_out_164: sensor.solarman_current_l1
  inverter_out_175: sensor.solarman_total_power
  inverter_load_grid_169: sensor.solarman_total_load_power
  pv1_power_186: sensor.solarman_pv1_power
  pv2_power_187: sensor.solarman_pv2_power
  pv3_power_188: none
  pv4_power_189: none
  battery_voltage_183: sensor.solarman_battery_voltage
  battery_soc_184: sensor.solarman_battery_soc
  battery_out_190: sensor.solarman_battery_power
  essential_power: sensor.solarman_total_load_power
  battery_current_191: sensor.solarman_battery_current
  grid_external_power_172: sensor.solarman_total_grid_power
  pv1_v_109: sensor.solarman_pv1_voltage
  pv1_i_110: sensor.solarman_pv1_current
  pv2_v_111: sensor.solarman_pv2_voltage
  pv2_i_112: sensor.solarman_pv2_current
  pv3_v_113: none
  pv3_i_114: none
  pv4_v_115: none
  pv4_i_116: none
  grid_status_194: sensor.sunsynkcard_gridstatus
  inverter_status_59: sensor.solarman_running_status
  aux_power_166: sensor.aux_output_power
  ```
