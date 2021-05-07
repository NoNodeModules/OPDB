
const firebase = require('../db');
const Student = require('../models/section');
const firestore = firebase.firestore();

//path
const addsectionStudent = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('StudentAccounts').doc(data.id).set(data);
        await firestore.collection('Section').doc(data.sectionName).collection('students').doc(data.id).set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(error.status);
    }
}
const addSection = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('Section').doc(data.sectionName).set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(error.status);
    }
}

const showStudents = async (req, res, next) => {
    try {
        const datas =req.body;
        const students = await firestore.collection('Section').doc(datas.sectionName).collection('students');
        const data = await students.get()
        const studentsArray = [];
        if(data.empty) {
            res.status(404).send('No student record found');
        }else {
            data.forEach(doc => {
                const student = new Student(
                    doc.data()
                );
                studentsArray.push(student);
            });
            res.send(studentsArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getsectionStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('Section').doc(data.sectionName).collection('students').doc(id);
        const data = await student.get();
        if(!data.exists) {
            res.status(404).send('Student with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}
const updatesectionStudent = async (req, res, next) => {
    try {
        const data = req.body;
        const sectionStudent = await firestore.collection('Section').doc(data.sectionName).collection('student').doc(data.id);
        await sectionStudent.update(data);
        const student =  await firestore.collection('StudentAccounts').doc(data.id);
        await student.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addsectionStudent,
    addSection,
    showStudents,
    getsectionStudent,
    updatesectionStudent
}