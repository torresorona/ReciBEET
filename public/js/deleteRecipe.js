const deleteButtons = document.querySelectorAll('.delete-recipe-btn');

  deleteButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const recipeId = button.dataset.recipeId;

      try {
        const response = await fetch(`/api/recipe/${recipeId}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          // Reload the page or update the UI to reflect the deletion
          location.reload();
        } else {
          const error = await response.json();
          console.error(error);
        }
      } catch (error) {
        console.log(error);
      }
    });
  });