import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Upload, Camera, Leaf, AlertTriangle, CheckCircle, Pill } from "lucide-react";
import leafDiagnosis from "@/assets/leaf-diagnosis.png";

interface DiagnosisResult {
  disease: string;
  confidence: number;
  severity: "Low" | "Medium" | "High";
  description: string;
  treatments: string[];
}

const mockResults: DiagnosisResult[] = [
  {
    disease: "Early Blight (Alternaria solani)",
    confidence: 94,
    severity: "Medium",
    description: "Circular brown spots with concentric rings on lower leaves. Typically spreads in warm, humid conditions.",
    treatments: [
      "Apply chlorothalonil-based fungicide every 7-10 days",
      "Remove and destroy affected leaves immediately",
      "Improve air circulation by proper spacing",
      "Avoid overhead watering — use drip irrigation",
    ],
  },
];

const Diagnose = () => {
  const [image, setImage] = useState<string | null>(null);
  const [diagnosing, setDiagnosing] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => setImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setResult(null);
  };

  const runDiagnosis = () => {
    setDiagnosing(true);
    setTimeout(() => {
      setResult(mockResults[0]);
      setDiagnosing(false);
    }, 2000);
  };

  const useSample = () => {
    setImage(leafDiagnosis);
    setResult(null);
  };

  const severityColor = (s: string) =>
    s === "High" ? "bg-destructive text-destructive-foreground" :
    s === "Medium" ? "bg-warning text-warning-foreground" :
    "bg-success text-success-foreground";

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Disease Diagnosis</h1>
        <p className="text-muted-foreground">Upload a leaf image for instant AI-powered disease detection</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Upload */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-display text-lg">
                <Camera className="h-5 w-5 text-primary" /> Upload Leaf Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              {!image ? (
                <div
                  onClick={() => fileRef.current?.click()}
                  className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-background p-12 transition-colors hover:border-primary hover:bg-accent/50"
                >
                  <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                  <p className="mb-1 font-medium">Click to upload or drag & drop</p>
                  <p className="text-sm text-muted-foreground">JPG, PNG up to 10MB</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-xl border">
                    <img src={image} alt="Uploaded leaf" className="h-64 w-full object-contain bg-background" />
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={runDiagnosis} disabled={diagnosing} className="flex-1 gap-2">
                      <Leaf className="h-4 w-4" />
                      {diagnosing ? "Analyzing..." : "Run Diagnosis"}
                    </Button>
                    <Button variant="outline" onClick={() => { setImage(null); setResult(null); }}>
                      Clear
                    </Button>
                  </div>
                </div>
              )}
              {!image && (
                <Button variant="ghost" className="mt-4 w-full text-sm text-muted-foreground" onClick={useSample}>
                  Or try with a sample image →
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          {diagnosing && (
            <Card className="border-primary/30">
              <CardContent className="flex flex-col items-center p-12">
                <Leaf className="mb-4 h-10 w-10 animate-pulse-soft text-primary" />
                <p className="font-display font-semibold">Analyzing leaf patterns...</p>
                <p className="text-sm text-muted-foreground">AI Vision Engine processing</p>
              </CardContent>
            </Card>
          )}

          {result && (
            <>
              <Card className="border-warning/40">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="flex items-center gap-2 font-display text-lg">
                      <AlertTriangle className="h-5 w-5 text-warning" /> Detection Result
                    </CardTitle>
                    <Badge className={severityColor(result.severity)}>{result.severity} Severity</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-display text-xl font-bold">{result.disease}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="h-2 flex-1 rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${result.confidence}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{result.confidence}%</span>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">Confidence Score</p>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{result.description}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 font-display text-lg">
                    <Pill className="h-5 w-5 text-success" /> Recommended Treatment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {result.treatments.map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </>
          )}

          {!diagnosing && !result && (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center p-12 text-center">
                <Leaf className="mb-4 h-10 w-10 text-muted-foreground/40" />
                <p className="font-display font-semibold text-muted-foreground">No diagnosis yet</p>
                <p className="text-sm text-muted-foreground/60">Upload a leaf image to get started</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Diagnose;
