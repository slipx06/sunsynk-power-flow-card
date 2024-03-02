##################
 Huawei Inverter
##################

.. note::

   Please report all feedback or Issues to the Discussion (Support Sections) of: https://github.com/Roving-Ronin/sunsynk-power-flow-card.

To use the Sunsynk card with Huawei Solar (or iStore in Australia) you need to copy the huawei_derived_sensors.yaml and sunsynk_card_derived_sensors.yaml files to your /homeassistant/packages directory. Upon restarting Home Assistant this will create all the required derived sensors, based upon the baseline sensors from the WLCRS integration, needed to populate the Sunsynk card. In addition to this, you will need to find an electricity_costs_xxx.yaml file that matches your electricity providers tariff plan, or is similiar and you can customise the 'Electrity - Price', 'Electricity - FIT' and 'Energy Meter' sections to reflect your rate plan costs and usage period(s), all these files are available from: https://github.com/slipx06/sunsynk-power-flow-card/tree/master/docs/examples/huawei_packages.

.. Required Sensor Groups::

Whilst it would be simplest to create the additional 'sensor groups' using yaml files, this has the disadvantage that if later on you want to add or remove devices individual sensors to/from these groups, you are unable to do so by editing them within Home Assistant GUI. Given the flexibility manually creating these sensors groups via the GUI provides, you will need to create the following groups (below) manually. This is done by going to Settings --> Devices & Services --> Helpers, clicking the 'Create Helper' button. From the choice of group types then select 'Sensor Group' and set the 'Type' to SUM. Follow the instructions below for the names to enter for the groups and the member/entities to add into each group.

..  csv-table:: REQUIRED MANUALLY CREATED SENSOR GROUPS:
    :header: "Group Name", "Entity ID", "Unit of Measurement"," "Purpose
    :widths: 30, 40, 5, 45

    "Sunsynk Card - AUX - Energy Daily", "sunsynk_card_aux_energy_daily", "kWh", "Required for the day_aux_energy entity, that shows the AUX Daily kWh consumed. Group should be populated with the daily energy sensors of all the devices monitored in AUX1 and AUX2"
    "Sunsynk Card - AUX - Active Power", "sunsynk_card_aux_active_power", "W", "Required for the aux_power_166 entity, that shows the total Active Power for AUX1 and AUX2. Group should be populated with the Active Power sensors of all the devices monitored in AUX1 and AUX2"
    "Sunsynk Card - Non Essential - Active Power", "sunsynk_card_non_essential_active_power", "W", "Required for the essential_power entity, that shows the tota Active Power for Non-Essential. Group should be populated with the Active Power sensors of all the non-essntial devices monitored, such as HVAC, EV Charger or Hot Power Pumps."

________________________

To work with the Sunsynk card and the additional derived sensors, some sensors that are disabled by default by the WLCRS integration, must be manually enabled. Listed below the the various devices and the list of sensors for each, that are required to be enabled (at a minimum).


..  csv-table:: POWER METER:
    :header: "Single Phase Installation", "Three phase Installation"
    
    "Active Power", "Active Power"
    "Consumption", "Consumption"
    "Current", "Current"
    "Exported", "Exported"
    "Frequency", "Frequency"
    "-", "Phase A - Active Power"
    "-", "Phase A - Current"
    "Voltage", "Phase A - Voltage"
    "-", "Phase B - Active Power"
    "-", "Phase B - Current"
    "-", "Phase B - Voltage"    
    "-", "Phase C - Active Power"
    "-", "Phase C - Current"
    "-", "Phase C - Voltage"
    "Power Factor", "Power Factor"

..  csv-table:: INVERTER(S):
    :header: "Single Phase Installation", "Three Phase Installation"
    
    "Active Power", "Active Power"
    "Daily Yield", "Daily Yield"
    "Day Active Peak Power", "Day Active Peak Power"
    "Efficiency", "Efficiency"
    "Input Power", "Input Power"
    "Internal Temperature", "Internal Temperature"
    "Phase A Current", "Phase A Current"
    "-", "Phase B Current"
    "-", "Phase C Current"
    "PV 1 Current", "PV 1 Current"
    "PV 1 Voltage", "PV 1 Voltage"
    "PV 2 Current", "PV 2 Current"
    "PV 2 Voltage", "PV 2 Voltage"
    "Total Yield", "Total Yield"

