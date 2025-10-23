export async function cargarImagenesAleatorias() {
            let contenedor = document.querySelector(".contenedor-aleatorios");
            

            try {
                let respuesta = await axios("https://dog.ceo/api/breeds/image/random/10");
                let datos = respuesta.data;

                if (datos.status === "success") {
                    datos.message.forEach((url, i) => {
                        contenedor.innerHTML+=`
                        <img src="${url}" alt="Perro ${i + 1}" class="w-full h-50 object-cover rounded-xl ">
                        `
                    });
                } else {
                    contenedor.innerHTML = '<div class="text-red-300">Error al cargar las imágenes</div>';
                }
            } catch (error) {
                
                contenedor.innerHTML = '<div class="text-red-300">Error de conexión</div>';
                console.error(error);
            }
        }
        