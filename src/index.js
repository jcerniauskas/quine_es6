import websocket from "websocket";
import http from "http";

const WebSocketServer = websocket.server;

const server = http.createServer(function (request, response) {
    console.log(`${new Date()} Received request for ${request.url}`);
    response.writeHead(404);
    response.end();
});
server.listen(8080, function () {
    console.log(`${new Date()} Server is listening on port 8080`);
});

const wsServer = new WebSocketServer({
    httpServer: server,
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    if (origin.indexOf("chrome-extension://") > -1) {
        return true;
    }
}

wsServer.on("request", request => {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log(`${new Date()} Connection from origin ${request.origin} rejected.`);
        return;
    }

    const connection = request.accept();
    console.log(`${new Date()} Connection accepted.`);
    connection.on("message", message => {
        if (message.type === "utf8") {
            console.log(`Received Message: ${message.utf8Data}`);
            const replacedWhitespaces = message.utf8Data.replace(/\s/g, "$");
            connection.sendUTF(replacedWhitespaces);
        }
    });
    connection.on("close", (reasonCode, description) => {
        console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
    });
});