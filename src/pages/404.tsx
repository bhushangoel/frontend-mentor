import { Link } from "react-router-dom";

function Notfound() {
    return (
        <div className="flex flex-col">
            <h2>404 Not Found</h2>
            <Link to={'/'}>Back to home</Link>
        </div>
    );
}

export default Notfound;