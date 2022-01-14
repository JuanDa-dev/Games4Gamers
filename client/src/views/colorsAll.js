import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socket from "../components/socket";
import '../CSS/colorsAll.css'

const ColorsAll = () => {
    let { roomID } = useParams();
    const isAdmin = window.location.hash === "#init";
    const rival = useRef();

    useEffect(() => {
        if (isAdmin) {
            socket.emit('create-room', { id: socket.id, roomID });
        } else {
            socket.emit('join-room', { id: socket.id, roomID });
        }
        socket.on('first-user', user => { rival.current = user; });
        socket.on('second-user', user => { rival.current = user; });
        socket.on('change-color', id => {
            const rect = document.getElementById('rectangle' + id);
            rect.style.background = 'red';
        })
    }, []);

    const elements = () => {
        const keys = []
        for (var i = 0; i < 40; i++) {
            keys.push(i);
        }
        return keys;
    }

    const changeColor = (id) => {
        const rect = document.getElementById('rectangle' + id);
        rect.style.background = 'blue';
        socket.emit('change-color', { id, signal: rival.current.id });
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