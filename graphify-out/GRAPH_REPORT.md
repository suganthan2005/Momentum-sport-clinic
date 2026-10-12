# Graph Report - momentum  (2026-10-12)

## Corpus Check
- 8 files · ~25,777 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 1 file(s) not represented in the graph (top: .css 1)

## Summary
- 70 nodes · 65 edges · 11 communities (8 shown, 3 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7988e08d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- compilerOptions
- package.json
- layout.tsx
- page.tsx
- devDependencies
- dependencies
- scripts
- tsconfig.json
- Move well after 50, from home.
- IMAGE_SOURCES.md

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 15 edges
2. `scripts` - 4 edges
3. `Move well after 50, from home.` - 4 edges
4. `What you get` - 4 edges
5. `Home()` - 3 edges
6. `next` - 3 edges
7. `react` - 2 edges
8. `Membership` - 2 edges
9. `metadata` - 1 edges
10. `areas` - 1 edges

## Surprising Connections (you probably didn't know these)
- None detected - all connections are within the same source files.

## Import Cycles
- None detected.

## Communities (11 total, 3 thin omitted)

### Community 0 - "compilerOptions"
Cohesion: 0.13
Nodes (15): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+7 more)

### Community 1 - "package.json"
Cohesion: 0.22
Nodes (8): name, private, version, react-dom, @types/node, @types/react, @types/react-dom, typescript

### Community 2 - "layout.tsx"
Cohesion: 0.29
Nodes (3): metadata, nextConfig, next

### Community 3 - "page.tsx"
Cohesion: 0.25
Nodes (5): areas, AssessmentResult, Home(), redFlags, react

### Community 4 - "devDependencies"
Cohesion: 0.40
Nodes (5): devDependencies, @types/node, @types/react, @types/react-dom, typescript

### Community 6 - "dependencies"
Cohesion: 0.50
Nodes (4): dependencies, next, react, react-dom

### Community 7 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, build, dev, start

### Community 9 - "Move well after 50, from home."
Cohesion: 0.22
Nodes (8): Exercise videos, Home exercise kit, Membership, Momentum After 50+ launch membership, Move well after 50, from home., Start your assessment, What you get, Your physio, monthly

## Knowledge Gaps
- **5 isolated node(s):** `react-dom`, `@types/node`, `@types/react`, `@types/react-dom`, `typescript`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 54 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `page.tsx` to `package.json`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `react-dom`, `@types/node`, `@types/react` to the rest of the system?**
  _5 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `next` connect `layout.tsx` to `package.json`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._