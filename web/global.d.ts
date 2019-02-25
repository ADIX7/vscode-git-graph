import * as GG from "../out/types";

declare global {
	function acquireVsCodeApi(): {
		getState(): WebViewState | null,
		postMessage(message: GG.RequestMessage): void,
		setState(state: WebViewState): void
	};

	var settings: GG.GitGraphViewSettings;

	interface Config {
		autoCenterCommitDetailsView: boolean;
		graphColours: string[];
		graphStyle: 'rounded' | 'angular';
		grid: { x: number, y: number, offsetX: number, offsetY: number };
		initialLoadCommits: number;
		loadMoreCommits: number;
	}

	interface ContextMenuItem {
		title: string;
		onClick: () => void;
	}

	interface ExpandedCommit {
		id: number;
		hash: string;
		srcElem: HTMLElement | null;
		commitDetails: GG.GitCommitDetails | null;
		fileTree: GitFolder | null;
	}

	interface GitFile {
		type: 'file';
		name: string;
		index: number;
	}

	interface GitFolder {
		type: 'folder';
		name: string;
		folderPath: string;
		contents: GitFolderContents;
		open: boolean;
	}

	type GitFolderOrFile = GitFolder | GitFile;
	type GitFolderContents = { [name: string]: GitFolderOrFile };

	interface Line {
		p1: Point;
		p2: Point;
		isCommitted: boolean;
	}

	interface Point {
		x: number;
		y: number;
	}

	interface WebViewState {
		branchOptions: string[];
		commits: GG.GitCommitNode[],
		moreCommitsAvailable: boolean,
		selectedBranch: string | null,
		maxCommits: number,
		showRemoteBranches: boolean,
		expandedCommit: ExpandedCommit | null
	}
}

export as namespace GG;
export = GG;
