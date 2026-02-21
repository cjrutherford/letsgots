export interface Challenge {
  id: string
  lessonSlug: string
  moduleId: string
  title: string
  description: string
  starterCode: string
  expectedOutput: string
  hints: string[]
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export const challenges: Challenge[] = [
  // ── Basics ──────────────────────────────────────────────────────────────
  {
    id: 'basics-hello-world',
    lessonSlug: 'hello-world',
    moduleId: 'basics',
    title: 'Hello, TypeScript!',
    description: 'Print "Hello, TypeScript!" to the console.',
    starterCode: `// Your first TypeScript program
// Use console.log to print a greeting

`,
    expectedOutput: 'Hello, TypeScript!\n',
    hints: [
      'Use console.log()',
      'Make sure the string matches exactly: "Hello, TypeScript!"',
    ],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'basics-type-annotations',
    lessonSlug: 'variables-types',
    moduleId: 'basics',
    title: 'Type Annotations',
    description: 'Declare a string variable `name` with value "TypeScript", a number `version` with value 5, and a boolean `isAwesome` with value true. Print all three on separate lines.',
    starterCode: `// Declare typed variables
const name: string = 
const version: number = 
const isAwesome: boolean = 

console.log(name)
console.log(version)
console.log(isAwesome)
`,
    expectedOutput: 'TypeScript\n5\ntrue\n',
    hints: [
      'Assign "TypeScript" to name',
      'Assign 5 to version',
      'Assign true to isAwesome',
    ],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'basics-interface',
    lessonSlug: 'variables-types',
    moduleId: 'basics',
    title: 'Define an Interface',
    description: 'Define an interface `Person` with properties `name: string` and `age: number`. Create an object matching the interface and print "Alice is 30 years old".',
    starterCode: `interface Person {
  // Add properties here
}

const alice: Person = {
  // Fill in
}

console.log(\`\${alice.name} is \${alice.age} years old\`)
`,
    expectedOutput: 'Alice is 30 years old\n',
    hints: [
      'Add name: string to the interface',
      'Add age: number to the interface',
      'Set name to "Alice" and age to 30',
    ],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'basics-functions',
    lessonSlug: 'functions',
    moduleId: 'basics',
    title: 'Typed Functions',
    description: 'Write a function `add` that takes two numbers and returns their sum. Print add(3, 4).',
    starterCode: `function add(a: number, b: number): number {
  // Return the sum
}

console.log(add(3, 4))
`,
    expectedOutput: '7\n',
    hints: [
      'Use the return keyword',
      'Return a + b',
    ],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'basics-optional-params',
    lessonSlug: 'functions',
    moduleId: 'basics',
    title: 'Optional Parameters',
    description: 'Write a function `greet(name: string, greeting?: string)` that prints the greeting (defaulting to "Hello") followed by the name. Call it with just "World" and also with "World" and "Hi".',
    starterCode: `function greet(name: string, greeting?: string): void {
  // Use greeting ?? "Hello"
}

greet("World")
greet("World", "Hi")
`,
    expectedOutput: 'Hello, World!\nHi, World!\n',
    hints: [
      'Use ?? to provide a default: greeting ?? "Hello"',
      'Print: `${g}, ${name}!`',
    ],
    points: 10,
    difficulty: 'easy',
  },
  // ── JavaScript to TypeScript ─────────────────────────────────────────────
  {
    id: 'js-to-ts-inference',
    lessonSlug: 'type-inference',
    moduleId: 'javascript-to-typescript',
    title: 'Type Inference',
    description: 'TypeScript can infer types. Declare `message` without an explicit type annotation but assign "Inferred!" to it, then print it.',
    starterCode: `// Let TypeScript infer the type
const message = 

console.log(message)
`,
    expectedOutput: 'Inferred!\n',
    hints: [
      'Just assign "Inferred!" without writing : string',
    ],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'js-to-ts-union',
    lessonSlug: 'adding-types',
    moduleId: 'javascript-to-typescript',
    title: 'Union Types',
    description: 'Write a function `formatId(id: string | number): string` that returns the id as a string prefixed with "#". Print formatId(42) and formatId("abc").',
    starterCode: `function formatId(id: string | number): string {
  // Return "#" + id.toString()
}

console.log(formatId(42))
console.log(formatId("abc"))
`,
    expectedOutput: '#42\n#abc\n',
    hints: [
      'Use String(id) or id.toString()',
      'Prefix with "#"',
    ],
    points: 10,
    difficulty: 'easy',
  },
  // ── Type System ──────────────────────────────────────────────────────────
  {
    id: 'type-system-generics',
    lessonSlug: 'generics',
    moduleId: 'type-system',
    title: 'Generic Identity Function',
    description: 'Write a generic function `identity<T>(value: T): T` that returns its argument unchanged. Print identity("hello") and identity(42).',
    starterCode: `function identity<T>(value: T): T {
  // Return value
}

console.log(identity("hello"))
console.log(identity(42))
`,
    expectedOutput: 'hello\n42\n',
    hints: ['Just return the value parameter'],
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 'type-system-interface-extend',
    lessonSlug: 'interfaces-vs-types',
    moduleId: 'type-system',
    title: 'Extending Interfaces',
    description: 'Define `Animal` with `name: string`. Extend it into `Dog` with `breed: string`. Create a Dog and print "Buddy is a Labrador".',
    starterCode: `interface Animal {
  name: string
}

interface Dog extends Animal {
  // Add breed property
}

const dog: Dog = {
  name: "Buddy",
  breed: "Labrador"
}

console.log(\`\${dog.name} is a \${dog.breed}\`)
`,
    expectedOutput: 'Buddy is a Labrador\n',
    hints: ['Add breed: string to Dog interface'],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'type-system-intersection',
    lessonSlug: 'union-intersection',
    moduleId: 'type-system',
    title: 'Intersection Types',
    description: 'Create types `Serializable = { serialize(): string }` and `Loggable = { log(): void }`. Create an intersection type `SerializableAndLoggable` and implement an object that satisfies it. The serialize method should return "serialized" and log should print "logged". Call both methods.',
    starterCode: `type Serializable = { serialize(): string }
type Loggable = { log(): void }
type SerializableAndLoggable = Serializable & Loggable

const obj: SerializableAndLoggable = {
  serialize() {
    return "serialized"
  },
  log() {
    console.log("logged")
  }
}

console.log(obj.serialize())
obj.log()
`,
    expectedOutput: 'serialized\nlogged\n',
    hints: ['The code is mostly done – just run it!'],
    points: 20,
    difficulty: 'medium',
  },
  // ── Advanced Types ───────────────────────────────────────────────────────
  {
    id: 'advanced-partial',
    lessonSlug: 'utility-types',
    moduleId: 'advanced-types',
    title: 'Partial Utility Type',
    description: 'Use `Partial<T>` to create an optional update type. Define `User` with `name: string` and `age: number`. Write `updateUser(user: User, updates: Partial<User>): User` and print the result of updating the name to "Bob".',
    starterCode: `interface User {
  name: string
  age: number
}

function updateUser(user: User, updates: Partial<User>): User {
  return { ...user, ...updates }
}

const user: User = { name: "Alice", age: 30 }
const updated = updateUser(user, { name: "Bob" })
console.log(\`\${updated.name}, \${updated.age}\`)
`,
    expectedOutput: 'Bob, 30\n',
    hints: ['The spread operator merges the update'],
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 'advanced-readonly',
    lessonSlug: 'utility-types',
    moduleId: 'advanced-types',
    title: 'Readonly Type',
    description: 'Create a `Readonly<Config>` where Config has `host: string` and `port: number`. Create a frozen config and print its values.',
    starterCode: `interface Config {
  host: string
  port: number
}

const config: Readonly<Config> = {
  host: "localhost",
  port: 3000
}

// config.host = "other" // This would be a TypeScript error!
console.log(\`\${config.host}:\${config.port}\`)
`,
    expectedOutput: 'localhost:3000\n',
    hints: ['Just run – Readonly prevents reassignment at compile time'],
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 'advanced-conditional',
    lessonSlug: 'conditional-types',
    moduleId: 'advanced-types',
    title: 'Conditional Types',
    description: 'Create a conditional type `IsString<T>` that resolves to "yes" if T is string, "no" otherwise. Print the results for string and number.',
    starterCode: `type IsString<T> = T extends string ? "yes" : "no"

type A = IsString<string>   // "yes"
type B = IsString<number>   // "no"

const a: A = "yes"
const b: B = "no"
console.log(a)
console.log(b)
`,
    expectedOutput: 'yes\nno\n',
    hints: ['The type is already defined – just run it'],
    points: 30,
    difficulty: 'hard',
  },
  // ── Async ────────────────────────────────────────────────────────────────
  {
    id: 'async-promise-basic',
    lessonSlug: 'promises',
    moduleId: 'async',
    title: 'Basic Promise',
    description: 'Create a function `delay(ms: number): Promise<string>` that resolves with "Done!" after 0ms. Await it and print the result.',
    starterCode: `function delay(ms: number): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => resolve("Done!"), ms)
  })
}

async function main() {
  const result = await delay(0)
  console.log(result)
}

main()
`,
    expectedOutput: 'Done!\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 'async-await',
    lessonSlug: 'async-await',
    moduleId: 'async',
    title: 'Async/Await Error Handling',
    description: 'Write an async function that calls a function which may throw. Use try/catch to handle the error and print "Caught: <message>".',
    starterCode: `function riskyOperation(): Promise<string> {
  return Promise.reject(new Error("Something went wrong"))
}

async function main() {
  try {
    const result = await riskyOperation()
    console.log(result)
  } catch (err) {
    if (err instanceof Error) {
      console.log(\`Caught: \${err.message}\`)
    }
  }
}

main()
`,
    expectedOutput: 'Caught: Something went wrong\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 'async-parallel',
    lessonSlug: 'concurrent-patterns',
    moduleId: 'async',
    title: 'Promise.all',
    description: 'Use Promise.all to run two async tasks in parallel. Each returns a number. Print their sum.',
    starterCode: `async function getA(): Promise<number> { return 3 }
async function getB(): Promise<number> { return 4 }

async function main() {
  const [a, b] = await Promise.all([getA(), getB()])
  console.log(a + b)
}

main()
`,
    expectedOutput: '7\n',
    hints: ['Promise.all resolves when all promises resolve'],
    points: 20,
    difficulty: 'medium',
  },
  // ── Modules ──────────────────────────────────────────────────────────────
  {
    id: 'modules-named-export',
    lessonSlug: 'es-modules',
    moduleId: 'modules',
    title: 'Simulating Named Exports',
    description: 'TypeScript uses ES module syntax. Simulate a module by creating an object with named exports and destructuring it.',
    starterCode: `// Simulate a module's named exports
const mathUtils = {
  add: (a: number, b: number) => a + b,
  multiply: (a: number, b: number) => a * b,
}

const { add, multiply } = mathUtils
console.log(add(2, 3))
console.log(multiply(2, 3))
`,
    expectedOutput: '5\n6\n',
    hints: ['Destructure the object to get named functions'],
    points: 10,
    difficulty: 'easy',
  },
  // ── Testing ──────────────────────────────────────────────────────────────
  {
    id: 'testing-assertions',
    lessonSlug: 'vitest-basics',
    moduleId: 'testing',
    title: 'Manual Assertions',
    description: 'Write a simple `assert` function that throws if the condition is false. Use it to test an add function.',
    starterCode: `function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(\`Assertion failed: \${message}\`)
}

function add(a: number, b: number): number {
  return a + b
}

assert(add(1, 2) === 3, "1 + 2 should be 3")
assert(add(0, 0) === 0, "0 + 0 should be 0")
console.log("All tests passed!")
`,
    expectedOutput: 'All tests passed!\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  // ── Frontend ─────────────────────────────────────────────────────────────
  {
    id: 'frontend-component-type',
    lessonSlug: 'react-typescript',
    moduleId: 'frontend',
    title: 'Typed Component Props',
    description: 'Define a `ButtonProps` interface with `label: string` and optional `disabled?: boolean`. Write a function that renders the button as a string and print it.',
    starterCode: `interface ButtonProps {
  label: string
  disabled?: boolean
}

function renderButton(props: ButtonProps): string {
  const attrs = props.disabled ? ' disabled' : ''
  return \`<button\${attrs}>\${props.label}</button>\`
}

console.log(renderButton({ label: "Click me" }))
console.log(renderButton({ label: "Submit", disabled: true }))
`,
    expectedOutput: '<button>Click me</button>\n<button disabled>Submit</button>\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  // ── Backend ──────────────────────────────────────────────────────────────
  {
    id: 'backend-type-guard',
    lessonSlug: 'nodejs-typescript',
    moduleId: 'backend',
    title: 'Type Guards',
    description: 'Write a type guard `isString(value: unknown): value is string` and use it to safely process a value that could be anything.',
    starterCode: `function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function processInput(input: unknown): string {
  if (isString(input)) {
    return input.toUpperCase()
  }
  return String(input)
}

console.log(processInput("hello"))
console.log(processInput(42))
`,
    expectedOutput: 'HELLO\n42\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  // ── Packages ─────────────────────────────────────────────────────────────
  {
    id: 'packages-runtime-validation',
    lessonSlug: 'zod-validation',
    moduleId: 'packages',
    title: 'Runtime Type Checking',
    description: 'Without Zod, implement a simple runtime validator. Validate that an object has `name: string` and `age: number` and print "Valid: Alice, 25".',
    starterCode: `interface Person {
  name: string
  age: number
}

function validatePerson(data: unknown): Person {
  if (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'age' in data &&
    typeof (data as Record<string, unknown>).name === 'string' &&
    typeof (data as Record<string, unknown>).age === 'number'
  ) {
    return data as Person
  }
  throw new Error('Invalid person data')
}

const raw = { name: "Alice", age: 25 }
const person = validatePerson(raw)
console.log(\`Valid: \${person.name}, \${person.age}\`)
`,
    expectedOutput: 'Valid: Alice, 25\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  // ── Polish ───────────────────────────────────────────────────────────────
  {
    id: 'polish-strict-null',
    lessonSlug: 'strict-mode',
    moduleId: 'polish',
    title: 'Nullish Coalescing & Optional Chaining',
    description: 'Use optional chaining and nullish coalescing to safely access nested data.',
    starterCode: `interface Config {
  db?: {
    host?: string
    port?: number
  }
}

const config: Config = {}

const host = config.db?.host ?? "localhost"
const port = config.db?.port ?? 5432

console.log(\`\${host}:\${port}\`)
`,
    expectedOutput: 'localhost:5432\n',
    hints: ['The code is complete – just run it'],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'polish-mapped-type',
    lessonSlug: 'tsconfig-deep-dive',
    moduleId: 'polish',
    title: 'Mapped Types',
    description: 'Create a mapped type `Nullable<T>` that makes all properties of T nullable. Apply it to a User type and print a nullable user.',
    starterCode: `type Nullable<T> = { [K in keyof T]: T[K] | null }

interface User {
  name: string
  age: number
}

const nullableUser: Nullable<User> = {
  name: null,
  age: 25
}

console.log(nullableUser.name)
console.log(nullableUser.age)
`,
    expectedOutput: 'null\n25\n',
    hints: ['The code is complete – just run it'],
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 'advanced-template-literal',
    lessonSlug: 'mapped-types',
    moduleId: 'advanced-types',
    title: 'Template Literal Types',
    description: 'Use template literal types to create event names. Define `EventName<T extends string>` as `on${Capitalize<T>}`. Create a type for "click" and "hover" and demonstrate their values.',
    starterCode: `type EventName<T extends string> = \`on\${Capitalize<T>}\`

type ClickEvent = EventName<"click">   // "onClick"
type HoverEvent = EventName<"hover">   // "onHover"

const click: ClickEvent = "onClick"
const hover: HoverEvent = "onHover"

console.log(click)
console.log(hover)
`,
    expectedOutput: 'onClick\nonHover\n',
    hints: ['Template literal types combine string literals with types'],
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 'type-system-generic-constraint',
    lessonSlug: 'generics',
    moduleId: 'type-system',
    title: 'Generic Constraints',
    description: 'Write a generic function `getLength<T extends { length: number }>(arg: T): number` that returns the length of anything with a length property. Test it with a string and an array.',
    starterCode: `function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}

console.log(getLength("hello"))
console.log(getLength([1, 2, 3, 4]))
`,
    expectedOutput: '5\n4\n',
    hints: ['The code is complete – just run it'],
    points: 20,
    difficulty: 'medium',
  },
  {
    id: 'basics-array-types',
    lessonSlug: 'variables-types',
    moduleId: 'basics',
    title: 'Array Types',
    description: 'Declare a typed array of numbers `scores: number[]`, push 95, 87, and 72 to it, then print the sum.',
    starterCode: `const scores: number[] = []
scores.push(95)
scores.push(87)
scores.push(72)

const sum = scores.reduce((acc, n) => acc + n, 0)
console.log(sum)
`,
    expectedOutput: '254\n',
    hints: ['Use Array.reduce to sum the values'],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'basics-enum',
    lessonSlug: 'variables-types',
    moduleId: 'basics',
    title: 'Enums',
    description: 'Define an enum `Direction` with values Up, Down, Left, Right. Print the string value of Direction.Up.',
    starterCode: `enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}

console.log(Direction.Up)
`,
    expectedOutput: 'UP\n',
    hints: ['String enums store their string values'],
    points: 10,
    difficulty: 'easy',
  },
  {
    id: 'async-type-narrowing',
    lessonSlug: 'async-await',
    moduleId: 'async',
    title: 'Typed Async Results',
    description: 'Create a Result type `{ ok: true; value: T } | { ok: false; error: string }` and write an async function that returns it. Handle both cases.',
    starterCode: `type Result<T> = { ok: true; value: T } | { ok: false; error: string }

async function fetchData(succeed: boolean): Promise<Result<number>> {
  if (succeed) return { ok: true, value: 42 }
  return { ok: false, error: "Network error" }
}

async function main() {
  const r1 = await fetchData(true)
  const r2 = await fetchData(false)

  if (r1.ok) console.log("Value:", r1.value)
  if (!r2.ok) console.log("Error:", r2.error)
}

main()
`,
    expectedOutput: 'Value: 42\nError: Network error\n',
    hints: ['Discriminated unions make exhaustive checks easy'],
    points: 30,
    difficulty: 'hard',
  },
  {
    id: 'js-to-ts-migrating',
    lessonSlug: 'migration-patterns',
    moduleId: 'javascript-to-typescript',
    title: 'Migrating JS to TS',
    description: 'Take this JavaScript-style function and add proper TypeScript types. The function formats a currency value.',
    starterCode: `function formatCurrency(amount: number, currency: string = "USD"): string {
  return \`\${currency} \${amount.toFixed(2)}\`
}

console.log(formatCurrency(19.99))
console.log(formatCurrency(5.5, "EUR"))
`,
    expectedOutput: 'USD 19.99\nEUR 5.50\n',
    hints: ['The code already has types – just run it'],
    points: 10,
    difficulty: 'easy',
  },
]

export const TOTAL_POINTS = challenges.reduce((sum, c) => sum + c.points, 0)
