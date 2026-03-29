export interface Item {
	id: string;
	name: string;
	location: string;
	memo: string;
	createdAt: string;
	updatedAt: string;
}

export const LOCATIONS = [
	'玄関',
	'リビング',
	'キッチン',
	'寝室',
	'洗面所',
	'トイレ',
	'お風呂',
	'クローゼット',
	'物置',
	'ベランダ',
	'その他'
] as const;

export const LOCATION_COLORS: Record<string, string> = {
	玄関: '#8b6914',
	リビング: '#4a9f6e',
	キッチン: '#d4853a',
	寝室: '#7a6aad',
	洗面所: '#3a8fb7',
	トイレ: '#6b8e8e',
	'お風呂': '#5b8bd4',
	クローゼット: '#b07aa1',
	物置: '#888888',
	ベランダ: '#6aaa5a',
	その他: '#999999'
};
