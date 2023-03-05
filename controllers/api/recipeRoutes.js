const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');
const axios = require("axios");

router.post('/', withAuth, async (req, res) => {
  try {
    console.log(req.body);

    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newRecipe)
  } catch (err) {
    console.log(err);
  }
})

router.post("/findrecipe", withAuth, (req, res) => {
  let passedIngredients = req.body.joinedIngredients;
  try {
    //API CALL
    const recipeByIngredient = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        //required param
        //I dont think I am targeting this right at all
        ingredients: passedIngredients,
        //optional params
        //Number: The maximal number of recipes to return (default = 5).
        number: '5',
        //ignorePantry: Whether to ignore pantry ingredients such as water, salt, flour etc..
        ignorePantry: 'true',
        ranking: '1'
      },
      headers: {
        'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
        'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
      }
    };
    
    let foundRecipes = axios.request(recipeByIngredient).then(function (response) {
      //console.log(response.data);
      //parse data to get it into a variable
      //set it to an array
      var recipeByIngredientArray = [];
      
      response.data.forEach(function(recipe) {
        const options = {
          method: 'GET',
          url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/information`,
          headers: {
            'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
            'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
          }
        };
        
        axios.request(options).then(function (response) {
         //console.log(response.data);
        }).catch(function (error) {
          console.log(error);
        });
      });
        
    })
      // returns recipes with passed ingredients
    // Response
    console.log(foundRecipes);
    res.render('findrecipe', {
      foundRecipes
    })
  } catch (error) {
    console.log(req.body.joinedIngredients);
    console.log(error);
  }
})

module.exports = router;