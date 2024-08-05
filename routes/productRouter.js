const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const checkToken = require('./checkToken');



/**
 * @swagger
 *  /products/all:
 *    get:
 *      summary: Lấy thông tin tất cả sản phẩm
 *      tags: [Products]
 *      responses:
 *        200:
 *          description: Trả về danh sách sản phẩm 
 *        400:
 *          description: Lỗi
 */

// Lấy thông tin sản phẩm
// https://md18401-api.onrender.com/products/all
router.get('/all', checkToken, async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ status: true, products });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});


/**
 * @swagger 
 *  /products/add:
 *    post:
 *      summary: Thêm sản phẩm mới vào danh sách sản phẩm
 *      tags: [Products]
 *      requestBody:
 *        required: true
 *        content: 
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  description: Tên sản phẩm
 *                title:
 *                  type: string
 *                  description: Tiêu đề sản phẩm
 *                price:
 *                  type: number
 *                  description: Giá sản phẩm
 *                image:
 *                  type: string
 *                  description: URL ảnh của sản phẩm
 *                chi_tiet_sp:
 *                  type: object
 *                  properties:
 *                    man_hinh:
 *                      type: string
 *                      description: Màn hình của sản phẩm
 *                    anh_chi_tiet_sp:
 *                      type: array
 *                      items:
 *                        type: string
 *                      description: Danh sách URL ảnh chi tiết của sản phẩm
 *                    he_dieu_hanh:
 *                      type: string
 *                      description: Hệ điều hành của sản phẩm
 *                    dung_luong_Gia:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          ram:
 *                            type: string
 *                            description: Dung lượng RAM
 *                          luu_tru:
 *                            type: string
 *                            description: Dung lượng lưu trữ
 *                          gia:
 *                            type: number
 *                            description: Giá tương ứng với dung lượng
 *                      description: Danh sách dung lượng và giá
 *                    mau_sac:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          ma:
 *                            type: string
 *                            description: Mã màu
 *                          ten:
 *                            type: string
 *                            description: Tên màu
 *                          anh:
 *                            type: string
 *                            description: URL ảnh của màu
 *                      description: Danh sách màu sắc
 *                    chip:
 *                      type: string
 *                      description: Chip của sản phẩm
 *                    pin:
 *                      type: string
 *                      description: Pin của sản phẩm
 *                    hang:
 *                      type: string
 *                      description: Hãng của sản phẩm
 *                    camera:
 *                      type: array
 *                      items:
 *                        type: object
 *                        properties:
 *                          camera_truoc:
 *                            type: string
 *                            description: Camera trước
 *                          camera_sau:
 *                            type: string
 *                            description: Camera sau
 *                      description: Danh sách camera của sản phẩm
 *                category:
 *                  type: string
 *                  description: ID danh mục của sản phẩm
 *                brand:
 *                  type: string
 *                  description: ID hãng của sản phẩm
 *      responses:
 *        200:
 *          description: Thêm thành công
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  status:
 *                    type: boolean
 *                  product:
 *                    type: object
 *                    properties:
 *                      _id:
 *                        type: string
 *                      name:
 *                        type: string
 *                      title:
 *                        type: string
 *                      price:
 *                        type: number
 *                      image:
 *                        type: string
 *                      chi_tiet_sp:
 *                        type: object
 *                        properties:
 *                          man_hinh:
 *                            type: string
 *                          anh_chi_tiet_sp:
 *                            type: array
 *                            items:
 *                              type: string
 *                          he_dieu_hanh:
 *                            type: string
 *                          dung_luong_Gia:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                ram:
 *                                  type: string
 *                                luu_tru:
 *                                  type: string
 *                                gia:
 *                                  type: number
 *                          mau_sac:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                ma:
 *                                  type: string
 *                                ten:
 *                                  type: string
 *                                anh:
 *                                  type: string
 *                          chip:
 *                            type: string
 *                          pin:
 *                            type: string
 *                          hang:
 *                            type: string
 *                          camera:
 *                            type: array
 *                            items:
 *                              type: object
 *                              properties:
 *                                camera_truoc:
 *                                  type: string
 *                                camera_sau:
 *                                  type: string
 *                      category:
 *                        type: string
 *                      brand:
 *                        type: string
 *        500:
 *          description: Lỗi máy chủ
 */


// Tạo product mới
// http://192.168.176.225:3007/products/add
router.post('/add', async (req, res) => {
  try {
    const { name, title, price, image, chi_tiet_sp, category, brand } = req.body;
    const newProduct = new Product({ name, title, price, image, chi_tiet_sp, category, brand });
    await newProduct.save();
    res.json({ status: true, product: newProduct });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// Lấy thông tin sản phẩm theo id loại
router.get('/byCategory/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const { brandId } = req.query; // Lấy brandId từ query params nếu có
  try {
    let products;
    if (brandId) {
      products = await Product.find({ category: categoryId, brand: brandId });
    } else {
      products = await Product.find({ category: categoryId });
    }
    res.status(200).json({ status: true, products });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// Lấy sản phẩm theo id hãng
router.get('/byBrand/:brandId', async (req, res) => {
  try {
    const products = await Product.find({ brand: req.params.brandId });
    res.json({ status: true, products });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

// Lấy sản phẩm theo id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: false, message: 'Sản phẩm không tồn tại' });
    }
    res.json({ status: true, product });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

module.exports = router;
