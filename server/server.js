//Configure the server to use the express framework and the body-parser middleware 
require('dotenv').config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

const players = {}
const socketToRoom = {};

app.get('/colorsAll/:roomID')
app.get('/pingPong/:roomID')
app.get('/spaceInvaders')

//Server configuration
//socket.io configuration 
io.on('connection', socket => {

    socket.on('create-room', data => {
        players[data.roomID] = [data];
        socketToRoom[data.id] = data.roomID;
    })

    socket.on('room-exists', data => {
        roomExists = data.roomID in players;
        socket.emit("room-exists", {
            roomExists,
            roomFull: (roomExists) ? (players[data.roomID].lenght == 2) : false,
            roomID: data.roomID,
            name: data.name
        });
    })

    socket.on("join-room", data => {
        players[data.roomID].push(data);
        const user = players[data.roomID][0];
        socket.emit("first-user", user);
        io.to(user.id).emit("second-user", data);
    })

    socket.on('change-color', data => {
        io.to(data.signal).emit('change-color', data.id);
    })

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id]
        let room = players[roomID]
        if (room) {
            room = room.filter(data => data.id !== socket.id);
            players[roomID] = room;
            delete socketToRoom[socket.id];
        }
    })

});

server.listen(process.env.PORT || 3001, () => console.log('server is running on port 3001'));