const router = require('express').Router();
// const { Recipe, User } = require('../models');
// const withAuth = require('../utils/auth');

// /**
//  * INTENTION: get 10 recipes (either top 10 or random)
//  * ORIGINAL FUNCTION FOM PAST PROJECT: Get all projects 
//  * CURRENTLY: gets all recipes
//  */
// router.get('/', async (req, res) => {
//   try {
//     // Get all Recipes and JOIN with user data
//     const recipeData = await Recipe.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const recipes = recipeData.map((Recipe) => Recipe.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       recipes, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// /**
//  * INTENTION: Opening a recipe page??
//  * ORIGINAL FUNCTION FROM PAST PROJECT: loaded an individual project using the project's ID (example: /project/3 loads a page with information about Project3)
//  */
// router.get('/recipe/:id', async (req, res) => {
//   try {
//     const RecipeData = await Recipe.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const recipe = recipeData.get({ plain: true });

//     res.render('Recipe', {
//       ...recipe,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// /**
//  * INTENTION: Loading a profile with the data: (passing along personal recipes to handlebars)
//  * ORIGINAL FUNCTION FROM PREVIOUS PROJECT: load a user's profile based on their user id
//  * Note: withAuth is a helper function that does not need to be changed. 
//  */
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Recipe }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// /**
//  * UNEDITED: login screen that will redirect to profile if the user is already logged in
//  * While the link would be obselete... 
//  */
// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

module.exports = router;