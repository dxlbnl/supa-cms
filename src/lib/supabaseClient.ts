import { createClient } from '@supabase/supabase-js';

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
