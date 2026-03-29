import type { Item } from '$lib/types';
import { LOCATIONS } from '$lib/types';

function parseCSVLine(line: string): string[] {
	const fields: string[] = [];
	let current = '';
	let inQuotes = false;

	for (let i = 0; i < line.length; i++) {
		const char = line[i];
		if (inQuotes) {
			if (char === '"' && line[i + 1] === '"') {
				current += '"';
				i++;
			} else if (char === '"') {
				inQuotes = false;
			} else {
				current += char;
			}
		} else {
			if (char === '"') {
				inQuotes = true;
			} else if (char === ',') {
				fields.push(current);
				current = '';
			} else {
				current += char;
			}
		}
	}
	fields.push(current);
	return fields;
}

export function importCSV(file: File): Promise<Item[]> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			try {
				let text = reader.result as string;
				// BOM除去
				if (text.charCodeAt(0) === 0xfeff) {
					text = text.slice(1);
				}

				const lines = text.split(/\r?\n/).filter((line) => line.trim() !== '');
				if (lines.length < 2) {
					reject(new Error('CSVファイルにデータがありません。'));
					return;
				}

				// ヘッダー行スキップ
				const dataLines = lines.slice(1);
				const locations = LOCATIONS as readonly string[];
				const now = new Date().toISOString();

				const items: Item[] = [];
				for (const line of dataLines) {
					const fields = parseCSVLine(line);
					if (fields.length < 3) continue;

					const name = fields[0].trim();
					if (!name) continue;

					const location = locations.includes(fields[1]?.trim()) ? fields[1].trim() : 'その他';
					const memo = fields[2]?.trim() ?? '';
					const createdAt = fields[3]?.trim() || now;
					const updatedAt = fields[4]?.trim() || now;

					items.push({
						id: crypto.randomUUID(),
						name,
						location,
						memo,
						createdAt,
						updatedAt
					});
				}

				if (items.length === 0) {
					reject(new Error('インポートできるアイテムがありませんでした。'));
					return;
				}

				resolve(items);
			} catch {
				reject(new Error('CSVファイルの読み込みに失敗しました。'));
			}
		};
		reader.onerror = () => reject(new Error('ファイルの読み込みに失敗しました。'));
		reader.readAsText(file);
	});
}