..  csv-table:: LUNA ESS BATTERY(S):
    :header: "Sensor", "Comment"
    
    "Bus Current", "-"
    "Bus Voltage", "-"
    "Capacity Control Periods", "Not used currently, future function envisioned"
    "Charge/Discharge Power", "-"
    "Day Charge", "-"
    "Day Discharge", "-"
    "Fixed Charging Periods", "-"
    "State of Capacity", "-"
    "Battery 1 Temperature", "-"
    "Battery 2 Temperature", "Optional"
    "Time of Use Periods", "Not used currently, future function envisioned"
    "Total Charge", "-"
    "Total Discharge", "-"

With these sensors active, you can then following the installation instructions for the Sunsynk card, however when you add the card to Home Assistant, change to the 'Show Code Editor' view and paste the example code below (that most closely matches your Huawei/iStore setup) into the editor, replacing all the default code shown. Finally, validate the example code copied from below, updating to suite your setup.

________________________

.. note::

   Data sources for the Sunsynk card is provided by the use of the WLCRS "Huawei Solar" integration - https://github.com/wlcrs/huawei_solar/wiki, as well as the Energy Meter integration https://github.com/zeronounours/HA-custom-component-energy-meter, must be installed prior to installing the Sunsynk card.


______________________________________________________________

***********************************************************************************************
Example 1 - 1 x L1 1phase inverter with a 15kWh LUNA ESS battery - 2 PV strings (6.6kW)
***********************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  panel_mode: false
  large_font: false
  title: Huawei - Power Monitor
  title_colour: White
  title_size: 18px
  show_solar: true
  show_grid: true
  show_battery: true
  decimal_places: 2
  dynamic_line_width: true
  inverter:
    modern: false
    colour: grey
    autarky: power
    auto_scale: true
    model: huawei
    three_phase: false
  battery:
    energy: 14850
    shutdown_soc: sensor.battery_end_of_discharge_soc
    invert_power: true
    colour: '#fc8d83'
    show_daily: true
    animation_speed: 5
    max_power: 5000
    show_absolute: true
    auto_scale: true
    hide_soc: false
    show_remaining_energy: true
    dynamic_colour: true
    linear_gradient: true
  solar:
    colour: '#F7BC00'
    show_daily: true
    mppts: 2
    animation_speed: 8
    max_power: 6600
    pv1_name: Inv1.S1
    pv2_name: Inv2.S1
    display_mode: 2
    auto_scale: true
  load:
    colour: magenta
    show_daily: true
    show_daily_aux: true
    show_aux: true
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: '#5490c2'
    aux_off_colour: brown
    aux_loads: 2
    aux_load1_name: IT - Servers
    aux_load2_name: IT - Network
    aux_load1_icon: mdi:server-network
    aux_load2_icon: mdi:network
    animation_speed: 4
    essential_name: Essential
    max_power: 4000
    additional_loads: 2
    load1_name: Lights
    load2_name: All GPO
    load3_name: Spare
    load4_name: Spare
    load1_icon: mdi:lightbulb
    load2_icon: mdi:power-plug
    load3_icon: mdi:water-boiler
    load4_icon: mdi:kettle
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
  grid:
    grid_name: Your-Grid-Name
    colour: '#FF2400'
    export_colour: green
    no_grid_colour: '#a40013'
    grid_off_colour: '#e7d59f'
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: true
    invert_grid: true
    nonessential_name: Non Essential
    nonessential_icon: none
    additional_loads: 2
    load1_name: HVAC
    load2_name: EV
    load1_icon: mdi:fan
    load2_icon: mdi:car
    animation_speed: 7
    max_power: 15000
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    energy_cost_decimals: 3
  entities:
    use_timer_248: null
    priority_load_243: null
    day_battery_charge_70: sensor.batteries_day_charge
    day_battery_discharge_71: sensor.batteries_day_discharge
    day_load_energy_84: sensor.house_consumption_energy_daily
    day_grid_import_76: sensor.hs_grid_imported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_pv_energy_108: sensor.inverters_daily_yield
    day_aux_energy: sensor.sunsynk_card_aux_energy_daily
    inverter_voltage_154: sensor.power_meter_voltage
    load_frequency_192: sensor.power_meter_frequency
    grid_power_169: sensor.house_consumption_power
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_1_pv_1_power
    pv2_power_187: sensor.inverter_1_pv_2_power
    environment_temp: sensor.<your_location>_temp
    remaining_solar: sensor.energy_production_today_remaining
    pv1_voltage_109: sensor.inverter_pv_1_voltage
    pv1_current_110: sensor.inverter_pv_1_current
    pv2_voltage_111: sensor.inverter_pv_2_voltage
    pv2_current_112: sensor.inverter_pv_2_current
    battery_voltage_183: sensor.batteries_bus_voltage
    battery_soc_184: sensor.batteries_state_of_capacity
    battery_power_190: sensor.batteries_charge_discharge_power
    battery_current_191: sensor.batteries_bus_current
    battery_temp_182: sensor.batteries_temperature
    battery_status: sensor.batteries_status
    essential_power: sensor.house_consumption_power_less_aux_non_essential
    essential_load1: sensor.lights_all_active_power
    essential_load2: sensor.gpo_all_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    nonessential_power: sensor.sunsynk_card_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_card_aux_active_power
    aux_connected_status: binary_sensor.sunsynk_card_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.garage_controller_bme280_temperature
    grid_voltage: sensor.power_meter_voltage



