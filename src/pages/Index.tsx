import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Eye, Wifi, Zap, ArrowRight, Users, TrendingUp, Shield } from "lucide-react";
import heroFarm from "@/assets/hero-farm.jpg";

const features = [
  {
    icon: Eye,
    title: "Vision Engine",
    desc: "AI-powered image recognition detects Blight, Rust, and Infestations from leaf photos in seconds.",
  },
  {
    icon: Wifi,
    title: "Sentinel Network",
    desc: "IoT sensors monitor soil moisture, temperature, and humidity to predict pathogen-friendly conditions.",
  },
  {
    icon: Zap,
    title: "Network Optimizer",
    desc: "Edge-optimized for 3G networks. Get diagnoses in under 3 seconds, even on weak signals.",
  },
];

const stats = [
  { value: "+40%", label: "Yield Recovery", icon: TrendingUp },
  { value: "-30%", label: "Chemical Use", icon: Shield },
  { value: "<5s", label: "Response Time", icon: Zap },
  { value: "100+", label: "Crop Varieties", icon: Leaf },
];

const team = [
  "Kevin Omondi", "Mitchelle Otieno", "Charles Okindo", "Eugene Omondi",
  "Anthony Mulila", "Silas Kimweli", "Eugene Kipchirchir",
];

const Index = () => {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroFarm} alt="Lush green farmland at sunrise" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
        </div>
        <div className="container relative z-10 py-20">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-medium text-primary-foreground backdrop-blur-sm">
              <Leaf className="h-4 w-4" />
              SDG 2 — Zero Hunger
            </div>
            <h1 className="mb-6 font-display text-5xl font-bold leading-tight text-primary-foreground md:text-6xl">
              Predict & Prevent
              <br />
              <span className="text-secondary">Crop Disease</span>
            </h1>
            <p className="mb-8 max-w-lg text-lg text-primary-foreground/80">
              AI-powered early detection that converts "observe and react" farming into a "predict and prevent" digital ecosystem.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/diagnose">
                  Start Diagnosis <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container py-24">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold md:text-4xl">The Triple-Threat Solution</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Our system doesn't just look at a leaf — it understands the entire agricultural environment.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="border-border bg-card transition-shadow hover:shadow-lg">
              <CardContent className="p-8">
                <div className="mb-4 inline-flex rounded-xl bg-accent p-3">
                  <f.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 font-display text-xl font-semibold">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon className="mx-auto mb-2 h-6 w-6 text-secondary" />
                <div className="font-display text-3xl font-bold text-primary-foreground md:text-4xl">{s.value}</div>
                <div className="mt-1 text-sm text-primary-foreground/70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="container py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 font-display text-3xl font-bold">Group 5 — Our Team</h2>
          <p className="text-muted-foreground">Building the future of precision agriculture</p>
        </div>
        <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
          {team.map((name) => (
            <div key={name} className="flex items-center gap-2 rounded-full border bg-card px-5 py-2.5">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">{name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-display text-sm font-semibold">CropGuard AI</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI Crop Disease Early Detection Ecosystem — SDG 2: Zero Hunger
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
