<script lang="ts">
	import type { JSONContent } from '@tiptap/core';
	import type { ComponentType, SvelteComponent } from 'svelte';
	import Element, { isElementType } from './Element.svelte';
	import Text from './Text.svelte';
	import CodeBlock from './CodeBlock.svelte';
	import Layout from './Layout.svelte';

	export let content: JSONContent;

	const components: Record<string, ComponentType> = {
		text: Text,
		codeBlock: CodeBlock,
		layout: Layout
	};

	const hasComponent = (type?: string): type is keyof typeof components =>
		Boolean(type && type in components);

	const getComponent = (type?: string): ComponentType | undefined => {
		if (hasComponent(type)) {
			return components[type] as ComponentType;
		}
	};
</script>

{#if isElementType(content.type)}
	<Element {content} />
{:else if hasComponent(content.type)}
	<svelte:component this={getComponent(content.type)} {...content} />
{:else}
	<section class="error">
		Cannot render {content.type}
		<pre>{JSON.stringify(content, null, 2)}</pre>
	</section>
{/if}

<style>
	.error {
		border: thin solid red;
		padding: 0.5rem;
		margin-bottom: 0.5rem;

		font-size: 0.8rem;
	}

	pre {
		white-space: break-spaces;
	}
</style>
