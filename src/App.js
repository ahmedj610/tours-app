import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import Tours from "./Tours";
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = "https://course-api.com/react-tours-project";
function App() {
  const [loading, setLoading] = useState(true);

  const [tours, setTours] = useState([])

  function removeTour(id) {
    const newTours = tours.filter(tour => tour.id !== id)
    setTours(newTours)
  }

  function fetchApi() {
    setLoading(true)
    try {
      fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false)
        setTours(data)
        // console.log(data);
      });
    } catch(error) {
      setLoading(false)
      console.log(error)
    }
  }

  useEffect(() => {
    fetchApi()
  }, []);

  return loading ? (
    <main>
      <Loading />
    </main>
  ) : (
    <main>
        {
          tours.length ? 
            <Tours
              tours={tours}
              removeTour={removeTour}
            /> :
            <div className="title">
              <h2>No Tours Left</h2>
              <div className="underline"></div>
              <button className="btn" onClick={fetchApi}>Refresh</button>
            </div>
        }
    </main>
  )
}

export default App;
