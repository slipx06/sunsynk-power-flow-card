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
        cardstyle: "lite",
        dailyusage: "yes",
        battery_energy: "15960",
        battery_shutdown_soc: "20",
        solar_installed: "yes",
        use_timer_268: "switch.toggle_system_timer",
        priority_load_243: "switch.toggle_priority_load",
        batdischargeday_71: "sensor.battery_discharge_day",
        batchargeday_70: "sensor.battery_charge_day",
        loadday_84: "sensor.daily_load_power_kwh",
        gridday_76: "sensor.grid_import_day_buy",
        solarday_108: "sensor.daily_pv_power_kwh",
        inverter_grid_voltage_154: "sensor.grid_inverter_voltage",
        inverter_load_freq_192: "sensor.load_frequency",
        inverter_out_164: "sensor.inverter_output_current",
        inverter_out_175: "sensor.inverter_output_power",
        inverter_load_grid_169: "sensor.grid_inverter_load",
        pv2_power_187: "sensor.pv2_power",
        pv1_power_186: "sensor.pv1_power",
        //pvtotal_power: "sensor.sunsynk_totalsolar",
        battery_voltage_183: "sensor.battery_voltage",
        battery_soc_184: "sensor.battery_soc",
        battery_out_190: "sensor.battery_output_power",
        ess_power: "sensor.load_power",
        grid_external_power_172: "sensor.grid_external_power",
        pv1_v_109: "sensor.dc1_voltage",
        pv1_i_110: "sensor.dc1_current",
        pv2_v_111: "sensor.dc2_voltage",
        pv2_i_112: "sensor.dc2_current",
        grid_status_194: "binary_sensor.grid_connected_status",
        inverter_status_59: "sensor.overall_state",
        aux_power_166: "sensor.aux_output_power",
        //non_ess_power: "sensor.sunsynk_non_essential_load"

    }
  }

  render() {
    const config = this._config;
    const stateObj = this.hass.states[config.batdischargeday_71] ? this.hass.states[config.batdischargeday_71] : { state: '0' };
    const stateObj1 = this.hass.states[config.batchargeday_70] ? this.hass.states[config.batchargeday_70] : { state: '0' };
    const stateObj2 = this.hass.states[config.loadday_84] ? this.hass.states[config.loadday_84] : { state: '0' };
    const stateObj3 = this.hass.states[config.gridday_76] ? this.hass.states[config.gridday_76] : { state: '0' };
    const stateObj4 = this.hass.states[config.solarday_108] ? this.hass.states[config.solarday_108] : { state: '0' };
    const stateObj5 = this.hass.states[config.inverter_grid_voltage_154] ? this.hass.states[config.inverter_grid_voltage_154] : { state: '0' };
    const stateObj6 = this.hass.states[config.inverter_load_freq_192] ? this.hass.states[config.inverter_load_freq_192] : { state: '0' };
    const stateObj7 = this.hass.states[config.inverter_out_164] ? this.hass.states[config.inverter_out_164] : { state: '0' };
    const stateObj8 = this.hass.states[config.pv2_power_187] ? this.hass.states[config.pv2_power_187] : { state: '0' };
    const stateObj9 = this.hass.states[config.pv1_power_186] ? this.hass.states[config.pv1_power_186] : { state: '0' };
    //const stateObj10 = this.hass.states[config.pvtotal_power] ? this.hass.states[config.pvtotal_power] : { state: '0' };
    const stateObj11 = this.hass.states[config.battery_voltage_183] ? this.hass.states[config.battery_voltage_183] : { state: '0' };
    const stateObj12 = this.hass.states[config.battery_soc_184] ? this.hass.states[config.battery_soc_184] : { state: '0' };
    const stateObj13 = this.hass.states[config.battery_out_190] ? this.hass.states[config.battery_out_190] : { state: '0' };
    const stateObj14 = this.hass.states[config.ess_power] ? this.hass.states[config.ess_power] : { state: '0' };
    const stateObj15 = this.hass.states[config.grid_external_power_172] ? this.hass.states[config.grid_external_power_172] : { state: '0' };
    const stateObj16 = this.hass.states[config.pv1_v_109] ? this.hass.states[config.pv1_v_109] : { state: '0' };
    const stateObj17 = this.hass.states[config.pv1_i_110] ? this.hass.states[config.pv1_i_110] : { state: '0' };
    const stateObj18 = this.hass.states[config.pv2_v_111] ? this.hass.states[config.pv2_v_111] : { state: '0' };
    const stateObj19 = this.hass.states[config.pv2_i_112] ? this.hass.states[config.pv2_i_112] : { state: '0' };
    const stateObj20 = this.hass.states[config.grid_status_194] ? this.hass.states[config.grid_status_194] : { state: 'on' };
    const stateObj21 = this.hass.states[config.inverter_status_59] ? this.hass.states[config.inverter_status_59] : { state: 'normal' };
    const stateObj22 = this.hass.states[config.inverter_out_175] ? this.hass.states[config.inverter_out_175] : { state: '0' };
    const stateObj23 = this.hass.states[config.inverter_load_grid_169] ? this.hass.states[config.inverter_load_grid_169] : { state: '0' };
    const stateObj24 = this.hass.states[config.aux_power_166] ? this.hass.states[config.aux_power_166] : { state: '0' };
    const stateObj25 = this.hass.states[config.priority_load_243] ? this.hass.states[config.priority_load_243] : { state: 'undefined' };
    const stateObj26 = this.hass.states[config.use_timer_268] ? this.hass.states[config.use_timer_268] : { state: 'undefined' };;
    //const stateObj25 = this.hass.states[config.non_ess_power] ? this.hass.states[config.non_ess_power] : { state: '0' };
    
    const totalsolar = (parseInt(stateObj8.state) + parseInt(stateObj9.state));
    const nonessential = (parseInt(stateObj15.state) - parseInt(stateObj23.state));
    const essential = (parseInt(stateObj22.state) - (parseInt(stateObj24.state) - parseInt(stateObj23.state)));
        

    let duration = "";
    if (stateObj13.state > 0 && config.battery_energy !== "hidden") {
      let totalSeconds = ((((parseInt(stateObj12.state) - config.battery_shutdown_soc) / 100) * (config.battery_energy || 15960) ) / (stateObj13.state || 1)) * 60 * 60;
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
    
    if (stateObj13.state <= 0) {
      duration = "Charging";
    }

    if (config.cardstyle === 'full') {
      return html`
        <div class="container card">
          <svg viewBox="-0.5 -0.5 457 383" height="396px" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
          <text id="duration" x="34%" y="92%" class="${config.battery_energy === 'hidden' ? 'st11' : 'st2 st4 left-align'}" >${duration}</text>
          <text id="duration_text" x="34%" y="96%" class="${config.battery_energy === 'hidden' ? 'st11' : 'st2 st3 left-align'}" >BATTERY RUNTIME</text>
          <text id="inverter_grid_voltage_154" x="59%" y="44.5%" class="st4 st7 st8" >${stateObj5.state ? stateObj5.state : '0'} V</text>
          <text id="inverter_load_freq_192" x="59%" y="49.5%" class="st4 st7 st8">${stateObj6.state ? stateObj6.state : '0'} Hz</text>
          <text id="inverter_out_164" x="39.5%" y="52%" class="st4 st8 st9">${stateObj7.state ? stateObj7.state : '0'} A</text>
          <text id="pv2_power_187" x="30%" y="18.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${stateObj8.state ? stateObj8.state : '0'} W</text>
          <text id="pv1_power_186" x="8%" y="18.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${stateObj9.state ? stateObj9.state : '0'} W</text>
          <text id="pvtotal_power" x="19%" y="33.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${totalsolar ? totalsolar : '0'} W</text>
          <text x="4%" y="25%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st3 st8'}">PV1</text>
          <text x="26%" y="25%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st3 st8'}">PV2</text>
          <text id="battery_voltage_183" x="9%" y="83%" class="st2 st4 st8">${stateObj11.state ? stateObj11.state : '0'} V</text>
          <text id="battery_soc_184" x="9%" y="87.5%" class="st2 st4 st8">${stateObj12.state ? stateObj12.state : '0'} %</text>
          <text id="battery_out_190" x="9%" y="92%" class="st2 st4 st8">${stateObj13.state < '0' ? stateObj13.state *-1 : stateObj13.state} W</text>
          <text id="ess_power" x="59%" y="31%" class="st4 st6 st8">${essential ? essential : '0'} W</text>
          <text id="grid_external_power_172" x="92%" y="73.5%" class="st4 st7 st8">${stateObj15.state ? stateObj15.state : '0'} W</text>
          <text x="92%" y="98.5%" class="st3 st7 st8">Grid</text>
          <text x="40.5%" y="82%" class="st3 st7 st9">Status</text>
          <text x="90%" y="41%" class="st3 st6 st8">Essential</text>
          <text id="daily_solar_value" x="85" y="5%" class="${config.dailyusage === 'no' || config.solar_installed === 'no' ? 'st11' : 'st10 st1 left-align'}" >${stateObj4.state ? stateObj4.state : '0'} kWh</text>
          <text id="daily_solar" x="85" y="8.5%" class="${config.dailyusage === 'no' || config.solar_installed === 'no'  ? 'st11' : 'st3 st1 left-align'}" >DAILY SOLAR</text>
          <text id="pv1_v" x="15.75%" y="17%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj16.state ? stateObj16.state : '0'} V</text>
          <text id="pv1_i" x="15.75%" y="20%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj17.state ? stateObj17.state : '0'} A</text>
          <text id="pv2_v" x="37.75%" y="17%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj18.state ? stateObj18.state : '0'} V</text>
          <text id="pv2_i" x="37.75%" y="20%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj19.state ? stateObj19.state : '0'} A</text>
          <text id="daily_bat_charge_value" x="1%" y="62%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st2 left-align'}" >${stateObj1.state ? stateObj1.state : '0'} kWh</text>
          <text id="daily_bat_charge" x="1%" y="65.5%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st2 left-align'}" >DAILY CHARGE</text>
          <text id="daily_bat_discharge_value" x="1%" y="70.75%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st2 left-align'}" >${stateObj.state ? stateObj.state : '0'} kWh</text>
          <text id="daily_bat_charge" x="1%" y="74%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st2 left-align'}" >DAILY DISCHARGE</text>
          <text id="daily_grid_value" x="77%" y="60%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st7 left-align'}" >${stateObj3.state ? stateObj3.state : '0'} kWh</text>
          <text id="daily_grid" x="77%" y="63%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st7 left-align'}" >DAILY GRID</text>
          <text id="inverter_out_175" x="39.5%" y="46.5%" class="st4 st8 st9">${stateObj22.state ? stateObj22.state : '0'} W</text>
          <text id="inverter_load_grid_169" x="59%" y="54.5%" class="st4 st7 st8">${stateObj23.state ? stateObj23.state : '0'} W</text>
          <text id="aux_power_166" x="59%" y="12.5%" class="st4 st6 st8">${stateObj24.state ? stateObj24.state : '0'} W</text> 
          <text x="90%" y="21.5%" class="st3 st6 st8">Auxiliary</text> 
          <text id="non_ess_power" x="74%" y="73.5%" class="st4 st7 st8">${nonessential ? nonessential : '0'} W</text>  
          <text x="74%" y="98.5%" class="st3 st7 st8"> Non Essential</text>
          
          
          <circle id="standby" cx="36%" cy="81.75%" r="3.5" fill="${stateObj21.state === '0' || stateObj21.state === 'standby' ? 'blue' : 'transparent'}"/>
          <circle id="selftest" cx="36%" cy="81.75%" r="3.5" fill="${stateObj21.state === '1' || stateObj21.state === 'selftest' ? 'yellow' : 'transparent'}"/>
          <circle id="normal" cx="36%" cy="81.75%" r="3.5" fill="${stateObj21.state === '2' || stateObj21.state === 'normal' ? 'green' : 'transparent'}"/>
          <circle id="alarm" cx="36%" cy="81.75%" r="3.5" fill="${stateObj21.state === '3' || stateObj21.state === 'alarm' ? 'orange' : 'transparent'}"/>
          <circle id="fault" cx="36%" cy="81.75%" r="3.5" fill="${stateObj21.state === '4' || stateObj21.state === 'fault' ? 'red' : 'transparent'}"/>
          <circle id="grid" cx="88.5%" cy="98.5%" r="3.5" fill="${stateObj20.state === 'off' ? 'red' : 'transparent'}"/>


          <rect x="51" y="112" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
          <rect x="6" y="300.75" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="#f3b1c9" pointer-events="all"/>
          <rect x="234" y="153" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="#558fc1" pointer-events="all"/>
          <rect x="386" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#558fc1" pointer-events="all"/>
          <rect x="237" y="32" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#5fb5ab" pointer-events="all"/>
          <rect x="236" y="103" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#5fb5ab" pointer-events="all"/>
          <rect x="145.15" y="162" width="70" height="50" rx="7.5" ry="7.5" fill="none" stroke="#959595" pointer-events="all"/>
          <rect x="0" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
          <rect x="101" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
          <rect x="304" y="265" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#558fc1" pointer-events="all"/>


          <path id="pv1-line" d="M 35 92 L 35.02 117 Q 35.03 127 43.02 127 L 51 127" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
          <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${stateObj9.state === '0' ? 'transparent' : '#ff9933'}">
            <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#pv1-line"/>
            </animateMotion>
          </circle>

          <path id="pv2-line" d="M 135 92 L 135.02 117 Q 135.03 127 128.02 127 L 121 127" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
          <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${stateObj8.state === '0' ? 'transparent' : '#ff9933'}">
            <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#pv2-line"/>
            </animateMotion>
          </circle>

          <path id="so-line" d="M 155 245.19 L 96 245.2 Q 86 245.2 86 235.2 L 86 142" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
          <circle id="so-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : '#ff9933'}">
            <animateMotion dur="9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#so-line"/>
            </animateMotion>
          </circle>

          <path id="bat-line" d="M 155 285.06 L 105.5 285.09 Q 95.5 285.1 95.5 290.92 L 95.5 296.75" fill="none" stroke="#f3b1c9" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
          <circle id="power-dot-charge" cx="0" cy="0" r="3" fill="${parseInt(stateObj13.state) < '0' ? 'transparent' : '#f3b1c9'}">
            <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#bat-line"/>
            </animateMotion>
          </circle>
          <circle id="power-dot-discharge" cx="0" cy="0" r="3" fill="${parseInt(stateObj13.state) >= '0' ? 'transparent' : '#f3b1c9'}">
            <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#bat-line"/>
            </animateMotion>
          </circle>

          <path id="grid-line" d="M 304 188 L 411 188 Q 421 188 421 198 L421 265" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
          <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : '#558fc1'}">
            <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#grid-line"/>
            </animateMotion>
          </circle>

          <path id="grid-line1" d="M 421 295 L 421 310.5" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
          <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : '#558fc1'}">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#grid-line1"/>
            </animateMotion>
          </circle>
          
          <path id="ne-line1" d="M 339 295 L 339 306" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
          <circle id="ne-dot1" cx="0" cy="0" r="3" fill="${nonessential <= '0' ? 'transparent' : '#558fc1'}">
            <animateMotion dur="2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#ne-line1"/>
            </animateMotion>
          </circle> 
          <path id="ne-line" d="M 339 265 L 339 190" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
          <circle id="ne-dot" cx="0" cy="0" r="3" fill="${nonessential <= '0' ? 'transparent' : '#558fc1'}">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#ne-line"/>
          </animateMotion>
          </circle> 
          
          <path id="aux-line" d="M 307 47 L 371.5 47" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
          <circle id="aux-dot" cx="0" cy="0" r="3" fill="${stateObj24.state <= '0' ? 'transparent' : '#5fb5ab'}">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#aux-line"/>
            </animateMotion>
          </circle>

          <path id="aux-line2" d="M 197.65 162 L 197.7 57 Q 197.7 47 207.7 47 L 237 47" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
          <path d="M 215.15 187 L 224.58 187 Q 234 187 234 187.5 L 234 188" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
          <path d="M 180.15 212 L 180.15 225.25" fill="none" stroke="#959595" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>


          <path id="es-line2" d="M 306 118 L 330 118 Q 340 118 350 117.85 L 374 117.5" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
          <circle id="es-dot" cx="0" cy="0" r="3" fill="${essential === '0' ? 'transparent' : '#5fb5ab'}">
            <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
              <mpath xlink:href="#es-line2"/>
            </animateMotion>
          </circle>
          <path id="es-line" d="M 236 118 L 207.7 118 Q 197.7 118 197.69 128 L 197.65 162" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>  

          <image x="154.5" y="224.75" width="50.3" height="79.75" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > '80' ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-9H5v3h6V7m0 4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) <= 80 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > 30 && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m12-6h-3V3l-5 10h3v8"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="74.5" y="296.25" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= 30 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M23.05 11h-3V4l-5 10h3v8M12 20H4l.05-14h8m.67-2h-1.67V2h-6v2H3.38a1.33 1.33 0 0 0-1.33 1.33v15.34c0 .73.6 1.33 1.33 1.33h9.34c.73 0 1.33-.6 1.33-1.33V5.33A1.33 1.33 0 0 0 12.72 4Z"/></svg>
          <image x="6.5" y="-0.5" width="56" height="56" class="${config.solar_installed === 'no' ? 'st12' : ''}" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH0AAAB9CAYAAACPgGwlAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAJA0lEQVR42u2dbYxcVRmAn/fOFLfaRiOaAlWTkviDAi67M21UjKKRRPnwD2xhEwShdGfTKipBlCopBRKhxRKT3XZmS7HGFqRFTKQQgxE1xDR1d7Yl0BoaaP1hqZWWtpS6XXZ2Xn/M1tL17s79mnvuvTlP0h9tzz3nPfeZd+7cd849AxaLxWKxWCwWi8VisVgsFoslPsRrQy0XuxGuMB1wU2qyQpYN/st1DpXCpThakyXDfzcdpknynlsKl4P2mA64Kbn6S8Am9znIZdTZqOXC8zjOvdIzuMt0uCZwTAcQOeJ8pemchWvQelUrnU9quWO+6ZDjJnvS0aL3ucuNiPOKlgvP6rpih+nI4yKD0rlIf3FFm69zIFyDo0NaLjylAwsuNj2BVpNF6XlGj18Y4DgHYRFaz3zmZ1E6IJ8Kc/BE5le1XHhWK4VO07OJmoxK5/wI+mjIh0EdKGzVSuFS05OKimxKF5kdYW8OyvXAy1nJ/IxK50Mt6bWR+UNaKazVFek9d96LM+niPy3q9zBIP6O5NbKSuulJBiWb0uv6TsQ9npF9x46o+46dbEqH4xH1kynZp8mmdJEDIXvIpOzTZFP6+Ht7Ax6ZadmnyaL0Q7L0laM+jzkC0pd12afJoHR51Ufjw8DPqI30ybI975qOPC4yKJ0/eWjTyGz0USlVo/rQlxqyJ13HX5z6//RthOXk2vpk8V9PmA7VFFmTfpyDHx6c6j+lVH0OeM50kKZJbSlxCrbKyj/XTAeRdLIlXeu/Mh1CGsiS9P2Udr5kOog0kCHpskYENR1FGsiK9EOcnLHBdBBpIRvSlVVy5/YR02GkhSxIf42PjvSZDiIs+njHx+MaK/3SVb8ni/a8ZzqM0IzlVsQ1VMqlyybpHf696SjCogMLLgO9Oa7x0iz9dUZzy0wHEQ31VcToIq3SR4EbsvA1qFYKV6NcGeeYaZSuiC6WUnV42kZ9C881HWjTiWzpygEPxz1u+qQrd0nP8OZpm1QKtzOjlvyS7NH9twOxPzuXLunCg9JbXTNdE60US8AAyJVx3gb5RfvnzwK9z8TYaZGuoHdLT/XeaRuVi4tB19LYYSPPmCwyHfiUzJj5Q+A8E0OnQfop4CYpDa+erpEOdC5BdP1ZcxLpNh28a6zr2uei3Glq/KRL34s4n5NS9YnpGulA8TZUykzeQ0f5vK5fOM/0JP4PyT8IfNDU8EmVrsAvybcVm+0Lo+XiYnRShp9BqI/fYHoyZ8fb0Y4QWyHGjSQul9oLfEdK1ReaNdRy562IDjD9i7cbeMj0pP6H46xGzSZbkjL9APBd4BLvwuUxD3P4jK4rXmJ6cgA6UPx63IUYN5KQ6a+BPMrosY1yx+ujXg7Qgc5voZ6EN3DoBn5scpK6pSvH0X2rw/cUHlPS/w26BWSTlKo7/ByolcItKBvw9S6l3ar8xOjKmrffWIxIIjYx8i7dyT2Ajm2nLl8COhEuBrzs4jQG7EfZjcNfUF6kp/pqEAFaLt4M+jj+L0vzqHR8FnZub+G5nDru/vmzEFlpYmw3PEuXJTsOAZsn/jTert76xwXM4JMwPgeVPKIfAY5Td97FkZMgB9Hx/VKqjp3VWSnAiRsofhMNJLyB43QDRqSTn3k3hgoxbnjeG9Yk2rfwXM4ZfxrliwT/8HmIN2d/Iu518bqufS5Ofi/N78tPSqk6K46YkvTpfUrk2387Ij3VLwNzULkFZRvgV94cLjjRbAvRFgRvthDjGpLpAIKilcLHULkKtAvha3i5VCkbpbd6a2wxljvaEWcYb8kVW6anVvr78fECeIeT55wX18pZHSi84OO+3EoPStMXgEqX9A49HUMcVwPbfBySPOm6vvMi6hK+sqVyTHqH/hDH5LRSOB/kOqAL9As0dn5+RkpD17V03EYh5mX8LZCITbrf4syvCfvhz9HlQCzSpVQ9CPQBfWdeAHqtbrh8dkufT09QIcb1vPhprJXOJ0FuDDHeEfJt87K8IYD2z59FfuZe/O9Pm9BbNof7IdROiY9kWThwekVMFBsStwxf0hs/eCNbA451hHxbv+kJt5KJFTHfNx1HM/xfn3U8WLYrqzOf5Y1CTCs2I44U39Kld+eeANl+hBlta01PtpUkYUWMV4J9Eved7bIq81nuOKtJS1k76IFaLjyF4GWJ8VvURi7M8uZ8jRUx+nzIbk4hcm3go2vsk6VD+7w0DbGIor4SnOtp+uqWRzItvFGIWRVBV22oBq1f1HDq7V4bB347alzb+U2TZofJf2BdBCckuTQeTTK8Bk8qEz48Ee4aJM5Kpr22a6av5ROPJsW2mcAUnMDJPeDngFDSpWdwN1Nn+2Fqp7Kd5Y0VMWYLMcJPJ1Y1eSb8p82psl14ONPX8nXtc8Hco0kT/BPl534PCi1degZ3Izwz6Z8PMzZSNnxCWksSCjGq90ip6vtHiiK6r3Tu4/3ZnvUsT0YhZhcHh58IcmAk0hvXdv3txF+zn+VJKMRo/a6gPxMWXeCSW0Ej2x/KdpYXrzL/aJL+Tnp3/jHo0ZFJn8j29dRGKmZPSOvQLV05RGPfI2YSNVTvCdNBtI81vTm8NM2/TNiUY2/cBhEsGQvHej+FGDcytzCyVYRYERMlJ3Dyn/Z7Xz6ZVHwrlAhSWohxw0r3QJoLMW5Y6V5IcSHGjSRsSpBodAUOjmwL/n25fAP0ppBhDActxLhGFOH5sbiglc4fgIT7vl3rXw1zXz4Z+/aeeMIVYtyw0pNNDcktj7pTKz3RSGVizUKkWOnJxfeKGK9Y6UklokKMG1Z6MjkQVSHGDSs9iaj+KKpCjBtWevIIvCLGK1Z60gixIsYrVnqiiL4Q44aVnhzGW1GIccNKTwpKSwoxbljpyeAEufz9cQ1mpSeBFhZi3LDSzdPSQowbVrppWlyIccNKN0vLCzFuWOkmiaEQ44aVbox4CjFuWOlmiK0Q44aVboIYCzFuWOnxE2shxg0rPW5iLsS4YaXHS+yFGDes9DgRiezRpDBY6fGxiwNDm00HAVZ6fBgqxLhhpceCuUKMG/ap1Zbj1BAxVoixGED7FyTmh3UtFovFYrFYLBaLxWKxWCwWiwn+C4ByAuJqB8e4AAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEwLTMxVDIwOjQyOjQ3KzAwOjAwrvYJRwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMC0zMVQyMDo0Mjo0NyswMDowMN+rsfsAAAAASUVORK5CYII=" preserveAspectRatio="none"/>
          <image x="387" y="310" width="67" height="67" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
          <image x="300.5" y="305.5" width="76" height="76" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIoAAACKCAYAAAB1h9JkAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAD20lEQVR42u3bP2tTYRiG8eekFRFdCoLo4AdwcRTUoh0LIgWTUJy6CI5aBde6OTWhio4KDsW2DjrUQaFJWgdHFz+Agw46uImY5HVxEqRPTp9z3n/Xb25P3sBNc85FKgIAAAAAAAAAAAAAAAAA8KvdGSy0O4MF3+cITcP3AULS6gyWnLhNJ26rvTq46fs8IWEof7W7/Xsi7qmITIvIlCvck+Zq/4Hvc4Wi8H0A31obG1Puy4lHhZP//AVxz779cDd69+eGvs/qU9ZDmV/bPnxsePS5FNLa50dfizu0uLl8/qfvM/uS7VCuP96d+f1r/EpEZpW/8mF6NL6yfnfuu++z+5DlUBYf7p0aDYfbIsXZiX7RySdpNOY3b81+9v0e6pbdUFprgzMycm9E5HTJS3xtjBvzL+7MfvT9XuqU1VPPte7uORm5vpQfiYjIyXEx3mmu9rQfWUnIZiitbv9qw413ROT4gS9WyExRFG+b3d5+N8HJyGIorc5gSZy8FJEjhpc9XLhiPZcwl/xQ/glp1rIJc8nezO4f0qylHeaSHMoEIc1asmEuuaGUCGnWkgxzSQ2ldEizlmCYS2YoBiHNWlJhLomnHqOQZi2pMBf9UExDmrWEwlzUQ6kopFlLIsxFO5SKQ5q16MNcdDez9Yc0a3GGuaiG4jGkWYsuzEUzlABCmrWowlwUQwkmpFmLKMwFP5QAQ5q1KMJc0E89gYY0a1GEuWCHEnRIsxZBmAtyKJGENGtBh7nghhJZSLMWbJgL5mY2/pBmLawwF8RQEgpp1oIJc96HkmBIsxZEmPM6lGRDmrUAwpy3oWQQ0qx5DXNennoyCWnWvIa52oeSVUiz5jHM1TqUTEOaNS9hrrahZB7SrNUe5iq/mSWkVa2eMFfpUAhptak8zFU2FEJa7SoNc5UMhZDmSYVhznwohDTvKglzpk89hLQgVBLmzIZCSAtIBWHOZCiEtCCZhrkDD4WQFjSzMFf6ZpaQFpuDhblSQyGkRat0mJt4KIS06JUKcxMNhZCWiBJhrvZvuDU7O5cLaezU/bopcTKe27o916vzNYP7vx6EiaFAhaFAhaFAhaFAhaFAhaFAhaFAhaFAhaFAJZfvkLx3TvaquHBRyEURueD7DVYti6EUIu82ly+tVHHtdqe/4jIYCh89UGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoUGEoAAAAAAAAAAAAAAAAAAAAAAAAQP3+AF8q9V0hUDBuAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTEwLTMxVDIxOjE4OjQ2KzAwOjAws2Ln/QAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0xMC0zMVQyMToxODo0NiswMDowMMI/X0EAAAAASUVORK5CYII=" preserveAspectRatio="none"/>
          <image x="373.5" y="78.5" width="77" height="77" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
          <image x="371" y="5" width="83" height="83" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>

          <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="46%" y="65%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj26.state == 'on' && config.use_timer_268 !== 'no' ? 'st9' : 'st12'}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="46%" y="65%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj26.state == 'off' && config.use_timer_268 !== 'no' ? 'st9' : 'st12'}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
          <text id="timer_text"x="50%" y="68%" class="${config.use_timer_268 !== 'no' ? 'st3 st9 left-align' : 'st12'}">Timer</text>
          <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="46%" y="70%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj25.state === 'off' && config.priority_load_243 !== 'no' ? 'st9' : 'st12'}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
          <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="46%" y="70%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj25.state === 'on' && config.priority_load_243 !== 'no' ? 'st9' : 'st12'}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
          <text id="priority_text"x="50%" y="73%" class="${config.priority_load_243 !== 'no' ? 'st3 st9 left-align' : 'st12'}">Priority</text>
          </svg>
        </div>
      `;
    }

    if (config.cardstyle === 'simple') {
      return html`
        <div class="container card">
          <svg viewBox="-0.5 -0.5 456 380" height="396px" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <text id="inverter_grid_voltage_154" x="69%" y="40%" class="st4 st7 st8" >${stateObj5.state ? stateObj5.state : '0'} V</text>
            <text id="inverter_load_freq_192" x="69%" y="45%" class="st4 st7 st8">${stateObj6.state ? stateObj6.state : '0'} Hz</text>
            <text id="duration" x="34%" y="91%" class="${config.battery_energy === 'hidden' ? 'st11' : 'st2 st4 left-align'}" >${duration}</text>
            <text id="duration_text" x="34%" y="95%" class="${config.battery_energy === 'hidden' ? 'st11' : 'st2 st3 left-align'}" >BATTERY RUNTIME</text>  
            <text id="inverter_out_164" x="45%" y="47.5%" class="st4 st8 st9">${stateObj7.state ? stateObj7.state : '0'} A</text>
            <text id="pv2_power_187" x="30%" y="18.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${stateObj8.state ? stateObj8.state : '0'} W</text>
            <text id="pv1_power_186" x="8%" y="18.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${stateObj9.state ? stateObj9.state : '0'} W</text>
            <text id="pvtotal_power" x="19%" y="33.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${totalsolar ? totalsolar : '0'} W</text>
            <text x="4%" y="25%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st3 st8'}">PV1</text>
            <text x="26%" y="25%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st3 st8'}">PV2</text>
            <text id="battery_voltage_183" x="8%" y="81.5%" class="st2 st4 st8">${stateObj11.state ? stateObj11.state : '0'} V</text>
            <text id="battery_soc_184" x="8%" y="86.5%" class="st2 st4 st8">${stateObj12.state ? stateObj12.state : '0'} %</text>
            <text id="battery_out_190" x="8%" y="92%" class="st2 st4 st8">${stateObj13.state < '0' ? stateObj13.state *-1 : stateObj13.state} W</text>
            <text id="ess_power" x="68.5%" y="18.5%" class="st4 st6 st8">${stateObj14.state ? stateObj14.state : '0'} W</text>
            <text id="grid_external_power_172" x="91.5%" y="68.5%" class="st4 st7 st8">${stateObj15.state ? stateObj15.state : '0'} W</text>
            <text x="91.5%" y="96%" class="st3 st7 st8">Grid</text>
            <text x="45.5%" y="82%" class="st3 st7 st9">Status</text>
            <text x="92%" y="29%" class="st3 st6 st8">Essential</text>
            <text id="daily_solar_value" x="85" y="5%" class="${config.dailyusage === 'no' || config.solar_installed === 'no'  ? 'st11' : 'st10 st1 left-align'}" >${stateObj4.state ? stateObj4.state : '0'} kWh</text>
            <text id="daily_solar" x="85" y="8.5%" class="${config.dailyusage === 'no' || config.solar_installed === 'no' ? 'st11' : 'st3 st1 left-align'}" >DAILY SOLAR</text>
            <text id="pv1_v" x="16.5%" y="17%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj16.state ? stateObj16.state : '0'} V</text>
            <text id="pv1_i" x="16.5%" y="20%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj17.state ? stateObj17.state : '0'} A</text>
            <text id="pv2_v" x="38.5%" y="17%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj18.state ? stateObj18.state : '0'} V</text>
            <text id="pv2_i" x="38.5%" y="20%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj19.state ? stateObj19.state : '0'} A</text>
            <text id="daily_bat_charge_value" x="1%" y="61%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st2 left-align'}" >${stateObj1.state ? stateObj1.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="1%" y="64.5%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st2 left-align'}" >DAILY CHARGE</text>
            <text id="daily_bat_discharge_value" x="1%" y="69.75%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st2 left-align'}" >${stateObj.state ? stateObj.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="1%" y="73%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st2 left-align'}" >DAILY DISCHARGE</text>
            <text id="daily_grid_value" x="70%" y="86%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st7 left-align'}" >${stateObj3.state ? stateObj3.state : '0'} kWh</text>
            <text id="daily_grid" x="70%" y="89.5%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st7 left-align'}" >DAILY GRID</text>
            <text id="daily_load_value" x="83%" y="5%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st6 left-align'}" >${stateObj2.state ? stateObj2.state : '0'} kWh</text>
            <text id="daily_load" x="83%" y="8.5%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st6 left-align'}" >DAILY LOAD</text>
            <text id="inverter_out_175" x="45%" y="42.5%" class="st4 st8 st9">${stateObj22.state ? stateObj22.state : '0'} W</text>
            <text id="inverter_load_grid_169" x="69%" y="49.5%" class="st4 st7 st8">${stateObj23.state ? stateObj23.state : '0'} W</text>

            <circle id="standby" cx="41%" cy="81.75%" r="3.5" fill="${stateObj21.state === '0' || stateObj21.state === 'standby' ? 'blue' : 'transparent'}"/>
            <circle id="selftest" cx="41%" cy="81.75%" r="3.5" fill="${stateObj21.state === '1' || stateObj21.state === 'selftest' ? 'yellow' : 'transparent'}"/>
            <circle id="normal" cx="41%" cy="81.75%" r="3.5" fill="${stateObj21.state === '2' || stateObj21.state === 'normal' ? 'green' : 'transparent'}"/>
            <circle id="alarm" cx="41%" cy="81.75%" r="3.5" fill="${stateObj21.state === '3' || stateObj21.state === 'alarm' ? 'orange' : 'transparent'}"/>
            <circle id="fault" cx="41%" cy="81.75%" r="3.5" fill="${stateObj21.state === '4' || stateObj21.state === 'fault' ? 'red' : 'transparent'}"/>
            <circle id="grid" cx="88%" cy="95.75%" r="3.5" fill="${stateObj20.state === 'off' ? 'red' : 'transparent'}"/>
            
            <path id="pv1-line" d="M 35 92 L 35.02 117 Q 35.03 127 43.02 127 L 51 127" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${stateObj9.state === '0' ? 'transparent' : '#ff9933'}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv1-line"/>
              </animateMotion>
            </circle>

            <path id="pv2-line" d="M 135 92 L 135.02 117 Q 135.03 127 128.02 127 L 121 127" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
            <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${stateObj8.state === '0' ? 'transparent' : '#ff9933'}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv2-line"/>
              </animateMotion>
            </circle>

            <rect x="51" y="112" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
            <rect x="279" y="135" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="#558fc1" pointer-events="all"/>
            <rect x="382" y="243" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#558fc1" pointer-events="all"/>
            <rect x="278" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#5fb5ab" pointer-events="all"/>
            <rect x="169.15" y="145" width="70" height="50" rx="7.5" ry="7.5" fill="none" stroke="#959595" pointer-events="all"/>
            <rect x="0" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
            <rect x="101" y="54" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
            <rect x="0" y="295" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="#f3b1c9" pointer-events="all"/>

            <path id="bat-line" d="M 179 259.87 L 105.03 259.89 Q 95.03 259.9 95.03 269.86 L 95.03 290" fill="none" stroke="#f3b1c9" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="power-dot-charge" cx="0" cy="0" r="3" fill="${parseInt(stateObj13.state) < '0' ? 'transparent' : '#f3b1c9'}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <circle id="power-dot-discharge" cx="0" cy="0" r="3" fill="${parseInt(stateObj13.state) >= '0' ? 'transparent' : '#f3b1c9'}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>

            <path id="so-line" d="M 179 239.94 L 96 239.9 Q 86 239.9 86 229.9 L 86 142" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/> 
            <circle id="so-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : '#ff9933'}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#so-line"/>
              </animateMotion>
            </circle>

            <path id="es-line-long" d="M 278 69 L 215.03 69 Q 205.03 69 205.03 79 L 205.03 110.03 Q 205.03 120.03 204.68 130.03 L 204.15 145" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : '#5fb5ab'}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line-long"/>
              </animateMotion>
            </circle>

            <path id="es-line" d="M 348 69 L 377.5 69" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : '#5fb5ab'}">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line"/>
              </animateMotion>
            </circle>


            <path id="grid-line" d="M 349 170 L 407.03 170.03 Q 417.03 170.03 417.03 180.03 L 417 243" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : '#558fc1'}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>

            <path id="grid-line1" d="M 417 273 L 417 293.5" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : '#558fc1'}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>


            <path d="M 239.15 170 L 279 170" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <path d="M 204.15 195 L 204.15 220" fill="none" stroke="#959595" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            
            <image x="178.5" y="219.5" width="50.3" height="79.75" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > '80' ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-9H5v3h6V7m0 4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) <= 80 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > 30 && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m12-6h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="73.5" y="290" width="82" height="82" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= 30 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M23.05 11h-3V4l-5 10h3v8M12 20H4l.05-14h8m.67-2h-1.67V2h-6v2H3.38a1.33 1.33 0 0 0-1.33 1.33v15.34c0 .73.6 1.33 1.33 1.33h9.34c.73 0 1.33-.6 1.33-1.33V5.33A1.33 1.33 0 0 0 12.72 4Z"/></svg>
            <image x="383" y="293" width="67" height="67" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            <image x="377" y="30" width="77" height="77" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAACGCAYAAAAYefKRAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QAAAAAAAD5Q7t/AAAACXBIWXMAAABgAAAAYADwa0LPAAAHS0lEQVR42u3dXWxb5RkH8P9jO0kTS4gIpopqmwQXCBUQF7vYpo1BtzFaxySlja0SRuxUG4yLalwg9QYEV1O5mISAofHVxo6SiOMUkfbEKbSoMC7YkCZtIDakrWhwAWLsi6IUkvicZxekE4MXx8fn2O+x/f/dVE3Oef287r/n4/GrY4CIiIiIiIiIiIiIiIiIiIiIqAVyjjOYc5xB23XERcJ2AXEw4c4OD6XluXRaTt9ybO5i2/XEgdguwLb9i/PbaqlkVSDXbPzoT76nu2ZG8+/Yrs2mng7GVNXZ7qssA/j65371XtJP7jp8054/2q7Rlp49ldy2tPBNX+UlfDEUAHCJl/BeLCwd/Z7tOm3pyWAUXGc0AT0NoN71xIWA/3zRreRs12tDzwWjuOQUIXIUQCN3IAMqmC9UnTtt191uPRWMSbdyUCFHAKQC7JaEyqPFauUQVHvmmqwnJppznORQWh4B8LNwI8n020MX/fTFHTtqtufUal0fjAPV6sCHujIjQETXCnp8wNuy7/HR0XO259ZKXR2MCXd2uE/6FwFcG+W4Avxu1VvPzo9O/MP2HFula4NhaFxFTP7se/7Obm2EdWUw6jSuovaeQDPTI/k/2J5z1LrurmSTxlXULlHI6W5shHXVEaNYXditqnNorEcRjuAVqK5s/OUTiHdXKbPvjO33ILrpdYmC69wOkUcBJJscYnXjz4GGtk7KVaWd42/YnnerdMWpZNKtHITIY2g+FB8J9Cb1dQcE/7Q9nzgI0gGMnYgaV/93AVk4sXAdPCwD+jXb87OpY48YB6rVgcG0zCNUKOQMxLv2s3cVpZ3jbyRr698C8JrtOdrUkcGYcGeHz+rKyZDdzFcT4n/bdMF4eOyWd9d17XoAL9ueqy0dF4z9i/PbUtJ3GuG6mSeTtf4fHsnkP/iyDeayt/77AknfAMWC7Tnb0FHBmKo6271U6pWQ3czywNZ/jRweG/tosw0fzmRWz53TfQB+bXvu7dYxF5+fNq7URf3FNZt5qJQZvwsi2ugOlXzeA3DnpFv5mwgO2X4f2qUjjhgNrriqRyG4uzSS+3mQUHxWOZt7QKBTALr+I3egA4Kx0bh6Bs13M1dVNF/K5H4Ztpbpkfy0JGRMgd3nzvpv2n5vWinWnc/iUuV+Be4LMcR/fNHdM5n8Szbn8ZPFua1esj8d9bhJb23lybGJ91tRcyyvMc43rjSCxtVMxv4nn2upvocFGvmiYi/VVwGQb0XNsQvG+RVXCNWjkDOQ2o3TXfShVrvFKhgbjatFCdejeDUhfvZIZt8HIcboebEJxv7F+W01SVYBhOlRnEzW+vc20qOg+mJxV9LuxhVtzvoRw1bjiuqzesSIQ+OKzKwdMYpLTlEhT4SoYVVFC+VM/mlbc+hmVhpc3dK4+t98jleuV5E8RC8F1BB0uRrA1ha89PuAvm54vZoAbykST5dG9v6mmYHbGoyc4yTTafmVAnc0PYjgXRXZVd41bn0hzW3PldOJ2pYSIHtt1/JlFKho6uOpmRsnV4Ls17ZTSc5xBofSmFNgd4hh3kxpYudTmb1vt6vuehLe4ByAUdt11CNATrzBFIA9AfdrvQl3drgP/ccg+G7zo+hvdTWVLe/ZE4vFugXXGYGIa7uORqkgU87klhvdvuV3JbdWj361D/0vhwsF3AFvyw/iEgoAUElM2K4hCFEEqrelp5LCiYUr4ekyBE2vuFbF4XfSF98Rt0cPCPRy2zUEdEWQjVsWjEL16Hfg+ccBDDc7hih+URoZvyeWPQrFYLwXLRjqDaAlp5KC64xC/ZMIEQoAkIQ+GMtQ9IDIgxHwGVcUU5EGo8lnXFEMRfIPGN0zriguQgfjfOMK4RpX3U3kcfj+7yMfN5H4BlRvb0XJoYLx6TOuJPJnXHUb8fXUdDZfiXrcolvJqSBewYhoxRXFVFPBmKo62z2VZWnP44zIgsB3JW1+xhVZEigYEay4og4R6FRSyuaPARhq9sWmqs5XfJW/2540bS4Wq8QpfhgMMmIwyIjBICMGg4wYDDJiMMiIwSAjBoOMGAwy4hK8NlDBocJS5WDk44ZcbF0Pg9Eel9kuICieSsiIwSAjBoOMGAwyYjDIiMEgIwaDjBgMMmIwyIjBICMGg4wYDDJiMMiIwSAjBoOMGAwyYjDIiMEgIwaDjBgMMor1YmDPlwOTbiXQF7CEUc7mHrA957iIdTBEcG+bX5LB2MBTCRkxGGTEYJARg0FGDAYZMRhkxGCQEYNBRgwGGbW187mGtdUkBiL/QheKXluDMZv58VkAeduTps3xVEJGDAYZMRhkxGCQEYPRrISu2i4hEMEngaZnu96OpfJX2yUEIvhLkM0ZjCapaEf1Y9RTJ8j2YrvgjqUqk9WFUwJ833YpDRR7qpTJ/Qgi2ugePGI0S0RrujYOxQu2S6lPT63rej5IKAAeMcJTleLSws0QySv8ywCJw382D4K31FOnnM09GzQUREREREREREREREQ95L+bKD4h+7oTggAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMi0xMC0zMVQyMToyMTo1MSswMDowMN+YlCYAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjItMTAtMzFUMjE6MjE6NTErMDA6MDCuxSyaAAAAAElFTkSuQmCC" preserveAspectRatio="none"/>
            <image x="6.5" y="-0.5" width="56" height="56" class="${config.solar_installed === 'no' ? 'st12' : ''}" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>

            <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="51%" y="64%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj26.state == 'on' && config.use_timer_268 !== 'no' ? 'st9' : 'st12'}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="51%" y="64%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj26.state == 'off' && config.use_timer_268 !== 'no' ? 'st9' : 'st12'}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
            <text id="timer_text"x="55%" y="67%" class="${config.use_timer_268 !== 'no' ? 'st3 st9 left-align' : 'st12'}">Timer</text>
            <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="51%" y="69%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj25.state === 'off' && config.priority_load_243 !== 'no' ? 'st9' : 'st12'}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="51%" y="69%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj25.state === 'on' && config.priority_load_243 !== 'no' ? 'st9' : 'st12'}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <text id="priority_text"x="55%" y="72%" class="${config.priority_load_243 !== 'no' ? 'st3 st9 left-align' : 'st12'}">Priority</text>
          
          </svg>
        </div>
      `;
    }


    if (config.cardstyle === 'lite') {
      return html`
        <div class="container card">
          <svg viewBox="-0.5 -0.5 483 406" height="396px" width="100%" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
            <text id="daily_bat_charge_value" x="16%" y="85%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st2 left-align'}" >${stateObj1.state ? stateObj1.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="16%" y="88%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st2 left-align'}" >DAILY CHARGE</text>
            <text id="duration" x="66%" y="93%" class="${config.battery_energy === 'hidden' ? 'st11' : 'st2 st4 left-align'}" >${duration}</text>
            <text id="duration_text" x="66%" y="97%" class="${config.battery_energy === 'hidden' ? 'st11' : 'st2 st3 left-align'}" >BATTERY RUNTIME</text>
            <text id="daily_bat_discharge_value" x="16%" y="93.75%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st2 left-align'}" >${stateObj.state ? stateObj.state : '0'} kWh</text>
            <text id="daily_bat_charge" x="16%" y="97%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st2 left-align'}" >DAILY DISCHARGE</text>
            <text id="daily_load_value" x="83%" y="66%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st6 left-align'}" >${stateObj2.state ? stateObj2.state : '0'} kWh</text>
            <text id="daily_load" x="83%" y="69.5%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st6 left-align'}" >DAILY LOAD</text>
            <text id="daily_grid_value" x="3%" y="66%" class="${config.dailyusage === 'no' ? 'st11' : 'st10 st7 left-align'}" >${stateObj3.state ? stateObj3.state : '0'} kWh</text>
            <text id="daily_grid" x="3%" y="69.5%" class="${config.dailyusage === 'no' ? 'st11' : 'st3 st7 left-align'}" >DAILY GRID</text>
            <text id="daily_solar_value" x="47%" y="4%" class="${config.dailyusage === 'no' || config.solar_installed === 'no' ? 'st11' : 'st10 st1 left-align'}" >${stateObj4.state ? stateObj4.state : '0'} kWh</text>
            <text id="daily_solar" x="47%" y="7.5%" class="${config.dailyusage === 'no' || config.solar_installed === 'no' ? 'st11' : 'st3 st1 left-align'}" >DAILY SOLAR</text>
            <text id="inverter_grid_voltage_154" x="36%" y="63.25%" class="st3 st9 left-align" >${stateObj5.state ? stateObj5.state : '0'} V</text>
            <text id="inverter_load_freq_192" x="36%" y="66.25%" class="st3 st9 left-align">${stateObj6.state ? stateObj6.state : '0'} Hz</text>
            <text id="inverter_out_164" x="36%" y="69.25%" class="st3 st9 left-align">${stateObj7.state ? stateObj7.state : '0'} A</text>
            <text id="pv2_power_187" x="60%" y="17.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${stateObj8.state ? stateObj8.state : '0'} W</text>
            <text id="pv1_power_186" x="39%" y="17.5%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${stateObj9.state ? stateObj9.state : '0'} W</text>
            <text id="pvtotal_power" x="49.5%" y="33%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st4 st8'}">${totalsolar ? totalsolar : '0'} W</text>
            <text x="36%" y="23%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st3 st8'}">PV1</text>
            <text x="56.5%" y="23%" class="${config.solar_installed === 'no' ? 'st12' : 'st1 st3 st8'}">PV2</text>
            <text id="battery_voltage_183" x="40%" y="85%" class="st2 st4 st8">${stateObj11.state ? stateObj11.state : '0'} V</text>
            <text id="battery_soc_184" x="40%" y="90%" class="st2 st4 st8">${stateObj12.state ? stateObj12.state : '0'} %</text>
            <text id="battery_out_190" x="40%" y="95%" class="st2 st4 st8">${stateObj13.state < '0' ? stateObj13.state *-1 : stateObj13.state} W</text>
            <text id="ess_power" x="70.5%" y="54%" class="st4 st6 st8">${stateObj14.state ? stateObj14.state : '0'} W</text>
            <text id="grid_external_power_172" x="28%" y="54%" class="st4 st7 st8">${stateObj15.state ? stateObj15.state : '0'} W</text>
            <text id="pv1_v" x="25%" y="16%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj16.state ? stateObj16.state : '0'} V</text>
            <text id="pv1_i" x="25%" y="19%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj17.state ? stateObj17.state : '0'} A</text>
            <text id="pv2_v" x="68.75%" y="16%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj18.state ? stateObj18.state : '0'} V</text>
            <text id="pv2_i" x="68.75%" y="19%" class="${config.solar_installed === 'no' ? 'st12' : 'st3 st1 left-align'}" >${stateObj19.state ? stateObj19.state : '0'} A</text>

            <circle id="standby" cx="54%" cy="65%" r="3.5" fill="${stateObj21.state === '0' || stateObj21.state === 'standby' ? 'blue' : 'transparent'}"/>
            <circle id="selftest" cx="54%" cy="66%" r="3.5" fill="${stateObj21.state === '1' || stateObj21.state === 'selftest' ? 'yellow' : 'transparent'}"/>
            <circle id="normal" cx="54%" cy="66%" r="3.5" fill="${stateObj21.state === '2' || stateObj21.state === 'normal' ? 'green' : 'transparent'}"/>
            <circle id="alarm" cx="54%" cy="66%" r="3.5" fill="${stateObj21.state === '3' || stateObj21.state === 'alarm' ? 'orange' : 'transparent'}"/>
            <circle id="fault" cx="54%" cy="66%" r="3.5" fill="${stateObj21.state === '4' || stateObj21.state === 'fault' ? 'red' : 'transparent'}"/>
            <circle id="grid" cx="6.5%" cy="62%" r="3.5" fill="${stateObj20.state === 'off' ? 'red' : 'transparent'}"/>

            <path id="pv1-line" d="M 189 84.5 L 189 122.03 Q 189 132.03 197 132.03 L 205 132.03" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="pv1-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${stateObj9.state === '0' ? 'transparent' : '#ff9933'}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv1-line"/>
              </animateMotion>
            </circle>

            <path id="pv2-line" d="M 289 84.5 L 289 121.48 Q 289 131.48 282 131.49 L 275 131.5" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="pv2-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${stateObj8.state === '0' ? 'transparent' : '#ff9933'}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#pv2-line"/>  
              </animateMotion>
            </circle>

            <rect x="205" y="116.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
            <path id="bat-line" d="M 239.23 260 L 239.21 288.03 Q 239.21 298.03 239.1 308.02 L 239 318" fill="none" stroke="#f3b1c9" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="power-dot-charge" cx="0" cy="0" r="3" fill="${parseInt(stateObj13.state) < '0' ? 'transparent' : '#f3b1c9'}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>
            <circle id="power-dot-discharge" cx="0" cy="0" r="3" fill="${parseInt(stateObj13.state) >= '0' ? 'transparent' : '#f3b1c9'}">
              <animateMotion dur="6s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#bat-line"/>
              </animateMotion>
            </circle>

            <image x="213.5" y="179.5" width="50.45" height="80" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            <rect x="159" y="329.75" width="70" height="70" rx="10.5" ry="10.5" fill="none" stroke="#f3b1c9" pointer-events="all"/>
            <path id="so-line" d="M 239.23 180 L 239.22 174.02 Q 239.21 168.03 239.1 158.04 L 239 148" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="none" stroke="#ff9933" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="so-dot" cx="0" cy="0" r="3" class="${config.solar_installed === 'no' ? 'st12' : ''}" fill="${totalsolar === 0 ? 'transparent' : '#ff9933'}">
              <animateMotion dur="9s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#so-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line" d="M 173 218.25 L 214 218" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="grid-dot" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : '#558fc1'}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line"/>
              </animateMotion>
            </circle>
            <path id="grid-line1" d="M 103 218.25 L 64.5 218.25" fill="none" stroke="#558fc1" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="grid-dot1" cx="0" cy="0" r="3" fill="${stateObj15.state <= '0' ? 'transparent' : '#558fc1'}">
              <animateMotion dur="8s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#grid-line1"/>
              </animateMotion>
            </circle>
            <rect x="103" y="203.5" width="70" height="29.5" rx="4.42" ry="4.42" fill="none" stroke="#558fc1" pointer-events="all"/>
            <path id="es-line" d="M 304 218.5 L 264.7 218.48" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : '#5fb5ab'}">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line"/>
              </animateMotion>
            </circle>
            <path id="es-line1" d="M 374 218.5 L 402.38 218.52" fill="none" stroke="#5fb5ab" stroke-width="2" stroke-miterlimit="10" stroke-dasharray="2 2" pointer-events="stroke"/>
            <circle id="es-dot" cx="0" cy="0" r="3" fill="${stateObj14.state === '0' ? 'transparent' : '#5fb5ab'}">
              <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath xlink:href="#es-line1"/>
              </animateMotion>
            </circle>
            <rect x="304" y="203.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#5fb5ab" pointer-events="all"/>
            <image x="160" y="0" width="56" height="56" class="${config.solar_installed === 'no' ? 'st12' : ''}" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-high" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > '80' ? '1' : '0'}" viewBox="0 0 24 24"> <path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-9H5v3h6V7m0 4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-med" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) >= 50 && parseInt(stateObj12.state) <= 80 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m0-4.5H5v3h6v-3M23 10h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-low" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) > 30 && parseInt(stateObj12.state) <= 49 ? '1' : '0'}" viewBox="0 0 24 24"><path fill="#f3b1c9" d="M12 20H4V6h8m.67-2H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M11 16H5v3h6v-3m12-6h-3V3l-5 10h3v8"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="bat-empty" x="232.5" y="325.5" width="78.75" height="78.75" preserveAspectRatio="none" opacity="${parseInt(stateObj12.state) <= 30 ? '1' : '0'}" viewBox="0 0 24 24"> <path fill="#f3b1c9" d="M23.05 11h-3V4l-5 10h3v8M12 20H4l.05-14h8m.67-2h-1.67V2h-6v2H3.38a1.33 1.33 0 0 0-1.33 1.33v15.34c0 .73.6 1.33 1.33 1.33h9.34c.73 0 1.33-.6 1.33-1.33V5.33A1.33 1.33 0 0 0 12.72 4Z"/></svg>
            <image x="-0.5" y="187.5" width="64.5" height="64.5" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            <image x="402" y="177.5" width="79" height="79" xlink:href="data:image/png;base64,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" preserveAspectRatio="none"/>
            <rect x="154" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>
            <rect x="254" y="54.5" width="70" height="30" rx="4.5" ry="4.5" fill="none" stroke="#ff9933" pointer-events="all" class="${config.solar_installed === 'no' ? 'st12' : ''}"/>

            <svg xmlns="http://www.w3.org/2000/svg" id="timer" x="55%" y="44%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj26.state == 'on' && config.use_timer_268 !== 'no' ? 'st9' : 'st12'}" d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42A8.962 8.962 0 0 0 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9a8.994 8.994 0 0 0 7.03-14.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="timer_off" x="55%" y="44%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj26.state == 'off' && config.use_timer_268 !== 'no' ? 'st9' : 'st12'}" d="m19.95 17.15l-1.5-1.5q.275-.675.413-1.337T19 13q0-2.9-2.05-4.95T12 6q-.6 0-1.275.125t-1.4.4l-1.5-1.5q.95-.5 2.012-.763T12 4q1.5 0 2.938.5t2.712 1.45l1.4-1.4l1.4 1.4l-1.4 1.4q.95 1.275 1.45 2.713T21 13q0 1.05-.263 2.087t-.787 2.063ZM13 10.2V8h-2v.2l2 2Zm6.8 12.4l-2.4-2.4q-1.2.875-2.588 1.338T12 22q-1.85 0-3.488-.713T5.65 19.35q-1.225-1.225-1.938-2.863T3 13q0-1.5.463-2.888T4.8 7.6L1.4 4.2l1.4-1.4l18.4 18.4l-1.4 1.4ZM12 20q1.05 0 2.05-.325t1.875-.925L6.2 9.025q-.6.875-.9 1.875T5 13q0 2.9 2.05 4.95T12 20ZM9 3V1h6v2H9Zm2.075 10.875Zm2.825-2.8Z"/></svg>
            <text id="timer_text" x="59%" y="46.75%" class="${config.use_timer_268 !== 'no' ? 'st3 st9 left-align' : 'st12'}">Timer</text>
            <svg xmlns="http://www.w3.org/2000/svg" id="pbat" x="55%" y="60.25%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj25.state === 'off' && config.priority_load_243 !== 'no' ? 'st9' : 'st12'}" d="M15.95 21.175L13.1 18.35l1.425-1.4l1.425 1.4l3.525-3.525l1.425 1.4l-4.95 4.95ZM8 22q-.425 0-.713-.288T7 21V5q0-.425.288-.713T8 4h2V2h4v2h2q.425 0 .713.288T17 5v7q-.525 0-1.025.088T15 12.35V6H9v14h2.35q.2.575.488 1.075t.687.925H8Zm1-2h2.35H11h.35H9Z"/></svg>
            <svg xmlns="http://www.w3.org/2000/svg" id="pload" x="55%" y="60.25%" width="18" height="18" viewBox="0 0 24 24"><path class="${stateObj25.state === 'on' && config.priority_load_243 !== 'no' ? 'st9' : 'st12'}" d="m15 13l-4 4v-3H2v-2h9V9l4 4M5 20v-4h2v2h10v-7.81l-5-4.5L7.21 10H4.22L12 3l10 9h-3v8H5Z"/></svg>
            <text id="priority_text"x="59%" y="63%" class="${config.priority_load_243 !== 'no' ? 'st3 st9 left-align' : 'st12'}">Priority</text>


          </svg>
        </div>
      `;
    }
  }

  
  setConfig(config) {
    if (!config.cardstyle) {
      throw new Error('Please include the cardstyle attribute and value; lite, simple or full e.g. cardstyle: simple');
    }
    if (!config.dailyusage) {
      throw new Error('Please include the dailyusage attribute and value; yes or no e.g. dailyusage: no');
    }
    if (!config.battery_energy) {
      throw new Error('Please include the battery_energy attribute and value in Wh e.g. 5.32 Battery battery_energy: 5320');
    }
    if (!config.battery_shutdown_soc) {
      throw new Error('Please include the battery shutdown percentage i.e. 20');
    }
    if (!config.solar_installed) {
      throw new Error('Please specify if solar should be displayed i.e. yes/no');
    }
    
    const attributes = [
      'use_timer_268', 'priority_load_243', 'batdischargeday_71', 'batchargeday_70', 'loadday_84', 
      'gridday_76', 'solarday_108', 'inverter_grid_voltage_154', 'inverter_load_freq_192', 
      'inverter_out_164', 'inverter_out_175', 'inverter_load_grid_169', 'pv2_power_187', 
      'pv1_power_186', 'battery_voltage_183', 'battery_soc_184', 
      'battery_out_190', 'ess_power', 'grid_external_power_172', 'pv1_v_109', 'pv1_i_110', 
      'pv2_v_111', 'pv2_i_112', 'grid_status_194', 'inverter_status_59', 'aux_power_166'
    ];
  
    for (const attr of attributes) {
      if (!config[attr]) {
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
