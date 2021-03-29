document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameDisplay= document.querySelector('.game-container')
    const scoreBoard = document.querySelector('.score')
    
    
    let birdLeft = 220
    let birdBottom = 100
    let gravity = 3
    let isGameOver = false
    let gap = 430
    let score = 0
    
    
  

    function startGame(){
        
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
        scoreBoard.style.display = 'block'
        
        
    }
    let gameTimerId= setInterval(startGame,30)
    

    function control(e) {
        if (e.keyCode === 32) {
            
            jump()
        }
    }

        window.addEventListener("keydown", function(e){
            if (e.keyCode == 32 && e.target== document.body){
                e.preventDefault()
            }
        })

    
    function jump(){
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)
  
    
    

    function generateObstacle(){
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight
        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
    
        }
        gameDisplay.appendChild(obstacle)
        gameDisplay.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left= obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle(){
            obstacleLeft -=2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'
            if (obstacleLeft === 210) {
                score++
                scoreBoard.innerHTML= score
                
                
            }

            if(obstacleLeft ===-40){
                clearInterval(timerId)
                gameDisplay.removeChild(obstacle)
                gameDisplay.removeChild(topObstacle)
            }
            if (
                obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 &&
                (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap -200)||
                birdBottom === -5
                ) {
                gameOver()
                clearInterval(timerId)
                
            }
        }
        let timerId = setInterval(moveObstacle, 20)
       if (!isGameOver) setTimeout(generateObstacle, 3000)

    }
    generateObstacle()

    function gameOver(){
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
        scoreBoard.innerHTML = (" Game Over " + (score))  
         if (confirm ('Game Over. Press ok to restart')){
            window.location = '/'
        }  
        return 
    }

    
    
})