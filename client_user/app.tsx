
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
async function app() {

	const pars = toDictionary(window.location.hash.substring(1).split("&").map(p => p.split("=")), p => p[0], p => p[1]);

	const days = pars.days !== undefined ? +pars.days : 7;
	const from0 = pars.from !== undefined ? parseDateLocal(pars.from) : new Date(NaN);
	const from = isDateValid(from0) ? from0 : nextDay1(new Date(), -days);
	function parseDateLocal(s: string) {
		const a = s.split(/\D/);
		return [0, 1, 2,].every(i => isNumeric(a[i])) ? new Date(+a[0], +a[1] - 1, +a[2]) : new Date(NaN);
	}
	function isDateValid(d: any): d is Date { return d instanceof Date && !isNaN(+d); }
	const hitsCount = 300;
	const to = nextDay1(from, days);

	// rozlozeni stranky
	let table: HTMLElement;
	let graph: HTMLElement;
	const div =
		<div style={{ backgroundColor: "rgb(246, 246, 239)", margin: "10px 100px", padding: "10px", }}>
			<div style={{ height: "10px", }} />
			<div><span title={formatDate(from)}>{formatDate2(from)}</span> - <span title={formatDate(to)}>{formatDate2(nextDay1(to, -1))}</span></div>
			<div style={{ height: "10px", }} />
			{graph = <div style={{ float: "right", position: "sticky", top: "60px", width: "600px", height: "300px", }} />}
			{table = <table style={{ borderCollapse: "collapse", }}><tr><td>...</td></tr></table>}
		</div>;

	// stazeni dat
	const data: TApi = await(await fetch(`https://hn.algolia.com/api/v1/search?tags=story&numericFilters=created_at_i>${from.getTime() / 1000},created_at_i<${to.getTime() / 1000}&hitsPerPage=${hitsCount}`)).json();
	type TApi = {
		hits: {
			title: string | null,
			url: string | null,
			points: number,
			num_comments: number | null,
			created_at_i: number,
			//relevancy_score: number,
			//_tags: string[],
			objectID: string,
		}[];
	};
	const data2 = data.hits.map(h => ({
		url: h.url ?? `https://news.ycombinator.com/item?id=${h.objectID}`,
		urlComments: `https://news.ycombinator.com/item?id=${h.objectID}`,
		created_at: new Date(h.created_at_i * 1000),
		title: h.title ?? "",
		points: h.points,
		num_comments: h.num_comments ?? 0,
	}));

	// vytvoreni elementu
	const [x1, x2,] = [30, 590,], [y1, y2,] = [282, 10,];
	const xAxis = createTimeAxis(from, to, x1, x2);
	const yAxis = createCommonAxis(Math.min(100, ...data2.map(h => h.points)), Math.max(1000, ...data2.map(h => h.points)), y1, y2);
	const data3 = data2.map(h => {
		const tr =
			<tr>
				<td>{h.points}</td>
				<td style={{ paddingLeft: "10px", whiteSpace: "nowrap", }} title={formatDate(h.created_at)}>{formatDate2(h.created_at)}</td>
				<td style={{ paddingLeft: "10px", }}><a href={h.url}>{h.title}</a> | <a href={h.urlComments}>{h.num_comments} comments</a></td>
			</tr>;
		const x = xAxis.toDisp(h.created_at);
		const y = yAxis.toDisp(h.points) - 1;
		const point =
			<a href={h.urlComments} className="point" title={h.title!} style={{ position: "absolute", left: `${x - 3}px`, top: `${y - 3}px`, width: "7px", height: "7px", borderRadius: "100px", }} />;

		tr.onmouseenter = () => setStyle(point, { border: "1px solid black", });
		tr.onmouseleave = () => setStyle(point, { border: "none", });
		//point.onmouseenter = () => setStyle(tr, { backgroundColor: "#ddd", });
		//point.onmouseleave = () => setStyle(tr, { backgroundColor: null as any as string, });

		return { ...h, tr, point, x, y, };
	});

	// voronoi
	const nearestArr = range(600).map(x => range(300).map(y => {
		if (y > y1)
			return null;
		let hNearest: typeof data3[0] | null = null;
		let hNearestDist = Infinity;
		data3.forEach(h => {
			const hNearestDist2 = (h.x - x) ** 2 + (h.y - y) ** 2;
			if (hNearestDist2 < hNearestDist) { hNearestDist = hNearestDist2; hNearest = h; }
		});
		return hNearest as typeof data3[0] | null;
	}));
	let lastHighlighted: typeof data3[0] | null = null;
	function auxMove(e: MouseEvent) {
		const p = eventPosToElement(e, graph);
		const h = (nearestArr[p.x] ?? [])[p.y] ?? null;
		if (h !== lastHighlighted) {
			if (lastHighlighted) {
				setStyle(lastHighlighted.point, { border: "none", });
				setStyle(lastHighlighted.tr, { backgroundColor: null as any as string, });
			}
			if (h) {
				setStyle(h.point, { border: "1px solid black", });
				setStyle(h.tr, { backgroundColor: "#ddd", });
			}
			lastHighlighted = h;
		}
		console.log(p.x, p.y);
	}
	graph.onmousemove = auxMove;
	graph.onmouseleave = auxMove;

	// zobrazeni tabulky
	replaceContent(table, data3.map(h => h.tr));

	// zobrazeni grafu
	ac(graph,
		<svg style={{ width: "100%", height: "100%", transform: "translate(-0.5px, -0.5px)", backgroundColor: "#fff", pointerEvents: "none", }}>
			{yAxis.linesH(x1, x2)}
			{xAxis.linesV(y1, y2)}
			<path style={{ fill: "none", stroke: "#999", }} d={`M${x1},${y1} H${x2}`} />
			<path style={{ fill: "none", stroke: "#999", }} d={`M${x1},${y1} V${y2}`} />
		</svg>,
		data3.map(h => h.point),
		xAxis.linesV2(y1, y2),
		<div>{a(nextDay1(from, -days), days, <span>&lt;</span>)} {a(nextDay1(from, days), days, <span>&gt;</span>)} {days === 1 ? a(nextDay1(from, -3), 7, "^") : ""}</div>
	);

	replaceContent(document.body, div);
}

