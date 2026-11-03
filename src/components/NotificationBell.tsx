import { useEffect, useRef, useState } from 'react';
import { notificationsApi } from '../lib/api';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

const TYPE_COLORS: Record<string, string> = {
  SUCCESS: 'text-green-400',
  ERROR: 'text-red-400',
  WARNING: 'text-yellow-400',
  INFO: 'text-blue-400',
};

const TYPE_DOT: Record<string, string> = {
  SUCCESS: 'bg-green-400',
  ERROR: 'bg-red-400',
  WARNING: 'bg-yellow-400',
  INFO: 'bg-blue-400',
};

export const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const fetchNotifications = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const res = await notificationsApi.getAll(30);
      setNotifications(res.notifications || []);
      setUnreadCount(res.unreadCount || 0);
    } catch {
      // silently fail
    }
  };

  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30_000); // poll every 30s
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleOpen = async () => {
    setOpen((prev) => !prev);
    if (!open && unreadCount > 0) {
      // Mark all as read when opening
      try {
        await notificationsApi.markAllRead();
        setUnreadCount(0);
        setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      } catch {
        // ignore
      }
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await notificationsApi.markRead(id);
      setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, isRead: true } : n));
    } catch {
      // ignore
    }
  };

  return (
    <div ref={ref} className="relative">
      {/* Bell button */}
      <button
        id="notification-bell-btn"
        onClick={handleOpen}
        className="relative w-9 h-9 flex items-center justify-center rounded-full bg-neutral-800/60 hover:bg-neutral-700/80 transition-colors border border-neutral-700/50"
        aria-label={`Notifications${unreadCount > 0 ? ` (${unreadCount} unread)` : ''}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#ff6a00] text-white text-[10px] font-bold px-1 leading-none shadow-lg animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute right-0 top-11 w-[340px] max-h-[480px] bg-neutral-900 border border-neutral-700 rounded-2xl shadow-2xl flex flex-col z-[200] overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 border-b border-neutral-800 flex items-center justify-between flex-shrink-0">
            <span className="font-semibold text-sm">Notifications</span>
            {notifications.length > 0 && (
              <button
                onClick={async () => {
                  await notificationsApi.markAllRead();
                  setUnreadCount(0);
                  setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
                }}
                className="text-xs text-[#ff6a00] hover:text-[#ee0979] transition-colors"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-sm">No notifications yet</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.isRead && handleMarkRead(n.id)}
                  className={`flex items-start gap-3 px-4 py-3 border-b border-neutral-800/60 last:border-0 cursor-pointer transition-colors hover:bg-neutral-800/40 ${n.isRead ? 'opacity-60' : ''}`}
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${n.isRead ? 'bg-gray-600' : (TYPE_DOT[n.type] || 'bg-blue-400')}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${n.isRead ? 'text-gray-400' : (TYPE_COLORS[n.type] || 'text-white')}`}>
                      {n.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-gray-600 mt-1">
                      {new Date(n.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
