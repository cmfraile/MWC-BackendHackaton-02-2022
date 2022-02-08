import fs from 'fs';
import path from 'path';
import axios from 'axios';

//RUTAROOT
//home/nakowhitedeity/EyT/Desarrollo web/Hackatones/MWCfebrero22/desafiobackend/dist.
//const jsonurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';

const bdurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json'
const bdconsulta = async() => {
    return new Promise((rs,rj) => {
        axios.get(bdurl).then(resp => {
            let arraydev:any[] = resp.data;
            arraydev = arraydev.sort((a:any,b:any) => {if(a.name < b.name){return -1}else{return 1};});
            rs(arraydev);
        }).catch(err => rj(err));
    })
}


export const bdeployer = async(rutaroot:string) => {
    const urlref:string = path.join(rutaroot,'./database');
    return new Promise((rs,rj) => {
    //Si no existe:
    if(!fs.existsSync(urlref)){
        fs.mkdir(urlref,async(err) => {
            if(err == null){
                const data:any = await bdconsulta();
                fs.writeFile(`${urlref}/devs.json`,JSON.stringify(data),(err) =>{if(err) throw err});
                rs(data);
            }else{throw err};
        });
    }else{
        rs(require(`${rutaroot}/database/devs.json`));
    }
    });
    //const data = await bdconsulta() ; console.log(data);
}