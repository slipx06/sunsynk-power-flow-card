# Sunsynk-Power-Flow-Card

An animated Home Assistant card to emulate the power flow that's shown on the Sunsynk Inverter screen. You can use this for most Inverters (Sunsynk, Deye, Solis, Lux and Goodwe) as long as you have the required sensor data. See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki) for integration methods and examples.

[![Open your Home Assistant instance and open a repository inside the Home Assistant Community Store.](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=slipx06&repository=sunsynk-power-flow-card&category=plugin)
 ![GitHub release (latest by date)](https://img.shields.io/github/v/release/slipx06/sunsynk-power-flow-card?style=for-the-badge) <a href="https://www.buymeacoffee.com/slipx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="28" width="120"></a>

## Documentation

Refer to [https://slipx06.github.io/sunsynk-power-flow-card/index.html](https://slipx06.github.io/sunsynk-power-flow-card/index.html)

## Features

* Option to switch between two card styles: `lite` or `full`.
* Animated power flow based on positive/negative/zero sensor values with configurable dynamic speed. (Supports inverted battery, AUX and grid power).
* Dynamic battery image based on SOC (empty->low->medium->high).
* Grid connected status.
* Configurable battery size and shutdown SOC to calculate and display remaining battery runtime based on current battery usage and system time slot setting i.e. SOC, Grid Charge. Can be toggled off.
* Daily Totals that can be toggled on or off.
* Hide all solar data if not installed or specify number of mppts in use. Set custom MPPT labels.
* "Use Timer" setting and "Energy Pattern" setting (Priority Load or Priority Battery) shown as dynamic icons with ability to hide if not required. If setup as switches can be toggled by clicking on the card
* Panel mode for bigger card
* AUX and Non-essential can be hidden from the full card or assigned configurable labels
* Customisable - Change colours and images
* Most entities can be clicked to show more-info dialog
* Optional data points include self sufficiency and ratio percentages, battery temperature, AC and DC temperature
* Display additional non-essential, essential and AUX loads
* Display energy cost per kWh and solar sell status
* Select your inverter model for custom inverter status and battery status messages i.e. Sunsynk, Lux, Goodwe, Solis

## Screenshots

*Lite Version*

![sun_lite](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/a511b3e5-ad0b-429a-915d-3bc863c1ff65)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/1c44a09b-2914-4cbd-919d-477789137acd)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/9e3b86d7-ba07-4a5f-92c1-2aeddbbe9518)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/df6ec972-cb7e-4b69-925f-e8917ed98c42)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/275b0940-a3eb-428c-8ac0-b56b1a0e543a)

*Full Version*

![sun_full](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/791c12a0-e80a-4d30-a211-3c60b4f8ac88)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/cd55d1e7-b821-4b3f-a308-8efca55fdda2)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/fe4157a8-4f87-4296-b48e-2a6819c00106)
![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/8f5f9f90-513a-460e-b96c-9043c9a3276d)


## Installation

The card can be installed  via HACS (recommended) or manually

### Installation using HACS 
[![hacs_badge](https://img.shields.io/badge/HACS-Default-blue.svg)](https://github.com/custom-components/hacs)

1. Install HACS
2. Search & Install sunsynk-power-flow-card

### Manual Installation

1. Create a new directory under `www` and name it `sunsynk-power-flow-card` e.g www/sunsynk-power-flow-card/
2. Copy the `sunsynk-power-flow-card.js` into the directory
3. Add the resource to your Dashboard. You can append the filename with a `?ver=x` and increment x each time you download a new version to force a reload and avoid using a cached version. It is also a good idea to clear your browser cache.

![image](https://user-images.githubusercontent.com/7227275/235441241-93ab0c7d-341d-428f-8ca8-60ec932dde2d.png)


