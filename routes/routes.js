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

module.exports = {
    routes: router
}