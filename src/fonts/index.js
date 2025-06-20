'use client';

import localFont from 'next/font/local';

// Define the Genos font
export const genosFont = localFont({
  src: [
    {
      path: '../../public/assets/font/Genos/Genos-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/Genos/Genos-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/Genos/Genos-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/Genos/Genos-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-genos',
  display: 'swap',
});

// Define the DM Sans font
export const dmSans = localFont({
  src: [
    {
      path: '../../public/assets/font/DM_Sans/DMSans_18pt-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/DM_Sans/DMSans_18pt-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/DM_Sans/DMSans_18pt-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/assets/font/DM_Sans/DMSans_18pt-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
});
