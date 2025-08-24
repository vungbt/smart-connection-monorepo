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
  // Add more icons here
};

export const RenderIcon = ({ name, ...reset }: IconProps & { name?: IconName }) => {
  if (!name) {
    return null;
  }
  const Icon = Icons[name];
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
