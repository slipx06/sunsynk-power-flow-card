export class BatteryIconManager {
    static convert(state_battery_soc) {
        //Complete Battery Icon
        const batteryIcon100 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5zM5 6.5 11 6.5 11 7.5H5z';
        const batteryIcon90 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5z';
        const batteryIcon80 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5z';
        const batteryIcon70 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5z';
        const batteryIcon60 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5z';
        const batteryIcon50 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5z';
        const batteryIcon40 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5z';
        const batteryIcon30 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5z';
        const batteryIcon20 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5z';

        //Battery Infill, no shell
        const battery100 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5zM5 6.5 11 6.5 11 7.5H5z';
        const battery90 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5z';
        const battery80 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zH5z';
        const battery70 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 11z';
        const battery60 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5z';
        const battery50 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zH5z';
        const battery40 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zH5z';
        const battery30 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 17z';
        const battery20 = 'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 19z';

        //Empty Battery shell
        const battery0 = 'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4';

        let batteryIcon: string
        let batteryCharge: string
        let stopColour: string

        switch (true) {
            case parseInt(state_battery_soc.state) >= 95:
                batteryIcon = batteryIcon100;
                batteryCharge = battery100;
                stopColour = 'green';
                break;
            case 85 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 95:
                batteryIcon = batteryIcon90;
                batteryCharge = battery90;
                stopColour = 'green';
                break;
            case 75 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 85:
                batteryIcon = batteryIcon80;
                batteryCharge = battery80;
                stopColour = '#9ACD32';
                break;
            case 65 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 75:
                batteryIcon = batteryIcon70;
                batteryCharge = battery70;
                stopColour = 'gold';
                break;
            case 55 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 65:
                batteryIcon = batteryIcon60;
                batteryCharge = battery60;
                stopColour = 'gold';
                break;
            case 45 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 55:
                batteryIcon = batteryIcon50;
                batteryCharge = battery50;
                stopColour = 'gold';
                break;
            case 35 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 45:
                batteryIcon = batteryIcon40;
                batteryCharge = battery40;
                stopColour = 'orange';
                break;
            case 25 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 35:
                batteryIcon = batteryIcon30;
                batteryCharge = battery30;
                stopColour = 'orange';
                break;
            case 10 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 25:
                batteryIcon = batteryIcon20;
                batteryCharge = battery20;
                stopColour = 'orange';
                break;
            case 0 <= parseInt(state_battery_soc.state) && parseInt(state_battery_soc.state) < 10:
                batteryIcon = battery0;
                batteryCharge = battery0;
                stopColour = 'red';
                break;
            default:
                batteryIcon = battery0;
                batteryCharge = battery0;
                stopColour = 'red';
                break;
        }
        return {batteryIcon, batteryCharge, stopColour, battery0}
    }
}
