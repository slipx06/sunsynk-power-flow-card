# Sunsynk-Home-Assistant-Power-Flow-Card
An animated Home Assistant card to emulate the Sunsynk power flow that's show on the Inverter screen. The battery image will update based on SOC from empty->low->medium->high. The grid will display a red dot when disconnected and the inverter status (standby, normal, self-test, alarm, fault) is also displayed as a colour coded dot. There is an option to switch between three card styles: lite, simple or full as well as hide the daily totals

*Lite Version*

![image](https://user-images.githubusercontent.com/7227275/234655173-6a0cbae8-9198-4580-9676-1f836970f996.png)

*Simple Version*

![image](https://user-images.githubusercontent.com/7227275/234655405-85c4909c-ae73-488f-a106-45c6068fd790.png)

*Full Version*

![image](https://user-images.githubusercontent.com/7227275/234655663-117bffbd-6a4b-499b-83ed-df72a259a3c2.png)

If you want to try this card in Home Assistant follow these steps.

1. Create a new directory under www/community/ and name it sunsynk-power-flow-card. If you don't have HACS installed you can create directory directly under www and reference in step 3 below.
2. Copy the sunsynk-power-flow.js into the directory
3. Add the resource to your Dashboard 

![image](https://user-images.githubusercontent.com/7227275/234657217-05c7e10a-cc82-4277-a2c2-50bb2de0c599.png)

4. Add the Custom: Sunsynk Card to your Dashboard view. Select Show Code editor

![image](https://user-images.githubusercontent.com/7227275/234656611-b2102a54-f41d-4245-b460-efffa2d06554.png)

5. The card requires that you have all the sensors available. 

6. You may need to manaully create the following sensors in Home Assistant depending on how you are collecting the data
 
 ```
 sensor:
  - platform: template
    sensors:
      sunsynk_totalsolar:
        friendly_name: "Total Solar Generation"
        value_template: "{{ (states('sensor.pv1_power') | float(0) + states('sensor.pv2_power') | float(0)) | round(0) }}"
        unit_of_measurement: 'W'
      sunsynk_solar_load:
        friendly_name: "Solar Load"
        value_template: "{{ (states('sensor.daily_pv_power_kwh') | float(0) - states('sensor.battery_charge_day') | float(0)) |round(1) }}"
        unit_of_measurement: 'kWh'
        device_class: energy
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
