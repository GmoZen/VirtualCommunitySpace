

const getEventsByCity = async (city) => { 
    const response = await fetch(`http://localhost:3000/locations/${city}`)
    const data = await response.json()
    return data
}



const getAllLocations = async () => {
    const response = await fetch(`http://localhost:3000/locations`)
    const data = await response.json()
    return data
}


export default {
    getEventsByCity,
    getAllLocations
}