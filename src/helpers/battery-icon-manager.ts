export class BatteryIconManager {
	private static _cache: Map<
		number,
		{
			batteryIcon: string;
			batteryCharge: string;
			stopColour: string;
			battery0: string;
		}
	> = new Map();

	// Hoisted SVG paths (created once)
	private static readonly BATTERY_ICON_100 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5zM5 6.5 11 6.5 11 7.5H5z';
	private static readonly BATTERY_ICON_90 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5z';
	private static readonly BATTERY_ICON_80 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5z';
	private static readonly BATTERY_ICON_70 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5z';
	private static readonly BATTERY_ICON_60 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5z';
	private static readonly BATTERY_ICON_50 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5z';
	private static readonly BATTERY_ICON_40 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5z';
	private static readonly BATTERY_ICON_30 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5z';
	private static readonly BATTERY_ICON_20 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4M5.02 18.5v1L11 19.5 11 18.5z';

	private static readonly BATTERY_100 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5zM5 6.5 11 6.5 11 7.5H5z';
	private static readonly BATTERY_90 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5z';
	private static readonly BATTERY_80 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 9.5 11 9.5 11 10.5H5zM5 8 11 8 11 9H5zH5z';
	private static readonly BATTERY_70 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5zM5 11 11 11 11 12H5zM5 11z';
	private static readonly BATTERY_60 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zM5 12.5 11 12.5 11 13.5H5z';
	private static readonly BATTERY_50 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zM5 14 11 14 11 15H5zH5z';
	private static readonly BATTERY_40 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 16.5 11 16.5 11 15.5H5zH5z';
	private static readonly BATTERY_30 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 18 11 18 11 17H5zM5 17z';
	private static readonly BATTERY_20 =
		'M11 19M5.02 18.5v1L11 19.5 11 18.5zM5 19z';

	private static readonly BATTERY_0 =
		'M12 20H4V6h8L12 20m.67-16H11V2H5v2H3.33C2.6 4 2 4.6 2 5.33v15.34C2 21.4 2.6 22 3.33 22h9.34c.74 0 1.33-.59 1.33-1.33V5.33C14 4.6 13.4 4 12.67 4';

	static convert(state_battery_soc) {
		// Determine band once (100/90/80/.../0) and memoize
		const levelRaw = parseInt(state_battery_soc.state);
		const band = Number.isFinite(levelRaw)
			? levelRaw >= 95
				? 100
				: levelRaw >= 85
					? 90
					: levelRaw >= 75
						? 80
						: levelRaw >= 65
							? 70
							: levelRaw >= 55
								? 60
								: levelRaw >= 45
									? 50
									: levelRaw >= 35
										? 40
										: levelRaw >= 25
											? 30
											: levelRaw >= 10
												? 20
												: levelRaw >= 0
													? 0
													: 0
			: 0;

		const cached = this._cache.get(band);
		if (cached) return cached;

		let result: {
			batteryIcon: string;
			batteryCharge: string;
			stopColour: string;
			battery0: string;
		};
		switch (band) {
			case 100:
				result = {
					batteryIcon: this.BATTERY_ICON_100,
					batteryCharge: this.BATTERY_100,
					stopColour: 'green',
					battery0: this.BATTERY_0,
				};
				break;
			case 90:
				result = {
					batteryIcon: this.BATTERY_ICON_90,
					batteryCharge: this.BATTERY_90,
					stopColour: 'green',
					battery0: this.BATTERY_0,
				};
				break;
			case 80:
				result = {
					batteryIcon: this.BATTERY_ICON_80,
					batteryCharge: this.BATTERY_80,
					stopColour: '#9ACD32',
					battery0: this.BATTERY_0,
				};
				break;
			case 70:
				result = {
					batteryIcon: this.BATTERY_ICON_70,
					batteryCharge: this.BATTERY_70,
					stopColour: 'gold',
					battery0: this.BATTERY_0,
				};
				break;
			case 60:
				result = {
					batteryIcon: this.BATTERY_ICON_60,
					batteryCharge: this.BATTERY_60,
					stopColour: 'gold',
					battery0: this.BATTERY_0,
				};
				break;
			case 50:
				result = {
					batteryIcon: this.BATTERY_ICON_50,
					batteryCharge: this.BATTERY_50,
					stopColour: 'gold',
					battery0: this.BATTERY_0,
				};
				break;
			case 40:
				result = {
					batteryIcon: this.BATTERY_ICON_40,
					batteryCharge: this.BATTERY_40,
					stopColour: 'orange',
					battery0: this.BATTERY_0,
				};
				break;
			case 30:
				result = {
					batteryIcon: this.BATTERY_ICON_30,
					batteryCharge: this.BATTERY_30,
					stopColour: 'orange',
					battery0: this.BATTERY_0,
				};
				break;
			case 20:
				result = {
					batteryIcon: this.BATTERY_ICON_20,
					batteryCharge: this.BATTERY_20,
					stopColour: 'orange',
					battery0: this.BATTERY_0,
				};
				break;
			case 0:
			default:
				result = {
					batteryIcon: this.BATTERY_0,
					batteryCharge: this.BATTERY_0,
					stopColour: 'red',
					battery0: this.BATTERY_0,
				};
				break;
		}
		this._cache.set(band, result);
		return result;
	}
}
