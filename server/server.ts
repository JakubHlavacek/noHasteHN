
import http = require("http");
import https = require("https");
//import url = require("url");
//import net = require('net');
//import httpProxy = require('http-proxy');
import tools = require("./server_tools");

const args = process.argv.slice(2);
function readArgsNum(name: string, def: number) { const i = args.indexOf(name); return i >= 0 && i < args.length - 1 && tools.isNumeric(args[i + 1]) ? +args[i + 1] : def; }
const port = readArgsNum("-port", 1337);


http.createServer(onRequest).listen(port, () => tools.logInfoG(`Server listening on port ${port}`));

function onRequest(req: http.IncomingMessage, res: http.ServerResponse) {
	if (req.url?.startsWith("/forward/")) {

		const target = req.url.substr("/forward/".length);
		const isHttps = target.startsWith("https://");
		const clientRequest = (isHttps ? https : http).request(target, res2 => res2.pipe(res));
		req.pipe(clientRequest);

	} else
		tools.staticServer("static_user", req, res);
}






//// odesilani mailu pri padu
//// test: setTimeout(() => { const err = new Error("test"); (err as any).inner = new Error("inner"); throw err; }, 1000);
process.on("uncaughtException", async err => {
	tools.logErr(err);
//	const error2html = `<pre>${JSON.stringify(err, Object.getOwnPropertyNames(err), 4)}</pre>`.replace(/\\n/g, "<br/>");
//	await tools.sendMailA(uncaughtExceptionMail, `haccp (${os.hostname()}) uncaught exception`, error2html);
	process.exit(1);
});
