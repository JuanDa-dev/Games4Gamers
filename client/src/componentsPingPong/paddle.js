const SPEED = 0.02

/**
 * This component represent the paddles or rackets of the game.
 */

export default class Paddle {
    constructor(paddleElem) {
        this.paddleElem = paddleElem
        this.reset()
    }

    get position() {
        return parseFloat(
            getComputedStyle(this.paddleElem).getPropertyValue("--position")
        )
    }

    set position(value) {
        this.paddleElem.style.setProperty("--position", value)
    }

    rect() {
        return this.paddleElem.getBoundingClientRect()
    }

    reset() {
        this.position = 50
    }

}