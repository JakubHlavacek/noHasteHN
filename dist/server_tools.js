"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
//import https = require("https");
const path = require("path");
const url = require("url");
//import { ParsedUrlQuery } from "querystring";
const crypto = require("crypto");
//import pg = require("pg");
//import util = require("util");
//export function isNullOrUndefined<T>(o: T | null | undefined): o is null | undefined { return o === undefined || o === null; }
//export function isNullOrEmpty(s: string | null | undefined): s is null | undefined | "" { return isNullOrUndefined(s) || s.length === 0; }
function parseFloat2(s) { const n = +s; return `${n}` === s ? n : NaN; } // https://stackoverflow.com/questions/17106681/parseint-vs-unary-plus-when-to-use-which
exports.parseFloat2 = parseFloat2;
function isNumeric(n) { return isFinite(+parseFloat2(n)); }
exports.isNumeric = isNumeric;
function pad(num, size) { let s = num + ""; while (s.length < size)
    s = "0" + s; return s; }
exports.pad = pad;
;
function formatDate(d) { return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)} (UTC+${-d.getTimezoneOffset() / 60})`; }
exports.formatDate = formatDate;
// https://adrianmejia.com/blog/2016/08/24/building-a-node-js-static-file-server-files-over-http-using-es6/
// maps file extention to MIME types
const mimeType = {
    ".ico": "image/x-icon",
    ".js": "text/javascript",
    ".json": "application/json",
    ".css": "text/css",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".wav": "audio/wav",
    ".mp3": "audio/mpeg",
    ".svg": "image/svg+xml",
    ".pdf": "application/pdf",
    ".doc": "application/msword",
    ".eot": "appliaction/vnd.ms-fontobject",
    ".ttf": "aplication/font-sfnt"
};
function getMimeType(file) { return mimeType[path.parse(file).ext] || "text/html"; }
function staticServer(staticDir, req, res) {
    const parsedUrl = url.parse(req.url); // parse URL
    // extract URL path
    // Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
    // e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
    const sanitizePath = path.normalize(parsedUrl.pathname).replace(/^(\.\.[\/\\])+/, "");
    const pathname = path.join(__dirname, staticDir, sanitizePath);
    procExists(pathname);
    function procExists(pathname2) {
        fs.exists(pathname2, exist => {
            if (!exist) {
                res.statusCode = 404; // Not Found
                res.end(`File ${sanitizePath} not found!`);
            }
            else
                procDirs(pathname2);
        });
    }
    function procDirs(pathname2) {
        fs.stat(pathname2, (err, stat) => {
            var _a, _b, _c;
            if (err) {
                res.statusCode = 500; // Internal Server Error
                res.end(`Error getting the file: ${err}.`);
            }
            else if (stat.isDirectory())
                procExists(pathname2 + "/index.html");
            else {
                const etag = crypto.createHash("md5").update(`${stat.mtimeMs}`).digest("hex");
                res.setHeader("ETag", etag);
                if ((_c = (_b = (_a = req) === null || _a === void 0 ? void 0 : _a.headers["if-none-match"]) === null || _b === void 0 ? void 0 : _b.indexOf(etag), (_c !== null && _c !== void 0 ? _c : -1)) !== -1) {
                    res.statusCode = 304; // Not Modified
                    res.setHeader("Content-type", getMimeType(pathname2));
                    res.end();
                }
                else
                    sendFile(pathname2, res);
            }
        });
    }
}
exports.staticServer = staticServer;
function sendFile(pathname2, res) {
    fs.readFile(pathname2, (err, data) => {
        if (err) {
            res.statusCode = 500; // Internal Server Error
            res.end(`Error getting the file: ${err}.`);
        }
        else {
            res.setHeader("Content-type", getMimeType(pathname2));
            res.end(data);
        }
    });
}
exports.sendFile = sendFile;
const col = { r: "\x1b[91m", g: "\x1b[92m", c: "\x1b[96m", def: "\x1b[0m", };
function logErr(err) {
    console.error(`${col.r}${formatDate(new Date())}, Error: ${err.message}${col.def}`);
    console.error(err);
    console.trace();
}
exports.logErr = logErr;
function logInfoG(str) {
    console.error(`${col.g}${formatDate(new Date())}: ${str}${col.def}`); // tslint:disable-line:no-console
}
exports.logInfoG = logInfoG;
//# sourceMappingURL=server_tools.js.map