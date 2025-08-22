import { DataDto } from '../../../types';
import { LoadIconConfig } from './render-static-load-icon';

export const getFullLayoutIconConfigs = (data: DataDto): LoadIconConfig[] => [
	// Boiler icons
	{
		id: 'ess_boiler_left_bottom',
		x: 369,
		y: 123,
		width: 24,
		height: 24,
		loadNumber: 1,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'boiler' && [2].includes(data.additionalLoad),
		iconType: 'boiler' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_right_bottom',
		x: 427,
		y: 123,
		width: 24,
		height: 24,
		loadNumber: 2,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'boiler' && [2].includes(data.additionalLoad),
		iconType: 'boiler' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_left_top',
		x: 382,
		y: 5,
		width: 24,
		height: 24,
		loadNumber: 1,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'boiler' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'boiler' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_right_top',
		x: 419,
		y: 5,
		width: 24,
		height: 24,
		loadNumber: 2,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'boiler' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'boiler' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_aux',
		x: 340,
		y: 140,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: data.showAux && [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'boiler' && data.additionalLoad === 1,
		iconType: 'boiler' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_noaux',
		x: 340,
		y: 27,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'boiler' &&
			data.additionalLoad === 1 &&
			!data.showAux,
		iconType: 'boiler' as const,
		prefix: 'ess',
	},

	// Aircon icons
	{
		id: 'ess_ac_left_bottom',
		x: 371,
		y: 124,
		width: 20,
		height: 20,
		loadNumber: 1,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'aircon' && [2].includes(data.additionalLoad),
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_right_bottom',
		x: 429,
		y: 124,
		width: 20,
		height: 20,
		loadNumber: 2,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'aircon' &&
			[2, 3, 4, 5, 6].includes(data.additionalLoad),
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_left_top',
		x: 382,
		y: 6,
		width: 20,
		height: 20,
		loadNumber: 1,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'aircon' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_right_top',
		x: 419,
		y: 6,
		width: 20,
		height: 20,
		loadNumber: 2,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'aircon' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_aux',
		x: 342,
		y: 143,
		width: 30,
		height: 30,
		loadNumber: 1,
		displayCondition: data.showAux && [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'aircon' && data.additionalLoad === 1,
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_noaux',
		x: 342,
		y: 30,
		width: 30,
		height: 30,
		loadNumber: 1,
		displayCondition: [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'aircon' &&
			data.additionalLoad === 1 &&
			!data.showAux,
		iconType: 'aircon' as const,
		prefix: 'ess',
	},

	// Pump icons
	{
		id: 'ess_pump_left_bottom',
		x: 371,
		y: 125,
		width: 20,
		height: 25,
		loadNumber: 1,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'pump' && [2].includes(data.additionalLoad),
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_pump_right_bottom',
		x: 429,
		y: 125,
		width: 20,
		height: 25,
		loadNumber: 2,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'pump' && [2].includes(data.additionalLoad),
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_pump_left_top',
		x: 383,
		y: 7,
		width: 20,
		height: 25,
		loadNumber: 1,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'pump' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_pump_right_top',
		x: 421,
		y: 7,
		width: 20,
		height: 25,
		loadNumber: 2,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'pump' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_pump_aux',
		x: 336,
		y: 140,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: data.showAux && [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'pump' && data.additionalLoad === 1,
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_pump_noaux',
		x: 336,
		y: 27,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'pump' &&
			data.additionalLoad === 1 &&
			!data.showAux,
		iconType: 'pump' as const,
		prefix: 'ess',
	},

	// Oven icons
	{
		id: 'ess_oven_left_bottom',
		x: 371,
		y: 126,
		width: 20,
		height: 20,
		loadNumber: 1,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'oven' && [2].includes(data.additionalLoad),
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_oven_right_bottom',
		x: 429,
		y: 126,
		width: 20,
		height: 20,
		loadNumber: 2,
		displayCondition: data.showAux && [2].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'oven' && [2].includes(data.additionalLoad),
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_oven_left_top',
		x: 382,
		y: 5,
		width: 24,
		height: 24,
		loadNumber: 1,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'oven' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_oven_right_top',
		x: 419,
		y: 5,
		width: 24,
		height: 24,
		loadNumber: 2,
		displayCondition: [2, 4, 5, 6].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad2 === 'oven' &&
			[2, 4, 5, 6].includes(data.additionalLoad) &&
			!data.showAux,
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_oven_aux',
		x: 336,
		y: 140,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: data.showAux && [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'oven' && data.additionalLoad === 1,
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_oven_noaux',
		x: 336,
		y: 27,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: [1].includes(data.additionalLoad),
		opacityCondition:
			data.iconEssentialLoad1 === 'oven' &&
			data.additionalLoad === 1 &&
			!data.showAux,
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
];

export const getCompactLayoutIconConfigs = (
	data: DataDto,
): LoadIconConfig[] => [
	// Top icons (existing)
	{
		id: 'ess_oven_top',
		x: 368,
		y: 113,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad1 === 'oven' &&
			[1, 2].includes(data.additionalLoad),
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_pump_top',
		x: 368,
		y: 113,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad1 === 'pump' &&
			[1, 2].includes(data.additionalLoad),
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_top',
		x: 374,
		y: 116,
		width: 30,
		height: 30,
		loadNumber: 1,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad1 === 'aircon' &&
			[1, 2].includes(data.additionalLoad),
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_top',
		x: 371,
		y: 113,
		width: 36,
		height: 36,
		loadNumber: 1,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad1 === 'boiler' &&
			[1, 2].includes(data.additionalLoad),
		iconType: 'boiler' as const,
		prefix: 'ess',
	},

	// Bottom icons
	{
		id: 'ess_oven_bottom',
		x: 368,
		y: 287,
		width: 36,
		height: 36,
		loadNumber: 2,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad2 === 'oven' && data.additionalLoad === 2,
		iconType: 'oven' as const,
		prefix: 'ess',
		viewBoxSize: 32,
	},
	{
		id: 'ess_pump_bottom',
		x: 368,
		y: 287,
		width: 36,
		height: 36,
		loadNumber: 2,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad2 === 'pump' && data.additionalLoad === 2,
		iconType: 'pump' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_ac_bottom',
		x: 374,
		y: 289,
		width: 30,
		height: 30,
		loadNumber: 2,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad2 === 'aircon' && data.additionalLoad === 2,
		iconType: 'aircon' as const,
		prefix: 'ess',
	},
	{
		id: 'ess_boiler_bottom',
		x: 371,
		y: 287,
		width: 36,
		height: 36,
		loadNumber: 2,
		displayCondition: data.additionalLoad !== 0,
		opacityCondition:
			data.iconEssentialLoad2 === 'boiler' && data.additionalLoad === 2,
		iconType: 'boiler' as const,
		prefix: 'ess',
	},
];
