import type { Item } from '$lib/types';

function downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

function getDateString(): string {
    return new Date().toISOString().slice(0, 10);
}

export function exportCSV(items: Item[]) {
    const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const header = '名前,場所,メモ,作成日,更新日';
    const rows = items.map((item) =>
        [item.name, item.location, item.memo, item.createdAt, item.updatedAt].map(escape).join(',')
    );
    const content = '\uFEFF' + [header, ...rows].join('\n');
    downloadFile(content, `mochimono-memo-${getDateString()}.csv`, 'text/csv;charset=utf-8');
}
