let form = document.querySelector('form');
let inputName = document.querySelector('#forSingle');
let dataDiv = document.querySelector('.dataDiv');
let ul = document.querySelector('ul');
let radio = document.querySelector('.radios')
let alerts = document.querySelector('.contOne')
let changepage = document.querySelector('.changepage')
let div;
let urlSingle;
let oneOrMore;
let url;
let text;
radio = radio.querySelectorAll('input');
let movieName = "Avengers"
let page = 1


inputName.focus();
let alertFunc = (text) => {
    alerts.innerHTML = `<div class="alert" data-aos="fade-down" data-aos-duration="800" >
    ${text}
    </div>`
    setTimeout(function () {//After three second the alert was display none
        alerts.innerHTML = "";
    }, 2600)
}

let forSingleData = async (name = "Avenger", page = 1, oneOrMore = "For_Multiple") => {

    if (oneOrMore === 'For_Single') {
        changepage.style.display = "none"
        url = `https://www.omdbapi.com/?apikey=e6839135&t=${name}`;
        try {
            let res = await fetch(url);
            let data = await res.json();
            dataDiv.innerHTML = '';
            if(data.Response === 'False'){
                text = 'Please inter a valid name'
                alertFunc(text)
                form.reset();
                forSingleData();
            }
else{
            let divOne = document.createElement('div');
            divOne.className = "divOne";
            divOne.innerHTML = `    
            <img src="${data.Poster === 'N/A' ? 'not_availble.jpg' : data.Poster}" alt="Movie Img">
            `;

            let divTwo = document.createElement('div');
            divTwo.className = "divTwo";
            divTwo.innerHTML = `
                <h1>${data.Title}</h1>
                <h4><b>Released on : </b>${data.Released}</h4>
                <p>${data.Genre}</p>
                <h3><b>Actors : </b>${data.Actors}</h3>
                <p><b>Awards : </b>${data.Awards}</p>
                <p>${data.Plot}</p>
                <p><b>Country : </b>${data.Country}</p>
                <h4><b>IMB : </b>${data.imdbRating}%</h4>`;
            dataDiv.append(divOne);
            dataDiv.append(divTwo);
            form.reset();
}
        } catch (error) {
           text = 'Please inter a valid name'
             alertFunc(text);
            form.reset();
            inputName.focus();
        }
    }


    else {
        changepage.style.display = "block"
        url = `https://www.omdbapi.com/?apikey=e6839135&s=${name}&page=${page}`;
        try {
            let res = await fetch(url);
            let data = await res.json();
            dataDiv.innerHTML = ``;
            data = data.Search.slice(0, 8)
            data.forEach((data) => {
                div = document.createElement('div');
                div.className = 'cards'
                div.innerHTML += `<img src="${data.Poster === 'N/A' ? 'not_availble.jpg' : data.Poster}" alt="Movie Img">
           <h2>${data.Title}</h2>
           <p>${data.Year}</p>
           <p>Type : ${data.Type}</p>`
                dataDiv.append(div);
            })
            form.reset();
           

        }
        catch {
            text = 'Please inter a valid name'
        alertFunc(text);
            form.reset();
            forSingleData();
        }
    }

}



form.addEventListener('submit', (e) => {
    e.preventDefault();
    radio.forEach(elem => {
        if (elem.checked) {
            oneOrMore = elem.value
        }
    });
    movieName = inputName.value;
    forSingleData(movieName, page, oneOrMore)
});

ul.addEventListener('click', (e) => {
    radio.forEach(elem => {
        if (elem.checked) {
            oneOrMore = elem.value
        }
    });
    if (e.target.classList.contains('listitems')) {
        movieName = e.target.textContent
       oneOrMore = 'For_Multiple'
        forSingleData(movieName, page, oneOrMore);
    }
})
forSingleData();

dataDiv.addEventListener('click', (e) => {
    radio.forEach(elem => {
        if (elem.checked) {
            oneOrMore = elem.value
        }
    });
    let cards = e.target.closest('div');

    if (cards.classList.contains('cards')) {
        let movieName = cards.firstElementChild.nextElementSibling.innerText
        oneOrMore = 'For_Single'
        forSingleData(movieName, page, oneOrMore);
    }
})
pageNum.innerText = page;
btnOne.addEventListener('click', () => {
    if (page > 1) {
        page--
        pageNum.innerText = page;
        forSingleData(movieName, page, oneOrMore);
    }
    else {
        text = 'Your already on First Page'
        alertFunc(text);
        forSingleData();
    }

})
btnTwo.addEventListener('click', () => {
    if (page < 6) {
        page++
        pageNum.innerText = page;
        forSingleData(movieName, page, oneOrMore);
    }
    else {
        text = 'Your already on Last Page'
        alertFunc(text);
    }
})



