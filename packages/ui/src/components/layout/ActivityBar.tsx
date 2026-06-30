import React from 'react';
import { Icon } from '@/components/icon/Icon';
import type { IconName } from '@/components/icon/icons';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/useUIStore';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

const ACTIVITY_BAR_WIDTH = 48;

interface ActivityBarItem {
  id: string;
  icon: string;
  label: string;
  onClick: () => void;
  isActive: boolean;
  position: 'top' | 'bottom';
}

export const ActivityBar: React.FC = () => {
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const isSidebarOpen = useUIStore((state) => state.isSidebarOpen);
  const toggleBottomTerminal = useUIStore((state) => state.toggleBottomTerminal);
  const isBottomTerminalOpen = useUIStore((state) => state.isBottomTerminalOpen);
  const setSettingsDialogOpen = useUIStore((state) => state.setSettingsDialogOpen);
  const isSettingsDialogOpen = useUIStore((state) => state.isSettingsDialogOpen);
  const isMobile = useUIStore((state) => state.isMobile);

  const [activeItem, setActiveItem] = React.useState('chat');

  if (isMobile) {
    return null;
  }

  const items: ActivityBarItem[] = [
    {
      id: 'chat',
      icon: 'chat-4',
      label: 'Chat',
      onClick: () => {
        setActiveItem('chat');
        if (!isSidebarOpen) toggleSidebar();
      },
      isActive: activeItem === 'chat',
      position: 'top',
    },
    {
      id: 'files',
      icon: 'folder-3',
      label: 'Explorer',
      onClick: () => {
        setActiveItem('files');
        if (!isSidebarOpen) toggleSidebar();
      },
      isActive: activeItem === 'files',
      position: 'top',
    },
    {
      id: 'git',
      icon: 'git-branch',
      label: 'Source Control',
      onClick: () => {
        setActiveItem('git');
        if (!isSidebarOpen) toggleSidebar();
      },
      isActive: activeItem === 'git',
      position: 'top',
    },
    {
      id: 'terminal',
      icon: 'terminal-box',
      label: 'Terminal',
      onClick: () => {
        setActiveItem('terminal');
        toggleBottomTerminal();
      },
      isActive: isBottomTerminalOpen,
      position: 'top',
    },
    {
      id: 'settings',
      icon: 'settings-3',
      label: 'Settings',
      onClick: () => {
        setActiveItem('settings');
        setSettingsDialogOpen(!isSettingsDialogOpen);
      },
      isActive: isSettingsDialogOpen,
      position: 'bottom',
    },
  ];

  const topItems = items.filter((i) => i.position === 'top');
  const bottomItems = items.filter((i) => i.position === 'bottom');

  return (
    <aside
      className={cn(
        'flex h-full w-12 shrink-0 flex-col items-center',
        'border-r border-border/40',
        'bg-sidebar oc-vibrancy-surface'
      )}
      style={{ width: `${ACTIVITY_BAR_WIDTH}px` }}
    >
      {/* Top items */}
      <div className="flex flex-col items-center gap-0.5 pt-1">
        {topItems.map((item) => (
          <ActivityBarIcon key={item.id} item={item} />
        ))}
      </div>

      {/* Spacer pushes bottom items down */}
      <div className="flex-1" />

      {/* Bottom items */}
      <div className="flex flex-col items-center gap-0.5 pb-1">
        {bottomItems.map((item) => (
          <ActivityBarIcon key={item.id} item={item} />
        ))}
      </div>
    </aside>
  );
};

const ActivityBarIcon: React.FC<{ item: ActivityBarItem }> = ({ item }) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          onClick={item.onClick}
          className={cn(
            'relative flex h-11 w-11 items-center justify-center',
            'rounded-[2px] transition-colors duration-100',
            'text-muted-foreground hover:text-foreground',
            item.isActive && 'text-foreground'
          )}
          aria-label={item.label}
          aria-pressed={item.isActive}
        >
          <Icon name={item.icon as IconName} className="h-5 w-5" />
          {item.isActive && (
            <span
              className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[2px] rounded-r-full bg-primary"
            />
          )}
        </button>
      </TooltipTrigger>
      <TooltipContent side="right" sideOffset={8}>
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
};
