const Product = require('../../models/product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

exports.addProduct = async (req, res) => {
    try {
        const { name, title, price, image, details, category, brand } = req.body;
        const newProduct = new Product({ name, title, price, image, details, category, brand });
        await newProduct.save();
        res.json({ status: true, product: newProduct });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

exports.getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { brandId } = req.query;
    try {
        const query = brandId ? { category: categoryId, brand: brandId } : { category: categoryId };
        const products = await Product.find(query);
        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

exports.getProductsByBrand = async (req, res) => {
    try {
        const products = await Product.find({ brand: req.params.brandId });
        res.json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ status: false, message: 'Sản phẩm không tồn tại' });
        }
        res.json({ status: true, product });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};
