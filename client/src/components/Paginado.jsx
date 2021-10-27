import React from "react";

export default function Paginado({dogsPerPage, allDogs, paginado}){
    const pageNumber = []

    for (let i = 1; i <= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumber.push(i)   
    }

    return(
        <nav>
            <ul>
            {
               pageNumber && pageNumber.map( number =>{
                   return (
                       <li key={number}>
                           <a onClick={ () => paginado(number)}>{number}</a>
                       </li>

                        )

                    }
                )
            }
            </ul>
        </nav>
    )


}