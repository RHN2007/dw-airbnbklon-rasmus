const apartmentsList = document.querySelector(".apartments__list")
const destinationElement = document.querySelector(".destination__article")
const url = window.location.href
const params = new URL(url).searchParams
const destinationID = params.get("id")

async function fetchData() {
    try {

        let isProductPage = false
        let response = ""

        if (destinationID !== null) {
            response = await fetch(`./data/${destinationID}.json`)
            isProductPage = true
        } else {
            response = await fetch("./data/destinations.json")
        }


        let result = await response.json()

        if (!response.ok) {
            throw new Error("Fetch failed!")
        }


        if (isProductPage == false) {
            createListItem(result.destinations)
        } else {
            createDestinationPreview(result)
        }


    } catch (error) {
        alert(error)
    }
}


function createListItem(destinations) {
    destinations.forEach(destination => {
        const listItem = document.createElement("li")
        listItem.classList.add("list__item")

        const itemFigure = document.createElement("figure")
        itemFigure.classList.add("list__item__figure")

        const figureImage = document.createElement("img")
        figureImage.setAttribute("src", `img/${destination.image}`)
        itemFigure.append(figureImage)

        const itemDiv = document.createElement("div")
        itemDiv.classList.add("list__item__div")

        const itemFavourite = document.createElement("img") // skal ændres til button da vi skal kunne favourite forskellige destinations
        itemFavourite.setAttribute("src", "img/icons/notfavourite.svg")
        itemFavourite.addEventListener("click", (event) => {
            if (itemFavourite.getAttribute("src") == "img/icons/notfavourite.svg") {
                itemFavourite.setAttribute("src", "img/icons/favourite.svg")
            } else {
                itemFavourite.setAttribute("src", "img/icons/notfavourite.svg")
            }
        })

        const itemLink = document.createElement("a")
        itemLink.textContent = "More"
        itemLink.setAttribute("href", `destination.html?id=${destination.id}`)

        itemDiv.append(itemFavourite, itemLink)

        listItem.append(itemFigure, itemDiv)
        apartmentsList.append(listItem)
    })
}

function createDestinationPreview(data) {
    destinationElement.innerHTML +=
        `
    <div class="destination" style="background-image: url('img/${data.image}'); ">
        <button class="destination__favourite__button">
            <img src="img/icons/notfavourite.svg">
            Favorit
        </button>
    </div>

    <div class="destination__info">
        <span class="info__place">${data.destination}</span>
        <h1 class="info__title">${data.title}</h1>
        <h2 class="info__subtitle">${data.subtitle}</h2>
        <p class="info__text">${data.text}</p>
        <h3 class="info__list__header">Faciliteter<h3>
        <ul class="info__list"></ul>
    </div>
    `
    let favouriteButton = document.querySelector(".destination__favourite__button")
    favouriteFunctionality(favouriteButton)

    data.facilities.forEach(element => {
        let list = document.querySelector(".info__list")
        list.innerHTML +=
            `
        <li class="facilities__list__item">
            <p>${element}</p>
        </li>
        `
    });
}

function favouriteFunctionality(button) { // skal lave funktionaliteten til at knappen aktuelt virker
    button.addEventListener("click", (event) => {
        button.classList.add("favourited")
    })
}

fetchData()