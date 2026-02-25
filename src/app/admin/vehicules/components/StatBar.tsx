import { VEHICULES_STATS_DATA as STATS_DATA } from "@/core/data/mock/vehicules";

export function StatBar() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {STATS_DATA.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border bg-card p-4 shadow-sm"
          >
            <div
              className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${stat.iconBg}`}
            >
              <Icon className={`size-5 ${stat.iconColor}`} />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-lg font-bold">{stat.value}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
