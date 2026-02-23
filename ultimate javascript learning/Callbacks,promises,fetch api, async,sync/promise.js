console.log("This is promise.js file");
let prom = new Promise((resolve, reject) =>{
setTimeout (()=> {
console.log(prom +"hi")
resolve("hi");
}, 2000);
});

prom.then((a)=>{
    console.log("you stucked by the prom")
})