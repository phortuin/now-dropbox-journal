import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'

export default {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js'
	},
	plugins: [
		svelte({
			include: 'src/components/**/*.svelte',
			css: css => css.write('public/index.css')
		}),
		resolve()
	],
	watch: {
		clearScreen: false
	}
}
