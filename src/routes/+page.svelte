<script lang="ts">
    import { items, deleteItem } from '$lib/stores/items';
    import { LOCATIONS, LOCATION_COLORS } from '$lib/types';
    let searchQuery = $state('');
    let filterLocation = $state('');

    function handleDelete(e: Event, item: { id: string; name: string }) {
        e.preventDefault();
        e.stopPropagation();
        if (confirm(`「${item.name}」を削除しますか？`)) {
            deleteItem(item.id);
        }
    }

    let filteredItems = $derived.by(() => {
        let result = $items;
        if (filterLocation) {
            result = result.filter((item) => item.location === filterLocation);
        }
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            result = result.filter(
                (item) => item.name.toLowerCase().includes(q) || item.memo.toLowerCase().includes(q)
            );
        }
        return result;
    });
</script>

<svelte:head>
    <title>もちものメモ</title>
</svelte:head>

<div class="search-bar">
    <input type="search" placeholder="アイテムを検索..." bind:value={searchQuery} />
</div>

<div class="filter-chips">
    <button class="chip" class:active={filterLocation === ''} onclick={() => (filterLocation = '')}>
        すべて
    </button>
    {#each LOCATIONS as loc}
        <button
            class="chip"
            class:active={filterLocation === loc}
            onclick={() => (filterLocation = filterLocation === loc ? '' : loc)}
            style="--chip-color: {LOCATION_COLORS[loc]}"
        >
            {loc}
        </button>
    {/each}
</div>

{#if filteredItems.length === 0}
    <div class="empty">
        {#if $items.length === 0}
            <p>まだアイテムがありません</p>
            <a href="/add" class="add-link">最初のアイテムを追加する</a>
        {:else}
            <p>該当するアイテムがありません</p>
        {/if}
    </div>
{:else}
    <ul class="item-list">
        {#each filteredItems as item (item.id)}
            <li>
                <a href="/edit/{item.id}" class="item-card">
                    <div class="item-header">
                        <span class="item-name">{item.name}</span>
                        <div class="item-actions">
                            <span
                                class="location-badge"
                                style="background: {LOCATION_COLORS[item.location] ?? '#999'}"
                            >
                                {item.location}
                            </span>
                            <button
                                class="delete-btn"
                                onclick={(e) => handleDelete(e, item)}
                                title="削除">✕</button
                            >
                        </div>
                    </div>
                    {#if item.memo}
                        <p class="item-memo">{item.memo}</p>
                    {/if}
                </a>
            </li>
        {/each}
    </ul>
{/if}

<div class="item-count">
    {filteredItems.length} / {$items.length} 件
</div>

<style>
    .search-bar {
        margin-bottom: 0.75rem;
    }

    .filter-chips {
        display: flex;
        gap: 0.4rem;
        overflow-x: auto;
        padding-bottom: 0.75rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
    }

    .filter-chips::-webkit-scrollbar {
        display: none;
    }

    .chip {
        flex-shrink: 0;
        padding: 0.4rem 0.75rem;
        border-radius: 20px;
        font-size: 0.8rem;
        background: var(--color-surface);
        color: var(--color-text-secondary);
        border: 1px solid var(--color-border);
        min-height: auto;
    }

    .chip.active {
        background: var(--chip-color, var(--color-primary));
        color: white;
        border-color: transparent;
    }

    .item-list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .item-card {
        display: block;
        background: var(--color-surface);
        border-radius: var(--radius);
        padding: 0.85rem 1rem;
        box-shadow: var(--shadow);
        color: inherit;
    }

    .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 0.5rem;
    }

    .item-actions {
        display: flex;
        align-items: center;
        gap: 0.4rem;
        flex-shrink: 0;
    }

    .delete-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 28px;
        height: 28px;
        padding: 0;
        min-height: auto;
        border-radius: 50%;
        background: none;
        color: var(--color-text-secondary);
        font-size: 0.75rem;
    }

    .delete-btn:hover {
        background: #fee;
        color: var(--color-danger);
    }

    .item-name {
        font-weight: 600;
        font-size: 0.95rem;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .location-badge {
        flex-shrink: 0;
        font-size: 0.7rem;
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 10px;
    }

    .item-memo {
        margin-top: 0.35rem;
        font-size: 0.8rem;
        color: var(--color-text-secondary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .empty {
        text-align: center;
        padding: 3rem 1rem;
        color: var(--color-text-secondary);
    }

    .add-link {
        display: inline-block;
        margin-top: 0.75rem;
        background: var(--color-primary);
        color: white;
        padding: 0.6rem 1.2rem;
        border-radius: var(--radius);
        font-size: 0.9rem;
    }

    .item-count {
        text-align: center;
        font-size: 0.75rem;
        color: var(--color-text-secondary);
        margin-top: 1rem;
    }
</style>
