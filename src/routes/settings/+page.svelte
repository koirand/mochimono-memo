<script lang="ts">
    import { items, deleteAllItems, setItems } from '$lib/stores/items';
    import { exportCSV } from '$lib/utils/export';
    import { importCSV } from '$lib/utils/import';

    let fileInput: HTMLInputElement;

    function handleDeleteAll() {
        if (
            confirm(
                `すべてのアイテム（${$items.length}件）を削除しますか？\nこの操作は取り消せません。`
            )
        ) {
            deleteAllItems();
        }
    }

    async function handleImport() {
        const file = fileInput?.files?.[0];
        if (!file) return;

        try {
            const newItems = await importCSV(file);
            const message =
                $items.length > 0
                    ? `既存のアイテム（${$items.length}件）をすべて削除して、インポートデータ（${newItems.length}件）に置き換えますか？`
                    : `${newItems.length}件のアイテムをインポートしますか？`;

            if (confirm(message)) {
                setItems(newItems);
                alert(`${newItems.length}件のアイテムをインポートしました。`);
            }
        } catch (e) {
            alert(e instanceof Error ? e.message : 'インポートに失敗しました。');
        }

        fileInput.value = '';
    }
</script>

<svelte:head>
    <title>設定 - もちものメモ</title>
</svelte:head>

<h2 class="page-title">設定</h2>

<section class="section">
    <h3>データエクスポート</h3>
    <p class="description">登録済みアイテム: {$items.length} 件</p>
    <button class="btn" onclick={() => exportCSV($items)} disabled={$items.length === 0}>
        CSVでエクスポート
    </button>
</section>

<section class="section">
    <h3>データインポート</h3>
    <p class="description">エクスポートしたCSVファイルからアイテムを復元します。</p>
    <input type="file" accept=".csv" bind:this={fileInput} onchange={handleImport} hidden />
    <button class="btn" onclick={() => fileInput.click()}> CSVからインポート </button>
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
