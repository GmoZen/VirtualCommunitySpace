import { pool } from './database'
import './dotenev.js'
import eventData from '../data/events.js'


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
            time VARCHAR(255) NOT NULL,
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
            text: 'INSERT INTO event (name, website, about, phone, location, address, image, date, time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)'
        }

        const values = [
            event.name,
            event.pricePoint,
            event.audience,
            event.image,
            event.description,
            event.submittedBy,
            event.submittedOn
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

seedEventsTable()