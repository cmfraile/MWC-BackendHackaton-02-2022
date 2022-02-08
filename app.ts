const { menuinquirer , pausa , opciones , jsonurl } = require('./helpers/inquirer');
const { bdeployer } = require('./helpers/bdeployer');

console.clear();

//EMPIEZA EL CODIGO:

//VAMOS A HACER POR CREAR UNA SOLUCION QUE GENERE EL FICHERO UNA VEZ TRAS DESCARGARLO Y LUEGO CONSUMA ESA SIEMPRE.

const menuloop = async(db:any[],directorio:string) => {
    let opt = '';
    do{
        opt = await menuinquirer();
        switch(opt){
            case '1': opciones.diasdelevento(db) ; break ;
            case '2': opciones.developers(db) ; break ;
            case '3': await opciones.agregardev(db,directorio) ; break ;
            case '4': await opciones.reiniciarBD() ; break ;
        }
        await pausa();
    }while(opt !== '0');
}

const main = async() => {
    console.clear();
    const takedb:any[] = await bdeployer(__dirname);
    await menuloop(takedb,__dirname);
    //console.clear();
}

main();

//ACABA EL CÓDIGO:
console.log("\n");