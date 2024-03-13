export class Utils {
    static toNum(val: string | number, decimals: number = -1, invert: boolean = false): number {
        let numberValue = Number(val);
        if (Number.isNaN(numberValue)) {
            return 0;
        }
        if (decimals >= 0) {
            numberValue = parseFloat(numberValue.toFixed(decimals));
        }
        if (invert) {
            numberValue *= -1;
        }
        return numberValue;
    }

    static convertValue(value, decimal = 2) {
        decimal = Number.isNaN(decimal) ? 2 : decimal;
        if (Math.abs(value) > 999) {
            return `${(value / 1000).toFixed(decimal)} kW`;
        } else {
            return `${Math.round(value)} W`;
        }
    }

    static convertValueNew(value: string | number, unit: string = '', decimal: number = 2) {

        decimal = Number.isNaN(decimal) ? 2 : decimal;
        let numberValue = Number(value);
        if (Number.isNaN(numberValue)) {
            return 0;
        }

        const units = ['W', 'kW', 'MW', 'Wh', 'kWh', 'MWh'];

        // Find the index of the unit in the units array
        const unitIndex = units.findIndex(u => u.toLowerCase() === unit.toLowerCase());

        //console.log(`Input: ${value} ${unit}`);
        //console.log(`Unit Index: ${unitIndex}`);

        // Check if the unit is in the allowed units array
        if (unitIndex !== -1) {
            // Perform the conversion based on the unit index
            switch (unitIndex) {
                case 0: // W
                    if (Math.abs(numberValue) >= 1e6) {
                        return `${(numberValue / 1e6).toFixed(decimal)} ${units[2]}`;
                    } else if (Math.abs(numberValue) >= 1e3) {
                        return `${(numberValue / 1e3).toFixed(decimal)} ${units[1]}`;
                    } else {
                        return `${Math.round(numberValue)} ${units[unitIndex]}`;
                    }
                case 1: // kW
                    if (Math.abs(numberValue) >= 1e3) {
                        return `${(numberValue / 1e3).toFixed(decimal)} ${units[2]}`;
                    } else if (Math.abs(numberValue) < 1) {
                        return `${Math.round(numberValue * 1000)} ${units[0]}`;
                    } else {
                        return `${numberValue.toFixed(decimal)} ${units[unitIndex]}`;
                    }
                case 2: // MW
                    if (Math.abs(numberValue) < 1) {
                        return `${(numberValue * 1000).toFixed(decimal)} ${units[1]}`;
                    } else {
                        return `${numberValue.toFixed(decimal)} ${units[unitIndex]}`;
                    }
                case 3: // Wh
                    if (Math.abs(numberValue) >= 1e6) {
                        return `${(numberValue / 1e6).toFixed(1)} ${units[5]}`;
                    } else if (Math.abs(numberValue) >= 1e3) {
                        return `${(numberValue / 1e3).toFixed(1)} ${units[4]}`;
                    } else {
                        return `${numberValue.toFixed(1)} ${units[unitIndex]}`;
                    }
                case 4: // kWh
                    if (Math.abs(numberValue) >= 1e3) {
                        return `${(numberValue / 1e3).toFixed(2)} ${units[5]}`;
                        //} else if (Math.abs(numberValue) < 1) {
                        //    return `${(numberValue * 1000).toFixed(1)} ${units[3]}`;
                    } else {
                        return `${numberValue.toFixed(1)} ${units[unitIndex]}`;
                    }
                case 5: // MWh
                    if (Math.abs(numberValue) < 1) {
                        return `${(numberValue * 1000).toFixed(1)} ${units[4]}`;
                    } else {
                        return `${numberValue.toFixed(1)} ${units[unitIndex]}`;
                    }
                default:
                    return `${Math.round(numberValue)} ${unit}`;
            }
        } else {
            // If the unit is not in the allowed units, return the numeric value without unit
            return Math.round(numberValue);
        }
    }

    static handlePopup(e, entityId) {
        this._handleClick(e, {action: 'more-info'}, entityId);
    }

    private static _handleClick(event, actionConfig, entityId) {
        if(!entityId || !event)
            return;
        event.stopPropagation();
        let e;
        // eslint-disable-next-line default-case
        switch (actionConfig.action) {
            case 'more-info': {
                e = new Event('hass-more-info', {composed: true});
                e.detail = {entityId};
                event.target.dispatchEvent(e);
                break;
            }
        }
    }
}
