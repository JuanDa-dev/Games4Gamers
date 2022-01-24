import '../CSS/home.css'
import Fondo from '../components/particles'
import spaceInvadersImg from '../images/spaceInvadersHome.jpg'
import pingPongImg from '../images/pingPongHome.jpg'
import coloorsAllImg from '../images/coloorsAllHome.png'
import { useNavigate, Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import { v1 as uuid } from 'uuid'
import socket from '../components/socket'
import swal from 'sweetalert2'
/**
 *  This is the primary component of the home page. It contains the background image, the buttons to select the others games. 
 * @returns {JSX.Element} 
 */
const Home = () => {
    let navigate = useNavigate();

    const joinRoom = (name) => {
        swal.fire({
            title: "Type the room code",
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            confirmButtonText: 'Accept',
        }).then(result => {
            if (result.value.length > 0) {
                socket.emit('room-exists', { roomID: result.value, name });
            }
        })
    }

    useEffect(() => {
        if (socket== null) return
        const handler = data => {
            if (data.roomExists) {
                if (data.roomFull) {
                    swal.fire("sala llena");
                } else {
                    navigate(`/${data.name}/${data.roomID}`);
                }
            } else {
                swal.fire("sala inexistente");
            }
        }
        socket.on('room-exists', handler)
        return () => {
            socket.off('room-exists', handler)
        }
    }, [socket]);

    return (
        <div className="up">
            <Fondo></Fondo>
            <div className='row content align-items-center justify-content-around'>
                <div className="card col-md-3">
                    <img src={spaceInvadersImg} className="card-img-top" alt="spaceInvaders" />
                    <div className="row card-body justify-content-around">
                        <h5 className="card-title">Space Invaders</h5>
                        <p className="card-text">A magic battle in the space when you need to destroy all the alien's ships that will try to destroy you. Try to survive! </p>
                        <Link to="/spaceInvaders" className="btn btn-primary col-md-5">Play</Link>
                    </div>
                </div>
                <div className="card col-md-3">
                    <img src={pingPongImg} className="card-img-top" alt="pingPong" />
                    <div className="row card-body justify-content-around">
                        <h5 className="card-title">Ping Pong</h5>
                        <p className="card-text">A special remake about the classic retro-game Ping Pong with new a fresh textures</p>
                        <Link to="/pingPong" className="btn btn-primary col-md-5">Play</Link>
                    </div>
                </div>
                <div className="card col-md-3">
                    <img src={coloorsAllImg} className="card-img-top" alt="colorsAll" />
                    <div className="row card-body justify-content-around">
                        <h5 className="card-title">Colors All</h5>
                        <p className="card-text">Try coloring the board before your opponent, the faster will win.</p>
                        <button onClick={() => { joinRoom('colorsAll') }} className="btn btn-primary col-md-5">Join room</button>
                        <button onClick={() => { navigate(`/colorsAll/${uuid()}#init`); }} className="btn btn-primary col-md-5">Create room</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;