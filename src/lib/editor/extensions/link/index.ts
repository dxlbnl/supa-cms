import { default as BaseLink } from '@tiptap/extension-link';
import LinkView from './Link.svelte';
import tippy, { type Instance, type Props } from 'tippy.js';

import type { EditorView } from '@tiptap/pm/view';
import type { Mark, Node } from '@tiptap/pm/model';
import { Plugin, PluginKey, type PluginView, type EditorState } from '@tiptap/pm/state';
import type { Editor } from '@tiptap/core';

export type LinkProps = {
	pos: number;
	node: Node;
	mark: Mark;
	dom: HTMLLinkElement;
};

class TooltipView implements PluginView {
	component: LinkView | null = null;
	content: HTMLDivElement | null = null;
	popup: Instance<Props> | null = null;

	constructor(
		readonly view: EditorView,
		readonly editor: Editor
	) {
		editor.on('blur', () => {
			this.hide();
		});
	}

	clean() {
		if (this.popup) {
			this.popup?.destroy();
			this.popup = null;
		}
		if (this.content) {
			this.content.remove();
			this.content = null;
		}
		if (this.component) {
			this.component?.$destroy();
			this.component = null;
		}
	}
	show(linkProps: LinkProps) {
		this.content ||= document.createElement('div');

		this.component ||= new LinkView({
			target: this.content,
			props: { linkProps, editor: this.editor, hide: () => this.hide() }
		});

		this.popup ||= tippy('body', {
			offset: [0, -2],
			placement: 'bottom',
			getReferenceClientRect: () => linkProps.dom.getBoundingClientRect(),
			content: this.content,
			appendTo: () => document.body,
			interactive: true,
			animation: 'fade',
			showOnCreate: true
		})[0];

		this.component.$set({ linkProps });
		this.popup.setProps({
			getReferenceClientRect: () => linkProps.dom.getBoundingClientRect()
		});
		this.popup.show();
	}
	hide() {
		this.popup?.setProps({
			getReferenceClientRect: null
		});
		this.popup?.hide();
	}
	destroy() {
		this.clean();
	}
}

const hasLinkMark = (marks: Readonly<Mark[]>) => {
	return marks.find((m) => m.type.name === 'link');
};

export const Link = BaseLink.extend({
	addStorage() {
		return {
			nodeview: null
		};
	},
	addProseMirrorPlugins() {
		let pluginView: TooltipView;
		const editor = this.editor;
		return [
			new Plugin({
				key: new PluginKey('tooltip'),
				view: (view) => {
					pluginView = new TooltipView(view, editor);
					return pluginView;
				},
				props: {
					handleDOMEvents: {
						mouseover: (view: EditorView, event: MouseEvent) => {
							const pos = view.posAtDOM(event.target as Node, 0);
							if (!pos || (event.target as HTMLElement).tagName !== 'A') {
								return pluginView.hide();
							}
							const node = view.state.doc.nodeAt(pos);

							if (node && hasLinkMark(node.marks || [])) {
								const mark = node.marks.find((m) => m.type.name === 'link') as Mark;

								pluginView.show({
									pos,
									node,
									mark,
									dom: event.target as HTMLLinkElement
								});
							} else {
								pluginView.hide();
							}
						}
					}
				}
			})
		];
	}
	// addNodeView(): NodeViewRenderer {
	// 	return ({ node, editor, getPos }) => {
	// 		const target = document.createElement('div');

	// 		this.storage.nodeview = new LinkView({
	// 			target,
	// 			props: { attrs: node.attrs, editor, getPos }
	// 		});

	// 		console.log('Target', target);

	// 		return {
	// 			dom: target.firstChild
	// 		};
	// 	};
	// }
});
