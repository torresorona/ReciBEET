const saveBtn = document.querySelector(".save-button");

saveBtn.addEventListener('click', async () => {
    const recipeTitle = document.querySelector(".card-title").innerHTML;
    console.log(recipeTitle)

    const recipeId = saveBtn.dataset.recipeId;
    const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeToSave: {title: recipeTitle, url: `/recipe/${recipeId}`}}),
    };
    try {
    const response = await fetch('/api/users/save-recipe', requestOptions);
    const data = await response.json();
    console.log(data);
    } catch (error) {
    console.error(error);
    }
    });
