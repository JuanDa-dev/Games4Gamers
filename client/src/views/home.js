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

const Home = () => {
    let navigate = useNavigate();

    const joinRoom = (name) => {
        swal.fire({
            title: "Ingrese el codigo de reunion",
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
        socket.on('room-exists', data => {
            if (data.roomExists) {
                if (data.roomFull) {
                    swal.fire("sala llena");
                } else {
                    navigate(`/${data.name}/${data.roomID}`);
                }
            } else {
                swal.fire("sala inexistente");
            }
        })
    }, []);

    return (
        <div className="up">
            {/* <Fondo></Fondo> */}
            <div className='row content align-items-center justify-content-around'>
                <div className="card col-md-3">
                    <img src={spaceInvadersImg} className="card-img-top" alt="spaceInvaders" />
                    <div className="row card-body justify-content-around">
                        <h5 className="card-title">Space Invaders</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/spaceInvaders" className="btn btn-primary col-md-5">Play</Link>
                    </div>
                </div>
                <div className="card col-md-3">
                    <img src={pingPongImg} className="card-img-top" alt="pingPong" />
                    <div className="row card-body justify-content-around">
                        <h5 className="card-title">Ping Pong</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button onClick={() => { joinRoom('pingPong') }} className="btn btn-primary col-md-5">Join room</button>
                        <button onClick={() => { navigate(`/pingPong/${uuid()}#init`); }} className="btn btn-primary col-md-5">Create room</button>
                    </div>
                </div>
                <div className="card col-md-3">
                    <img src={coloorsAllImg} className="card-img-top" alt="colorsAll" />
                    <div className="row card-body justify-content-around">
                        <h5 className="card-title">Colors All</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button onClick={() => { joinRoom('colorsAll') }} className="btn btn-primary col-md-5">Join room</button>
                        <button onClick={() => { navigate(`/colorsAll/${uuid()}#init`); }} className="btn btn-primary col-md-5">Create room</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;