import { getSchema } from '@tiptap/core';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

export const schema = getSchema([
	Document,
	Paragraph,
	Text
	// add more extensions here
]);
