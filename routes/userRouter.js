const express = require('express');
const router = express.Router();
const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('../config');

// Chức năng đăng ký
router.post('/dangki', async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Kiểm tra email đã tồn tại chưa
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ status: false, message: 'Tài khoản đã tồn tại' });
        }
        user = new Users({
            username,
            password,
            email
        });

        // Băm (hash) mật khẩu
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Lưu người dùng vào db
        await user.save();
        res.status(201).json({ status: true, message: 'Đăng ký thành công' });

    } catch (error) {
        console.error("Error in /dangki route:", error.message);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
});

// Chức năng đăng nhập
router.post('/dangnhap', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Tài khoản không tồn tại' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = JWT.sign({ email: email, data: "ahihi" }, config.SECRETKEY, { expiresIn: "30s" });
            const refreshToken = JWT.sign({ email: email}, config.SECRETKEY, { expiresIn: "1d" });
            res.status(200).json({ status: true, message: 'Đăng nhập thành công', user, token: token , refreshToken: refreshToken});
        } else {
            return res.status(400).json({ status: false, message: 'Mật khẩu không đúng' });
        }

    } catch (error) {
        console.error("Error in /dangnhap route:", error.message);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
});

// Cập nhật thông tin người dùng mà không cần token
router.put('/capnhatprofile', async (req, res) => {
    const { email, username, address, avatar, phone, ho_ten } = req.body;

    try {
        // Tìm người dùng theo email
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: 'Người dùng không tồn tại' });
        }
        // Cập nhật thông tin người dùng
        user.username = username || user.username;
        user.address = address || user.address;
        user.avatar = avatar || user.avatar;
        user.phone = phone || user.phone;
        user.ho_ten = ho_ten || user.ho_ten;
        
        // Lưu lại thay đổi vào db
        await user.save();
        res.status(200).json({ status: true, message: 'Cập nhật thông tin thành công', user });

    } catch (error) {
        console.error("Error in /capnhatprofile route:", error.message);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
});


router.post('/refreshtoken', async function(req, res, next) {
    const {refreshToken} = req.body;


    JWT.verify(refreshToken, config.SECRETKEY, async function(err){
        if(err){
            res.status(401).json({err: err})
        }else{
            var newToken = JWT.sign({"data": "hihi"}, config.SECRETKEY, {expiresIn: '30s'})
            res.status(200).json({token: newToken})
        }
    })
})
module.exports = router;
