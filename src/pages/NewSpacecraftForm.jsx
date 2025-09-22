// src/components/NewSpacecraftForm.js
import { Form, useNavigation, redirect } from "react-router-dom";
import "./NewSpacecraftForm.css"; // Optional for styling
import SpaceTravelApi from "../services/SpaceTravelApi.js";

export default function NewSpacecraftForm() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";

    return (
        <Form method="post">
            <fieldset>
                <legend>Build a New Spacecraft</legend>
                <label>
                    Name:
                    <input type="text" name="name" required />
                </label>
                <label>
                    Capacity:
                    <input type="number" name="capacity" required min="1" />
                </label>
                <label>
                    Description:
                    <textarea name="description" required rows="4" />
                </label>
                <label>
                    Picture URL:
                    <input type="url" name="pictureUrl" />
                </label>
                <button type="submit" disabled={ isSubmitting }>
                    { isSubmitting ? "Building..." : "Build Spacecraft" }
                </button>
            </fieldset>
        </Form>
    );
}

export const createSpacecraftAction = async ({ request }) => {
    // Extract form data from the request
    const formData = await request.formData();

    // Get individual values from the form data
    const name = formData.get("name");
    const capacity = formData.get("capacity");
    const description = formData.get("description");
    const pictureUrl = formData.get("pictureUrl");

    // Call the API with the form data
    await SpaceTravelApi.buildSpacecraft({
        name,
        capacity: Number(capacity),
        description,
        pictureUrl,
    });

    // Redirect the user to another page after a successful submission
    return redirect("/");
}
