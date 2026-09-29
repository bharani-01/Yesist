import { useId } from 'react';

export function LogoMark({ size = 24 }) {
  const id = useId();
  return (
    <svg className="logo__mark" width={size * (40 / 36)} height={size} viewBox="0 0 40 36" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-l`} x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0" stopColor="#00D15E" />
          <stop offset="1" stopColor="#00A84B" />
        </linearGradient>
        <linearGradient id={`${id}-r`} x1="1" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor="#00FF73" />
          <stop offset="1" stopColor="#00D15E" />
        </linearGradient>
      </defs>
      <path d="M14 34C6 32 1 22 2 8c8 4 13 14 12 26Z" fill={`url(#${id}-l)`} />
      <path d="M14 34C13 20 22 7 38 2c1 16-8 29-24 32Z" fill={`url(#${id}-r)`} />
      <path d="M15.5 32C19 23.5 24 16.5 31 11" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export function Logo({ size = 24 }) {
  return (
    <span className="logo" role="img" aria-label="EcoSure">
      <LogoMark size={size} />
      <span className="logo__word" aria-hidden="true"><span className="logo__eco">Eco</span><span className="logo__sure">Sure</span></span>
    </span>
  );
}
