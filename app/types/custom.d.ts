declare module '*.svg?inline' {
  const content: unknown;
  export default content;
}
declare module '*.svg' {
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
