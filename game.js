//Node.js game server
var util = require("util"),
    io = require("socket.io");
    var socket,
    players;

Player = require("./Player").Player;


    function init() {
    players = [];
	};

init();
socket = io.listen(8000);
socket.configure(function() {
    socket.set("transports", ["websocket"]);
    socket.set("log level", 2);
});

setEventHandlers();

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(client) {
    //util.log("New player has connected: "+client.id);
    
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer); //wait for  "new player" emit from client
    client.on("move player", onMovePlayer);
};

function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

function onNewPlayer(data) {
	 console.log("New player has connected: "+this.id);
var newPlayer = new Player(data.x, data.y);
newPlayer.id = this.id;
players.push(newPlayer);
//send this message to every player
var i, existingPlayer;
for (i = 0; i < players.length; i++) {
    existingPlayer = players[i];
    this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
};

//save this play to local 


};

function onMovePlayer(data) {

};


