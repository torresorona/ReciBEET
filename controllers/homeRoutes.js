const router = require('express').Router();
const { Recipe, User } = require('../models');
const withAuth = require('../utils/auth');
const axios = require('axios');

/**
 * INTENTION: get 10 recipes (either top 10 or random)
 * ORIGINAL FUNCTION FOM PAST PROJECT: Get all projects 
 * CURRENTLY: gets all recipes
 */
router.get('/', async (req, res) => {
  try {
    // Get all Recipes and JOIN with user data
    const recipeData = await Recipe.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Serialize data so the template can read it
    const recipes = recipeData.map((Recipe) => Recipe.get({ plain: true }));
    
    const jokeOfDay = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random',
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    const triviaOfDay = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random',
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };

    axios.request(jokeOfDay).then(function(response) {
      const joke = response.data.text;
      axios.request(triviaOfDay).then(function(response){
        const trivia = response.data.text;
        res.render('homepage', { 
          recipes, 
          joke,
          trivia,
          logged_in: req.session.logged_in 
        });
      });
    });

    
    // Pass serialized data and session flag into template
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

/**
 * INTENTION: Opening a recipe page
 * ORIGINAL FUNCTION FROM PAST PROJECT: loaded an individual project using the project's ID (example: /project/3 loads a page with information about Project3)
 */
router.get('/recipe/:id', async (req, res) => {
  try {
    const recipeData = await Recipe.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const recipe = recipeData.get({ plain: true });
    
    res.render('recipe',{
      ...recipe,
      logged_in: req.session.logged_in
    })

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
/**
 * INTENTION: Loading a profile with the data: (passing along personal recipes to handlebars)
 * ORIGINAL FUNCTION FROM PREVIOUS PROJECT: load a user's profile based on their user id
 * Note: withAuth is a helper function that does not need to be changed. 
 */
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Recipe }],
    });

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('profile', {
      ...user,
      createdrecipes: user.recipes,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

/**
 * UNEDITED: login screen that will redirect to profile if the user is already logged in
 * While the link would be obselete, on the off chance that someone manually types in the route in the bar, we should keep it just in case
 */
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

/**
 * Pretty much just the same as the login route. 
 * NOTE: If you are looking at the mini project, they include the sign up form on the same page as the login, which is why you don't see a route for it
 * We need this route to render a seperate page. This is what our last challenge implied we do too.
 */
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
      res.redirect('/profile'); 
      return;
    }
  
  res.render('signup');
});

/**
 * Rendering the createRecipe page, passing the logged_in variable so the user will stay logged in
 */
router.get("/createRecipe", withAuth, (req, res) => {
  res.render("create", {
    logged_in: req.session.logged_in
  });
})

/**
 * load findRecipe page
 */
router.get("/findRecipe", withAuth, (req, res) => {
  if (req.query.data) {
    console.log(req.query.data);
    res.render('findrecipe',{
      recipes: req.query.data,
      logged_in: req.session.logged_in
    });
    
  } else {
    res.render('findrecipe',{
      logged_in: req.session.logged_in
    });

  }
})


module.exports = router;