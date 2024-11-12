export function UserIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="#0f172a" strokeWidth={1.5}>
        <circle cx={12} cy={6} r={4} />
        <path
          d="M19.997 18c.003-.164.003-.331.003-.5 0-2.485-3.582-4.5-8-4.5s-8 2.015-8 4.5S4 22 12 22c2.231 0 3.84-.157 5-.437"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}

export function PhotoIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      fill="#fff"
      stroke="#fff"
      {...props}
    >
      <path
        d="M5.5 1.5c-1 0-1.186.579-1.5 1.75h6C9.675 2.035 9.466 1.5 8.5 1.5zM3 4C1 4 0 5 0 7v2c0 2 1 3 3 3h8c2 0 3-1 3-3V7c0-2-1-3-3-3zm-.5 1a.5.5 0 110 1 .5.5 0 010-1zM7 5c1.64 0 3 1.262 3 3 0 1.708-1.326 3-3 3-1.64 0-3-1.321-3-3 0-1.768 1.331-3 3-3zm0 1c-1.148 0-2 .792-2 2 0 1.237.822 2 2 2 1.208 0 2-.792 2-2 0-1.178-.822-2-2-2z"
        fill="#fff"
        fillOpacity={1}
        stroke="none"
      />
    </svg>
  );
}

export function ChatIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g stroke="#FFF">
        <path
          d="M8 12h.009m3.982 0H12m3.991 0H16"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12c0 1.6.376 3.112 1.043 4.453.178.356.237.763.134 1.148l-.595 2.226a1.3 1.3 0 001.591 1.591l2.226-.595a1.634 1.634 0 011.149.133A9.958 9.958 0 0012 22z"
          strokeWidth={1.5}
        />
      </g>
    </svg>
  );
}
