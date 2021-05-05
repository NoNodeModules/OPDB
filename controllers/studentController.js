'use strict';
const firebase = require('../db');
const Student = require('../models/student');
const firestore = firebase.firestore();


const loginStudent = async (req, res, next) => {
    try {
       const {id, password} = req.body;
       const studentID = await firestore.collection('StudentAccounts').doc(id)
       const idWithpassword = await studentID.get();
       if(!idWithpassword.data().id === id)
       {
           return  res.send('ID or Password does not match');
       }
       if(idWithpassword.data().password !== password)
       {
           return  res.send('ID or Password does not match');
       }
       res.send('True');

    } catch (error) {
        res.status(400).send('ID or Password does not match');
    }
}

const addStudent = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('StudentAccounts').doc(data.id).set(data);
        await firestore.collection('Section').doc(data.sectionName).collection('students').doc(data.id).set(data);
        res.send('True');
    } catch (error) {
        res.status(error.status);
    }
}

const getAllStudents = async (req, res, next) => {
    try {
        const students = await firestore.collection('StudentAccounts');
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

const getStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        const student = await firestore.collection('StudentAccounts').doc(id);
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
//uppp
const updateStudent = async (req, res, next) => {
    try {
        const data = req.body;
        const student =  await firestore.collection('StudentAccounts').doc(data.id);
        await student.update(data);
        const sectionStudent = await firestore.collection('Section').doc(data.sectionName).collection('student').doc(data.id);
        await sectionStudent.update(data);
        res.send('Student record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteStudent = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('StudentAccounts').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    loginStudent,
    addStudent,
    getAllStudents,
    getStudent,
    updateStudent,
    deleteStudent
}