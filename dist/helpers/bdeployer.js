"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bdeployer = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
//RUTAROOT
//home/nakowhitedeity/EyT/Desarrollo web/Hackatones/MWCfebrero22/desafiobackend/dist.
//const jsonurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';
const bdurl = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';
const bdconsulta = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((rs, rj) => {
        axios_1.default.get(bdurl).then(resp => {
            let arraydev = resp.data;
            arraydev = arraydev.sort((a, b) => { if (a.name < b.name) {
                return -1;
            }
            else {
                return 1;
            } ; });
            rs(arraydev);
        }).catch(err => rj(err));
    });
});
const bdeployer = (rutaroot) => __awaiter(void 0, void 0, void 0, function* () {
    const urlref = path_1.default.join(rutaroot, './database');
    return new Promise((rs, rj) => {
        //Si no existe:
        if (!fs_1.default.existsSync(urlref)) {
            fs_1.default.mkdir(urlref, (err) => __awaiter(void 0, void 0, void 0, function* () {
                if (err == null) {
                    const data = yield bdconsulta();
                    fs_1.default.writeFile(`${urlref}/devs.json`, JSON.stringify(data), (err) => { if (err)
                        throw err; });
                    rs(data);
                }
                else {
                    throw err;
                }
                ;
            }));
        }
        else {
            rs(require(`${rutaroot}/database/devs.json`));
        }
    });
    //const data = await bdconsulta() ; console.log(data);
});
exports.bdeployer = bdeployer;
//# sourceMappingURL=bdeployer.js.map