// File routes/categories.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');
//ASM


/**
 * @swagger
 *  /categories/all:
 *    get:
 *      summary: Lấy danh mục sản phẩm
 *      tags: [Category]
 *      responses: 
 *        200:
 *          description: Trả về danh sách sản phẩm
 *        500:
 *          description: Lỗi máy chủ 
 */
// lay thong tin danh muc
router.get('/all', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ status: true, categories });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});


/**
 * @swagger
 * /categories/add:
 *   post:
 *     summary: Thêm 1 hãng mới vào danh sách
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Thêm thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 brand:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     description:
 *                       type: string
 *       500:
 *         description: Lỗi máy chủ
 */


// Them hang moi
router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.json({ status: true, category: newCategory });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

module.exports = router;
