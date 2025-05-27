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
