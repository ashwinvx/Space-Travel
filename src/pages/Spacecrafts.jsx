import { useLoaderData } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import "./Spacecrafts.css";
export default function Spacecrafts() {
    const spacecrafts = useLoaderData();
    return (
        <div className="spacecrafts-container">
            <div className="spacecraft-grid">
                { spacecrafts.map(spacecraft => (
                    <div key={ spacecraft.id } className="spacecraft-card">
                        <div className="spacecraft-image-container">
                            <img
                                src={ spacecraft.pictureUrl }
                                alt={ `Image of ${spacecraft.name}` }
                                className="spacecraft-thumbnail"
                            />
                        </div>
                        <div className="spacecraft-details">
                            <h3>{ spacecraft.name }</h3>
                            <ul>
                                <li>Capacity: { spacecraft.capacity }</li>
                            </ul>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    )
}

export const spacecraftsLoader = async () => {
    const res = await SpaceTravelApi.getSpacecrafts();
    console.log('res-->', res.data);
    return res.data;
}