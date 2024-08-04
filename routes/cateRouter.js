const express = require('express');
const router = express.Router();
const Product = require('../models/modelBanhKeo'); 

/*
$lt: nhỏ hơn 
$gte: lớn hơn hoặc bằng 
$lte: nhỏ hơn hoặc bằng 
$eq: bằng 
$ne: không bằng 
*/
// Thêm phương thức POST để thêm sản phẩm
router.post('/add', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ status: true, message: 'Thêm sản phẩm thành công', product: newProduct });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 1. Lấy thông tin tất cả các sản phẩm
router.get('/all', async (req, res) => {
  try {
    const products = await Product.find({}); //Tìm tất cả sản phẩm trong cơ sở dữ liệu.
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 2. Lấy thông tin sản phẩm theo ID
router.get('/ctsp/:id', async (req, res) => {
  var id = req.params.id;
  try {
    const product = await Product.findById({_id:id}); //Tìm sản phẩm theo ID từ request params.
    res.json(product);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 3. Lấy tên và giá của tất cả các sản phẩm
router.get('/get/name_price', async (req, res) => {
  try {
    const products = await Product.find({}, 'name price'); //Tìm tất cả sản phẩm và chỉ lấy trường 'name' và 'price'.
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 4. Lấy thông tin các sản phẩm có giá trên 1000
router.get('/get/gia_tren_1000', async (req, res) => {
  try {
    const products = await Product.find({ price: { $gt: 1000 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 5. Lấy thông tin các sản phẩm thuộc loại 'Bánh'
router.get('/category/banh', async (req, res) => {
  try {

    const products = await Product.find().populate('category').exec();

    
    const banhProducts = products.filter(product => product.category.name === 'Bánh');

    res.json(banhProducts);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});
// 5.1 Lấy thông tin các sản phẩm thuộc loại 'Kẹo'
router.get('/category/keo', async(req, res)=>{
  try {
      const products = await Product.find().populate('category').exec();
      const keoProducts = products.filter(products => products.category.name === 'Kẹo')
      res.json(keoProducts)
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
})


// 6. Đếm số lượng sản phẩm trong mỗi loại
router.get('/dem/so_luong', async (req, res) => {
  try {
    const counts = await Product.aggregate([ //Sử dụng aggregate để nhóm sản phẩm theo loại và đếm số lượng.
      { $group: { _id: "$category", count: { $sum: 1 } } } 
    ]);
    res.json(counts);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 7. Lấy thông tin sản phẩm có số lượng ít hơn 10
router.get('/get/so_luong/it-hon-10', async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $lt: 10 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 8. Cập nhật giá của sản phẩm theo ID
router.put('/update-gia/:id', async (req, res) => {
  try {
    const { price } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.price = price;
      await product.save();
      res.json({ status: true, message: 'Cập nhật thành công', product });
    } else {
      res.status(404).json({ status: false, message: 'Không tìm thấy sản phẩm' });
    }
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 9. Xóa sản phẩm theo ID
router.delete('/delete/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ status: true, message: 'Xóa thành công' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 10. Lấy các sản phẩm có giá trong khoảng từ 500 đến 1500
router.get('/get_gia_tu/500-1500', async (req, res) => {
  try {
    const products = await Product.find({ price: { $gte: 500, $lte: 1500 } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 11. Lấy tên và số lượng của các sản phẩm có số lượng lớn hơn 20
router.get('/so_luong/lon-hon-20', async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 20 } }, 'name quantity');
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 12. Lấy các sản phẩm có tên chứa từ khóa 'oreo'
router.get('/name/key-oreo', async (req, res) => {
  try {
    const products = await Product.find({ name: { $regex: 'oreo', $options: 'i' } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 13. Lấy thông tin sản phẩm đắt nhất
router.get('/get/sp-dat-nhat', async (req, res) => {
  try {
    const product = await Product.findOne().sort({ price: -1 });
    res.json(product);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 14. Lấy thông tin sản phẩm rẻ nhất
router.get('/get/sp-re-nhat', async (req, res) => {
  try {
    const product = await Product.findOne().sort({ price: 1 });
    res.json(product);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 15. Lấy giá trung bình của các sản phẩm
router.get('/get/gia-trung-binh_tat-ca-sp', async (req, res) => {
  try {
    const avgPrice = await Product.aggregate([
      { $group: { _id: null, gia_trung_binh: { $avg: '$price' } } }
    ]);
    res.json(avgPrice);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// 16. Tính tổng giá trị của tất cả các sản phẩm (số lượng * giá)
router.get('/tinh/tong-tien', async (req, res) => {
  try {
    const totalValue = await Product.aggregate([
      { $group: { _id: "", tong_tien: { $sum: { $multiply: ["$price", "$quantity"] } } } }
    ]);
    res.json(totalValue);
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

module.exports = router;
