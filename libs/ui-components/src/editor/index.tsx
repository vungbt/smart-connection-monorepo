import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { TRANSFORMERS } from '@lexical/markdown';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableCellNode, TableNode, TableRowNode } from '@lexical/table';
import clsx from 'clsx';
import { $getRoot, EditorState } from 'lexical';
import { useState } from 'react';
import AutoLinkPlugin from './plugins/auto-link-plugin';
import CodeHighlightPlugin from './plugins/code-highlight-plugin';
import ListMaxIndentLevelPlugin from './plugins/list-max-indent-level-plugin';
import ToolbarPlugin from './plugins/toolbar-plugin';
import basicTheme from './themes/basic-theme';
import { ToolbarProps } from './types';

function Placeholder({ placeholder }: { placeholder: string }) {
  return <div className="editor-placeholder text-neutral-placeholder">{placeholder}</div>;
}

const editorConfig = {
  namespace: 'MyEditor',
  theme: basicTheme,
  onError(error: Error) {
    throw error;
  },
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

type EditorProps = {
  toolbar?: ToolbarProps;
  error?: string;
  name?: string;
  required?: boolean;
  id?: string;
  placeholder?: string;
  onChange?: (plainText: string, json: string) => void;
};

export function EditorOnChangePlugin({
  onChange,
}: {
  onChange?: (plainText: string, json: string) => void;
}) {
  const handleChange = (editorState: EditorState) => {
    editorState.read(() => {
      const json = editorState.toJSON();
      const plainText = editorState.read(() => $getRoot().getTextContent());

      onChange && onChange(plainText, JSON.stringify(json));
    });
  };

  return <OnChangePlugin onChange={handleChange} />;
}

export function Editor({
  error,
  name,
  id,
  placeholder = 'Enter some rich text...',
  ...reset
}: EditorProps) {
  const [focused, setFocused] = useState(false);

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div
        className={clsx(
          'border border-solid border-neutral rounded-lg transition-all ease-in-out',
          {
            'shadow-border border-primary-border shadow-neutral-bg': focused,
            '!border-error': error,
            '!border-error-base !shadow-error-bg': error && focused,
          }
        )}
      >
        <ToolbarPlugin />
        <div className="editor-inner">
          <RichTextPlugin
            contentEditable={
              <ContentEditable
                id={id}
                name={name}
                className="editor-input"
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            }
            placeholder={<Placeholder placeholder={placeholder} />}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <CodeHighlightPlugin />
          <ListPlugin />
          <LinkPlugin />
          <AutoLinkPlugin />
          <ListMaxIndentLevelPlugin maxDepth={7} />
          <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
          <EditorOnChangePlugin onChange={reset?.onChange} />
        </div>
      </div>
    </LexicalComposer>
  );
}
