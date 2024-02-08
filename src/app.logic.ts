import fs from "fs";
import { yarg } from "./config/plugins/yargs.plugin";

const {b:base, l:limit, s:showTable} = yarg

let tabla: string = ''
const message: string = `
==================
   Tabla del 5 
================== \n
`
const url = `/tabla-${base}.txt`
for (let i = 0; i <= limit; i++) {
   tabla += `${base} X ${i} = ${base * i}\n`;


}

tabla = message + tabla

if(showTable) console.log(tabla);

const path = `outputs`;

fs.mkdirSync(path, { recursive: true })

fs.writeFileSync(path + url, tabla)
console.log('File created');










