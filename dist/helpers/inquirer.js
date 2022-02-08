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
const table_1 = require("table");
const fs_1 = require("fs");
const bdeployer_1 = require("./bdeployer");
//const jsonurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        choices: [
            { value: '1', name: `Información del evento` },
            { value: '2', name: `Listar visitantes` },
            { value: '3', name: `Añadir visitantes` },
            { value: '4', name: `Reiniciar base de datos` },
            { value: '0', name: `Cerrar CLI` }
        ]
    }
];
const inputusuarioq = [
    { type: 'input', name: 'name' },
    { type: 'input', name: 'email' },
    { type: 'list', name: 'category', choices: [
            { value: 'back', nombre: 'back' },
            { value: 'front', nombre: 'front' },
            { value: 'mobile', nombre: 'mobile' },
            { value: 'data science', nombre: 'datascience' },
        ] },
    { type: 'input', name: 'phone' },
    { type: 'list', name: 'date', choices: [
            { value: '26 Feb,2021', nombre: '26 Feb,2021' },
            { value: '27 Feb,2021', nombre: '27 Feb,2021' },
            { value: '28 Feb,2021', nombre: '28 Feb,2021' },
            { value: '1 Mar,2021', nombre: '1 Mar,2021' },
            { value: '2 Mar,2021', nombre: '2 Mar,2021' },
            { value: '3 Mar,2021', nombre: '3 Mar,2021' },
        ] },
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
    },
    developers: (db) => {
        //USUARIO : name,email,category,phone,date.
        console.clear();
        let jsonprint = [['nombre', 'correo', 'categoria', 'telefono', 'dia de asistencia']];
        let index = 0;
        db.forEach((x) => {
            index++;
            if (x.editado) {
                jsonprint.push([`${x.name.red}`, `${x.email.red}`, `${x.category.red}`, `${x.phone.red}`, `${x.date.red}`,]);
                return;
            }
            if (index % 2 == 0) {
                jsonprint.push([`${x.name.green}`, `${x.email.green}`, `${x.category.green}`, `${x.phone.green}`, `${x.date.green}`,]);
            }
            else {
                jsonprint.push([`${x.name.blue}`, `${x.email.blue}`, `${x.category.blue}`, `${x.phone.blue}`, `${x.date.blue}`,]);
            }
        });
        console.log((0, table_1.table)(jsonprint, undefined));
    },
    agregardev: (db, directorio) => __awaiter(void 0, void 0, void 0, function* () {
        console.clear();
        const respuestas = yield inquirer_1.default.prompt(inputusuarioq);
        db.push(Object.assign(Object.assign({}, respuestas), { editado: true }));
        db = db.sort((a, b) => { if (a.name < b.name) {
            return -1;
        }
        else {
            return 1;
        } ; });
        (0, fs_1.writeFile)(`${directorio}/database/devs.json`, JSON.stringify(db), (err) => { if (err)
            throw err; });
    }),
    reiniciarBD: (directorio) => __awaiter(void 0, void 0, void 0, function* () {
        return new Promise((rs, rj) => __awaiter(void 0, void 0, void 0, function* () {
            (0, fs_1.unlinkSync)(`${directorio}/database/devs.json`);
            const data = yield (0, bdeployer_1.bdconsulta)(bdeployer_1.bdurl);
            (0, fs_1.writeFile)(`${directorio}/database/devs.json`, JSON.stringify(data), (err) => { if (err)
                throw err; });
            rs(require(`${directorio}/database/devs.json`));
        }));
    })
};
//# sourceMappingURL=inquirer.js.map