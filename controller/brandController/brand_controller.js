const Brand = require('../../models/brand');

exports.getAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find();
        res.status(200).json({ status: true, brands });
    } catch (error) {
        console.error("Error fetching brands:", error.message);
        res.status(500).json({ status: false, message: 'Lỗi máy chủ' });
    }
}

exports.addBrand = async (req, res) => {
    const { name, description } = req.body;
    console.log('Request body:', req.body); // Kiểm tra dữ liệu nhận được
    try {
        const existingBrand = await Brand.findOne({ name });
        if (existingBrand) {
            return res.status(400).json({ status: false, message: 'Thương hiệu đã tồn tại' });
        }
        const newBrand = new Brand({ name, description });
        await newBrand.save();
        res.status(201).json({ status: true, brand: newBrand });
    } catch (error) {
        console.error("Error adding brand:", error.stack); // Log đầy đủ stack trace
        res.status(500).json({ status: false, message: 'Lỗi máy chủ' });
    }
};     