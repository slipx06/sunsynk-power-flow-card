#################
Ecoflow Inverters
#################

This configuration is based on the `Ecoflow PowerOcean Integration`.

.. _Ecoflow PowerOcean Integration: https://github.com/niltrip/powerocean

****************
Required Helpers
****************

.. code-block:: yaml
  :linenos:

  template:
    - sensor:
        - name: "Grid Import"
          unit_of_measurement: "W"
          device_class: power
          state_class: "total"
          state: >
            {% set p = states('sensor.powerocean_pcsmeterpower') | float(0) %}
            {{ p | round(0) if p > 0 else 0 }}
  
    - sensor:
        - name: "Grid Export"
          unit_of_measurement: "W"
          device_class: power
          state_class: "total"
          state: >
            {% set p = states('sensor.powerocean_pcsmeterpower') | float(0) %}
            {{ (p * -1) | round(0) if p < 0 else 0 }}

* ``grid_import_total``: Integral of ``sensor.grid_import`` in Wh
* ``grid_export_total``: Integral of ``sensor.grid_export`` in Wh
* ``grid_import_daily``: Utility Meter for ``sensor.grid_import_total``, daily reset
* ``grid_export_daily``: Utility Meter for ``sensor.grid_export_total``, daily reset
* ``daily_charge_energy``: Utility Meter for ``bpTotalChgEnergy``, daily reset
* ``daily_discharge_energy``: Utility Meter for ``bpTotalDsgEnergy``, daily reset
* ``power_total``: Integral of ``powerocean_sysloadpwr`` in Wh
* ``power_daily``: Utility Meter for ``sensor.power_total``, daily reset


********************************************
Example with 8 kW inverter and 5 kWh battery
********************************************

.. code-block:: yaml
  :linenos:

  type: custom:sunsynk-power-flow-card
  cardstyle: lite
  show_solar: true
  battery:
    show_daily: true
    shutdown_soc: 10
    invert_power: false
    show_absolute: false
    show_remaining_energy: true
    remaining_energy_to_shutdown: true
    invert_flow: true
    max_power: 5
    energy: 5000
  solar:
    show_daily: true
    mppts: 2
    pv2_name: East
    pv1_name: West
    pv2_max_power: 3220
    pv1_max_power: 4140
  load:
    show_daily: true
  grid:
    show_daily_buy: true
    show_daily_sell: false
    show_nonessential: true
  entities:
    use_timer_248: null
    priority_load_243: null
    inverter_voltage_154: null
    load_frequency_192: null
    inverter_current_164: null
    inverter_power_175: null
    grid_connected_status_194: null
    inverter_status_59: null
    day_battery_discharge_71: sensor.daily_discharge_energy
    battery_voltage_183: sensor.powerocean_bpack1_bpvol
    battery_current_191: sensor.powerocean_bpack1_bpamp
    grid_power_169: null
    day_grid_import_76: sensor.grid_import_daily
    day_grid_export_77: sensor.grid_export_daily
    nonessential_power: none
    aux_power_166: null
    day_pv_energy_108: sensor.powerocean_todayelectricitygeneration
    pv1_power_186: sensor.powerocean_mpptpv1_pwr
    pv2_power_187: sensor.powerocean_mpptpv2_pwr
    pv1_voltage_109: sensor.powerocean_mpptpv1_vol
    pv1_current_110: sensor.powerocean_mpptpv1_amp
    pv2_voltage_111: sensor.powerocean_mpptpv2_vol
    pv2_current_112: sensor.powerocean_mpptpv2_amp
    battery_temp_182: sensor.powerocean_bpack1_bpenvtemp
    battery_soc_184: sensor.powerocean_bpsoc
    essential_power: sensor.powerocean_sysloadpwr
    grid_ct_power_172: sensor.grid_import
    battery_power_190: sensor.powerocean_emsbppower
    battery_soh: sensor.powerocean_bpack1_bpsoh
    day_battery_charge_70: sensor.daily_charge_energy
    day_load_energy_84: sensor.power_daily
    energy_cost_buy: null
  large_font: false
  wide: false
  show_grid: true
  show_battery: true
