const apartmentsList = document.querySelector(".apartments__list")
const destinationElement = document.querySelector(".destionation__article")
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

        const itemFavourite = document.createElement("img") // skal ændres til button da vi skal kunne favourite forskellige destinations, men det er en ekstra opgave...
        itemFavourite.setAttribute("src", "img/icons/notfavourite.svg")

        const itemLink = document.createElement("a")
        itemLink.textContent = "More"
        itemLink.setAttribute("href", `destination.html?id=${destination.id}`)

        itemDiv.append(itemFavourite, itemLink)

        listItem.append(itemFigure, itemDiv)
        apartmentsList.append(listItem)
    })
}

function createDestinationPreview (data) {
    // console.log(data.image)

    // const divElement = document.createElement("div")
    // divElement.classList.add("destionation__image")
    // divElement.style.backgroundImage = `url("img/${data.image}")`
    
    // const favouriteButton = document.createElement("button")
    // favouriteButton.classList.add("destination__favourite__button")
    // const favouriteImg = document.createElement("img")
    // favouriteImg.setAttribute("src", "img/icons/notfavourite.svg")

    // const favouriteText = document.createElement("p")
    // favouriteText.textContent = "Favorit"

    // favouriteButton.append(favouriteImg, favouriteText)
    // divElement.append(favouriteButton)
    // destinationElement.append(divElement)

    // const divElement2 = document.createElement("div")
    destinationElement.innerHTML += 
    `
    <div class="destionation__image" style="background-image: url('img/${data.image}'); ">
        <button class="destination__favourite__button">
            <img src="img/icons/notfavourite.svg">
            Favourit
        </button>
    </div>

    <div>
        <span class="destionation__place">${data.destination}</span>
        <h1 class="data__title">${data.title}</h1>
        <h2 class="data__subtitle">${data.subtitle}</h2>
        <p class="data__text">${data.text}</p>
        <ul class="facilities__list"></ul>
    </div>
    `

    console.log(data.facilities)
    data.facilities.forEach(element => {
        let list = document.querySelector(".facilities__list")
        list.innerHTML += 
        `
        <li class="facilities__list__item">
            <p>${element}</p>
        </li>
        `
    });
}

fetchData()