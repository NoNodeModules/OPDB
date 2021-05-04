'use strict';

const firebase = require('../db');
const Teacher = require('../models/teacher');
const firestore = firebase.firestore();


const loginTeacher = async (req, res, next) => {
    try {
       const {id, password} = req.body;
       const teacherID = await firestore.collection('TeacherAccounts').doc(id)
       const idWithpassword = await teacherID.get();
       if(!idWithpassword.data().id === id)
       {
           return  res.send('ID or Password does not match');
       }
       if(idWithpassword.data().password !== password)
       {
           return  res.send('ID or Password does not match');
       }
       res.send({message: "Login Successfully"});

    } catch (error) {
        res.status(400).send('ID or Password does not match');
    }
}
const addTeacher = async (req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('TeacherAccounts').doc(data.id).set(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllTeachers = async (req, res, next) => {
    try {
        const teacher = await firestore.collection('TeacherAccounts');
        const data = await teacher.get();
        const teacherArray = [];
        if(data.empty) {
            res.status(404).send('No teacher record found');
        }else {
            data.forEach(doc => {
                const teacher = new Teacher(

                    doc.data().teacher
                );
                teacherArray.push(teacher);
            });
            res.send(teacherArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getTeacher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const teacher = await firestore.collection('TeacherAccounts').doc(id);
        const data = await teacher.get();
        if(!data.exists) {
            res.status(404).send('Teacher with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(error.status).send(error.message);
    }
}

const updateTeacher = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const teacher =  await firestore.collection('TeacherAccounts').doc(id);
        await teacher.update(data);
        res.send('Teacher record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTeacher = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('TeacherAccounts').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    loginTeacher,
    addTeacher,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher
}