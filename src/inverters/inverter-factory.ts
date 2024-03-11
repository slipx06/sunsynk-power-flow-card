import {InverterModel} from '../types';
import {Solis} from './solis';
import {InverterSettingsDto} from './dto/inverter-settings.dto';
import {Lux} from './lux';
import {Goodwe} from './goodwe';
import {GoodweGrid} from './goodwe-grid';
import {FoxESS} from './fox-ess';
import {Huawei} from './huawei';
import {Fronius} from './fronius';
import {Victron} from './victron';
import {Solax} from './solax';
import {Growatt} from './growatt';
import {Sofar} from './sofar';
import {Sunsynk} from './sunsynk';

export function createInverterInstance(brand: InverterModel): InverterSettingsDto {
    switch (brand) {
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
        case InverterModel.Sunsynk:
            return new Sunsynk()
        case InverterModel.SolarEdge:
        default:
            return new Sunsynk()
    }
}
