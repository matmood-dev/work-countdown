export const theme = {
colors: {
bg: "#0B1220",
card: "#101827",
cardAlt: "#0f172a",
text: "#E5E7EB",
muted: "#94A3B8",
primary: "#22D3EE",
primaryAlt: "#38BDF8",
danger: "#F43F5E",
ring: "#22d3ee33",
border: "#1f2a44",
},
radii: {
sm: "10px",
md: "14px",
lg: "20px",
pill: "999px",
},
shadow: {
soft: "0 8px 30px rgba(0,0,0,.25)",
},
fonts: {
mono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
sans: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji','Segoe UI Emoji'",
},
} as const;


export type AppTheme = typeof theme;