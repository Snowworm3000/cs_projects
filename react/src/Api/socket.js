import io from "socket.io-client"


function startClient(){
    const server = "localhost:5000" // TODO: Server can be removed as a parameter in io() if the socket.io server is hosted on the same server serving the react files. Otherwise, set the string to the domain or ip address of the socket.io server.
    const socket = io(server)

    function onMove(x,y){
        socket.emit("move", {x, y})
    }
    
    socket.on('connect', function() {
        socket.emit('my event', {data: 'I\'m connected!'});
    });

    return {serverMove: onMove}
}

export default startClient