**************************************************************************************************
Example 2 - 2 x L1 1phase inverter with a 15kWh LUNA ESS battery - 4 PV strings (13.2kW)
**************************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  panel_mode: false
  large_font: false
  title: Huawei - Power Monitor
  title_colour: White
  title_size: 18px
  show_solar: true
  show_grid: true
  show_battery: true
  decimal_places: 2
  inverter:
    modern: false
    colour: grey
    autarky: power
    auto_scale: true
    model: huawei
    three_phase: false
  battery:
    energy: 14850
    shutdown_soc: sensor.battery_end_of_discharge_soc
    invert_power: true
    colour: '#fc8d83'
    show_daily: true
    animation_speed: 5
    max_power: 5000
    show_absolute: true
    auto_scale: true
    hide_soc: false
    show_remaining_energy: true
    dynamic_colour: true
    linear_gradient: true
  solar:
    colour: '#F7BC00'
    show_daily: true
    mppts: 4
    animation_speed: 8
    max_power: 13200
    pv1_name: Inv1.S1
    pv2_name: Inv2.S1
    pv3_name: Inv1.S2
    pv4_name: Inv2.S2
    display_mode: 2
  load:
    colour: magenta
    show_daily: true
    show_daily_aux: true
    show_aux: true
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: '#5490c2'
    aux_off_colour: brown
    aux_loads: 2
    aux_load1_name: IT - Servers
    aux_load2_name: IT - Network
    aux_load1_icon: mdi:server-network
    aux_load2_icon: mdi:network
    animation_speed: 4
    essential_name: Essential
    max_power: 4000
    additional_loads: 2
    load1_name: Lights
    load2_name: All GPO
    load3_name: Spare
    load4_name: Spare
    load1_icon: mdi:lightbulb
    load2_icon: mdi:power-plug
    load3_icon: mdi:water-boiler
    load4_icon: mdi:kettle
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
  grid:
    grid_name: Your-Grid-Name
    colour: '#FF2400'
    export_colour: green
    no_grid_colour: '#a40013'
    grid_off_colour: '#e7d59f'
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: true
    invert_grid: true
    nonessential_name: Non Essential
    nonessential_icon: none
    additional_loads: 2
    load1_name: HVAC
    load2_name: EV
    load1_icon: mdi:fan
    load2_icon: mdi:car
    animation_speed: 7
    max_power: 10000
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    energy_cost_decimals: 3
  entities:
    use_timer_248: null
    priority_load_243: null
    day_battery_charge_70: sensor.batteries_day_charge
    day_battery_discharge_71: sensor.batteries_day_discharge
    day_load_energy_84: sensor.house_consumption_energy_daily
    day_grid_import_76: sensor.hs_grid_imported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_pv_energy_108: sensor.inverters_daily_yield
    day_aux_energy: sensor.sunsynk_card_aux_energy_daily
    inverter_voltage_154: sensor.power_meter_voltage
    load_frequency_192: sensor.power_meter_frequency
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_1_pv_1_power
    pv2_power_187: sensor.inverter_1_pv_2_power
    pv3_power_188: sensor.inverter_2_pv_1_power
    pv4_power_189: sensor.inverter_2_pv_2_power
    environment_temp: sensor.<your_location>_temp
    remaining_solar: sensor.energy_production_today_remaining
    pv1_voltage_109: sensor.inverter_pv_1_voltage
    pv1_current_110: sensor.inverter_pv_1_current
    pv2_voltage_111: sensor.inverter_pv_2_voltage
    pv2_current_112: sensor.inverter_pv_2_current
    pv3_voltage_113: sensor.inverter_pv_1_voltage_2
    pv3_current_114: sensor.inverter_pv_1_current_2
    pv4_voltage_115: sensor.inverter_pv_2_voltage_2
    pv4_current_116: sensor.inverter_pv_2_current_2
    battery_voltage_183: sensor.batteries_bus_voltage
    battery_soc_184: sensor.batteries_state_of_capacity
    battery_power_190: sensor.batteries_charge_discharge_power
    battery_current_191: sensor.batteries_bus_current
    battery_temp_182: sensor.batteries_temperature
    battery_status: sensor.batteries_status
    essential_power: sensor.house_consumption_power_less_aux_non_essential
    essential_load1: sensor.lights_all_active_power
    essential_load2: sensor.gpo_all_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    nonessential_power: sensor.sunsynk_card_non_essential_active_power
    non_essential_load1: sensor.aircon_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_power_169: sensor.house_consumption_power
    grid_ct_power_172: sensor.power_meter_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_card_aux_active_power
    aux_connected_status: binary_sensor.sunsynk_card_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.garage_controller_bme280_temperature
    grid_voltage: sensor.power_meter_voltage


    
