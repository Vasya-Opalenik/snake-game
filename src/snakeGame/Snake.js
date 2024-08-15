import { unitSize } from "./options";
export default function Snake({snakeBody, snakeDimensions, foodPosition}){
    const body = snakeBody.map((snakePart, index, snake) => {
        let leftEyesLeft = snake[0].x === snake[1].x - unitSize ? "100%" : "0";
        let leftEyesTop = snake[0].y === snake[1].y - unitSize ? "100%" : "0";
        
        let rightEyesLeft = snake[0].x === snake[1].x + unitSize ? "0" : "100%";
        let rightEyesTop = snake[0].y === snake[1].y + unitSize ? "0" : "100%";

        let muzzleStyle = {};
        if(snake[0].x === (snake[1].x + unitSize)){
            muzzleStyle.transform = "translate(30%, 0)";
            muzzleStyle.borderRadius = "0px 10px 10px 0px";
        }else if(snake[0].x === (snake[1].x - unitSize)){
            muzzleStyle.transform = "translate(-30%, 0)";
            muzzleStyle.borderRadius = "10px 0px 0px 10px"
        }else if(snake[0].y === (snake[1].y + unitSize)){
            muzzleStyle.transform = "translate(0, 30%)";
            muzzleStyle.borderRadius = "10px 0px 10px 10px"
        }else if(snake[0].y === (snake[1].y - unitSize)){
            muzzleStyle.transform = "translate(0, -30%)";
            muzzleStyle.borderRadius = "10px 10px 0px 0px"
        }
        
        let snakeEyesPosition;
        let a;
        
        if(foodPosition.x > snake[0].x) {
            snakeEyesPosition = (foodPosition.y - snake[0].y) / (Math.sqrt(Math.pow(foodPosition.x - snake[0].x, 2) + Math.pow(foodPosition.y - snake[0].y, 2)));
            a = 180 / (Math.PI / Math.asin(snakeEyesPosition));
        }else{
            snakeEyesPosition = (snake[0].x - foodPosition.x) / (Math.sqrt(Math.pow(snake[0].x - foodPosition.x, 2) + Math.pow(snake[0].y - foodPosition.y, 2)));
            a = snake[0].y > foodPosition.y ? - 90 - (180 / (Math.PI / Math.asin(snakeEyesPosition)))
            : 90 + (180 / (Math.PI / Math.asin(snakeEyesPosition)));
        }
        if(index === 0){
            return<div className="snake-part head" key={snakePart.id} style={{
                transform: `translate(${snakePart.x}px, ${snakePart.y}px)`,
                width: snakeDimensions.width + "px",
                height: snakeDimensions.height + "px",
            }}>
            <div className="face">
                <div className="muzzle" style={muzzleStyle}></div>
                <div className="eyes L" style={{left: leftEyesLeft, top: leftEyesTop}}>
                    <img src="eays.svg" alt="eays" style={{transform: `rotate(${a}deg)`}}/>
                </div>
                <div className="eyes R" style={{left: rightEyesLeft, top: rightEyesTop}}>
                    <img src="eays.svg" alt="eays" style={{transform: `rotate(${a}deg)`}}/>
                </div>
                <div className="tongue"></div>
            </div>
        </div>
        }
        return <div className="snake-part" key={snakePart.id} style={{
            transform: `translate(${snakePart.x}px, ${snakePart.y}px)`,
            width: snakeDimensions.width + "px",
            height: snakeDimensions.height + "px",
        }}></div>
    })
    return (
        <>
        {body}
        </>
    )
}