# Sunsynk-Home-Assistant-Power-Flow-Card
An animated Home Assistant card to emulate the Sunsynk power flow that's show on the Inverter screen. The battery image will update based on SOC from empty->low->medium->high. The grid will display a red dot when disconnected and the inverter status (standby, normal, self-test, alarm, fault) is also displayed as a colour coded dot. There is an option to switch between three card styles: lite, simple or full as well as hide the daily totals

*Lite Version*

![image](https://user-images.githubusercontent.com/7227275/234655173-6a0cbae8-9198-4580-9676-1f836970f996.png)

*Simple Version*

![image](https://user-images.githubusercontent.com/7227275/234655405-85c4909c-ae73-488f-a106-45c6068fd790.png)

*Full Version*

![image](https://user-images.githubusercontent.com/7227275/234655663-117bffbd-6a4b-499b-83ed-df72a259a3c2.png)

If you want to try this card in Home Assistant:

1. Create a new directory under www/community/ and name it sunsynk-power-flow-card. If you don't have HACS installed you can create directory directly under www and reference in step 3 below.
2. Copy the sunsynk-power-flow.js into the directory
3. Add the resource to your Dashboard 

![image](https://user-images.githubusercontent.com/7227275/234657217-05c7e10a-cc82-4277-a2c2-50bb2de0c599.png)

4. Add the Custom: Sunsynk Card to your Dashboard view. Select Show Code editor

![image](https://user-images.githubusercontent.com/7227275/234656611-b2102a54-f41d-4245-b460-efffa2d06554.png)

5. The card requires that you have all the sensors available. 

| Attribute | Default | Description |
| --- | --- | --- |
|type: | custom:sunsynk-power-flow-card | The custom card
|cardstyle: | lite | Selects the card layout that is used  (lite, simple, full) |
|dailyusage: | 'yes' | Toggles the Daily Totals (yes/no) |
|batdischargeday: | sensor.battery_discharge_day | Daily Battery Usage (kWh) |
|batchargeday: | sensor.battery_charge_day | Daily Battery Charge (kWh) |
|loadday: | sensor.daily_load_power_kwh | Daily Load (kWh) |
|gridday: | sensor.grid_import_day_buy | Daily Grid Import (kWh) |
|solarday: | sensor.daily_pv_power_kwh | Daily Solar Usage (kWh |
|inverter_grid_voltage_154: | sensor.grid_inverter_voltage | Grid Voltage (V) |
|inverter_load_freq_192: | sensor.load_frequency | Load Frequency (Hz) |
|inverter_out_164: | sensor.inverter_output_current | Inverter Output Current (A) |
|inverter_out_175: | sensor.inverter_output_power | Inverter Output Power (W) |
|inverter_load_grid_169: | sensor.grid_inverter_load | Inverter Load (W) |
|pv2_power_187: | sensor.pv2_power | PV String 1 Power (W)  |
|pv1_power_186: | sensor.pv1_power | PV String 2 Power (W)|
|pvtotal_power: | sensor.sunsynk_totalsolar | Total PV Power (W)  |
|battery_voltage_183: | sensor.battery_voltage | Battery Voltage (V) |
|battery_soc_184: | sensor.battery_soc | Battrery State of Charge (%) |
|battery_out_190: | sensor.battery_output_power | Battery Output Power (W) |
|ess_power: | sensor.sunsynk_essential_load | Essential Load Power (W) |
|grid_external_power_172: | sensor.grid_external_power  | Grid External Power (W)|
|pv1_v: | sensor.dc1_voltage | PV String 1 Voltage (V) |
|pv1_i: | sensor.dc1_current | Pv String 1 Current (A)|
|pv2_v: | sensor.dc2_voltage | PV String 2 Voltage (V)|
|pv2_i: | sensor.dc2_current | Pv String 2 Current (A)|
|grid_status: | binary_sensor.grid_connected_status | Grid Connected Status (on/off) |
|inverter_status: | sensor.overall_state | Inverter Status (0,1,2,3,4) |
|aux_power_166: | sensor.aux_output_power | Auxilary Power (W) |
|non_ess_power: | sensor.sunsynk_non_essential_load | Non Essential Power (W) |

6. You may need to manaully create the following sensors in Home Assistant depending on how you are collecting the data
 
 ```
 sensor:
  - platform: template
    sensors:
      sunsynk_totalsolar:
        friendly_name: "Total Solar Generation"
        value_template: "{{ (states('sensor.pv1_power') | float(0) + states('sensor.pv2_power') | float(0)) | round(0) }}"
        unit_of_measurement: 'W'
      sunsynk_essential_load:
        friendly_name: "Essential Load"
        value_template: "{{ (states('sensor.inverter_output_power') |float(0)  - (states('sensor.aux_output_power') |float(0) - states('sensor.grid_inverter_load') |float(0) )) | round(0)}}"
        unit_of_measurement: 'W'
        device_class: power
      sunsynk_non_essential_load:
        friendly_name: "Non Essential Load"
        value_template: "{{ (states('sensor.grid_external_power') |float(0)  - states('sensor.grid_inverter_load') |float(0)) | round(0)}}"
        unit_of_measurement: "W"
        device_class: power
 ```
