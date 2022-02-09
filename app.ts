const { menuinquirer , pausa , opciones } = require('./helpers/inquirer');
const { bdeployer } = require('./helpers/bdeployer');
import { readFileSync } from 'fs';

console.clear();

//EMPIEZA EL CODIGO:

//VAMOS A HACER POR CREAR UNA SOLUCION QUE GENERE EL FICHERO UNA VEZ TRAS DESCARGARLO Y LUEGO CONSUMA ESA SIEMPRE.

const lectura = ():any[] => {
    const raw:any = readFileSync(`${__dirname}/database/devs.json`);
    const json = JSON.parse(raw);
    return json;
}

const menuloop = async(directorio:string) => {
    let opt = '';
    do{
        console.clear();
        opt = await menuinquirer();
        switch(opt){
            case '1': opciones.diasdelevento() ; break ;
            case '2': opciones.developers(lectura()) ; break ;
            case '3': await opciones.agregardev(lectura(),directorio) ; break ;
            //case '4': await opciones.borrarVisitante() ; break ;
            case '5': await opciones.reiniciarBD(directorio) ; break ;
        }
        if(opt !== '5'){await pausa();}
    }while(opt !== '0');
}

const main = async() => {

    console.clear();
    await bdeployer(__dirname);
    await menuloop(__dirname);
    console.clear();

    /*
    const objtest = {propiedad:true,propiedad2:undefined};
    console.log(objtest);
    console.log(!objtest.propiedad2) // undefined -> true;
    */

}

main();

//ACABA EL CÓDIGO:
console.log("\n");