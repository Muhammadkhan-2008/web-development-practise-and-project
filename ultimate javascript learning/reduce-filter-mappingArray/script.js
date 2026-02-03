//mapping array
let arr = ["1", "2", "3", "4", "5"];
let newarr = arr.map((array, index) => {
    return array + index;
})
console.log("newarr = " + newarr); 

//filtering array
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let arrnew = arr2.filter((array) => {
    return array < 5;
})
console.log("number < 5   are " + arrnew);

//reducing array
let arr3 = [1, 2, 3, 4, 5];
let newaar3 = arr3.reduce((m1 , m2, m3) => {
    return m1+m2-m3;
}); 
console.log("the reduced value is " + newaar3); 