import express from 'express'
import EventsController from '../controllers/events.js'
import LocationsController from '../controllers/locations.js'


const router = express.Router()

// define routes to get events and locations

router.get('/', LocationsController.getLocations)

router.get('/:city', EventsController.getEventsByLocation)


export default router