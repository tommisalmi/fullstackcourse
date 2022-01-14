import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Country = ({country, weather}) => {

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png}/>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {weather.current.temperature} celsius </p>
      <img src={weather.current.weather_icons[0]}/>
      <p>wind:{weather.current.wind_speed} km/h direction {weather.current.wind_dir}</p>
    </div>

  )
}

const CountryList = ({countries, handleShowCountry}) => {
  return (
    <div>
      {countries.map(country => <p key={country.name.common}>{country.name.common} 
      <button onClick={handleShowCountry(country.name.common)}> show
  </button>       
      </p>)}
    </div>
  )
}

const ShowCountries = ({countriesFound, handleShowCountry, weather}) => {
  const len = countriesFound.length
  if (len>10){
    return (
    <p>"Too many matches, specify another filter"</p>
    )
  }
  else if (len===1 && weather != null){
    return (
    <Country country={countriesFound[0]} weather={weather}/>
    )
  }
  else {
    return (
    <CountryList countries={countriesFound} handleShowCountry={handleShowCountry}/>
    )
  }


}

const App = () => {
  // console.log("App just rerendered")
  
  const [countries, setCountries] = useState([])
  const [find, setFind] = useState("")
  const [weather, setWeather] = useState(null)

  const countries_hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }
  useEffect(countries_hook,[])
  const countriesFound = countries.filter(country => country.name.common.toLowerCase().includes(find.toLowerCase()))

  const weatherFrom = (countriesFound.length === 1)
  ? countriesFound[0]
  : "nothing"
  
  
  
  const countriesLength = countriesFound.length
 
  const weather_hook = () => {
    if (countriesFound.length===1) {
      const api_key = process.env.REACT_APP_API_KEY
      axios
        .get('http://api.weatherstack.com/current',{
          params: {
            // access_key: 87432979,
            access_key: api_key,
            query: countriesFound[0].capital[0], 
          }
        })
        .then(response => {
          setWeather(response.data)
        })
    }
    else setWeather(null)
  }

  useEffect(weather_hook,[weatherFrom])
const handleFindChange = (event) => {
  setFind(event.target.value)
}
const handleShowCountry = countryName => () => { //notice this difference compared to having countryname in the parenthesis
  setFind(countryName)
}

  return (
    <div>
      <form>
        <div>
          find countries <input value={find} onChange= {handleFindChange}/>
        </div>
      </form>
      <ShowCountries countriesFound={countriesFound} handleShowCountry={handleShowCountry} weather = {weather}/>

    </div>
  )

}
export default App