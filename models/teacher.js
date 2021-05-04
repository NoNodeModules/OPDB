class Teacher {
    constructor(id, firstName, lastName, role, middleInitial, password, personalEmail) {
            this.id = id;
            this.personalEmail = personalEmail;
            this.firstName = firstName;
            this.lastName = lastName;
            this.role = role;
            this.middleInitial = middleInitial;
            this.password = password;
    }
}

module.exports = Teacher;