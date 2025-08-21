const Product = require('../../models/product');
const Variant = require('../../models/variant');

// Lấy tất cả sản phẩm + populate variants
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate('variants'); // lấy luôn biến thể
        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

// Thêm sản phẩm mới
exports.addProduct = async (req, res) => {
    try {
        const { name, title, price, image, details, category, brand, variants } = req.body;

        // tạo product trước
        const newProduct = new Product({ name, title, price, image, details, category, brand });
        await newProduct.save();

        // nếu có variants kèm theo thì lưu và liên kết
        if (variants && variants.length > 0) {
            const newVariants = await Variant.insertMany(
                variants.map(v => ({ ...v, product: newProduct._id }))
            );

            // update lại product để trỏ variants
            newProduct.variants = newVariants.map(v => v._id);
            await newProduct.save();
        }

        res.json({ status: true, product: await newProduct.populate('variants') });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

// Lọc sản phẩm theo category (+ optional brand)
exports.getProductsByCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { brandId } = req.query;
    try {
        const query = brandId ? { category: categoryId, brand: brandId } : { category: categoryId };
        const products = await Product.find(query)
            .populate('variants');
        res.status(200).json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

// Lọc sản phẩm theo brand
exports.getProductsByBrand = async (req, res) => {
    try {
        const products = await Product.find({ brand: req.params.brandId })
            .populate('variants');
        res.json({ status: true, products });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};

// Lấy sản phẩm theo ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate('variants');
        if (!product) {
            return res.status(404).json({ status: false, message: 'Sản phẩm không tồn tại' });
        }
        res.json({ status: true, product });
    } catch (error) {
        res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
    }
};
