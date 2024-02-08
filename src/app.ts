import { yarg } from "./config/plugins/yargs.plugin";
import { ServerApp } from "./presentacion/server-app";


// console.log(argv);


(async()=>{
    await main()
    
})()

async function main() {

    const {b:base, l:limit, s:showTable, d:destination, n:fileName} = yarg
     
    ServerApp.run({base, limit, showTable, destination, fileName});
    
}
 

