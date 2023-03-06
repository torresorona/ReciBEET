const saveBtn = document.querySelector(".save-button");

saveBtn.addEventListener('click', async () => {
  const recipeId = saveBtn.dataset.recipeId;
  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipeToSave: {titlerecipeId }),
  };
  try {
    const response = await fetch('/api/users/saverecipe', requestOptions);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
})
