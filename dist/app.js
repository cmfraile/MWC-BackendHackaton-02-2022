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
const { menuinquirer, pausa, opciones, jsonurl } = require('./helpers/inquirer');
console.clear();
//EMPIEZA EL CODIGO:
//VAMOS A HACER POR CREAR UNA SOLUCION QUE GENERE EL FICHERO UNA VEZ TRAS DESCARGARLO Y LUEGO CONSUMA ESA SIEMPRE.
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let opt = '';
    do {
        opt = yield menuinquirer();
        switch (opt) {
            case '1':
                opciones.diasdelevento();
                break;
            case '2':
                opciones.developers();
                break;
            //case '3': console.log(opt) ; break ;
            //case '4': console.log(opt) ; break ;
            default:
                console.log(opt);
                break;
        }
        yield pausa();
    } while (opt !== '0');
    console.clear();
});
main();
//ACABA EL CÓDIGO:
console.log("\n");
//# sourceMappingURL=app.js.map