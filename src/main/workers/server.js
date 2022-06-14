"use strict";
// https://github.com/thanhlmm/electron-multiple-tabs/blob/main/server/src/workers/server.ts
exports.__esModule = true;
var electron_log_1 = require("electron-log");
// TODO: Check is dev to enable source-map-support
// require('source-map-support').install();
process.on('unhandledRejection', function (error) {
    electron_log_1["default"].error('unhandledRejection');
    electron_log_1["default"].error(error);
});
var server_handlers_1 = require("./server-handlers");
var server_ipc_1 = require("./server-ipc");
var version;
electron_log_1["default"].info("Starting IPC server");
electron_log_1["default"].debug(process.argv);
if (process.argv[2] === "--subprocess") {
    version = process.argv[3];
    var socketName = process.argv[4];
    server_ipc_1["default"].init(socketName, server_handlers_1["default"]);
}
else {
    var _a = require("electron"), ipcRenderer = _a.ipcRenderer, app = _a.app;
    version = app.getVersion();
    ipcRenderer.on("set-socket", function (event, _a) {
        var name = _a.name;
        server_ipc_1["default"].init(name, server_handlers_1["default"]);
    });
}
electron_log_1["default"].info("Initiated IPC server v" + version);
