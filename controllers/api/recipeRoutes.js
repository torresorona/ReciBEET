const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  try {
    const newRecipe = await Recipe.create({
      ...req.body,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.log(err);
  }
})

router.get("/findrecipe", withAuth, (req, res) => {
  try {
    //API CALL
    console.log(req.body);
    let passedIngredients = req.body;

    const recipeByIngredient = {
      method: 'GET',
      url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
      params: {
        //required param
        //I dont think I am targeting this right at all
        ingredients: `${passedIngredients}`,
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
      //parse data to get it into a variable
      console.log(response);
      // const instance = JSON.parse({response});
      //set it to an array
      var recipeByIngredientArray = [];
    
      response.forEach(function(recipe) {
        //push each instance into the array
        recipeByIngredientArray.push(findRecipe(recipe.id));
      });
      return recipeByIngredient.all(recipeByIngredientArray)
        
    })
      // returns recipes with passed ingredients
    // Response
    res.render('findrecipe', {
      foundRecipes
    })
  } catch (error) {
    console.log(error);
  }
})

module.exports = router;