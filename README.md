# Sunsynk-Home-Assistant-Power-Flow-Card
An animated Home Assistant card to emulate the Sunsynk power flow that's show on the Inverter screen. The battery image will update based on SOC from empty->low->medium->high. The grid will display a red dot when disconnected and the inverter status (standby, normal, self-test, alarm, fault) is also displayed as a colour coded dot. There is an option to switch between three card styles: lite, simple or full. The remaining battery runtime at the current battery usage is displayed together with Daily totals. Both of these can be toggled on or off.

*Lite Version*

![image](https://user-images.githubusercontent.com/7227275/234833282-70399203-47d7-47d5-b6e1-ff8ef8518800.png)

*Simple Version*

![image](https://user-images.githubusercontent.com/7227275/234833488-e6c3c9ab-d22a-4d22-8319-8be9016e96f8.png)

*Full Version*

![image](https://user-images.githubusercontent.com/7227275/234833660-89a2a805-09c3-49d3-8550-febaebeae645.png)

If you want to try this card in Home Assistant:

1. Create a new directory under www/community/ and name it sunsynk-power-flow-card. If you don't have HACS installed you can create directory directly under www and reference in step 3 below.
2. Copy the sunsynk-power-flow.js into the directory
3. Add the resource to your Dashboard 

![image](https://user-images.githubusercontent.com/7227275/234657217-05c7e10a-cc82-4277-a2c2-50bb2de0c599.png)

4. Add the Custom: Sunsynk Card to your Dashboard view. Select Show Code editor

![image](https://user-images.githubusercontent.com/7227275/234855970-5d7f2d41-1bc9-480e-9c62-0ddb45c7cb9a.png)

5. The card requires that all of these attributes be defined. If you have missing sensors for any attribute set it to null i.e. "solarday: null" and it will use a default value of 0. Attributes have been appended with the modbus register # e.g. pv2_power_187 to indicate which register should be read when configuring your sensors

| Attribute | Default | Description |
| --- | --- | --- |
|type: | custom:sunsynk-power-flow-card | The custom card
|cardstyle: | lite | Selects the card layout that is used  (lite, simple, full) |
|dailyusage: | 'yes' | Toggles the Daily Totals (yes/no) |
|battery_energy: | 15960 | Total Battery Energy in Wh (e.g. 3 x 5.32kWh = 15960) or set to "hidden" to hide|
|batdischargeday_71: | sensor.battery_discharge_day | Daily Battery Usage (kWh) |
|batchargeday_70: | sensor.battery_charge_day | Daily Battery Charge (kWh) |
|loadday_84: | sensor.daily_load_power_kwh | Daily Load (kWh) |
|gridday_76: | sensor.grid_import_day_buy | Daily Grid Import (kWh) |
|solarday_108: | sensor.daily_pv_power_kwh | Daily Solar Usage (kWh |
|inverter_grid_voltage_154: | sensor.grid_inverter_voltage | Grid Voltage (V) |
|inverter_load_freq_192: | sensor.load_frequency | Load Frequency (Hz) |
|inverter_out_164: | sensor.inverter_output_current | Inverter Output Current (A) |
|inverter_out_175: | sensor.inverter_output_power | Inverter Output Power (W) |
|inverter_load_grid_169: | sensor.grid_inverter_load | Inverter Load (W) |
|pv2_power_187: | sensor.pv2_power | PV String 1 Power (W)  |
|pv1_power_186: | sensor.pv1_power | PV String 2 Power (W)|
|battery_voltage_183: | sensor.battery_voltage | Battery Voltage (V) |
|battery_soc_184: | sensor.battery_soc | Battery State of Charge (%) |
|battery_out_190: | sensor.battery_output_power | Battery Output Power (W) |
|ess_power: | sensor.sunsynk_essential_load | THis sensor is only used for the simple and lite cards. You can use register 178. It is automatically calculated for the full card based on other attributes. (W) |
|grid_external_power_172: | sensor.grid_external_power  | Grid External Power (W)|
|pv1_v_109: | sensor.dc1_voltage | PV String 1 Voltage (V) |
|pv1_i_110: | sensor.dc1_current | Pv String 1 Current (A)|
|pv2_v_111: | sensor.dc2_voltage | PV String 2 Voltage (V)|
|pv2_i_112: | sensor.dc2_current | PV String 2 Current (A)|
|grid_status_194: | binary_sensor.grid_connected_status | Grid Connected Status (on/off) |
|inverter_status_59: | sensor.overall_state | Inverter Status (0,1,2,3,4) |
|aux_power_166: | sensor.aux_output_power | Auxilary Power (W) |

6. The card calculates the sensors below based on supplied attribues in the config so you dont need to define them in Home Assistant
 
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
