import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import LocationsAPI from '../services/LocationsAPI.jsx'
import '../css/LocationEvents.css'

const LocationEvents = ({ city}) => {
    const [location, setLocation] = useState([])
    const [events, setEvents] = useState([])

    // useEffect(() => {
    //     const data = LocationsAPI.getEventsByCity(city)
    //     setEvents(data)
    // }, []);

    //   console.log(events)

      useEffect(() => {
        const fetchData = async () => {
          try {
            // Fetch data from the API using async/await
            const data = await LocationsAPI.getEventsByCity(city);
            // Set the fetched data in the state
            setEvents(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        // Call the fetchData function when the component mounts
        fetchData();
      }, [city]); 

    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    {/* <img src={location.image} /> */}
                </div>

                <div className='location-info'>
                    <h2>{city}</h2>
                    {/* <p>{location.address}, {location.city}, {location.state} {location.zip}</p> */}
                </div>
            </header>
            

            <main>
                {
                    
                    events && events.length > 0 ? events.map((event, index) =>
                        
                        <Event
                            eventData={event}
                            key={event.id}
                            id={event.id}
                            title={event.name}
                            date={event.date}
                            time={event.time}
                            image={event.image}
                            location={event.location}
                        />
                    ) : <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                }
            </main>
        </div>
    )
}

export default LocationEvents