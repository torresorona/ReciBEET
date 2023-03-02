require('dotenv').config();
import axios from "axios";

const recipebyIngredientArray = [];
const jokeArray = [];


//get recipe by ingredient
//does this need to be a function? I think we'd be fine to leave it as a const
const recipeByIngredient = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  params: {
    //required param
    //I dont think I am targeting this right at all
    ingredients: `${findrecipe.field1}`,
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

axios.request(recipeByIngredient).then(function (response) {
  const instance = response.data
  recipebyIngredientArray.push(instance)
}).catch(function (error) {
  console.error(error);
});


//get random food joke
const getJoke = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/jokes/random',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(getJoke).then(function (response) {
  const instance = response.data

  jokeArray.push(instance)
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

//get random food trivia
const getFoodTrivia = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/trivia/random',
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(getFoodTrivia).then(function getTrivia(response) {
  const trivia = response.data.stringify()
	console.log(trivia);
}).catch(function (error) {
	console.error(error);
});

//should we export the arrays here?
module.exports = {recipebyIngredientArray, jokeArray, trivia}