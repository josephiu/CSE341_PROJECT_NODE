const router  = require('express').Router();

router.use('/', require('./swagger'));


router.get('/', (req, res) => {
    //#swagger.tags = ['Hellow world']
    res.send('helloworld');
});

router.use('/users', require('./users'));

router.use('/contacts', require('./contacts'));


module.exports = router

