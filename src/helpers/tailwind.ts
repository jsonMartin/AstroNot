// tw is a template literal that allows prettier-plugin-tailwindcss to sort and format tailwind classes in strings
// Usage: tw`bg-white p-4 dark:bg-black`
export const tw = (strings, ...values) =>
  String.raw({ raw: strings }, ...values);
