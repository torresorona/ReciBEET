const updateRecipeFormHandler = async (event) => {
    event.preventDefault();

    console.log("Update Form submitted");

    const recipeName = document.querySelector('#inputRecipeName').value.trim();
    const instructions = document.querySelector('#inputInstructionsTextArea').value.trim();
    let ingredients = Array.from(document.querySelectorAll('.ingredient'))
            .map(input => input.value.trim());

    console.log(ingredients)

    ingredients = JSON.stringify(ingredients);

    console.log(ingredients)

    const recipeId = event.target.dataset.recipeId;
    const recipe = JSON.stringify({ recipeName, instructions, ingredients })

    console.log(recipe)

    if (recipeName && instructions && ingredients) {
        const response = await fetch(`/api/recipe/${recipeId}`, {
        method: 'PUT',
        body: recipe,
        headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
        document.location.replace(`/recipe/${recipeId}`);
        } else {
            console.log(response);
            alert(response.statusText);
        }
    }
};

document
.querySelector('.update-form')
.addEventListener('submit', updateRecipeFormHandler);