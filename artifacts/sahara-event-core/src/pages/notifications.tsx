import React from "react";
import { SideNav } from "@/components/side-nav";
import { useGetNotifications, useDismissNotification } from "@workspace/api-client-react";

export default function Notifications() {
  const { data: notifications } = useGetNotifications({ query: { refetchInterval: 30000 } });
  const dismissNotification = useDismissNotification();

  const handleDismiss = (id: string) => {
    dismissNotification.mutate({ id });
  };

  const visibleNotifications = notifications?.filter(n => !n.isDismissed) || [];

  return (
    <div className="min-h-[100dvh] bg-background pl-16 flex flex-col">
      <SideNav />
      <main className="flex-1 w-full max-w-[1200px] mx-auto p-6 md:p-8">
        <header className="mb-10">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground">
            Real-time Activity.
          </h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleNotifications.map(notification => {
            if (notification.priority === "critical") {
              return (
                <div key={notification.id} className="col-span-1 md:col-span-2 bg-destructive/10 border border-destructive/20 rounded-[1.5rem] p-6 flex gap-6 shadow-sm">
                  <div className="w-16 h-16 bg-destructive rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-white text-3xl">warning</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-serif text-2xl font-medium text-destructive">{notification.title}</h3>
                      <span className="text-xs text-destructive/70 font-medium">{notification.timestamp}</span>
                    </div>
                    <p className="text-foreground/80 mb-4">{notification.message}</p>
                    <div className="flex gap-3">
                      <button className="px-5 py-2 bg-destructive text-white rounded-lg text-sm font-bold uppercase tracking-wider shadow-sm hover:bg-destructive/90 transition-colors">
                        View Route Map
                      </button>
                      <button onClick={() => handleDismiss(notification.id)} className="px-5 py-2 border border-destructive/30 text-destructive rounded-lg text-sm font-bold uppercase tracking-wider hover:bg-destructive/10 transition-colors">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            if (notification.priority === "high") {
              return (
                <div key={notification.id} className="bg-card border border-border rounded-[1.5rem] p-6 shadow-sm flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">star</span>
                      <h4 className="font-serif text-xl font-medium">{notification.title}</h4>
                    </div>
                    <span className="text-xs text-secondary">{notification.timestamp}</span>
                  </div>
                  <p className="text-secondary text-sm mb-6 flex-1">{notification.message}</p>
                  <div className="h-32 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 mb-4 border border-primary/10 flex items-center justify-center">
                    <span className="text-primary/50 font-medium text-sm italic">Exclusive Content</span>
                  </div>
                  <button onClick={() => handleDismiss(notification.id)} className="w-full py-2.5 rounded-lg border border-border text-secondary text-sm font-bold uppercase tracking-wider hover:bg-background transition-colors">
                    Dismiss
                  </button>
                </div>
              );
            }

            if (notification.priority === "medium") {
              return (
                <div key={notification.id} className="bg-card border border-border rounded-[1.5rem] p-6 shadow-sm flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-secondary">groups</span>
                       <h4 className="font-medium">{notification.title}</h4>
                     </div>
                     <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[10px] font-bold uppercase tracking-wider">Alert</span>
                  </div>
                  <p className="text-secondary text-sm mb-4">{notification.message}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-xs text-secondary/70">{notification.timestamp}</span>
                    <button onClick={() => handleDismiss(notification.id)} className="text-xs text-secondary hover:text-foreground font-medium underline underline-offset-4">
                      Dismiss
                    </button>
                  </div>
                </div>
              );
            }

            return (
              <div key={notification.id} className="bg-transparent border border-border rounded-[1.5rem] p-5 flex items-start gap-4">
                 <span className="material-symbols-outlined text-secondary mt-0.5">info</span>
                 <div className="flex-1">
                   <div className="flex justify-between">
                     <h4 className="text-sm font-medium text-foreground">{notification.title}</h4>
                     <span className="text-xs text-secondary/60">{notification.timestamp}</span>
                   </div>
                   <p className="text-xs text-secondary mt-1 mb-2">{notification.message}</p>
                   <button onClick={() => handleDismiss(notification.id)} className="text-[10px] uppercase tracking-wider font-bold text-secondary hover:text-foreground transition-colors">
                     Dismiss
                   </button>
                 </div>
              </div>
            );
          })}

          {visibleNotifications.length === 0 && (
            <div className="col-span-1 md:col-span-2 py-20 text-center flex flex-col items-center">
               <span className="material-symbols-outlined text-border text-6xl mb-4">notifications_off</span>
               <h3 className="font-serif text-2xl font-medium text-secondary mb-2">All Caught Up</h3>
               <p className="text-secondary/70">You have no new notifications at this time.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
