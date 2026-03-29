<script lang="ts">
	import { addItem } from '$lib/stores/items';
	import { LOCATIONS } from '$lib/types';

	let name = $state('');
	let location = $state(LOCATIONS[0]);
	let memo = $state('');
	let toast = $state('');
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (!name.trim()) return;
		addItem(name.trim(), location, memo.trim());
		toast = `「${name.trim()}」を登録しました`;
		name = '';
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => (toast = ''), 2500);
	}
</script>

<svelte:head>
	<title>アイテム追加 - もちものメモ</title>
</svelte:head>

<h2 class="page-title">アイテムを追加</h2>

<form onsubmit={handleSubmit}>
	<div class="field">
		<label for="name">名前 <span class="required">*</span></label>
		<input id="name" type="text" bind:value={name} placeholder="例: 懐中電灯" required />
	</div>

	<div class="field">
		<label for="location">場所</label>
		<select id="location" bind:value={location}>
			{#each LOCATIONS as loc}
				<option value={loc}>{loc}</option>
			{/each}
		</select>
	</div>

	<div class="field">
		<label for="memo">メモ</label>
		<textarea id="memo" bind:value={memo} placeholder="例: 2段目の棚の奥"></textarea>
	</div>

	{#if toast}
		<div class="toast">{toast}</div>
	{/if}

	<button type="submit" class="btn-primary" disabled={!name.trim()}>登録</button>
</form>

<style>
	.page-title {
		font-size: 1.1rem;
		margin-bottom: 1.25rem;
	}

	.field {
		margin-bottom: 1rem;
	}

	label {
		display: block;
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 0.3rem;
		color: var(--color-text-secondary);
	}

	.required {
		color: var(--color-danger);
	}

	.btn-primary {
		width: 100%;
		background: var(--color-primary);
		color: white;
		font-weight: 600;
		margin-top: 0.5rem;
	}

	.btn-primary:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.toast {
		background: var(--color-primary-light);
		color: var(--color-primary-dark);
		padding: 0.6rem 1rem;
		border-radius: var(--radius);
		font-size: 0.85rem;
		margin-bottom: 1rem;
		text-align: center;
	}
</style>
