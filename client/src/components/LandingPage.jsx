import React from "react";
import {Link} from "react-router-dom";

import styles from "./LandigPage.module.css"

import imageLogo from "./assets/image 1.png"

export default function LandingPage () {
    return (
        <div className={styles.bigcontainer}> 
        <div className={styles.bkg}>
            <div className={styles.bkg2}>
                <div className={styles.container}>
                   <img className={styles.title} src={imageLogo} />
                   <div className={styles.textContainer}>
                   <h4 className={styles.text}>Una pagina donde vas a encontrar toda la información básica de tus amigos peludos favoritos</h4>
                   </div>
                </div>
                   <Link to ="/home">
                      <button className={styles.button}>Entrar</button>
                   </Link>
            </div>
        </div>

        </div>
    )
}