require('dotenv').config();
import axios from "axios";

//get recipe by ingredient
const recipeByIngredient = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients',
  params: {
    //required param
    ingredients: 'apples,flour,sugar',
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
	console.log(response.data);
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

axios.request(getFoodTrivia).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

