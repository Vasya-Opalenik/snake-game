export default function Food({foodPosition, foodDimensions}){
    return(
        <div id="food" style={{
            transform: `translate(${foodPosition.x}px, ${foodPosition.y}px)`,
            width: foodDimensions.width + "px",
            height: foodDimensions.height + "px",
        }}></div>
    )
}