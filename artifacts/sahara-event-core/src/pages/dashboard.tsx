import React from "react";
import { TopNav } from "@/components/top-nav";
import { useGetEventStatus, useGetNotifications, useGetDashboardStats } from "@workspace/api-client-react";

export default function Dashboard() {
  const { data: eventStatus } = useGetEventStatus({ query: { refetchInterval: 30000 } });
  const { data: notifications } = useGetNotifications({ query: { refetchInterval: 30000 } });
  const { data: stats } = useGetDashboardStats({ query: { refetchInterval: 30000 } });

  const recentAlerts = notifications?.filter(n => !n.isDismissed).slice(0, 3) || [];

  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col">
      <TopNav />
      <main className="flex-1 max-w-[1440px] mx-auto w-full p-6 md:p-8">
        <section className="mb-10">
          <h1 className="font-serif text-5xl font-medium tracking-tight text-foreground">
            Welcome back, Arthur.
          </h1>
          <p className="text-secondary mt-2 text-lg">Your curated matchday experience awaits.</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Live Match Card */}
          <div className="col-span-1 md:col-span-8 rounded-[1.5rem] bg-white/40 backdrop-blur-xl border border-border p-8 shadow-[0_2px_16px_rgba(58,48,42,0.04)] relative overflow-hidden">
            <div className="absolute top-6 right-6 flex items-center gap-2 bg-white px-3 py-1.5 rounded-full shadow-sm border border-border/50">
              <span className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
              <span className="text-xs font-bold tracking-wider text-foreground">LIVE NOW</span>
            </div>
            
            <div className="flex flex-col items-center justify-center py-6">
              <span className="text-sm font-medium text-secondary mb-4 uppercase tracking-wider">{eventStatus?.stage || "CHAMPIONSHIP"}</span>
              <div className="flex items-center justify-center gap-12 w-full">
                <div className="text-center w-32">
                  <div className="text-3xl font-serif font-bold text-foreground truncate">{eventStatus?.homeTeam || "Eagles"}</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="text-6xl font-serif font-bold text-primary tracking-tighter tabular-nums">
                    {eventStatus?.homeScore ?? 0} - {eventStatus?.awayScore ?? 0}
                  </div>
                  <div className="text-sm font-medium text-secondary mt-2">{eventStatus?.minute ?? 0}'</div>
                </div>
                <div className="text-center w-32">
                  <div className="text-3xl font-serif font-bold text-foreground truncate">{eventStatus?.awayTeam || "Lions"}</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-border flex justify-between items-center px-4">
              <div className="flex flex-col items-center">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">Possession</span>
                <span className="text-xl font-bold text-foreground">{eventStatus?.possession ?? 50}%</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">Atmosphere</span>
                <span className="text-xl font-bold text-foreground">{eventStatus?.atmosphereDb ?? 0} dB</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-secondary font-medium uppercase tracking-wider mb-1">Weather</span>
                <span className="text-xl font-bold text-foreground">{eventStatus?.weatherCelsius ?? 0}°C</span>
              </div>
            </div>
          </div>

          {/* Sidebar Alerts */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-6">
            <div className="rounded-[1.5rem] bg-card border border-border p-6 shadow-[0_2px_16px_rgba(58,48,42,0.04)]">
              <h2 className="font-serif text-2xl font-medium mb-4">Real-time Alerts</h2>
              <div className="flex flex-col gap-3">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className={`border-l-4 p-4 rounded-r-xl bg-background shadow-sm ${alert.priority === "critical" ? "border-l-destructive" : "border-l-primary"}`}>
                    <div className="font-medium text-foreground">{alert.title}</div>
                    <div className="text-sm text-secondary mt-1">{alert.message}</div>
                  </div>
                ))}
                {recentAlerts.length === 0 && (
                  <div className="text-sm text-secondary py-4 text-center">No active alerts.</div>
                )}
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-card border border-border p-6 shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex-1 flex flex-col justify-center items-center text-center">
              <span className="material-symbols-outlined text-primary text-4xl mb-2">chair</span>
              <h3 className="font-serif text-xl font-medium mb-1">Find My Seat</h3>
              <p className="text-sm text-secondary mb-4">Sec {eventStatus?.userSection || "A1"}, Row {eventStatus?.userRow || "12"}, Seat {eventStatus?.userSeat || "5"}</p>
              <button className="px-6 py-2 rounded-full border border-primary text-primary text-sm font-medium hover:bg-primary/5 transition-colors">
                View Route
              </button>
            </div>
          </div>

          {/* Crowd Density Widget */}
          <div className="col-span-1 md:col-span-7 rounded-[1.5rem] bg-card border border-border overflow-hidden shadow-[0_2px_16px_rgba(58,48,42,0.04)] flex flex-col">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h2 className="font-serif text-2xl font-medium">Crowd Density</h2>
              <div className="flex bg-background rounded-full p-1 border border-border">
                <button className="px-4 py-1 text-sm font-medium rounded-full bg-white shadow-sm text-foreground">L1</button>
                <button className="px-4 py-1 text-sm font-medium rounded-full text-secondary hover:text-foreground">L2</button>
              </div>
            </div>
            <div className="flex-1 flex p-6 gap-6 items-center">
              {/* Map Placeholder */}
              <div className="w-1/2 h-full min-h-[200px] rounded-xl bg-[#1a1208] relative overflow-hidden flex items-center justify-center">
                 <img src="/stadium.png" alt="Narendra Modi Stadium" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" />
                 <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/40 rounded-full blur-2xl"></div>
                 <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-destructive/40 rounded-full blur-2xl"></div>
                 <span className="text-white/80 font-mono text-sm tracking-widest z-10 font-bold bg-black/50 px-3 py-1 rounded">NARENDRA MODI STADIUM</span>
              </div>
              <div className="w-1/2 flex flex-col gap-4">
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-medium">Fan Zone</span><span className="text-secondary">Moderate</span></div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden"><div className="h-full bg-primary w-[45%] rounded-full"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-medium">Concourse A</span><span className="text-destructive font-medium">Peak</span></div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden"><div className="h-full bg-destructive w-[85%] rounded-full"></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1"><span className="font-medium">Food Court</span><span className="text-secondary">Low</span></div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden"><div className="h-full bg-green-600 w-[20%] rounded-full"></div></div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="col-span-1 md:col-span-5 grid grid-cols-2 gap-4">
             <div className="rounded-[1.5rem] bg-primary text-primary-foreground p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:brightness-110 transition-all">
                <span className="material-symbols-outlined text-3xl mb-4">room_service</span>
                <span className="font-serif text-xl font-medium">Order Food</span>
             </div>
             <div className="rounded-[1.5rem] bg-card border border-border text-foreground p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-card/80 transition-all">
                <span className="material-symbols-outlined text-3xl mb-4 text-primary">directions_run</span>
                <span className="font-medium">Shortest Exit Route</span>
             </div>
             <div className="rounded-[1.5rem] bg-card border border-border text-foreground p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-card/80 transition-all">
                <span className="material-symbols-outlined text-3xl mb-4 text-primary">directions_car</span>
                <span className="font-medium">My Parking</span>
             </div>
             <div className="rounded-[1.5rem] bg-card border border-border text-foreground p-6 shadow-sm flex flex-col justify-between cursor-pointer hover:bg-card/80 transition-all">
                <span className="material-symbols-outlined text-3xl mb-4 text-primary">support_agent</span>
                <span className="font-medium">Call Concierge</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
