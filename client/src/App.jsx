import React, { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import Locations from './pages/Locations'
import LocationEvents from './pages/LocationEvents'
// import Events from './pages/Events'
import LocationsAPI from './services/LocationsAPI.jsx'
import './App.css'

const App = () => {
  const [locations, setLocations] = useState([])
  const [locationEvents, setLocationEvents] = useState([])

  useEffect(() => {
    const data = LocationsAPI.getAllLocations()
    setLocations(data)
  }, []);






  let element = useRoutes([
    {
      path: '/',
      element: <Locations />
    },
    {
      path: '/locations/losangeles',
      element: <LocationEvents index={1} city={'losangeles'} />
    },
    {
      path: '/locations/sacramento',
      element: <LocationEvents index={2} city={'sacramento'} />
    },
    {
      path: '/locations/sandiego',
      element: <LocationEvents index={3} city='sandiego' />
    },
    {
      path: '/locations/sanfrancisco',
      element: <LocationEvents index={4} city='sanfrancisco' />
    }
    // {
    //   path: '/events',
    //   element: <Events />
    // }
  ])

  return (
    <div className='app'>

      <header className='main-header'>
        <h1>UnityGrid Plaza</h1>

        <div className='header-buttons'>
          <Link to='/' role='button'>Home</Link>
          {/* <Link to='/events' role='button'>Events</Link> */}
        </div>
      </header>

      <main>
        {element}
      </main>
    </div>
  )
}

export default App