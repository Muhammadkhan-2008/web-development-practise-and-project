// string methods practise Project on User output where user type any name it will be converted to uppercase

let name = prompt("Enter your name ");
// console.log("Your name is " + name.toUpperCase());
console.log("toUpperCase");
console.log("first letter capital");
console.log("toLowerCase");
console.log("trim");
console.log("slice");
console.log("include");
let option = prompt("Enter any option to complete the string method ");
if(option=="toUpperCase"){
    console.log("It is converted to uppercase " + name.toUpperCase());
        }
        else if (option=="first letter capital"){
            console.log("First character is now capital" + name.toUpperCase(0) + name.slice(1));
        }
else if(option =="toLowerCase"){
    console.log("It is converted to lowercase " + name.toLowerCase());
}
else if (option =="trim"){
    console.log("it is converted to trim" + name.trim());

}

else if (otion =="slice"){
    console.log("currently working on slice method ");
}
else if (option =="include"){
    let a = prompt("Enter a character to check whether it is present or not ");
    console.log("it is converted to include method " + name.includes(a));
}
else
{
    console.log("Invalid option ");
}