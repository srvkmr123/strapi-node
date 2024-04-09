var express = require('express');
var router = express.Router();
const authMiddleware = require('../auth-middleware/auth-middleware');
const { default: axios } = require('axios');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/v1/blogs',async (req,res)=>{
  console.log('hello');
  try {
    const config = {
      headers: { Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNzEyMjI3ODMzLCJleHAiOjE3MTQ4MTk4MzN9.Un8SPOoUqh5gGiVoh8wS8HlKXwjjNHHX8HdoHDDsOkU` }
  };
    const resp = await axios.get('http://localhost:1337/api/blogs',config );
    res.status(200);
    res.json(resp?.data?.data);
  } catch (error) {
    console.log(error);
    res.status(500).json({error})
  }
})

module.exports = router;
