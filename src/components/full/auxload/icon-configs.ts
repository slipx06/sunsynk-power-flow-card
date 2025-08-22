import { DataDto } from '../../../types';
import { AuxIconConfig } from './render-static-aux-icons';

export const getAuxIconConfigs = (data: DataDto): AuxIconConfig[] => [
	{
		id: 'aux_default',
		x: 371,
		y: 5,
		width: 83,
		height: 83,
		displayCondition: !data.showAux || [1, 2].includes(data.additionalAuxLoad),
		opacityCondition: data.auxType === 'default',
		iconType: 'aux',
		prefix: 'aux',
		dynamicColor:
			data.auxStatus === 'on' || data.auxStatus === '1'
				? data.auxDynamicColour
				: data.auxOffColour,
		viewBoxSize: 24,
	},
	{
		id: 'aux_generator',
		x: 374,
		y: 5,
		width: 74,
		height: 74,
		displayCondition: !data.showAux || [1, 2].includes(data.additionalAuxLoad),
		opacityCondition: data.auxType === 'gen',
		iconType: 'generator',
		prefix: 'aux',
		dynamicColor:
			data.auxStatus === 'on' || data.auxStatus === '1'
				? data.auxDynamicColour
				: data.auxOffColour,
		viewBoxSize: 24,
	},
	{
		id: 'aux_oven',
		x: 375,
		y: 8,
		width: 70,
		height: 70,
		displayCondition: !data.showAux || [1, 2].includes(data.additionalAuxLoad),
		opacityCondition: data.auxType === 'oven',
		iconType: 'oven',
		prefix: 'aux',
		dynamicColor:
			data.auxStatus === 'on' || data.auxStatus === '1'
				? data.auxDynamicColour
				: data.auxOffColour,
		viewBoxSize: 32,
	},
	{
		id: 'aux_boiler',
		x: 375,
		y: 8,
		width: 70,
		height: 70,
		displayCondition: !data.showAux || [1, 2].includes(data.additionalAuxLoad),
		opacityCondition: data.auxType === 'boiler',
		iconType: 'boiler',
		prefix: 'aux',
		dynamicColor:
			data.auxStatus === 'on' || data.auxStatus === '1'
				? data.auxDynamicColour
				: data.auxOffColour,
		viewBoxSize: 24,
	},
	{
		id: 'aux_ac',
		x: 380,
		y: 12,
		width: 60,
		height: 60,
		displayCondition: !data.showAux || [1, 2].includes(data.additionalAuxLoad),
		opacityCondition: data.auxType === 'aircon',
		iconType: 'aircon',
		prefix: 'aux',
		dynamicColor:
			data.auxStatus === 'on' || data.auxStatus === '1'
				? data.auxDynamicColour
				: data.auxOffColour,
		viewBoxSize: 24,
	},
	{
		id: 'aux_pump',
		x: 380,
		y: 15,
		width: 60,
		height: 70,
		displayCondition: !data.showAux || [1, 2].includes(data.additionalAuxLoad),
		opacityCondition: data.auxType === 'pump',
		iconType: 'pump',
		prefix: 'aux',
		dynamicColor:
			data.auxStatus === 'on' || data.auxStatus === '1'
				? data.auxDynamicColour
				: data.auxOffColour,
		viewBoxSize: 24,
	},
];
