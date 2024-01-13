const router = require('express').Router();

const usersControllers = require('../controllers/users');

router.get('/', usersControllers.getAll);

router.get('/:id', usersControllers.getSingle);

module.exports = router;