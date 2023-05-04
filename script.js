const randomBtn = document.getElementById('random-btn');
const searchBtn = document.getElementById('search-btn');
const searchInput = document.getElementById('search-input');
const cocktailContainer = document.getElementById('cocktail-container');

const apiUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

const generateCocktail = () => {
  fetch(`${apiUrl}/random.php`)
    .then(response => response.json())
    .then(data => {
      const cocktail = data.drinks[0];
      renderCocktail(cocktail);
    })
    .catch(error => {
      console.error(error);
      alert('An error occurred while generating the cocktail recipe. Please try again later.');
    });
};

const searchCocktail = async () => {
  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    alert('Please enter a search term.');
    return;
  }
  try {
    const response = await fetch(`${apiUrl}/search.php?s=${searchTerm}`);
    const data = await response.json();
    if (data.drinks) {
      const cocktail = data.drinks[0];
      renderCocktail(cocktail);
    } else {
      alert('No cocktails found. Please try a different search term.');
    }
  } catch (error) {
    console.error(error);
    alert('An error occurred while searching for the cocktail recipe. Please try again later.');
  }
};

const renderCocktail = cocktail => {
  cocktailContainer.innerHTML = `
    <div class="cocktail-wrapper">
      <div class="cocktail-name">
        <h2>${cocktail.strDrink}</h2>
      </div>
      <div class="cocktail-photo">
        <img src="${cocktail.strDrinkThumb}" alt="${cocktail.strDrink}">
      </div>
      <div class="cocktail-info">
        <div class="cocktail-ingredients">
          <p><strong>Ingredients  &emsp; Amounts</strong></p>
          <ul>
            ${Object.keys(cocktail)
              .filter(key => key.startsWith('strIngredient') && cocktail[key])
              .map(key => `<li>${cocktail[key]} &emsp; ${cocktail['strMeasure'+key.slice(13)]}</li>`)
              .join('')
            }
          </ul>
        </div>
        <div class="cocktail-instructions">
          <p><strong>Instructions:</strong></p>
          <p>${cocktail.strInstructions}</p>
        </div>
      </div>
    </div>
  `;
};


randomBtn.addEventListener('click', generateCocktail);
searchBtn.addEventListener('click', searchCocktail);
