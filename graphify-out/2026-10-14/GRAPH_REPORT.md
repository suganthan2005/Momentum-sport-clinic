# Graph Report - momentum  (2026-10-14)

## Corpus Check
- 9 files · ~28,474 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .example 1, .css 1)

## Summary
- 80 nodes · 79 edges · 10 communities (8 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bbddd1fc`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- compilerOptions
- package.json
- layout.tsx
- page.tsx
- devDependencies
- dependencies
- route.ts
- Move well after 50, from home.
- IMAGE_SOURCES.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `Home()` - 5 edges
3. `scripts` - 4 edges
4. `next` - 4 edges
5. `Move well after 50, from home.` - 4 edges
6. `What you get` - 4 edges
7. `text()` - 2 edges
8. `POST()` - 2 edges
9. `ArrowIcon()` - 2 edges
10. `CheckIcon()` - 2 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (10 total, 2 thin omitted)

### Community 0 - "compilerOptions"
Cohesion: 0.11
Nodes (17): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+9 more)

### Community 1 - "package.json"
Cohesion: 0.15
Nodes (12): name, private, scripts, build, dev, start, version, react-dom (+4 more)

### Community 2 - "layout.tsx"
Cohesion: 0.29
Nodes (3): metadata, nextConfig, next

### Community 3 - "page.tsx"
Cohesion: 0.20
Nodes (9): ArrowIcon(), AssessmentResult, CheckIcon(), conditions, faqs, Home(), plans, redFlags (+1 more)

### Community 4 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, @types/node, @types/react, @types/react-dom, typescript

### Community 6 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, googleapis, next, react, react-dom

### Community 7 - "route.ts"
Cohesion: 0.50
Nodes (4): areas, POST(), text(), googleapis

### Community 9 - "Move well after 50, from home."
Cohesion: 0.22
Nodes (8): Exercise videos, Home exercise kit, Membership, Momentum After 50+ launch membership, Move well after 50, from home., Start your assessment, What you get, Your physio, monthly

## Knowledge Gaps
- **5 isolated node(s):** `react-dom`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 58 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `page.tsx` to `package.json`?**
  _High betweenness centrality (0.125) - this node is a cross-community bridge._
- **What connects `react-dom`, `@types/node`, `@types/react` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Why does `next` connect `layout.tsx` to `package.json`, `route.ts`?**
  _High betweenness centrality (0.103) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.056) - this node is a cross-community bridge._