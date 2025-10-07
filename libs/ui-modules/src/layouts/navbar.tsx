import {
  IconName,
  RenderIcon,
  Sidebar,
  SidebarMenu,
  SidebarMenuItem,
  SidebarSubMenu,
} from '@smart-connection-monorepo/ui-components';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ElementType } from 'react';
import { useHeader } from './hooks';

type NavItemType = {
  title: string;
  navKey: string;
  icon?: IconName;
  link?: ElementType;
  href?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  children?: NavItemType[];
};

type NavbarProps = {
  items?: NavItemType[];
  className?: string;
  customClasses?: {
    root?: string;
    list?: string;
    item?: string;
  };
  logoHref?: string;
};
export function Navbar({
  items = [],
  className,
  customClasses,
  logoHref = '/logo/logo.webp',
}: NavbarProps) {
  const pathname = usePathname();
  const { collapse } = useHeader();
  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav
      className={clsx(
        'bg-white p-4 flex items-start gap-4 flex-col min-h-screen overflow-auto relative transition-all ease-linear border-r border-solid border-primary-background',
        {
          'min-w-56': !collapse,
          'min-w-fit': collapse,
        },
        className,
        customClasses?.root
      )}
    >
      {/* logo */}
      <Link href="/" className="flex items-center justify-center w-full">
        <Image
          width={collapse ? 80 : 200}
          height={collapse ? 40 : 100}
          src={logoHref}
          alt="logo"
          className={clsx(' bg-primary-background rounded-lg transition-all ease-linear', {
            'w-[150px]': !collapse,
            'w-20': collapse,
          })}
        />
      </Link>

      <div className="w-full h-[2px] bg-primary-base" />

      {/* menus */}
      <Sidebar collapsed={collapse} className="navbar-custom">
        <SidebarMenu
          renderExpandIcon={({ open }) => (
            <RenderIcon
              strokeWidth={2}
              className={clsx('dropdown-icon !w-5 !h-5 transition-all ease-linear', {
                'rotate-180': open,
              })}
              name="chevron-down"
            />
          )}
          className="bg-transparent"
        >
          {items.map(item => {
            const children = item?.children || [];
            const isHaveChildren = children.length > 0;
            if (isHaveChildren)
              return (
                <SidebarSubMenu
                  label="Charts"
                  key={item.navKey}
                  icon={<RenderIcon strokeWidth={2} className="!w-5 !h-5" name={item.icon} />}
                >
                  {children.map(childItem => {
                    return (
                      <SidebarMenuItem
                        component={<Link href={item.href || ''} />}
                        href={childItem.href}
                        icon={<div className="!w-5 !h-6 aspect-square" />}
                        key={`${item.navKey}-${childItem.navKey}`}
                        active={isActive(childItem.href)}
                      >
                        {childItem.title}
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarSubMenu>
              );
            return (
              <SidebarMenuItem
                component={<Link href={item.href || ''} />}
                key={item.navKey}
                active={isActive(item.href)}
                icon={<RenderIcon strokeWidth={2} className="!w-5 !h-5" name={item.icon} />}
              >
                {item.title}
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </Sidebar>
    </nav>
  );
}
