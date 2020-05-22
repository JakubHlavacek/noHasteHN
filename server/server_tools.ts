import fs = require("fs");
import http = require("http");
//import https = require("https");
import path = require("path");
import url = require("url");
//import { ParsedUrlQuery } from "querystring";
import crypto = require('crypto');
//import pg = require("pg");
//import util = require("util");






//export function isNullOrUndefined<T>(o: T | null | undefined): o is null | undefined { return o === undefined || o === null; }
//export function isNullOrEmpty(s: string | null | undefined): s is null | undefined | "" { return isNullOrUndefined(s) || s.length === 0; }
export function parseFloat2(s: string) { const n = +s; return `${n}` === s ? n : NaN; }	// https://stackoverflow.com/questions/17106681/parseint-vs-unary-plus-when-to-use-which
export function isNumeric(n: string) { return isFinite(+parseFloat2(n)); }
export function pad(num: number | string, size: number) { let s = num + ""; while (s.length < size) s = "0" + s; return s; };
export function formatDate(d: Date) { return `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()} ${d.getHours()}:${pad(d.getMinutes(), 2)}:${pad(d.getSeconds(), 2)} (UTC+${-d.getTimezoneOffset() / 60})`; }




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
function getMimeType(file: string) { return mimeType[path.parse(file).ext] || "text/html"; }
export function staticServer(staticDir: string, req: http.IncomingMessage, res: http.ServerResponse) {
	const parsedUrl = url.parse(req.url!);	// parse URL
	// extract URL path
	// Avoid https://en.wikipedia.org/wiki/Directory_traversal_attack
	// e.g curl --path-as-is http://localhost:9000/../fileInDanger.txt
	const sanitizePath = path.normalize(parsedUrl.pathname!).replace(/^(\.\.[\/\\])+/, "");
	const pathname = path.join(__dirname, staticDir, sanitizePath);
	procExists(pathname);

	function procExists(pathname2: string) {
		fs.exists(pathname2, exist => {
			if (!exist) {
				res.statusCode = 404;	// Not Found
				res.end(`File ${sanitizePath} not found!`);
			} else
				procDirs(pathname2);
		});
	}
	function procDirs(pathname2: string) {
		fs.stat(pathname2, (err, stat) => {
			if (err) {
				res.statusCode = 500;	// Internal Server Error
				res.end(`Error getting the file: ${err}.`);
			} else if (stat.isDirectory())
				procExists(pathname2 + "/index.html");
			else {
				const etag = crypto.createHash("md5").update(`${stat.mtimeMs}`).digest("hex");
				res.setHeader("ETag", etag);

				if ((req?.headers["if-none-match"]?.indexOf(etag) ?? -1) !== -1) {
					res.statusCode = 304;	// Not Modified
					res.setHeader("Content-type", getMimeType(pathname2));
					res.end();
				} else
					sendFile(pathname2, res);
			}
		});
	}
}

export function sendFile(pathname2: string, res: http.ServerResponse) {
	fs.readFile(pathname2, (err, data) => {
		if (err) {
			res.statusCode = 500;	// Internal Server Error
			res.end(`Error getting the file: ${err}.`);
		} else {
			res.setHeader("Content-type", getMimeType(pathname2));
			res.end(data);
		}
	});
}





const col = { r: "\x1b[91m", g: "\x1b[92m", c: "\x1b[96m", def: "\x1b[0m", };
export function logErr(err: Error) {
	console.error(`${col.r}${formatDate(new Date())}, Error: ${err.message}${col.def}`);
	console.error(err);
	console.trace();
}



export function logInfoG(str: string) {
	console.error(`${col.g}${formatDate(new Date())}: ${str}${col.def}`);	// tslint:disable-line:no-console
}





