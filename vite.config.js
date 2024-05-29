import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import sveltekitApiGenerator from 'vite-plugin-sveltekit-api-generator';
export default defineConfig({
	plugins: [sveltekit(), sveltekitApiGenerator()]
});