************************************************************************************************
Example 3 - 1 x M1 3phase inverter with a 15kWh LUNA ESS battery - 2 PV strings (10kW)
************************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  panel_mode: false
  large_font: false
  title: Huawei - Power Monitor
  title_colour: White
  title_size: 18px
  show_solar: true
  show_grid: true
  show_battery: true
  decimal_places: 2
  dynamic_line_width: true
  inverter:
    modern: false
    colour: grey
    autarky: power
    auto_scale: true
    model: huawei
    three_phase: true
  battery:
    energy: 14850
    shutdown_soc: sensor.battery_end_of_discharge_soc
    invert_power: true
    colour: '#fc8d83'
    show_daily: true
    animation_speed: 5
    max_power: 5000
    show_absolute: true
    auto_scale: true
    hide_soc: false
    show_remaining_energy: true
    dynamic_colour: true
    linear_gradient: true
  solar:
    colour: '#F7BC00'
    show_daily: true
    mppts: 2
    animation_speed: 8
    max_power: 10000
    pv1_name: Inv1.S1
    pv2_name: Inv2.S1
    display_mode: 2
    auto_scale: true
  load:
    colour: magenta
    show_daily: true
    show_daily_aux: true
    show_aux: true
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: '#5490c2'
    aux_off_colour: brown
    aux_loads: 2
    aux_load1_name: IT - Servers
    aux_load2_name: IT - Network
    aux_load1_icon: mdi:server-network
    aux_load2_icon: mdi:network
    animation_speed: 4
    essential_name: Essential
    max_power: 4000
    additional_loads: 2
    load1_name: Lights
    load2_name: All GPO
    load3_name: Spare
    load4_name: Spare
    load1_icon: mdi:lightbulb
    load2_icon: mdi:power-plug
    load3_icon: mdi:water-boiler
    load4_icon: mdi:kettle
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
  grid:
    grid_name: Your-Grid-Name
    colour: '#FF2400'
    export_colour: green
    no_grid_colour: '#a40013'
    grid_off_colour: '#e7d59f'
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: true
    invert_grid: true
    nonessential_name: Non Essential
    nonessential_icon: none
    additional_loads: 2
    load1_name: HVAC
    load2_name: EV
    load1_icon: mdi:fan
    load2_icon: mdi:car
    animation_speed: 7
    max_power: 25000
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    energy_cost_decimals: 3
  entities:
    use_timer_248: null
    priority_load_243: null
    day_battery_charge_70: sensor.batteries_day_charge
    day_battery_discharge_71: sensor.batteries_day_discharge
    day_load_energy_84: sensor.house_consumption_energy_daily
    day_grid_import_76: sensor.hs_grid_imported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_pv_energy_108: sensor.inverters_daily_yield
    day_aux_energy: sensor.sunsynk_card_aux_energy_daily
    inverter_voltage_154: sensor.power_meter_phase_a_voltage
    inverter_voltage_L2: sensor.power_meter_phase_b_voltage
    inverter_voltage_L3: sensor.power_meter_phase_c_voltage
    load_frequency_192: sensor.power_meter_frequency
    grid_power_169: sensor.house_consumption_power
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_current_L2: sensor.inverter_phase_b_current
    inverter_current_L3: sensor.inverter_phase_c_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_1_pv_1_power
    pv2_power_187: sensor.inverter_1_pv_2_power
    environment_temp: sensor.<your_location>_temp
    remaining_solar: sensor.energy_production_today_remaining
    pv1_voltage_109: sensor.inverter_pv_1_voltage
    pv1_current_110: sensor.inverter_pv_1_current
    pv2_voltage_111: sensor.inverter_pv_2_voltage
    pv2_current_112: sensor.inverter_pv_2_current
    battery_voltage_183: sensor.batteries_bus_voltage
    battery_soc_184: sensor.batteries_state_of_capacity
    battery_power_190: sensor.batteries_charge_discharge_power
    battery_current_191: sensor.batteries_bus_current
    battery_temp_182: sensor.batteries_temperature
    battery_status: sensor.batteries_status
    essential_power: sensor.house_consumption_power_less_aux_non_essential
    essential_load1: sensor.lights_all_active_power
    essential_load2: sensor.gpo_all_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    load_power_L1: sensor.shelly3em_phase_a_gpo_power
    load_power_L2: sensor.shelly3em_phase_b_gpo_power
    load_power_L3: sensor.shelly3em_phase_c_gpo_power
    nonessential_power: sensor.sunsynk_card_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_phase_a_active_power
    grid_ct_power_L2: sensor.power_meter_phase_b_active_power
    grid_ct_power_L3: sensor.power_meter_phase_c_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_card_aux_active_power
    aux_connected_status: binary_sensor.sunsynk_card_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.garage_controller_bme280_temperature
    grid_voltage: sensor.power_meter_voltage



