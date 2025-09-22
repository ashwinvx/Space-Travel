import { useLoaderData, useParams } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";

export default function Spacecraft() {
    const { id } = useParams();
    const spacecraft = useLoaderData();
    return (
        <div className="spacecraft-container">
            <div className="spacecraft-image-container">
                { <img
                    src={ spacecraft.pictureUrl }
                    alt={ `Image of ${spacecraft.name}` }
                    className="spacecraft-thumbnail"
                /> }
            </div>
            <div className="spacecraft-details">
                <h3>{ spacecraft.name }</h3>
                <ul>
                    <li>Capacity: { spacecraft.capacity }</li>
                    <li>Current Location: { spacecraft.currentLocation }</li>
                    <li>Description: { spacecraft.description }</li>
                </ul>
            </div>
        </div>
    )
}

export const spacecraftLoader = async ({ params }) => {
    const { id } = params;
    console.log('id-->', id);
    const res = await SpaceTravelApi.getSpacecraftById({ id });
    console.log('res-->', res.data);
    return res.data;
}