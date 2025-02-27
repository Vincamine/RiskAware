import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get("http://localhost:8000/")
            .then(response => setMessage(response.data.message))
            .catch(error => console.error("Error:", error));
    }, []);

    return (
        <div>
            <h1>RiskAware Frontend</h1>
            <p>{message}</p>
        </div>
    );
}

export default App;