function a(from2: Date, days2: number, text: TChild, style: React.CSSProperties = {}) {
	return <a href={`#from=${from2.getFullYear()}-${from2.getMonth() + 1}-${from2.getDate()}&days=${days2}`} style={style}>{text}</a>
}




//function formatDay(day: Date) { return `${day.getFullYear()}-${pad(day.getMonth() + 1, 2)}-${pad(day.getDate(), 2)}`; }
function formatDate2(d: Date) { return `${d.getDate()}. ${d.getMonth() + 1}.`; }
function isMonday(d: Date) { return d.getDay() === 1; }

function createTimeAxis(dataFrom: Date, dataTo: Date, dispFrom: number, dispTo: number) {

	return { toDisp, linesV, linesV2, };

	function toDisp(x: Date) { return linInp(x.getTime(), dataFrom.getTime(), dataTo.getTime(), dispFrom, dispTo); }

	function linesV(y1: number, y2: number) {
		const ret: HTMLElement[] = [];
		for (let i = dataFrom; i < dataTo; i = nextDay1(i, 1))
			ret.push(<path style={{ fill: "none", stroke: isMonday(i) ? "#ccc" : "#eee", }} d={`M${Math.round(toDisp(i))},${y1} V${y2}`} />);
		//for (let i = dataFrom; i < dataTo; i = nextDay1(i, 1))
		//	ret.push(<text x={Math.round(toDisp(i))} y={y1 + 1} style={{ font: "normal 12px sans-serif", fill: "#666", dominantBaseline: "hanging", }}>{formatDate2(i)}</text>);
		return ret;
	}

	function linesV2(y1: number, y2: number) {
		const ret: HTMLElement[] = [];
		for (let i = dataFrom; i < dataTo; i = nextDay1(i, 1))
			ret.push(a(i, 1, formatDate2(i), { position: "absolute", left: `${Math.round(toDisp(i))}px`, top: `${y1 + 1}px`, font: "normal 12px sans-serif", }));
		return ret;
	}
}

function createCommonAxis(dataFrom: number, dataTo: number, dispFrom: number, dispTo: number) {

	return { toDisp, linesH, };

	function toDisp(x: number) { return linInp(trans(x), trans(dataFrom), trans(dataTo), dispFrom - 5, dispTo + 5); }
	function trans(x: number) { return Math.log(x); }

	function linesH(x1: number, x2: number) {
		const ret: HTMLElement[] = [];
		for (let i = 0; i < dataTo; i += 100)
			ret.push(<path style={{ fill: "none", stroke: i % 1000 === 0 ? "#ccc" : i % 500 === 0 ? "#ddd" : "#eee", }} d={`M${x1},${Math.round(toDisp(i))} H${x2}`} />);
		[3000, 2000, 1000, 500, 400, 300, 200, 100, 50, 40, 30, 20, 10,].filter(i => dataFrom <= i && i < dataTo)
			.forEach(i => ret.push(<text x={x1 - 4} y={toDisp(i)} style={{ font: "normal 12px sans-serif", fill: "#666", textAnchor: "end", dominantBaseline: "middle", }}>{i >= 1000 ? `${i / 1000}k` : i}</text>));
		return ret;
	}
}
