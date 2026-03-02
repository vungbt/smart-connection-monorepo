/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, FC } from 'react';
import Home from './home';
import HomeSolid from './home-solid';
import ArrowUpTray from './arrow-up-tray';
import ArrowUpTraySolid from './arrow-up-tray-solid';
import Loading from './loading';
import MagnifyingGlass from './magnifying-glass';
import Envelope from './envelope';
import Key from './key';
import Phone from './phone';
import CheckCircle from './check-circle';
import Eye from './eye';
import EyeSlash from './eye-slash';
import Check from './check';
import Minus from './minus';
import CheckV2 from './check-v2';
import Trash from './trash';
import ExclamationTriangle from './exclamation-triangle';
import ExclamationCircle from './exclamation-circle';
import XMark from './x-mark';
import XCircle from './x-circle';
import VuesaxArrowDown from './vuesax-arrow-down';
import VuesaxArrowUp from './vuesax-arrow-up';
import VuesaxArrowLeft from './vuesax-arrow-left';
import VuesaxArrowRight from './vuesax-arrow-right';
import CaretDownFill from './caret-down-fill';
import CaretUpFill from './caret-up-fill';
import Inbox from './inbox';
import ChevronDoubleLeft from './chevron-double-left';
import ChevronDoubleRight from './chevron-double-right';
import CloudArrowUp from './cloud-arrow-up';
import User from './user';
import TrashSolid from './trash-solid';
import ChevronDown from './chevron-down';
import Calendar from './calendar';
import CalendarSolid from './calendar-solid';
import CalendarDays from './calendar-days';
import CalendarDaysSolid from './calendar-days-solid';
import CalendarDateRange from './calendar-date-range';
import CalendarDateRangeSolid from './calendar-date-range-solid';
import Clock from './clock';
import ClockSolid from './clock-solid';
import LucideBold from './lucide-bold';
import LucideItalic from './lucide-italic';
import LucideUndo from './lucide-undo';
import LucideRedo from './lucide-redo';
import LucideEraser from './lucide-eraser';
import LucideImage from './lucide-image';
import LucideVideo from './lucide-video';
import LucideQuote from './lucide-quote';
import LucideUnderline from './lucide-underline';
import LucideStrikethrough from './lucide-strikethrough';
import LucideCode from './lucide-code';
import LucideLink from './lucide-link';
import LucideHeading1 from './lucide-heading1';
import LucideHeading2 from './lucide-heading2';
import LucideParagraph from './lucide-paragraph';
import LucideList from './lucide-list';
import LucideListOrdered from './lucide-list-ordered';
import LucideLeft from './lucide-left';
import LucideCenter from './lucide-center';
import LucideRight from './lucide-right';
import LucideJustify from './lucide-justify';
import LucideLinkOff from './lucide-link-off';
import Pencil from './pencil';
import VuesaxElement from './vuesax-element';
import UserGroup from './user-group';
import Users from './users';
import BuildingStorefront from './building-storefront';
import VuesaxEmptyWalletChange from './vuesax-empty-wallet-change';
import CollapseLeft from './collapse-left';
import CollapseRight from './collapse-right';
import Bell from './bell';
import AdjustmentsVertical from './adjustments-vertical';
import Plus from './plus';
import PencilSquare from './pencil-square';
import InformationCircle from './information-circle';
import Printer from './printer';
import ArrowDownTray from './arrow-down-tray';
import VuesaxDocumentUpload from './vuesax-document-upload';
import VuesaxDocumentDownload from './vuesax-document-download';

export type IconProps = {
  className?: string;
  style?: CSSProperties;
  transform?: string;
  strokeWidth?: number;
};

export type Icon = FC<IconProps>;

