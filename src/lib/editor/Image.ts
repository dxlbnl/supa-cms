import NodeView from './ImageNodeView.svelte';
import { default as BaseImage } from '@tiptap/extension-image';

export const Image = BaseImage.extend({
	defining: true,
	addStorage() {
		return {
			nodeview: null
		};
	},
	addNodeView() {
		return ({ editor, node, getPos }) => {
			const target = document.createElement('div');

			this.storage.nodeview = new NodeView({
				target,
				props: { attrs: node.attrs, editor, getPos }
			});

			return {
				dom: target.firstChild
			};
		};
	}
});
