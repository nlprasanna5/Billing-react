import React, { useContext } from "react";
import { MyContext } from "./Posts.js";

export default function Content() {
    const user = useContext(MyContext);
   
    return (
        <div>
            <h1>Component</h1>
            <h1>{user}</h1>
        </div>
    );
}
