const apartmentsList = document.querySelector(".apartments__list")


for (let i = 1; i <= 8; i++) {
    createListItem(i)
}

async function createListItem(index) {
        try {
        const response = await fetch(`./data/${index}.json`)
        console.log(response)

        if (!response.ok) {
            throw new Error("Fetch failed!")
        }


    } catch (error) {
        alert(error)
    }
}