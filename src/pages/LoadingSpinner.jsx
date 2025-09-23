import './LoadingSpinner.css';

export default function LoadingSpinner() {
    return (
        <div className="spinner-overlay">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
}