const IconsDefine = {
  home: 'home',
  'home-solid': 'home-solid',
  'arrow-up-tray': 'arrow-up-tray',
  'arrow-up-tray-solid': 'arrow-up-tray-solid',
  loading: 'loading',
  'magnifying-glass': 'magnifying-glass',
  envelope: 'envelope',
  key: 'key',
  phone: 'phone',
  'check-circle': 'check-circle',
  eye: 'eye',
  'eye-slash': 'eye-slash',
  check: 'check',
  'check-v2': 'check-v2',
  minus: 'minus',
  trash: 'trash',
  'exclamation-triangle': 'exclamation-triangle',
  'exclamation-circle': 'exclamation-circle',
  'x-mark': 'x-mark',
  'x-circle': 'x-circle',
  'vuesax-arrow-right': 'vuesax-arrow-right',
  'vuesax-arrow-left': 'vuesax-arrow-left',
  'vuesax-arrow-up': 'vuesax-arrow-up',
  'vuesax-arrow-down': 'vuesax-arrow-down',
  'caret-up-fill': 'caret-up-fill',
  'caret-down-fill': 'caret-down-fill',
  inbox: 'inbox',
  'chevron-double-left': 'chevron-double-left',
  'chevron-double-right': 'chevron-double-right',
  'cloud-arrow-up': 'cloud-arrow-up',
  user: 'user',
  'trash-solid': 'trash-solid',
  'chevron-down': 'chevron-down',
  calendar: 'calendar',
  'calendar-solid': 'calendar-solid',
  'calendar-days': 'calendar-days',
  'calendar-days-solid': 'calendar-days-solid',
  'calendar-date-range': 'calendar-date-range',
  'calendar-date-range-solid': 'calendar-date-range-solid',
  clock: 'clock',
  'clock-solid': 'clock-solid',
  undo: 'undo',
  redo: 'redo',
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strikethrough: 'strikethrough',
  code: 'code',
  link: 'link',
  'link-off': 'link-off',
  h1: 'h1',
  h2: 'h2',
  paragraph: 'paragraph',
  list: 'list',
  'list-ordered': 'list-ordered',
  left: 'left',
  center: 'center',
  right: 'right',
  justify: 'justify',
  eraser: 'eraser',
  image: 'image',
  video: 'video',
  quote: 'quote',
  ul: 'ul',
  ol: 'ol',
  pencil: 'pencil',
  'vuesax-element': 'vuesax-element',
  'user-group': 'user-group',
  users: 'users',
  'building-storefront': 'building-storefront',
  'vuesax-empty-wallet-change': 'vuesax-empty-wallet-change',
  'collapse-left': 'collapse-left',
  'collapse-right': 'collapse-right',
  bell: 'bell',
  plus: 'plus',
  'adjustments-vertical': 'adjustments-vertical',
  'pencil-square': 'pencil-square',
  'information-circle': 'information-circle',
  'vuesax-money-receive': 'vuesax-money-receive',
  'arrow-down-tray': 'arrow-down-tray',
  printer: 'printer',
  'vuesax-document-upload': 'vuesax-document-upload',
  'vuesax-document-download': 'vuesax-document-download',
};

export type IconName = keyof typeof IconsDefine;

export type IconsType = Record<IconName, Icon>;

