"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
//import url = require("url");
//import net = require('net');
//import httpProxy = require('http-proxy');
const tools = require("./server_tools");
const args = process.argv.slice(2);
function readArgsNum(name, def) { const i = args.indexOf(name); return i >= 0 && i < args.length - 1 && tools.isNumeric(args[i + 1]) ? +args[i + 1] : def; }
const port = readArgsNum("-port", 1337);
http.createServer(onRequest).listen(port, () => tools.logInfoG(`Server listening on port ${port}`));
function onRequest(req, res) {
    var _a;
    if ((_a = req.url) === null || _a === void 0 ? void 0 : _a.startsWith("/forward/")) {
        const target = req.url.substr("/forward/".length);
        const isHttps = target.startsWith("https://");
        const clientRequest = (isHttps ? https : http).request(target, res2 => res2.pipe(res));
        req.pipe(clientRequest);
    }
    else
        tools.staticServer("static_user", req, res);
}
//// odesilani mailu pri padu
//// test: setTimeout(() => { const err = new Error("test"); (err as any).inner = new Error("inner"); throw err; }, 1000);
process.on("uncaughtException", (err) => __awaiter(void 0, void 0, void 0, function* () {
    tools.logErr(err);
    //	const error2html = `<pre>${JSON.stringify(err, Object.getOwnPropertyNames(err), 4)}</pre>`.replace(/\\n/g, "<br/>");
    //	await tools.sendMailA(uncaughtExceptionMail, `haccp (${os.hostname()}) uncaught exception`, error2html);
    process.exit(1);
}));
//# sourceMappingURL=server.js.map