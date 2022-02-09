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
Object.defineProperty(exports, "__esModule", { value: true });
const { menuinquirer, pausa, opciones } = require('./helpers/inquirer');
const { bdeployer } = require('./helpers/bdeployer');
const fs_1 = require("fs");
console.clear();
//EMPIEZA EL CODIGO:
//VAMOS A HACER POR CREAR UNA SOLUCION QUE GENERE EL FICHERO UNA VEZ TRAS DESCARGARLO Y LUEGO CONSUMA ESA SIEMPRE.
const lectura = () => {
    const raw = (0, fs_1.readFileSync)(`${__dirname}/database/devs.json`);
    const json = JSON.parse(raw);
    return json;
};
const menuloop = (directorio) => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    let opt = '';
    do {
        opt = yield menuinquirer();
        switch (opt) {
            case '1':
                opciones.diasdelevento();
                break;
            case '2':
                opciones.developers(lectura());
                break;
            case '3':
                yield opciones.agregardev(lectura(), directorio);
                break;
            //case '4': await opciones.borrarVisitante() ; break ;
            case '5':
                yield opciones.reiniciarBD(directorio);
                break;
        }
        if (opt !== '5') {
            yield pausa();
        }
    } while (opt !== '0');
});
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    yield bdeployer(__dirname);
    yield menuloop(__dirname);
    console.clear();
});
main();
//ACABA EL CÓDIGO:
console.log("\n");
//# sourceMappingURL=app.js.map