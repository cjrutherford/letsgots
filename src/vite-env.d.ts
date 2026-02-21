/// <reference types="vite/client" />

declare module '*.md?raw' {
  const content: string
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}

declare module '*.css' {
  const classes: Record<string, string>
  export default classes
}
