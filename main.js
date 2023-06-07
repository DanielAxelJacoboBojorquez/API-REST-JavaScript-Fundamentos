const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2&api_key=live_c6qF7KRLYeMBs86s5nSAS2tpm3TDH7SGU4qswN5elHTrzk0KsKYFrmMdQcv7l0ph";
const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?api_key=live_c6qF7KRLYeMBs86s5nSAS2tpm3TDH7SGU4qswN5elHTrzk0KsKYFrmMdQcv7l0ph";



const spanError = document.getElementById('error');

async function loadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log("Random")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status;
    } else{
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
    
        img1.src = data[0].url;
        img2.src = data[1].url;
        btn1.onclick = () => saveFavouriteMichi(data[0].id);
        btn2.onclick = () => saveFavouriteMichi(data[1].id);
    }
}

async function loadFavouritesMichis() {
    const res = await fetch(API_URL_FAVOURITES);
    const data = await res.json();
    console.log("Favorites")
    console.log(data);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status + data.message;
    } else {
        data.forEach(michi =>{
            const section = document.getElementById('favoriteMichis');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const btn = document.createElement('button');
            const btnText = document.createTextNode('Sacar al michi de favoritos');
            
            btn.appendChild(btnText);
            img.src = michi.image.url;
            img.width = 150;
            img.height = 150;
            article.appendChild(img);
            article.appendChild(btn);
            section.appendChild(article);
        })
    }
}

async function saveFavouriteMichi(id){
    const res = await fetch(API_URL_FAVOURITES, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();
    console.log('save');
    console.log(res);
    if (res.status !== 200){
        spanError.innerHTML="Hubo un error: "+res.status + data.message;
    }
}

loadRandomMichis();
loadFavouritesMichis();