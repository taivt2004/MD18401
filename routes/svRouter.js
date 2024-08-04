var express = require('express');
var router = express.Router();

var students = [
    {'mssv': 1, 'name': 'Nguyễn Văn A', 'class': 'MD18401', 'dtb': 8.5},
    {'mssv': 2, 'name': 'Nguyễn Văn B', 'class': 'MD18401', 'dtb': 9.2},
    {'mssv': 3, 'name': 'Nguyễn Văn C', 'class': 'MD18401', 'dtb': 7.0},
];

/* GET home page. */
//http://192.168.223.225:3007/sv/list
router.get('/list', function(req, res, next) {
  res.status(200).json(students);
});

// Thêm mới một sinh viên
router.post('/add', function(req, res, next) {
  const { mssv, name, class: studentClass, dtb } = req.body;

  var student = { mssv, name, class: studentClass, dtb };

  students.push(student);

  res.status(200).json(students);
});

// Thay đổi thông tin sinh viên theo mssv
router.post('/edit', function(req, res, next) {
  const { mssv, name, class: studentClass, dtb } = req.body;

  var student = students.find(s => s.mssv == mssv);
  if (student) {
    student.name = name;
    student.class = studentClass;
    student.dtb = dtb;
  }

  res.json(students);
});

// Xóa một sinh viên ra khỏi danh sách
router.delete('/delete/:mssv', function(req, res, next) {
  const { mssv } = req.params;

  var index = students.findIndex(s => s.mssv == mssv);
  if (index !== -1) {
    students.splice(index, 1);
  }
  
  res.json(students);
});

// Lấy thông tin chi tiết của một sinh viên theo mssv
router.get('/detail', function(req, res, next) {
  const { mssv } = req.query;

  var student = students.find(s => s.mssv == mssv);
  res.json(student);
});

// Lấy danh sách các sinh viên có điểm trung bình từ 6.5 đến 8.0
router.get('/filter/dtb-range', function(req, res, next) {
  const filteredStudents = students.filter(s => s.dtb >= 6.5 && s.dtb <= 8.0);
  res.json(filteredStudents);
});

// Lấy ra danh sách các sinh viên thuộc lớp MD18401 và có điểm trung bình lớn hơn 9
router.get('/filter/class-md18401', function(req, res, next) {
  const filteredStudents = students.filter(s => s.class === 'MD18401' && s.dtb > 9);
  res.json(filteredStudents);
});

// Sắp xếp danh sách sinh viên theo điểm trung bình
router.get('/sort/dtb', function(req, res, next) {
  const sortedStudents = [...students].sort((a, b) => b.dtb - a.dtb);
  res.json(sortedStudents);
});

// Tìm ra sinh viên có điểm trung bình cao nhất thuộc lớp MD18401
router.get('/top-student-md18401', function(req, res, next) {
  const topStudent = students
    .filter(s => s.class === 'MD18401')
    .reduce((max, student) => (student.dtb > max.dtb ? student : max), students[0]);
  res.json(topStudent);
});

module.exports = router;
