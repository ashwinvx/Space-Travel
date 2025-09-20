import { Outlet, NavLink } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="root-layout">
            <header>
                <div className="app-container">
                    <nav className="tabs-container">
                        <NavLink to="/" className="tab" >Home</NavLink>
                        <NavLink to="spacecrafts" className="tab">Spacecrafts</NavLink>
                        <NavLink to="planets" className="tab">Planets</NavLink>
                    </nav>
                </div>
            </header>
            <main>
                <div className="tab-content">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}