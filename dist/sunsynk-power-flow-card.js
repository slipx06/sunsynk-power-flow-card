import { LitElement, html, css } from "https://unpkg.com/lit-element@2.0.1/lit-element.js?module";

class SunsynkPowerFlowCardEditor extends LitElement {
  setConfig(config) {
    this._config = config;
  }

  configChanged(newConfig) {
    const event = new Event("config-changed", {
      bubbles: true,
      composed: true,
    });
    event.detail = { config: newConfig };
    this.dispatchEvent(event);
  }
}

class SunsynkPowerFlowCard extends LitElement {
  static get styles() {
    return css`
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        padding: 5px;
      }

      .card {
        border-radius: var(--ha-card-border-radius, 10px);
        background-color: var(--card-background-color);
        padding: 0px;
        border-width: var(--ha-card-border-width);
        box-shadow: var(--ha-card-box-shadow, 0px 0px 0px 1px rgba(0, 0, 0, 0.12), 0px 0px 0px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 0px rgba(0, 0, 0, 0.12));
      }

      text { text-anchor: middle; alignment-baseline: middle; }

      .left-align {text-anchor: start;}
      .st1{fill:#ff9b30;}
      .st2{fill:#f3b3ca;}
      .st3{font-size:9px;}
      .st4{font-size:12px;}
      .st5{fill:#969696;}
      .st6{fill:#5fb6ad;}
      .st7{fill:#5490c2;}
      .st8{font-weight:500}
      .st9{fill:#959595;}
      .st10{font-size:16px;}
      .st11{fill:transparent;}
      .st12{display:none;}

    `;
  }

  static get properties() {
    return {
      hass: { type: Object },
    };
  }

  static getStubConfig() {
    return {
      cardstyle: 'lite',
      panel_mode: 'no',           
      inverter: {
        modern: 'yes',
        colour: '#959595',
      },
      battery: {
        energy: 15960,
        shutdown_soc: 20,
        invert_power: 'no',
        colour: 'pink',
        show_daily: 'yes',
      },
      solar: {
        show_solar: 'yes',
        colour: 'orange',
        show_daily: 'yes',
      },
      load: {
        colour: '#5fb6ad',
        show_daily: 'yes',
        show_aux: 'yes',
      },
      grid:{
        colour: '#5490c2',
        show_daily: 'yes',
      },
      entities: {
        use_timer_248: 'switch.toggle_system_timer',
        priority_load_243: 'switch.toggle_priority_load',
        batchargeday_70: 'sensor.battery_charge_day',
        batdischargeday_71: 'sensor.battery_discharge_day',
        loadday_84: 'sensor.daily_load_power_kwh',
        gridday_76: 'sensor.grid_import_day_buy',
        solarday_108: 'sensor.daily_pv_power_kwh',
        inverter_grid_voltage_154: 'sensor.grid_inverter_voltage',
        inverter_load_freq_192: 'sensor.load_frequency',
        inverter_out_164: 'sensor.inverter_output_current',
        inverter_out_175: 'sensor.inverter_output_power',
        inverter_load_grid_169: 'sensor.grid_inverter_load',
        pv2_power_187: 'sensor.pv2_power',
        pv1_power_186: 'sensor.pv1_power',
        battery_voltage_183: 'sensor.battery_voltage',
        battery_soc_184: 'sensor.battery_soc',
        battery_out_190: 'sensor.battery_output_power',
        ess_power: 'sensor.sunsynk_essential_load',
        grid_external_power_172: 'sensor.grid_external_power',
        pv1_v_109: 'sensor.dc1_voltage',
        pv1_i_110: 'sensor.dc1_current',
        pv2_v_111: 'sensor.dc2_voltage',
        pv2_i_112: 'sensor.dc2_current',
        grid_status_194: 'binary_sensor.grid_connected_status',
        inverter_status_59: 'sensor.overall_state',
        aux_power_166: 'sensor.aux_output_power',
      }
    };
  }

