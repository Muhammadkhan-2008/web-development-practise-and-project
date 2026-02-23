// const function1 = (callback) => {
//     setTimeout(() => {
//         document.getElementById("output").value = "Function 1 is called";
//         callback();
//     }, 2000);
// }

const function1 = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            document.getElementById("output").value = "Function 1 is called";
            resolve("Function 1 completed");
        }, 2000);
    });
}