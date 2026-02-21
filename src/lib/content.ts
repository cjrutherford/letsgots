// Lesson markdown content — imported with ?raw to get the raw string
import basicsHelloWorld from '../content/modules/basics/01-hello-world.md?raw'
import basicsVariablesTypes from '../content/modules/basics/02-variables-types.md?raw'
import basicsFunctions from '../content/modules/basics/03-functions.md?raw'
import basicsControlFlow from '../content/modules/basics/04-control-flow.md?raw'
import basicsModulesImports from '../content/modules/basics/05-modules-imports.md?raw'
import jsToTsAddingTypes from '../content/modules/javascript-to-typescript/01-adding-types.md?raw'
import jsToTsTypeInference from '../content/modules/javascript-to-typescript/02-type-inference.md?raw'
import jsToTsMigrationPatterns from '../content/modules/javascript-to-typescript/03-migration-patterns.md?raw'
import typeSystemInterfacesVsTypes from '../content/modules/type-system/01-interfaces-vs-types.md?raw'
import typeSystemUnionIntersection from '../content/modules/type-system/02-union-intersection.md?raw'
import typeSystemGenerics from '../content/modules/type-system/03-generics.md?raw'
import advancedConditionalTypes from '../content/modules/advanced-types/01-conditional-types.md?raw'
import advancedMappedTypes from '../content/modules/advanced-types/02-mapped-types.md?raw'
import advancedUtilityTypes from '../content/modules/advanced-types/03-utility-types.md?raw'
import asyncPromises from '../content/modules/async/01-promises.md?raw'
import asyncAsyncAwait from '../content/modules/async/02-async-await.md?raw'
import asyncConcurrentPatterns from '../content/modules/async/03-concurrent-patterns.md?raw'
import modulesEsModules from '../content/modules/modules/01-es-modules.md?raw'
import modulesDeclarationFiles from '../content/modules/modules/02-declaration-files.md?raw'
import modulesModuleResolution from '../content/modules/modules/03-module-resolution.md?raw'
import testingVitestBasics from '../content/modules/testing/01-vitest-basics.md?raw'
import testingTypeSafeTesting from '../content/modules/testing/02-type-safe-testing.md?raw'
import testingMocking from '../content/modules/testing/03-mocking.md?raw'
import frontendReactTypescript from '../content/modules/frontend/01-react-typescript.md?raw'
import frontendHooksTyping from '../content/modules/frontend/02-hooks-typing.md?raw'
import frontendComponentPatterns from '../content/modules/frontend/03-component-patterns.md?raw'
import angularComponents from '../content/modules/angular/01-angular-components.md?raw'
import angularServicesDi from '../content/modules/angular/02-angular-services-di.md?raw'
import angularFormsRouting from '../content/modules/angular/03-angular-forms-routing.md?raw'
import backendNodejsTypescript from '../content/modules/backend/01-nodejs-typescript.md?raw'
import backendExpressTypescript from '../content/modules/backend/02-express-typescript.md?raw'
import backendRestApis from '../content/modules/backend/03-rest-apis.md?raw'
import packagesZodValidation from '../content/modules/packages/01-zod-validation.md?raw'
import packagesPrismaOrm from '../content/modules/packages/02-prisma-orm.md?raw'
import packagesPopularLibraries from '../content/modules/packages/03-popular-libraries.md?raw'
import polishTsconfigDeepDive from '../content/modules/polish/01-tsconfig-deep-dive.md?raw'
import polishStrictMode from '../content/modules/polish/02-strict-mode.md?raw'
import polishDeployment from '../content/modules/polish/03-deployment.md?raw'

