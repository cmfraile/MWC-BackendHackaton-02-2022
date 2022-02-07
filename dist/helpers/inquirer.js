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
exports.opciones = exports.pausa = exports.menuinquirer = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const Colors = require("colors.ts");
Colors.enable();
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        choices: [
            { value: '1', name: `Información del evento` },
            { value: '2', name: `Listar visitantes` },
            { value: '3', name: `Añadir visitantes` },
            { value: '0', name: `Cerrar CLI` }
        ]
    }
];
const menuinquirer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    //console.log("MWCBCN - 02/2022 - Desafio BackEnd\n".yellow);
    const { opcion } = yield inquirer_1.default.prompt(preguntas);
    return opcion;
});
exports.menuinquirer = menuinquirer;
const pausa = () => __awaiter(void 0, void 0, void 0, function* () {
    const q = [{ type: 'input', name: 'enter', message: 'Enter para continuar' }];
    console.log("\n");
    yield inquirer_1.default.prompt(q);
});
exports.pausa = pausa;
exports.opciones = {
    diasdelevento: () => {
        console.clear();
        console.log("Te esperamos en el recinto Fira Gran Via de Barcelona:".yellow);
        console.log("Av. Joan Carles I, 64, 08908 L'Hospitalet de Llobregat, Barcelona".yellow);
        console.log("\n");
        console.log("Desde el 26-02 hasta el 03-03");
        console.log("\n");
        console.log(`Mas información ${'https://www.mwcbarcelona.com/about'.green}`);
    }
};
//# sourceMappingURL=inquirer.js.map