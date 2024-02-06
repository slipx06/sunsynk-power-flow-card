################
Solis Inverter
################

******************************************************************************************
Example 1 - Integration via https://github.com/wills106/homeassistant-solax-modbus
******************************************************************************************

.. code-block:: yaml
  :linenos:

    type: custom:sunsynk-power-flow-card
    cardstyle: lite
    show_solar: true
    large_font: true
    inverter:
      modern: true
      autarky: energy
    battery:
      energy: 14400
      shutdown_soc: 20
      show_daily: true
    solar:
      show_daily: true
      mppts: 1
    load:
      show_daily: true
      additional_loads: 2
      load1_name: PC
      load1_icon: mdi:desktop-classic
      load2_name: TV
      load2_icon: mdi:television
    grid:
      show_daily_buy: true
      show_daily_sell: true
      show_nonessential: false
    entities:
      grid_power_167: sensor.solis_inverter_meter_active_power
      essential_power: sensor.solis_inverter_house_load
      essential_load1: sensor.pc_socket_power
      essential_load2: sensor.smart_socket_3_power
      energy_cost_buy: sensor.octopus_energy_electricity_xxxxx_xxxxxx_current_rate
      energy_cost_sell: sensor.octopus_energy_electricity_xxxxxx_xxxxx_export_current_rate
      remaining_solar: sensor.energy_production_today_remaining
      radiator_temp_91: sensor.solis_inverter_inverter_temperature
      use_timer_248: switch.sunsynk_toggle_system_timer
      inverter_voltage_154: sensor.solis_inverter_inverter_voltage
      load_frequency_192: sensor.solis_inverter_inverter_frequency
      inverter_current_164: sensor.solis_inverter_inverter_current
      inverter_power_175: sensor.solis_inverter_active_power
      day_battery_charge_70: sensor.solis_inverter_battery_charge_today
      day_battery_discharge_71: sensor.solis_inverter_battery_discharge_today
      battery_voltage_183: sensor.solis_inverter_battery_voltage
      battery_soc_184: sensor.solis_inverter_battery_soc
      battery_power_190: sensor.battery_load
      battery_current_191: sensor.solis_inverter_battery_current
      day_grid_import_76: sensor.solis_inverter_grid_import_today
      day_grid_export_77: sensor.solis_inverter_grid_export_today
      grid_ct_power_172: sensor.solis_inverter_meter_active_power
      day_load_energy_84: sensor.solis_inverter_house_load_today
      day_pv_energy_108: sensor.solis_inverter_power_generation_today
      pv1_power_186: sensor.solis_inverter_pv_total_power
      pv1_voltage_109: sensor.solis_inverter_pv_voltage_1
      pv1_current_110: sensor.solis_inverter_pv_current_1
