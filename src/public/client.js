let store = Immutable.Map({
    project_name: Immutable.Map({ name: 'Mars Rover Dashboard' }),
    rovers: ["Curiosity", "Opportunity", "Spirit"],
    selected_rover: '' ? '' : 'Curiosity',
    rover_name: '',
    footer: Immutable.Map({ copyright: '&copy; 2023' })
})

// add our markup to the page
const root = document.getElementById("root")

const updateStore = (store, newState) => {
    store = Object.assign(store, newState)
    render(root, store)
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    return `
        <header>
            ${Heading(store.get("project_name").get("name"))}
            ${Navbar(store.get("rovers"))}
        </header>
        <section id="content">
            ${RoverDataContent(state)}
            ${RoverImages(state)}
        </section>
        <footer>
            ${Footer(store.get("footer").get("copyright"))}
        </footer>    
    `  
}

// listening for load event because page should load before any JS is called
window.addEventListener("load", () => {
    getRoverData("Curiosity")
    getRoverData("Opportunity")
    getRoverData("Spirit")
})

window.addEventListener('click', (event) => {
    if (event.target.type === 'button') {
        const rover = event.target.innerText
        getRoverData(rover)
    } 
})

// ------------------------------------------------------  COMPONENTS

// Add Project Name
const Heading = (name) => {
    return `
        <h1>${name}</h1>
    `
}

// Add Navbar
const Navbar = (rovers) => {
    return `
        <div class="navbar-container">
            ${rovers.map(rover => {
                return `
                    <button type="button" class="navlink">${rover}</button>
                `
            }).join('')}
        </div>
    `
}

// Add Rover Data
const RoverDataContent = (state) => {
    const roverData = state.photos

    return `
        <div class="content-container">
            <h3>${roverData[0].rover.name}</h3>
            <p>Launch Date: ${roverData[0].rover.launch_date}</p>
            <p>Landing Date: ${roverData[0].rover.landing_date}</p>
            <p>Status: ${roverData[0].rover.status}</p>
        </div>
    `
};

// Add Mars Rover Photos
const RoverImages = (state) => {
    const roverData = () => state.photos
 
    return `<div class="images-container">
            ${roverData().slice(0, 10).map(photo => (
                `<img src="${photo.img_src}">`
            )).join('')}
        </div>
    `
}

// Add Project Footer
const Footer = (copyright) => {
    return `
        <p>${copyright}</p>
    `
}

// ------------------------------------------------------  API CALLS
const getRoverData = (rover_name) => {
    fetch(`http://localhost:3000/rovers/${rover_name}`)
        .then(res => res.json())
        .then((roverData) => {
            const photos = roverData.photos
            updateStore(store, { photos })
            render(root, store)
        });
}

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}