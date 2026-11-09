import type { ReactNode } from "react";

export const colors = { blue: "#2d3cff", navy: "#0f1430", mango: "#ffc24d", white: "#ffffff", paper: "#f4f1ea", ink: "#0d1020" };

export type Tone = "light" | "blue" | "navy" | "mono" | "reverse";

const palette: Record<Tone, { main: string; accent: string }> = {
  light: { main: colors.blue, accent: colors.mango },
  blue: { main: colors.white, accent: colors.mango },
  navy: { main: colors.white, accent: colors.mango },
  mono: { main: colors.ink, accent: colors.ink },
  reverse: { main: colors.white, accent: colors.white },
};

type MarkProps = { tone?: Tone; tile?: boolean; round?: boolean; size?: number | string; className?: string };

function Frame({ tone = "light", tile, round, size = 64, className, children }: MarkProps & { children: (main: string, accent: string) => ReactNode }) {
  const tileColor = tone === "navy" ? colors.navy : colors.blue;
  const inner = tile ? palette[tone === "light" ? "blue" : tone] : palette[tone];
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden>
      {tile && <rect width="64" height="64" rx={round ? 32 : 15} fill={tone === "mono" ? colors.ink : tone === "reverse" ? colors.white : tileColor} />}
      <g transform={tile ? "translate(10 10) scale(0.6875)" : undefined}>
        {tile && tone === "mono" ? children(colors.white, colors.white) : tile && tone === "reverse" ? children(colors.ink, colors.ink) : children(inner.main, inner.accent)}
      </g>
    </svg>
  );
}

export function RiseMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M17 18 32 35 47 18M32 35v17" fill="none" stroke={main} strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="32" cy="10.5" r="6" fill={accent} />
        </>
      )}
    </Frame>
  );
}

const africa =
  "M16 8 24 6 34 8 42 9 44 13 47 20 51 27 58 26 56 31 50 39 49 45 46 52 40 58 34 60 31 57 29 48 27 40 26 34 23 31 17 32 11 31 6 25 7 19 11 13Z";

export function SignalMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d={africa} fill={main} stroke={main} strokeWidth="3" strokeLinejoin="round" />
          <ellipse cx="54.5" cy="49" rx="2.2" ry="5" transform="rotate(20 54.5 49)" fill={main} />
          <circle cx="42" cy="34" r="4.5" fill={accent} />
          <circle cx="42" cy="34" r="9.5" fill="none" stroke={accent} strokeWidth="2.6" />
        </>
      )}
    </Frame>
  );
}

export function WeaveMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <g transform="rotate(45 32 32) translate(32 32) scale(0.78) translate(-32 -32)">
            <path d="M56 56H16V42h26V16h14Z" fill={accent} />
            <path d="M8 8h40v14H22v26H8Z" fill={main} />
            <rect x="16" y="42" width="6" height="6" fill={accent} />
          </g>
        </>
      )}
    </Frame>
  );
}

export const directions = [
  {
    id: "a",
    name: "A · Rise",
    kind: "Modern YA monogram",
    Mark: RiseMark,
    idea: "A bold Y that doubles as a person with arms raised. The mango dot is both the head and a signal point: young people, lifted by connection.",
  },
  {
    id: "b",
    name: "B · Signal",
    kind: "Africa and connectivity",
    Mark: SignalMark,
    idea: "A pared-back continent with a mango point and ripple over Uganda: where we start, and the connection spreading out from here.",
  },
  {
    id: "c",
    name: "C · Weave",
    kind: "Original abstract symbol",
    Mark: WeaveMark,
    idea: "Two interlocking bands set as a diamond, woven over and under like a basket or kente strip. Two communities linked, with an open window at the centre.",
  },
] as const;
