(function () {
	/* Constants */
	const vscode = acquireVsCodeApi();
	const svgIcons = {
		alert: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.893 1.5c-.183-.31-.52-.5-.887-.5s-.703.19-.886.5L.138 13.499a.98.98 0 0 0 0 1.001c.193.31.53.501.886.501h13.964c.367 0 .704-.19.877-.5a1.03 1.03 0 0 0 .01-1.002L8.893 1.5zm.133 11.497H6.987v-2.003h2.039v2.003zm0-3.004H6.987V5.987h2.039v4.006z"/></svg>',
		branch: '<svg xmlns="http://www.w3.org/2000/svg" width="10" height="16" viewBox="0 0 10 16"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 0 0-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 0 0-1-3.72C.88 1 0 1.89 0 3a2 2 0 0 0 1 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"/></svg>',
		close: '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"/></svg>',
		tag: '<svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16"><path fill-rule="evenodd" d="M7.73 1.73C7.26 1.26 6.62 1 5.96 1H3.5C2.13 1 1 2.13 1 3.5v2.47c0 .66.27 1.3.73 1.77l6.06 6.06c.39.39 1.02.39 1.41 0l4.59-4.59a.996.996 0 0 0 0-1.41L7.73 1.73zM2.38 7.09c-.31-.3-.47-.7-.47-1.13V3.5c0-.88.72-1.59 1.59-1.59h2.47c.42 0 .83.16 1.13.47l6.14 6.13-4.73 4.73-6.13-6.15zM3.01 3h2v2H3V3h.01z"/></svg>',
		loading: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="32" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M10.24 7.4a4.15 4.15 0 0 1-1.2 3.6 4.346 4.346 0 0 1-5.41.54L4.8 10.4.5 9.8l.6 4.2 1.31-1.26c2.36 1.74 5.7 1.57 7.84-.54a5.876 5.876 0 0 0 1.74-4.46l-1.75-.34zM2.96 5a4.346 4.346 0 0 1 5.41-.54L7.2 5.6l4.3.6-.6-4.2-1.31 1.26c-2.36-1.74-5.7-1.57-7.85.54C.5 5.03-.06 6.65.01 8.26l1.75.35A4.17 4.17 0 0 1 2.96 5z"/></svg>',
		openFolder: '<svg xmlns="http://www.w3.org/2000/svg" class="openFolderIcon" viewBox="0 0 30 30"><path d="M 5 4 C 3.895 4 3 4.895 3 6 L 3 9 L 3 11 L 22 11 L 27 11 L 27 8 C 27 6.895 26.105 6 25 6 L 12.199219 6 L 11.582031 4.9707031 C 11.221031 4.3687031 10.570187 4 9.8671875 4 L 5 4 z M 2.5019531 13 C 1.4929531 13 0.77040625 13.977406 1.0664062 14.941406 L 4.0351562 24.587891 C 4.2941563 25.426891 5.0692656 26 5.9472656 26 L 15 26 L 24.052734 26 C 24.930734 26 25.705844 25.426891 25.964844 24.587891 L 28.933594 14.941406 C 29.229594 13.977406 28.507047 13 27.498047 13 L 15 13 L 2.5019531 13 z"/></svg>',
		closedFolder: '<svg xmlns="http://www.w3.org/2000/svg" class="closedFolderIcon" viewBox="0 0 30 30"><path d="M 4 3 C 2.895 3 2 3.895 2 5 L 2 8 L 13 8 L 28 8 L 28 7 C 28 5.895 27.105 5 26 5 L 11.199219 5 L 10.582031 3.9707031 C 10.221031 3.3687031 9.5701875 3 8.8671875 3 L 4 3 z M 3 10 C 2.448 10 2 10.448 2 11 L 2 23 C 2 24.105 2.895 25 4 25 L 26 25 C 27.105 25 28 24.105 28 23 L 28 11 C 28 10.448 27.552 10 27 10 L 3 10 z"/></svg>',
		file: '<svg xmlns="http://www.w3.org/2000/svg" class="fileIcon" viewBox="0 0 30 30"><path d="M24.707,8.793l-6.5-6.5C18.019,2.105,17.765,2,17.5,2H7C5.895,2,5,2.895,5,4v22c0,1.105,0.895,2,2,2h16c1.105,0,2-0.895,2-2 V9.5C25,9.235,24.895,8.981,24.707,8.793z M18,10c-0.552,0-1-0.448-1-1V3.904L23.096,10H18z"/></svg>'
	};
	const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
	const htmlEscapes: { [key: string]: string } = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#x27;', '/': '&#x2F;' };
	const htmlUnescapes: { [key: string]: string } = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#x27;': '\'', '&#x2F;': '/' };
	const htmlEscaper = /[&<>"'\/]/g;
	const htmlUnescaper = /&lt;|&gt;|&amp;|&quot;|&#x27;|&#x2F;/g;
	const refInvalid = /^[-\/].*|[\\" ><~^:?*[]|\.\.|\/\/|\/\.|@{|[.\/]$|\.lock$|^@$/g;
	const expandedCommitHeight = 250;


	/* Classes */
	class Branch {
		private nodes: Node[];
		private lines: Line[];
		private colour: number;
		private end: number;

		constructor(colour: number) {
			this.nodes = [];
			this.lines = [];
			this.colour = colour;
			this.end = 0;
		}

		public addNode(node: Node) {
			this.nodes.push(node);
		}
		public addLine(p1: Point, p2: Point, isCommitted: boolean) {
			this.lines.push({ p1: p1, p2: p2, isCommitted: isCommitted });
		}
		public addLines(lines: Line[]) {
			for (let i = 0; i < lines.length; i++) {
				this.lines.push(lines[i]);
			}
		}
		public isMergeOnly() {
			return this.nodes.length === 2 && this.nodes[0].isMerge() && !this.nodes[0].isOnThisBranch(this) && !this.nodes[1].isOnThisBranch(this);
		}
		public simplifyMergeOnly() {
			let lastParent = this.nodes[0].getLastParent();
			if (lastParent === null) return;

			let connectsToBranch = lastParent.getBranch();
			if (connectsToBranch !== null) {
				connectsToBranch.addLines(this.lines);
			}
		}
		public getColour() {
			return this.colour;
		}
		public getEnd() {
			return this.end;
		}
		public setEnd(end: number) {
			this.end = end;
		}
		public draw(svg: SVGElement, config: Config, expandAt: number) {
			this.simplifyVerticalLines();
			let colour = config.colours[this.colour % config.colours.length], i, x1, y1, x2, y2;
			for (i = 0; i < this.lines.length; i++) {
				x1 = this.lines[i].p1.x * config.grid.x + config.grid.offsetX;
				y1 = this.lines[i].p1.y * config.grid.y + config.grid.offsetY;
				x2 = this.lines[i].p2.x * config.grid.x + config.grid.offsetX;
				y2 = this.lines[i].p2.y * config.grid.y + config.grid.offsetY;
				if (expandAt > -1) {
					if (this.lines[i].p1.y > expandAt) {
						y1 += expandedCommitHeight; y2 += expandedCommitHeight;
					} else if (this.lines[i].p2.y > expandAt) {
						if (x1 < x2) {
							this.drawLine(svg, x2, y1 + config.grid.y, x2, y2 + expandedCommitHeight, this.lines[i].isCommitted ? colour : '#808080', config);
						} else if (x1 > x2) {
							this.drawLine(svg, x1, y1, x1, y2 - config.grid.y + expandedCommitHeight, this.lines[i].isCommitted ? colour : '#808080', config);
							y1 += expandedCommitHeight; y2 += expandedCommitHeight;
						} else {
							y2 += expandedCommitHeight;
						}
					}
				}
				this.drawLine(svg, x1, y1, x2, y2, this.lines[i].isCommitted ? colour : '#808080', config);
			}
		}
		private drawLine(svg: SVGElement, x1: number, y1: number, x2: number, y2: number, colour: string, config: Config) {
			let line1 = document.createElementNS('http://www.w3.org/2000/svg', 'path'), line2 = document.createElementNS('http://www.w3.org/2000/svg', 'path'), path;
			if (x1 === x2) {
				path = 'M ' + x1 + ' ' + y1 + ' L ' + x2 + ' ' + y2;
			} else {
				if (config.graphStyle === 'angular') {
					path = 'M ' + x1 + ' ' + y1 + ' L ' + (x1 < x2 ? (x2 + ' ' + (y2 - config.grid.y * 0.38)) : (x1 + ' ' + (y1 + config.grid.y * 0.38))) + ' L ' + x2 + ' ' + y2;
				} else {
					path = 'M ' + x1 + ' ' + y1 + ' C ' + x1 + ' ' + (y1 + config.grid.y * 0.8) + ' ' + x2 + ' ' + (y2 - config.grid.y * 0.8) + ' ' + x2 + ' ' + y2;
				}
			}

			line1.setAttribute('class', 'shaddow');
			line1.setAttribute('d', path);
			svg.appendChild(line1);

			line2.setAttribute('class', 'line');
			line2.setAttribute('d', path);
			line2.setAttribute('stroke', colour);
			svg.appendChild(line2);
		}
		private simplifyVerticalLines() {
			let i = 0;
			while (i < this.lines.length - 1) {
				if (this.lines[i].p1.x === this.lines[i].p2.x && this.lines[i].p2.x === this.lines[i + 1].p1.x && this.lines[i + 1].p1.x === this.lines[i + 1].p2.x && this.lines[i].p2.y === this.lines[i + 1].p1.y && this.lines[i].isCommitted === this.lines[i + 1].isCommitted) {
					this.lines[i].p2.y = this.lines[i + 1].p2.y;
					this.lines.splice(i + 1, 1);
				} else {
					i++;
				}
			}
		}
	}

	class Node {
		private x: number;
		private y: number;
		private parents: Node[];
		private nextParent: number;
		private onBranch: Branch | null;
		private isCommitted: boolean;
		private isCurrent: boolean;
		private nextX: number;

		constructor(y: number, isCommitted: boolean, isCurrent: boolean) {
			this.x = 0;
			this.y = y;
			this.parents = [];
			this.nextParent = 0;
			this.onBranch = null;
			this.isCommitted = isCommitted;
			this.isCurrent = isCurrent;
			this.nextX = 0;
		}

		public addParent(node: Node) {
			this.parents.push(node);
		}
		public hasParents() {
			return this.parents.length > 0;
		}
		public getNextParent(): Node | null {
			if (this.nextParent < this.parents.length) return this.parents[this.nextParent];
			return null;
		}
		public getLastParent(): Node | null {
			if (this.nextParent < 1) return null;
			return this.parents[this.nextParent - 1];
		}
		public registerParentProcessed() {
			this.nextParent++;
		}
		public isMerge() {
			return this.parents.length > 1;
		}

		public addToBranch(branch: Branch, x: number) {
			branch.addNode(this);
			if (this.onBranch === null) {
				this.onBranch = branch;
				this.x = x;
			}
		}
		public isNotOnBranch() {
			return this.onBranch === null;
		}
		public isOnThisBranch(branch: Branch) {
			return this.onBranch === branch;
		}
		public getBranch() {
			return this.onBranch;
		}

		public getPoint(): Point {
			return { x: this.x, y: this.y };
		}
		public getNextPoint(): Point {
			return { x: this.nextX, y: this.y };
		}
		public getIsCommitted() {
			return this.isCommitted;
		}
		public setNextX(x: number) {
			if (x > this.nextX) this.nextX = x;
		}

		public getColour() {
			return this.onBranch !== null ? this.onBranch.getColour() : 0;
		}
		public draw(svg: SVGElement, config: Config, expandOffset: boolean) {
			if (this.onBranch === null) return;

			let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
			let colour = this.isCommitted ? config.colours[this.onBranch.getColour() % config.colours.length] : '#808080';
			circle.setAttribute('cx', (this.x * config.grid.x + config.grid.offsetX).toString());
			circle.setAttribute('cy', (this.y * config.grid.y + config.grid.offsetY + (expandOffset ? expandedCommitHeight : 0)).toString());
			circle.setAttribute('r', '4');
			if (this.isCurrent) {
				circle.setAttribute('class', 'current');
				circle.setAttribute('stroke', colour);
			} else {
				circle.setAttribute('fill', colour);
			}

			svg.appendChild(circle);
		}
	}

	class GitGraph {
		private branchOptions: string[] = [];
		private commits: GitCommitNode[] = [];
		private selectedBranch: string | null = null;
		private moreCommitsAvailable: boolean = false;
		private showRemoteBranches: boolean = true;
		private expandedCommit: ExpandedCommit | null = null;

		private config: Config;
		private maxCommits: number;
		private nodes: Node[] = [];
		private branches: Branch[] = [];
		private availableColours: number[] = [];
		private graphElem: HTMLElement;
		private tableElem: HTMLElement;
		private branchSelectElem: HTMLSelectElement;
		private showRemoteBranchesElem: HTMLInputElement;

		constructor(config: Config, prevState: any) {
			this.config = config;
			this.maxCommits = config.initialLoadCommits;
			this.graphElem = document.getElementById('commitGraph')!;
			this.tableElem = document.getElementById('commitTable')!;
			this.branchSelectElem = <HTMLSelectElement>document.getElementById('branchSelect')!;
			this.showRemoteBranchesElem = <HTMLInputElement>document.getElementById('showRemoteBranchesCheckbox')!;

			this.branchSelectElem.addEventListener('change', () => {
				this.selectedBranch = this.branchSelectElem.value;
				this.maxCommits = this.config.initialLoadCommits;
				this.expandedCommit = null;
				this.saveState();
				this.renderShowLoading();
				this.requestLoadCommits();
			});
			this.showRemoteBranchesElem.addEventListener('change', () => {
				this.showRemoteBranches = this.showRemoteBranchesElem.checked;
				this.saveState();
				this.refresh();
			});
			document.getElementById('refreshBtn')!.addEventListener('click', () => {
				this.refresh();
			});

			this.renderShowLoading();
			if (prevState) {
				if (typeof prevState.selectedBranch !== 'undefined') {
					this.selectedBranch = prevState.selectedBranch;
				}
				if (typeof prevState.showRemoteBranches !== 'undefined') {
					this.showRemoteBranches = prevState.showRemoteBranches;
					this.showRemoteBranchesElem.checked = this.showRemoteBranches;
				}
				if (typeof prevState.maxCommits !== 'undefined') {
					this.maxCommits = prevState.maxCommits;
				}
				if (typeof prevState.expandedCommit !== 'undefined') {
					this.expandedCommit = prevState.expandedCommit;
				}
				if (typeof prevState.commits !== 'undefined') {
					this.loadCommits(prevState.commits, prevState.moreCommitsAvailable);
				}
				if (typeof prevState.branchOptions !== 'undefined') {
					this.loadBranchOptions(prevState.branchOptions, false);
				}
			}
			this.requestLoadBranchOptions();
		}

		/* Loading Data */
		public loadBranchOptions(branchOptions: string[], reloadCommits: boolean) {
			this.branchOptions = branchOptions;
			if (this.selectedBranch !== null && this.branchOptions.indexOf(this.selectedBranch) === -1) this.selectedBranch = '';
			this.saveState();

			let html = '<option' + (this.selectedBranch === null || this.selectedBranch === '' ? ' selected' : '') + ' value="">Show All</option>';
			for (let i = 0; i < this.branchOptions.length; i++) {
				html += '<option value="' + this.branchOptions[i] + '"' + (this.selectedBranch === this.branchOptions[i] ? ' selected' : '') + '>' + (this.branchOptions[i].indexOf('remotes/') === 0 ? this.branchOptions[i].substring(8) : this.branchOptions[i]) + '</option>';
			}
			this.branchSelectElem.innerHTML = html;
			if (reloadCommits) this.requestLoadCommits();
		}
		public loadCommits(commits: GitCommitNode[], moreAvailable: boolean) {
			this.moreCommitsAvailable = moreAvailable;
			this.commits = commits;
			this.saveState();

			this.nodes = [];
			this.branches = [];
			this.availableColours = [];

			let i: number, j: number, expandedCommitVisible = false;
			for (i = 0; i < this.commits.length; i++) {
				this.nodes.push(new Node(i, this.commits[i].hash !== '*', this.commits[i].current));
				if (this.expandedCommit !== null && this.expandedCommit.hash === this.commits[i].hash) expandedCommitVisible = true;
			}
			for (i = 0; i < this.commits.length; i++) {
				for (j = 0; j < this.commits[i].parents.length; j++) {
					this.nodes[i].addParent(this.nodes[this.commits[i].parents[j]]);
				}
			}

			while ((i = this.findStart()) !== -1) {
				this.determinePath(i);
			}

			if (this.expandedCommit !== null && !expandedCommitVisible) {
				this.expandedCommit = null;
				this.saveState();
			}
			this.render();
		}

		/* Refresh */
		public refresh() {
			if (this.expandedCommit !== null) {
				this.expandedCommit = null;
				this.saveState();
			}
			this.renderShowLoading();
			this.requestLoadBranchOptions();
		}

		/* Requests */
		private requestLoadBranchOptions() {
			sendMessage({ command: 'loadBranches', data: { showRemoteBranches: this.showRemoteBranches } });
		}
		private requestLoadCommits() {
			sendMessage({
				command: 'loadCommits',
				data: {
					branch: (this.selectedBranch !== null ? this.selectedBranch : ''),
					maxCommits: this.maxCommits,
					showRemoteBranches: this.showRemoteBranches,
					currentBranch: this.branchOptions.length > 0 ? this.branchOptions[0] : null
				}
			});
		}

		/* State */
		private saveState() {
			vscode.setState({
				branchOptions: this.branchOptions,
				commits: this.commits,
				moreCommitsAvailable: this.moreCommitsAvailable,
				selectedBranch: this.selectedBranch,
				maxCommits: this.maxCommits,
				showRemoteBranches: this.showRemoteBranches,
				expandedCommit: this.expandedCommit
			});
		}

		/* Graph Generation */
		private determinePath(startAt: number) {
			let i = startAt;
			let branch = new Branch(this.getAvailableColour(startAt));
			let node = this.nodes[i], parentNode = this.nodes[i].getNextParent();
			let lastPoint = node.isNotOnBranch() ? node.getNextPoint() : node.getPoint(), curPoint;

			node.setNextX(lastPoint.x + 1);
			node.addToBranch(branch, lastPoint.x);
			for (i = startAt + 1; i < this.nodes.length; i++) {
				curPoint = parentNode === this.nodes[i] && !parentNode.isNotOnBranch() ? this.nodes[i].getPoint() : this.nodes[i].getNextPoint();
				branch.addLine(lastPoint, curPoint, node.getIsCommitted());
				lastPoint = curPoint;
				this.nodes[i].setNextX(curPoint.x + 1);

				if (parentNode === this.nodes[i]) {
					node.registerParentProcessed();
					let parentNodeOnBranch = !parentNode.isNotOnBranch();
					parentNode.addToBranch(branch, curPoint.x);
					node = parentNode;
					parentNode = node.getNextParent();
					if (parentNodeOnBranch) break;
				}
			}
			branch.setEnd(i);

			if (branch.isMergeOnly()) {
				branch.simplifyMergeOnly();
			} else {
				this.branches.push(branch);
				this.availableColours[branch.getColour()] = branch.getEnd();
			}
		}
		private findStart() {
			for (let i = 0; i < this.nodes.length; i++) {
				if (this.nodes[i].getNextParent() !== null || this.nodes[i].isNotOnBranch()) return i;
			}
			return -1;
		}
		private getAvailableColour(startAt: number) {
			for (let i = 0; i < this.availableColours.length; i++) {
				if (startAt > this.availableColours[i]) {
					return i;
				}
			}
			this.availableColours.push(0);
			return this.availableColours.length - 1;
		}
		private getWidth() {
			let x = 0, i, p;
			for (i = 0; i < this.nodes.length; i++) {
				p = this.nodes[i].getNextPoint();
				if (p.x > x) x = p.x;
			}
			return x * this.config.grid.x;
		}
		private getHeight() {
			return this.nodes.length * this.config.grid.y + (this.expandedCommit !== null ? expandedCommitHeight : 0);
		}

		/* Renderers */
		private render() {
			this.renderGraph();
			this.renderTable();
		}
		private renderGraph() {
			let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), i;
			svg.setAttribute('width', this.getWidth().toString());
			svg.setAttribute('height', this.getHeight().toString());

			for (i = 0; i < this.branches.length; i++) {
				this.branches[i].draw(svg, this.config, this.expandedCommit !== null ? this.expandedCommit.id : -1);
			}
			for (i = 0; i < this.nodes.length; i++) {
				this.nodes[i].draw(svg, this.config, this.expandedCommit !== null && i > this.expandedCommit.id);
			}

			if (this.graphElem.firstChild) {
				this.graphElem.removeChild(this.graphElem.firstChild);
			}
			this.graphElem.appendChild(svg);
		}
		private renderTable() {
			let html = '<tr><th id="tableHeaderGraphCol">Graph</th><th>Description</th><th>Date</th><th>Author</th><th>Commit</th></tr>', i;
			for (i = 0; i < this.commits.length; i++) {
				let refs = '', message = escapeHtml(this.commits[i].message), date = getCommitDate(this.commits[i].date), j, refName;
				for (j = 0; j < this.commits[i].refs.length; j++) {
					refName = escapeHtml(this.commits[i].refs[j].name);
					refs += '<span class="gitRef ' + this.commits[i].refs[j].type + '" data-name="' + refName + '">' + (this.commits[i].refs[j].type === 'tag' ? svgIcons.tag : svgIcons.branch).replace('viewBox', 'class="colour' + this.nodes[i].getColour() + '" viewBox') + refName + '</span>';
				}

				html += '<tr ' + (this.commits[i].hash !== '*' ? 'class="commit" data-hash="' + this.commits[i].hash + '"' : 'class="unsavedChanges"') + ' data-id="' + i + '"><td></td><td>' + refs + (this.commits[i].hash !== '*' ? message : '<b>' + message + '</b>') + '</td><td title="' + date.title + '">' + date.value + '</td><td title="' + escapeHtml(this.commits[i].author + ' <' + this.commits[i].email + '>') + '">' + escapeHtml(this.commits[i].author) + '</td><td title="' + escapeHtml(this.commits[i].hash) + '">' + escapeHtml(this.commits[i].hash.substring(0, 8)) + '</td></tr>';
			}
			if (this.moreCommitsAvailable) {
				html += '<tr><td colspan="5"><div id="loadMoreCommitsBtn" class="roundedBtn">Load More Commits</div></td></tr>';
			}
			this.tableElem.innerHTML = '<table>' + html + '</table>';

			document.getElementById('tableHeaderGraphCol')!.style.padding = '0 ' + Math.round((Math.max(this.getWidth() + 16, 64) - (document.getElementById('tableHeaderGraphCol')!.offsetWidth - 24)) / 2) + 'px';

			if (this.moreCommitsAvailable) {
				document.getElementById('loadMoreCommitsBtn')!.addEventListener('click', () => {
					(<HTMLElement>document.getElementById('loadMoreCommitsBtn')!.parentNode!).innerHTML = '<h2 id="loadingHeader">' + svgIcons.loading + 'Loading ...</h2>';
					this.maxCommits += this.config.loadMoreCommits;
					this.hideCommitDetails();
					this.saveState();
					this.requestLoadCommits();
				});
			}

			if (this.expandedCommit !== null) {
				let elem = null, elems = <HTMLCollectionOf<HTMLElement>>document.getElementsByClassName('commit');
				for (i = 0; i < elems.length; i++) {
					if (this.expandedCommit.hash === elems[i].dataset.hash) {
						elem = elems[i];
						break;
					}
				}
				if (elem === null) {
					this.expandedCommit = null;
					this.saveState();
				} else {
					this.expandedCommit.srcElem = elem;
					this.saveState();
					if (this.expandedCommit.commitDetails !== null && this.expandedCommit.fileTree !== null) {
						this.showCommitDetails(this.expandedCommit.commitDetails, this.expandedCommit.fileTree);
					} else {
						this.loadCommitDetails(elem);
					}
				}
			}

			addListenerToClass('commit', 'contextmenu', (e: Event) => {
				e.stopPropagation();
				let sourceElem = <HTMLElement>(<Element>e.target).closest('.commit')!;
				let hash = sourceElem.dataset.hash!;
				showContextMenu(<MouseEvent>e, [
					{
						title: 'Add Tag',
						onClick: () => {
							showInputDialog('Enter the name of the tag you would like to add to commit <b><i>' + hash.substring(0, 8) + '</i></b>:', '', 'Add Tag', (name: string) => {
								sendMessage({ command: 'addTag', data: { tagName: name, commitHash: hash } });
							}, sourceElem);
						}
					},
					{
						title: 'Create Branch from this Commit',
						onClick: () => {
							showInputDialog('Enter the name of the branch you would like to create from commit <b><i>' + hash.substring(0, 8) + '</i></b>:', '', 'Create Branch', (name: string) => {
								sendMessage({ command: 'createBranch', data: { branchName: name, commitHash: hash } });
							}, sourceElem);
						}
					},
					{
						title: 'Reset current branch to this Commit',
						onClick: () => {
							showSelectDialog('Are you sure you want to reset the <b>current branch</b> to commit <b><i>' + hash.substring(0, 8) + '</i></b>?', 'mixed', [
								{ name: 'Soft - Keep all changes, but reset head', value: 'soft' },
								{ name: 'Mixed - Keep working tree, but reset index', value: 'mixed' },
								{ name: 'Hard - Discard all changes', value: 'hard' }
							], 'Yes, reset', (mode: string) => {
								sendMessage({ command: 'resetToCommit', data: { commitHash: hash, resetMode: <GitResetMode>mode } });
							}, sourceElem);
						}
					},
					{
						title: 'Copy Commit Hash to Clipboard',
						onClick: () => {
							sendMessage({ command: 'copyCommitHashToClipboard', data: hash });
						}
					}
				], sourceElem);
			});
			addListenerToClass('commit', 'click', (e: Event) => {
				let sourceElem = <HTMLElement>(<Element>e.target).closest('.commit')!;
				if (this.expandedCommit !== null && this.expandedCommit.hash === sourceElem.dataset.hash!) {
					this.hideCommitDetails();
				} else {
					this.loadCommitDetails(sourceElem);
				}
			});
			addListenerToClass('gitRef', 'contextmenu', (e: Event) => {
				e.stopPropagation();
				let sourceElem = <HTMLElement>(<Element>e.target).closest('.gitRef')!;
				let refName = unescapeHtml(sourceElem.dataset.name!), menu;
				if (sourceElem.className === 'gitRef tag') {
					menu = [{
						title: 'Delete Tag',
						onClick: () => {
							showConfirmationDialog('Are you sure you want to delete the tag <b><i>' + escapeHtml(refName) + '</i></b>?', () => {
								sendMessage({ command: 'deleteTag', data: refName });
							}, null);
						}
					}];
				} else {
					menu = [{
						title: 'Checkout Branch',
						onClick: () => {
							if (sourceElem.className === 'gitRef head') {
								sendMessage({ command: 'checkoutBranch', data: { branchName: refName, remoteBranch: null } });
							} else if (sourceElem.className === 'gitRef remote') {
								let refNameComps = refName.split('/');
								showInputDialog('Enter the name of the new branch you would like to create when checking out <b><i>' + escapeHtml(sourceElem.dataset.name!) + '</i></b>:', refNameComps[refNameComps.length - 1], 'Checkout Branch', (newBranch) => {
									sendMessage({ command: 'checkoutBranch', data: { branchName: newBranch, remoteBranch: refName } });
								}, null);
							}
						}
					}];
					if (sourceElem.className === 'gitRef head') {
						menu.push({
							title: 'Rename Branch',
							onClick: () => {
								showInputDialog('Enter the new name for branch <b><i>' + escapeHtml(refName) + '</i></b>:', refName, 'Rename Branch', (newName) => {
									sendMessage({ command: 'renameBranch', data: { oldName: refName, newName: newName } });
								}, null);
							}
						});
						menu.push({
							title: 'Delete Branch',
							onClick: () => {
								showCheckboxDialog('Are you sure you want to delete the branch <b><i>' + escapeHtml(refName) + '</i></b>?', 'Force Delete', 'Delete Branch', (forceDelete) => {
									sendMessage({ command: 'deleteBranch', data: { branchName: refName, forceDelete: forceDelete } });
								}, null);
							}
						});
					}
				}
				showContextMenu(<MouseEvent>e, menu, sourceElem);
			});
		}
		private renderShowLoading() {
			if (this.graphElem.firstChild) {
				this.graphElem.removeChild(this.graphElem.firstChild);
			}
			this.tableElem.innerHTML = '<table><tr><th id="tableHeaderGraphCol">Graph</th><th>Description</th><th>Date</th><th>Author</th><th>Commit</th></tr></table><h2 id="loadingHeader">' + svgIcons.loading + 'Loading ...</h2>';
		}

		/* Commit Details */
		private loadCommitDetails(sourceElem: HTMLElement) {
			this.hideCommitDetails();
			this.expandedCommit = { id: parseInt(sourceElem.dataset.id!), hash: sourceElem.dataset.hash!, srcElem: sourceElem, commitDetails: null, fileTree: null };
			this.saveState();
			sendMessage({ command: 'commitDetails', data: sourceElem.dataset.hash! });
		}
		public hideCommitDetails() {
			if (this.expandedCommit !== null) {
				let elem = document.getElementById('commitDetails');
				if (typeof elem === 'object' && elem !== null) elem.remove();
				if (typeof this.expandedCommit.srcElem === 'object' && this.expandedCommit.srcElem !== null) this.expandedCommit.srcElem.classList.remove('commitDetailsOpen');
				this.expandedCommit = null;
				this.saveState();
				this.renderGraph();
			}
		}
		public showCommitDetails(commitDetails: GitCommitDetails, fileTree: GitFolder) {
			if (this.expandedCommit === null || this.expandedCommit.srcElem === null || this.expandedCommit.hash !== commitDetails.hash) return;
			let elem = document.getElementById('commitDetails');
			if (typeof elem === 'object' && elem !== null) elem.remove();

			this.expandedCommit.commitDetails = commitDetails;
			this.expandedCommit.fileTree = fileTree;
			this.expandedCommit.srcElem.classList.add('commitDetailsOpen');
			this.saveState();

			let newElem = document.createElement('tr'), html = '<td></td><td colspan="4"><div id="commitDetailsSummary">';
			html += '<b>Commit: </b>' + escapeHtml(commitDetails.hash) + '<br>';
			html += '<b>Parents: </b>' + commitDetails.parents.join(', ') + '<br>';
			html += '<b>Author: </b>' + escapeHtml(commitDetails.author) + ' &lt;<a href="mailto:' + encodeURIComponent(commitDetails.email) + '">' + escapeHtml(commitDetails.email) + '</a>&gt;<br>';
			html += '<b>Date: </b>' + (new Date(commitDetails.date * 1000)).toString() + '<br>';
			html += '<b>Committer: </b>' + escapeHtml(commitDetails.committer) + '<br><br>';
			html += escapeHtml(commitDetails.body).replace(/\n/g, '<br>') + '</div>';
			html += '<div id="commitDetailsFiles">' + generateGitFileTreeHtml(fileTree, commitDetails.fileChanges) + '</table></div>';
			html += '<div id="commitDetailsClose">' + svgIcons.close + '</div>';
			html += '</td>';

			newElem.id = 'commitDetails';
			newElem.innerHTML = html;

			this.renderGraph();
			insertAfter(newElem, this.expandedCommit.srcElem);

			window.scrollTo(0, newElem.offsetTop + 177 - window.innerHeight / 2);
			document.getElementById('commitDetailsClose')!.addEventListener('click', () => {
				this.hideCommitDetails();
			});
			addListenerToClass('gitFolder', 'click', (e) => {
				let sourceElem = <HTMLElement>(<Element>e.target!).closest('.gitFolder');
				let parent = sourceElem.parentElement!;
				parent.classList.toggle('closed');
				let isOpen = !parent.classList.contains('closed');
				parent.children[0].children[0].innerHTML = isOpen ? svgIcons.openFolder : svgIcons.closedFolder;
				parent.children[1].classList.toggle('hidden');
				alterGitFileTree(this.expandedCommit!.fileTree!, decodeURIComponent(sourceElem.dataset.folderpath!), isOpen);
				this.saveState();
			});
			addListenerToClass('gitFile', 'click', (e) => {
				let sourceElem = <HTMLElement>(<Element>e.target).closest('.gitFile')!;
				if (this.expandedCommit === null || !sourceElem.classList.contains('gitDiffPossible')) return;
				sendMessage({ command: 'viewDiff', data: { commitHash: this.expandedCommit.hash, oldFilePath: decodeURIComponent(sourceElem.dataset.oldfilepath!), newFilePath: decodeURIComponent(sourceElem.dataset.newfilepath!), type: <GitFileChangeType>sourceElem.dataset.type } });
			});
		}
	}


	let gitGraph = new GitGraph({
		grid: { x: 16, y: 24, offsetX: 8, offsetY: 12 },
		colours: settings.graphColours,
		graphStyle: settings.graphStyle,
		initialLoadCommits: settings.initialLoadCommits,
		loadMoreCommits: settings.loadMoreCommits
	}, vscode.getState());


	/* Command Processing */
	window.addEventListener('message', event => {
		const msg: ResponseMessage = event.data;
		switch (msg.command) {
			case 'loadBranches':
				gitGraph.loadBranchOptions(msg.data, true);
				return;
			case 'loadCommits':
				gitGraph.loadCommits(msg.data.commits, msg.data.moreCommitsAvailable);
				break;
			case 'addTag':
				refreshGraphOrDisplayError(msg.data, 'Unable to Add Tag');
				break;
			case 'deleteTag':
				refreshGraphOrDisplayError(msg.data, 'Unable to Delete Tag');
				break;
			case 'copyCommitHashToClipboard':
				if (msg.data === false) showErrorDialog('Unable to Copy Commit Hash to Clipboard', null, null);
				break;
			case 'createBranch':
				refreshGraphOrDisplayError(msg.data, 'Unable to Create Branch');
				break;
			case 'checkoutBranch':
				refreshGraphOrDisplayError(msg.data, 'Unable to Checkout Branch');
				break;
			case 'deleteBranch':
				refreshGraphOrDisplayError(msg.data, 'Unable to Delete Branch');
				break;
			case 'renameBranch':
				refreshGraphOrDisplayError(msg.data, 'Unable to Rename Branch');
				break;
			case 'resetToCommit':
				refreshGraphOrDisplayError(msg.data, 'Unable to Reset to Commit');
				break;
			case 'commitDetails':
				if (msg.data === null) {
					gitGraph.hideCommitDetails();
					showErrorDialog('Unable to load commit details', null, null);
				} else {
					gitGraph.showCommitDetails(msg.data, generateGitFileTree(msg.data.fileChanges));
				}
			case 'viewDiff':
				if (msg.data === false) showErrorDialog('Unable to view diff of file', null, null);
				break;
		}
	});
	function refreshGraphOrDisplayError(status: GitCommandStatus, errorMessage: string) {
		if (status === null) {
			gitGraph.refresh();
		} else {
			showErrorDialog(errorMessage, status, null);
		}
	}
	function sendMessage(msg: RequestMessage) {
		vscode.postMessage(msg);
	}


	/* Dates */
	function getCommitDate(dateVal: number) {
		let date = new Date(dateVal * 1000), value;
		let dateStr = date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
		let timeStr = pad2(date.getHours()) + ':' + pad2(date.getMinutes());

		switch (settings.dateFormat) {
			case 'Date Only':
				value = dateStr;
				break;
			case 'Relative':
				let diff = Math.round((new Date()).getTime() / 1000) - dateVal, unit;
				if (diff < 60) {
					unit = 'second';
				} else if (diff < 3600) {
					unit = 'minute';
					diff /= 60;
				} else if (diff < 86400) {
					unit = 'hour';
					diff /= 3600;
				} else if (diff < 604800) {
					unit = 'day';
					diff /= 86400;
				} else if (diff < 2629800) {
					unit = 'week';
					diff /= 604800;
				} else if (diff < 31557600) {
					unit = 'month';
					diff /= 2629800;
				} else {
					unit = 'year';
					diff /= 31557600;
				}
				diff = Math.round(diff);
				value = diff + ' ' + unit + (diff !== 1 ? 's' : '') + ' ago';
				break;
			default:
				value = dateStr + ' ' + timeStr;
		}
		return { title: dateStr + ' ' + timeStr, value: value };
	}
	function pad2(i: number) {
		return i > 9 ? i : '0' + i;
	}

	/* Utils */
	function generateGitFileTree(gitFiles: GitFileChange[]) {
		let contents: GitFolderContents = {}, i, j, path, cur: GitFolder;
		let files: GitFolder = { type: 'folder', name: '', folderPath: '', contents: contents, open: true };
		for (i = 0; i < gitFiles.length; i++) {
			cur = files;
			path = gitFiles[i].newFilePath.split('/');
			for (j = 0; j < path.length; j++) {
				if (j < path.length - 1) {
					if (typeof cur.contents[path[j]] === 'undefined') {
						contents = {};
						cur.contents[path[j]] = { type: 'folder', name: path[j], folderPath: path.slice(0, j + 1).join('/'), contents: contents, open: true };
					}
					cur = <GitFolder>cur.contents[path[j]];
				} else {
					cur.contents[path[j]] = { type: 'file', name: path[j], index: i };
				}
			}
		}
		return files;
	}
	function generateGitFileTreeHtml(folder: GitFolder, gitFiles: GitFileChange[]) {
		let html = (folder.name !== '' ? '<span class="gitFolder" data-folderpath="' + encodeURIComponent(folder.folderPath) + '"><span class="gitFolderIcon">' + (folder.open ? svgIcons.openFolder : svgIcons.closedFolder) + '</span><span class="gitFolderName">' + folder.name + '</span></span>' : '') + '<ul class="gitFolderContents' + (!folder.open ? ' hidden' : '') + '">', keys = Object.keys(folder.contents), i, gitFile, gitFolder;
		keys.sort((a, b) => folder.contents[a].type === 'folder' && folder.contents[b].type === 'file' ? -1 : folder.contents[a].type === 'file' && folder.contents[b].type === 'folder' ? 1 : folder.contents[a].name < folder.contents[b].name ? -1 : folder.contents[a].name > folder.contents[b].name ? 1 : 0);
		for (i = 0; i < keys.length; i++) {
			if (folder.contents[keys[i]].type === 'folder') {
				gitFolder = <GitFolder>folder.contents[keys[i]];
				html += '<li' + (!gitFolder.open ? ' class="closed"' : '') + '>' + generateGitFileTreeHtml(gitFolder, gitFiles) + '</li>';
			} else {
				gitFile = gitFiles[(<GitFile>(folder.contents[keys[i]])).index];
				html += '<li class="gitFile ' + gitFile.type + (gitFile.additions !== null && gitFile.deletions !== null ? ' gitDiffPossible' : '') + '" data-oldfilepath="' + encodeURIComponent(gitFile.oldFilePath) + '" data-newfilepath="' + encodeURIComponent(gitFile.newFilePath) + '" data-type="' + gitFile.type + '"' + (gitFile.additions === null || gitFile.deletions === null ? ' title="This is a binary file, unable to view diff."' : '') + '><span class="gitFileIcon">' + svgIcons.file + '</span>' + folder.contents[keys[i]].name + (gitFile.type === 'R' ? ' <span class="gitFileRename" title="' + escapeHtml(gitFile.oldFilePath + ' was renamed to ' + gitFile.newFilePath) + '">R</span>' : '') + (gitFile.type !== 'A' && gitFile.type !== 'D' && gitFile.additions !== null && gitFile.deletions !== null ? '<span class="gitFileAddDel">(<span class="gitFileAdditions" title="' + gitFile.additions + ' addition' + (gitFile.additions !== 1 ? 's' : '') + '">+' + gitFile.additions + '</span>|<span class="gitFileDeletions" title="' + gitFile.deletions + ' deletion' + (gitFile.deletions !== 1 ? 's' : '') + '">-' + gitFile.deletions + '</span>)</span>' : '') + '</li>';
			}
		}
		return html + '</ul>';
	}
	function alterGitFileTree(folder: GitFolder, folderPath: string, open: boolean) {
		let path = folderPath.split('/'), i, cur = folder;
		for (i = 0; i < path.length; i++) {
			if (typeof cur.contents[path[i]] !== 'undefined') {
				cur = <GitFolder>cur.contents[path[i]];
				if (i === path.length - 1) {
					cur.open = open;
					return;
				}
			} else {
				return;
			}
		}
	}


	/* HTML Escape / Unescape */
	function escapeHtml(str: string) {
		return str.replace(htmlEscaper, function (match) {
			return htmlEscapes[match];
		});
	}
	function unescapeHtml(str: string) {
		return str.replace(htmlUnescaper, function (match) {
			return htmlUnescapes[match];
		});
	}


	/* DOM Helpers */
	function addListenerToClass(className: string, event: string, eventListener: EventListener) {
		let elems = document.getElementsByClassName(className), i;
		for (i = 0; i < elems.length; i++) {
			elems[i].addEventListener(event, eventListener);
		}
	}
	function insertAfter(newNode: HTMLElement, referenceNode: HTMLElement) {
		referenceNode.parentNode!.insertBefore(newNode, referenceNode.nextSibling);
	}


	/* Context Menu */
	let contextMenu = document.getElementById('contextMenu')!, contextMenuSource: HTMLElement | null = null;
	function showContextMenu(e: MouseEvent, items: ContextMenuItem[], sourceElem: HTMLElement) {
		let html = '', i: number, event = <MouseEvent>e;
		for (i = 0; i < items.length; i++) {
			html += '<li class="contextMenuItem" data-index="' + i + '">' + items[i].title + '</li>';
		}

		hideContextMenuListener();
		contextMenu.style.opacity = '0';
		contextMenu.className = 'active';
		contextMenu.innerHTML = html;
		let bounds = contextMenu.getBoundingClientRect();
		contextMenu.style.left = ((event.pageX - window.pageXOffset) + bounds.width < window.innerWidth ? event.pageX - 2 : event.pageX - bounds.width + 2) + 'px';
		contextMenu.style.top = ((event.pageY - window.pageYOffset) + bounds.height < window.innerHeight ? event.pageY - 2 : event.pageY - bounds.height + 2) + 'px';
		contextMenu.style.opacity = '1';

		addListenerToClass('contextMenuItem', 'click', (e) => {
			e.stopPropagation();
			hideContextMenu();
			items[parseInt((<HTMLElement>(e.target)).dataset.index!)].onClick();
		});

		contextMenuSource = sourceElem;
		contextMenuSource.classList.add('contextMenuActive');
	}
	function hideContextMenu() {
		contextMenu.className = '';
		contextMenu.innerHTML = '';
		contextMenu.style.left = '0px';
		contextMenu.style.top = '0px';
		if (contextMenuSource !== null) {
			contextMenuSource.classList.remove('contextMenuActive');
			contextMenuSource = null;
		}
	}


	/* Dialogs */
	let dialog = document.getElementById('dialog')!, dialogBacking = document.getElementById('dialogBacking')!, dialogMenuSource: HTMLElement | null = null;
	function showConfirmationDialog(message: string, confirmed: () => void, sourceElem: HTMLElement | null) {
		showDialog(message, 'Yes', 'No', () => {
			hideDialog();
			confirmed();
		}, sourceElem);
	}
	function showInputDialog(message: string, defaultValue: string, actionName: string, actioned: (value: string) => void, sourceElem: HTMLElement | null) {
		showDialog(message + '<br><input id="dialogInput" type="text"/>', actionName, 'Cancel', () => {
			if (dialog.className === 'active noInput' || dialog.className === 'active inputInvalid') return;
			let value = dialogInput.value;
			hideDialog();
			actioned(value);
		}, sourceElem);

		let dialogInput = <HTMLInputElement>document.getElementById('dialogInput'), dialogAction = document.getElementById('dialogAction')!;
		if (defaultValue !== '') {
			dialogInput.value = defaultValue;
		} else {
			dialog.className = 'active noInput';
		}
		dialogInput.focus();
		dialogInput.addEventListener('keyup', () => {
			let noInput = dialogInput.value === '', invalidInput = dialogInput.value.match(refInvalid) !== null;
			let newClassName = 'active' + (noInput ? ' noInput' : invalidInput ? ' inputInvalid' : '');
			if (dialog.className !== newClassName) {
				dialog.className = newClassName;
				dialogAction.title = invalidInput ? 'Unable to ' + actionName + ', one or more invalid characters entered.' : '';
			}
		});
	}
	function showCheckboxDialog(message: string, checkboxLabel: string, actionName: string, actioned: (value: boolean) => void, sourceElem: HTMLElement | null) {
		showDialog(message + '<br><label><input id="dialogInput" type="checkbox"/>' + checkboxLabel + '</label>', actionName, 'Cancel', () => {
			let value = (<HTMLInputElement>document.getElementById('dialogInput')).checked;
			hideDialog();
			actioned(value);
		}, sourceElem);
	}
	function showSelectDialog(message: string, defaultValue: string, options: { name: string, value: string }[], actionName: string, actioned: (value: string) => void, sourceElem: HTMLElement | null) {
		let selectOptions = '', i;
		for (i = 0; i < options.length; i++) {
			selectOptions += '<option value="' + options[i].value + '"' + (options[i].value === defaultValue ? ' selected' : '') + '>' + options[i].name + '</option>';
		}
		showDialog(message + '<br><select id="dialogInput">' + selectOptions + '</select>', actionName, 'Cancel', () => {
			let value = (<HTMLSelectElement>document.getElementById('dialogInput')).value;
			hideDialog();
			actioned(value);
		}, sourceElem);
	}
	function showErrorDialog(message: string, reason: string | null, sourceElem: HTMLElement | null) {
		showDialog(svgIcons.alert + 'Error: ' + message + (reason !== null ? '<br><span class="errorReason">' + escapeHtml(reason).split('\n').join('<br>') + '</span>' : ''), null, 'Dismiss', null, sourceElem);
	}
	function showDialog(html: string, actionName: string | null, dismissName: string, actioned: (() => void) | null, sourceElem: HTMLElement | null) {
		dialogBacking.className = 'active';
		dialog.className = 'active';
		dialog.innerHTML = html + '<br>' + (actionName !== null ? '<div id="dialogAction" class="roundedBtn">' + actionName + '</div>' : '') + '<div id="dialogDismiss" class="roundedBtn">' + dismissName + '</div>';
		if (actionName !== null && actioned !== null) document.getElementById('dialogAction')!.addEventListener('click', actioned);
		document.getElementById('dialogDismiss')!.addEventListener('click', hideDialog);

		dialogMenuSource = sourceElem;
		if (dialogMenuSource !== null) dialogMenuSource.classList.add('dialogActive');
	}
	function hideDialog() {
		dialogBacking.className = '';
		dialog.className = '';
		dialog.innerHTML = '';
		if (dialogMenuSource !== null) {
			dialogMenuSource.classList.remove('dialogActive');
			dialogMenuSource = null;
		}
	}

	/* Global Listeners */
	document.addEventListener('keyup', (e) => {
		if (e.key === 'Escape') {
			if (dialog.classList.contains('active')) hideDialog();
			hideContextMenuListener();
		}
	});
	document.addEventListener('click', hideContextMenuListener);
	document.addEventListener('contextmenu', hideContextMenuListener);
	document.addEventListener('mouseleave', hideContextMenuListener);
	function hideContextMenuListener() {
		if (contextMenu.classList.contains('active')) hideContextMenu();
	}
}());