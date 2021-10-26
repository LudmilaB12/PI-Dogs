import React from "react";

export default function DogCard({image, name, temp}) {


    return(
        <div>
            <img src={image} alt="Image Not Found" width="200px" height="200px"/>
            <h2>{name}</h2>
            <h3>{temp}</h3>
        </div>
    )

}