***************************************************************************************************
Example 4 - 1 x M1 3phase inverters with 2 x 15kWh LUNA ESS batteries - 2 PV strings (10kW)
***************************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  panel_mode: false
  large_font: false
  title: Huawei - Power Monitor
  title_colour: White
  title_size: 18px
  show_solar: true
  show_grid: true
  show_battery: true
  decimal_places: 2
  dynamic_line_width: true
  inverter:
    modern: false
    colour: grey
    autarky: power
    auto_scale: true
    model: huawei
    three_phase: true
  battery:
    energy: 29700
    shutdown_soc: sensor.battery_end_of_discharge_soc
    invert_power: true
    colour: '#fc8d83'
    show_daily: true
    animation_speed: 5
    max_power: 10000
    show_absolute: true
    auto_scale: true
    hide_soc: false
    show_remaining_energy: true
    dynamic_colour: true
    linear_gradient: true
  solar:
    colour: '#F7BC00'
    show_daily: true
    mppts: 2
    animation_speed: 8
    max_power: 10000
    pv1_name: Inv1.S1
    pv2_name: Inv2.S1
    display_mode: 2
    auto_scale: true
  load:
    colour: magenta
    show_daily: true
    show_daily_aux: true
    show_aux: true
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: '#5490c2'
    aux_off_colour: brown
    aux_loads: 2
    aux_load1_name: IT - Servers
    aux_load2_name: IT - Network
    aux_load1_icon: mdi:server-network
    aux_load2_icon: mdi:network
    animation_speed: 4
    essential_name: Essential
    max_power: 4000
    additional_loads: 2
    load1_name: Lights
    load2_name: All GPO
    load3_name: Spare
    load4_name: Spare
    load1_icon: mdi:lightbulb
    load2_icon: mdi:power-plug
    load3_icon: mdi:water-boiler
    load4_icon: mdi:kettle
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
  grid:
    grid_name: Your-Grid-Name
    colour: '#FF2400'
    export_colour: green
    no_grid_colour: '#a40013'
    grid_off_colour: '#e7d59f'
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: true
    invert_grid: true
    nonessential_name: Non Essential
    nonessential_icon: none
    additional_loads: 2
    load1_name: HVAC
    load2_name: EV
    load1_icon: mdi:fan
    load2_icon: mdi:car
    animation_speed: 7
    max_power: 25000
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    energy_cost_decimals: 3
  entities:
    use_timer_248: null
    priority_load_243: null
    day_battery_charge_70: sensor.batteries_day_charge
    day_battery_discharge_71: sensor.batteries_day_discharge
    day_load_energy_84: sensor.house_consumption_energy_daily
    day_grid_import_76: sensor.hs_grid_imported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_pv_energy_108: sensor.inverters_daily_yield
    day_aux_energy: sensor.sunsynk_card_aux_energy_daily
    inverter_voltage_154: sensor.power_meter_phase_a_voltage
    inverter_voltage_L2: sensor.power_meter_phase_b_voltage
    inverter_voltage_L3: sensor.power_meter_phase_c_voltage
    load_frequency_192: sensor.power_meter_frequency
    grid_power_169: sensor.house_consumption_power
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_current_L2: sensor.inverter_phase_b_current
    inverter_current_L3: sensor.inverter_phase_c_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_1_pv_1_power
    pv2_power_187: sensor.inverter_1_pv_2_power
    pv3_power_188: sensor.inverter_2_pv_1_power
    pv4_power_189: sensor.inverter_2_pv_2_power
    environment_temp: sensor.<your_location>_temp
    remaining_solar: sensor.energy_production_today_remaining
    pv1_voltage_109: sensor.inverter_pv_1_voltage
    pv1_current_110: sensor.inverter_pv_1_current
    pv2_voltage_111: sensor.inverter_pv_2_voltage
    pv2_current_112: sensor.inverter_pv_2_current
    battery_voltage_183: sensor.batteries_bus_voltage
    battery_soc_184: sensor.batteries_state_of_capacity
    battery_power_190: sensor.batteries_charge_discharge_power
    battery_current_191: sensor.batteries_bus_current
    battery_temp_182: sensor.batteries_temperature
    battery_status: sensor.batteries_status
    essential_power: sensor.house_consumption_power_less_aux_non_essential
    essential_load1: sensor.lights_all_active_power
    essential_load2: sensor.gpo_all_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    load_power_L1: sensor.shelly3em_phase_a_gpo_power
    load_power_L2: sensor.shelly3em_phase_b_gpo_power
    load_power_L3: sensor.shelly3em_phase_c_gpo_power
    nonessential_power: sensor.sunsynk_card_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_phase_a_active_power
    grid_ct_power_L2: sensor.power_meter_phase_b_active_power
    grid_ct_power_L3: sensor.power_meter_phase_c_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_card_aux_active_power
    aux_connected_status: binary_sensor.sunsynk_card_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.garage_controller_bme280_temperature
    grid_voltage: sensor.power_meter_voltage


