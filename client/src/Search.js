import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

const Search = () => {
    const textInput = useRef(null);
  const [heroes, setHeroes] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleSubmit = () => {
  const hero = textInput.current.value
  axios.get(`https://superheroapi.com/api/4511754818882123/search/${hero}`, {'header': 'Access-Control-Allow-Origin'})
  .then((response)=>{
    setHeroes(response.data.results)
  }).catch((error)=>{
    alert("Heroe no encontrado");
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
    </div>
    </div>
   
   
    <section className="container">
      <div className="row d-flex justify-content-center">

    {heroes.map((heroin)=>{
      const {id, name, image: {url}, powerstats: {intelligence, strength, speed, durability, power, combat}} = heroin;
      return (
        <div key={id} className="col-12 col-sm-6 text-center p-5">
          <div className="card">
             <h1 className="card-title">{name}</h1>
             <img src={url} alt={name} className="card-img-fluid"/>
             <ul className="list-group list-group-flush p-2">
             <li className="list-group-item">Inteligencia: {intelligence}</li>
             <li className="list-group-item">Fuerza: {strength}</li>
             <li className="list-group-item">Velocidad: {speed}</li>
             <li className="list-group-item">Durabilidad: {durability}</li>
             <li className="list-group-item">Poder: {power}</li>
             <li className="list-group-item">Combate: {combat}</li>
             </ul>
             <button className="btn btn-secondary" onClick={()=>
              favorites.find(favorite => favorite.id === heroin.id) ?
              console.log("item already a favorite!") :
              favorites.length === 6 ?
              console.log("favorites list is full") :
              setFavorites(favorites.concat(heroin))}>Añadir a favoritos</button>
          </div>
        </div>
            )
    })}
       </div>
      </section>
  </main>
  )
}

export default Search;