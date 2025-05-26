'use client';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { Tabs as ReactTabs, Tab, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { IconName, RenderIcon } from '../icons';

export type TabItem = {
  label: string;
  value: number;
  icon?: IconName;
  disabled?: boolean;
  content?: string | number | ReactNode;
};

export type TabsProps = {
  tabs: TabItem[];
  selectedIndex?: number;
  defaultActiveTab?: number;
  onChange?: (index: number, lastIndex: number, event: Event) => boolean | void;
  variant?: 'line' | 'card';
  size?: 'small' | 'middle' | 'large';
  color?: 'primary' | 'secondary' | 'success' | 'pending' | 'neutral';
  className?: string;
  customClasses?: {
    root?: string;
    tabs?: string;
    tab?: string;
    content?: string;
    icon?: string;
  };
};

export const Tabs: React.FC<TabsProps> = props => {
  const {
    tabs,
    onChange,
    size = 'middle',
    variant = 'line',
    color = 'primary',
    className,
    customClasses,
    ...reset
  } = props;
  const colorClass = colorClasses[color][variant];
  const tabListSize = tabsSizeClasses[size][variant];
  const tabItemSize = tabItemSizeClasses[size][variant];
  const variableClass = variableClasses[variant];

  return (
    <ReactTabs
      className={clsx(
        className,
        customClasses?.root,
        'flex w-full relative before:content-[""] before:absolute before:bottom-0 before:right-0 before:left-0 before:w-full before:h-[1px] before:bg-neutral'
      )}
      onSelect={onChange}
      {...reset}
    >
      <TabList className={clsx(customClasses?.tabs, tabListSize, 'flex w-full')}>
        {tabs.map(tab => {
          return (
            <Tab
              key={tab.value}
              disabled={tab.disabled}
              className={clsx(
                customClasses?.tab,
                tabItemSize,
                colorClass.tab,
                variableClass.tab,
                'cursor-pointer relative outline-none transition-all ease-linear'
              )}
              selectedClassName={clsx(
                colorClass.tabActive,
                'after:w-full text-shadow border-b-neutral-white bg-neutral-white'
              )}
            >
              <span className="flex items-center gap-1">
                {tab.icon ? (
                  <RenderIcon name={tab.icon} className={clsx(customClasses?.icon, '!w-3 !h-3')} />
                ) : null}
                {tab.label}
              </span>
            </Tab>
          );
        })}
      </TabList>
      {tabs.map(tab => (
        <TabPanel key={tab.value} className={clsx(customClasses?.content)}>
          {tab.content}
        </TabPanel>
      ))}
    </ReactTabs>
  );
};
const variableClasses = {
  line: {
    tab: 'after:absolute after:content-[""] after:bottom-0 after:right-0 after:left-0 after:w-0 after:mx-auto after:transition-all after:ease-linear after:h-[2px] hover:text-shadow-current',
  },
  card: {
    tab: 'border border-solid border-neutral bg-neutral-bg',
  },
};
const colorClasses = {
  primary: {
    line: {
      tab: 'hover:text-primary',
      tabActive: 'after:bg-primary text-primary',
    },
    card: {
      tab: 'hover:text-primary',
      tabActive: 'after:bg-primary text-primary',
    },
  },
  secondary: {
    line: {
      tab: 'hover:text-secondary',
      tabActive: 'after:bg-secondary text-secondary',
    },
    card: {
      tab: 'hover:text-secondary',
      tabActive: 'after:bg-secondary text-secondary',
    },
  },
  success: {
    line: {
      tab: 'hover:text-success',
      tabActive: 'after:bg-success text-success',
    },
    card: {
      tab: 'hover:text-success',
      tabActive: 'after:bg-success text-success',
    },
  },
  pending: {
    line: {
      tab: 'hover:text-pending',
      tabActive: 'after:bg-pending text-pending',
    },
    card: {
      tab: 'hover:text-pending',
      tabActive: 'after:bg-pending text-pending',
    },
  },
  neutral: {
    line: {
      tab: 'hover:text-neutral',
      tabActive: 'after:bg-neutral text-neutral',
    },
    card: {
      tab: 'hover:text-neutral',
      tabActive: 'after:bg-neutral text-neutral',
    },
  },
};

const tabsSizeClasses = {
  small: {
    line: 'gap-8',
    card: 'gap-[2px]',
  },
  middle: {
    line: 'gap-8',
    card: 'gap-[2px]',
  },
  large: {
    line: 'gap-8',
    card: 'gap-[2px]',
  },
};

const tabItemSizeClasses = {
  small: {
    line: 'text-14 py-2',
    card: 'text-14 py-1 px-2 rounded-tl-md rounded-tr-md',
  },
  middle: {
    line: 'text-14 py-3',
    card: 'text-14 py-2 px-4 rounded-tl-lg rounded-tr-lg',
  },
  large: {
    line: 'text-16 py-4',
    card: 'text-16 py-3 px-4 rounded-tl-lg rounded-tr-lg',
  },
};