******************************************************************************************
Example 2 (Solis S6 or S2-WL-ST) - Integration via https://github.com/Pho3niX90/solis_modbus
******************************************************************************************
.. code-block:: yaml
  :linenos:

    type: custom:sunsynk-power-flow-card
    view_layout:
      grid-area: flow
    cardstyle: lite
    large_font: true
    show_solar: true
    panel_mode: true
    card_height: 415px
    inverter:
      model: solis
      modern: false
      colour: '#959595'
      autarky: 'no'
    solar:
      mppts: 2
      show_daily: false
      colour: '#F4C430'
      animation_speed: 9
      max_power: 9600
      pv1_name: West
      pv2_name: North
    battery:
      energy: 14280
      shutdown_soc: 20
      show_daily: true
      colour: pink
      animation_speed: 6
      max_power: 6000
    load:
      show_aux: false
      show_daily: true
      animation_speed: 8
      max_power: 6000
      additional_loads: 2
      load2_name: Geyser
      load2_icon: mdi:heating-coil
      load1_name: Pool
      load1_icon: mdi:pool
    grid:
      show_daily_buy: true
      no_grid_colour: red
      animation_speed: 8
      max_power: 6000
      invert_grid: true
    entities:
      dc_transformer_temp_90: sensor.solis_inverter_temperature
      day_battery_charge_70: sensor.solis_inverter_today_battery_charge_energy
      day_battery_discharge_71: sensor.solis_inverter_today_battery_discharge_energy
      day_load_energy_84: sensor.solis_inverter_today_energy_consumption
      day_grid_import_76: sensor.solis_inverter_today_energy_imported_from_grid
      day_grid_export_77: sensor.solis_inverter_today_energy_fed_into_grid
      day_pv_energy_108: sensor.solis_inverter_pv_today_energy_generation
      inverter_voltage_154: sensor.solis_inverter_a_phase_voltage
      load_frequency_192: sensor.solis_inverter_grid_frequency
      inverter_current_164: sensor.solis_inverter_a_phase_current
      inverter_power_175: sensor.solis_inverter_backup_load_power
      grid_power_169: sensor.solis_inverter_ac_grid_port_power
      battery_voltage_183: sensor.solis_inverter_battery_voltage
      battery_soc_184: sensor.solis_inverter_battery_soc
      battery_power_190: sensor.solis_inverter_battery_power
      battery_current_191: sensor.solis_inverter_battery_current
      essential_power: sensor.solis_inverter_backup_load_power
      grid_ct_power_172: sensor.solis_inverter_meter_total_active_power
      pv1_voltage_109: sensor.solis_inverter_dc_voltage_1
      pv1_current_110: sensor.solis_inverter_dc_current_1
      pv1_power_186: sensor.solis_inverter_dc_power_1
      pv2_voltage_111: sensor.solis_inverter_dc_voltage_2
      pv2_current_112: sensor.solis_inverter_dc_current_2
      pv2_power_187: sensor.solis_inverter_dc_power_2
      pv_total: sensor.solis_inverter_total_dc_output
      grid_voltage: sensor.solis_inverter_a_phase_voltage
      battery_current_direction: sensor.solis_inverter_battery_current_direction
      inverter_status_59: sensor.solis_inverter_current_status
      remaining_solar: sensor.solcast_pv_forecast_forecast_remaining_today

******************************************************************************************
Example 3 (Solis S6 or S2-WL-ST) - Integration via https://github.com/fboundy/ha_solis_modbus
******************************************************************************************

.. code-block:: yaml
  :linenos:

    type: custom:sunsynk-power-flow-card
    cardstyle: full
    show_solar: true
    inverter:
      model: solis
    battery:
      energy: 54
      shutdown_soc: 20
      show_daily: true
    solar:
      show_daily: true
      mppts: 2
    load:
      show_daily: true
    grid:
      show_daily_buy: true
      show_daily_sell: false
      show_nonessential: false
    entities:
      inverter_voltage_154: sensor.solis_inverter_voltage
      load_frequency_192: sensor.solis_inverter_frequency
      inverter_current_164: sensor.solis_inverter_current
      inverter_power_175: sensor.solis_inverter_ac_power
      grid_connected_status_194: null
      grid_voltage: sensor.solis_grid_voltage
      inverter_status_59: sensor.solis_inverter_status
      day_battery_charge_70: none
      day_battery_discharge_71: none
      battery_voltage_183: sensor.solis_battery_voltage
      battery_soc_184: sensor.solis_battery_soc_lead
      battery_power_190: sensor.solis_battery_power
      battery_current_191: sensor.solis_battery_current
      battery_current_direction: sensor.solis_battery_current_direction
      grid_power_169: sensor.solis_grid_active_power_negative
      day_grid_import_76: sensor.solis_daily_energy_imported
      day_grid_export_77: sensor.solis_daily_energy_exported
      grid_ct_power_172: sensor.solis_grid_active_power_negative
      day_load_energy_84: sensor.solis_daily_consumption
      essential_power: sensor.solis_backup_load_power
      nonessential_power: none
      aux_power_166: none
      day_pv_energy_108: none
      pv1_power_186: none
      pv2_power_187: none
      pv1_voltage_109: sensor.solis_pv1_voltage
      pv1_current_110: sensor.solis_pv1_current
      pv2_voltage_111: sensor.solis_pv2_voltage
      pv2_current_112: sensor.solis_pv2_current
