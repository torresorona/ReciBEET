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
    console.log(newRecipe)
    res.status(200).json(newRecipe)
  } catch (err) {
    console.log(err);
  }
})

router.get("/findrecipe", withAuth, async (req, res) => {
  try {
    let passedIngredients = req.query.passedIngredients;
    console.log(passedIngredients);
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
    
    let foundRecipesIds = await axios.request(recipeByIngredient).then(function (response) {
      // console.log(response.data);
      return response.data
    })

    let recipesData = [];

    for (i = 0; i < foundRecipesIds.length; i++) {
      let recipe = foundRecipesIds[i];
      const findInfoFromId = {
        method: 'GET',
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipe.id}/information`,
        headers: {
          'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
          'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
        }
      }

      let recipeInfo = await axios.request(findInfoFromId).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.log(error);
      });
  
      let recipeTitle = recipeInfo.title;
      let recipeURL = recipeInfo.sourceUrl

      console.log(recipeTitle, recipeURL);

      recipesData.push({title: recipeTitle, url: recipeURL});

    };

    console.log(recipesData);

    res.json(recipesData);

  } catch (error) {
    console.log(req.body.joinedIngredients);
    console.log(error);
    res.statusText(error);
  }
})

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { recipe } = req.body;

  try {
    const updatedRecipe = await Recipe.update(recipe, { where: { id } });

    if (updatedRecipe[0] === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json({ message: 'Recipe updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to update recipe' });
  }
});


router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedRecipe = await Recipe.destroy({ where: { id } });

    if (deletedRecipe === 0) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    return res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Unable to delete recipe' });
  }
});

module.exports = router;