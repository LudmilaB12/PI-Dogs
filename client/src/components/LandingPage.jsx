import React from "react";
import {Link} from "react-router-dom";

export default function LandingPage () {
    return (
        <div>
            <h1>The Dogie Page</h1>
            <Link to ="/home">
                <button>Home Page</button>
            </Link>
        </div>
    )
}