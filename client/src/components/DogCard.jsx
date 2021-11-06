import React from "react";

import styles from "./DogCard.module.css";
import imagePaw from "./assets/paws (4).png"

export default function DogCard({image, name, temp}) {


    return(
        <div className={styles.container}>
            <div className={styles.pawcontainer}>
            <img src={imagePaw} alt=" "  className={styles.paw} />

            </div>
            <img className={styles.dogimg} src={image} alt="Image Not Found" width="335px" height="200px"/>
            <h2>{name}</h2>
            <div className={styles.textcontainer}><h3>{temp? temp : "sin definir"}</h3></div>
        </div>
    )

}