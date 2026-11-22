import { useState } from "react";

export default function NameTag() {
    const [name, setName] = useState("");

    return (
        <div>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            <p>Hello, {name || 'Stranger'}!</p>
        </div>
    )
}