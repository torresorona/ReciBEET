const router = require('express').Router();
const { Recipe } = require('../../models');
const withAuth = require('../../utils/auth');

require('dotenv').config();
import axios from "axios";

//get recipes
const recipeSearch = {
  method: 'GET',
  url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
  params: {
    //~THIS IS A REQUIRED PARAMETERS ~ -K
    query: 'pasta',

    //~THESE ARE ALL OPTIONAL PARAMETERS ~ -K
    // cuisine: 'italian',
    // excludeCuisine: 'greek',
    diet: 'vegetarian',
    // intolerances: 'gluten',
    // equipment: 'pan',
    // includeIngredients: 'tomato,cheese',
    // excludeIngredients: 'eggs',
    type: 'main course',
    instructionsRequired: 'true',
    // fillIngredients: 'false',
    //ADDRECIPEINFORMATION : If set to true, you get more information about the recipes returned. This saves the calls to get recipe information.
    addRecipeInformation: 'false',
    // titleMatch: 'Crock Pot',
    // maxReadyTime: '20',
    ignorePantry: 'true',
    sort: 'popularity',
    sortDirection: 'asc',
    offset: '3',
    number: '10',
    //limitLicense: Whether the recipes should have an open license that allows for displaying with proper attribution.
    limitLicense: 'true',
    //Ranking: Whether to minimize missing ingredients (0), maximize used ingredients (1) first, or rank recipes by relevance (2).
    ranking: '2'
  },
  headers: {
    'X-RapidAPI-Key': `${process.env.RAPIDAPI_KEY}`,
    'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
  }
};

axios.request(recipeSearch).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

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