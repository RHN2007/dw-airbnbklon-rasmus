const apartmentsList = document.querySelector(".apartments__list")
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
    console.log(data)
}

fetchData()