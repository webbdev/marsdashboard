let store = {
    project_name: 'Mars Rover Dashboard',
    rovers: Immutable.List(['Curiosity', 'Opportunity', 'Spirit']),
    selected_rover: '' ? '' : 'Curiosity',
    rover_data: {},
    mars_rover_photos: [],
    copyright: "&copy; 2023"
}

// add our markup to the page
const root = document.getElementById('root')

const updateStore = (store, newState) => {
    newStore = Object.assign(store, newState)
    render(root, newStore);
}

const render = async (root, state) => {
    root.innerHTML = App(state)
}

// create content
const App = (state) => {
    let { project_name, rovers, rover_data, mars_rover_photos, copyright } = state

    return `
        <header>
            ${Heading(project_name)}
            ${Navbar(rovers)}
        </header>
        <section>
            ${rover_data.hasOwnProperty('data') ? RoverDataContent(rover_data) : ''}
            ${mars_rover_photos.hasOwnProperty('photos') ? Images(mars_rover_photos) : ''}
        </section>
        <footer>
            ${Footer(copyright)}
        </footer>
    `
}

// listening for load event because page should load before any JS is called
window.addEventListener('load', async () => {
    getRoverData(store.selected_rover)
    getMarsPhotos(store.selected_rover)
    render(root, store)
})

window.addEventListener('click', (event) => {
    if (event.target.type === 'button') {
        const rover = event.target.innerText
        updateStore(store, {selected_rover: rover})
        getRoverData(rover)
        getMarsPhotos(rover)
    }
})


// ------------------------------------------------------  COMPONENTS

// Add Project Name
const Heading = (project_name) => {
    return `
        <h1>${project_name}</h1>
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
const RoverDataContent = (rover_data) => {
    rover_data = rover_data.data.rover

    return `
        <div class="content-container" id="${rover_data.name}">
            <h3>${rover_data.name}</h3>
            <p>Launch Date: ${rover_data.launch_date}</p>
            <p>Landing Date: ${rover_data.landing_date}</p>
            <p>Status: ${rover_data.status}</p>
        </div>
    `
}

// Add Mars Rover Photos
const Images = (mars_rover_photos) => {
    mars_rover_photos = mars_rover_photos.photos.photos;

    return `<div class="images-container">
            ${mars_rover_photos.slice(0, 10).map((photo) => (
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
const getRoverData = (rover) => {
    fetch(`http://localhost:3000/rover-data/${rover}`)
        .then(res => res.json())
        .then(rover_data => updateStore(store, { rover_data }))
}

const getMarsPhotos = (rover) => {
    fetch(`http://localhost:3000/rovers/${rover}`)
        .then(res => res.json())
        .then(mars_rover_photos => updateStore(store, { mars_rover_photos }))
}

// Example API call
const getImageOfTheDay = (state) => {
    let { apod } = state

    fetch(`http://localhost:3000/apod`)
        .then(res => res.json())
        .then(apod => updateStore(store, { apod }))

    return data
}