export const lessonContent: Record<string, string> = {
  'basics/hello-world': basicsHelloWorld,
  'basics/variables-types': basicsVariablesTypes,
  'basics/functions': basicsFunctions,
  'basics/control-flow': basicsControlFlow,
  'basics/modules-imports': basicsModulesImports,
  'javascript-to-typescript/adding-types': jsToTsAddingTypes,
  'javascript-to-typescript/type-inference': jsToTsTypeInference,
  'javascript-to-typescript/migration-patterns': jsToTsMigrationPatterns,
  'type-system/interfaces-vs-types': typeSystemInterfacesVsTypes,
  'type-system/union-intersection': typeSystemUnionIntersection,
  'type-system/generics': typeSystemGenerics,
  'advanced-types/conditional-types': advancedConditionalTypes,
  'advanced-types/mapped-types': advancedMappedTypes,
  'advanced-types/utility-types': advancedUtilityTypes,
  'async/promises': asyncPromises,
  'async/async-await': asyncAsyncAwait,
  'async/concurrent-patterns': asyncConcurrentPatterns,
  'modules/es-modules': modulesEsModules,
  'modules/declaration-files': modulesDeclarationFiles,
  'modules/module-resolution': modulesModuleResolution,
  'testing/vitest-basics': testingVitestBasics,
  'testing/type-safe-testing': testingTypeSafeTesting,
  'testing/mocking': testingMocking,
  'frontend/react-typescript': frontendReactTypescript,
  'frontend/hooks-typing': frontendHooksTyping,
  'frontend/component-patterns': frontendComponentPatterns,
  'angular/angular-components': angularComponents,
  'angular/angular-services-di': angularServicesDi,
  'angular/angular-forms-routing': angularFormsRouting,
  'backend/nodejs-typescript': backendNodejsTypescript,
  'backend/express-typescript': backendExpressTypescript,
  'backend/rest-apis': backendRestApis,
  'packages/zod-validation': packagesZodValidation,
  'packages/prisma-orm': packagesPrismaOrm,
  'packages/popular-libraries': packagesPopularLibraries,
  'polish/tsconfig-deep-dive': polishTsconfigDeepDive,
  'polish/strict-mode': polishStrictMode,
  'polish/deployment': polishDeployment,
}