  render() {
    const config = this._config;
    const stateObj = this.hass.states[config.entities.batdischargeday_71] || { state: '0' };
    const stateObj1 = this.hass.states[config.entities.batchargeday_70] || { state: '0' };
    const stateObj2 = this.hass.states[config.entities.loadday_84] || { state: '0' };
    const stateObj3 = this.hass.states[config.entities.gridday_76] || { state: '0' };
    const stateObj4 = this.hass.states[config.entities.solarday_108] || { state: '0' };
    const stateObj5 = this.hass.states[config.entities.inverter_grid_voltage_154] || { state: '0' };
    const stateObj6 = this.hass.states[config.entities.inverter_load_freq_192] || { state: '0' };
    const stateObj7 = this.hass.states[config.entities.inverter_out_164] || { state: '0' };
    const stateObj8 = this.hass.states[config.entities.pv2_power_187] || { state: '0' };
    const stateObj9 = this.hass.states[config.entities.pv1_power_186] || { state: '0' };
    const stateObj11 = this.hass.states[config.entities.battery_voltage_183] || { state: '0' };
    const stateObj12 = this.hass.states[config.entities.battery_soc_184] || { state: '0' };
    const stateObj13 = this.hass.states[config.entities.battery_out_190] || { state: '0' };
    const stateObj14 = this.hass.states[config.entities.ess_power] || { state: '0' };
    const stateObj15 = this.hass.states[config.entities.grid_external_power_172] || { state: '0' };
    const stateObj16 = this.hass.states[config.entities.pv1_v_109] || { state: '0' };
    const stateObj17 = this.hass.states[config.entities.pv1_i_110] || { state: '0' };
    const stateObj18 = this.hass.states[config.entities.pv2_v_111] || { state: '0' };
    const stateObj19 = this.hass.states[config.entities.pv2_i_112] || { state: '0' };
    const stateObj20 = this.hass.states[config.entities.grid_status_194] || { state: 'on' };
    const stateObj21 = this.hass.states[config.entities.inverter_status_59] || { state: 'normal' };
    const stateObj22 = this.hass.states[config.entities.inverter_out_175] || { state: '0' };
    const stateObj23 = this.hass.states[config.entities.inverter_load_grid_169]  || { state: '0' };
    const stateObj24 = this.hass.states[config.entities.aux_power_166]  || { state: '0' };
    const stateObj25 = this.hass.states[config.entities.priority_load_243]  || { state: 'undefined' };
    const stateObj26 = this.hass.states[config.entities.use_timer_248]  || { state: 'undefined' };
    
    const totalsolar = (parseInt(stateObj8.state) + parseInt(stateObj9.state));
    const nonessential = (parseInt(stateObj15.state) - parseInt(stateObj23.state));
    const essential = (parseInt(stateObj22.state) - (parseInt(stateObj24.state) - parseInt(stateObj23.state)));
        
    let battery_power = "";
    if (config.battery.invert_power === 'yes'){
        battery_power = (stateObj13.state * -1)
    } else {
        battery_power = stateObj13.state
    }

    let duration = "";
    if (battery_power > 0 && config.battery.energy !== "hidden") {
      let totalSeconds = ((((parseInt(stateObj12.state) - config.battery.shutdown_soc) / 100) * (config.battery.energy || 15960) ) / (battery_power || 1)) * 60 * 60;
      const days = Math.floor(totalSeconds / (60 * 60 * 24));
      const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
      const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
      if (days > 0) {
        duration += `${days} days, `;
      }
      if (hours > 0 || days > 0) {
        duration += `${hours} hrs, `;
      }
      duration += `${minutes} min`;
    }
    
    if (battery_power <= 0) {
      duration = "BATTERY CHARGING";
    }
    
    let inverterStateColour = "";
    if (stateObj21.state === '0' || stateObj21.state === 'standby') {
        inverterStateColour = 'blue'
    } else if (stateObj21.state === '1' || stateObj21.state === 'selftest') {
        inverterStateColour = 'yellow'
    } else if (stateObj21.state === '2' || stateObj21.state === 'normal' || stateObj21.state === 'ok') {
        inverterStateColour = 'green'
    } else if (stateObj21.state === '3' || stateObj21.state === 'alarm') {
        inverterStateColour = 'orange'
    } else if (stateObj21.state === '4' || stateObj21.state === 'fault') {
        inverterStateColour = 'red'
    } else {
        inverterStateColour = 'transparent'
    }

    if (config.cardstyle === 'full') {
      return html`
        <div class="container card">
          <svg viewBox="-0.5 -0.5 457 383" height="${config.panel_mode === 'no' ? '396px' : '100%'}" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
          <text id="duration" x="34%" y="92%" class="st4 left-align" fill="${config.battery.energy === 'hidden' || battery_power <= 0 ? 'transparent' : `${config.battery.colour}`}" >${duration}</text>
          <text id="duration_text" x="34%" y="96%" class="st3 left-align" fill="${config.battery.energy === 'hidden' || battery_power <= 0 ? 'transparent' : `${config.battery.colour}`}" >BATTERY RUNTIME</text>
          <text id="duration_text_charging" x="34%" y="96%" class="st3 left-align" fill="${config.battery.energy === 'hidden' || battery_power > 0 ? 'transparent' : `${config.battery.colour}`}" >${duration}</text>
          <text id="inverter_grid_voltage_154" x="59%" y="44.5%" class="st4 st8" fill="${config.grid.colour}" >${stateObj5.state ? stateObj5.state : '0'} V</text>
          <text id="inverter_load_freq_192" x="59%" y="49.5%" class="st4 st8" fill="${config.grid.colour}">${stateObj6.state ? stateObj6.state : '0'} Hz</text>
          <text id="inverter_out_164" x="39.5%" y="52%" class="st4 st8" fill="${config.inverter.colour}">${stateObj7.state ? stateObj7.state : '0'} A</text>
          <text id="pv2_power_187" x="30%" y="18.5%" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${stateObj8.state ? stateObj8.state : '0'} W</text>
          <text id="pv1_power_186" x="8%" y="18.5%" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${stateObj9.state ? stateObj9.state : '0'} W</text>
          <text id="pvtotal_power" x="19%" y="33.5%" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${totalsolar ? totalsolar : '0'} W</text>
          <text x="2%" y="24.5%" class="st3 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">PV1</text>
          <text x="24%" y="24.5%" class="st3 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">PV2</text>
          <text id="battery_voltage_183" x="9%" y="83%" fill=${config.battery.colour} class="st4 st8">${stateObj11.state ? stateObj11.state : '0'} V</text>
          <text id="battery_soc_184" x="9%" y="87.5%" fill=${config.battery.colour} class=" st4 st8">${stateObj12.state ? stateObj12.state : '0'} %</text>
          <text id="battery_out_190" x="9%" y="92%" fill=${config.battery.colour} class="st4 st8">${battery_power < '0' ? battery_power *-1 : battery_power} W</text>
          <text id="ess_power" x="59%" y="31%" class="st4 st8" fill="${config.load.colour}">${essential ? essential : '0'} W</text>
          <text id="grid_external_power_172" x="92%" y="73.5%" class="st4 st8" fill="${config.grid.colour}">${stateObj15.state ? stateObj15.state : '0'} W</text>
          <text x="92%" y="98.5%" class="st3 st8" fill="${config.grid.colour}">Grid</text>
          <text x="40.5%" y="80%" class="st3" fill="${config.inverter.colour}">Status</text>
          <text x="90%" y="41%" class="st3 st8" fill="${config.load.colour}">Essential</text>
          <text id="daily_solar_value" x="85" y="5%" class="st10 left-align" fill="${config.solar.show_daily === 'no' || config.solar.show_solar === 'no' ? 'transparent' : `${config.solar.colour}`}" >${stateObj4.state ? stateObj4.state : '0'} kWh</text>
          <text id="daily_solar" x="85" y="8.5%" class="st3 left-align" fill="${config.solar.show_daily === 'no' || config.solar.show_solar === 'no' ? 'transparent' : `${config.solar.colour}`}" >DAILY SOLAR</text>
          <text id="pv1_v" x="9%" y="24.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj16.state ? stateObj16.state : '0'} V</text>
          <text id="pv1_i" x="9%" y="27.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj17.state ? stateObj17.state : '0'} A</text>
          <text id="pv2_v" x="31%" y="24.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj18.state ? stateObj18.state : '0'} V</text>
          <text id="pv2_i" x="31%" y="27.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj19.state ? stateObj19.state : '0'} A</text>
          <text id="daily_bat_charge_value" x="1%" y="62%" class= "st10 left-align" fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >${stateObj1.state ? stateObj1.state : '0'} kWh</text>
          <text id="daily_bat_charge" x="1%" y="65.5%" class="st3 left-align"  fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >DAILY CHARGE</text>
          <text id="daily_bat_discharge_value" x="1%" y="70.75%" class="st10 left-align" fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >${stateObj.state ? stateObj.state : '0'} kWh</text>
          <text id="daily_bat_charge" x="1%" y="74%" class="st3 left-align"  fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >DAILY DISCHARGE</text>
          <text id="daily_grid_value" x="77%" y="60%" class="st10 left-align" fill="${config.grid.show_daily === 'no' ? 'transparent' : `${config.grid.colour}`}" >${stateObj3.state ? stateObj3.state : '0'} kWh</text>
          <text id="daily_grid" x="77%" y="63%" class="st3 left-align" fill="${config.grid.show_daily === 'no' ? 'transparent' : `${config.grid.colour}`}" >DAILY GRID</text>
          <text id="inverter_out_175" x="39.5%" y="46.5%" class="st4 st8" fill="${config.inverter.colour}">${stateObj22.state ? stateObj22.state : '0'} W</text>
          <text id="inverter_load_grid_169" x="59%" y="54.5%" class="st4 st8" fill="${config.grid.colour}">${stateObj23.state ? stateObj23.state : '0'} W</text>
          <text id="aux_power_166" x="59%" y="12.5%" class="st4 st8" display="${config.load.show_aux === 'no' ? 'none' : ''}" fill="${config.load.colour}">${stateObj24.state ? stateObj24.state : '0'} W</text> 
          <text x="90%" y="21.5%" class="st3 st8" display="${config.load.show_aux === 'no' ? 'none' : ''}" fill="${config.load.colour}">Auxiliary</text> 
          <text id="non_ess_power" x="74%" y="73.5%" class="st4 st8" fill="${config.grid.colour}">${nonessential ? nonessential : '0'} W</text>  
          <text x="74%" y="98.5%" class="st3 st8" fill="${config.grid.colour}"> Non Essential</text>
          <circle id="standby" cx="36%" cy="79.75%" r="3.5" fill="${inverterStateColour}"/>
          <circle id="grid" cx="88.5%" cy="98.5%" r="3.5" fill="${stateObj20.state === 'off' || stateObj20.state === '0' ? 'red' : 'transparent'}"/>
          <rect x="51" y="112" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
          <rect x="6" y="300.75" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${config.battery.colour}" pointer-events="all"/>
          <rect x="234" y="153" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${config.grid.colour}" pointer-events="all"/>
          <rect x="386" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.grid.colour}" pointer-events="all"/>
          <rect x="237" y="32" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.load.colour}" pointer-events="all" class="${config.load.show_aux === 'no' ? 'st12' : ''}"/>
          <rect x="236" y="103" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.load.colour}" pointer-events="all"/>
          <rect x="145.15" y="162" width="70" height="50" rx="7.5" ry="7.5" fill="none" stroke="${config.inverter.colour}" pointer-events="all"/>
          <rect x="0" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
          <rect x="101" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
          <rect x="304" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.grid.colour}" pointer-events="all"/>
          <path id="pv1-line" d="M 35 84 L 35.02 117 Q 35.03 127 43.02 127 L 51 127" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${stateObj9.state === '0' ? 'transparent' : `${config.solar.colour}`}">
            <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#pv1-line"/>
            </animateMotion>
          </circle>
          <path id="pv2-line" d="M 135 84 L 135.02 117 Q 135.03 127 128.02 127 L 121 127" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
          <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${stateObj8.state === '0' ? 'transparent' : `${config.solar.colour}`}">
            <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#pv2-line"/>
            </animateMotion>
          </circle>
          <path id="so-line" d="M 155 250 L 96 250 Q 86 250 86 240 L 86 142" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
          <circle id="so-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : `${config.solar.colour}`}">
            <animateMotion dur="9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#so-line"/>
            </animateMotion>
          </circle>
          <path id="bat-line" d="M 155 280 L 102 280 Q 96 280 96 286 L 96 297" fill="none" stroke="${config.battery.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <circle id="power-dot-charge" cx="0" cy="0" r="3" fill="${parseInt(battery_power) < '0' ? 'transparent' : `${config.battery.colour}`}">
            <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#bat-line"/>
            </animateMotion>
          </circle>
          <circle id="power-dot-discharge" cx="0" cy="0" r="3" fill="${parseInt(battery_power) >= '0' ? 'transparent' : `${config.battery.colour}`}">
            <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#bat-line"/>
            </animateMotion>
          </circle>
          <path id="grid-line" d="M 304 188 L 411 188 Q 421 188 421 198 L421 265" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : `${config.grid.colour}`}">
            <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#grid-line"/>
            </animateMotion>
          </circle>
          <path id="grid-line1" d="M 421 295 L 421 310.5" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : `${config.grid.colour}`}">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#grid-line1"/>
            </animateMotion>
          </circle>
          
          <path id="ne-line1" d="M 339 295 L 339 310" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <circle id="ne-dot1" cx="0" cy="0" r="3" fill="${nonessential <= '0' ? 'transparent' : `${config.grid.colour}`}">
            <animateMotion dur="2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#ne-line1"/>
            </animateMotion>
          </circle> 
          <path id="ne-line" d="M 339 265 L 339 188" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
          <circle id="ne-dot" cx="0" cy="0" r="3" fill="${nonessential <= '0' ? 'transparent' : `${config.grid.colour}`}">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#ne-line"/>
          </animateMotion>
          </circle> 
          
          <path id="aux-line" d="M 307 47 L 371.5 47" fill="none" class="${config.load.show_aux === 'no' ? 'st12' : ''}" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
          <circle id="aux-dot" cx="0" cy="0" r="3" class="${config.load.show_aux === 'no' ? 'st12' : ''}" fill="${stateObj24.state <= '0' ? 'transparent' : `${config.load.colour}`}">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#aux-line"/>
            </animateMotion>
          </circle>
          <path id="aux-line2" d="M 200 162 L 200 57 Q 200 47 210 47 L 237 47" fill="none" class="${config.load.show_aux === 'no' ? 'st12' : ''}" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
          <path d="M 215.15 187 L 224.58 187 Q 234 187 234 187.5 L 234 188" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <path d="M 180.15 212 L 180.15 235" fill="none" stroke="${config.inverter.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
          <path id="es-line2" d="M 306 118 L 330 118 Q 340 118 350 117.85 L 374 117.5" fill="none" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
          <circle id="es-dot" cx="0" cy="0" r="3" fill="${essential === '0' ? 'transparent' : `${config.load.colour}`}">
            <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#es-line2"/>
            </animateMotion>
          </circle>
          <path id="es-line" d="M 235 118 L 212 118 Q 200 118 200 128 L 200 162" fill="none" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>  
          
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="154.5" y="224.75" width="54" height="79" viewBox="0 0 74 91"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)" fill="${config.inverter.colour}" stroke="none"> <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/> </g> </svg>
          
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > '80' ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-9H5v3h6V7m0 4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) <= 80 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > 30 && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m12-6h-3V3l-5 10h3v8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= 30 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M23.05 11h-3V4l-5 10h3v8M12 20H4l.05-14h8m.67-2h-1.67V2h-6v2H3.38a1.33 1.33 0 0 0-1.33 1.33v15.34c0 .73.6 1.33 1.33 1.33h9.34c.73 0 1.33-.6 1.33-1.33V5.33A1.33 1.33 0 0 0 12.72 4Z"/></svg>
          
          <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="6.5" y="-0.5" width="56" height="56" viewBox="0 0 24 24"><path class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${config.solar.colour}" d="M11.45 2v3.55L15 3.77L11.45 2m-1 6L8 10.46l3.75 1.25L10.45 8M2 11.45L3.77 15l1.78-3.55H2M10 2H2v8c.57.17 1.17.25 1.77.25c3.58.01 6.49-2.9 6.5-6.5c-.01-.59-.1-1.18-.27-1.75m7 20v-6h-3l5-9v6h3l-5 9Z"/></svg>
          
          <svg xmlns="http://www.w3.org/2000/svg" id="transmission" x="387" y="310" width="67" height="67" viewBox="0 0 24 24"><path fill="${config.grid.colour}" d="m8.28 5.45l-1.78-.9L7.76 2h8.47l1.27 2.55l-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89l.73-1.44h10.76l.72 1.45l1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2l-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75l-.35-1.35h2.07l2.89 11m-6.37-7l-.9-1.35l-1.18 4.48L11.4 15m3.28 3.12l-1.18-4.48l-.9 1.36l2.08 3.12Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="nonesssvg" x="300.5" y="305.5" width="76" height="76" viewBox="0 0 24 24"><path fill="${config.grid.colour}" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8h5Z"/></svg>

          <svg xmlns="http://www.w3.org/2000/svg" id="essen" x="373.5" y="78.5" width="77" height="77" viewBox="0 0 24 24"><path fill="${config.load.colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" is="auxsvg" x="371" y="5" width="83" height="83" viewBox="0 0 24 24"><path class="${config.load.show_aux === 'no' ? 'st12' : ''}" fill="${config.load.colour}" d="M5 20v-8H2l10-9l10 9h-3v8H5m7-14.31l-5 4.5V18h10v-7.81l-5-4.5M11.5 18v-4H9l3.5-7v4H15l-3.5 7Z"/></svg>
          
          
          <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="46%" y="65%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'on' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="46%" y="65%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'off' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
          <text id="timer_text_on"x="50%" y="68%" class="st3 left-align" display="${stateObj26.state == 'on' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Timer On</text>
          <text id="timer_text_off"x="50%" y="68%" class="st3 left-align" display="${stateObj26.state == 'off' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Timer Off</text>
          <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="46%" y="70%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'off' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="46%" y="70%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'on' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
          <text id="priority_text_load"x="50%" y="73%" class="st3 left-align" display="${stateObj25.state === 'on' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Priority Load</text>
          <text id="priority_text_batt"x="50%" y="73%" class="st3 left-align" display="${stateObj25.state === 'off' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Priority Batt</text>
          <image x="154.5" y="224.75" width="52" height="72" class="${config.inverter.modern === 'yes' ? 'st12' : ''}" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
          <text id="daily_load_value" x="83%" y="15%" class="st10 left-align" fill="${config.load.show_daily === 'no' || config.load.show_aux === 'yes' ? 'transparent' : `${config.load.colour}`}" >${stateObj2.state ? stateObj2.state : '0'} kWh</text>
          <text id="daily_load" x="83%" y="18.5%" class="st3 left-align" fill="${config.load.show_daily === 'no' || config.load.show_aux === 'yes' ? 'transparent' : `${config.load.colour}`}" >DAILY LOAD</text>         
          
          </svg>
        </div>
      `;
    }

    if (config.cardstyle === 'simple') {
      return html`
        <div class="container card">
          <svg viewBox="-0.5 -0.5 456 380" height="${config.panel_mode === 'no' ? '396px' : '100%'}" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <text id="inverter_grid_voltage_154" x="69%" y="40%" class="st4 st8" fill="${config.grid.colour}" >${stateObj5.state ? stateObj5.state : '0'} V</text>
            <text id="inverter_load_freq_192" x="69%" y="45%" class="st4 st8" fill="${config.grid.colour}">${stateObj6.state ? stateObj6.state : '0'} Hz</text>
            <text id="duration" x="34%" y="91%" class="st4 left-align" fill="${config.battery.energy === 'hidden' || battery_power <= 0 ? 'transparent' : `${config.battery.colour}`}" >${duration}</text>
            <text id="duration_text" x="34%" y="95%" class="st3 left-align" fill="${config.battery.energy === 'hidden' || battery_power <= 0 ? 'transparent' : `${config.battery.colour}`}" >BATTERY RUNTIME</text>  
            <text id="duration_text_charging" x="34%" y="95%" class="st3 left-align" fill="${config.battery.energy === 'hidden' || battery_power > 0 ? 'transparent' : `${config.battery.colour}`}" >${duration}</text> 
            <text id="inverter_out_164" x="45%" y="47.5%" class="st4 st8" fill="${config.inverter.colour}">${stateObj7.state ? stateObj7.state : '0'} A</text>
            <text id="pv2_power_187" x="30%" y="18.5%" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${stateObj8.state ? stateObj8.state : '0'} W</text>
            <text id="pv1_power_186" x="8%" y="18.5%" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${stateObj9.state ? stateObj9.state : '0'} W</text>
            <text id="pvtotal_power" x="19%" y="33.5%" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${totalsolar ? totalsolar : '0'} W</text>
            <text x="2%" y="24.5%" class="st3 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">PV1</text>
            <text x="24%" y="24.5%" class="st3 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">PV2</text>
            <text id="battery_voltage_183" x="8%" y="81.5%" fill=${config.battery.colour} class="st4 st8">${stateObj11.state ? stateObj11.state : '0'} V</text>
            <text id="battery_soc_184" x="8%" y="86.5%" fill=${config.battery.colour} class="st4 st8"">${stateObj12.state ? stateObj12.state : '0'} %</text>
            <text id="battery_out_190" x="8%" y="92%" fill=${config.battery.colour} class="st4 st8">${battery_power < '0' ? battery_power *-1 : battery_power} W</text>
            <text id="ess_power" x="68.5%" y="18.5%" class="st4 st8" fill="${config.load.colour}">${stateObj14.state ? stateObj14.state : '0'} W</text>
            <text id="grid_external_power_172" x="91.5%" y="68.5%" class="st4 st8" fill="${config.grid.colour}">${stateObj15.state ? stateObj15.state : '0'} W</text>
            <text x="91.5%" y="96%" class="st3 st8" fill="${config.grid.colour}">Grid</text>
            <text x="45.5%" y="79%" class="st3" fill="${config.inverter.colour}">Status</text>
            <text x="92%" y="29%" class="st3 st8" fill="${config.load.colour}">Essential</text>
            <text id="daily_solar_value" x="85" y="5%" class="st10 left-align" fill="${config.solar.show_daily === 'no' || config.solar.show_solar === 'no' ? 'transparent' : `${config.solar.colour}`}" >${stateObj4.state ? stateObj4.state : '0'} kWh</text>
            <text id="daily_solar" x="85" y="8.5%" class="st3 left-align" fill="${config.solar.show_daily === 'no' || config.solar.show_solar === 'no' ? 'transparent' : `${config.solar.colour}`}" >DAILY SOLAR</text>
            <text id="pv1_v" x="9%" y="24.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj16.state ? stateObj16.state : '0'} V</text>
            <text id="pv1_i" x="9%" y="27.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj17.state ? stateObj17.state : '0'} A</text>
            <text id="pv2_v" x="31%" y="24.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj18.state ? stateObj18.state : '0'} V</text>
            <text id="pv2_i" x="31%" y="27.5%" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj19.state ? stateObj19.state : '0'} A</text>
            <text id="daily_bat_charge_value" x="1%" y="61%" class= "st10 left-align" fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >${stateObj1.state ? stateObj1.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="1%" y="64.5%" class="st3 left-align"  fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}"  >DAILY CHARGE</text>
            <text id="daily_bat_discharge_value" x="1%" y="69.75%" class="st10 left-align" fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >${stateObj.state ? stateObj.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="1%" y="73%" class="st3 left-align"  fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}"  >DAILY DISCHARGE</text>
            <text id="daily_grid_value" x="70%" y="86%" class="st10 left-align" fill="${config.grid.show_daily === 'no' ? 'transparent' : `${config.grid.colour}`}" >${stateObj3.state ? stateObj3.state : '0'} kWh</text>
            <text id="daily_grid" x="70%" y="89.5%" class="st3 left-align" fill="${config.grid.show_daily === 'no' ? 'transparent' : `${config.grid.colour}`}" >DAILY GRID</text>
            <text id="daily_load_value" x="83%" y="5%" class="st10 left-align" fill="${config.load.show_daily === 'no' ? 'transparent' : `${config.load.colour}`}" >${stateObj2.state ? stateObj2.state : '0'} kWh</text>
            <text id="daily_load" x="83%" y="8.5%" class="st3 left-align" fill="${config.load.show_daily === 'no' ? 'transparent' : `${config.load.colour}`}" >DAILY LOAD</text>
            <text id="inverter_out_175" x="45%" y="42.5%" class="st4 st8" fill="${config.inverter.colour}">${stateObj22.state ? stateObj22.state : '0'} W</text>
            <text id="inverter_load_grid_169" x="69%" y="49.5%" class="st4 st8" fill="${config.grid.colour}">${stateObj23.state ? stateObj23.state : '0'} W</text>
            <circle id="standby" cx="41%" cy="78.75%" r="3.5" fill="${inverterStateColour}"/>
            <circle id="grid" cx="88%" cy="95.75%" r="3.5" fill="${stateObj20.state === 'off' || stateObj20.state === '0' ? 'red' : 'transparent'}"/>
            <path id="pv1-line" d="M 35 84 L 35.02 117 Q 35.03 127 43.02 127 L 51 127" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${stateObj9.state === '0' ? 'transparent' : `${config.solar.colour}`}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv1-line"/>
              </animateMotion>
            </circle>
            <path id="pv2-line" d="M 135 84 L 135.02 117 Q 135.03 127 128.02 127 L 121 127" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
            <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${stateObj8.state === '0' ? 'transparent' : `${config.solar.colour}`}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv2-line"/>
              </animateMotion>
            </circle>
            <rect x="51" y="112" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
            <rect x="279" y="135" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${config.grid.colour}" pointer-events="all"/>
            <rect x="382" y="243" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.grid.colour}" pointer-events="all"/>
            <rect x="278" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.load.colour}" pointer-events="all"/>
            <rect x="169.15" y="145" width="70" height="50" rx="7.5" ry="7.5" fill="none" stroke="${config.inverter.colour}" pointer-events="all"/>
            <rect x="0" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
            <rect x="101" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
            <rect x="0" y="295" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${config.battery.colour}" pointer-events="all"/>
            <path id="bat-line" d="M 179 275 L 105 275 Q 95 275 95 285 L 95.03 290" fill="none" stroke="${config.battery.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="power-dot-charge" cx="0" cy="0" r="3" fill="${parseInt(battery_power) < '0' ? 'transparent' : `${config.battery.colour}`}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <circle id="power-dot-discharge" cx="0" cy="0" r="3" fill="${parseInt(battery_power) >= '0' ? 'transparent' : `${config.battery.colour}`}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <path id="so-line" d="M 179 245 L 96 245 Q 86 245 86 235 L 86 142" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/> 
            <circle id="so-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : `${config.solar.colour}`}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#so-line"/>
              </animateMotion>
            </circle>
            <path id="es-line-long" d="M 278 69 L 215.03 69 Q 205.03 69 205.03 79 L 205.03 110.03 Q 205.03 120.03 205 130 L 205 145" fill="none" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : `${config.load.colour}`}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line-long"/>
              </animateMotion>
            </circle>
            <path id="es-line" d="M 348 69 L 377.5 69" fill="none" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : `${config.load.colour}`}">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line" d="M 349 170 L 407.03 170.03 Q 417.03 170.03 417.03 180.03 L 417 243" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : `${config.grid.colour}`}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line1" d="M 417 273 L 417 293.5" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : `${config.grid.colour}`}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <path d="M 239.15 170 L 279 170" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <path d="M 204.15 195 L 204.15 230" fill="none" stroke="${config.inverter.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="178.5" y="219.5" width="54" height="79" viewBox="0 0 74 91"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)" fill="${config.inverter.colour}" stroke="none"> <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/> </g> </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > '80' ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-9H5v3h6V7m0 4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) <= 80 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > 30 && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m12-6h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= 30 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M23.05 11h-3V4l-5 10h3v8M12 20H4l.05-14h8m.67-2h-1.67V2h-6v2H3.38a1.33 1.33 0 0 0-1.33 1.33v15.34c0 .73.6 1.33 1.33 1.33h9.34c.73 0 1.33-.6 1.33-1.33V5.33A1.33 1.33 0 0 0 12.72 4Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="transmission" x="383" y="293" width="67" height="67" viewBox="0 0 24 24"><path fill="${config.grid.colour}" d="m8.28 5.45l-1.78-.9L7.76 2h8.47l1.27 2.55l-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89l.73-1.44h10.76l.72 1.45l1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2l-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75l-.35-1.35h2.07l2.89 11m-6.37-7l-.9-1.35l-1.18 4.48L11.4 15m3.28 3.12l-1.18-4.48l-.9 1.36l2.08 3.12Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="essen" x="377" y="30" width="77" height="77" viewBox="0 0 24 24"><path fill="${config.load.colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>
          
            <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="6.5" y="-0.5" width="56" height="56" viewBox="0 0 24 24"><path class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${config.solar.colour}" d="M11.45 2v3.55L15 3.77L11.45 2m-1 6L8 10.46l3.75 1.25L10.45 8M2 11.45L3.77 15l1.78-3.55H2M10 2H2v8c.57.17 1.17.25 1.77.25c3.58.01 6.49-2.9 6.5-6.5c-.01-.59-.1-1.18-.27-1.75m7 20v-6h-3l5-9v6h3l-5 9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="51%" y="64%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'on' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="51%" y="64%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'off' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
            <text id="timer_text_on"x="55%" y="67%" class="st3 left-align" display="${stateObj26.state == 'on' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Timer On</text>
            <text id="timer_text_off"x="55%" y="67%" class="st3 left-align" display="${stateObj26.state == 'off' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Timer Off</text>
            <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="51%" y="69%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'off' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="51%" y="69%" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'on' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <text id="priority_text_bat"x="55%" y="72%" class="st3 left-align" display="${stateObj25.state === 'off' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Priority Batt</text>
            <text id="priority_text_load"x="55%" y="72%" class="st3 left-align" display="${stateObj25.state === 'on' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Priority Load</text>
            <image x="178.5" y="219.5" width="52" height="72" class="${config.inverter.modern === 'yes' ? 'st12' : ''}" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABvCAYAAABRjbZ6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAuhSURBVHhe7Z1nbxNNFIXHpoReE0B0ECDRBRJ8o/wAfhZ/BL2AxCeEQKBECCEkikD0GkjoJZRA6C3Br5/rHGez7Ngbex0bZ4+08nrKnXvP3Ds7OzNOMt+/f8+5PH79+uX6+vrcx48f7T6Tybhx48aRNSYwZcoUN3v2bDdt2jT7nvn27VsOMl69euV+//5thORyxtWYw/jx493ixYvd9OnTXfbPnz+ut7fX9ff3GyljEbKbSHn27Jn78uWLy+ZDyeW9pmIvyWaz9gnB9QYGokelXo8t1Pv69avL/vjxww0MDAxmjRwocuzYMXfkyBHzunoBozBo79697saNG8UOiwvIFKF4TmRtFYoDys2ZM8fNnTs3dp1agM7FqEWLFrkJEyaMSBfqBT2M+0w+pnLPnz83hsPCgoV9oAxPr7DwfxVwYIPv4Peq0Ajji5BUB1VNTD3DJwrok4ROiXhMMyIlxoNhxCg+k4rTuGi0cAR19RgI4Yn2+vVre08DjTKQ140YPJKpd1dXl90zA2c6ziy8IWbRwXnMSPDu3TubaTKxY0JFz/MShpE/f/602ePEiRNdS0uLeQbfuXh7ZYbM+xllqU898vj+9u1bN3XqVJs0Akh6+vSpmzx5sr0B0xb3lMXLkE15ZABm8praT5o0yeRCNvnULxe25Fc8j3n//r25P4AE7iEJoRjC9+7ubnfq1KmiwRjx4sULU1rKqyyG4y0fPnxw8+bNK9aB7EuXLtmsVl507tw5u3/w4IHJuXv3rrt+/brlUR5iX7586d68eWMdcPHiRavPCoJkxEFFxNADYPny5dazIgRgEMsXKLNt2zZ7jyKNS9N2vAhC6UE8hnUQenTGjBmWRxnJgizylyxZ4mbOnOnWrVvnDh8+bO0tWLDACMYzHz16VNSD9pF/4sQJt2nTJtNx4cKFRlxcVEQMaxa48/Hjx4s9I+MFFMTFd+3a5a5evTqst7TuM2vWLCMHMpYuXWrl5S2AOtS/deuW9TzG4lEbNmxwbW1tRiZyVq9ebZ7HRR3Szp4969asWWOkVgIPMSjmf1zT+KpVq9yePXtcR0eHxT1K0yMYxkBKL+IhGNDa2uru378/7O2bniYftyeMIJhxh7ELeQLjxO7du00+4QDoFNpCD2RSfsuWLa6zs9PCHOzYscPKE3LBDosLIwaGhyqLlOA1HBh+7do1d/78ebd161br+Z6eHnflyhV75adX8QR6FLnyMMjiu1weozCQchingRXCIJg8xh96nzIMioD6AHLxMsrjdYQuetAOcrZv327tPXnyxMqPBBFPpagB6m/HogcxDgVoHENksJQNgu+Uox0uPIMBmbEDrwB4DD2ucQd5kEddiBnSsSCP/GAaIEwhVHlcyBCZPpCvTmMsM2JwZQSw7gvbra1z80WDnvI3MUCNIRBASlhRNUgenygN+MTzCCWIkaEaUKNkCaXyggjr5wNt4xyEPZ3KQ8CkoyRMHzp0yJ08edKNy/dOAQj2M02DwUajlFU+eSIFYBzuz5MNZfASvEcyShkehxQQ1s8HPPfo0aPu8uXLRdnFUIJdYpEJGINlIaTiKVAp4vZorUGoES2EEN5SDCUmXig52oo2CjGC9CmGkhRrFAUbAX/FCuSIuVqDthqpM6QP44x3EBktchoVtR1d/0HgEDYdGPyeIo9glKTEeJAS40FKjAcpMR5EEtNo84t6IPUYD+pGDK/6vLxxsZbDwnb4oky9MOrEEKIQwcVSBxcEKHyDF2VYs4E8vo8mRo0YDIMEjB2pJ6geBDErHQ3UlBgZwSfGVWOYZHCNhvfUlBjeUiv1Eh8gRaFXS9SUGJRnEA17iQZdpQeNlOEC98Hv5FO31uTUjBiRok0xgXt2GORFKieSuCefPNLY9YSIIERekLCkUTNiwsYI8hZCDAJ0ukFewFNITyNtBUd5huqI0KRRE2I0SEYBj2Efee3atbabqV0CdhBYiGfzjg27lStXWpk7d+64z58/D/M6AcJqRUzFx0BKQZOzKJn0MpvskEE5jGPXkvLsaclQvrPFyukF9p1IJz8MCCM9Cf1FfnExPGlgrE9R0gkRtnc54nHv3j0LHTwG47kIMTzl4MGD7ubNm8O8JRxWtfKaxIlB0VKDIkbiNXgBocNOpDxMgBjkbN682cpwFESbdWFiAHWj0qtB4qGE0Rga3HUU6FmIIY9dSI6aQRChxJiEJ+HG8hxCiXKUJ08yw7rynXAKelYlqFkoIRgDo0imR0mndyGDpw4noTCYgwEQQH0u7ilLPie1OAVRyiPIS9pjEiUG5ejVqJ5TGvMavIoTUDyRODqGZ9DjPI0YlCGLcy0cNeHQEWdnqFcKkh/VdiVIlBigcCkHNvEpyydk6pgHdfEovISjIPPnzy8+rchLyvBySHSMQWl6G8/xGUAoadZLWYyX4UHgVZyVYV5DnsIrCrSlRzb3lYaVdE58jJFCpYjBOzTgcqqCe0hgIObpwxgFEXgQ51XwHEgphWBblZISRuKhRM+VA4bIGDyHnoYMHtM80eQZKsN3n7cIvo6oFIkTg0dgZKmewwi9JzHwUlahojN4ykNWOaN9A341SJwYEDVmhEH4EDZ8ihDGE0KLuprXgHJEl/OmuAi2YRJJQMFPnz7ZZ7VgXACljGEMwXh6m3K8KEIE8xu+kwfB5JfyiKQ8Be/EUwUjBsYhZN++fa69vb3qxqjP5SOGdEKH46kc61L7kMEYAyGk40EKTR/ohGo9hkF///79NmeiPVCUiKIcNN64cWPJno4DSEFeKYMoQ/iIQCmkwZtPvMonAzK4VK8a8ITcuXOnW7ZsWTFsM11dXTle7cV6qZ4eKWiE0IjTo1KIsuhQDpCmkE0Katd+fYILi4gkSQH0pjwH2VEXsB7K3wcJDJcLX7VGpru7O8e7CEYkScrIQdu1N7gURLjNfEVIfUkB9SMlygOrG86bGCkxHqTEeJB/EKTcRCFlxYOUmDyinsgpMR6kxHiQHa0p9r+GLGsQ9Z/1Nh7sr5pFvdqHPQny9F1vwmFCw2kqr3TJ5IqaJqh8GEpXXd0Lwfuo9kEwHUinMJSeaW9vz7F6BkFaUZPhghrAGL0pyzDWbpXOGgrfWRIQrJGAggLt0F6YIJWXzFKQjpKP9+ttnlUDZITtCMrnngt9SaMeSw4cT8l0dHTkWGeVMaxxoHB/P0oPX1KkIgK5lM4eEaABiBG5cSAlqwUygkbyGYdULtnCJ3VIY+Uwc+HChRwJGHP69GnX1tbq1m9YT81BETQ8ZCgVg2ujUkSIMjSYHweUl05xIGIE7kkL6+LTg848c+aMecqKFSsKy63aImWljT8X0Nl5b1goAATqApTXFW4sWFbXSIFBcUkB4TZESFw9WITn58X8+QORnMmTkSORBHYJCIeWlvCSYXNPdyCCcZa1X4YSDhbYPEZssnLF4DUECGluUgAcYLuGBa7mt7pC/EUM7DHYBgfcsQgjRu4TvsYy0lDyICXGg5QYD1JiPEiJ8SAlxoOUGA9SYjxIifEgJcaDlBgPUmI8SInxICXGg5QYD1JiPEiJ8SAlxoNscAmzsN7LHbt4pXfymh32z+1EDj8B7Osr/MHyAkhv/rVfdlb5/TebjgXnyBRCiRs2nPgFxoED/1nhAsYGMfz2kr8KwDYte0u2n93T05N7/PixFbh9+/bgPzdYYN+H0NxDER7Dz5n5e+X8TpO/DpDp7e3NPXz40MJJe9EDA/pLHgVC8KggmnFrBS+RXZx2yHIEhN19Etn1L5xkgIjC8YgwKc0KHRuBIPtZDjf8Ql6/RSwUGDuEBIFz8AN49rGL/6QXcOqBf6QAIAbS9HumOETp0FEY1IdwyeDTJy/YlnpRaXQe8vmOZwflMQwMdWwhjXLYwD12BMsL5FMX2TgI4wsYRgygYYTziQDuEVoOUoTTEjQWPFzEPXLIB+TrZEGYSNJRlPQo4yGfY3GSBZBHu+gZlkc6dXXyS5A8fardApz7H6zyhGuotUz4AAAAAElFTkSuQmCC" preserveAspectRatio="none"/>
            
          </svg>
        </div>
      `;
    }


    if (config.cardstyle === 'lite') {
      return html`
        <div class="container card">
          <svg viewBox="-0.5 ${config.solar.show_solar === 'no' ? 145.33 : -0.5} 483 ${config.solar.show_solar === 'no' ? 270.67 : 406}" height="${config.panel_mode === 'no' ? `${config.solar.show_solar === 'no' ? '246px' : '396px'}` : `${config.solar.show_solar === 'no' ? '75%' : '100%'}`}" width="100%"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <text id="daily_bat_charge_value" x="77.2" y="344.6" class= "st10 left-align" fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}" >${stateObj1.state ? stateObj1.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="77.2" y="357.2" class="st3 left-align"  fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}"  >DAILY CHARGE</text>
            <text id="duration" x="318.4" y="377.5" class="st4 left-align" fill="${config.battery.energy === 'hidden' || battery_power <= 0 ? 'transparent' : `${config.battery.colour}`}" >${duration}</text>
            <text id="duration_text" x="318.4" y="393.7" class="st3 left-align" fill="${config.battery.energy === 'hidden' || battery_power <= 0 ? 'transparent' : `${config.battery.colour}`}" >BATTERY RUNTIME</text>
            <text id="duration_text_charging" x="318.4" y="393.7" class="st3 left-align" fill="${config.battery.energy === 'hidden' || battery_power > 0 ? 'transparent' : `${config.battery.colour}`}" >${duration}</text>
            <text id="daily_bat_discharge_value" x="77.2" y="380.1" class="st10 left-align" fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}">${stateObj.state ? stateObj.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="77.2" y="393.7" class="st3 left-align"  fill="${config.battery.show_daily === 'no' ? 'transparent' : `${config.battery.colour}`}"  >DAILY DISCHARGE</text>
            <text id="daily_load_value" x="400.4" y="267.9" class="st10 left-align" fill="${config.load.show_daily === 'no' ? 'transparent' : `${config.load.colour}`}" >${stateObj2.state ? stateObj2.state : '0'} kWh</text>
            <text id="daily_load" x="400.4" y="282.1" class="st3 left-align" fill="${config.load.show_daily === 'no' ? 'transparent' : `${config.load.colour}`}" >DAILY LOAD</text>
            <text id="daily_grid_value" x="14.4" y="267.9" class="st10 left-align" fill="${config.grid.show_daily === 'no' ? 'transparent' : `${config.grid.colour}`}" >${stateObj3.state ? stateObj3.state : '0'} kWh</text>
            <text id="daily_grid" x="14.4" y="282.1" class="st3 left-align" fill="${config.grid.show_daily === 'no' ? 'transparent' : `${config.grid.colour}`}" >DAILY GRID</text>
            <text id="daily_solar_value" x="226.7" y="16.2" class="st10 left-align" fill="${config.solar.show_daily === 'no' || config.solar.show_solar === 'no' ? 'transparent' : `${config.solar.colour}`}">${stateObj4.state ? stateObj4.state : '0'} kWh</text>
            <text id="daily_solar" x="226.7" y="30.4" class="st3 left-align" fill="${config.solar.show_daily === 'no' || config.solar.show_solar === 'no' ? 'transparent' : `${config.solar.colour}`}">DAILY SOLAR</text>
            <text id="inverter_grid_voltage_154" x="270.2" y="168.2" class="st3 left-align" fill="${config.inverter.colour}" >${stateObj5.state ? stateObj5.state : '0'} V</text>
            <text id="inverter_load_freq_192" x="270.2" y="180.4" class="st3 left-align" fill="${config.inverter.colour}">${stateObj6.state ? stateObj6.state : '0'} Hz</text>
            <text id="inverter_out_164" x="270.2" y="192.6" class="st3 left-align" fill="${config.inverter.colour}">${stateObj7.state ? stateObj7.state : '0'} A</text>
            <text id="pv2_power_187" x="289.5" y="71" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${stateObj8.state ? stateObj8.state : '0'} W</text>
            <text id="pv1_power_186" x="188.1" y="71" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${stateObj9.state ? stateObj9.state : '0'} W</text>
            <text id="pvtotal_power" x="238.8" y="133.9" class="st4 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">${totalsolar ? totalsolar : '0'} W</text>
            <text x="162" y="94" class="st3 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">PV1</text>
            <text x="264" y="94" class="st3 st8" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}">PV2</text>
            <text id="battery_voltage_183" x="193" y="345" fill=${config.battery.colour} class="st4 st8">${stateObj11.state ? stateObj11.state : '0'} V</text>
            <text id="battery_soc_184" x="193" y="365.3" fill=${config.battery.colour} class="st4 st8">${stateObj12.state ? stateObj12.state : '0'} %</text>
            <text id="battery_out_190" x="193" y="385.6" fill=${config.battery.colour} class="st4 st8">${battery_power < '0' ? battery_power *-1 : battery_power} W</text>
            <text id="ess_power" x="340.1" y="219.2" class="st4 st8" fill="${config.load.colour}">${stateObj14.state ? stateObj14.state : '0'} W</text>
            <text id="grid_external_power_172" x="135.1" y="219.2" class="st4 st8" fill="${config.grid.colour}">${stateObj15.state ? stateObj15.state : '0'} W</text>
            <text id="pv1_v" x="196" y="94" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj16.state ? stateObj16.state : '0'} V</text>
            <text id="pv1_i" x="196" y="106" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj17.state ? stateObj17.state : '0'} A</text>
            <text id="pv2_v" x="296" y="94" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj18.state ? stateObj18.state : '0'} V</text>
            <text id="pv2_i" x="296" y="106" class="st3 left-align" display="${config.solar.show_solar === 'no' ? 'none' : ''}" fill="${config.solar.colour}" >${stateObj19.state ? stateObj19.state : '0'} A</text>
            <text id="timer_text_off" x="287" y="254.7" class="st3 left-align" display="${stateObj26.state == 'off' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Timer off</text>
            <text id="timer_text_on" x="287" y="254.7" class="st3 left-align" display="${stateObj26.state == 'on' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Timer on</text>
            <text id="priority_text_batt"x="287" y="273" class="st3 left-align" display="${stateObj25.state === 'off' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Priority Batt</text>
            <text id="priority_text_load"x="287" y="273" class="st3 left-align" display="${stateObj25.state === 'on' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}">Priority Load</text>
            
            <circle id="standby" cx="220" cy="260" r="3.5" fill="${inverterStateColour}"/>
            <circle id="grid" cx="31.3" cy="251.6" r="3.5" fill="${stateObj20.state === 'off' || stateObj20.state === '0' ? 'red' : 'transparent'}"/>
            
            <path id="pv1-line" d="M 189 84.5 L 189 122.03 Q 189 132.03 197 132.03 L 205 132.03" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${stateObj9.state === '0' ? 'transparent' : `${config.solar.colour}`}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv1-line"/>
              </animateMotion>
            </circle>
            <path id="pv2-line" d="M 289 84.5 L 289 121.48 Q 289 131.48 282 131.49 L 275 131.5" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${stateObj8.state === '0' ? 'transparent' : `${config.solar.colour}`}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv2-line"/>  
              </animateMotion>
            </circle>
            <rect x="205" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
            <path id="bat-line" d="M 239.23 250 L 239.21 288.03 Q 239.21 298.03 239.1 308.02 L 239 324" fill="none" stroke="${config.battery.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="power-dot-charge" cx="0" cy="0" r="3" fill="${parseInt(battery_power) < '0' ? 'transparent' : `${config.battery.colour}`}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <circle id="power-dot-discharge" cx="0" cy="0" r="3" fill="${parseInt(battery_power) >= '0' ? 'transparent' : `${config.battery.colour}`}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <rect x="159" y="329.75" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="${config.battery.colour}" pointer-events="all"/>
            <path id="so-line" d="M 239.23 190 L 239.22 174.02 Q 239.21 168.03 239.1 158.04 L 239 147" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="none" stroke="${config.solar.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="so-dot" cx="0" cy="0" r="3" class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : `${config.solar.colour}`}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#so-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line" d="M 173 218.25 L 214 218" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : `${config.grid.colour}`}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line1" d="M 103 218.25 L 64.5 218.25" fill="none" stroke="${config.grid.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="grid-dot1" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : `${config.grid.colour}`}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <rect x="103" y="203.5" width="70" height="29.5" rx="4.42" ry="4.42" fill="none" stroke="${config.grid.colour}" pointer-events="all"/>
            <path id="es-line" d="M 304 218.5 L 264.7 218.48" fill="none" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : `${config.load.colour}`}">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line"/>
              </animateMotion>
            </circle>
            <path id="es-line1" d="M 374 218.5 L 402.38 218.52" fill="none" stroke="${config.load.colour}" stroke-width="1" stroke-miterlimit="10"  pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : `${config.load.colour}`}">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line1"/>
              </animateMotion>
            </circle>
            <rect x="304" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.load.colour}" pointer-events="all"/>
            <svg xmlns="http://www.w3.org/2000/svg" id="sun" x="160" y="0" width="56" height="56" viewBox="0 0 24 24"><path class="${config.solar.show_solar === 'no' ? 'st12' : ''}" fill="${config.solar.colour}" d="M11.45 2v3.55L15 3.77L11.45 2m-1 6L8 10.46l3.75 1.25L10.45 8M2 11.45L3.77 15l1.78-3.55H2M10 2H2v8c.57.17 1.17.25 1.77.25c3.58.01 6.49-2.9 6.5-6.5c-.01-.59-.1-1.18-.27-1.75m7 20v-6h-3l5-9v6h3l-5 9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > '80' ? '1' : '0'}" viewBox="0 0 24 24"> <path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-9H5v3h6V7m0 4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) <= 80 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > 30 && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="${config.battery.colour}" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m12-6h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= 30 ? '1' : '0'}" viewBox="0 0 24 24"> <path fill="${config.battery.colour}" d="M23.05 11h-3V4l-5 10h3v8M12 20H4l.05-14h8m.67-2h-1.67V2h-6v2H3.38a1.33 1.33 0 0 0-1.33 1.33v15.34c0 .73.6 1.33 1.33 1.33h9.34c.73 0 1.33-.6 1.33-1.33V5.33A1.33 1.33 0 0 0 12.72 4Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="transmission" x="-0.5" y="187.5" width="64.5" height="64.5" viewBox="0 0 24 24"><path fill="${config.grid.colour}" d="m8.28 5.45l-1.78-.9L7.76 2h8.47l1.27 2.55l-1.78.89L15 4H9l-.72 1.45M18.62 8h-4.53l-.79-3h-2.6l-.79 3H5.38L4.1 10.55l1.79.89l.73-1.44h10.76l.72 1.45l1.79-.89L18.62 8m-.85 14H15.7l-.24-.9L12 15.9l-3.47 5.2l-.23.9H6.23l2.89-11h2.07l-.36 1.35L12 14.1l1.16-1.75l-.35-1.35h2.07l2.89 11m-6.37-7l-.9-1.35l-1.18 4.48L11.4 15m3.28 3.12l-1.18-4.48l-.9 1.36l2.08 3.12Z"/></svg>

            <svg xmlns="http://www.w3.org/2000/svg" id="essen" x="402" y="177.5" width="79" height="79" viewBox="0 0 24 24"><path fill="${config.load.colour}" d="M15 9h1V7.5h4V9h1c.55 0 1 .45 1 1v11c0 .55-.45 1-1 1h-6c-.55 0-1-.45-1-1V10c0-.55.45-1 1-1m1 2v3h4v-3h-4m-4-5.31l-5 4.5V18h5v2H5v-8H2l10-9l2.78 2.5H14v1.67l-.24.1L12 5.69Z"/></svg>
            <rect x="154" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
            <rect x="254" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="${config.solar.colour}" pointer-events="all" class="${config.solar.show_solar === 'no' ? 'st12' : ''}"/>
            
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" x="213.5" y="179.5" width="54" height="79" viewBox="0 0 74 91"  preserveAspectRatio="xMidYMid meet"> <g transform="translate(0.000000,91.000000) scale(0.100000,-0.100000)" fill="${config.inverter.colour}" stroke="none"> <path d="M35 887 l-27 -23 0 -404 0 -404 27 -23 c26 -23 28 -23 329 -23 284 0 305 1 327 19 l24 19 0 412 0 412 -24 19 c-22 18 -43 19 -327 19 -301 0 -303 0 -329 -23z m585 -157 l0 -80 -255 0 -255 0 0 80 0 80 255 0 255 0 0 -80z m-242 -229 c44 -34 40 -46 -14 -46 -60 0 -97 -38 -93 -94 5 -64 -23 -80 -35 -20 -9 44 24 113 63 134 35 18 34 15 21 50 -11 29 -14 30 58 -24z m110 -129 c4 -51 -19 -97 -59 -117 -27 -14 -30 -20 -23 -48 l6 -31 -51 43 c-29 24 -49 46 -46 49 3 4 23 5 44 3 58 -4 95 32 97 95 3 60 1 57 17 52 6 -3 13 -23 15 -46z"/> </g> </svg>
            
            <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="267.7" y="243.3" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'on' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="267.7" y="243.3" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj26.state == 'off' && config.entities.use_timer_248 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="267.7" y="262.5" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'off' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="267.7" y="262.5" width="18" height="18" viewBox="0 0 24 24"><path display="${stateObj25.state === 'on' && config.entities.priority_load_243 !== 'no' ? '' : 'none'}" fill="${config.inverter.colour}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>

            <image x="213.5" y="179.5" width="52" height="72" class="${config.inverter.modern === 'yes' ? 'st12' : ''}" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            
            </svg>
        </div>
      `;
    }
  }

  
  setConfig(config) {
    if (!config.cardstyle) {
      throw new Error('Please include the cardstyle attribute and value; lite, simple or full e.g. cardstyle: simple');
    }
    if (!config.panel_mode) {
      throw new Error('Please include the panel_mode attribute and value; yes or no e.g. panel_mode: yes');
    }
    if (!config.battery.energy) {
      throw new Error('Please include the battery energy attribute and value in Wh e.g. 5.32 Battery energy: 5320');
    }
    if (!config.battery.shutdown_soc) {
      throw new Error('Please include the battery shutdown_soc attribate and value e.g shutdown_soc: 20');
    }
    if (!config.battery.invert_power) {
      throw new Error('Please include the battery invert_power attribute and value e.g. invert_power: no');
    }
    if (!config.battery.colour) {
      throw new Error('Please include the battery colour attribute and value e.g. colour: pink');
    }
    if (!config.battery.show_daily) {
      throw new Error('Please include the battery show_daily attribute and value e.g. show_daily: no');
    }
    if (!config.solar.show_solar) {
      throw new Error('Please include the solar show_solar attribute and value; yes or no e.g. show_solar: yes');
    }
    if (!config.solar.colour) {
      throw new Error('Please include the solar colour attribute and value e.g. colour: orange');
    }
    if (!config.solar.show_daily) {
      throw new Error('Please include the solar show_daily attribute and value; yes or no e.g. show_daily: no');
    }
    if (!config.inverter.modern) {
      throw new Error('Please include the inverter modern attribute and value e.g. modern: yes');
    }
    if (!config.inverter.colour) {
      throw new Error('Please include the inverter colour attribute and value e.g. colour: red');
    }
    if (!config.load.colour) {
      throw new Error('Please include the load colour attribute and value e.g. colour: cyan');
    }
    if (!config.load.show_daily) {
      throw new Error('Please include the load show_daily attribute and value; yes or no e.g. show_daily: no');
    }
    if (!config.grid.colour) {
      throw new Error('Please include the grid colour attribute and value e.g. colour: purple');
    }
    if (!config.grid.show_daily) {
      throw new Error('Please include the grid show_daily attribute and value; yes or no e.g. show_daily: no');
    }

    const attributes = [
      'use_timer_248', 'priority_load_243', 'batchargeday_70', 'batdischargeday_71', 'loadday_84', 
      'gridday_76', 'solarday_108', 'inverter_grid_voltage_154', 'inverter_load_freq_192', 
      'inverter_out_164', 'inverter_out_175', 'inverter_load_grid_169', 'pv2_power_187', 
      'pv1_power_186', 'battery_voltage_183', 'battery_soc_184', 
      'battery_out_190', 'ess_power', 'grid_external_power_172', 'pv1_v_109', 'pv1_i_110', 
      'pv2_v_111', 'pv2_i_112', 'grid_status_194', 'inverter_status_59', 'aux_power_166'
    ];
  
    for (const attr of attributes) {
      if (!config.entities[attr]) {
        throw new Error(`Please include the ${attr} attribute and entity ID e.g. ${attr}: sensor.example`);
      }
    }    

    this._config = config;
  }

  getCardSize() {
    return 2;
  }
}

customElements.define('sunsynk-power-flow-card', SunsynkPowerFlowCard);
customElements.define("sunsynk-power-flow-card-editor", SunsynkPowerFlowCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "sunsynk-power-flow-card",
  name: "Sunsynk Power Flow Card",
  preview: false, // Optional - defaults to false
  description: "A Home Assistant card to emulate the Sunsynk power flow that's shown on the Inverter screen", // Optional
});
