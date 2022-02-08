const { menuinquirer , pausa , opciones , jsonurl } = require('./helpers/inquirer');
const { bdeployer } = require('./helpers/bdeployer');

console.clear();

//EMPIEZA EL CODIGO:

//VAMOS A HACER POR CREAR UNA SOLUCION QUE GENERE EL FICHERO UNA VEZ TRAS DESCARGARLO Y LUEGO CONSUMA ESA SIEMPRE.

const menuloop = async(directorio:string) => {
    let opt = '';
    do{
        let db:any[] = require('./database/devs.json');
        opt = await menuinquirer();
        switch(opt){
            case '1': opciones.diasdelevento() ; break ;
            case '2': opciones.developers(db) ; break ;
            case '3': await opciones.agregardev(db,directorio) ; break ;
            case '4': await opciones.reiniciarBD(directorio) ; break ;
        }
        await pausa();
    }while(opt !== '0');
}

const main = async() => {
    console.clear();
    await bdeployer(__dirname);
    await menuloop(__dirname);
    console.clear();
}

main();

//ACABA EL CÓDIGO:
console.log("\n");