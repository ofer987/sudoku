<script lang="ts">
	import { Puzzle } from './puzzle';
	import Tile from './Tile.svelte';

	export let puzzle: Puzzle;
	let startingBoard = puzzle.board;

	let state = startingBoard;

	let pageId = 0;
	$: pageUrl = window.location.toString();

	async function recordState(): Promise<void> {
		pageId += 1;
		console.log(`Page Id is ${pageId}`);

		const url = `#${puzzle.toHash}`;
		history.pushState({ pageId: pageId, url: url }, '', url);
		pageUrl = window.location.toString();
	}

	async function copyUrlToClipboard(): Promise<void> {
		const url = window.location.toString();

		await navigator.clipboard.writeText(url);
		alert('Copied URL to Clipboard');
	}
</script>

<div class="puzzle">
	{#each state as value}
		<Tile bind:tile={value} on:numberChanged={recordState} />
	{/each}
</div>

<div class="state">
	<label for="value">Restart from here:<br /></label>
	<input id="value" value={pageUrl} type="text" disabled={true} />
	<input id="button" type="button" value="copy" on:click={copyUrlToClipboard} />
</div>

<div class="results">
	{#if puzzle.isCorrect}
		<div>Correct!</div>
	{:else}
		<div>Not correct yet!</div>
	{/if}
</div>

<style lang="scss">
	.puzzle {
		display: grid;
		grid-gap: 1em;
		grid-template-rows: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		grid-template-columns: 4em 4em 4em 4em 4em 4em 4em 4em 4em;
		/* align-items: center; */
		justify-items: center;
	}

	.state {
		display: flex;
		justify-content: space-between;
		width: 44em;

		#value {
			width: 70%;
		}
	}
</style>
