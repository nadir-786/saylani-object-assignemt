// Question 1
// document.write("<h3>Question 1: </h3>");

// var grandTotal = 0;
// var itemsArray = [
//     { name: "juice", price: 50, quantity: 3 },
//     { name: "cookie", price: 30, quantity: 9 },
//     { name: "shirt", price: 880, quantity: 1 },
//     { name: "pen", price: 100, quantity: 2 }
// ];

// for (let i = 0; i < itemsArray.length; i++) {
//     const item = itemsArray[i];
//     var totalAmount = item.price * item.quantity;
//     grandTotal += totalAmount;
//     document.write("<h3>" + item.quantity + " " + item.name + " of " + item.price + " is equal to " + totalAmount + " Amount</h3>");
// }

// document.write("<h1> Your Total Bill Amount is "+grandTotal+"</h1");

// Question 2
// document.write("<h3>Question 2: </h3>");

// var user = {
//     name: "Nadir Ali",
//     email: "nadirali.41006@gmail.com",
//     password: 'test123',
//     age: 17,
//     gender: "male",
//     city: "Karachi",
//     country: "Pakistan"
// };
// document.write("<h3>So I have create following OBJECT</h3><br />");
// document.write(JSON.stringify(user)+"<br /><br /><br />");
// if (user.hasOwnProperty("age")) {
//     document.write("Yes, User Object has Age Propery in it <br />")
// } else {
//     document.write("No, User Object has no Age Propery in it<br />")
// }
// if (user.hasOwnProperty("country")) {
//     document.write("Yes, User Object has Country Propery in it<br />")
// } else {
//     document.write("No, User Object has no Country Propery in it<br />")
// }
// if (user.hasOwnProperty("firstName")) {
//     document.write("Yes, User Object has firstName Propery in it<br />")
// } else {
//     document.write("No, User Object has no firstName Propery in it<br />")
// }
// if (user.hasOwnProperty("lastName")) {
//     document.write("Yes, User Object has lastName Propery in it<br />")
// } else {
//     document.write("No, User Object has no lastName Propery in it<br />")
// }

// Question 3
// document.write("<h3>Question 3: </h3>");

// function Employee(name, age, designation, education) {
//     this.name = name;
//         this.age = age;
//         this.designation = designation;
//         this.education = education
// }

// var employee1 = new Employee("Nadir Ali", 17, "Full Stack Developer", "Intermediate");
// var employee2 = new Employee("Haris Khan", 21, "Project Manager", "BSc");
// document.write("<h2>"+employee1.name+" is a "+employee1.designation+". His Age is "+employee1.age+"<br />"+employee2.name+" is a "+employee2.designation+". His Age is "+employee2.age+"<br /> "+employee1.name+" is a good friend of "+employee1.name+"</h2")

// Question 4

function Person(Name, gender, address, education, profession) {
    this.id = Math.floor(Math.random()*99999999999999999);
    this.Name = Name;
    this.gender = gender;
    this.address = address;
    this.education = education;
    this.profession = profession;
};


document.getElementById("peopleForm").addEventListener("submit", function (e) {
    e.preventDefault();
    let Name = document.getElementById("personName").value;
    let genderMale = document.getElementById("personGender1").checked;
    let genderFemale = document.getElementById("personGender1").checked;
    let gender;

    let address = document.getElementById("personAddress").value;
    let education = document.getElementById("personEducation").value;
    let profession = document.getElementById("personProfession").value;
    if (Name === "" || address === "" || education === "" || profession === "") {
        alert("Pleas Fill Out All Fields")
        return;
    }
    if (genderMale) {
        gender = "male";
    } else if (genderFemale) {
        gender = "female";
    } else {
        alert("Please Select a Gender");
        return;
    }
    let newPerson = new Person(Name, gender, address, education, profession);
    let previousData = localStorage.getItem("allPersons");
    if (previousData) {
        let prevData = JSON.parse(previousData);
        prevData.push(newPerson);
        localStorage.setItem("allPersons", JSON.stringify(prevData));
        getAllPerson()
    } else {
        let newData = [];
        newData.push(newPerson);
        localStorage.setItem("allPersons", JSON.stringify(newData));
        getAllPerson()
    }
    document.getElementById("peopleForm").reset();
});

function deleteAllData() {
    var emptyData = new Array();
    localStorage.setItem("allPersons", JSON.stringify(emptyData));
    getAllPerson();
}

function deletePerson(data) {
    var currentData = localStorage.getItem('allPersons');
    if (currentData) {
        var currData = JSON.parse(currentData);
        var filteredData = currData.filter((newData)=> newData.id != data.id);
        localStorage.setItem("allPersons",JSON.stringify(filteredData));
        getAllPerson();
    } else {
        deleteAllData();
    }
}
function getAllPerson() {
    let allPersons = [];
    let storagePersons = localStorage.getItem("allPersons");
    document.getElementById("peopleTable").innerHTML = "<table border='1' id='peopleTable'><tr><th>Sno</th><th>Name</th><th>Gender</th><th>Address</th><th>Education</th><th>Profession</th><th>Action</th></tr></table>";
    if (!storagePersons || (JSON.parse(storagePersons)).length === 0) {
        localStorage.setItem("allPersons", JSON.stringify(allPersons));
    } else {
        let data = JSON.parse(storagePersons);
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            document.getElementById("peopleTable").innerHTML += "<tr><td>" + Number(i + 1) + "</td><td>" + element.Name + "</td><td>" + element.gender + "</td><td>" + element.address + "</td><td>" + element.education + "</td><td>" + element.profession + "</td><td><button type='button' onclick='deletePerson(" + JSON.stringify(element) + ");'>Delete Person</button></td></tr>"
        }
    }
}
getAllPerson();