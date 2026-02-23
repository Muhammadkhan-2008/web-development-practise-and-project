async function getData() {
    setTimeout(() => {
        console.log("This is async_await.js file");
    }, 2000);
    
}
async function main() {
    console.log("Before calling getData");
    console.log("Calling getData");
    let data = await getData();
    console.log("After calling getData");
    
}
main();