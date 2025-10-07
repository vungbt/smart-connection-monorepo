import RCDrawer, { DrawerProps as RCDrawerProps } from 'rc-drawer';
export type DrawerProps = RCDrawerProps;

const maskMotion: DrawerProps['maskMotion'] = {
  motionAppear: true,
  motionName: 'mask-motion',
  onAppearEnd: console.warn,
};

const motion: DrawerProps['motion'] = placement => ({
  motionAppear: true,
  motionName: `panel-motion-${placement}`,
});

export const Drawer = ({ children, ...reset }: DrawerProps) => {
  return (
    <RCDrawer {...reset} maskMotion={maskMotion} placement="right" motion={motion}>
      {children}
    </RCDrawer>
  );
};
