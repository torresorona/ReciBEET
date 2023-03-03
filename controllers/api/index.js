const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const spoonacularRoutes = require('../../public/js/spoonacular')

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);

module.exports = router;
