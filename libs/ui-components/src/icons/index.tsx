/* eslint-disable @typescript-eslint/no-explicit-any */
import { CSSProperties, FC } from 'react';
import Home from './home';
import HomeSolid from './home-solid';
import ArrowUpTray from './arrow-up-tray';
import ArrowUpTraySolid from './arrow-up-tray-solid';
import Loading from './loading';

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
