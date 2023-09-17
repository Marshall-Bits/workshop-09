const raw = (prompt) => {
    return JSON.stringify({
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

const imageResult = document.getElementById('image-result');

const callAPI = () => {
    let prompt = document.getElementById('prompt').value;
    imageResult.src = "https://media2.giphy.com/media/4EFt4UAegpqTy3nVce/giphy.gif?cid=ecf05e476i6ds27lz0dxhy89u1ykp6e0yyk6aczdk717zjhx&ep=v1_gifs_search&rid=giphy.gif&ct=g"
    fetch("https://stablediffusionapi.com/api/v3/text2img", {

        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: raw(prompt),
        redirect: 'follow'

    })
        .then(response => response.json())
        .then(result => imageResult.src = result.output[0])
        .catch(error => console.log('error', error));
}

document.getElementById('btn').addEventListener('click', callAPI)