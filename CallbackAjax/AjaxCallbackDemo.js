
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType, url, callback, async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () { //event handler //event listener
        //whatever connection changes happens it gives us call back
        console.log(methodType + " State Changed Called at:  RS: " + xhr.readyState +
            " Status: " + xhr.status);
        if (xhr.readyState === 4) {
            //Matching all 200 Series Responses
            if (xhr.status === 200 || xhr.status === 201) {
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 Client Error or 500 Server Error at");
            }
        }
    }
    xhr.open(methodType, url, async); // opens connection
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + " request sent to the server");
}


const getURL = "http://127.0.0.1:3000/employees/1";
function getUserDetails(data) {
    console.log("Get User Data at: " + data)
}
makeAJAXCall("GET", getURL, getUserDetails);


const deleteURL = "http://localhost:3000/employees/4";
function userDeleted(data) {
    console.log("User Deleted  at:" + data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);


const postURL = "http://localhost:3000/employees";
const emplData = { "name": "Harry", "salary": "5000" };
function userAdded(data) {
    console.log("User Added at: " + data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);
