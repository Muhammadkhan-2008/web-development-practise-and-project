// loops and for loop 

for (let a =0; a<3; a++)
{
    console.log(a)
}


//while and do-while loops 

let loop ="5";
let sum = "0";
while (sum < loop )
{
    console.log(sum);
    sum++;
}



// practise set 01 --Q1
marks = {
    mkhan : "99",
    yaeen : "90",
    rahul : "79"


}

   for(let keys in marks)
   {
    console.log("Marks of " + keys + 
        " " +  "are" + " "+ marks[keys]);
   }

   //practise set 02 --Q2

        //guess a mumber game 
        /*

    let cn=4;
    let i;
    while(i !=cn){
        i = prompt("enter a number ");
        console.log("bit away from right option")

    }
    console.log("you have entered a correct number ")

    */
//    practise set 03 --Q3 
            //MEAN OF 5 NUBMER
    
        function mean ()
        {
            let x1 = 1;
            let x2 = 2;
            let x3 = 3;
            let x4 = 4;
            let x5 = 5;

            let x6 = (x1+x2+x3+x4+x5)/5
            console.log(x6);
        }
        mean();