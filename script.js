document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("peliculaForm");
  const tableBody = document
    .getElementById("peliculasTable")
    .querySelector("tbody");
  let isUpdating = false;

  //async permite que la función se comporte de manera asíncrona,
  //puede ejecutar operaciones sin bloquear el hilo principal de ejecucion
  const fetchPeliculas = async () => {
    //luego cambiaremos la url por https://<hostdepanywhere>/productos
    const response = await fetch(
      "https://milepeletay13gg.pythonanywhere.com/peliculas"
    ); // promesa: esperar a que se complete la solicitud HTTP
    const productos = await response.json(); //esperar a que se complete la conversión de la respuesta a JSON
    tableBody.innerHTML = "";
    peliculas.forEach((pelicula) => {
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${pelicula.id}</td>
                <td>${pelicula.titulo}</td>
                <td>${pelicula.anio_estreno}</td>
                <td>${pelicula.categoria}</td>
                <td>${pelicula.duracion}</td>
                <td>
                    <button onclick="editProducto(${pelicula.id}, '${pelicula.titulo}', ${pelicula.anio_estreno}, ${pelicula.categoria}, ${pelicula.duracion})">Editar</button>
                    <button onclick="deleteProducto(${pelicula.id})">Eliminar</button>
                </td>
            `;
      tableBody.appendChild(row);
    });
  };

  const addPelicula = async (pelicula) => {
    await fetch("https://milepeletay13gg.pythonanywhere.com/agregar_pelicula", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pelicula),
    });
    fetchPeliculas();
  };

  const updatePelicula = async (id, pelicula) => {
    await fetch(
      `https://milepeletay13gg.pythonanywhere.com/actualizar_pelicula/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pelicula),
      }
    );
    fetchPeliculas();
  };

  const deletePelicula = async (id) => {
    await fetch(
      `https://milepeletay13gg.pythonanywhere.com/eliminar_pelicula/${id}`,
      {
        method: "DELETE",
      }
    );
    fetchPeliculas();
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("peliculaId").value;
    const titulo = document.getElementById("titulo").value;
    const anio_estreno = document.getElementById("anio_estreno").value;
    const categoria = document.getElementById("categoria").value;
    const duracion = document.getElementById("duracion").value;
    const producto = { titulo, anio_estreno, categoria, duracion }; // {"nombre": <<nombre>> , "cantidad":<<cantidad>>, "precio":precio}

    if (isUpdating) {
      updatePelicula(id, pelicula);
      isUpdating = false;
    } else {
      addPelicula(pelicula);
    }

    form.reset();
    document.getElementById("peliculaId").value = "";
  });

  window.editPelicula = (id, titulo, anio_estreno, categoria, duracion) => {
    document.getElementById("peliculaId").value = id;
    document.getElementById("titulo").value = titulo;
    document.getElementById("anio_estreno").value = anio_estreno;
    document.getElementById("categoria").value = categoria;
    document.getElementById("duracion").value = duracion;
    isUpdating = true;
  };

  window.deletePelicula = (id) => {
    if (confirm("¿Estás seguro de eliminar esta película?")) {
      deletePelicula(id);
    }
  };

  fetchPelicula();
});
