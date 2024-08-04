const nodemailer = require('nodemailer');
const fs = require('fs');

async function sendEmail() {
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
        from: 'vtt2004abc@gmail.com',  // Địa chỉ email của bạn
        to: 'taivtps36752@fpt.edu.vn', // Địa chỉ email của người nhận
        subject: 'Chào mừng bạn đến với dịch vụ của chúng tôi!',
        html: htmlContent
    };

    // Gửi email
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email đã được gửi: ' + info.response);
    } catch (error) {
        console.error('Lỗi khi gửi email: ' + error);
    }
}

sendEmail();