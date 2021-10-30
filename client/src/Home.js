import React, {useState, useEffect} from "react";

const Home = () => {
    
    const [favorites, setFavorites] = useState([]);
    const [message, setMessage] = useState("");

const clearFavorites = () => {
  setFavorites([]);
  setMessage("Se han restaurado los favoritos")
}

useEffect(()=>{
  const data = localStorage.getItem("my-fav-list")
  if (data) {
    setFavorites(JSON.parse(data));
  }
}, [])

useEffect(()=>{
  localStorage.setItem("my-fav-list", JSON.stringify(favorites));
})
   
    return (
        <>
        <div className="header">
         <h1>Bienvenido, aquí verás a tus héroes favoritos</h1>
         <button 
         className="btn btn-secondary"
         onClick={clearFavorites}>Limpiar favoritos</button>
         </div>
    
     <section className="container">
       <div className="row d-flex justify-content-center">
    {favorites.map((favorite)=>{
      const {id, name, image: {url}, powerstats: {intelligence, strength, speed, durability, power, combat}} = favorite;
     return (
        <div key={id} className="col-12 col-sm-6 text-center p-5">
        <h1>{name}</h1>
        <img src={url} alt={name} className="img-fluid"/>
        <ul className="list-group list-group-flush p-2">
          <li className="list-group-item">Inteligencia: {intelligence}</li>
          <li className="list-group-item">Fuerza: {strength}</li>
          <li className="list-group-item">Velocidad: {speed}</li>
          <li className="list-group-item">Durabilidad: {durability}</li>
          <li className="list-group-item">Poder: {power}</li>
          <li className="list-group-item">Combate: {combat}</li>
        </ul>
        <button
         className="btn btn-secondary" 
         onClick={()=>setFavorites(favorites.filter((heroin)=>heroin.id !== id))}>remover favorito</button>
        </div>
      )
      })}
      </div>
      </section>
      </>
    )
}

export default Home;