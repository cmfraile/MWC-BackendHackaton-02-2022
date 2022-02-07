"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = void 0;
exports.argv = require('yargs')
    .option('help', { default: false })
    .option('listado', { describe: 'Lista a los desarrolladores que asistirán', require: false, default: false })
    .option('añadir', { describe: 'Añade a un dev a la lista de invitados', require: false, default: false })
    .option('menu', { describe: 'Muestra el CLI como un menú', require: false, default: false })
    .check((argv, options) => {
    console.log(argv[0]);
    return true;
})
    .argv;
//# sourceMappingURL=yargsconf.js.map