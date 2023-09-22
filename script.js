// Esta función construye el cuerpo de la petición a la API de Stable Diffusion
function buildRequestBody(prompt) {
    return JSON.stringify({
        // Recuerda añadir tu API key!
        "key": "",
        "prompt": prompt,
        "negative_prompt": null,
        "width": "512",
        "height": "512",
        "samples": "1",
        "num_inference_steps": "20",
        "seed": null,
        "guidance_scale": 7.5,
        "safety_checker": "yes",
        "multi_lingual": "no",
        "panorama": "no",
        "self_attention": "no",
        "upscale": "no",
        "embeddings_model": null,
        "webhook": null,
        "track_id": null
    });
}

// Aquí guardamos el elemento HTML que muestra la imagen, en este caso un <img> que tiene la id "image-result"
const imageResult = document.getElementById('image-result');

// Esta función será la que se llame cuando se haga click en el botón "Generar imagen"
function callAPI() {
    // Aquí guardamos el texto que la usuaria ha escrito en el campo de texto
    let prompt = document.getElementById('prompt').value;
    // Cambiamos la imagen por un gif de carga (un gif con una barra de progreso)
    imageResult.src = "https://media2.giphy.com/media/4EFt4UAegpqTy3nVce/giphy.gif?cid=ecf05e476i6ds27lz0dxhy89u1ykp6e0yyk6aczdk717zjhx&ep=v1_gifs_search&rid=giphy.gif&ct=g"
    // Hacemos la petición a la API de Stable Diffusion
    fetch("https://stablediffusionapi.com/api/v3/text2img", {

        method: 'POST',
        headers: { "Content-Type": "application/json" },
        // Llamamos a la función que construye el cuerpo de la petición
        body: buildRequestBody(prompt),
        redirect: 'follow'

    })
        .then(response => response.json())
        // Una vez la API nos devuelve la respuesta, cambiamos la imagen por la que nos ha devuelto la API
        .then(result => imageResult.src = result.output[0])
        .catch(error => console.log('error', error));
}

// Añadimos un listener al botón "Generar imagen" para que cuando se haga click se llame a la función callAPI
document.getElementById('btn').addEventListener('click', callAPI)