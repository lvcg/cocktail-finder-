const searchTerm = document.querySelector('#searchTerm');
const searchButton = document.querySelector('#searchButton');
const cocktailsContainer = document.querySelector('#cocktails');
const darkModeButton = document.querySelector('#darkModeButton');

searchButton.addEventListener('click', async () => {
  const searchTermValue = searchTerm.value;
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTermValue}`);
  const data = await response.json();
  const cocktails = data.drinks;

  cocktailsContainer.innerHTML = '';

  if (!cocktails) {
    cocktailsContainer.innerHTML = '<h2>No cocktails found.</h2>';
    return;
  }

  cocktails.forEach(cocktail => {
    const cocktailEl = document.createElement('div');
    cocktailEl.classList.add('cocktail');

    const imgSrc = cocktail.strDrinkThumb;
    const title = cocktail.strDrink;
    const ingredients = [];

    for (let i = 1; i <= 15; i++) {
      const ingredient = cocktail[`strIngredient${i}`];
      const measure = cocktail[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(`${ingredient} - ${measure}`);
      }
    }

    cocktailEl.innerHTML = `
      <img src="${imgSrc}" alt="${title}">
      <h2>${title}</h2>
      <p>${ingredients.join(', ')}</p>
    `;

    cocktailsContainer.appendChild(cocktailEl);
  });
});

darkModeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
});

