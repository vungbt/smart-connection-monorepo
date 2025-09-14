export type ToolbarItem =
  | 'undo'
  | 'redo'
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strikethrough'
  | 'code'
  | 'link'
  | 'linkOff'
  | 'heading1'
  | 'heading2'
  | 'paragraph'
  | 'list'
  | 'listOrdered'
  | 'left'
  | 'center'
  | 'right'
  | 'justify'
  | 'eraser'
  | 'image'
  | 'video';

export type ToolbarProps = {
  container: ToolbarItem[][];
};

export const DEFAULT_TOOLBAR: ToolbarProps = {
  container: [
    ['undo', 'redo'],
    ['bold', 'italic', 'underline', 'strikethrough', 'code', 'link'],
    ['left', 'center', 'right', 'justify'],
  ],
};
