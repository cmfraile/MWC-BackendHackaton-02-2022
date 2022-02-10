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
        message:'Escoje una opción:',
        choices: [
            {value: '1' , name:`Información del evento`},
            {value: '2' , name:`Listar visitantes`},
            {value: '3' , name:`Añadir visitantes`},
            {value: '4' , name:`borrar visitante`},
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
        {value:'data science',nombre:'data science'},
    ],alias:'categoria'},
    {type:'input',validate:phonecheck,name:'telefono'},
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
    console.log("MWC/BCN <Hackaton-Desafio Backend> :\n".yellow);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion ;
}

export const pausa = async() => {
    const q = [{type:'input',name:'enter',message:'Enter para continuar'}];
    console.log("\n") ; await inquirer.prompt(q); console.clear();
}

export const opciones = {
    diasdelevento: () => {
        console.clear();
        console.log(" Te esperamos en el recinto Fira Gran Via de Barcelona:".yellow,"\n","Av. Joan Carles I, 64, 08908 L'Hospitalet de Llobregat, Barcelona".yellow,"\n\n","Desde el 26-02 hasta el 03-03","\n\n",`Mas información: ${'https://www.mwcbarcelona.com/about'.green}`)
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
            writeFileSync(`${directorio}/database/devs.json`,JSON.stringify(db));
        }catch(err){console.log(err)}
    },
    reiniciarBD: async(directorio:string):Promise<void> => {
        try{
            const q = [{type:'confirm',message:'¿Esta seguro de esta accion?',name:'confirmar',default:false}];
            const { confirmar } = await inquirer.prompt(q);
            if(confirmar){
                const data:any[] = await bdconsulta(directorio);
                writeFileSync(`${directorio}/database/devs.json`,JSON.stringify(data));
            }else{return};
        }catch(err){console.log(err)}
    },
    borrarVisitante: async(db:any[],directorio:string):Promise<void> => {
        const crearregexp = (criterio:string):RegExp|Boolean => {
            let vaciocheck = false;
            criterio.split('').forEach(x => {if(x !== ' '){vaciocheck = true}});
            if(!vaciocheck){return true}else{
                const regexp = new RegExp(criterio,'ig');
                return regexp;
            };
        };
        try{
            console.clear();
            let delinput:any = {
                type:'input',
                name:'eliminar1',
                message:'Escribe su nombre o parte de el (Dejalo vacio para mostrar toda la lista)',
            }
            const { eliminar1 } = await inquirer.prompt(delinput);
            console.clear();
            let delarray:any = {
                type:'list',
                name:'eliminar2',
                message:'Ahora seleccione a quien eliminar:',
                choices:():any[] => {
                    let charray:any[] = [];
                    db.forEach((x:any,i:number) => {
                        if(x.name.match(crearregexp(eliminar1)) || crearregexp(eliminar1) == true){
                            if(i%2 == 0){
                                charray.push({value:`${x.name}`,name:`${x.name.green}`});
                            }else{
                                charray.push({value:`${x.name}`,name:`${x.name.blue}`});
                            }
                        }
                    });
                    charray.unshift(new inquirer.Separator('--------------------------'.red));
                    charray.unshift({value:'CANCELAR BORRADO',name:'CANCELAR BORRADO'.red});
                    charray.unshift(new inquirer.Separator('--------------------------'.red));
                    return charray;
                }
            }
            const { eliminar2 } = await inquirer.prompt(delarray);
            db.forEach((x:any,i:number) => {
                if(eliminar2 == 'CANCELAR BORRADO'){return}
                if(x.name == eliminar2){db.splice(i,1)
                }
            });
            writeFileSync(`${directorio}/database/devs.json`,JSON.stringify(db));
        }catch(err){console.log(err)}
    }
}

