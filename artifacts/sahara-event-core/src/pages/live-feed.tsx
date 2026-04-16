import React from "react";
import { SideNav } from "@/components/side-nav";
import { useGetDashboardStats, useGetGateStatus, useGetAmenityStatus, useGetCongestionForecast, useGetVendors } from "@workspace/api-client-react";

export default function LiveFeed() {
  const { data: stats } = useGetDashboardStats({ query: { refetchInterval: 30000 } });
  const { data: gates } = useGetGateStatus({ query: { refetchInterval: 30000 } });
  const { data: amenities } = useGetAmenityStatus({ query: { refetchInterval: 30000 } });
  const { data: forecast } = useGetCongestionForecast({ query: { refetchInterval: 30000 } });
  const { data: vendors } = useGetVendors(undefined, { query: { refetchInterval: 30000 } });

  const getStatusColor = (status: string) => {
    if (status === 'smooth' || status === 'vacant' || status === 'low') return 'text-green-600 bg-green-50';
    if (status === 'moderate') return 'text-primary bg-primary/10';
    if (status === 'critical' || status === 'at_capacity' || status === 'peak') return 'text-destructive bg-destructive/10';
    return 'text-secondary bg-secondary/10';
  };

  const getBgColor = (status: string) => {
    if (status === 'smooth' || status === 'vacant' || status === 'low') return 'bg-green-600';
    if (status === 'moderate') return 'bg-primary';
    if (status === 'critical' || status === 'at_capacity' || status === 'peak') return 'bg-destructive';
    return 'bg-secondary';
  };

  return (
    <div className="min-h-[100dvh] bg-background pl-16 flex flex-col">
      <SideNav />
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-6 md:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="font-serif text-4xl font-medium tracking-tight">Live Crowd Intelligence</h1>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-sm">search</span>
            <input type="text" placeholder="Search venue..." className="pl-9 pr-4 py-2 rounded-full border border-border bg-white text-sm w-64 focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </header>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col">
            <span className="text-sm text-secondary font-medium uppercase tracking-wider mb-2">Total Attendance</span>
            <span className="text-3xl font-bold">{stats?.totalAttendance?.toLocaleString() || "0"}</span>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col">
            <span className="text-sm text-secondary font-medium uppercase tracking-wider mb-2">Avg Gate Entry</span>
            <span className="text-3xl font-bold">{stats?.avgGateEntryMinutes || "0"}<span className="text-lg text-secondary ml-1 font-normal">min</span></span>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col">
            <span className="text-sm text-destructive font-medium uppercase tracking-wider mb-2">Active Alerts</span>
            <span className="text-3xl font-bold text-destructive">{stats?.activeAlerts || "0"}</span>
          </div>
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm flex flex-col">
            <span className="text-sm text-secondary font-medium uppercase tracking-wider mb-2">System Health</span>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-xl font-bold">{stats?.systemHealth || "100"}%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Bento - Gates */}
          <div className="col-span-1 lg:col-span-8 flex flex-col gap-6">
            <div className="bg-card rounded-[1.5rem] border border-border shadow-sm overflow-hidden flex flex-col relative pb-16">
              <div className="p-6 border-b border-border">
                <h2 className="font-serif text-2xl font-medium">Entry Gate Intelligence</h2>
              </div>
              <div className="p-0">
                {gates?.map((gate, i) => (
                  <div key={gate.id} className={`p-6 flex items-center justify-between ${i !== gates.length - 1 ? 'border-b border-border/50' : ''}`}>
                    <div className="w-1/4">
                      <div className="font-bold text-lg">{gate.name}</div>
                      <div className="text-sm text-secondary">{gate.location}</div>
                    </div>
                    <div className="w-1/4 flex justify-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${getStatusColor(gate.congestion)}`}>
                        {gate.waitMinutes} Min Wait
                      </span>
                    </div>
                    <div className="w-1/3 flex items-center">
                      <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                        <div className={`h-full ${getBgColor(gate.congestion)} rounded-full`} style={{ width: `${gate.fillPercent}%` }}></div>
                      </div>
                    </div>
                    <div className="w-1/6 text-right">
                      <div className="font-medium">{gate.passengersPerMin}</div>
                      <div className="text-xs text-secondary">pax/min</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-primary/10 border-t border-primary/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                  <span className="text-sm font-medium text-foreground">Suggestion: Reroute Gate 03 traffic to Gate 05</span>
                </div>
                <button className="px-4 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-md hover:bg-primary/90 transition-colors uppercase tracking-wider">
                  Deploy Alert
                </button>
              </div>
            </div>

            {/* Map Heatmap */}
            <div className="bg-[#1a1208] rounded-[1.5rem] h-[400px] relative overflow-hidden shadow-md">
              <div className="absolute inset-0 opacity-40 mix-blend-screen" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #c2652a 0%, transparent 40%), radial-gradient(circle at 70% 30%, #c0392b 0%, transparent 30%)' }}></div>
              <div className="absolute top-4 right-4 flex gap-2">
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>layers</span> Layers
                </button>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-4 py-2 rounded-full transition-colors uppercase tracking-wider flex items-center gap-2">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>my_location</span> Re-Center
                </button>
              </div>
              <div className="absolute bottom-4 left-4">
                <div className="text-white/50 font-mono text-xs tracking-widest mb-1">LIVE HEATMAP</div>
                <div className="text-white font-medium text-lg">Main Concourse Level 1</div>
              </div>
            </div>
          </div>

          {/* Right Col */}
          <div className="col-span-1 lg:col-span-4 flex flex-col gap-6">
            {/* Forecast Card */}
            <div className="bg-primary rounded-[1.5rem] p-6 text-primary-foreground shadow-sm">
              <div className="flex items-center gap-2 mb-4 opacity-80">
                <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>analytics</span>
                <span className="text-xs font-bold uppercase tracking-wider">Predictive Model</span>
              </div>
              <h3 className="font-serif text-xl font-medium mb-3">{forecast?.forecastText || "Congestion predicted at Main Gate in 15 mins."}</h3>
              <p className="text-sm opacity-90 mb-6">{forecast?.reason || "Based on historical arrival patterns and current transport delays."}</p>
              <button className="w-full py-2.5 rounded-lg border border-primary-foreground/30 hover:bg-primary-foreground/10 transition-colors text-sm font-bold uppercase tracking-wider text-center">
                Apply Dynamic Rerouting
              </button>
            </div>

            {/* Amenities */}
            <div className="bg-card rounded-[1.5rem] border border-border p-6 shadow-sm">
              <h3 className="font-serif text-xl font-medium mb-4">Amenities Status</h3>
              <div className="flex flex-col gap-4">
                {amenities?.map(amenity => (
                  <div key={amenity.id} className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-sm">{amenity.name}</div>
                      <div className="text-xs text-secondary">{amenity.location}</div>
                    </div>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusColor(amenity.status)}`}>
                      {amenity.status.replace('_', ' ')}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Food & Beverage */}
            <div className="bg-card rounded-[1.5rem] border border-border p-6 shadow-sm">
              <h3 className="font-serif text-xl font-medium mb-4">F&B Quick View</h3>
              <div className="flex flex-col gap-3">
                {vendors?.slice(0, 4).map(vendor => (
                  <div key={vendor.id} className="flex justify-between items-center text-sm">
                    <span className="font-medium">{vendor.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-secondary">{vendor.waitMinutes}m</span>
                      <span className={`w-2 h-2 rounded-full ${vendor.waitMinutes > 15 ? 'bg-destructive' : vendor.waitMinutes > 5 ? 'bg-primary' : 'bg-green-500'}`}></span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 py-2 text-sm text-primary font-medium hover:bg-primary/5 rounded-lg transition-colors border border-transparent hover:border-primary/20">
                View All Vendors
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
