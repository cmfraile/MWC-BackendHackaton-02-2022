import fs from 'fs';
import path from 'path';
import axios from 'axios';

//RUTAROOT
//home/nakowhitedeity/EyT/Desarrollo web/Hackatones/MWCfebrero22/desafiobackend/dist.
//const jsonurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.json';

export const bdurl:string = 'https://challenges-asset-files.s3.us-east-2.amazonaws.com/data_sets/mwc22.jsona';

export const bdconsulta = async(rutaroot:string):Promise<any[]> => {
    return new Promise((rs,rj) => {
        axios.get(bdurl).then(resp => {
            let arraydev:any[] = resp.data;
            arraydev = arraydev.sort((a:any,b:any) => {if(a.name < b.name){return -1}else{return 1};});
            rs(arraydev);
        }).catch(() => {
            let arraydev:any[] = require(path.join(rutaroot,'../database/original.json'));
            arraydev = arraydev.sort((a:any,b:any) => {if(a.name < b.name){return -1}else{return 1};});
            rs(arraydev);
        });
    })
}


export const bdeployer = async(rutaroot:string):Promise<void> => {
    const urlref:string = path.join(rutaroot,'./database');
    try{
        if(!fs.existsSync(urlref)){fs.mkdirSync(urlref)};
        if(!fs.existsSync(`${urlref}/devs.json`)){
            const data:any = await bdconsulta(rutaroot);
            fs.writeFileSync(`${urlref}/devs.json`,JSON.stringify(data));
        }
        return
    }catch(err){throw err}
}