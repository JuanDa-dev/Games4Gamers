import { useEffect } from "react";
import '../CSS/pingPong.css'
import { useNavigate } from 'react-router-dom'
import Ball from "../componentsPingPong/ball";
import Paddle from "../componentsPingPong/paddle";
import Swal from 'sweetalert2'

/**
 *  This is all the logic of the ping pong retro game.
 * @returns {string}
 */

const PingPong = () => {
    let navigate = useNavigate();

    useEffect(() => {
        const ball = new Ball(document.getElementById('ball'));
        const playerPaddle = new Paddle(document.getElementById("player-paddle"))
        const rivalPaddle = new Paddle(document.getElementById("rival-paddle"))
        const playerScoreElem = document.getElementById("player-score")
        const rivalScoreElem = document.getElementById("rival-score")
        rivalScoreElem.textContent = -1;
        const keys = {
            ArrowUp: { paddle: rivalPaddle, value: -5, pressed: false },
            ArrowDown: { paddle: rivalPaddle, value: 5, pressed: false },
            w: { paddle: playerPaddle, value: -5, pressed: false },
            s: { paddle: playerPaddle, value: 5, pressed: false },
        }

        const reiniciar = () => {
            Swal.fire({
                title: 'Game Over',
                text: 'Do you want to play again?',
                showCancelButton: true,
                focusConfirm: false,
                confirmButtonText: 'Aceppt',
                cancelButtonText: 'Cancel',
                allowOutsideClick: false
            }).then(r => {
                if (r.isConfirmed) {
                    playerScoreElem.textContent = 0;
                    rivalScoreElem.textContent = 0;
                    ball.reset();
                    playerPaddle.reset();
                    rivalPaddle.reset();
                    lastTime = null;
                    window.requestAnimationFrame(update);
                } else {
                    navigate("/");
                }
            })
        }

        let lastTime;
        function update(time) {
            if (playerScoreElem.textContent < 10 && rivalScoreElem.textContent < 10) {
                if (lastTime !== null) {
                    const delta = time - lastTime;
                    ball.update(delta, [playerPaddle.rect(), rivalPaddle.rect()]);

                    const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--hue"))
                    document.documentElement.style.setProperty("--hue", hue + (Math.random() * (100 - 8) + 8) * 0.01)

                    if (isLose()) handleLose()
                }

                lastTime = time;
                window.requestAnimationFrame(update);
            } else {
                reiniciar()
            }
        }
        /**
         * This function is used to check if the ball is out of the screen. 
         * @returns {boolean}
         */
        function isLose() {
            const rect = ball.rect()
            return rect.right >= window.innerWidth || rect.left <= 0
        }
        /**
         * This function is used to handle the lose event.
         */
        function handleLose() {
            const rect = ball.rect()
            if (rect.right >= window.innerWidth) {
                playerScoreElem.textContent = parseInt(playerScoreElem.textContent) + 1
            } else {
                rivalScoreElem.textContent = parseInt(rivalScoreElem.textContent) + 1
            }
            ball.reset()
        }

        onkeydown = e => {
            const clave = keys[e.key];
            if (clave) {
                clave.pressed = true;
                for (let key in keys) {
                    const k = keys[key];
                    if (k.pressed && ((k.paddle.position < 95 && k.value > 0) || (k.paddle.position > 5 && k.value < 0))) {
                        k.paddle.position += k.value;
                    }
                }
            }
        }

        onkeyup = e => {
            keys[e.key].pressed = false;;
        }

        window.requestAnimationFrame(update);
    }, []);



    return (
        <div style={{ height: '100vh' }} className="row align-items-center">
            <div id='container' className="principal">
                <div className="score">
                    <div id="player-score">0</div>
                    <div id="rival-score">0</div>
                </div>
                <div className="ball" id="ball"></div>
                <div className="paddle left" id="player-paddle"></div>
                <div className="paddle right" id="rival-paddle"></div>
            </div>
        </div>
    );
}

export default PingPong;