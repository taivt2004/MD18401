const express = require('express');
const router = express.Router();
const Cate = require('../models/CateBanhKeo');
const upload = require('../uploads/Upload');
const sendMail = require('../uploads/SendMail');
const fs = require('fs'); // Thêm dòng này

const nodemailer = require('nodemailer'); // Thêm dòng này

router.get('/', async (req, res) => {
  try {
    const cate = await Cate.find();
    res.json({ status: true, cate });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCate = new Cate({ name, description });
    await newCate.save();
    res.json({ status: true, category: newCate });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

router.post('/upload', [upload.single('image')], async (req, res, next) => {
  try {
    const { file } = req;
    if (!file) {
      return res.json({ status: 0, link: "" });
    } else {
      const url = `http://192.168.223.225:3007/images/${file.filename}`;
      return res.json({ status: 1, url: url });
    }
  } catch (error) {
    console.log('Upload image error: ', error);
    return res.json({ status: 0, link: "" });
  }
});

router.post('/uploads', [upload.array('image', 9)], async (req, res, next) => {
  try {
    const { files } = req;
    if (!files) {
      return res.json({ status: 0, link: [] });
    } else {
      const url = [];
      for (const singleFile of files) {
        url.push(`http://192.168.223.225:3007/images/${singleFile.filename}`);
      }
      return res.json({ status: 1, url: url });
    }
  } catch (error) {
    console.log('Upload image error: ', error);
    return res.json({ status: 0, link: [] });
  }
});
router.post('/send-email', async (req, res) => {
  const { to, subject } = req.body;

  // Tạo transporter
  let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'vtt2004abc@gmail.com',
          pass: 'lhqzinyrdbebnsyi'
      }
  });

  // Đọc nội dung tệp HTML
  let htmlContent = fs.readFileSync('email.html', 'utf-8');

  // Cấu hình email
  let mailOptions = {
      from: 'vtt2004abc@gmail.com',
      to: to,
      subject: subject,
      html: htmlContent
  };

  try {
      let info = await transporter.sendMail(mailOptions);
      console.log('Email đã được gửi: ' + info.response);
      res.status(200).send('Email đã được gửi'); 8
  } catch (error) {
      console.error('Lỗi khi gửi email: ' + error);
      res.status(500).send('Lỗi khi gửi email');
  }
});

module.exports = router;
