"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
        value: function (predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1]; // eslint-disable-line prefer-rest-params
            // 5. Let k be 0.
            var k = 0;
            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                    return kValue;
                }
                // e. Increase k by 1.
                k++;
            }
            // 7. Return undefined.
            return undefined;
        },
        configurable: true,
        writable: true
    });
}
// from:https://github.com/jserz/js_piece/blob/master/DOM/ChildNode/remove()/remove().md
[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (item) {
    if (item.hasOwnProperty('remove')) { // eslint-disable-line no-prototype-builtins
        return;
    }
    Object.defineProperty(item, 'remove', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: function remove() {
            if (this.parentNode)
                this.parentNode.removeChild(this);
        }
    });
});
if (!Math.trunc) {
    Math.trunc = function (v) {
        v = +v;
        return !isFinite(v) ? v :
            (v - v % 1) || (v < 0 ? -0 : v === 0 ? v : 0);
    };
}
if (!Math.log10)
    Math.log10 = function (x) { return Math.log(x) * Math.LOG10E; };
function parseFloat2(s) { var n = +s; return "".concat(n) === s ? n : NaN; } // https://stackoverflow.com/questions/17106681/parseint-vs-unary-plus-when-to-use-which
function isNumeric(n) { return isFinite(+parseFloat2(n)); }
function pad(num, size) { var s = num + ""; while (s.length < size)
    s = "0" + s; return s; }