export const Icons: IconsType = {
  home: (props: IconProps) => {
    return <Home {...props} />;
  },
  'home-solid': (props: IconProps) => {
    return <HomeSolid {...props} />;
  },
  'arrow-up-tray': (props: IconProps) => {
    return <ArrowUpTray {...props} />;
  },
  'arrow-up-tray-solid': (props: IconProps) => {
    return <ArrowUpTraySolid {...props} />;
  },
  loading: (props: IconProps) => {
    return <Loading {...props} />;
  },
  'magnifying-glass': (props: IconProps) => {
    return <MagnifyingGlass {...props} />;
  },
  envelope: (props: IconProps) => {
    return <Envelope {...props} />;
  },
  key: (props: IconProps) => {
    return <Key {...props} />;
  },
  phone: (props: IconProps) => {
    return <Phone {...props} />;
  },
  'check-circle': (props: IconProps) => {
    return <CheckCircle {...props} />;
  },
  eye: (props: IconProps) => {
    return <Eye {...props} />;
  },
  'eye-slash': (props: IconProps) => {
    return <EyeSlash {...props} />;
  },
  check: (props: IconProps) => {
    return <Check {...props} />;
  },
  minus: (props: IconProps) => {
    return <Minus {...props} />;
  },
  'check-v2': (props: IconProps) => {
    return <CheckV2 {...props} />;
  },
  trash: (props: IconProps) => {
    return <Trash {...props} />;
  },
  'exclamation-triangle': (props: IconProps) => {
    return <ExclamationTriangle {...props} />;
  },
  'exclamation-circle': (props: IconProps) => {
    return <ExclamationCircle {...props} />;
  },
  'x-mark': (props: IconProps) => {
    return <XMark {...props} />;
  },
  'x-circle': (props: IconProps) => {
    return <XCircle {...props} />;
  },
  'vuesax-arrow-down': (props: IconProps) => {
    return <VuesaxArrowDown {...props} />;
  },
  'vuesax-arrow-up': (props: IconProps) => {
    return <VuesaxArrowUp {...props} />;
  },
  'vuesax-arrow-left': (props: IconProps) => {
    return <VuesaxArrowLeft {...props} />;
  },
  'vuesax-arrow-right': (props: IconProps) => {
    return <VuesaxArrowRight {...props} />;
  },
  'caret-down-fill': (props: IconProps) => {
    return <CaretDownFill {...props} />;
  },
  'caret-up-fill': (props: IconProps) => {
    return <CaretUpFill {...props} />;
  },
  inbox: (props: IconProps) => {
    return <Inbox {...props} />;
  },
  'chevron-double-left': (props: IconProps) => {
    return <ChevronDoubleLeft {...props} />;
  },
  'chevron-double-right': (props: IconProps) => {
    return <ChevronDoubleRight {...props} />;
  },
  'cloud-arrow-up': (props: IconProps) => {
    return <CloudArrowUp {...props} />;
  },
  user: (props: IconProps) => {
    return <User {...props} />;
  },
  'trash-solid': (props: IconProps) => {
    return <TrashSolid {...props} />;
  },
  'chevron-down': (props: IconProps) => {
    return <ChevronDown {...props} />;
  },
  calendar: (props: IconProps) => {
    return <Calendar {...props} />;
  },
  'calendar-solid': (props: IconProps) => {
    return <CalendarSolid {...props} />;
  },
  'calendar-days': (props: IconProps) => {
    return <CalendarDays {...props} />;
  },
  'calendar-days-solid': (props: IconProps) => {
    return <CalendarDaysSolid {...props} />;
  },
  'calendar-date-range': (props: IconProps) => {
    return <CalendarDateRange {...props} />;
  },
  'calendar-date-range-solid': (props: IconProps) => {
    return <CalendarDateRangeSolid {...props} />;
  },
  clock: (props: IconProps) => {
    return <Clock {...props} />;
  },
  'clock-solid': (props: IconProps) => {
    return <ClockSolid {...props} />;
  },
  undo: (props: IconProps) => {
    return <LucideUndo {...props} />;
  },
  redo: (props: IconProps) => {
    return <LucideRedo {...props} />;
  },
  bold: (props: IconProps) => {
    return <LucideBold {...props} />;
  },
  italic: (props: IconProps) => {
    return <LucideItalic {...props} />;
  },
  underline: (props: IconProps) => {
    return <LucideUnderline {...props} />;
  },
  strikethrough: (props: IconProps) => {
    return <LucideStrikethrough {...props} />;
  },
  code: (props: IconProps) => {
    return <LucideCode {...props} />;
  },
  link: (props: IconProps) => {
    return <LucideLink {...props} />;
  },
  'link-off': (props: IconProps) => {
    return <LucideLinkOff {...props} />;
  },
  h1: (props: IconProps) => {
    return <LucideHeading1 {...props} />;
  },
  h2: (props: IconProps) => {
    return <LucideHeading2 {...props} />;
  },
  paragraph: (props: IconProps) => {
    return <LucideParagraph {...props} />;
  },
  list: (props: IconProps) => {
    return <LucideList {...props} />;
  },
  'list-ordered': (props: IconProps) => {
    return <LucideListOrdered {...props} />;
  },
  left: (props: IconProps) => {
    return <LucideLeft {...props} />;
  },
  center: (props: IconProps) => {
    return <LucideCenter {...props} />;
  },
  right: (props: IconProps) => {
    return <LucideRight {...props} />;
  },
  justify: (props: IconProps) => {
    return <LucideJustify {...props} />;
  },
  eraser: (props: IconProps) => {
    return <LucideEraser {...props} />;
  },
  image: (props: IconProps) => {
    return <LucideImage {...props} />;
  },
  video: (props: IconProps) => {
    return <LucideVideo {...props} />;
  },
  quote: (props: IconProps) => {
    return <LucideQuote {...props} />;
  },
  ul: (props: IconProps) => {
    return <LucideList {...props} />;
  },
  ol: (props: IconProps) => {
    return <LucideListOrdered {...props} />;
  },
  pencil: (props: IconProps) => {
    return <Pencil {...props} />;
  },
  'vuesax-element': (props: IconProps) => {
    return <VuesaxElement {...props} />;
  },
  'user-group': (props: IconProps) => {
    return <UserGroup {...props} />;
  },
  users: (props: IconProps) => {
    return <Users {...props} />;
  },
  'building-storefront': (props: IconProps) => {
    return <BuildingStorefront {...props} />;
  },
  'vuesax-empty-wallet-change': (props: IconProps) => {
    return <VuesaxEmptyWalletChange {...props} />;
  },
  'collapse-left': (props: IconProps) => {
    return <CollapseLeft {...props} />;
  },
  'collapse-right': (props: IconProps) => {
    return <CollapseRight {...props} />;
  },
  bell: (props: IconProps) => {
    return <Bell {...props} />;
  },
  'adjustments-vertical': (props: IconProps) => {
    return <AdjustmentsVertical {...props} />;
  },
  plus: (props: IconProps) => {
    return <Plus {...props} />;
  },
  'pencil-square': (props: IconProps) => {
    return <PencilSquare {...props} />;
  },
  'information-circle': (props: IconProps) => {
    return <InformationCircle {...props} />;
  },
  'vuesax-money-receive': (props: IconProps) => {
    return <InformationCircle {...props} />;
  },
  'arrow-down-tray': (props: IconProps) => {
    return <ArrowDownTray {...props} />;
  },
  printer: (props: IconProps) => {
    return <Printer {...props} />;
  },
  'vuesax-document-upload': (props: IconProps) => {
    return <VuesaxDocumentUpload {...props} />;
  },
  'vuesax-document-download': (props: IconProps) => {
    return <VuesaxDocumentDownload {...props} />;
  },
  // Add more icons here
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
  if (!Icon) {
    return null;
  }
  return <Icon {...reset} />;
};

export const iconOptions = Object.keys(IconsDefine).map(key => ({
  label: (
    <span className="flex items-center gap-2">
      {key} <RenderIcon className="max-w-5" name={key as any} />
    </span>
  ),
  value: key,
}));
