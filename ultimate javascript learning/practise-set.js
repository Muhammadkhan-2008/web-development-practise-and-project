//Store the string "32" in a variable and log it to the console
let word ="32";
console.log(word);

//add string and number
let num = 10;
console.log(word, num);

//find data type of the variable  created above

console.log(typeof word);


//find datatypeof the variable string and number
console.log(typeof (word+num));

//created constant  object and try to change it later
const objects = 
{
    number: "32",
    name: "Alice"
    

}

// //  objects = "222";   throws error
// objects.number = "222"; // this is allowed

//adding new key value to constant object

objects['name'] = "mk";
console.log(objects); 

//createa js programm for dicitonary to add 5 words 

const dicitionary1= 
{
    Apple: "A fruit ",
    book: "A set of pages ",
    pen: "which help to write "
}

console.log(dicitionary1);

//create js programm for dictionary where user wil ask the word and get the result from of 5 words
let prompt = ("enter word to search in Dictionary");

let dicitionary = 
{
    Apple: "A fruit ",
    book: "A set of pages ",
    pen: "which help to write "
}
if(prompt == "Apple"){



console.log(dicitionary["Apple"]);
}
else if(prompt == "book"){
    console.log(dicitionary["book"]);
}
else if(prompt == "pen"){
    console.log(dicitionary["pen"]);
}
else{
    console.log("word not found");
}
