import {InverterModel} from '../types';
import {Solis} from './brands/solis';
import {InverterSettingsDto} from './dto/inverter-settings.dto';
import {Lux} from './brands/lux';
import {Goodwe} from './brands/goodwe';
import {GoodweGrid} from './brands/goodwe-grid';
import {FoxESS} from './brands/fox-ess';
import {Huawei} from './brands/huawei';
import {Fronius} from './brands/fronius';
import {PowMr} from './brands/powmr';
import {Victron} from './brands/victron';
import {Solax} from './brands/solax';
import {Growatt} from './brands/growatt';
import {Sofar} from './brands/sofar';
import {Sunsynk} from './brands/sunsynk';
import {CesBatteryBox} from './brands/ces-battery-box';
import {SolarEdge} from './brands/solar-edge';
import {Deye} from './brands/deye';
import {Azzurro} from './brands/azzurro';
import {MakeSkyBlue} from './brands/makeskyblue';
import {MPPSolar} from './brands/mpp-solar';
import {SMASolar} from './brands/sma-solar';
import {E3dc} from './brands/e3dc';
import {Sungrow} from './brands/sungrow';
import {Sigenergy} from './brands/sigenergy';
import {Linky} from './brands/linky';
import {Ferroamp} from './brands/ferroamp';
import {Easun} from './brands/easun';
import {Solinteg} from './brands/solinteg';

export class InverterFactory {
	static instance: InverterSettingsDto;

	public static getInstance(brand: InverterModel): InverterSettingsDto {
		if (!this.instance || this.instance.brand !== brand) {
			this.instance = this.createInstance(brand);
		}
		return this.instance;
	}

	private static createInstance(brand: InverterModel): InverterSettingsDto {
		switch (brand) {
			case InverterModel.Sigenergy:
				return new Sigenergy();
			case InverterModel.Linky:
				return new Linky();
			case InverterModel.Ferroamp:
				return new Ferroamp();
			case InverterModel.Easun:
				return new Easun();
			case InverterModel.Azzurro:
				return new Azzurro();
			case InverterModel.Solis:
				return new Solis();
			case InverterModel.Lux:
				return new Lux();
			case InverterModel.Goodwe:
				return new Goodwe();
			case InverterModel.GoodweGridMode:
				return new GoodweGrid();
			case InverterModel.E3dc:
				return new E3dc();
			case InverterModel.FoxESS:
				return new FoxESS();
			case InverterModel.Huawei:
				return new Huawei();
			case InverterModel.Fronius:
				return new Fronius();
			case InverterModel.Victron:
				return new Victron();
			case InverterModel.Solax:
				return new Solax();
			case InverterModel.Growatt:
				return new Growatt();
			case InverterModel.Sofar:
				return new Sofar();
			case InverterModel.CESBatteryBox:
				return new CesBatteryBox();
			case InverterModel.SolarEdge:
				return new SolarEdge();
			case InverterModel.Deye:
				return new Deye();
			case InverterModel.PowMr:
				return new PowMr();
			case InverterModel.MPPSolar:
				return new MPPSolar();
			case InverterModel.SMASolar:
				return new SMASolar();
			case InverterModel.Sungrow:
				return new Sungrow();
			case InverterModel.MakeSkyBlue:
				return new MakeSkyBlue();
			case InverterModel.Solinteg:
				return new Solinteg();
			case InverterModel.Sunsynk:
			default:
				return new Sunsynk();
		}
	}
}
