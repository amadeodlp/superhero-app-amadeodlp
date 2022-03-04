import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

const Search = () => {

  const textInput = useRef(null);
  const [heroes, setHeroes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
  const hero = textInput.current.value
  setMessage("buscando héroe...")
  axios.get(`https://superheroapi.com/api/4511754818882123/search/${hero}`, {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }})
  .then((response)=>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    setMessage("")
    let searchResult = response.data.results
    searchResult ? 
    setHeroes(searchResult) :
    setMessage("héroe no encontrado!");
    setTimeout(()=>{
      setMessage("");
    }, 3000);
  }).catch((error)=>{
    setMessage("héroe no encontrado!");
    setTimeout(()=>{
      setMessage("");
    }, 2000);
    console.log(error);
  })
}

useEffect(()=>{
  const savedFavorites = localStorage.getItem("my-fav-list")
  const savedHeroes = localStorage.getItem("my-hero-list")
  if (savedFavorites) {
    setFavorites(JSON.parse(savedFavorites));
  } if (savedHeroes) {
    setHeroes(JSON.parse(savedHeroes))
  }
}, [])

useEffect(()=>{
  localStorage.setItem("my-fav-list", JSON.stringify(favorites));
  localStorage.setItem("my-hero-list", JSON.stringify(heroes));
})

  return (

        <main className="App">

          <div className="header">
            <h1>Crea tu equipo de superhéroes</h1>
        <div className="input-container">
      <input
      className="hero-searcher"
        type="text"
        ref={textInput}/>
      <input
        className="btn btn-secondary"
        type="button"
        value="Buscar superhéroes!"
        onClick={handleSubmit}
      />
      {message && <div className="api-error">{message}</div>}
    </div>
    </div>
   
   
    <section className="container">
      <div className="row d-flex justify-content-center">

      {heroes && heroes.map((hero)=> {

      const {id, name, image: {url}, powerstats: {intelligence, strength, speed, durability, power, combat}, biography: {alignment}, appearance:{height, weight, race}} = hero;
      return (
          <>
        <div key={id} className="col-12 col-sm-6 text-center p-5">
        <h1>{name}</h1>
        <h5 className="p-3">Acumulativo de stats: {intelligence*1+ strength*1+speed*1+durability*1+power*1+combat*1}</h5>
        <div className="map-container">
        <div className="map-item">
          <img src={url} alt={name} className="img-fluid"/>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">{alignment}</li>
        <li className="list-group-item">{height}</li>
        <li className="list-group-item">{weight}</li>
        <li className="list-group-item">{race}</li>
        </ul>
        </div>
        <div className="map-item">
           <ul className="list-group list-group-flush">
        <li className="list-group-item">Inteligencia: {intelligence}</li>
          <li className="list-group-item">Fuerza: {strength}</li>
          <li className="list-group-item">Velocidad: {speed}</li>
          <li className="list-group-item">Durabilidad: {durability}</li>
          <li className="list-group-item">Poder: {power}</li>
          <li className="list-group-item">Combate: {combat}</li>
          </ul>
        <button className="btn btn-secondary mt-3" onClick={()=>
              favorites.find(favorite => favorite.id === hero.id) ?
              console.log("item already a favorite!") :
              favorites.length === 6 ?
              console.log("favorites list is full") :
              setFavorites(favorites.concat(hero))}>Añadir a favoritos</button>
        </div>      
        </div> 
        </div>
        </>
      )})}
     </div>
    </section>
  </main>
  )
}

export default Search;