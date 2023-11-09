const { listeners } = require('process');
const readline = require ('readline');
 const fs = require('fs');
const { isUtf8 } = require('buffer');
//  how to read input from the user

const rl = readline.createInterface({
input: process.stdin,
output: process.stdout

});
rl.question('please enter your name:',(name)=>{
    console.log("you entered:" + name);
    rl.close();
})
rl.on('close',()=>{
    console.log('interface closed');
    process.exit(0);
}
);
