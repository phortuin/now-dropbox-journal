import App from './components/app/app.svelte';

const app = new App({
	target: document.getElementById('main'),
	props: {
		name: 'world'
	}
});

export default app;
