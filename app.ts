const { menuinquirer , pausa , opciones } = require('./helpers/inquirer');

console.clear();

//EMPIEZA EL CODIGO:

let original = require('../database/original.json');

const main = async() => {
    
    let opt = '';
    do{
        opt = await menuinquirer();
        switch(opt){
            case '1': opciones.diasdelevento() ; break ;
            //case '2': console.log(opt) ; break ;
            //case '3': console.log(opt) ; break ;
            //case '4': console.log(opt) ; break ;
           default: console.log(opt) ; break ;
        }
        await pausa();
    }while(opt !== '0');

}

 main();

//ACABA EL CÓDIGO:
console.log("\n");