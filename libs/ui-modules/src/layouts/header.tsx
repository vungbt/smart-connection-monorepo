import {
  IconName,
  Menu,
  MenuButton,
  MenuItem,
  RenderIcon,
} from '@smart-connection-monorepo/ui-components';
import { useHeader } from './hooks';
import Link from 'next/link';
import Image from 'next/image';

export type MenuItem = {
  title: string;
  icon?: IconName;
  href?: string;
};
type HeaderProps = {
  items?: MenuItem[];
  avatarUrl?: string;
};
export function Header({ items = [], avatarUrl }: HeaderProps) {
  const { collapse, title, notiCount, setCollapse } = useHeader();

  return (
    <header className="w-full bg-white px-5 py-3 min-h-16 flex items-center justify-between shadow-border sticky top-0 z-[1000]">
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="outline-none border-none"
          onClick={() => setCollapse({ collapse: !collapse })}
        >
          <RenderIcon
            className="!w-5 !h-5 text-neutral-border"
            name={collapse ? 'collapse-right' : 'collapse-left'}
          />
        </button>
        {title ? title : null}
      </div>

      {/* left content */}
      <div className="w-fit flex items-center gap-2">
        {/* notification button */}
        <button type="button" className="relative">
          <RenderIcon name="bell" className="text-neutral-border" />

          {notiCount && notiCount > 0 ? (
            <>
              <span className="absolute p-[1px] min-w-4 min-h-4 rounded-full bg-error aspect-square text-10 text-neutral-white flex items-center justify-center -top-2 -right-1 z-[1]">
                {notiCount}
              </span>
              <span className="absolute inline-flex top-0 right-0 left-0 bottom-0 rounded-full bg-primary opacity-75 animate-ping" />
            </>
          ) : null}
        </button>

        {/* menus */}
        <Menu
          menuButton={
            <MenuButton className="text-15 flex items-center gap-2 cursor-pointer py-2 px-3 bg-primary-background rounded-lg ml-2">
              {avatarUrl && (
                <Image
                  src={avatarUrl}
                  alt="profile-avatar"
                  width={40}
                  height={40}
                  className="w-10 h-10 aspect-square rounded-full border border-dashed border-primary-border object-contain"
                />
              )}
              <p className="flex flex-col w-fit items-start justify-center">
                vungbt <span className="text-10 text-neutral-disable">Admin</span>
              </p>
              <RenderIcon
                name="chevron-down"
                className="!w-4 !h-4 text-neutral-border"
                strokeWidth={2}
              />
            </MenuButton>
          }
          menuClassName="bg-white rounded-lg shadow-lg p-2 z-[10] min-w-[100px] w-max"
        >
          {items?.map(item => {
            return (
              <MenuItem key={item.title} className="w-full hover:bg-primary-background rounded-md">
                <Link
                  className="w-full p-2 rounded-lg flex items-center text-15 gap-2"
                  href={item.href || ''}
                >
                  <RenderIcon name={item.icon} className="!w-4 !h-4" /> {item.title}
                </Link>
              </MenuItem>
            );
          })}
        </Menu>
      </div>
    </header>
  );
}
