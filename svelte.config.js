import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { preprocessMeltUI} from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config}*/
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
  preprocess: sequence([
    vitePreprocess({}),
    preprocessMeltUI() 
  ]),
	kit: {
		adapter: adapter(),
		alias: {
			$schema: './src/schema',
		}
	}
};
export default config;
