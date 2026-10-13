// Microfone de estúdio com placa "No ar" e ondas de som, em cores chapadas da marca.
// Desenho próprio (sem foto de banco); decorativo.
export function StudioMic({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 460" aria-hidden className={className}>
      {/* Ondas de som */}
      <g fill="none" stroke="var(--brand-orange)" strokeWidth="10" strokeLinecap="round">
        <path d="M110 80a120 120 0 0 0 0 150" />

        <path d="M290 80a120 120 0 0 1 0 150" />

      </g>
      <g fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" opacity=".7">
        <path d="M78 52a160 160 0 0 0 0 206" />
        <path d="M322 52a160 160 0 0 1 0 206" />
      </g>
      {/* Garfo e haste */}
      <path
        d="M128 150v38a72 72 0 0 0 144 0v-38"
        fill="none"
        stroke="#fff"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <rect x="192" y="258" width="16" height="132" rx="4" fill="#fff" />
      <ellipse cx="200" cy="398" rx="86" ry="18" fill="#fff" />
      {/* Cápsula com grade */}
      <rect x="150" y="30" width="100" height="196" rx="50" fill="#fff" />
      <g stroke="var(--brand-blue-dark)" strokeWidth="5" strokeLinecap="round" opacity=".35">
        <path d="M170 64h60M164 84h72M164 104h72M164 124h72M164 186h72M170 206h60" />
      </g>
      <rect x="150" y="142" width="100" height="26" fill="var(--brand-orange)" />
      {/* Placa "No ar" */}
      <g transform="rotate(-8 310 330)">
        <rect x="250" y="306" width="128" height="52" rx="10" fill="var(--live)" />
        <circle cx="274" cy="332" r="7" fill="#fff" />
        <text
          x="290"
          y="342"
          fill="#fff"
          fontFamily="var(--font-montserrat), sans-serif"
          fontSize="28"
          fontWeight="900"
        >
          NO AR
        </text>
      </g>
    </svg>
  );
}
