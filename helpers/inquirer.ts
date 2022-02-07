import inquirer from 'inquirer';
import Colors = require('colors.ts') ; Colors.enable();

const preguntas = [
    {
        type:'list',
        name:'opcion',
        choices: [
            {value: '1' , name:`Información del evento`},
            {value: '2' , name:`Listar visitantes`},
            {value: '3' , name:`Añadir visitantes`},
            {value: '0' , name:`Cerrar CLI`}
        ]
    }
];

export const menuinquirer = async() => {
    console.clear();
    //console.log("MWCBCN - 02/2022 - Desafio BackEnd\n".yellow);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion ;
}

export const pausa = async() => {
    const q = [{type:'input',name:'enter',message:'Enter para continuar'}];
    console.log("\n") ; await inquirer.prompt(q);
}

export const opciones = {
    diasdelevento: () => {
        console.clear();
        console.log("Te esperamos en el recinto Fira Gran Via de Barcelona:".yellow);
        console.log("Av. Joan Carles I, 64, 08908 L'Hospitalet de Llobregat, Barcelona".yellow);
        console.log("\n");console.log("Desde el 26-02 hasta el 03-03"); console.log("\n");
        console.log(`Mas información ${'https://www.mwcbarcelona.com/about'.green}`);
    }
}

