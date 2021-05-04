class Student {
    constructor(id, firstName, lastName, middleInitial, password, personalEmail, sectionName, suffix, yearLevel, subject, score ) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.middleInitial = middleInitial;
            this.password = password;
            this.personalEmail = personalEmail;
            this.sectionName = sectionName;
            this.suffix = suffix;
            this.yearLevel = yearLevel;
            this.subject = subject;
            this.score = score;
    }
}

module.exports = Student;