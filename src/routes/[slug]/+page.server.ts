import type { PageServerLoad, Actions } from './$types';

import { db } from '$lib/database';
import { page } from '$schema/page';
import { error, redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params }) => {
	const pageData = await db.query.page.findFirst({
		where: eq(page.slug, params.slug)
	});

	if (!pageData) {
		throw error(404, 'Page not found');
	}

	return {
		page: pageData
	};
};

export const actions: Actions = {
	create: async ({ params }) => {
		await db.insert(page).values({ slug: params.slug });

		throw redirect(302, `/${params.slug}`);
	},
	update: async ({ params, request }) => {
		const data = await request.formData();
		const title = data.get('title') as string;
		const content = JSON.parse(data.get('content') as string);
		await db.update(page).set({ title, content }).where(eq(page.slug, params.slug));

		throw redirect(302, `/${params.slug}`);
	}
};
