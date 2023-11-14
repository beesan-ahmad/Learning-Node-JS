const { listeners } = require('process');
const readline = require ('readline');
 const fs = require('fs');
const { isUtf8 } = require('buffer');
const http = require('http');
//****************************** */
//  how to read input from the user
/*const rl = readline.createInterface({
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
//*************************** 
// reading  from the file synchronously
let textIn = fs.readFileSync('./Files/input.txt' ,'utf-8');
console.log(textIn);
// writing from the file synchronously
let content = `data read from input file:${textIn} \nDate created: ${new Date()}` ;
fs.writeFileSync('./Files/output.txt',content);*/
//****************************
//Reading and writing from the file asynchronously
/*fs.readFile('./Files/start.txt','utf-8',
 (error1,data1)=> {
    console.log(data1)
    fs.readFile(`./Files/${data1}.txt`,'utf-8',(error2,data2)=>{//read the content of input.txt file
        console.log(data2);
        fs.readFile(`./Files/append.txt`,'utf-8',(error3,data3)=>{
            console.log(data3);
            fs.writeFile(`./Files/output.txt`,`${data2}\n\n${data3}\n\nDate created: ${new Date()}`,()=>{
                console.log('file written successfully');
            })
        })
    })
});/*we see the shape of the code looks like triangle that means we have a callback help(
when we call a callback function inside another callback function...etc we can avoid it by
using async await or promise
)
console.log('Reading File......');*/
//*************************** 
//create a simple web server
// Step 1:create a server
const html = fs.readFileSync('./Template/index.html','utf-8')
const server = http.createServer((request,response)=>{
   let path = request.url;
    if (path === '/' || path.toLocaleLowerCase() === '/home') {
        response.writeHead(200,{
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in home page'));

    } else if (path.toLocaleLowerCase() === '/about') {
        response.writeHead(200,{
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in about page'));

    }else if (path.toLocaleLowerCase() === '/contact') {
        response.writeHead(200,{
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}','You are in contact page'));

    }else if(path.toLocaleLowerCase() === '/products'){
        response.writeHead(200,{
            'Content-Type' : 'application/json'
        });
        fs.readFile('./Data/products.json','utf-8', (error,data)=>{//this wil read the json file every time we make a request for products in the url
            response.end(data);
        });
     } else{
        response.writeHead(404 ,{
            'Content-Type' : 'text/html',
            'my-header': 'Hello, world'
        });
        response.end(html.replace('{{%CONTENT%}}','Error 404:page not found'));
    }
})
// Step 2:start the server
server.listen(8000,'127.0.0.1',()=>{
    console.log('server has started');
})
