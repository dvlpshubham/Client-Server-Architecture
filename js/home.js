let employeePayrollList;
window.addEventListener("DOMContentLoaded", (event) => {
   employeePayrollList = getEmployeePayrollDataFromStorage();
   createInnerHtml();
   // localStorage.removeItem('employeePayrollList');
});

const getEmployeePayrollDataFromStorage = () => {
   return localStorage.getItem("employeePayrollList")
      ? JSON.parse(localStorage.getItem("employeePayrollList"))
      : [];
};
const createInnerHtml = () => {
   const headerHtml =
      "<th></th><th>Nane</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>";
   if (employeePayrollList.length == 0) return;
   let innerHtml = `${headerHtml}`;
   for (let index = 0; index < employeePayrollList.length; index++) {
      innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" alt="" src="${
                   employeePayrollList[index]._profilePic
                }"></td>
                <td>${employeePayrollList[index]._name}</td>
                <td>${employeePayrollList[index]._gender}</td>
                <td>${getDeptHtml(employeePayrollList[index]._department)}</td>
                <td>${employeePayrollList[index]._salary}</td>
                <td>${stringifyDate(employeePayrollList[index]._startDate)}</td>
                <td>
                    <img id="${index}" onclick="remove(this)" src="../assets/icons/delete-black-18dp.svg" alt="delete">
                    <img id="${index}" onclick="update(this)" src="../assets/icons/create-black-18dp.svg" alt="edit">
                </td>
            </tr>
        `;
   }
   document.querySelector("#table-display").innerHTML = innerHtml;
   document.querySelector(".emp-count").textContent =
      employeePayrollList.length;
};
const getDeptHtml = (deptList) => {
   let deptHtml = "";
   if (typeof deptList == "string") {
      deptHtml = `${deptHtml} <div class="dept-label">${deptList}</div>`;
      return deptHtml;
   }
   for (const dept of deptList) {
      deptHtml = `${deptHtml} <div class="dept-label">${dept}</div>`;
   }

   return deptHtml;
};

const remove = (node) => {
   employeePayrollList.splice(parseInt(node.id), 1);
   localStorage.setItem(
      "employeePayrollList",
      JSON.stringify(employeePayrollList)
   );
   createInnerHtml();
};
const update = (node) => {
   const currentUri = window.location.href;
   const addUri = currentUri.replace("home", "EmpPayroll_Form");
   window.location.replace(addUri + "?index=" + node.id);
};

const createEmployeePayrollJSON = () => {
   let empPayrollDB = [
      {
         id: 1,
         _name: "Prashanth Phad",
         _gender: "male",
         _department: ["Engineer", "Other"],
         _salary: "498700",
         _startDate: "16 Oct 2021",
         _note: "All In One",
         _profilePic: "../assets/profile-images/Ellipse-3.png",
      },
      {
         id: 5,
         _name: "Jyothi",
         _gender: "female",
         _department: ["Sales", "Finance"],
         _salary: "400000",
         _startDate: "12 Oct 2019",
         _note: "",
         _profilePic: "../assets/profile-images/Ellipse -1.png",
         id: 3,
      },
   ];
   return empPayrollDB;
};

function makeServiceCalls(methodType, url, async = true, data = null) {
   return new Promise(function (resolve, reject) {
      let xhr = new XMLHttpRequest();
      xhr.onload = function () {
         console.log(
            methodType +
               "state changed called Ready State" +
               xhr.readyState +
               "status" +
               xhr.status
         );
         if (xhr.status.toString().match("^[2][0-9]{2}$")) {
            resolve(xhr.responseText);
         } else if (xhr.status.toString().match("^[4,5][0-9]{2}$")) {
            reject({
               status: xhr.status,
               statusText: xhr.statusText,
            });
            console.log("XR Failed!");
            console.log("Handle 400 Client Error or 500 Server Error.");
         }
      };
      xhr.onerror = function () {
         reject({
            status: xhr.status,
            statusText: xttp.statusText,
         });
      };
      xhr.open(methodType, url, async);
      if (data) {
         console.log(JSON.stringify(data));
         xhr.setRequestHeader("Content-Type", "application/json");
         xhr.send(JSON.stringify(data));
      } else xhr.send();
      console.log(methodType + " request sent to the server.");
   });
}
