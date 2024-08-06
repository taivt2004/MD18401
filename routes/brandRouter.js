const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const checkToken = require('./checkToken')


/**
 * @swagger
 * /brands/all:
 *   get:
 *     summary: Lấy danh sách hãng
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Trả về danh sách hãng
 *       400: 
 *         description: Lỗi    
 */



// GET all brands
router.get('/all',checkToken, async (req, res) => {  
  try {
    const brands = await Brand.find();
    res.status(200).json({ status: true, brands });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});


/**
 * @swagger
 * /brands/add:
 *   post:
 *     summary: Thêm 1 hãng mới vào danh sách
 *     tags: [Brands]
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


// thêm hãng
router.post('/add', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newBrand = new Brand({ name, description });
    await newBrand.save();
    res.json({ status: true, brand: newBrand });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Lỗi máy chủ', error });
  }
});

module.exports = router;
