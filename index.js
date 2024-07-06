#! /use/bin/env node
import inquirer from "inquirer";
class Student {
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = this.generateId();
        this.courses = [];
        this.balance = 0;
    }
    generateId() {
        return Math.floor(Math.random() * 10000);
    }
    enroll(course) {
        this.courses.push(course);
    }
    payTutionFee(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
        }
        else {
            console.log(`Remaining Balance ${this.balance}`);
        }
    }
    viewBalance() {
        return this.balance;
    }
    showStatus() {
        console.log("Student Name:", this.name);
        console.log("Student ID:", this.id);
        console.log("Courses Enrolled:", this.courses.join(", "));
        console.log("Balance:", this.balance);
    }
}
class Course {
    subject;
    fee;
    constructor(subject, fee) {
        this.subject = subject;
        this.fee = fee;
    }
}
async function main() {
    const courses = [
        new Course("Web Development", 10000),
        new Course("Graphic Designing", 5000),
        new Course("Digital Marketing", 7000),
    ];
    const students = [];
    while (true) {
        const { answer } = await inquirer.prompt({
            name: "answer",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "Add Student",
                "Enroll in a Course",
                "Pay Tution Fees",
                "View Balance",
                "Show Status",
                "Exit",
            ],
        });
        if (answer === "Add Student") {
            const { Studentname } = await inquirer.prompt({
                name: "Studentname",
                type: "input",
                message: "Enter Student's name: ",
            });
            const newStudent = new Student(Studentname);
            students.push(newStudent);
            console.log("Student added successfully! Student Name:", newStudent.name, " ", "Student ID:", newStudent.id);
        }
        else if (answer === "Enroll in a Course") {
            const { studentid, courseName } = await inquirer.prompt([
                {
                    name: "studentid",
                    type: "number",
                    message: "Enter Student Id: ",
                },
                {
                    name: "courseName",
                    type: "list",
                    message: "Select course to enroll",
                    choices: courses.map((course) => course.subject),
                },
            ]);
            const SelectedCourses = courses.find((course) => course.subject === courseName);
            if (!SelectedCourses) {
                console.log(`Course '${courseName}' not found.`);
                continue;
            }
            const SelectedStudent = students.find((student) => student.id === studentid);
            if (!SelectedStudent) {
                console.log(`Student with ID '${studentid}' not found.`);
                continue;
            }
            SelectedStudent.enroll(SelectedCourses.subject);
            SelectedStudent.balance += SelectedCourses.fee;
            console.log("Enrolled in", courseName, "successfully!");
        }
        else if (answer === "Pay Tution Fees") {
            const { payId, amount } = await inquirer.prompt([
                {
                    name: "payId",
                    type: "number",
                    message: "Enter Student's Id: ",
                },
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to pay: ",
                },
            ]);
            const payFee = students.find((student) => student.id === payId);
            if (payFee) {
                payFee.payTutionFee(amount);
                console.log("Tution Fees Paid Successfully!");
            }
            else {
                console.log("Student not found.");
            }
        }
        else if (answer === "View Balance") {
            const { balanceId } = await inquirer.prompt({
                name: "balanceId",
                type: "number",
                message: "Enter Student's Id: ",
            });
            const studentBalance = students.find((student) => student.id === balanceId);
            if (studentBalance) {
                console.log("Balance", studentBalance.viewBalance());
            }
            else {
                console.log("Student not found.");
            }
        }
        else if (answer === "Show Status") {
            const { Id_Status } = await inquirer.prompt({
                name: "Id_Status",
                type: "number",
                message: "Enter Student's Id: ",
            });
            const studentStaus = students.find((student) => student.id === Id_Status);
            if (studentStaus) {
                studentStaus.showStatus();
            }
            else {
                console.log("Student not found.");
            }
        }
        else if (answer === "Exit") {
            break;
        }
    }
}
main();
