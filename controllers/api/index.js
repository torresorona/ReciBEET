const router = require('express').Router();
const userRoutes = require('./userRoutes');
const recipeRoutes = require('./recipeRoutes');
const spoonacularRoutes = require('./spoonacularRoutes');

router.use('/users', userRoutes);
router.use('/recipe', recipeRoutes);
router.use('/spoonacularRoutes', spoonacularRoutes);

module.exports = router;
