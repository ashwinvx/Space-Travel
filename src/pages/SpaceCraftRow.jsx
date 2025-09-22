// src/components/SpacecraftRow.js
import { useFetcher } from "react-router-dom";
import "./Spacecrafts.css";

export default function SpacecraftRow({ spacecraft }) {
    const fetcher = useFetcher();

    return (
        <fetcher.Form
            method="post"
            action={ `/spacecrafts/${spacecraft.id}/destroy` }
            className="destroy-form"
        >
            <button
                type="submit"
                className="destroy-button"
                disabled={ fetcher.state !== "idle" }
            >
                { fetcher.state === "submitting" ? "Destroying..." : "Destroy" }
            </button>
        </fetcher.Form>
    );
}


