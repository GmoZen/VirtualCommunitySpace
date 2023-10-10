import { pool } from '../config/database.js'

const getLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY city ASC')
        res.status(200).json(results.rows)
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
}


// const getLocationByCity = async (req, res) => {
//     try {
//         const locationCity = req.params.locationCity
//         const selectQuery = `SELECT time FROM locations WHERE city = $1`
//         const results = await pool.query(selectQuery, [locationCity])

//         res.status(200).json(results.rows[0])
//     } catch (error) {
//         res.status(409).json( { error: error.message })
//     }
// }


export default { 
    getLocations
    // getLocationByCity
}
