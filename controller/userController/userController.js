const Users = require('../../models/user');
const bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const config = require('../../config');

// Đăng ký
exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        let user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ status: false, message: 'Tài khoản đã tồn tại' });
        }

        user = new Users({ username, password, email });

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.status(201).json({ status: true, message: 'Đăng ký thành công' });
    } catch (error) {
        console.error("Error in register:", error.message);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
};

// Đăng nhập
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(400).json({ status: false, message: 'Tài khoản không tồn tại' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = JWT.sign({ email: email }, config.SECRETKEY, { expiresIn: "30s" });
            const refreshToken = JWT.sign({ email: email }, config.SECRETKEY, { expiresIn: "1d" });

            res.status(200).json({
                status: true,
                message: 'Đăng nhập thành công',
                user,
                token,
                refreshToken
            });
        } else {
            return res.status(400).json({ status: false, message: 'Mật khẩu không đúng' });
        }
    } catch (error) {
        console.error("Error in login:", error.message);
        res.status(500).json({ status: false, message: "Lỗi server" });
    }
};

// Cập nhật profile
exports.updateProfile = async (req, res) => {
    const { email, username, address, avatar, phone, fullName } = req.body;

    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: false, message: 'Người dùng không tồn tại' });
        }

        user.username = username || user.username;
        user.address = address || user.address;
        user.avatar = avatar || user.avatar;
        user.phone = phone || user.phone;
        user.fullName = fullName || user.fullName;

        await user.save();
        res.status(200).json({ status: true, message: 'Cập nhật thông tin thành công', user });
    } catch (error) {
        console.error("Error in updateProfile:", error.message);
        res.status(500).json({ status: false, message: 'Lỗi server' });
    }
};

// Refresh Token
exports.refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    JWT.verify(refreshToken, config.SECRETKEY, (err) => {
        if (err) {
            return res.status(401).json({ status: false, err });
        } else {
            const newToken = JWT.sign({ data: "hihi" }, config.SECRETKEY, { expiresIn: '30s' });
            return res.status(200).json({ status: true, token: newToken });
        }
    });
};
