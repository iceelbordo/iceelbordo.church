export const customIcons = {
  'at-symbol': {
    path: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />`
  },
  church: {
    path: `
      <path fill="currentColor" d="M12 4a.498.498 0 00-.353.146L9.293 6.5A1 1 0 009 7.207V10.8l-1.514.908a1 1 0 00-.486.859V20h3v-3a2 2 0 014 0v3h3v-7.433a1 1 0 00-.486-.859L15 10.8V7.207a1 1 0 00-.293-.707l-2.354-2.354A.5.5 0 0012 4z"/>
      <path fill="currentColor" d="M6 14l-3.394 1.455a1 1 0 00-.606.92V19.5a.5.5 0 00.5.5H6zm12 0v6h3.5a.5.5 0 00.5-.5v-3.126a1 1 0 00-.606-.92z" opacity=".6"/>
    `
  },
  'circular-animation': {
    path: `
      <g class="anim anim--rotate anim--infinite" transform="translate(12,11.999997) rotate(0)">
        <path fill="currentColor" transform="translate(-12,-11.999997)" d="M11.980000,2C6.464965,2.011030,1.999989,6.484954,2,12C2,17.522847,6.477153,22,12,22C17.522847,22,22,17.522847,22,12L20,12C20,16.418278,16.418278,20,12,20C7.581722,20,4,16.418278,4,12C4,7.581722,7.581722,4,12,4L12,2C11.993333,1.999993,11.986667,1.999993,11.980000,2Z"/>
      </g>
    `
  },
  clock: {
    path: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />`
  },
  close: {
    path: `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`
  },
  'dots-animation': {
    path: `
      <g class="anim anim--to-left anim--infinite" transform="translate(5.375,12)">
        <g class="anim anim--incrase anim--infinite" transform="scale(.75)">
          <circle fill="currentColor" transform="translate(0)" r="4.5"/>
        </g>
      </g>
      <g class="anim anim--to-right anim--infinite" transform="translate(16.375,12)">
        <g class="anim anim--decrease anim--infinite" transform="scale(1.25,1.25)">
          <circle fill="currentColor" transform="translate(0,0)" r="4.5"/>
        </g>
      </g>
    `
  },
  duplicate: {
    path: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />`
  },
  'external-link': {
    path: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2.222" d="M9.778 5.333H5.333a2.222 2.222 0 00-2.222 2.223v11.11a2.222 2.222 0 002.222 2.223h11.111a2.222 2.222 0 002.223-2.222v-4.445m-4.445-11.11h6.667m0 0v6.666m0-6.667L9.778 14.222"/>`
  },
  'location-market': {
    path: `
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    `
  },
  menu: {
    path: `<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />`
  },
  play: {
    path: `<path fill="currentColor" d="M3.794 3.62v16.76a1.614 1.614 0 002.491 1.359l13.169-8.38c1.003-.631 1.003-2.087 0-2.734L6.285 2.26A1.614 1.614 0 003.794 3.62z"/>`
  },
  speakerphone: {
    path: `<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />`
  },
  'wave-animation': {
    path: `
      <g>
        <line class="anim anim--left-line anim--infinite" stroke="currentColor" stroke-width="4" x1="-6" x2="-6" y1="8" y2="-8"/>
        <line class="anim anim--middle-line anim--infinite" stroke="currentColor" stroke-width="4" x1="0" x2="0" y1="8" y2="-8"/>
        <line class="anim anim--right-line anim--infinite" stroke="currentColor" stroke-width="4" x1="6" x2="6" y1="8" y2="-8"/>
      </g>
    `,
    viewBox: "-12 -12 24 24"
  }
}

export const customTheme = {
  colors: {
    darkBackground: '#191919',
    gray: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
    indigo: {
      50: '#EEF2FF',
      100: '#E0E7FF',
      200: '#C7D2FE',
      300: '#A5B4FC',
      400: '#818CF8',
      500: '#6366F1',
      600: '#4F46E5',
      700: '#4338CA',
      800: '#3730A3',
      900: '#312E81',
    }
  }
}
