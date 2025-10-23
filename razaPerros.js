
    function obtenerEtiqueta(url) {
      const parte = url.split("breeds/")[1];
      if (!parte) return null;
      return parte.split("/")[0];
    }

    async function cargarRazas() {
      const select = document.querySelector("#raza");
      const contenedor = document.querySelector("#contenedor");

      try {
        const res = await fetch("https://dog.ceo/api/breed/hound/images");
        const data = await res.json();
        const urls = data.message;

        const etiquetas = [...new Set(urls.map(obtenerEtiqueta).filter(Boolean))];

        select.innerHTML = '<option value="">-- Selecciona una raza --</option>';
        etiquetas.forEach(etiqueta => {
          const opt = document.createElement("option");
          opt.value = etiqueta;
          opt.textContent = etiqueta;
          select.appendChild(opt);
        });

        contenedor.innerHTML = `<p class="text-gray-600">Selecciona una raza.</p>`;
      } catch (error) {
        console.error(error);
        select.innerHTML = `<option>Error al cargar</option>`;
      }
    }

    async function mostrarImagenes() {
      const contenedor = document.querySelector("#contenedor");
      const raza = document.querySelector("#raza").value;

      contenedor.innerHTML = "";

      if (!raza) {
        contenedor.innerHTML = `<p class="text-gray-700">Por favor, selecciona una raza.</p>`;
        return;
      }

      try {
        const res = await fetch("https://dog.ceo/api/breed/hound/images");
        const data = await res.json();

        const filtradas = data.message.filter(url => url.includes(raza));

        const seleccionadas = filtradas.slice(0, 15);

        if (seleccionadas.length === 0) {
          contenedor.innerHTML = `<p class="text-gray-600">No se encontraron imágenes para "${raza}".</p>`;
          return;
        }

        seleccionadas.forEach((url, i) => {
          contenedor.innerHTML += `
            <div class="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition">
              <img src="${url}" alt="${raza} ${i + 1}" class="w-full h-48 object-cover">
              <div class="p-4 text-center">
                <p class="font-semibold text-gray-700">${raza} #${i + 1}</p>
                <a href="${url}" target="_blank" class="text-blue-600 text-sm hover:underline">Ver imagen</a>
              </div>
            </div>
          `;
        });
      } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<p class="text-red-600">Error al cargar imágenes.</p>`;
      }
    }

    document.querySelector("#btnMostrar").addEventListener("click", mostrarImagenes);
    window.addEventListener("DOMContentLoaded", cargarRazas);