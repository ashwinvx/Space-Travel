import { Outlet, NavLink, useNavigation } from "react-router-dom";
import LoadingSpinner from "../pages/LoadingSpinner";

export default function RootLayout() {
    const navigation = useNavigation();
    return (
        <div className="root-layout">
            <header>
                <div className="app-container">
                    {/* Show spinner when a loader or action is running */ }
                    { navigation.state === 'loading' && <LoadingSpinner /> }
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