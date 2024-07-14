################
Goodwe Inverter
################

*********
Example 1
*********

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: lite
  panel_mode: false
  large_font: true
  title: Goodwe
  title_colour: grey
  title_size: 32px
  show_solar: true
  show_battery: true
  show_grid: true
  inverter:
    modern: false
    colour: grey
    autarky: energy
    model: goodwe_gridmode
    three_phase: true
  battery:
    energy: 10650
    shutdown_soc: sensor.goodwe_shutdown_soc
    invert_power: false
    show_daily: true
    max_power: 5400
    show_absolute: false
    auto_scale: true
  solar:
    show_daily: true
    display_mode: 3
    mppts: 2
    animation_speed: 9
    max_power: 5400
    pv1_name: East
    pv2_name: West
  load:
    show_daily: true
  grid:
    show_nonessential: true
    invert_grid: false
    export_colour: green
  entities:
    day_battery_discharge_71: sensor.today_battery_discharge
    day_battery_charge_70: sensor.today_battery_charge
    day_load_energy_84: sensor.today_load
    day_pv_energy_108: sensor.today_s_pv_generation
    inverter_voltage_154: sensor.on_grid_l1_voltage
    inverter_voltage_L2: sensor.on_grid_l2_voltage
    inverter_voltage_L3: sensor.on_grid_l3_voltage
    load_frequency_192: sensor.meter_frequency
    inverter_current_164: sensor.on_grid_l1_current
    inverter_current_L2: sensor.on_grid_l2_current
    inverter_current_L3: sensor.on_grid_l3_current
    inverter_power_175: zero
    pv1_power_186: sensor.pv1_power
    pv2_power_187: sensor.pv2_power
    pv_total: sensor.pv_power
    battery_voltage_183: sensor.battery_voltage
    battery_soc_184: sensor.battery_state_of_charge
    battery_power_190: sensor.battery_power
    battery_current_191: sensor.battery_current
    essential_power: sensor.house_consumption
    load_power_L1: sensor.load_l1
    load_power_L2: sensor.load_l2
    load_power_L3: sensor.load_l3
    grid_ct_power_172: sensor.active_power_l1
    grid_ct_power_L2: sensor.active_power_l2
    grid_ct_power_L3: sensor.active_power_l3
    grid_ct_power_total: sensor.active_power
    pv1_voltage_109: sensor.pv1_voltage
    pv1_current_110: sensor.pv1_current
    pv2_voltage_111: sensor.pv2_voltage
    pv2_current_112: sensor.pv2_current
    grid_connected_status_194: sensor.grid_mode_code
    inverter_status_59: sensor.work_mode_code
    battery_status: sensor.battery_mode_code
    total_pv_generation: sensor.total_pv_generation
    battery_temp_182: sensor.battery_temperature
    radiator_temp_91: sensor.inverter_temperature_radiator
    dc_transformer_temp_90: sensor.inverter_temperature_air
    day_grid_import_76: sensor.energy_buy_daily
    day_grid_export_77: sensor.energy_sell_daily
    remaining_solar: sensor.energy_production_today_total
    energy_cost_buy: sensor.spot_price_buy
    energy_cost_sell: sensor.spot_price_sell

.. note::

   The Goodwe integration does not provide a sensor for ``shutdown_soc``. 
   A template sensor can be created using the provided depth of discharge (DOD) sensor i.e ``number.depth_of_discharge_on_grid``. 
   See example below. Note that the depth of discharge sensor name may vary depending on your HA language. 

.. code-block:: bash

      - sensor:
          - name: GoodWe Shutdown SOC
            unique_id: goodwe_shutdown_soc
            unit_of_measurement: "%"
            icon: mdi:battery-arrow-down
            state: "{{100 - states('number.depth_of_discharge_on_grid') | int }}"