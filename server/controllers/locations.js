import { pool } from '../config/database'

const getEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}


const getEventById = async (req, res) => {
    try {
        const eventId = req.params.eventId
        const selectQuery = `SELECT name, website, about, phone, location, address, image, date, time FROM events WHERE id = $1`
        const results = await pool.query(selectQuery, [eventId])

        res.status(200).json(results.rows[0])
    } catch (error) {
        res.status(409).json( { error: error.message })
    }
}


export default { 
    getEvents,
    getEventById
}
