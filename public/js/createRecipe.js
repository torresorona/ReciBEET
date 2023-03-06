const createRecipeFormHandler = async (event) => {
event.preventDefault();

console.log("Form submitted");

const recipeName = document.querySelector('#inputRecipeName').value.trim();
const instructions = document.querySelector('#inputInstructionsTextArea').value.trim();
const ingredients = Array.from(document.querySelectorAll('.ingredient'))
        .map(input => input.value.trim());
console.log(ingredients)
ingredients = JSON.stringify(ingredients);
console.log(ingredients)

if (recipeName && instructions && ingredients) {
    const response = await fetch('/api/recipe/', {
    method: 'POST',
    body: JSON.stringify({ recipeName, instructions, ingredients }),
    headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
    document.location.replace('/profile');
    } else {
        console.log(response);
        alert(response.statusText);
    }
}
};

document
.querySelector('.create-form')
.addEventListener('submit', createRecipeFormHandler);


