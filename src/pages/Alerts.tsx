import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, Info, Bell, MapPin, Clock } from "lucide-react";

const alerts = [
  {
    id: 1, type: "critical" as const, crop: "Potato", zone: "Zone A — Field 3",
    title: "Late Blight Risk — CRITICAL",
    msg: "Humidity sustained above 85% for 8 hours combined with temperatures between 15-25°C. Phytophthora infestans conditions detected.",
    action: "Apply metalaxyl-based fungicide within 24 hours. Inspect all potato fields.",
    time: "35 min ago",
  },
  {
    id: 2, type: "warning" as const, crop: "Tomato", zone: "Zone B — Greenhouse 1",
    title: "Early Blight Detected",
    msg: "AI Vision Engine detected Alternaria solani patterns on 3 uploaded leaf samples with 94% confidence.",
    action: "Remove affected leaves. Apply chlorothalonil every 7-10 days.",
    time: "2 hours ago",
  },
  {
    id: 3, type: "info" as const, crop: "Maize", zone: "Zone C — Field 7",
    title: "Soil Moisture Below Optimal",
    msg: "Soil moisture at 28%, below the 35% threshold for maize during tasseling stage.",
    action: "Increase irrigation frequency. Monitor for next 48 hours.",
    time: "4 hours ago",
  },
  {
    id: 4, type: "resolved" as const, crop: "Bean", zone: "Zone A — Field 1",
    title: "Rust Alert Resolved",
    msg: "Previous rust risk alert resolved. Fungicide application successful, no new symptoms detected.",
    action: "Continue monitoring. Next inspection scheduled in 5 days.",
    time: "1 day ago",
  },
];

const typeConfig = {
  critical: { icon: AlertTriangle, badge: "bg-destructive text-destructive-foreground", border: "border-destructive/30" },
  warning: { icon: AlertTriangle, badge: "bg-warning text-warning-foreground", border: "border-warning/30" },
  info: { icon: Info, badge: "bg-info text-info-foreground", border: "border-info/30" },
  resolved: { icon: CheckCircle, badge: "bg-success text-success-foreground", border: "border-success/30" },
};

const Alerts = () => {
  return (
    <div className="container py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Risk Alerts</h1>
          <p className="text-muted-foreground">Active alerts from AI Vision Engine and Sentinel Network</p>
        </div>
        <Badge variant="outline" className="gap-1">
          <Bell className="h-3 w-3" /> {alerts.filter((a) => a.type !== "resolved").length} Active
        </Badge>
      </div>

      <div className="space-y-4">
        {alerts.map((a) => {
          const cfg = typeConfig[a.type];
          const Icon = cfg.icon;
          return (
            <Card key={a.id} className={cfg.border}>
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="mt-1 shrink-0">
                    <Icon className={`h-5 w-5 ${
                      a.type === "critical" ? "text-destructive" :
                      a.type === "warning" ? "text-warning" :
                      a.type === "info" ? "text-info" : "text-success"
                    }`} />
                  </div>
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-display font-semibold">{a.title}</h3>
                      <Badge className={cfg.badge}>{a.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">{a.msg}</p>
                    <div className="rounded-lg bg-accent/50 p-3">
                      <p className="text-sm font-medium">Recommended Action:</p>
                      <p className="text-sm text-muted-foreground">{a.action}</p>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {a.zone}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {a.time}</span>
                      <span className="flex items-center gap-1">🌾 {a.crop}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Alerts;
