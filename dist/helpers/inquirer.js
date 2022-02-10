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
const validadores_1 = require("./validadores");
//const jsonurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: 'Escoje una opción:',
        choices: [
            { value: '1', name: `Información del evento` },
            { value: '2', name: `Listar visitantes` },
            { value: '3', name: `Añadir visitantes` },
            { value: '4', name: `borrar visitante` },
            { value: '5', name: `Reiniciar base de datos` },
            { value: '0', name: `Cerrar CLI` }
        ]
    }
];
const inputusuarioq = [
    { type: 'input', validate: validadores_1.namecheck, name: 'nombre' },
    { type: 'input', validate: validadores_1.emailcheck, name: 'correo' },
    { type: 'list', name: 'categoria', choices: [
            { value: 'back', nombre: 'back' },
            { value: 'front', nombre: 'front' },
            { value: 'mobile', nombre: 'mobile' },
            { value: 'data science', nombre: 'data science' },
        ], alias: 'categoria' },
    { type: 'input', validate: validadores_1.phonecheck, name: 'telefono' },
    { type: 'list', name: 'asistencia', choices: [
            { value: '26 Feb,2021', nombre: '26 Feb,2021' },
            { value: '27 Feb,2021', nombre: '27 Feb,2021' },
            { value: '28 Feb,2021', nombre: '28 Feb,2021' },
            { value: '1 Mar,2021', nombre: '1 Mar,2021' },
            { value: '2 Mar,2021', nombre: '2 Mar,2021' },
            { value: '3 Mar,2021', nombre: '3 Mar,2021' },
        ], alias: 'dias de asistencia' },
];
const menuinquirer = () => __awaiter(void 0, void 0, void 0, function* () {
    console.clear();
    console.log("MWC-BCN - Hackaton : Desafio Backend:\n".yellow);
    const { opcion } = yield inquirer_1.default.prompt(preguntas);
    return opcion;
});
exports.menuinquirer = menuinquirer;
const pausa = () => __awaiter(void 0, void 0, void 0, function* () {
    const q = [{ type: 'input', name: 'enter', message: 'Enter para continuar' }];
    console.log("\n");
    yield inquirer_1.default.prompt(q);
    console.clear();
});
exports.pausa = pausa;
exports.opciones = {
    diasdelevento: () => {
        console.clear();
        console.log(" Te esperamos en el recinto Fira Gran Via de Barcelona:".yellow, "\n", "Av. Joan Carles I, 64, 08908 L'Hospitalet de Llobregat, Barcelona".yellow, "\n\n", "Desde el 26-02 hasta el 03-03", "\n\n", `Mas información: ${'https://www.mwcbarcelona.com/about'.green}`);
    },
    developers: (db) => {
        //USUARIO : name,email,category,phone,date.
        let jsonprint = [['nombre', 'correo', 'categoria', 'telefono', 'dia de asistencia']];
        let index = 0;
        db.forEach((x) => {
            index++;
            if (x.editado) {
                jsonprint.push([`${x.name.red}`, `${x.email.red}`, `${x.category.red}`, `${x.phone.red}`, `${x.date.red}`,]);
            }
            ;
            if (!x.editado) {
                if (index % 2 == 0) {
                    jsonprint.push([`${x.name.green}`, `${x.email.green}`, `${x.category.green}`, `${x.phone.green}`, `${x.date.green}`,]);
                }
                else {
                    jsonprint.push([`${x.name.blue}`, `${x.email.blue}`, `${x.category.blue}`, `${x.phone.blue}`, `${x.date.blue}`,]);
                }
            }
        });
        console.clear();
        console.log((0, table_1.table)(jsonprint, undefined));
    },
    agregardev: (db, directorio) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.clear();
            const respuestas = yield inquirer_1.default.prompt(inputusuarioq);
            const r2 = { name: respuestas.nombre, email: respuestas.correo, category: respuestas.categoria, phone: respuestas.telefono, date: respuestas.asistencia };
            db.push(Object.assign(Object.assign({}, r2), { editado: true }));
            db = db.sort((a, b) => { if (a.name < b.name) {
                return -1;
            }
            else {
                return 1;
            } ; });
            (0, fs_1.writeFileSync)(`${directorio}/database/devs.json`, JSON.stringify(db));
        }
        catch (err) {
            console.log(err);
        }
    }),
    reiniciarBD: (directorio) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const q = [{ type: 'confirm', message: '¿Esta seguro de esta accion?', name: 'confirmar', default: false }];
            const { confirmar } = yield inquirer_1.default.prompt(q);
            if (confirmar) {
                const data = yield (0, bdeployer_1.bdconsulta)(directorio);
                (0, fs_1.writeFileSync)(`${directorio}/database/devs.json`, JSON.stringify(data));
            }
            else {
                return;
            }
            ;
        }
        catch (err) {
            console.log(err);
        }
    }),
    borrarVisitante: (db, directorio) => __awaiter(void 0, void 0, void 0, function* () {
        const crearregexp = (criterio) => {
            let vaciocheck = false;
            criterio.split('').forEach(x => { if (x !== ' ') {
                vaciocheck = true;
            } });
            if (!vaciocheck) {
                return true;
            }
            else {
                const regexp = new RegExp(criterio, 'ig');
                return regexp;
            }
            ;
        };
        try {
            console.clear();
            let delinput = {
                type: 'input',
                name: 'eliminar1',
                message: 'Escribe su nombre o parte de el (Dejalo vacio para mostrar toda la lista)',
            };
            const { eliminar1 } = yield inquirer_1.default.prompt(delinput);
            console.clear();
            let delarray = {
                type: 'list',
                name: 'eliminar2',
                message: 'Ahora seleccione a quien eliminar:',
                choices: () => {
                    let charray = [];
                    db.forEach((x, i) => {
                        if (x.name.match(crearregexp(eliminar1)) || crearregexp(eliminar1) == true) {
                            if (i % 2 == 0) {
                                charray.push({ value: `${x.name}`, name: `${x.name.green}` });
                            }
                            else {
                                charray.push({ value: `${x.name}`, name: `${x.name.blue}` });
                            }
                        }
                    });
                    charray.unshift(new inquirer_1.default.Separator('--------------------------'.red));
                    charray.unshift({ value: 'CANCELAR BORRADO', name: 'CANCELAR BORRADO'.red });
                    charray.unshift(new inquirer_1.default.Separator('--------------------------'.red));
                    return charray;
                }
            };
            const { eliminar2 } = yield inquirer_1.default.prompt(delarray);
            db.forEach((x, i) => {
                if (eliminar2 == 'CANCELAR BORRADO') {
                    return;
                }
                if (x.name == eliminar2) {
                    db.splice(i, 1);
                }
            });
            (0, fs_1.writeFileSync)(`${directorio}/database/devs.json`, JSON.stringify(db));
        }
        catch (err) {
            console.log(err);
        }
    })
};
//# sourceMappingURL=inquirer.js.map