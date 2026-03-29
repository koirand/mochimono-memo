import { writable } from 'svelte/store';
import type { Item } from '$lib/types';

const STORAGE_KEY = 'mochimono-items';

function loadItems(): Item[] {
	if (typeof localStorage === 'undefined') return [];
	try {
		const data = localStorage.getItem(STORAGE_KEY);
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
}

function saveItems(items: Item[]) {
	if (typeof localStorage === 'undefined') return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

const { subscribe, set, update } = writable<Item[]>(loadItems());

subscribe((items) => {
	saveItems(items);
});

export const items = { subscribe };

export function addItem(name: string, location: string, memo: string): Item {
	const now = new Date().toISOString();
	const item: Item = {
		id: crypto.randomUUID(),
		name,
		location,
		memo,
		createdAt: now,
		updatedAt: now
	};
	update((items) => [item, ...items]);
	return item;
}

export function updateItem(id: string, changes: Partial<Pick<Item, 'name' | 'location' | 'memo'>>) {
	update((items) =>
		items.map((item) =>
			item.id === id
				? { ...item, ...changes, updatedAt: new Date().toISOString() }
				: item
		)
	);
}

export function deleteItem(id: string) {
	update((items) => items.filter((item) => item.id !== id));
}

export function getItem(id: string): Item | undefined {
	let found: Item | undefined;
	const unsubscribe = subscribe((items) => {
		found = items.find((item) => item.id === id);
	});
	unsubscribe();
	return found;
}
