import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Droplets, Thermometer, Wind, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const moistureData = [
  { time: "6AM", value: 45 }, { time: "8AM", value: 48 }, { time: "10AM", value: 42 },
  { time: "12PM", value: 38 }, { time: "2PM", value: 35 }, { time: "4PM", value: 40 },
  { time: "6PM", value: 44 },
];

const tempData = [
  { time: "6AM", temp: 18, humidity: 82 }, { time: "8AM", temp: 22, humidity: 75 },
  { time: "10AM", temp: 27, humidity: 65 }, { time: "12PM", temp: 31, humidity: 55 },
  { time: "2PM", temp: 33, humidity: 50 }, { time: "4PM", temp: 29, humidity: 58 },
  { time: "6PM", temp: 24, humidity: 68 },
];

const riskData = [
  { crop: "Tomato", risk: 72 }, { crop: "Maize", risk: 35 }, { crop: "Potato", risk: 88 },
  { crop: "Bean", risk: 20 }, { crop: "Wheat", risk: 55 },
];

const sensorCards = [
  { label: "Soil Moisture", value: "42%", status: "Normal", icon: Droplets, color: "text-info" },
  { label: "Temperature", value: "28°C", status: "Elevated", icon: Thermometer, color: "text-warning" },
  { label: "Humidity", value: "65%", status: "Watch", icon: Wind, color: "text-secondary" },
];

const alerts = [
  { type: "warning", msg: "Potato Late Blight risk HIGH — humidity above 80% for 6+ hours", time: "2h ago" },
  { type: "success", msg: "Maize fields — All sensor readings within safe range", time: "4h ago" },
  { type: "warning", msg: "Tomato Early Blight detected in Zone B — Treatment recommended", time: "6h ago" },
];

const Dashboard = () => {
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Sensor Dashboard</h1>
        <p className="text-muted-foreground">Real-time environmental monitoring across your fields</p>
      </div>

      {/* Sensor Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {sensorCards.map((s) => (
          <Card key={s.label} className="bg-card">
            <CardContent className="flex items-center gap-4 p-6">
              <div className="rounded-xl bg-accent p-3">
                <s.icon className={`h-6 w-6 ${s.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{s.label}</p>
                <p className="font-display text-2xl font-bold">{s.value}</p>
                <Badge variant={s.status === "Normal" ? "default" : "secondary"} className="mt-1 text-xs">
                  {s.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <Droplets className="h-5 w-5 text-info" /> Soil Moisture (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={moistureData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="hsl(200, 80%, 50%)" fill="hsl(200, 80%, 50%, 0.15)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <Thermometer className="h-5 w-5 text-warning" /> Temperature & Humidity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={tempData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Line type="monotone" dataKey="temp" stroke="hsl(38, 85%, 55%)" strokeWidth={2} name="Temp (°C)" />
                <Line type="monotone" dataKey="humidity" stroke="hsl(142, 50%, 28%)" strokeWidth={2} name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Risk + Alerts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <TrendingUp className="h-5 w-5 text-destructive" /> Disease Risk Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={riskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="crop" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="risk" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-display text-lg">
              <AlertTriangle className="h-5 w-5 text-warning" /> Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((a, i) => (
              <div key={i} className="flex gap-3 rounded-lg border bg-background p-4">
                {a.type === "warning" ? (
                  <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
                ) : (
                  <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                )}
                <div className="flex-1">
                  <p className="text-sm">{a.msg}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{a.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
