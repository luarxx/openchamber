import React from 'react';
import { Icon } from '@/components/icon/Icon';
import { cn } from '@/lib/utils';
import { useUIStore } from '@/stores/useUIStore';

const STATUS_BAR_HEIGHT = 22;

export const StatusBar: React.FC = () => {
  const isMobile = useUIStore((state) => state.isMobile);
  const isSettingsDialogOpen = useUIStore((state) => state.isSettingsDialogOpen);
  const isBottomTerminalOpen = useUIStore((state) => state.isBottomTerminalOpen);
  const toggleBottomTerminal = useUIStore((state) => state.toggleBottomTerminal);
  const setSettingsDialogOpen = useUIStore((state) => state.setSettingsDialogOpen);

  const [connectionStatus, setConnectionStatus] = React.useState<'connected' | 'disconnected' | 'loading'>('loading');

  React.useEffect(() => {
    const checkConnection = async () => {
      try {
        const response = await fetch('/api/health', { method: 'HEAD', signal: AbortSignal.timeout(3000) });
        setConnectionStatus(response.ok ? 'connected' : 'disconnected');
      } catch {
        setConnectionStatus('disconnected');
      }
    };
    checkConnection();
    const interval = setInterval(checkConnection, 15000);
    return () => clearInterval(interval);
  }, []);

  if (isMobile) {
    return null;
  }

  return (
    <footer
      className={cn(
        'flex h-[22px] shrink-0 items-center justify-between',
        'bg-sidebar border-t border-border/40',
        'text-[11px] font-normal text-muted-foreground',
        'select-none'
      )}
      style={{ height: `${STATUS_BAR_HEIGHT}px` }}
    >
      {/* Left section */}
      <div className="flex h-full items-center">
        <StatusBarItem
          onClick={toggleBottomTerminal}
          className="px-2 hover:bg-interactive-hover"
        >
          <Icon name="git-branch" className="h-3.5 w-3.5" />
          <span>main</span>
        </StatusBarItem>
        <StatusBarDivider />
        <StatusBarItem className="px-2">
          <span>0 errors</span>
        </StatusBarItem>
        <StatusBarItem className="px-2">
          <span>0 warnings</span>
        </StatusBarItem>
      </div>

      {/* Right section */}
      <div className="flex h-full items-center">
        <StatusBarItem
          onClick={() => toggleBottomTerminal()}
          className={cn(
            'px-2 hover:bg-interactive-hover',
            isBottomTerminalOpen && 'bg-interactive-hover'
          )}
        >
          <Icon name="terminal-box" className="h-3.5 w-3.5" />
          <span>Terminal</span>
        </StatusBarItem>
        <StatusBarDivider />
        <StatusBarItem
          onClick={() => setSettingsDialogOpen(!isSettingsDialogOpen)}
          className="px-2 hover:bg-interactive-hover"
        >
          <Icon name="settings-3" className="h-3.5 w-3.5" />
        </StatusBarItem>
        <StatusBarDivider />
        <StatusBarItem className="px-2">
          <span className={cn(
            'inline-block h-2 w-2 rounded-full',
            connectionStatus === 'connected' && 'bg-[var(--status-success)]',
            connectionStatus === 'disconnected' && 'bg-[var(--status-error)]',
            connectionStatus === 'loading' && 'bg-[var(--status-warning)] animate-pulse'
          )} />
          <span>{connectionStatus === 'connected' ? 'Connected' : connectionStatus === 'disconnected' ? 'Disconnected' : 'Connecting...'}</span>
        </StatusBarItem>
      </div>
    </footer>
  );
};

const StatusBarItem: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}> = ({ children, onClick, className }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex h-full items-center gap-1.5',
        'transition-colors duration-100',
        onClick && 'cursor-pointer',
        !onClick && 'cursor-default',
        className
      )}
    >
      {children}
    </button>
  );
};

const StatusBarDivider: React.FC = () => (
  <div className="h-3 w-px bg-border/50 mx-0.5" />
);
