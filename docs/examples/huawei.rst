#######################################
 Huawei Inverters & LUNA ESS Batteries
#######################################

Data sources for the Sunsynk card for users of Huawei Solar (or iStore in Australia) is provided by the use of the [WLCRS "Huawei Solar" Integration](https://github.com/wlcrs/huawei_solar/wiki). 
This integration as well as the [Energy Meter integration](https://github.com/zeronounours/HA-custom-component-energy-meter), must be installed prior to installing the Sunsynk card

.. note::

   THIS EXAMPLE IS CURRENTLY IN DRAFT MODE.

An additional yamls are still pending for creating example eletricity tariffs, that leverage the [energy_meter integration](https://github.com/zeronounours/HA-custom-component-energy-meter).
With this installed, using HACS, 

.. note::
    
   Solar 'max_power' is based upon 6.6kW or 9kW of panels per inverter, please update to reflect actual panels total capacity.


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
    shutdown_soc: 15
    invert_power: true
    colour: '#FF6984'
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
    aux_colour: lime
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
    export_colour: lime
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
    day_aux_energy: sensor.sunsynk_power_flow_card_aux_devices_energy_daily
    inverter_voltage_154: sensor.power_meter_voltage
    load_frequency_192: sensor.power_meter_frequency
    grid_power_169: sensor.house_consumption_power
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_pv_1_power
    pv2_power_187: sensor.inverter_pv_2_power
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
    essential_power: sensor.house_consumption_power_less_known
    essential_load1: sensor.all_lights_active_power
    essential_load2: sensor.all_gpo_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    nonessential_power: sensor.sunsynk_power_flow_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_power_flow_aux_devices_active_power
    aux_connected_status: binary_sensor.sunsynk_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.env_server_rack_bme280_temperature
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
    shutdown_soc: 15
    invert_power: true
    colour: '#FF6984'
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
    aux_colour: lime
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
    export_colour: lime
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
    day_aux_energy: sensor.sunsynk_power_flow_card_aux_devices_energy_daily
    inverter_voltage_154: sensor.power_meter_voltage
    load_frequency_192: sensor.power_meter_frequency
    inverter_current_164: sensor.inverter_phase_a_current
    inverter_power_175: sensor.inverters_active_power
    inverter_status_59: sensor.inverters_state
    radiator_temp_91: null
    dc_transformer_temp_90: sensor.inverters_internal_temperature
    pv1_power_186: sensor.inverter_pv_1_power
    pv2_power_187: sensor.inverter_pv_2_power
    pv3_power_188: sensor.inverter_pv_1_power_2
    pv4_power_189: sensor.inverter_pv_2_power_2
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
    essential_load1: sensor.all_lights_active_power
    essential_load2: sensor.gpo_all_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    nonessential_power: sensor.sunsynk_power_flow_non_essential_active_power
    non_essential_load1: sensor.aircon_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_power_169: sensor.house_consumption_power
    grid_ct_power_172: sensor.power_meter_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_power_flow_aux_devices_active_power
    aux_connected_status: binary_sensor.sunsynk_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.env_server_rack_bme280_temperature
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
    shutdown_soc: 15
    invert_power: true
    colour: '#FF6984'
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
    aux_colour: lime
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
    export_colour: lime
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
    day_aux_energy: sensor.sunsynk_power_flow_card_aux_devices_energy_daily
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
    pv1_power_186: sensor.inverter_pv_1_power
    pv2_power_187: sensor.inverter_pv_2_power
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
    essential_load1: sensor.all_lights_active_power
    essential_load2: sensor.all_gpo_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    load_power_L1: sensor.shelly3em_phase_a_gpo_power
    load_power_L2: sensor.shelly3em_phase_b_gpo_power
    load_power_L3: sensor.shelly3em_phase_c_gpo_power
    nonessential_power: sensor.sunsynk_power_flow_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_phase_a_active_power
    grid_ct_power_L2: sensor.power_meter_phase_b_active_power
    grid_ct_power_L3: sensor.power_meter_phase_c_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_power_flow_aux_devices_active_power
    aux_connected_status: binary_sensor.sunsynk_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.env_server_rack_bme280_temperature
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
    shutdown_soc: 15
    invert_power: true
    colour: '#FF6984'
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
    aux_colour: lime
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
    export_colour: lime
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
    day_aux_energy: sensor.sunsynk_power_flow_card_aux_devices_energy_daily
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
    pv1_power_186: sensor.inverter_pv_1_power
    pv2_power_187: sensor.inverter_pv_2_power
    pv3_power_188: sensor.inverter_pv_1_power_2
    pv4_power_189: sensor.inverter_pv_2_power_2
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
    essential_load1: sensor.all_lights_active_power
    essential_load2: sensor.all_gpo_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    load_power_L1: sensor.shelly3em_phase_a_gpo_power
    load_power_L2: sensor.shelly3em_phase_b_gpo_power
    load_power_L3: sensor.shelly3em_phase_c_gpo_power
    nonessential_power: sensor.sunsynk_power_flow_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_phase_a_active_power
    grid_ct_power_L2: sensor.power_meter_phase_b_active_power
    grid_ct_power_L3: sensor.power_meter_phase_c_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_power_flow_aux_devices_active_power
    aux_connected_status: binary_sensor.sunsynk_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.env_server_rack_bme280_temperature
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
    shutdown_soc: 15
    invert_power: true
    colour: '#FF6984'
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
    aux_colour: lime
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
    export_colour: lime
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
    day_aux_energy: sensor.sunsynk_power_flow_card_aux_devices_energy_daily
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
    pv1_power_186: sensor.inverter_pv_1_power
    pv2_power_187: sensor.inverter_pv_2_power
    pv3_power_188: sensor.inverter_pv_1_power_2
    pv4_power_189: sensor.inverter_pv_2_power_2
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
    essential_load1: sensor.all_lights_active_power
    essential_load2: sensor.all_gpo_active_power_less_known
    essential_load1_extra: null
    essential_load2_extra: null
    load_power_L1: sensor.shelly3em_phase_a_gpo_power
    load_power_L2: sensor.shelly3em_phase_b_gpo_power
    load_power_L3: sensor.shelly3em_phase_c_gpo_power
    nonessential_power: sensor.sunsynk_power_flow_non_essential_active_power
    non_essential_load1: sensor.hvac_active_power
    non_essential_load2: sensor.ev_charger_active_power
    grid_ct_power_172: sensor.power_meter_phase_a_active_power
    grid_ct_power_L2: sensor.power_meter_phase_b_active_power
    grid_ct_power_L3: sensor.power_meter_phase_c_active_power
    grid_ct_power_total: sensor.power_meter_active_power
    grid_connected_status_194: sensor.inverters_off_grid_status
    aux_power_166: sensor.sunsynk_power_flow_aux_devices_active_power
    aux_connected_status: binary_sensor.sunsynk_aux_connected_status
    energy_cost_buy: sensor.electricity_price
    energy_cost_sell: sensor.electricity_fit
    solar_sell_247: switch.null
    aux_load1: sensor.it_hardware_network_active_power
    aux_load2: sensor.it_hardware_servers_active_power
    aux_load1_extra: sensor.env_network_rack_bme280_temperature
    aux_load2_extra: sensor.env_server_rack_bme280_temperature
    grid_voltage: sensor.power_meter_voltage
