// Function to load the home page with a welcome message
function loadHome() {
    document.getElementById('content').innerHTML = '<h2>Welcome to My Recipe Book</h2><p>Explore and share your favorite recipes!</p>';
  }
  
  // Function to load the "Add a New Recipe" page
  function loadAddRecipe() {
    document.getElementById('content').innerHTML = '<h2>Add a New Recipe</h2><p>Your form to add a new recipe goes here.</p>';
  }
  
  // Function to load the "My Favorite Recipes" page
  function loadFavorites() {
    document.getElementById('content').innerHTML = '<h2>My Favorite Recipes</h2><p>Your favorite recipes will be displayed here.</p>';
  }
  
  // Arrays to store recipes and favorites
  let recipes = [];
  let favorites = [];
  
  // Function to load the home page with a list of recipes
  function loadHome() {
      // Creating a heading for the recipe list
      let recipeList = '<h2 class="title">Recipe List</h2>';
      
      // Checking if there are recipes available
      if (recipes.length > 0) {
          // Adding an unordered list to display recipes
          recipeList += '<ul>';
          // Iterating through each recipe and generating HTML for display
          recipes.forEach(recipe => {
              recipeList += `
                  <li class="list">
                      ${recipe.title} - 
                      <button onclick="addToFavorites(${recipe.id})" class="list-button">Add to Favorites</button> - 
                      <button onclick="removeRecipe(${recipe.id})">Remove</button>
                  </li>`;
          });
          recipeList += '</ul>';
      } else {
          // Displaying a message if no recipes are available
          recipeList += '<p>No recipes available. Add some recipes!</p>';
      }
  
      // Setting the innerHTML of the 'content' element to the generated recipe list
      document.getElementById('content').innerHTML = recipeList;
  }
  
  // Function to remove a recipe
  function removeRecipe(recipeId) {
      // Filtering out the recipe with the specified ID from both recipes and favorites arrays
      recipes = recipes.filter(recipe => recipe.id !== recipeId);
      favorites = favorites.filter(id => id !== recipeId);
  
      // Reloading the favorites and home pages to reflect the changes
      loadFavorites();
      loadHome();
  }
  
  // Function to load the "Add a New Recipe" page with a form
  function loadAddRecipe() {
      // Setting the innerHTML of the 'content' element to a form for adding a new recipe
      document.getElementById('content').innerHTML = `
          <h2 class="title">Add a New Recipe</h2>
          <form onsubmit="addRecipe(event)" class="add-form">
              <label for="recipeTitle">Title</label>
              <input type="text" id="recipeTitle" required class="input">
              
              <label for="recipeDiscription">Description</label>
              <textarea id="recipeDiscription" required ></textarea>
              
              <label for="recipeImage">Image URL</label>
              <input type="url" id="recipeImage" class="input">
              
              <button type="submit" class="sub-button">Add Recipe</button>
          </form>
      `;
  }
  
  // Function to add a new recipe
  function addRecipe(event) {
      // Preventing the default form submission behavior
      event.preventDefault();
      
      // Retrieving values from the form inputs
      const title = document.getElementById('recipeTitle').value;
      const Description = document.getElementById('recipeDiscription').value;
      const image = document.getElementById('recipeImage').value;
  
      // Creating a new recipe object
      const newRecipe = {
          id: recipes.length + 1,
          title,
          Description,
          image
      };
  
      // Adding the new recipe to the recipes array
      recipes.push(newRecipe);
  
      // Reloading the home page to display the updated recipe list
      loadHome();
  }
  
  // Function to load the "My Favorites" page with a list of favorite recipes
  function loadFavorites() {
      // Creating a heading for the favorites list
      let favoritesList = '<h2 class="title">My Favorites</h2>';
  
      // Checking if there are favorite recipes available
      if (favorites.length > 0) {
          // Adding a container to display favorite recipes
          favoritesList += '<div class="recipe-container">';
          // Iterating through each favorite recipe and generating HTML for display
          favorites.forEach(favoriteId => {
              // Finding the corresponding recipe using the favorite ID
              const recipe = recipes.find(r => r.id === favoriteId);
              favoritesList += `
                  <div class="recipe">
                      <h3>${recipe.title}</h3>
                      ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : ''}
                      <p>${recipe.Description}</p>
                      <button onclick="removeFromFavorites(${recipe.id})">Remove from Favorites</button>
                  </div>
              `;
          });
          favoritesList += '</div>';
      } else {
          // Displaying a message if no favorite recipes are available
          favoritesList += '<p>No favorite recipes yet. Add some favorites!</p>';
      }
  
      // Setting the innerHTML of the 'content' element to the generated favorites list
      document.getElementById('content').innerHTML = favoritesList;
  }
  
  // Function to add a recipe to favorites
  function addToFavorites(recipeId) {
      // Checking if the recipe ID is not already in the favorites array
      if (!favorites.includes(recipeId)) {
          // Adding the recipe ID to the favorites array
          favorites.push(recipeId);
      }
      // Reloading the home page to update the "Add to Favorites" button
      loadHome();
  }
  
  // Function to remove a recipe from favorites
  function removeFromFavorites(recipeId) {
      // Filtering out the recipe ID from the favorites array
      favorites = favorites.filter(id => id !== recipeId);
      // Reloading the favorites page to reflect the changes
      loadFavorites();
  }
  
  // Function to load the home page with a list of recipes, including "Add to Favorites" buttons
  function loadHome() {
      // Creating a heading for the recipe list
      let recipeList = '<h2 class="title">Recipe List</h2>';
      
      // Checking if there are recipes available
      if (recipes.length > 0) {
          // Adding a container to display recipes
          recipeList += '<div class="recipe-container">';
          // Iterating through each recipe and generating HTML for display
          recipes.forEach(recipe => {
              // Checking if the current recipe is in the favorites array
              const isFavorite = favorites.includes(recipe.id);
              recipeList += `
                  <div class="recipe">
                      <h3>${recipe.title}</h3>
                      ${recipe.image ? `<img src="${recipe.image}" alt="${recipe.title}">` : ''}
                      <p>${recipe.Description}</p>
                      <button onclick="toggleFavorites(${recipe.id})">${isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}</button>
                      <button onclick="removeRecipe(${recipe.id})">Remove</button>
                  </div>
              `;
          });
          recipeList += '</div>';
      } else {
          // Displaying a message if no recipes are available
          recipeList += '<p>No recipes available. Add some recipes!</p>';
      }
  
      // Setting the innerHTML of the 'content' element to the generated recipe list
      document.getElementById('content').innerHTML = recipeList;
  }
  
  // Function to toggle the status of a recipe in favorites
  function toggleFavorites(recipeId) {
      // Checking if the recipe ID is already in the favorites array
      if (favorites.includes(recipeId)) {
          // If it is, remove it from favorites
          removeFromFavorites(recipeId);
      } else {
          // If it's not, add it to favorites
          addToFavorites(recipeId);
      }
  }
  
  // Function to add a recipe to favorites (with a loadHome() call for updating button text)
  function addToFavorites(recipeId) {
      // Checking if the recipe ID is not already in the favorites array
      if (!favorites.includes(recipeId)) {
          // Adding the recipe ID to the favorites array
          favorites.push(recipeId);
          // Reloading the home page to update the "Add to Favorites" button text
          loadHome();
      }
  }
  