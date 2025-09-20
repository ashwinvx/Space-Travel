import { useLoaderData } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import "./Planets.css"
export default function Planets() {
    const planets = useLoaderData();
    return (
        <div className="planets-container">
            <div className="planet-grid">
                { planets.map(planet => (
                    <div key={ planet.id } className="planet-card">
                        <div className="planet-image-container">
                            <img
                                src={ planet.pictureUrl }
                                alt={ `Image of ${planet.name}` }
                                className="planet-thumbnail"
                            />
                        </div>
                        <div className="planet-details">
                            <h3>{ planet.name }</h3>
                            <ul>
                                <li>Population: { planet.currentPopulation }</li>
                            </ul>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export const planetsLoader = async () => {
    const res = await SpaceTravelApi.getPlanets();
    return res.data;
}