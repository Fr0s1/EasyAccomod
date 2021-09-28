const basePath = 'localhost'
const Backend = {
    url: `http://${basePath}/api/backend`,
    chat_server: `http://${basePath}/api/chat`,
    socketio_endpoint: `ws://${basePath}/api/chat`
}

export { Backend }