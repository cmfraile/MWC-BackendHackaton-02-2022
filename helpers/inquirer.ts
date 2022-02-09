import inquirer from 'inquirer';
import Colors = require('colors.ts') ; Colors.enable();
import { table } from 'table';
import { writeFile , writeFileSync } from 'fs';
import { bdconsulta } from './bdeployer';
import { emailcheck , phonecheck , namecheck } from './validadores';
//const jsonurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';

const preguntas = [
    {
        type:'list',
        name:'opcion',
        choices: [
            {value: '1' , name:`Información del evento`},
            {value: '2' , name:`Listar visitantes`},
            {value: '3' , name:`Añadir visitantes`},
            //{value: '4' , name:`borrar visitante`},
            {value: '5' , name:`Reiniciar base de datos`},
            {value: '0' , name:`Cerrar CLI`}
        ]
    }
];

const inputusuarioq = [
    {type:'input',validate:namecheck,name:'nombre'},
    {type:'input',validate:emailcheck,name:'correo'},
    {type:'list',name:'categoria',choices:[
        {value:'back',nombre:'back'},
        {value:'front',nombre:'front'},
        {value:'mobile',nombre:'mobile'},
        {value:'data science',nombre:'datascience'},
    ],alias:'categoria'},
    {type:'input',validate:phonecheck,name:'telefono',alias:'teléfono'},
    {type:'list',name:'asistencia',choices:[
        {value:'26 Feb,2021',nombre:'26 Feb,2021'},
        {value:'27 Feb,2021',nombre:'27 Feb,2021'},
        {value:'28 Feb,2021',nombre:'28 Feb,2021'},
        {value:'1 Mar,2021',nombre:'1 Mar,2021'},
        {value:'2 Mar,2021',nombre:'2 Mar,2021'},
        {value:'3 Mar,2021',nombre:'3 Mar,2021'},
    ],alias:'dias de asistencia'},
]



export const menuinquirer = async() => {
    console.clear();
    console.log("MWC_BCN - 02/2022 - Desafio BackEnd".yellow);
    console.log("Escoge una opción:\n".yellow);
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
    },
    developers: (db:any[]) => {
        //USUARIO : name,email,category,phone,date.
        let jsonprint:any[][] = [['nombre','correo','categoria','telefono','dia de asistencia']];
        let index:number = 0;
        db.forEach((x:any) => {
            index++;

            if(x.editado){jsonprint.push([`${x.name.red}`,`${x.email.red}`,`${x.category.red}`,`${x.phone.red}`,`${x.date.red}`,])};
            
            if(!x.editado){
                if(index % 2 == 0){
                    jsonprint.push([`${x.name.green}`,`${x.email.green}`,`${x.category.green}`,`${x.phone.green}`,`${x.date.green}`,]);
                }else{
                    jsonprint.push([`${x.name.blue}`,`${x.email.blue}`,`${x.category.blue}`,`${x.phone.blue}`,`${x.date.blue}`,]);
                }
            }
            
        });
        console.clear();
        console.log(table(jsonprint,undefined));
    },
    agregardev: async(db:any[],directorio:string):Promise<void> => {
        try{
            console.clear();
            const respuestas = await inquirer.prompt(inputusuarioq);
            const r2 = { name:respuestas.nombre , email:respuestas.correo , category:respuestas.categoria , phone:respuestas.telefono , date:respuestas.asistencia }
            db.push({...r2,editado:true});
            db = db.sort((a:any,b:any) => {if(a.name < b.name){return -1}else{return 1};});
            writeFile(`${directorio}/database/devs.json`,JSON.stringify(db),(err) =>{if(err) throw err});
        }catch(err){console.log(err)}
    },
    reiniciarBD: async(directorio:string):Promise<void> => {
        try{
            const q = [{type:'confirm',message:'¿Esta seguro de esta accion?',name:'confirmar',default:false}];
            const { confirmar } = await inquirer.prompt(q);
            if(confirmar){
                const data:any[] = await bdconsulta();
                writeFileSync(`${directorio}/database/devs.json`,JSON.stringify(data));
            }else{return};
        }catch(err){console.log(err)}
    },
    borrarVisitante: async():Promise<void> => {
        console.log("llegas");
    }
}

