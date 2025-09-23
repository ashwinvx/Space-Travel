import { useLoaderData, Link } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import "./Spacecrafts.css";
import SpacecraftRow from "./SpaceCraftRow.jsx";
export default function Spacecrafts() {
    const spacecrafts = useLoaderData();
    return (
        <div className="spacecrafts-container">
            <div className="spacecraft-grid">
                <Link to="/spacecrafts/new" className="build-button">
                    Build a Spacecraft
                </Link>
                { spacecrafts.map(spacecraft => (
                    <div key={ spacecraft.id } className="spacecraft-card">
                        <Link to={ spacecraft.id.toString() } className="spacecraft-image-container">
                            <img
                                src={ spacecraft.pictureUrl }
                                alt={ `Image of ${spacecraft.name}` }
                                className="spacecraft-thumbnail"
                            />
                        </Link>
                        <div className="spacecraft-details">
                            <h3>{ spacecraft.name }</h3>
                            <ul>
                                <li>Capacity: { spacecraft.capacity }</li>
                            </ul>
                        </div>
                        <SpacecraftRow key={ spacecraft.id } spacecraft={ spacecraft } />
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

export const destroySpacecraftAction = async ({ params }) => {
    const { id } = params;
    await SpaceTravelApi.destroySpacecraftById({ id });
    return {};
}