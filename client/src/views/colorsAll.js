import { useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../components/socket";
import '../CSS/colorsAll.css'
import Swal from 'sweetalert2';

const ColorsAll = () => {
    let { roomID } = useParams();
    let navigate = useNavigate();
    const isAdmin = window.location.hash === "#init";
    const rival = useRef();

    useEffect(() => {
        if (isAdmin) {
            socket.emit('create-room', { id: socket.id, roomID });
        } else {
            socket.emit('join-room', { id: socket.id, roomID });
        }
    }, []);

    useEffect(() => {
        const handler = user => { rival.current = user; };
        socket.on('rival', handler);

        return () => {
            socket.off('rival', handler);
        }
    }, []);

    useEffect(() => {
        const handler = id => {
            const rect = document.getElementById('rectangle' + id);
            rect.style.background = 'red';
            gameOver();
        }
        socket.on('change-color', handler);

        return () => {
            socket.off('change-color', handler);
        }
    }, []);

    const elements = () => {
        const keys = []
        for (var i = 0; i < 40; i++) {
            keys.push(i);
        }
        return keys;
    }

    const changeColor = (id) => {
        if (rival.current) {
            const rect = document.getElementById('rectangle' + id);
            rect.style.background = 'blue';
            socket.emit('change-color', { id, signal: rival.current.id });
            gameOver();
        } else {
            Swal.fire("rival not found");
        }
    }

    const gameOver = () => {
        const rectangles = Array.from(document.querySelectorAll('.rectangle'));
        const rectanglesPlayer = rectangles.filter(e => e.style.background === 'blue');
        const rectanglesRival = rectangles.filter(e => e.style.background === 'red');
        if (rectangles.length == rectanglesPlayer.length || rectangles.length == rectanglesRival.length) {
            Swal.fire({
                title: "Game Over",
                confirmButtonText: 'Accept',
            }).then(result => {
                navigate('/');
            })
        }
    }

    return (
        <div className="row content">
            <div id="rectangles" className="col-md-9">
                {elements().map((element) => {
                    return (
                        <div key={element} className="rectangle" id={"rectangle" + element}
                            onMouseEnter={() => { changeColor(element) }}></div>
                    );
                })}
            </div>
            <div className="col-md-3"></div>
        </div>
    );
}

export default ColorsAll;