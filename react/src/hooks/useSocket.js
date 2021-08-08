import { useRef } from "react";
import io from "socket.io-client"


function useClient(){
    const server = "localhost:5000" // TODO: Server can be removed as a parameter in io() if the socket.io server is hosted on the same server serving the react files. Otherwise, set the string to the domain or ip address of the socket.io server.
    const socket = useRef(io(server))

    function onMove(x,y){
        socket.current.emit("move", {x, y})
    }
    
    socket.current.on('connect', function() {
        socket.current.emit('my event', {data: 'I\'m connected!'});
    });

    return {serverMove: onMove}
}

export default useClient