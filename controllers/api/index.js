const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const spoonacularRoutes = require('./spoonacular')

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/ingredientsearch', spoonacularRoutes)

module.exports = router;
