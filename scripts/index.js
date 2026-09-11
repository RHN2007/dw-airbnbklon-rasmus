const apartmentsList = document.querySelector(".apartments__list")


// for (let i = 1; i <= 8; i++) {
//     createListItem(i)
// }

async function fetchData() {
        try {
        const response = await fetch("./data/destinations.json")
        let result = await response.json()

        if (!response.ok) {
            throw new Error("Fetch failed!")
        }

        result.destinations.forEach(destination => {
            const listItem = document.createElement("li")

            const itemFigure = document.createElement("figure")

            const figureImage = document.createElement("img")
            figureImage.setAttribute("src", `img/${destination.image}`)
            itemFigure.append(figureImage)

            const itemDiv = document.createElement("div")

            const itemFavourite = document.createElement("img") // skal ændres til button da vi skal kunne favourite forskellige destinations, men det er en ekstra opgave...
            itemFavourite.setAttribute("src", "img/icons/notfavourite.svg")

            const itemLink = document.createElement("a")
            itemLink.textContent = "More"
            itemLink.setAttribute("href", `destination.html?id=${destination.id}`)

            itemDiv.append(itemFavourite, itemLink)

            listItem.append(itemFigure, itemDiv)
            apartmentsList.append(listItem)
        });

    } catch (error) {
        alert(error)
    }
}


fetchData()
        // const listItem = document.createElement("li")
        
        // const itemImage = document.createElement("img")
        // itemImage.setAttribute("src", `img/${result.image}`)

        // listItem.append(itemImage)
        // apartmentsList.append(listItem)