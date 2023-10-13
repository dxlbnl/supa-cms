import type { PageServerLoad } from './$types';

import { error } from '@sveltejs/kit';
import { fetchPage } from '$lib/supabaseClient';

export const load: PageServerLoad = async ({ params }) => {
	const page = await fetchPage(params.slug || 'index');

	if (!page) {
		throw error(404, 'Page not found');
	}

	return {
		page
	};
};
