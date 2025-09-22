import { Outlet, NavLink } from "react-router-dom";

export default function SpacecraftLayout() {
    return (
        <div className="spacecraft-layout">
            <header>
            </header>
            <main>
                <div className="tab-content">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}