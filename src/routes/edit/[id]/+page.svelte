<script lang="ts">
    import { page } from '$app/stores';
    import { goto } from '$app/navigation';
    import { resolve } from '$app/paths';
    import { getItem, updateItem, deleteItem } from '$lib/stores/items';
    import { LOCATIONS } from '$lib/types';

    const item = $page.params.id ? getItem($page.params.id) : undefined;

    let name = $state(item?.name ?? '');
    let location = $state(item?.location ?? LOCATIONS[0]);
    let memo = $state(item?.memo ?? '');
    let owner = $state(item?.owner ?? '');

    function handleSubmit(e: Event) {
        e.preventDefault();
        if (!item || !name.trim()) return;
        updateItem(item.id, {
            name: name.trim(),
            location,
            memo: memo.trim(),
            owner: owner.trim(),
        });
        goto(resolve('/'));
    }

    function handleDelete() {
        if (!item) return;
        if (confirm(`「${item.name}」を削除しますか？`)) {
            deleteItem(item.id);
            goto(resolve('/'));
        }
    }
</script>

<svelte:head>
    <title>編集 - もちものメモ</title>
</svelte:head>

{#if item}
    <h2 class="page-title">アイテムを編集</h2>

    <form onsubmit={handleSubmit}>
        <div class="field">
            <label for="name">名前 <span class="required">*</span></label>
            <input id="name" type="text" bind:value={name} required />
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
            <textarea id="memo" bind:value={memo}></textarea>
        </div>

        <div class="field">
            <label for="owner">持ち主</label>
            <input id="owner" type="text" bind:value={owner} placeholder="例: 太郎" />
        </div>

        <button type="submit" class="btn-primary" disabled={!name.trim()}>更新</button>
    </form>

    <button class="btn-danger" onclick={handleDelete}>このアイテムを削除</button>

    <div class="meta">
        <p>作成: {new Date(item.createdAt).toLocaleString('ja-JP')}</p>
        <p>更新: {new Date(item.updatedAt).toLocaleString('ja-JP')}</p>
    </div>
{:else}
    <div class="not-found">
        <p>アイテムが見つかりません</p>
        <a href={resolve('/')}>一覧に戻る</a>
    </div>
{/if}

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

    .btn-danger {
        width: 100%;
        background: none;
        color: var(--color-danger);
        border: 1px solid var(--color-danger);
        margin-top: 1rem;
    }

    .meta {
        margin-top: 1.5rem;
        font-size: 0.75rem;
        color: var(--color-text-secondary);
    }

    .not-found {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--color-text-secondary);
    }
</style>