function formatDate(d) { return "".concat(d.getDate(), ". ").concat(d.getMonth() + 1, ". ").concat(d.getFullYear(), " ").concat(d.getHours(), ":").concat(pad(d.getMinutes(), 2), ":").concat(pad(d.getSeconds(), 2), " (UTC+").concat(-d.getTimezoneOffset() / 60, ")"); }
function linInp(x, x1From, x1To, x2From, x2To) { return (x - x1From) / (x1To - x1From) * (x2To - x2From) + x2From; }
function nextDay1(d, step) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + step); }
function range(n) { return Array(n).fill(0).map(function (_, i) { return i; }); }
function setAttr(element, attrs) {
    Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        //if (element.hasAttribute(k) && typeof v === "string")
        //	element.setAttribute(k, v);
        //else
        if (!(k in element))
            console.error("".concat(k, " is not a valid property name, <").concat(element.tagName, " ").concat(k, "={").concat(v, "}>"));
        else if (typeof v === "string")
            element[k] = v;
        else if (typeof v === "number")
            element[k] = v.toString();
        else if (v === null)
            console.error("".concat(v, " is not a valid property value, <").concat(element.tagName, " ").concat(k, "={").concat(v, "}>"));
        else if (typeof v === "object")
            Object.keys(v).forEach(function (k2) {
                if (k2 in element[k])
                    element[k][k2] = v[k2];
                else
                    console.error("".concat(k2, " is not a valid ").concat(k, ", <").concat(element.tagName, " ").concat(k, "={{ ").concat(k2, ": ... }}>"));
            });
        else if (typeof v === "boolean" && typeof element[k] === "boolean")
            element[k] = v;
        else if (typeof v === "function" && ["onclick", "onchange", "ontouchstart", "ontouchend", "onkeypress",].indexOf(k) !== -1)
            element[k] = v;
        else
            console.error("".concat(v, " is not a valid property value, <").concat(element.tagName, " ").concat(k, "={").concat(v, "}>"), v);
    });
}
function setStyle(element, styles) {
    setAttr(element, { style: styles });
}
function setAttrSvg(element, attrs) {
    Object.keys(attrs).forEach(function (k) {
        var v = attrs[k];
        //if (!(k in element))
        //	console.error(`${k} is not a valid property of a <${element.tagName}>`);
        //else
        if (typeof v === "string")
            element.setAttribute(k, v);
        else if (typeof v === "number")
            element.setAttribute(k, v.toString());
        else if (v === null)
            console.error("".concat(v, " is not a valid property value, <").concat(element.tagName, " ").concat(k, "={").concat(v, "}>"));
        else if (typeof v === "object")
            Object.keys(v).forEach(function (k2) {
                if (k2 in element[k])
                    element[k][k2] = v[k2];
                else
                    console.error("".concat(k2, " is not a valid ").concat(k, ", <").concat(element.tagName, " ").concat(k, "={{ ").concat(k2, ": ... }}>"));
            });
        //else if (typeof v === "boolean" && typeof element[k] === "boolean")
        //	element[k] = v;
        //else if (typeof v === "function" && k === "onclick")
        //	element[k] = v;
        else
            console.error("".concat(v, " is not a valid property value, <").concat(element.tagName, " ").concat(k, "={").concat(v, "}>"), v);
    });
}
function ac(element) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    children.forEach(function (c) {
        if (typeof c === "string")
            element.appendChild(document.createTextNode(c));
        else if (typeof c === "number")
            element.appendChild(document.createTextNode(c.toString()));
        else if (c instanceof Node)
            element.appendChild(c);
        else if (c instanceof Array)
            ac.apply(void 0, __spreadArray([element], c, false));
        else
            console.error("".concat(c, " is not a valid child, <").concat(element.tagName, ">{").concat(c, "}</").concat(element.tagName, ">"), c);
    });
    return element;
}
function myCreateElement(tag /* | ((props: any) => U)*/, attrs) {
    var children = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        children[_i - 2] = arguments[_i];
    }
    //if (typeof tag === "function")
    //	return tag({ ...attrs, children });
    if (["svg", "path", "circle", "rect", "polyline", "text", "g", "clipPath", "defs",].indexOf(tag) >= 0) {
        var element = document.createElementNS("http://www.w3.org/2000/svg", tag);
        if (attrs !== null)
            setAttrSvg(element, attrs);
        return ac.apply(void 0, __spreadArray([element], children, false));
    }
    else {
        var element = document.createElement(tag);
        if (attrs !== null)
            setAttr(element, attrs);
        return ac.apply(void 0, __spreadArray([element], children, false));
    }
}
function replaceContent(parent) {
    var newContent = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        newContent[_i - 1] = arguments[_i];
    }
    parent.innerText = "";
    ac(parent, newContent);
}
function toDictionary(arr, keySelector, valueSelector) {
    var ret = {};
    arr.forEach(function (p) { return ret[keySelector(p)] = valueSelector(p); });
    return ret;
}
function isTouchEvent(e) { return e.touches !== undefined; }
function eventPosToElement(e, elem) {
    var rect = elem.getBoundingClientRect();
    var pos = isTouchEvent(e) ? {
        clientX: avg(range(e.touches.length).map(function (i) { return e.touches[i].clientX; })),
        clientY: avg(range(e.touches.length).map(function (i) { return e.touches[i].clientY; }))
    } : e;
    return { x: pos.clientX - rect.left, y: pos.clientY - rect.top };
    function avg(a) { return a.reduce(function (prev, cur) { return prev + cur; }) / a.length; }
}
/// <reference path="csstype.d.ts" />
/// <reference path="react.d.ts" />
/// <reference path="polyfills.ts" />
/// <reference path="tools.tsx" />
/*
    clanek s grafem: http://www.righto.com/2013/11/how-hacker-news-ranking-really-works.html
    https://news.ycombinator.com/best	clanky jsou serazene podle "points"
    https://github.com/HackerNews/API, https://hacker-news.firebaseio.com/v0/item/121003.json?print=pretty
    http://hnapp.com/?q=score>50

    https://hn.algolia.com/?dateEnd=1587317653&dateRange=custom&dateStart=1586712853&page=0&prefix=false&query=&sort=byPopularity&type=story
*/
app();
window.addEventListener('popstate', app);
function app() {
    return __awaiter(this, void 0, void 0, function () {
        function parseDateLocal(s) {
            var a = s.split(/\D/);
            return [0, 1, 2,].every(function (i) { return isNumeric(a[i]); }) ? new Date(+a[0], +a[1] - 1, +a[2]) : new Date(NaN);
        }
        function isDateValid(d) { return d instanceof Date && !isNaN(+d); }
        function auxMove(e) {
            var _a, _b;
            var p = eventPosToElement(e, graph);
            var h = (_b = ((_a = nearestArr[p.x]) !== null && _a !== void 0 ? _a : [])[p.y]) !== null && _b !== void 0 ? _b : null;
            if (h !== lastHighlighted) {
                if (lastHighlighted) {
                    setStyle(lastHighlighted.point, { border: "none" });
                    setStyle(lastHighlighted.tr, { backgroundColor: null });
                }
                if (h) {
                    setStyle(h.point, { border: "1px solid black" });
                    setStyle(h.tr, { backgroundColor: "#ddd" });
                }
                lastHighlighted = h;
            }
            console.log(p.x, p.y);
        }
        var pars, days, from0, from, hitsCount, to, table, graph, div, data, data2, _a, x1, x2, _b, y1, y2, xAxis, yAxis, data3, nearestArr, lastHighlighted;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    pars = toDictionary(window.location.hash.substring(1).split("&").map(function (p) { return p.split("="); }), function (p) { return p[0]; }, function (p) { return p[1]; });
                    days = pars.days !== undefined ? +pars.days : 7;
                    from0 = pars.from !== undefined ? parseDateLocal(pars.from) : new Date(NaN);
                    from = isDateValid(from0) ? from0 : nextDay1(new Date(), -days);
                    hitsCount = 300;
                    to = nextDay1(from, days);
                    div = myCreateElement("div", { style: { backgroundColor: "rgb(246, 246, 239)", margin: "10px 100px", padding: "10px" } },
                        myCreateElement("div", { style: { height: "10px" } }),
                        myCreateElement("div", null,
                            myCreateElement("span", { title: formatDate(from) }, formatDate2(from)),
                            " - ",
                            myCreateElement("span", { title: formatDate(to) }, formatDate2(nextDay1(to, -1)))),
                        myCreateElement("div", { style: { height: "10px" } }),
                        graph = myCreateElement("div", { style: { float: "right", position: "sticky", top: "60px", width: "600px", height: "300px" } }),
                        table = myCreateElement("table", { style: { borderCollapse: "collapse" } },
                            myCreateElement("tr", null,
                                myCreateElement("td", null, "..."))));
                    return [4 /*yield*/, fetch("https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>".concat(from.getTime() / 1000, ",created_at_i<").concat(to.getTime() / 1000, "&hitsPerPage=").concat(hitsCount))];
                case 1: return [4 /*yield*/, (_c.sent()).json()];
                case 2:
                    data = _c.sent();
                    data2 = data.hits.map(function (h) {
                        var _a, _b, _c;
                        return ({
                            url: (_a = h.url) !== null && _a !== void 0 ? _a : "https://news.ycombinator.com/item?id=".concat(h.objectID),
                            urlComments: "https://news.ycombinator.com/item?id=".concat(h.objectID),
                            created_at: new Date(h.created_at_i * 1000),
                            title: (_b = h.title) !== null && _b !== void 0 ? _b : "",
                            points: h.points,
                            num_comments: (_c = h.num_comments) !== null && _c !== void 0 ? _c : 0
                        });
                    });
                    _a = [30, 590,], x1 = _a[0], x2 = _a[1], _b = [282, 10,], y1 = _b[0], y2 = _b[1];
                    xAxis = createTimeAxis(from, to, x1, x2);
                    yAxis = createCommonAxis(Math.min.apply(Math, __spreadArray([100], data2.map(function (h) { return h.points; }), false)), Math.max.apply(Math, __spreadArray([1000], data2.map(function (h) { return h.points; }), false)), y1, y2);
                    data3 = data2.map(function (h) {
                        var tr = myCreateElement("tr", null,
                            myCreateElement("td", null, h.points),
                            myCreateElement("td", { style: { paddingLeft: "10px", whiteSpace: "nowrap" }, title: formatDate(h.created_at) }, formatDate2(h.created_at)),
                            myCreateElement("td", { style: { paddingLeft: "10px" } },
                                myCreateElement("a", { href: h.url }, h.title),
                                " | ",
                                myCreateElement("a", { href: h.urlComments },
                                    h.num_comments,
                                    " comments")));
                        var x = xAxis.toDisp(h.created_at);
                        var y = yAxis.toDisp(h.points) - 1;
                        var point = myCreateElement("a", { href: h.urlComments, className: "point", title: h.title, style: { position: "absolute", left: "".concat(x - 3, "px"), top: "".concat(y - 3, "px"), width: "7px", height: "7px", borderRadius: "100px" } });
                        tr.onmouseenter = function () { return setStyle(point, { border: "1px solid black" }); };
                        tr.onmouseleave = function () { return setStyle(point, { border: "none" }); };
                        //point.onmouseenter = () => setStyle(tr, { backgroundColor: "#ddd", });
                        //point.onmouseleave = () => setStyle(tr, { backgroundColor: null as any as string, });
                        return __assign(__assign({}, h), { tr: tr, point: point, x: x, y: y });
                    });
                    nearestArr = range(600).map(function (x) { return range(300).map(function (y) {
                        if (y > y1)
                            return null;
                        var hNearest = null;
                        var hNearestDist = Infinity;
                        data3.forEach(function (h) {
                            var hNearestDist2 = Math.pow((h.x - x), 2) + Math.pow((h.y - y), 2);
                            if (hNearestDist2 < hNearestDist) {
                                hNearestDist = hNearestDist2;
                                hNearest = h;
                            }
                        });
                        return hNearest;
                    }); });
                    lastHighlighted = null;
                    graph.onmousemove = auxMove;
                    graph.onmouseleave = auxMove;
                    // zobrazeni tabulky
                    replaceContent(table, data3.map(function (h) { return h.tr; }));
                    // zobrazeni grafu
                    ac(graph, myCreateElement("svg", { style: { width: "100%", height: "100%", transform: "translate(-0.5px, -0.5px)", backgroundColor: "#fff", pointerEvents: "none" } },
                        yAxis.linesH(x1, x2),
                        xAxis.linesV(y1, y2),
                        myCreateElement("path", { style: { fill: "none", stroke: "#999" }, d: "M".concat(x1, ",").concat(y1, " H").concat(x2) }),
                        myCreateElement("path", { style: { fill: "none", stroke: "#999" }, d: "M".concat(x1, ",").concat(y1, " V").concat(y2) })), data3.map(function (h) { return h.point; }), xAxis.linesV2(y1, y2), myCreateElement("div", null,
                        a(nextDay1(from, -days), days, myCreateElement("span", null, "<")),
                        " ",
                        a(nextDay1(from, days), days, myCreateElement("span", null, ">")),
                        " ",
                        days === 1 ? a(nextDay1(from, -3), 7, "^") : ""));
                    replaceContent(document.body, div);
                    return [2 /*return*/];
            }
        });
    });
}
function a(from2, days2, text, style) {
    if (style === void 0) { style = {}; }
    return myCreateElement("a", { href: "#from=".concat(from2.getFullYear(), "-").concat(from2.getMonth() + 1, "-").concat(from2.getDate(), "&days=").concat(days2), style: style }, text);
}
//function formatDay(day: Date) { return `${day.getFullYear()}-${pad(day.getMonth() + 1, 2)}-${pad(day.getDate(), 2)}`; }
function formatDate2(d) { return "".concat(d.getDate(), ". ").concat(d.getMonth() + 1, "."); }
function isMonday(d) { return d.getDay() === 1; }
function createTimeAxis(dataFrom, dataTo, dispFrom, dispTo) {
    return { toDisp: toDisp, linesV: linesV, linesV2: linesV2 };
    function toDisp(x) { return linInp(x.getTime(), dataFrom.getTime(), dataTo.getTime(), dispFrom, dispTo); }
    function linesV(y1, y2) {
        var ret = [];
        for (var i = dataFrom; i < dataTo; i = nextDay1(i, 1))
            ret.push(myCreateElement("path", { style: { fill: "none", stroke: isMonday(i) ? "#ccc" : "#eee" }, d: "M".concat(Math.round(toDisp(i)), ",").concat(y1, " V").concat(y2) }));
        //for (let i = dataFrom; i < dataTo; i = nextDay1(i, 1))
        //	ret.push(<text x={Math.round(toDisp(i))} y={y1 + 1} style={{ font: "normal 12px sans-serif", fill: "#666", dominantBaseline: "hanging", }}>{formatDate2(i)}</text>);
        return ret;
    }
    function linesV2(y1, y2) {
        var ret = [];
        for (var i = dataFrom; i < dataTo; i = nextDay1(i, 1))
            ret.push(a(i, 1, formatDate2(i), { position: "absolute", left: "".concat(Math.round(toDisp(i)), "px"), top: "".concat(y1 + 1, "px"), font: "normal 12px sans-serif" }));
        return ret;
    }
}
function createCommonAxis(dataFrom, dataTo, dispFrom, dispTo) {
    return { toDisp: toDisp, linesH: linesH };
    function toDisp(x) { return linInp(trans(x), trans(dataFrom), trans(dataTo), dispFrom - 5, dispTo + 5); }
    function trans(x) { return Math.log(x); }
    function linesH(x1, x2) {
        var ret = [];
        for (var i = 0; i < dataTo; i += 100)
            ret.push(myCreateElement("path", { style: { fill: "none", stroke: i % 1000 === 0 ? "#ccc" : i % 500 === 0 ? "#ddd" : "#eee" }, d: "M".concat(x1, ",").concat(Math.round(toDisp(i)), " H").concat(x2) }));
        [3000, 2000, 1000, 500, 400, 300, 200, 100, 50, 40, 30, 20, 10,].filter(function (i) { return dataFrom <= i && i < dataTo; })
            .forEach(function (i) { return ret.push(myCreateElement("text", { x: x1 - 4, y: toDisp(i), style: { font: "normal 12px sans-serif", fill: "#666", textAnchor: "end", dominantBaseline: "middle" } }, i >= 1000 ? "".concat(i / 1000, "k") : i)); });
        return ret;
    }
}
//# sourceMappingURL=app.js.map