const express = require('express');
const {loginStudent,
       addStudent, 
       getAllStudents, 
       getStudent,
       updateStudent,
       deleteStudent
      } = require('../controllers/studentController');
const {
    loginTeacher,  
    addTeacher,
    getAllTeachers,
    getTeacher,
    updateTeacher,
    deleteTeacher} = require('../controllers/teacherController');

const {   
    addsectionStudent,
    addSection,
    showStudents,
    getsectionStudent,
    updatesectionStudent} = require('../controllers/sectionController')
const router = express.Router();

router.post('/student/login', loginStudent)
router.post('/student', addStudent);
router.get('/students', getAllStudents);
router.get('/student/:id', getStudent);
router.put('/student/:id', updateStudent);
router.delete('/student/:id', deleteStudent);


router.post('/teacher/login', loginTeacher)
router.post('/teacher', addTeacher);
router.get('/teachers', getAllTeachers);
router.get('/teacher/:id', getTeacher);
router.put('/teacher/:id', updateTeacher);
router.delete('/teacher/:id', deleteTeacher);

router.post('/section/student', addsectionStudent);
router.get('/section/students', showStudents);
router.get('/section/student/:id', getsectionStudent);
router.put('/section/student/:id', updatesectionStudent);
router.post('/section',addSection);

module.exports = {
    routes: router
}