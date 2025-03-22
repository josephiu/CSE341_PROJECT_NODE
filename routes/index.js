const router  = require('express').Router();

router.use('/', require('./swagger'));


router.get('/', (req, res) => {
    //#swagger.tags = ['Hellow world']
    res.send('helloworld');
});

// router.use('/users', require('./users'));

// router.use('/contacts', require('./contacts'));

router.use('/cars', require('./cars'));

router.use('/guitermakers', require('./guitermakers'));

module.exports = router

