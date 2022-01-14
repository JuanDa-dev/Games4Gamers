import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import '../CSS/pingPong.css'
import Phaser from 'phaser'
//import socket from "../components/socket";
import Bootloader from "../phaser/bootloader";
import Scene_play from '../phaser/scenes/scene_play';
import ImageURILoaderPlugin from 'phaser3-rex-plugins/plugins/imageuriloader-plugin.js';

const PingPong = () => {
    let { roomID } = useParams();
    const isAdmin = window.location.hash === "#init";
    const rival = useRef();
    const config = {
        parent: 'container',
        physics: {
            default: 'arcade',
            arcade: {
                debug: false
            }
        },
        plugins: {
            global: [{
                key: 'rexImageURILoader',
                plugin: ImageURILoaderPlugin,
                start: true
            },
                // ...
            ]
        },
        scene: [
            Bootloader,
            Scene_play
        ]
    }

    useEffect(() => {
        new Phaser.Game(config);
        /* if (isAdmin) {
            socket.emit('create-room', { id: socket.id, roomID });
        } else {
            socket.emit('join-room', { id: socket.id, roomID });
        }
        socket.on('first-user', user => { rival.current = user; });
        socket.on('second-user', user => { rival.current = user; }); */
    }, []);

    return (
        <div style={{ padding: '20px', height: '100vh' }} className="row align-items-center">
            <div id='container' className="principal"></div>
        </div>
    );
}

export default PingPong;