export function extractExcerpt(markdown: string, maxLength = 150): string {
  const lines = markdown.split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```') && !trimmed.startsWith('|')) {
      return trimmed.length > maxLength ? trimmed.slice(0, maxLength) + '...' : trimmed
    }
  }
  return ''
}

export interface SubLesson {
  id: string
  slug: string
  title: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  description: string
  subLessons?: SubLesson[]
}

export interface Module {
  id: string
  title: string
  description: string
  icon: string
  lessons: Lesson[]
  color: string
}

export const modules: Module[] = [
  {
    id: 'basics',
    title: 'TypeScript Basics',
    description: 'Start your TypeScript journey: hello world, variables, functions, and control flow.',
    icon: '🚀',
    color: '#3178c6',
    lessons: [
      { id: 'hello-world', slug: 'hello-world', title: 'Hello World', description: 'Your first TypeScript program' },
      { id: 'variables-types', slug: 'variables-types', title: 'Variables & Types', description: 'Primitive types, arrays, enums, and type inference' },
      { id: 'functions', slug: 'functions', title: 'Functions', description: 'Typed functions, overloads, and generics' },
      { id: 'control-flow', slug: 'control-flow', title: 'Control Flow', description: 'Type narrowing, guards, and discriminated unions' },
      { id: 'modules-imports', slug: 'modules-imports', title: 'Modules & Imports', description: 'ES modules, type imports, and barrel files' },
    ],
  },
  {
    id: 'javascript-to-typescript',
    title: 'JS to TypeScript',
    description: 'Migrate your JavaScript codebase to TypeScript incrementally.',
    icon: '⚡',
    color: '#f7df1e',
    lessons: [
      { id: 'adding-types', slug: 'adding-types', title: 'Adding Types to JS', description: 'Annotate existing JavaScript code' },
      { id: 'type-inference', slug: 'type-inference', title: 'Type Inference', description: 'Let TypeScript figure out types automatically' },
      { id: 'migration-patterns', slug: 'migration-patterns', title: 'Migration Patterns', description: 'Strategies for large-scale migrations' },
    ],
  },
  {
    id: 'type-system',
    title: 'Type System',
    description: 'Master interfaces, union types, intersection types, and generics.',
    icon: '🔷',
    color: '#5c9cf5',
    lessons: [
      { id: 'interfaces-vs-types', slug: 'interfaces-vs-types', title: 'Interfaces vs Types', description: 'When to use each and their differences' },
      { id: 'union-intersection', slug: 'union-intersection', title: 'Union & Intersection', description: 'Compose types algebraically' },
      { id: 'generics', slug: 'generics', title: 'Generics', description: 'Write reusable, type-safe code' },
    ],
  },
  {
    id: 'advanced-types',
    title: 'Advanced Types',
    description: 'Conditional types, mapped types, template literals, and utility types.',
    icon: '🧠',
    color: '#8a6cf7',
    lessons: [
      { id: 'conditional-types', slug: 'conditional-types', title: 'Conditional Types', description: 'Type-level if/else with extends' },
      { id: 'mapped-types', slug: 'mapped-types', title: 'Mapped & Template Types', description: 'Transform types programmatically' },
      { id: 'utility-types', slug: 'utility-types', title: 'Utility Types', description: 'Partial, Pick, Omit, Record, and more' },
    ],
  },
  {
    id: 'async',
    title: 'Async TypeScript',
    description: 'Type-safe Promises, async/await, and concurrent patterns.',
    icon: '⏳',
    color: '#3fb950',
    lessons: [
      { id: 'promises', slug: 'promises', title: 'Promises', description: 'Typing Promise chains and combinators' },
      { id: 'async-await', slug: 'async-await', title: 'Async/Await', description: 'Clean async code with full type safety' },
      { id: 'concurrent-patterns', slug: 'concurrent-patterns', title: 'Concurrent Patterns', description: 'Queues, retries, and parallel execution' },
    ],
  },
  {
    id: 'modules',
    title: 'Modules & Packages',
    description: 'ES modules, declaration files, and module resolution.',
    icon: '📦',
    color: '#f0883e',
    lessons: [
      { id: 'es-modules', slug: 'es-modules', title: 'ES Modules', description: 'Named exports, default exports, re-exports' },
      { id: 'declaration-files', slug: 'declaration-files', title: 'Declaration Files', description: 'Write .d.ts files for JavaScript libraries' },
      { id: 'module-resolution', slug: 'module-resolution', title: 'Module Resolution', description: 'How TypeScript finds modules' },
    ],
  },
  {
    id: 'testing',
    title: 'Testing',
    description: 'Type-safe testing with Vitest, mocking, and assertions.',
    icon: '✅',
    color: '#3fb950',
    lessons: [
      { id: 'vitest-basics', slug: 'vitest-basics', title: 'Vitest Basics', description: 'Setup, describe, it, expect' },
      { id: 'type-safe-testing', slug: 'type-safe-testing', title: 'Type-Safe Testing', description: 'Typed test data and fixtures' },
      { id: 'mocking', slug: 'mocking', title: 'Mocking', description: 'Mock modules and functions with vi' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend with React',
    description: 'React + TypeScript: props, hooks, and component patterns.',
    icon: '⚛️',
    color: '#61dafb',
    lessons: [
      { id: 'react-typescript', slug: 'react-typescript', title: 'React + TypeScript', description: 'Typing components, props, and refs' },
      { id: 'hooks-typing', slug: 'hooks-typing', title: 'Typing Hooks', description: 'useState, useReducer, useContext, custom hooks' },
      { id: 'component-patterns', slug: 'component-patterns', title: 'Component Patterns', description: 'Generics, compound components, HOCs' },
    ],
  },
  {
    id: 'angular',
    title: 'Frontend with Angular',
    description: 'Angular components, services, DI, forms, and routing — with React parity.',
    icon: '🅰️',
    color: '#dd0031',
    lessons: [
      { id: 'angular-components', slug: 'angular-components', title: 'Angular Components', description: 'Decorators, templates, lifecycle hooks, and Signals' },
      { id: 'angular-services-di', slug: 'angular-services-di', title: 'Services & DI', description: 'Injectable services, RxJS, and the DI container' },
      { id: 'angular-forms-routing', slug: 'angular-forms-routing', title: 'Forms & Routing', description: 'Reactive forms, validators, and the Angular Router' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend with Node.js',
    description: 'Node.js, Express, and REST APIs with TypeScript.',
    icon: '🖥️',
    color: '#339933',
    lessons: [
      { id: 'nodejs-typescript', slug: 'nodejs-typescript', title: 'Node.js + TypeScript', description: 'Setup, file system, environment variables' },
      { id: 'express-typescript', slug: 'express-typescript', title: 'Express + TypeScript', description: 'Typed handlers, middleware, and errors' },
      { id: 'rest-apis', slug: 'rest-apis', title: 'REST APIs', description: 'Type-safe API contracts and validation' },
    ],
  },
  {
    id: 'packages',
    title: 'Popular Packages',
    description: 'Zod, Prisma, tRPC, and other essential TypeScript libraries.',
    icon: '📚',
    color: '#e879f9',
    lessons: [
      { id: 'zod-validation', slug: 'zod-validation', title: 'Zod Validation', description: 'Schema validation with auto-generated types' },
      { id: 'prisma-orm', slug: 'prisma-orm', title: 'Prisma ORM', description: 'Type-safe database access' },
      { id: 'popular-libraries', slug: 'popular-libraries', title: 'Popular Libraries', description: 'tRPC, React Query, date-fns' },
    ],
  },
  {
    id: 'polish',
    title: 'Polish & Deploy',
    description: 'tsconfig deep dive, strict mode, performance, and deployment.',
    icon: '✨',
    color: '#ffd700',
    lessons: [
      { id: 'tsconfig-deep-dive', slug: 'tsconfig-deep-dive', title: 'tsconfig Deep Dive', description: 'Every option explained' },
      { id: 'strict-mode', slug: 'strict-mode', title: 'Strict Mode', description: 'strictNullChecks, noImplicitAny, and more' },
      { id: 'deployment', slug: 'deployment', title: 'Deployment', description: 'Build, bundle, and ship TypeScript apps' },
    ],
  },
]
