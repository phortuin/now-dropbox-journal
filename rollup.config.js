import svelte from 'rollup-plugin-svelte'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'

export default {
	input: 'src/index.js',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
		file: 'public/bundle.js',
	},
	plugins: [
		svelte({
			emitCss: true,
		}),
		resolve(),
		commonjs(),
		css({ output: 'public/styles.css' })
	],
}
