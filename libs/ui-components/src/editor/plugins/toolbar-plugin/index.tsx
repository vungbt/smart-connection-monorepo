import { $isCodeNode, getCodeLanguages, getDefaultCodeLanguage } from '@lexical/code';
import { $isLinkNode, TOGGLE_LINK_COMMAND } from '@lexical/link';
import { $isListNode, ListNode } from '@lexical/list';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $isHeadingNode } from '@lexical/rich-text';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import clsx from 'clsx';
import {
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { getSelectedNode } from '../../utils';
import { IconName, RenderIcon } from '../../../icons';
import { BlockOptionsDropdownList } from './block-options-dropdown';
import { Divider } from './divider';
import { ToolbarItem } from './toolbar-item';
import { FloatingLinkEditor } from './floating-link-editor';
import { Select, SelectOption } from '../../../select';

const LowPriority = 1;

const supportedBlockTypes = new Set(['paragraph', 'quote', 'code', 'h1', 'h2', 'ul', 'ol']);

const blockTypeToBlockName = {
  code: 'Code Block',
  h1: 'Large Heading',
  h2: 'Small Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  ol: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
  ul: 'Bulleted List',
};

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toolbarRef = useRef<any>(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [blockType, setBlockType] = useState('paragraph');
  const [selectedElementKey, setSelectedElementKey] = useState<string | null>(null);
  const [showBlockOptionsDropDown, setShowBlockOptionsDropDown] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState('');
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isCode, setIsCode] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      const element =
        anchorNode.getKey() === 'root' ? anchorNode : anchorNode.getTopLevelElementOrThrow();
      const elementKey = element.getKey();
      const elementDOM = editor.getElementByKey(elementKey) as HTMLElement;
      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType(anchorNode, ListNode);
          const type = parentList ? parentList.getTag() : element.getTag();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          setBlockType(type);
          if ($isCodeNode(element)) {
            setCodeLanguage(element.getLanguage() || getDefaultCodeLanguage());
          }
        }
      }
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
      setIsCode(selection.hasFormat('code'));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }
    }
  }, [editor]);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _payload => {
          updateToolbar();
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        payload => {
          setCanUndo(payload);
          return false;
        },
        LowPriority
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        payload => {
          setCanRedo(payload);
          return false;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  const codeLanguges = useMemo(() => getCodeLanguages(), []);
  const onCodeLanguageSelect = useCallback(
    (item: SelectOption) => {
      editor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(item.value as string);
          }
        }
      });
    },
    [editor, selectedElementKey]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, 'https://');
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  return (
    <div
      className="flex flex-row items-center vertical-align-middle bg-white rounded-t-lg py-1 px-2 border-b border-solid border-neutral gap-1"
      ref={toolbarRef}
    >
      <ToolbarItem
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        ariaLabel="Undo"
        icon="undo"
      />
      <ToolbarItem
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        ariaLabel="Redo"
        icon="redo"
      />
      <Divider />
      {supportedBlockTypes.has(blockType) && (
        <>
          <ToolbarItem
            className="flex items-center gap-1"
            onClick={() => setShowBlockOptionsDropDown(!showBlockOptionsDropDown)}
            ariaLabel="Formatting Options"
          >
            <RenderIcon name={blockType as IconName} className="!w-4 !h-4" />
            <span className="text-sm">
              {blockTypeToBlockName[blockType as keyof typeof blockTypeToBlockName]}
            </span>
            <RenderIcon
              name="chevron-down"
              className={clsx(
                '!w-4 !h-4 transition-all ease-linear',
                showBlockOptionsDropDown && 'rotate-180'
              )}
            />
          </ToolbarItem>
          {showBlockOptionsDropDown &&
            createPortal(
              <BlockOptionsDropdownList
                editor={editor}
                options={Array.from(supportedBlockTypes).map(type => ({
                  label: blockTypeToBlockName[type as keyof typeof blockTypeToBlockName],
                  value: type as IconName,
                }))}
                blockType={blockType}
                toolbarRef={toolbarRef}
                setShowBlockOptionsDropDown={setShowBlockOptionsDropDown}
              />,
              document.body
            )}
          <Divider />
        </>
      )}
      {blockType === 'code' ? (
        <>
          <Select
            className="toolbar-item code-language"
            customClasses={{
              root: 'max-w-fit min-w-[130px]',
              select: '!px-2 !border-none !shadow-none',
              indicatorClassName: 'max-w-4 max-h-4 text-black',
            }}
            onChange={value => onCodeLanguageSelect(value as SelectOption)}
            options={codeLanguges.map(item => ({ label: item, value: item }))}
            value={{ label: codeLanguage, value: codeLanguage }}
          />
        </>
      ) : (
        <>
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
            }}
            active={isBold}
            className={'toolbar-item spaced '}
            ariaLabel="Format Bold"
            icon="bold"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
            }}
            active={isItalic}
            className={'toolbar-item spaced '}
            ariaLabel="Format Italics"
            icon="italic"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
            }}
            active={isUnderline}
            className={'toolbar-item spaced '}
            ariaLabel="Format Underline"
            icon="underline"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
            }}
            active={isStrikethrough}
            className={'toolbar-item spaced '}
            ariaLabel="Format Strikethrough"
            icon="strikethrough"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'code');
            }}
            active={isCode}
            className={'toolbar-item spaced '}
            ariaLabel="Insert Code"
            icon="code"
          />
          <ToolbarItem
            onClick={insertLink}
            active={isLink}
            className={'toolbar-item spaced '}
            ariaLabel="Insert Link"
            icon="link"
          />
          {isLink && createPortal(<FloatingLinkEditor editor={editor} />, document.body)}
          <Divider />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
            }}
            className="toolbar-item spaced"
            ariaLabel="Left Align"
            icon="left"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
            }}
            className="toolbar-item spaced"
            ariaLabel="Center Align"
            icon="center"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
            }}
            className="toolbar-item spaced"
            ariaLabel="Right Align"
            icon="right"
          />
          <ToolbarItem
            onClick={() => {
              editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
            }}
            className="toolbar-item"
            ariaLabel="Justify Align"
            icon="justify"
          />
        </>
      )}
    </div>
  );
}
