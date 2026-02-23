let input = prompt("Enter the number of the post you want to fetch");
if (input == "1"){
let x = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      let data = await x.json();
      console.log(data);
}
else if (input == "2"){
    let x = await fetch('https://jsonplaceholder.typicode.com/todos/2')
      let data = await x.json();
      console.log(data);
}
else if(input =="3"){
    let x=await fetch('https://jsonplaceholder.typicode.com/todos/2')
    let  data= await x.json();
    console.log(data);
}
else{
    console.log("Invalid input");
}
