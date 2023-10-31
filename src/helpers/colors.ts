import tinycolor from 'tinycolor2';

export function calculateReadableForegroundColor(color: string): string { // Generate a readable foreground color based on a given background color
  let hsl = tinycolor(color).toHsl();
  hsl.s = 1; // make it fully vibrant/saturated
  hsl.l = hsl.l <= 0.5 ? 0.9 : 0.2; // if the color is dark, make the text color light, and vice versa

  return tinycolor(hsl).toHexString();
}

export const FLOWBITE_SVELTE_BUTTON_COLORS = new Set([
  'blue',
  'gray',
  'red',
  'yellow',
  'purple',
  'green',
  'indigo',
  'pink',
  'white',
  'custom',
  'primary',
  'secondary',
  'default',
]);