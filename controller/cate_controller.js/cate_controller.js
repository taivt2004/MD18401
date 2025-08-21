const Category = require('../../models/category');

exports.getAllCates = async (req, res) => {
    try {
        const cate = await Category.find();
        res.status(200).json({ status: true, cate });
    } catch (error) {
        console.error("Error fetching cate:", error.message);
        res.status(500).json({ status: false, message: 'Lỗi máy chủ' });
    }
}

exports.addCate = async (req, res) => {
    const { name, description } = req.body;
    console.log('Request body:', req.body); // Kiểm tra dữ liệu nhận được
    try {
        console.log('Checking existing cate with name:', name);
        const existingCate = await Category.findOne({ name });
        console.log('FindOne completed:', existingCate);
        if (existingCate) {
            return res.status(400).json({ status: false, message: 'Danh muc đã tồn tại' });
        }
        const newCate = new Category({ name, description });
        await newCate.save();
        res.status(201).json({ status: true, cate: newCate });
    } catch (error) {
        console.error("Error adding cate:", error.stack); // Log đầy đủ stack trace
        res.status(500).json({ status: false, message: 'Lỗi máy chủ' });
    }
};     