<script lang="ts" context="module">
	import { supabase } from '$lib/supabaseClient';

	declare global {
		interface Window {
			handleSignInWithGoogle: (response: any) => void;
		}
	}

	window.handleSignInWithGoogle = async function handleSignInWithGoogle(response: any) {
		await supabase.auth.signInWithIdToken({
			provider: 'google',
			token: response.credential
		});
	};
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id="434101127355-lhqobqq0k969e94p2ti89oqum9mrhtht.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-callback="handleSignInWithGoogle"
	data-auto_select="true"
	data-itp_support="true"
/>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="pill"
	data-theme="outline"
	data-text="signin_with"
	data-size="large"
	data-logo_alignment="left"
/>
