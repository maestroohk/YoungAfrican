import { Frame, type MarkProps } from "../marks";

const africa =
  "M16 8 24 6 34 8 42 9 44 13 47 20 51 27 58 26 56 31 50 39 49 45 46 52 40 58 34 60 31 57 29 48 27 40 26 34 23 31 17 32 11 31 6 25 7 19 11 13Z";

export function NotchY(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main) => (
        <path
          d="M4 6 22.4 6 19.4 9 17 12.6 16.4 16.2 19.4 19.8 23 20.4 26.6 19.8 28.4 21.6 29 25.2 30.2 30 31.4 35.4 33.2 37.2 36.8 36 40.4 32.4 42.2 28.2 42.8 24.6 46.4 19.8 47.6 16.8 43.4 17.4 41 13.2 39.2 9 38 6 60 6 39 41 39 60 27 60 27 41Z"
          fill={main}
        />
      )}
    </Frame>
  );
}

export function ChannelAfrica(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main) => (
        <>
          <mask id="channel-cut">
            <rect width="64" height="64" fill="#fff" />
            <path d="M19 0 33 26 47 0M33 26v40" fill="none" stroke="#000" strokeWidth="4.5" />
          </mask>
          <path d={africa} fill={main} stroke={main} strokeWidth="3" strokeLinejoin="round" mask="url(#channel-cut)" />
        </>
      )}
    </Frame>
  );
}

export function Ligature(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M6 10 28.6 30M14 58 40 8 58 58" fill="none" stroke={main} strokeWidth="8" strokeLinejoin="miter" />
          <circle cx="40" cy="44" r="5.5" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export function Stamp({ asymmetric, ...props }: MarkProps & { asymmetric?: boolean }) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d={asymmetric ? "M8 58V30a24 24 0 0 1 48 0v14H44V30a12 12 0 0 0-24 0v28Z" : "M8 58V30a24 24 0 0 1 48 0v28H44V30a12 12 0 0 0-24 0v28Z"} fill={main} />
          <circle cx="32" cy={asymmetric ? 51 : 47} r="6.5" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export function Step(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M30.5 12a24 24 0 0 0 0 48Z" fill={main} />
          <path d="M33.5 4a24 24 0 0 1 0 48Z" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export function Seed(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main) => (
        <>
          <mask id="seed-cut">
            <rect width="64" height="64" fill="#fff" />
            <path d="M20 4 32 22 44 4M32 22v14" fill="none" stroke="#000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          </mask>
          <ellipse cx="32" cy="34" rx="22" ry="26" fill={main} mask="url(#seed-cut)" />
        </>
      )}
    </Frame>
  );
}

export function NotchY2(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main) => (
        <path
          d="M2 5H20.8L17.7 8.1 15.3 11.8 14.6 15.5 17.7 19.3 21.5 19.9 25.2 19.3 27 21.1 27.7 24.8 28.9 29.8 30.1 35.4 32 37.2 35.7 36 39.4 32.3 41.3 27.9 41.9 24.2 45.6 19.3 46.9 16.2 42.5 16.8 40.1 12.4 38.2 8.1 37 5H62L38.5 41.2V60H25.5V41.2Z"
          fill={main}
        />
      )}
    </Frame>
  );
}

export function Ligature2(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <clipPath id="ligature-clip">
            <rect y="8" width="64" height="50" />
          </clipPath>
          <path d="M4 4 28.3 30M13 64 38 3 63 64" fill="none" stroke={main} strokeWidth="8.5" strokeLinejoin="miter" clipPath="url(#ligature-clip)" />
          <circle cx="38.5" cy="45" r="5" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export function Horseshoe(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M18.1 56A26 26 0 1 1 45.9 56H38V44.4A12 12 0 1 0 26 44.4V56Z" fill={main} />
          <circle cx="32" cy="34" r="6.5" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export { ShareMark } from "../round-two/marks";
