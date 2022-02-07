import { Argv } from "yargs";

export const argv:Argv = require('yargs')
.option('help',{default:false})
.option('listado',{describe:'Lista a los desarrolladores que asistirán',require:false,default:false})
.option('añadir',{describe:'Añade a un dev a la lista de invitados',require:false,default:false})
.option('menu',{describe:'Muestra el CLI como un menú',require:false,default:false})
.check((argv:any,options:any) => {
    console.log(argv[0])
    return true;
})
.argv;