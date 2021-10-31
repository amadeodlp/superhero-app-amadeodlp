import React, {useState, useEffect} from "react";

const Home = () => {
    
const [favorites, setFavorites] = useState([]);

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
         onClick={()=> setFavorites([])}>Limpiar favoritos</button>
         </div>    
     <section className="container">
       <div className="total-stats">Tu acumulado total: </div>
       <div className="row d-flex justify-content-center">
    {favorites.map((favorite)=>{
      const {id, name, image: {url}, powerstats: {intelligence, strength, speed, durability, power, combat}, biography: {alignment}, appearance:{height, weight, race}} = favorite;

     return (
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
        <button
         className="btn btn-secondary mt-3" 
         onClick={()=>setFavorites(favorites.filter((heroin)=>heroin.id !== id))}>remover favorito</button>
        </div>
        </div>
        </div>
        
      )
      })}
      </div>
      </section>
      </>
    )
}

export default Home;