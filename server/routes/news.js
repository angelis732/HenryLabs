const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const News = require('../modelsMongoDB/News')
const Booms = require("../modelsMongoDB/Booms");


router.get('/allNewsAndBooms', async (req, res) => {

  const news = await News.find()
                 .limit(10)
                 .sort({createdAt: -1})
  const booms = await Booms.find()
                      .limit(10)
                      .sort({createdAt: -1})
  res.json({news: [...news, ...booms]})

})

router.get('/list' , (req, res) => {
  News.find()
  .limit(50)
  .sort({createdAt: -1})
  .then(response => res.json(response))
})

router.post('/post' , (req, res) => {
  const { title, type, link, description, image, createdAt } = req.body
  News.create({
    title: title,
    type: type,
    link: link,
    description: description,
    image: image,
    createdAt: createdAt
  })
  .then(response => res.json(response))
})

router.get('/list/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const notice = await News.findById(id)
    res.json(notice)
  } catch (e) {
    res.status(500).send({
      message: 'error'
    });
    next(e);
  }
})

router.delete('/list/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const notice = await News.deleteOne({"_id": ObjectId(id)})
    res.json(notice)
  } catch (e) {
    res.status(500).send({
      message: 'error'
    });
    next(e);
  }
})



module.exports = router