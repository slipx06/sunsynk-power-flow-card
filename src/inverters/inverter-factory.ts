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
import {MPPSolar} from './brands/mpp-solar';



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
            case InverterModel.Azzurro:
                return new Azzurro();
            case InverterModel.Solis:
                return new Solis();
            case InverterModel.Lux:
                return new Lux();
            case InverterModel.Goodwe:
                return new Goodwe()
            case InverterModel.GoodweGridMode:
                return new GoodweGrid()
            case InverterModel.FoxESS:
                return new FoxESS()
            case InverterModel.Huawei:
                return new Huawei();
            case InverterModel.Fronius:
                return new Fronius();
            case InverterModel.Victron:
                return new Victron()
            case InverterModel.Solax:
                return new Solax()
            case InverterModel.Growatt:
                return new Growatt()
            case InverterModel.Sofar:
                return new Sofar()
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
            case InverterModel.Sunsynk:
            default:
                return new Sunsynk()
        }
    }
}