***************************************************************************************************
Example 5 - 2 x M1 3phase inverters with a 15kWh LUNA ESS battery - 4 PV strings (20kW)
***************************************************************************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: full
  panel_mode: false
  large_font: false
  title: Huawei - Power Monitor
  title_colour: White
  title_size: 18px
  show_solar: true
  show_grid: true
  show_battery: true
  decimal_places: 2
  dynamic_line_width: true
  inverter:
    modern: false
    colour: grey
    autarky: power
    auto_scale: true
    model: huawei
    three_phase: true
  battery:
    energy: 14850
    shutdown_soc: sensor.battery_end_of_discharge_soc
    invert_power: true
    colour: '#fc8d83'
    show_daily: true
    animation_speed: 5
    max_power: 5000
    show_absolute: true
    auto_scale: true
    hide_soc: false
    show_remaining_energy: true
    dynamic_colour: true
    linear_gradient: true
  solar:
    colour: '#F7BC00'
    show_daily: true
    mppts: 4
    animation_speed: 8
    max_power: 20000
    pv1_name: Inv1.S1
    pv2_name: Inv2.S1
    pv3_name: Inv1.S2
    pv4_name: Inv2.S2
    display_mode: 2
    auto_scale: true
  load:
    colour: magenta
    show_daily: true
    show_daily_aux: true
    show_aux: true
    invert_aux: false
    show_absolute_aux: false
    aux_name: Generator
    aux_type: gen
    aux_colour: '#5490c2'
    aux_off_colour: brown
    aux_loads: 2
    aux_load1_name: IT - Servers
    aux_load2_name: IT - Network
    aux_load1_icon: mdi:server-network
    aux_load2_icon: mdi:network
    animation_speed: 4
    essential_name: Essential
    max_power: 4000
    additional_loads: 2
    load1_name: Lights
    load2_name: All GPO
    load3_name: Spare
    load4_name: Spare
    load1_icon: mdi:lightbulb
    load2_icon: mdi:power-plug
    load3_icon: mdi:water-boiler
    load4_icon: mdi:kettle
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
  grid:
    grid_name: Your-Grid-Name
    colour: '#FF2400'
    export_colour: green
    no_grid_colour: '#a40013'
    grid_off_colour: '#e7d59f'
    show_daily_buy: true
    show_daily_sell: true
    show_nonessential: true
    invert_grid: true
    nonessential_name: Non Essential
    nonessential_icon: none
    additional_loads: 2
    load1_name: HVAC
    load2_name: EV
    load1_icon: mdi:fan
    load2_icon: mdi:car
    animation_speed: 7
    max_power: 25000
    auto_scale: true
    dynamic_icon: true
    dynamic_colour: true
    energy_cost_decimals: 3
  entities:
    use_timer_248: null
    priority_load_243: null
    day_battery_charge_70: sensor.batteries_day_charge
    day_battery_discharge_71: sensor.batteries_day_discharge
    day_load_energy_84: sensor.house_consumption_energy_daily
    day_grid_import_76: sensor.hs_grid_imported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_grid_export_77: sensor.hs_grid_exported_daily
    day_pv_energy_108: sensor.inverters_daily_yield
    day_aux_energy: sensor.sunsynk_card_aux_energy_daily
    inverter_voltage_154: sensor.power_meter_phase_a_voltage
    inverter_voltage_L2: sensor.power_meter_phase_b_voltage
    inverter_voltage_L3: sensor.power_meter_phase_c_voltage
    load_frequency_192: sensor.power_meter_frequency
    grid_power_169: sensor.house_consumption_power
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_current_L2: sensor.inverter_phase_b_current
    inverter_current_L3: sensor.inverter_phase_c_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_1_pv_1_power
    pv2_power_187: sensor.inverter_1_pv_2_power
    pv3_power_188: sensor.inverter_2_pv_1_power
    pv4_power_189: sensor.inverter_2_pv_2_power
    environment_temp: sensor.<your_location>_temp
    remaining_solar: sensor.energy_production_today_remaining
    pv1_voltage_109: sensor.inverter_pv_1_voltage
    pv1_current_110: sensor.inverter_pv_1_current
    pv2_voltage_111: sensor.inverter_pv_2_voltage
    pv2_current_112: sensor.inverter_pv_2_current
    pv3_voltage_113: sensor.inverter_pv_1_voltage_2
    pv3_current_114: sensor.inverter_pv_1_current_2
    pv4_voltage_115: sensor.inverter_pv_2_voltage_2
    pv4_current_116: sensor.inverter_pv_2_current_2
    battery_voltage_183: sensor.batteries_bus_voltage
    battery_soc_184: sensor.batteries_state_of_capacity
    battery_power_190: sensor.batteries_charge_discharge_power
    battery_current_191: sensor.batteries_bus_current
    battery_temp_182: sensor.batteries_temperature
    battery_status: sensor.batteries_status
    essential_power: sensor.house_consumption_power_less_aux_non_essential
    essential_load1: sensor.lights_all_active_power
    essential_load2: sensor.gpo_all_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    load_power_L1: sensor.shelly3em_phase_a_gpo_power
    load_power_L2: sensor.shelly3em_phase_b_gpo_power
    load_power_L3: sensor.shelly3em_phase_c_gpo_power
    nonessential_power: sensor.sunsynk_card_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_phase_a_active_power
    grid_ct_power_L2: sensor.power_meter_phase_b_active_power
    grid_ct_power_L3: sensor.power_meter_phase_c_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_card_aux_active_power
    aux_connected_status: binary_sensor.sunsynk_card_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.garage_controller_bme280_temperature
    grid_voltage: sensor.power_meter_voltage
