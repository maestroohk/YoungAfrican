import { Frame, type MarkProps } from "../marks";

export function ShareMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M26.5 60V37C26.5 28 20 20 9 9" fill="none" stroke={main} strokeWidth="9" />
          <path d="M37.5 60V37C37.5 28 44 20 55 9" fill="none" stroke={accent} strokeWidth="9" />
        </>
      )}
    </Frame>
  );
}

export function DoorwayMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M10 58V31a22 22 0 0 1 44 0v27H42V31a10 10 0 0 0-20 0v27Z" fill={main} />
          <circle cx="32" cy="45" r="6.5" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export function DrumMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <rect x="7" y="9" width="50" height="10" rx="5" fill={accent} />
          <path d="M11.7 24.2 19.8 24.2 19.8 49.1ZM22.3 55.8 22.3 34.7 26.8 55.8ZM22.5 24.2 30.6 24.2 27.9 49.2ZM29.7 55.8 32 34.7 34.3 55.8ZM33.4 24.2 41.5 24.2 36.1 49.2ZM37.2 55.8 41.7 34.7 41.7 55.8ZM44.2 24.2 52.3 24.2 44.2 49.1Z" fill={main} />
        </>
      )}
    </Frame>
  );
}

export function LineMark(props: MarkProps) {
  return (
    <Frame {...props}>
      {(main, accent) => (
        <>
          <path d="M13 12 38 34.5M50 12 30 50.5Q28 55 33 55H44" fill="none" stroke={main} strokeWidth="8.5" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="54" cy="55" r="5.5" fill={accent} />
        </>
      )}
    </Frame>
  );
}

export const roundTwo = [
  {
    id: "d",
    name: "D · Share",
    kind: "The split Y",
    Mark: ShareMark,
    idea: "Our story is “one good connection, shared well”. A Y is literally one line becoming two, so the stem is drawn as two strands, blue and mango, that run together and then part. One connection, shared. The symbol is also the first letter of the wordmark, so the logo is simply the word.",
    distinct: "No arcs, no figure, no map. The open, unjoined fork and the hairline split down the stem give it a silhouette you can recognise in one colour, and the strands can extend into lines, borders and patterns across the brand.",
    risk: "At 16 px the split closes and it becomes a plain Y, which is still on-brand but less ownable. Two parallel strokes can recall road, cable or merge icons, and a Y of paired strands is how antibodies are drawn in biotech.",
  },
  {
    id: "e",
    name: "E · Doorway",
    kind: "The open A",
    Mark: DoorwayMark,
    idea: "The A of African redrawn as an open doorway, with its crossbar replaced by a mango point in the opening: access, a way in, opportunity. It doubles as the custom A in the wordmark.",
    distinct: "A heavy arch with a single point inside is a simple, unusual silhouette, and it gives the wordmark a signature letter that the symbol repeats.",
    risk: "Out of context an arch with a dot can read as a magnet, a horseshoe or a lowercase n. A single arch in yellow would sit too close to famous arch marks, so it must stay blue or one colour.",
  },
  {
    id: "g",
    name: "G · Line",
    kind: "Custom lowercase y",
    Mark: LineMark,
    idea: "A lowercase y whose tail does not curl away but runs flat along the ground and ends in a mango point: the line that brings the connection all the way to someone. It is the first letter of a lowercase youngafrican wordmark, matching the network name people already join.",
    distinct: "The flat, grounded tail with an end point is the signature, and it can underline headlines or run along signage and vouchers as a brand device.",
    risk: "It leans on the letter, so as a standalone icon it is less striking than D. A tail ending in a dot can echo some delivery and logistics marks.",
  },
  {
    id: "f",
    name: "F · Engoma (rejected)",
    kind: "Africa's first network",
    Mark: DrumMark,
    idea: "Long before the internet, drums carried messages between villages. The engoma, Buganda's royal drum, reduced to a mango drumhead over its laced body.",
    distinct: "Rooted in Uganda without a map, with a lacing pattern the brand could use on vouchers and merchandise.",
    risk: "Rejected after testing. Once simplified, the drum reads as a cup, a crown or a basketball net, and with three triangles the lacing reads as a W. The story is strong but the silhouette does not carry it; the lacing could survive as a pattern.",
  },
] as const;
