const { menuinquirer , pausa , opciones } = require('./helpers/inquirer');
const bdoriginal = require('../database/original.json');

console.clear();

//EMPIEZA EL CODIGO:

//VAMOS A HACER POR CREAR UNA SOLUCION QUE GENERE EL FICHERO UNA VEZ TRAS DESCARGARLO Y LUEGO CONSUMA ESA SIEMPRE.

const main = async() => {
    
    let opt = '';
    do{
        opt = await menuinquirer();
        switch(opt){
            case '1': opciones.diasdelevento() ; break ;
            case '2': opciones.developers() ; break ;
            //case '3': console.log(opt) ; break ;
            //case '4': console.log(opt) ; break ;
           default: console.log(opt) ; break ;
        }
        await pausa();
    }while(opt !== '0');

}

//main();

//ACABA EL CÓDIGO:
console.log("\n");