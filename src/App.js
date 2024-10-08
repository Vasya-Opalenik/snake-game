import Border from "./snakeGame/Border";
import Snake from "./snakeGame/Snake";
import Food from "./snakeGame/Food";
import "./App.css";
import { useState } from "react";
import { useEffect } from "react";
import {unitSize, velocity, borderDimensions} from "./snakeGame/options"
import { getRandomPosition, mobileAndTabletCheck } from "./utils";

function App() {
  function moveSnake(direction, foodPosition, setfoodPosition){
    // clearTimeout(timeoutId);
    const head = {
      x: snake[0].x,
      y: snake[0].y,
      id: snake[0].id + 1
    }
    if(direction === "LEFT") head.x = head.x - velocity;
    if(direction === "TOP") head.y = head.y - velocity;
    if(direction === "RIGHT") head.x = head.x + velocity;
    if(direction === "BOTTOM") head.y = head.y + velocity;
    if(snake[0].x === foodPosition.x && snake[0].y === foodPosition.y){
      console.log(2);
      setfoodPosition({
        x: getRandomPosition(0, borderDimensions.width - unitSize), 
        y: getRandomPosition(0, borderDimensions.height - unitSize)
      });
      let newPartSnake;
      if(direction === "LEFT") newPartSnake = {x: snake[0].x - unitSize, y: snake[0].y, id: snake[0].id + 1};
      if(direction === "TOP") newPartSnake = {x: snake[0].x, y: snake[0].y - unitSize, id: snake[0].id + 1};
      if(direction === "RIGHT") newPartSnake = {x: snake[0].x + unitSize, y: snake[0].y, id: snake[0].id + 1};
      if(direction === "BOTTOM") newPartSnake = {x: snake[0].x, y: snake[0].y + unitSize, id: snake[0].id + 1};
      setSnake([newPartSnake, ...snake]);
      setCount(count + 1);
    }else {
      const newSnake = [head, ...snake.filter((item, index) => { 
        if(index === snake.length - 1) return false;
        return true;
      })];
      setSnake(newSnake);
    }
  }
  function gameOver(snake){
    let snakeFilter = [...snake].filter((snakePart, index) => {
      if(index === 0) return false;
      if(snakePart.x === snake[0].x && snakePart.y === snake[0].y) return true;
    })
    if(
      snakeFilter.length !== 0 ||
      (snake[0].x < 0 || snake[0].x > borderDimensions.width - unitSize) || 
      (snake[0].y < 0 || snake[0].y > borderDimensions.height - unitSize)
    ){
      setDirection(["RIGHT"]);
      setSnake([
        {x: unitSize * 3, y: 0, id: 4},
        {x: unitSize * 2, y: 0, id: 3},
        {x: unitSize, y: 0, id: 2},
        {x: 0, y: 0, id: 1}
      ])
      setfoodPosition({
        x: getRandomPosition(0, borderDimensions.width - unitSize), 
        y: getRandomPosition(0, borderDimensions.height - unitSize)
      });
      setCount(0);
    }else {
      return true;
    }
  }
  const [direction, setDirection] = useState([
    "RIGHT"
  ]);
  const [snake, setSnake] = useState([
    {x: unitSize * 3, y: 0, id: 4},
    {x: unitSize * 2, y: 0, id: 3},
    {x: unitSize, y: 0, id: 2},
    {x: 0, y: 0, id: 1}
  ])
  const [count, setCount] = useState(0);
  const [foodPosition, setfoodPosition] = useState({
    x: getRandomPosition(0, borderDimensions.width - unitSize), 
    y: getRandomPosition(0, borderDimensions.height - unitSize)
  });
  const [startGame, setStartGame] = useState(false);

  let timeoutId;

  if(startGame){
    timeoutId = setTimeout(() => {
      if(gameOver(snake)){
        moveSnake(direction[0], foodPosition, setfoodPosition);
        if(direction.length > 1) {
          const newDirection = direction.filter((item, index) => {
            if(index === 0) return false;
            return true;
          });
          setDirection([...newDirection]);
        }
      }
    }, 100); 
  }
  
  useEffect(() => {
    function handleMove(e) {
    if (e.keyCode === 37) {
      clearTimeout(timeoutId);
      setDirection(d => (d[0] !== "RIGHT" ? [...d, "LEFT"] : d));
    } else if (e.keyCode === 38) {
      clearTimeout(timeoutId);
      setDirection(d => (d[0] !== "BOTTOM" ? [...d, "TOP"] : d));
    } else if (e.keyCode === 39) {
      clearTimeout(timeoutId);
      setDirection(d => (d[0] !== "LEFT" ? [...d, "RIGHT"] : d));
    } else if (e.keyCode === 40) {
      clearTimeout(timeoutId);
      setDirection(d => (d[0] !== "TOP" ? [...d, "BOTTOM"]: d));
    } else if(e.keyCode === 13 && !startGame){
      setStartGame(true);
    }
    }
    
    if(!mobileAndTabletCheck()){
      document.addEventListener("keydown", handleMove, false);
    }
    return () => {
      document.removeEventListener("keydown", handleMove, false);
      clearTimeout(timeoutId);
    }
  }, [snake]);

  return (
    <div className="App">
      <div className="wraper" onClick={mobileAndTabletCheck() && !startGame ? () => {
        setStartGame(true);
      } : null}>
        <div className="conteiner">
        <p className="count">{count}</p>
        {
        startGame ? <>
          <Border borderDimensions={borderDimensions}>
            <Snake snakeBody={snake} snakeDimensions={{width: unitSize, height: unitSize}} foodPosition={foodPosition}/>
            <Food foodPosition={foodPosition} foodDimensions={{width: unitSize, height: unitSize}}/>
          </Border>
        </> :
        <Border borderDimensions={borderDimensions} className="start">
          <div className="start-panel">
            <h1>Snake Game</h1>
            {mobileAndTabletCheck() ?
            <p>Click on the <span>SCREEN</span> to start the game</p> :
            <p>Press <span>ENTER</span> to start the game</p>
            }
          </div>
        </Border>
        }
        {mobileAndTabletCheck() ?
        <div className="controler" onClick={startGame ? (e) =>{
          if(e.target.closest(".controler-button")){
            let keyCode = +e.target.dataset.keyCode;
            if (keyCode === 37) {
              clearTimeout(timeoutId);
              setDirection(d => (d[0] !== "RIGHT" ? [...d, "LEFT"] : d));
            } else if (keyCode === 38) {
              clearTimeout(timeoutId);
              setDirection(d => (d[0] !== "BOTTOM" ? [...d, "TOP"] : d));
            } else if (keyCode === 39) {
              clearTimeout(timeoutId);
              setDirection(d => (d[0] !== "LEFT" ? [...d, "RIGHT"] : d));
            } else if (keyCode === 40) {
              clearTimeout(timeoutId);
              setDirection(d => (d[0] !== "TOP" ? [...d, "BOTTOM"]: d));
            }
          }
        } : null}>
          <div className="controler-top controler-button" data-key-code="38">↑</div>
          <div className="controler-left controler-button" data-key-code="37">←</div>
          <div className="controler-right controler-button" data-key-code="39">→</div>
          <div className="controler-bottom controler-button" data-key-code="40">↓</div>
        </div>
        : null}
        </div>
      </div>
    </div>
  );
}

export default App;
