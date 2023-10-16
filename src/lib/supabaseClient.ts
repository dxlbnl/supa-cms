import { createClient } from '@supabase/supabase-js';
import type { JSONContent } from '@tiptap/core';
import { readable } from 'svelte/store';

export const supabase = createClient(
	'https://veesqakrutpzcryhdhrx.supabase.co',
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZlZXNxYWtydXRwemNyeWhkaHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTYyMzg4MjEsImV4cCI6MjAxMTgxNDgyMX0.70Us_W_80uyU_Lrq67bYJMQknOuG6mG2P7brMAPaOtA'
);

// Upload file using standard upload
export async function uploadImage(file: File) {
	const { data, error } = await supabase.storage.from('media').upload(file.name, file, {
		upsert: true
	});

	if (error) {
		// Handle error
		console.error('error uploading image', error);
		throw error;
	} else {
		console.log('image uploaded', data);
		// Handle success
	}
	const {
		data: { publicUrl }
	} = supabase.storage.from('media').getPublicUrl(file.name);

	return publicUrl;
}

export async function fetchPage(slug: string) {
	const { data, error } = await supabase.from('page').select('*').match({ slug }).single();
	if (error) {
		console.error(error);
		throw error;
	}
	return data;
}

export async function createPage(slug: string) {
	const { data, error } = await supabase.from('page').insert([{ slug }]);

	if (error) {
		// Handle error
		console.error('error creating page', error);
		throw error;
	} else {
		console.log('page created', data);
		// Handle success
	}
}

export async function updatePage({
	slug,
	title,
	content
}: {
	slug: string;
	title?: string;
	content: JSONContent;
}) {
	const { data, error } = await supabase.from('page').update({ title, content }).match({ slug });

	if (error) {
		// Handle error
		console.error('error updating page', error);
		throw error;
	} else {
		console.log('page updated', slug, content);
		// Handle success
	}
}

type User = {
	name: string;
	email: string;
	avatar: string;
} | null;

export const user = readable<User>(null, (set) => {
	const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
		if (session?.user) {
			set({
				name: session.user.user_metadata.name || '',
				email: session.user.email || '',
				avatar: session.user.user_metadata.avatar_url
			});
		} else {
			set(null);
		}
	});
	return () => {
		authListener.subscription.unsubscribe();
	};
});
