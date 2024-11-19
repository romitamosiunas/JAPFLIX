document.addEventListener("DOMContentLoaded", () => {
  let inputBuscar = document.getElementById("inputBuscar");
  let btnBuscar = document.getElementById("btnBuscar");
  let lista = document.getElementById("lista");
  let detallesPelicula = document.getElementById("detallesPelicula");
  let tituloDetalle = document.getElementById("tituloDetalle");
  let overviewDetalle = document.getElementById("overviewDetalle");
  let generosDetalle = document.getElementById("generosDetalle");
  let lanzamientoDetalle = document.getElementById("lanzamientoDetalle");
  let duracionDetalle = document.getElementById("duracionDetalle");
  let presupuestoDetalle = document.getElementById("presupuestoDetalle");
  let gananciasDetalle = document.getElementById("gananciasDetalle");
  let movies = [];

  // Cargar la información de las películas al cargar la página
  fetch("https://japceibal.github.io/japflix_api/movies-data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }
      return response.json();
    })
    .then((data) => {
      movies = data;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  // Generar estrellas
  function generateStars(voteAverage) {
    let totalStars = 5;
    let filledStars = Math.round((voteAverage / 10) * totalStars);
    let emptyStars = totalStars - filledStars;
    return "★".repeat(filledStars) + "☆".repeat(emptyStars);
  }

  // Mostrar detalles de una película
  function mostrarDetallesPelicula(movie) {
    tituloDetalle.textContent = movie.title;
    overviewDetalle.textContent = movie.overview;

    generosDetalle.innerHTML = "";
    movie.genres.forEach((genre) => {
      let li = document.createElement("li");
      li.textContent = genre.name; // Mostrar nombre del género
      generosDetalle.appendChild(li);
    });

    // Detalles adicionales
    lanzamientoDetalle.textContent = movie.release_date.split("-")[0]; // Año de lanzamiento
    duracionDetalle.textContent = movie.runtime || "No disponible";
    presupuestoDetalle.textContent = movie.budget?.toLocaleString() || "No disponible";
    gananciasDetalle.textContent = movie.revenue?.toLocaleString() || "No disponible";

    detallesPelicula.classList.remove("d-none");
  }

  // Buscar películas
  btnBuscar.addEventListener("click", () => {
    let query = inputBuscar.value.trim().toLowerCase();
    lista.innerHTML = "";

    if (!query) {
      alert("Por favor, ingresa un término de búsqueda.");
      return;
    }

    let filteredMovies = movies.filter((movie) =>
      [movie.title, movie.genres.map((g) => g.name).join(" "), movie.tagline, movie.overview]
        .some((field) => field?.toLowerCase().includes(query))
    );

    if (filteredMovies.length === 0) {
      lista.innerHTML = "<li class='list-group-item text-white bg-dark'>No se encontraron resultados.</li>";
      return;
    }

    filteredMovies.forEach((movie) => {
      let li = document.createElement("li");
      li.className = "list-group-item bg-dark text-white";
      li.innerHTML = `
        <h5>${movie.title}</h5>
        <p><em>${movie.tagline}</em></p>
        <p>Valoración: ${generateStars(movie.vote_average)}</p>
      `;
      li.addEventListener("click", () => mostrarDetallesPelicula(movie));
      lista.appendChild(li);
    });
  });
});


