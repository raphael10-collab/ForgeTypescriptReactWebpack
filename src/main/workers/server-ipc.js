"use strict";
// https://github.com/thanhlmm/electron-multiple-tabs/blob/main/server/src/workers/server-ipc.ts
exports.__esModule = true;
var ipc = require('node-ipc');
var electron_log_1 = require("electron-log");
function init(socketName, handlers, buffer) {
    if (buffer === void 0) { buffer = false; }
    ipc.config.id = socketName;
    ipc.config.silent = false;
    ipc.config.logger = electron_log_1["default"].debug;
    ipc.config.rawBuffer = buffer;
    ipc.serve(function () {
        ipc.server.on('message', function (data, socket) {
            var msg = JSON.parse(data);
            var id = msg.id, name = msg.name, args = msg.args;
            if (handlers[name]) {
                handlers[name](args).then(function (result) {
                    ipc.server.emit(socket, 'message', JSON.stringify({ type: 'reply', id: id, result: result }));
                }, function (error) {
                    electron_log_1["default"].verbose('this is error throw to client');
                    electron_log_1["default"].error(error);
                    ipc.server.emit(socket, 'message', JSON.stringify({ type: 'error', id: id, message: error.message }));
                    throw error;
                });
            }
            else {
                console.warn('Unknown method: ' + name);
                ipc.server.emit(socket, 'message', JSON.stringify({ type: 'reply', id: id, result: null }));
            }
        });
    });
    ipc.server.start();
}
exports.init = init;
function send(name, args, option) {
    if (option === void 0) { option = { firestore: false }; }
    ipc.server.broadcast('message', JSON.stringify({ type: 'push', name: name, args: args, option: option }));
}
exports.send = send;
exports["default"] = { init: init, send: send };
