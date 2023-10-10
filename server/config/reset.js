import { pool } from './database.js'
import './dotenv.js'
import eventData from '../data/events.js'


const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations;

        CREATE TABLE IF NOT EXISTS locations (
            id SERIAL PRIMARY KEY,
            city VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 locations table created successfully')
    } catch (err) {
        console.error('⚠️ error creating locations table', err)
    }
}


const seedLocationsTable = async () => {
    await createLocationsTable()

    const locationValues = eventData.map((event) => event.location)
    const filteredLocations = [...new Set(locationValues)]

    filteredLocations.forEach((location) => {
        const insertQuery = {
            text: 'INSERT INTO locations (city) VALUES ($1)'
        }

        const values = [
            location
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.log('⚠️ error inserting location', err)
                return
            }

            console.log(`✅ ${location} location added successfully`)
        })
        
    })
}



const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            website VARCHAR(255) NOT NULL,
            about TEXT NOT NULL,
            phone VARCHAR(255) NOT NULL,
            location VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            image VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time VARCHAR(255) NOT NULL
        )
    `

    try {
        const res = await pool.query(createTableQuery)
        console.log('🎉 events table created successfully')
    } catch (err) {
        console.error('⚠️ error creating events table', err)
    }
}

const seedEventsTable = async () => {
    await createEventsTable()

    eventData.forEach((event) => {
        
        const insertQuery = {
            text: 'INSERT INTO events (name, website, about, phone, location, address, image, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        }

        const values = [
            event.name,
            event.website,
            event.about,
            event.phone,
            event.location,
            event.address,
            event.image,
            event.date,
            event.time
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.log('⚠️ error inserting event', err)
                return
            }

            console.log(`✅ ${event.name} added successfully`)
        })
        
    })
}

seedLocationsTable()
seedEventsTable()
