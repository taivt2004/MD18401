const express = require('express');
const router = express.Router();
const GiaoThong = require('../models/ThiModel');


router.post('/add', async (req, res) => {
    try {
        const { licenseplate, information, status } = req.body;
        
        
        if (!licenseplate) {
            return res.status(400).json({status: false, message: "Biển số xe là bắt buộc"});
        }
        
        if (!information) {
            return res.status(400).json({status: false, message: 'Thông tin phạt nguội là bắt buộc'});
        }
        
       
        const addData = new GiaoThong({
            licenseplate,
            information,
            status: status || 0 
        });
        
        await addData.save();
        res.status(200).json({status: true, message: 'Thêm thành công', data: addData});
    } catch (error) {
        res.status(500).json({status: false, message: 'Có lỗi xảy ra', error: error.message});
    }
});

router.get('/list/0', async (req, res) => {
    try {
        
        const chuaXuly = await GiaoThong.find({ status: 0 });
        res.status(200).json({ status: true, list: chuaXuly });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
});

router.get('/all', async(req, res) =>{
    try {
        const list = await GiaoThong.find();
        res.status(200).json({ status: true, list });
      } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
      }
})





module.exports = router;