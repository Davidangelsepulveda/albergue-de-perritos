const razaSelect = document.querySelector("#raza");
const subrazaSelect = document.querySelector("#subraza");
const contenedor = document.querySelector(".contenedor-subraza");

export async function cargarRazas() {
  try {
    const { data } = await axios("https://dog.ceo/api/breeds/list/all");
    Object.keys(data.message).forEach(
      (r) => (razaSelect.innerHTML += `<option value="${r}">${r}</option>`)
    );
  } catch (e) {
    console.error("Error cargando razas:", e);
  }
}

async function mostrarPerritos(raza, subraza = "") {
  contenedor.innerHTML = "";
  if (!raza) return;
  let url = subraza
    ? `https://dog.ceo/api/breed/${raza}/${subraza}/images`
    : `https://dog.ceo/api/breed/${raza}/images`;

  try {
    const { data } = await axios(url);
    contenedor.innerHTML =
      data.status === "success"
        ? data.message
            .slice(0, 8)
            .map(
              (src) =>
                `<img src="${src}" alt="${raza}" class="rounded-xl object-cover w-full h-40 "/>`
            )
            .join("")
        : `<p class="text-red-400 text-center">No se encontraron perritos</p>`;
  } catch {
    contenedor.innerHTML = `<p class="text-red-400 text-center">Error al cargar</p>`;
  }
}

razaSelect.addEventListener("change", async () => {
  const raza = razaSelect.value;
  subrazaSelect.innerHTML = "";
  contenedor.innerHTML = "";

  try {
    const { data } = await axios(`https://dog.ceo/api/breed/${raza}/list`);
    const subs = data.message;
    subrazaSelect.disabled = subs.length === 0;
    subrazaSelect.innerHTML =
      subs.length > 0
        ? `<option value="">Selecciona subraza</option>${subs
            .map((s) => `<option value="${s}">${s}</option>`)
            .join("")}`
        : `<option value="">Sin subrazas</option>`;
    mostrarPerritos(raza);
  } catch (e) {
    console.error("Error cargando subrazas:", e);
  }
});

subrazaSelect.addEventListener("change", () =>
  mostrarPerritos(razaSelect.value, subrazaSelect.value)
);

cargarRazas();
