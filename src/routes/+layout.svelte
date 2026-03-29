<script lang="ts">
	import '../app.css';
	import { base } from '$app/paths';

	let { children } = $props();
</script>

<div class="app">
	<header>
		<a href="{base}/" class="logo">もちものメモ</a>
	</header>

	<main>
		{@render children()}
	</main>

	<nav>
		<a href="{base}/" class="nav-item">
			<span class="nav-icon">📋</span>
			<span>一覧</span>
		</a>
		<a href="{base}/add" class="nav-item">
			<span class="nav-icon">➕</span>
			<span>追加</span>
		</a>
		<a href="{base}/settings" class="nav-item">
			<span class="nav-icon">⚙</span>
			<span>設定</span>
		</a>
	</nav>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100dvh;
	}

	header {
		background: var(--color-primary);
		color: white;
		padding: 0.75rem 1rem;
		position: sticky;
		top: 0;
		z-index: 10;
		box-shadow: var(--shadow);
	}

	.logo {
		color: white;
		font-size: 1.15rem;
		font-weight: 700;
	}

	main {
		flex: 1;
		padding: 1rem;
		padding-bottom: calc(60px + 1rem);
		max-width: 600px;
		width: 100%;
		margin: 0 auto;
	}

	nav {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		background: var(--color-surface);
		border-top: 1px solid var(--color-border);
		z-index: 10;
	}

	.nav-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 2px;
		padding: 0.5rem;
		font-size: 0.7rem;
		color: var(--color-text-secondary);
		min-height: 52px;
		justify-content: center;
	}

	.nav-icon {
		font-size: 1.25rem;
	}
</style>
