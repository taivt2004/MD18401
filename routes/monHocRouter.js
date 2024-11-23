const express = require('express');
const router = express.Router();
const upload = require('../uploads/UploadFile');

var de_thi = [
    {'id': 1, 'code': 'mamona', 'link': 'link a', 'date': new Date('2024-08-06')},
    {'id': 2, 'code': 'mamonb', 'link': 'link b', 'date': new Date('2024-08-07')},
    {'id': 3, 'code': 'mamonc', 'link': 'link c', 'date': new Date('2024-08-08')},
    {'id': 4, 'code': 'mamond', 'link': 'link d', 'date': new Date('2024-08-09')},
    {'id': 5, 'code': 'mamone', 'link': 'link e', 'date': new Date('2024-08-10')},
];


router.get('/all', function(req, res){
    res.status(200).json(de_thi);
});

// Lấy danh sách đề thi theo mã môn học người dùng truyền vào 
router.get('/byID/:code', function(req, res){
    var code = req.params.code;
    const dethi = de_thi.find(item => item.code === code);
    if (dethi) {
        res.status(200).json(dethi);
    } else {
        res.status(404).json({ message: 'Không tìm thấy đề thi với mã này' });
    }
});

router.post('/update', function(req, res){
    const { id, code, link } = req.body;

    let dethi = de_thi.find(item => item.id === id);
    if (dethi) {
        dethi.code = code || dethi.code;
        dethi.link = link || dethi.link;
        res.status(200).json({ message: 'Cập nhật thành công' });
    } else {
        res.status(404).json({ message: 'Không tìm thấy đề thi với id này' });
    }
});

router.post('/upload', upload.single('file'), function (req, res) {
    res.status(200).json({ message: 'File uploaded successfully', path: `/public/file/${req.file.filename}` });
});


router.get('/listAll', function (req, res) {
    // Sắp xếp mảng de_thi theo ngày ban hành giảm dần
    const sortedDeThi = de_thi.slice().sort((a, b) => b.date - a.date);

    res.status(200).json(sortedDeThi);
});

module.exports = router;
