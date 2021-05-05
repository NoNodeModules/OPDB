class Section {
    constructor(id, firstName, lastName, middleInitial, studentNumber, sectionID, personalEmail, sectionName, suffix, yearLevel, subject, score)
    {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.middleInitial = middleInitial;
        this.password = lastName + firstName;
        this.personalEmail = personalEmail;
        this.sectionName = sectionName;
        this.suffix = suffix;
        this.yearLevel = yearLevel;
        this.subject = subject;
        this.score = score;
        this.studentNumber = studentNumber;
        this.sectionID = sectionID;
    }
}

module.exports = Section;