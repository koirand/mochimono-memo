<script lang="ts">
	import { items, deleteAllItems } from '$lib/stores/items';
	import { exportJSON, exportCSV } from '$lib/utils/export';

	function handleDeleteAll() {
		if (confirm(`すべてのアイテム（${$items.length}件）を削除しますか？\nこの操作は取り消せません。`)) {
			deleteAllItems();
		}
	}
</script>

<svelte:head>
	<title>設定 - もちものメモ</title>
</svelte:head>

<h2 class="page-title">設定</h2>

<section class="section">
	<h3>データエクスポート</h3>
	<p class="description">登録済みアイテム: {$items.length} 件</p>
	<div class="export-buttons">
		<button class="btn" onclick={() => exportJSON($items)} disabled={$items.length === 0}>
			JSONでエクスポート
		</button>
		<button class="btn" onclick={() => exportCSV($items)} disabled={$items.length === 0}>
			CSVでエクスポート
		</button>
	</div>
</section>

<section class="section">
	<h3>データ削除</h3>
	<p class="description">すべてのアイテムを一括で削除します。</p>
	<button class="btn btn-danger" onclick={handleDeleteAll} disabled={$items.length === 0}>
		すべてのアイテムを削除
	</button>
</section>

<section class="section">
	<h3>このアプリについて</h3>
	<p class="description">
		もちものメモは、おうちのもちものを記録するシンプルなメモアプリです。
		データはすべてお使いの端末に保存されます。
	</p>
</section>

<style>
	.page-title {
		font-size: 1.1rem;
		margin-bottom: 1.25rem;
	}

	.section {
		background: var(--color-surface);
		border-radius: var(--radius);
		padding: 1rem;
		margin-bottom: 1rem;
		box-shadow: var(--shadow);
	}

	h3 {
		font-size: 0.95rem;
		margin-bottom: 0.5rem;
	}

	.description {
		font-size: 0.85rem;
		color: var(--color-text-secondary);
		margin-bottom: 0.75rem;
	}

	.export-buttons {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.btn {
		background: var(--color-primary);
		color: white;
		font-weight: 600;
	}

	.btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-danger {
		background: var(--color-danger);
	}

	.btn-danger:disabled {
		background: var(--color-danger);
	}
</style>
