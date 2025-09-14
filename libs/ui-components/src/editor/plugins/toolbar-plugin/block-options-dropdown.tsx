import { $createCodeNode } from '@lexical/code';
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from '@lexical/list';
import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text';
import { $wrapNodes } from '@lexical/selection';
import { $createParagraphNode, $getSelection, $isRangeSelection, LexicalEditor } from 'lexical';
import { useEffect, useRef } from 'react';
import { IconName, RenderIcon } from '../../../icons';
import { ToolbarItem } from './toolbar-item';
import clsx from 'clsx';

export function BlockOptionsDropdownList({
  editor,
  blockType,
  toolbarRef,
  options = [],
  setShowBlockOptionsDropDown,
}: {
  editor: LexicalEditor;
  blockType: string;
  options: { label: string; value: IconName }[];
  toolbarRef: React.RefObject<HTMLDivElement>;
  setShowBlockOptionsDropDown: (show: boolean) => void;
}) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    const dropDown = dropDownRef.current;

    if (toolbar !== null && dropDown !== null) {
      const { top, left } = toolbar.getBoundingClientRect();
      (dropDown as HTMLElement).style.top = `${top + 40}px`;
      (dropDown as HTMLElement).style.left = `${left + 64}px`;
    }
  }, [dropDownRef, toolbarRef]);

  useEffect(() => {
    const dropDown: any = dropDownRef.current;
    const toolbar = toolbarRef.current;

    if (dropDown !== null && toolbar !== null) {
      const handle = (event: MouseEvent) => {
        const target = event.target as Node;

        if (!dropDown.contains(target) && !toolbar.contains(target)) {
          setShowBlockOptionsDropDown(false);
        }
      };
      document.addEventListener('click', handle);

      return () => {
        document.removeEventListener('click', handle);
      };
    }
    return undefined;
  }, [dropDownRef, setShowBlockOptionsDropDown, toolbarRef]);

  const formatParagraph = () => {
    if (blockType !== 'paragraph') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createParagraphNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatLargeHeading = () => {
    if (blockType !== 'h1') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h1'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatSmallHeading = () => {
    if (blockType !== 'h2') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createHeadingNode('h2'));
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBulletList = () => {
    if (blockType !== 'ul') {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatNumberedList = () => {
    if (blockType !== 'ol') {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatQuote = () => {
    if (blockType !== 'quote') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createQuoteNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatCode = () => {
    if (blockType !== 'code') {
      editor.update(() => {
        const selection = $getSelection();

        if ($isRangeSelection(selection)) {
          $wrapNodes(selection, () => $createCodeNode());
        }
      });
    }
    setShowBlockOptionsDropDown(false);
  };

  const formatBlock = (value: IconName) => {
    switch (value) {
      case 'paragraph':
        formatParagraph();
        break;
      case 'h1':
        formatLargeHeading();
        break;
      case 'h2':
        formatSmallHeading();
        break;
      case 'ul':
        formatBulletList();
        break;
      case 'ol':
        formatNumberedList();
        break;
      case 'quote':
        formatQuote();
        break;
      case 'code':
        formatCode();
        break;
      default:
        formatParagraph();
        break;
    }
  };
  return (
    <div
      className="absolute z-50 shadow-lg border border-solid border-neutral rounded-lg bg-white p-2"
      ref={dropDownRef}
    >
      {options.map(option => (
        <ToolbarItem
          key={option.value}
          className={clsx('flex items-center gap-2 w-full text-sm !p-1', {
            'bg-primary-background': blockType === option.value,
          })}
          onClick={() => formatBlock(option.value)}
        >
          <RenderIcon name={option.value} className="!w-4 !h-4" />
          <span className="text">{option.label}</span>
        </ToolbarItem>
      ))}
    </div>
  );
}
