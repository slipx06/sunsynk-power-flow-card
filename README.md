# Sunsynk-Power-Flow-Card

An animated Home Assistant card to emulate the power flow that's shown on the Sunsynk Inverter screen. You can use this for Deye as well as other Inverters as long as you have the required sensor data. See the [WIKI](https://github.com/slipx06/sunsynk-power-flow-card/wiki) for integration methods and examples.

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://github.com/hacs/integration) ![GitHub release (latest by date)](https://img.shields.io/github/v/release/slipx06/sunsynk-power-flow-card?style=for-the-badge) <a href="https://www.buymeacoffee.com/slipx" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="29" width="120"></a>

## Documentation

Refer to [https://slipx06.github.io/sunsynk-power-flow-card/index.html](https://slipx06.github.io/sunsynk-power-flow-card/index.html)

## Features

* Option to switch between two card styles: `lite` or `full`.
* Animated power flow based on positive/negative/zero sensor values with configurable dynamic speed. (Supports inverted battery, AUX and grid power).
* Dynamic battery image based on SOC (empty->low->medium->high).
* Grid connected status.
* Inverter status (standby, normal, self-test, alarm, fault).
* Configurable battery size and shutdown SOC to calculate and display remaining battery runtime based on current battery usage and system time slot setting i.e. SOC, Grid Charge. Can be toggled off.
* Daily Totals that can be toggled on or off.
* Hide all solar data if not installed or specify number of mppts in use. Set custom MPPT labels.
* "Use Timer" setting and "Energy Pattern" setting (Priority Load or Priority Battery) shown as dynamic icons with ability to hide if not required. If setup as switches can be toggled by clicking on the card
* Panel mode for bigger card
* AUX and Non-essential can be hidden from the full card or assigned configurable labels
* Customisable - Change colours and images
* Most entities can be clicked to show more-info dialog
* Optional data points include self sufficiency and ratio percentages, battery temperature, AC and DC temperature
* Display up to two non-essential, essential and AUX loads
* Display energy cost per kWh and solar sell status

## Screenshots

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/1c44a09b-2914-4cbd-919d-477789137acd)
![sunsynk-power-flow-lite](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/ab615245-cee6-4502-b9bc-649566a6eb54)

*Lite Version*

![image](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/cd55d1e7-b821-4b3f-a308-8efca55fdda2)
![sunsynk-power-flow-full](https://github.com/slipx06/sunsynk-power-flow-card/assets/7227275/bf119d16-b049-4bd9-8906-0c9697ab386d)

*Full Version*

## Installation

The card can be installed manually or via HACS

### Manual Installation

1. Create a new directory under `www` and name it `sunsynk-power-flow-card` e.g www/sunsynk-power-flow-card/
2. Copy the `sunsynk-power-flow-card.js` into the directory
3. Add the resource to your Dashboard. You can append the filename with a `?ver=x` and increment x each time you download a new version to force a reload and avoid using a cached version. It is also a good idea to clear your browser cache.

![image](https://user-images.githubusercontent.com/7227275/235441241-93ab0c7d-341d-428f-8ca8-60ec932dde2d.png)

### Installation using HACS

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg?style=for-the-badge)](https://my.home-assistant.io/redirect/hacs_repository/?repository=sunsynk-power-flow-card&category=plugin&owner=slipx06)
You can add to HACS as a Custom Repo

## Usage

Add the `Custom: Sunsynk Power Flow Card` to your Dashboard view.

![image](https://user-images.githubusercontent.com/7227275/235375690-65d17663-e117-4626-9151-1a41979a13b8.png)

