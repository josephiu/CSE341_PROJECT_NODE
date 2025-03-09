const router  = require('express').Router();


router.get('/', (req, res) => {
    res.send("helloworld");
});

router.use('/users', require('./users'));


module.exports = router

