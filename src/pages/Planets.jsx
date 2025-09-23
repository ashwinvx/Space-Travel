import { useLoaderData, useFetcher } from "react-router-dom";
import SpaceTravelApi from "../services/SpaceTravelApi.js";
import "./Planets.css"
import { useState } from "react";
export default function Planets() {
    const { planets, spacecrafts } = useLoaderData();
    const [selectedSpacecraftId, setSelectedSpacecraftId] = useState(null);
    const fetcher = useFetcher();
    const handleSelectSpacecraft = (spacecraftId) => {
        setSelectedSpacecraftId(spacecraftId);
    };

    const handleSendSpacecraft = (spacecraftId, targetPlanetId) => {
        fetcher.submit(
            { spacecraftId, targetPlanetId },
            {
                method: "post",
                action: "/spacecrafts/send",
            }
        );
        setSelectedSpacecraftId(null); // Clear selection after sending
    };

    const isSubmitting = fetcher.state === "submitting";
    return (
        <div className="planets-container">
            <div className="planet-grid">
                { planets.map((planet) => {
                    const stationedSpacecrafts = spacecrafts.filter(
                        (sc) => sc.currentLocation === planet.id
                    );

                    return (
                        <div key={ planet.id } className="planet-card">
                            <div className="planet-image-container">
                                <img
                                    src={ planet.pictureUrl }
                                    alt={ `Image of ${planet.name}` }
                                    onClick={ () => {
                                        if (selectedSpacecraftId && planet.id !== spacecrafts.find(sc => sc.id === selectedSpacecraftId)?.currentPlanetId) {
                                            handleSendSpacecraft(selectedSpacecraftId, planet.id);
                                        }
                                    } }
                                    className={
                                        selectedSpacecraftId &&
                                            planet.id !== spacecrafts.find(sc => sc.id === selectedSpacecraftId)?.currentPlanetId
                                            ? "clickable-planet planet-thumbnail"
                                            : "planet-thumbnail"
                                    }
                                />
                            </div>
                            <div className="planet-details">
                                <h3 >{ planet.name }</h3>
                                <ul>
                                    <li>Population: { planet.currentPopulation }</li>
                                </ul>
                            </div>
                            { stationedSpacecrafts.length > 0 ? (
                                <div className="stationed-spacecrafts">
                                    <ul className="spacecrafts-inline-list">
                                        { stationedSpacecrafts.map((sc) => (
                                            <li
                                                key={ sc.id }
                                                className={ `spacecraft-details ${selectedSpacecraftId === sc.id ? "selected" : ""
                                                    }` }
                                                onClick={ () => handleSelectSpacecraft(sc.id) }
                                            >
                                                {/* Display the image */ }
                                                { sc.pictureUrl && (
                                                    <img
                                                        src={ sc.pictureUrl }
                                                        alt={ `Picture of ${sc.name}` }
                                                        className="spacecraft-picture"
                                                    />
                                                ) }
                                                <div>
                                                    <p>{ sc.name }</p>
                                                    <ul>
                                                        <li>Capacity: { sc.capacity }</li>
                                                    </ul>
                                                </div>
                                            </li>
                                        )) }
                                    </ul>
                                </div>
                            ) : (
                                <p className="no-spacecrafts-message">
                                    No spacecrafts are currently stationed here.
                                </p>
                            ) }
                            { isSubmitting && (
                                <div className="global-loading">Sending spacecraft...</div>
                            ) }
                        </div>
                    );
                }) }
            </div>
        </div>
    )
}

export const planetsLoader = async () => {
    const [planetsResponse, spacecraftsResponse] = await Promise.all([
        SpaceTravelApi.getPlanets(),
        SpaceTravelApi.getSpacecrafts(),
    ]);

    // Extract the data from the response objects
    const planets = planetsResponse.data;
    const spacecrafts = spacecraftsResponse.data;

    return { planets, spacecrafts };
}

export const sendSpacecraftAction = async ({ request }) => {
    const formData = await request.formData();
    const spacecraftId = formData.get("spacecraftId");
    const targetPlanetId = parseInt(formData.get("targetPlanetId"), 10);  // Convert to integer

    await SpaceTravelApi.sendSpacecraftToPlanet({
        spacecraftId,
        targetPlanetId,
    });
    return {};
}