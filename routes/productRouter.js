const express = require('express');
const router = express.Router();
const productController = require('../controller/productController/product_controller');
const checkToken = require('./token/checkToken');
/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API quản lý sản phẩm
 */

/**
 * @swagger
 * /products/all:
 *   get:
 *     summary: Lấy thông tin tất cả sản phẩm
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/all', checkToken, productController.getAllProducts);

/**
 * @swagger
 * /products/add:
 *   post:
 *     summary: Thêm sản phẩm mới vào danh sách sản phẩm
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Thêm thành công
 *       500:
 *         description: Lỗi máy chủ
 */
router.post('/add', productController.addProduct);

/**
 * @swagger
 * /products/byCategory/{categoryId}:
 *   get:
 *     summary: Lấy danh sách sản phẩm theo loại (có thể lọc thêm theo brandId)
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID danh mục sản phẩm
 *       - in: query
 *         name: brandId
 *         schema:
 *           type: string
 *         description: ID hãng (nếu muốn lọc thêm)
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm theo loại
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/byCategory/:categoryId', productController.getProductsByCategory);

/**
 * @swagger
 * /products/byBrand/{brandId}:
 *   get:
 *     summary: Lấy sản phẩm theo hãng
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: brandId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID hãng sản phẩm
 *     responses:
 *       200:
 *         description: Trả về danh sách sản phẩm theo hãng
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/byBrand/:brandId', productController.getProductsByBrand);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Lấy chi tiết sản phẩm theo ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID sản phẩm
 *     responses:
 *       200:
 *         description: Thông tin chi tiết sản phẩm
 *       404:
 *         description: Sản phẩm không tồn tại
 *       500:
 *         description: Lỗi máy chủ
 */
router.get('/:id', productController.getProductById);

module.exports = router;
