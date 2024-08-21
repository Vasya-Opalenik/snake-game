import { useState } from "react"
import { unitSize } from "./options"
export default function Border({children, borderDimensions, className}){
    const [borderRow, setBorderMarking] = useState(new Array(borderDimensions.width / unitSize).fill(new Array(borderDimensions.width / unitSize).fill(null)));
    return (
        <div className={className ? "border-game " + className : "border-game"} style={{
            width: borderDimensions.width + "px",
            height: borderDimensions.height + "px",
        }}>
            {borderRow.map((row, iRow) => {
                return row.map((cube, iCube) => {
                    let classCube;
                    if(iRow % 2 === 0){
                         classCube = "marking-cube " + (iCube % 2 === 0 ? "black" : "green")
                    }
                    else{
                        classCube = "marking-cube " + (iCube % 2 === 0 ? "green" : "black")
                    } 
                    return <div className={classCube} key={iCube} style={{
                        width: unitSize + "px",
                        height: unitSize + "px",
                    }}></div>
                })
            })}
            {children}
        </div>
    )
}