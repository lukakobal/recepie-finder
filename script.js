const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const results = document.getElementById("results");

searchBtn.addEventListener("click", async () => {
  const query = searchInput.value.trim();

  if (!query) {
    results.textContent = "Please write a recipe";
    return;
  }

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
        query
      )}`
    );
    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    if (!data.meals) {
      results.innerHTML = "<p>No recipes found. Try another search.</p>";
      return;
    }

    // Tukaj je zdaj innerHTML namesto textContent
    results.innerHTML = data.meals
      .map(
        (meal) => `
          <div class="meal">
            <h2>${meal.strMeal}</h2>
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
            <p><a href="${
              meal.strSource || meal.strYoutube
            }" target="_blank">View full recipe video</a></p>
            <p class="instructions">Recipe: ${meal.strInstructions}</p>
          </div>
        `
      )
      .join("");
  } catch (error) {
    results.innerHTML = `<p>Error: ${error.message}</p>`;
  }
});
