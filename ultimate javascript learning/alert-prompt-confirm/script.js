//alert use

alert("Hello, welcome to our website!");

//alert and prompt use
alert("ENTER THE NUMBER First press ok "); let a = prompt("enter a"); console.log("you entered the number " + a);

//alert prompt and confirm use
alert ("enter any number first press ok");
let b = prompt("Enter a number");
alert("you entered " + b);
let confirmation = confirm("Do you want to proceed?");
if(confirmation){
    document.write("You pressed OK. Proceeding...");

}
else{
    document.write("You pressed Cancel. Operation aborted.");
    
}




