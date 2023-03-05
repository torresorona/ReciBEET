const createRecipeFormHandler = async (event) => {
event.preventDefault();

const recipeName = document.querySelector('#inputRecipeName').value.trim();
const instructions = document.querySelector('#inputInstructionsTextArea').value.trim();
const ingredients = document.querySelector('#inputIngredients').value.trim();

if (recipeName && instructions && ingredients) {
    const response = await fetch('/api/recipeRoutes', {
    method: 'POST',
    body: JSON.stringify({ recipeName, instructions, ingredients }),
    headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    document.location.replace('/recipe');
    } else {
    alert(response.statusText);
    }
}
};

document
.querySelector('.create-form')
.addEventListener('submit', createRecipeFormHandler);


