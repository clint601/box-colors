class Game {

    constructor() {
        this.countDisplay = document.getElementById('countDisplay')
        this.gameBoard = document.getElementById('gameBoard')
        this.bestScore = document.getElementById('bestScore')
        this.freezeColorDisplay = document.getElementById('freezeColorDisplay')
        this.message = document.getElementById('message')
        this.freezeColor = ''
        this.hasWon = false
        this.gamePlay = false
        this.count = 0
        this.colors = [
            'red', 'blue', 'yellow', 'green', 'purple', 'orange', 'brown', 'gray', 'pink',
        ]
        this.matches = 0
        this.matchDisplay = document.getElementById('matchDisplay')
        
        this.boxes = [
            {
                id: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 4,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 7,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 9,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        ]

        this.scores = {
            currScore: this.count,
            bestScore: 0
        }
    }
    
    init() {
        if (!this.gamePlay) return
        this.getFreezeColor()
        this.makeBoxes()
        this.getMatches()
    }

    makeBoxes() {
        this.boxes.forEach(el => {
            const box = document.createElement('div')
            box.classList.add('box')
            box.setAttribute('id', `box-${el.id}`)
            box.dataset.id = el.id
            box.style.backgroundColor = el.color
            box.style.width = '200px'
            box.style.height = '200px'

            this.addToGameBoard(this.gameBoard, box)
            this.showMatches()
            
            this.changeColor(box, this.boxes)
        })
    }

    getMatches() {
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.freezeColor == this.boxes[i].color) {
                this.matches++
                this.showMatches()
            }
        }
    }

    showMatches() {
        this.matchDisplay.innerText = this.matches
    }

    addToGameBoard(parent, child) {
        return parent.appendChild(child)
    }

    getFreezeColor() {
        this.freezeColor = this.colors[Math.floor(Math.random() * this.colors.length)]

        this.freezeColorDisplay.innerText = this.freezeColor
    }

    changeColor(element, arr) {
        element.addEventListener('click', ()=> {
            // element.style.backgroundColor = this.colors[Math.floor(Math.random()* this.colors.length)]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id == element.dataset.id) {
                    // test freezeColor here
                    if(this.freezeColor != arr[i].color) {
                        this.count++
                        this.scores.currScore = this.count
                        this.countDisplay.innerText = this.count
                        arr[i].color = this.colors[Math.floor(Math.random()* this.colors.length)]

                        element.style.backgroundColor = arr[i].color

                        if (arr[i].color == this.freezeColor) {
                            this.matches++
                            this.showMatches()
                        }
                    }
                }
            }
            this.checkWin()
        })
    }

    checkWin() {
        if (this.matches == 9 && this.gamePlay == true) {
            this.hasWon = !this.hasWon
            this.message.innerText = `You win and it took ${this.count} clicks!`
            this.gameBoard.innerHTML = ''
            this.gamePlay = false
            this.setScore()
        }
    }

    resetGame() {
        this.resetBoxes()
        this.message.innerText = ''
        this.matches = 0
        this.count = 0
        this.countDisplay.innerText = this.count
        this.gamePlay = !this.gamePlay
        this.hasWon = false
        this.init()
    }

    setScore() {
        if (this.count < this.scores.currScore && this.count != 0) {
            bestScore = this.count
        } else {
            bestScore = this.scores.currScore
        }
        

        this.bestScore.innerText = this.scores.bestScore
    }


    resetBoxes() {
        this.boxes = [
            {
                id: 1,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 2,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id: 3,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 4,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 6,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 7,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 8,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            },
            {
                id : 9,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            }
        ]
    }
}

// const action = new Game()

// const startBtn = document.getElementById('startBtn')

// startBtn.addEventListener('click', ()=> action.resetGame())

document.getElementById('startBtn').addEventListener('click', ()=> new Game().resetGame())

