// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Manager extends Employee {
  // manager has employee properties & methods
  constructor(name, id, email, officeNumber) {
    super(name, id, email); // this creates new Employee(name, id, eamil)
    this.officeNumber = officeNumber;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return this.officeNumber;
  }
}
module.exports = Manager;
