import { useEffect } from "react";
import '../CSS/spaceInvaders.css'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const SpaceInvaders = () => {

    const numbersSquares = 27;
    const initAliens = () => {
        const aliens = []
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 17; j++) {
                aliens.push(5 + j + 27 * i);
            }
        }
        return aliens
    }

    var squares = []
    var alienInvaders = initAliens();

    let shooter = 256;
    let direction = 1
    let invadersId;
    let goingRight = true;
    let aliensRemoved = []
    let results = 0
    let resultsDisplay;
    let navigate = useNavigate()

    const reiniciar = (msg) => {
        Swal.fire({
            title: msg,
            text: 'Do you want to play again?',
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText: 'Aceppt',
            cancelButtonText: 'Cancel',
            allowOutsideClick: false
        }).then(r => {
            if (r.isConfirmed) {
                shooter = 256;
                direction = 1
                aliensRemoved = []
                goingRight = true;
                results = 0
                resultsDisplay.innerHTML = 0;
                remove();
                alienInvaders = initAliens();
                add();
                invadersId = setInterval(moveInvaders, 500);
            } else {
                navigate("/");
            }
        })
    }

    draw();

    useEffect(() => {
        squares = Array.from(document.querySelectorAll('.grid div'));
        resultsDisplay = document.querySelector('.results')
        squares[shooter].classList.add('nave');

        onkeydown = (e) => {
            squares[shooter].classList.remove('nave');
            if (e.key === "ArrowRight") {
                shooter += (shooter % numbersSquares < numbersSquares - 1) ? 1 : 0;
            } else if (e.key === "ArrowLeft") {
                shooter += (shooter % numbersSquares !== 0) ? -1 : 0;
            }
            squares[shooter].classList.add('nave');
        }

        onkeyup = (e) => {
            let laserID;
            let currentLaserIndex = shooter;
            const moveLaser = () => {
                squares[currentLaserIndex].classList.remove('laser');
                currentLaserIndex -= numbersSquares;
                squares[currentLaserIndex].classList.add('laser');

                if (squares[currentLaserIndex].classList.contains('invader')) {
                    squares[currentLaserIndex].classList.remove('laser');
                    squares[currentLaserIndex].classList.remove('invader');
                    squares[currentLaserIndex].classList.add('boom');

                    setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 300)
                    clearInterval(laserID);

                    const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
                    aliensRemoved.push(alienRemoved)
                    results++
                    resultsDisplay.innerHTML = results
                }
                if (currentLaserIndex >= 0 && currentLaserIndex < numbersSquares) {
                    setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 300)
                    clearInterval(laserID);
                }
            }

            if (e.key === "ArrowUp") {
                laserID = setInterval(moveLaser, 100);
            }
        }

        add();
        invadersId = setInterval(moveInvaders, 500);
    }, []);

    function draw() {
        for (let i = 0; i < 270; i++) {
            squares.push(i);
        }
    }

    function add() {
        for (let i in alienInvaders) {
            if (!aliensRemoved.includes(parseInt(i))) {
                squares[alienInvaders[i]].classList.add('invader');
            }
        }
    }

    function remove() {
        for (let i in alienInvaders) {
            if (!aliensRemoved.includes(parseInt(i))) {
                squares[alienInvaders[i]].classList.remove('invader');
            }
        }
    }

    function moveInvaders() {
        const leftEdge = alienInvaders[0] % numbersSquares === 0
        const rightEdge = alienInvaders[alienInvaders.length - 1] % numbersSquares === numbersSquares - 1
        remove();

        if (rightEdge && goingRight) {
            for (let i in alienInvaders) {
                alienInvaders[i] += numbersSquares + 1
                direction = -1
                goingRight = false
            }
        }

        if (leftEdge && !goingRight) {
            for (let i in alienInvaders) {
                alienInvaders[i] += numbersSquares - 1
                direction = 1
                goingRight = true
            }
        }

        for (let i in alienInvaders) {
            alienInvaders[i] += direction;
        }

        add();

        if (squares[shooter].classList.contains('invader', 'nave')) {
            clearInterval(invadersId);
            reiniciar('GAME OVER')
        }

        for (let i in alienInvaders) {
            if (alienInvaders[i] > numbersSquares * 9 && !aliensRemoved.includes(parseInt(i))) {
                clearInterval(invadersId);
                reiniciar('GAME OVER')
            }
        }

        if (aliensRemoved.length === alienInvaders.length) {
            clearInterval(invadersId)
            reiniciar('YOU WIN')
        }
    }

    return (
        <>
            <h1 className="results">0</h1>
            <div className="grid">
                {squares.map((square, index) => {
                    return (
                        <div key={index}>
                            <img />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default SpaceInvaders;