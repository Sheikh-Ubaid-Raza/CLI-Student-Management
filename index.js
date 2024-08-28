#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    name;
    id;
    courses;
    balance;
    constructor(name) {
        this.name = name;
        this.id = Student.counter++;
        this.courses = []; // Initializa an empty array for courses
        this.balance = 1000;
    }
    // Method => to enroll a student in a course
    enroll_courses(course) {
        this.courses.push(course); // Add Courses name in empty array By using push() , through 'course' parameter
    }
    // Method => to view a student Balance
    view_balance() {
        console.log(`Balance for ${chalk.magenta.bold(this.name)}: $${chalk.red.bold(this.balance)}`);
    }
    // Method => to pay student fees
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${chalk.red.bold(amount)},Fees paid Successfully for ${chalk.magenta.bold(this.name)}.`);
        console.log(`Remaing Balance is $${chalk.red.bold(this.balance)}`);
    }
    // Method => to Display Student Status
    show_status() {
        console.log(`ID: ${chalk.green.bold(this.id)}.`);
        console.log(`Name: ${chalk.magenta.bold(this.name)}.`);
        console.log(`Courses: ${chalk.cyan.bold(this.courses)}.`);
        console.log(`Balance: ${chalk.red.bold(this.balance)}.`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    // Method => to add a new student
    add_student(name) {
        let student = new Student(name);
        this.students.push(student); // Add new Student All Data (name,id,courses,balance) in empty array By 
        // using push() , through 'student' parameter
        console.log(`Student Name: ${chalk.magenta.bold(name)} added Successfully and the Student ID is: ${chalk.green.bold(student.id)}`);
    }
    // Method => to enroll a new student in a course
    enroll_student_course(student_id, course) {
        let student_found = this.find_student(student_id);
        if (student_found) {
            student_found.enroll_courses(course);
            console.log(`${chalk.magenta.bold(student_found.name)} enrolled in ${chalk.red.bold(course)} Successfully!`);
        }
        else {
            console.log(chalk.gray.underline("Student not found ,Please Enter a correct Student ID"));
        }
    }
    // Method => to view a Student Balance
    view_student_balance(student_id) {
        let student_found = this.find_student(student_id);
        if (student_found) {
            student_found.view_balance();
        }
        else {
            console.log(chalk.gray.underline("Student not found ,Please Enter a correct Student ID"));
        }
    }
    // Method => to pay Student Fees
    pay_student_fees(student_id, amount) {
        let student_found = this.find_student(student_id);
        if (student_found) {
            student_found.pay_fees(amount);
        }
        else {
            console.log(chalk.gray.underline("Student not found ,Please Enter a correct Student ID"));
        }
    }
    // Method => to display a student Stautus
    show_student_status(student_id) {
        let student_found = this.find_student(student_id);
        if (student_found) {
            student_found.show_status();
        }
    }
    // Method => to find a Student all data by student uniques ID.
    find_student(student_id) {
        return this.students.find(std => std.id === student_id);
    }
}
// Main Function to run the Program
async function main() {
    console.log(chalk.magenta.bold.italic.dim("\t Welcome to Student Management System \t"));
    console.log(chalk.gray.bold("-".repeat(50)));
    let studentManger = new Student_manager();
    // While loop to program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choose",
                message: "Select an Option",
                type: "list",
                choices: ["Add Student", "Enroll Student", "View Student Balance", "Pay Fees", "Show Status", "Exit"]
            }
        ]);
        // Using switch statement cases for user 'choice'
        switch (choice.choose) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        message: "Enter Student Name:",
                        type: "input"
                    }
                ]);
                studentManger.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter a Student ID:"
                    },
                    {
                        name: "course",
                        message: "Enter a Course Name:",
                        type: "input"
                    }
                ]);
                studentManger.enroll_student_course(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        message: "Enter a Student ID:",
                        type: "number"
                    }
                ]);
                studentManger.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let pay_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        message: "Enter a Student ID:",
                        type: "number"
                    },
                    {
                        name: "amount",
                        message: "Enter The amount to Pay:",
                        type: "number"
                    }
                ]);
                studentManger.pay_student_fees(pay_input.student_id, pay_input.amount);
                break;
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        message: "Enter a Student ID:",
                        type: "number"
                    }
                ]);
                studentManger.show_student_status(status_input.student_id);
                break;
            case "Exit":
                console.log(chalk.green.bold.italic("\t Exiting... \t"));
                process.exit();
        }
    }
}
// Calling a main function
main();
