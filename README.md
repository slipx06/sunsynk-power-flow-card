# Sunsynk-Home-Assistant-Power-Flow-Card
A Home Assistant card to emulate the Sunsynk power flow thats show on the Inverter screen. There is also an animated version of the card that emulates power flow based on sensor conditions i.e. Power flowing to the battery or from the battery. The battery image will update based on SOC from empty->low->medium->high. The grid will display a red dot when disconnected and the inverter status (standby, normal, self-test, alarm, fault) is also displayed as a colour coded dot.

Credits to iphong for his lovelace custom card approach and code. https://github.com/iphong/web-components/tree/master/src

*Lite Animated Version*

![image](https://user-images.githubusercontent.com/7227275/233426874-15e43f8b-7770-47df-a641-92010ce749a1.png)

*Simple Animated Version*

![image](https://user-images.githubusercontent.com/7227275/225121107-5830cf18-1e5a-40be-ad51-af0b59e44d97.png)

*Full Static Version*

![image](https://user-images.githubusercontent.com/7227275/224840218-0e450540-7870-46fd-a0bf-53352a6413d2.png)

*Power Flows*

![sunsynk-lite](https://user-images.githubusercontent.com/7227275/226348214-98dc4307-aac0-443c-83ce-b4ee6fffa69c.svg)

![Sunsynk-simple-animated](https://user-images.githubusercontent.com/7227275/224926146-ce121e6d-75a6-4299-ae61-52536937bb1b.svg)

![Sunsynk-full-animated](https://user-images.githubusercontent.com/7227275/224926168-f1c1441c-67c7-4b72-a289-9a4cba3cc1c9.svg)


If you want to try this card in Home Assistant follow these steps.

1. Create a new directory under www/community/ and name it sunsynk-card. If you don't have HACS installed you can create directory directly under www and reference in step 3 below.
2. Copy the sunsynkcard.js into the directory
3. Add the resource to your Dashboard 

![image](https://user-images.githubusercontent.com/7227275/224839022-a08f7819-59e2-420b-82e3-354052de1f19.png)

4. Add the Custom: Sunsynk Card to your Dashboard view. Select Show Code editor

![image](https://user-images.githubusercontent.com/7227275/224839119-278e002b-4465-4e9e-b87c-8e15f6067ef4.png)

5. Replace all the code with the contents of the applicable card configuration file. Choose either the static or animated card and the varient i.e. lite, simple or full configuration files. See images above

![image](https://user-images.githubusercontent.com/7227275/224839288-6ca158f8-fdc7-4f72-a2b8-7e1f1854e3c4.png)

6. Scroll down to bindings and replace the sensors with your own
```
bindings:
  - bind: return hass.states["sensor.pv1_power"].state + ' W'
    selector: '#pv1_power_186'
    type: html
  - bind: return hass.states["sensor.pv2_power"].state + ' W'
    selector: '#pv2_power_187'
    type: html
  - bind: return hass.states["sensor.sunsynk_totalsolar"].state + ' W'
    selector: '#pvtotal_power'
    type: html
  - bind: return hass.states["sensor.battery_voltage"].state + ' V'
    selector: '#battery_voltage_183'
    type: html
  - bind: return hass.states["sensor.battery_soc"].state + ' %'
    selector: '#battery_soc_184'
    type: html
  - bind: return hass.states["sensor.battery_output_power"].state + ' W'
    selector: '#battery_out_190'
    type: html
  - bind: return hass.states["sensor.inverter_output_power"].state + ' W'
    selector: '#inverter_out_175'
    type: html
  - bind: return hass.states["sensor.inverter_output_current"].state + ' A'
    selector: '#inverter_out_164'
    type: html
  - bind: return hass.states["sensor.aux_output_power"].state + ' W'
    selector: '#aux_power_166'
    type: html
  - bind: return hass.states["sensor.sunsynk_essential_load"].state + ' W'
    selector: '#ess_power'
    type: html
  - bind: return hass.states["sensor.grid_inverter_voltage"].state + ' V'
    selector: '#inverter_grid_voltage_154'
    type: html
  - bind: return hass.states["sensor.load_frequency"].state + ' Hz'
    selector: '#inverter_load_freq_192'
    type: html
  - bind: return hass.states["sensor.grid_inverter_load"].state + ' W'
    selector: '#inverter_load_grid_167'
    type: html
  - bind: return hass.states["sensor.grid_external_power"].state + ' W'
    selector: '#grid_external_power_172'
    type: html
  - bind: >-
      return parseInt(hass.states["sensor.grid_external_power"].state) -
      parseInt(hass.states["sensor.grid_inverter_load"].state) + ' W'
    selector: '#non_ess_power'
    type: html
  - bind: >-
      return hass.states["sensor.overall_state"].state == "0" ? "blue" :
      "transparent"
    selector: '#standby'
    type: fill
  - bind: >-
      return hass.states["sensor.overall_state"].state == "1" ? "yellow" :
      "transparent"
    selector: '#selftest'
    type: fill
  - bind: >-
      return hass.states["sensor.overall_state"].state == "2" ? "green" :
      "transparent"
    selector: '#normal'
    type: fill
  - bind: >-
      return hass.states["sensor.overall_state"].state == "3" ? "orange" :
      "transparent"
    selector: '#alarm'
    type: fill
  - bind: >-
      return hass.states["sensor.overall_state"].state == "4" ? "red" :
      "transparent"
    selector: '#fault'
    type: fill
  - bind: >-
      return hass.states["binary_sensor.grid_connected_status"].state == "off" ?
      "red" : "transparent"
    selector: '#grid'
    type: fill
 ```
 
 7. You may need to manaully create the following sensors in Home Assistant depending on how you are collecting the data
 
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
 ```
