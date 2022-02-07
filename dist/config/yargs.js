"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.opts = void 0;
exports.opts = {
    base: {
        demand: true,
        alias: 'b'
    },
    limite: {
        alias: 'l',
        default: 10
    }
};
const argv = require('yargs')
    .command('listar', 'Imprime en consola la tabla de multiplicar', exports.opts)
    .command('crear', 'Genera un archivo con la tabla de multiplicar', exports.opts)
    .help()
    .argv;
module.exports = {
    argv
};
//# sourceMappingURL=yargs.js.map