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

export function CartIcon(props) {
    return (
        <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <g stroke="#0f172a" strokeWidth={1.5} strokeLinecap="round">
          <path d="M20.232 10.526c-.585-3.121-.878-4.682-1.989-5.604C17.133 4 15.545 4 12.37 4h-.721c-3.176 0-4.763 0-5.874.922-1.111.922-1.404 2.483-1.99 5.604-.822 4.389-1.234 6.583-.034 8.029C4.95 20 7.182 20 11.648 20h.721c4.465 0 6.698 0 7.898-1.445.696-.84.85-1.93.695-3.555M9.17 8a3.001 3.001 0 005.66 0" />
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