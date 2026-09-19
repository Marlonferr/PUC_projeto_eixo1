# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a template repository for a **Distributed Applications Course Project** at PUC Minas (Pontifícia Universidade Católica de Minas Gerais). It serves as a structured framework for students to document and develop distributed systems projects throughout the semester.

The repository is organized around a 5-stage development workflow, with each stage (ETAPA) focusing on a specific aspect of distributed application development.

## Repository Structure

### Core Documentation Stages

The project follows a sequential development approach with documentation-first methodology:

1. **ETAPA 1: Context Documentation** ([docs/contexto.md](docs/contexto.md))
   - Problem definition and project objectives
   - Requirements (functional and non-functional)
   - Target audience and personas
   - System architecture overview
   - Service catalog definition

2. **ETAPA 2: Backend APIs** ([docs/backend-apis.md](docs/backend-apis.md))
   - API objectives and modeling
   - Technology stack selection for backend
   - API endpoints specification (methods, parameters, responses)
   - Security considerations (authentication, authorization)
   - Testing strategy and deployment instructions

3. **ETAPA 3: Web Frontend** ([docs/frontend-web.md](docs/frontend-web.md))
   - Interface design and wireframes
   - Visual design specifications (colors, typography)
   - Data flow diagrams
   - Web-specific technologies and frameworks
   - Testing and deployment procedures

4. **ETAPA 4: Mobile Frontend** ([docs/frontend-mobile.md](docs/frontend-mobile.md))
   - Mobile interface design and wireframes
   - Mobile-specific visual design
   - Data flow in mobile context
   - Mobile development technologies
   - Mobile app testing and deployment

5. **ETAPA 5: Presentation** ([presentation/README.md](presentation/README.md))
   - Final project presentation materials
   - Development process summary video

### Directory Organization

- **[docs/](docs/)**: All project documentation organized by development stage
  - Contains markdown files for each ETAPA with detailed templates
  - [docs/img/](docs/img/): Documentation images and diagrams
- **[src/](src/)**: Source code directory (to be populated by students)
- **[help/](help/)**: Supporting materials and guides
  - Contains instructions for CITATION.cff file
- **[presentation/](presentation/)**: Final presentation materials
- **[ai/](ai/)**: AI-Driven Assessment and Rubrics Validation ecosystem
  - Contains prompt templates, evaluation blueprints, and individual/group reporting templates

### Citation and Academic Attribution

- **CITATION.cff**: Academic citation metadata following CFF (Citation File Format) standard
  - Must be filled with team member names and project details
  - Used for proper academic attribution and project archival

### Evaluation and Feedback System

Student evaluation is performed by an AI agent ecosystem, not by an automated GitHub Action:

- **[ai/](ai/)**: agent prompts, the rubric-to-evidence blueprint, and report templates used to evaluate real contribution. This folder (and [.claude/commands/avaliar-etapa.md](.claude/commands/avaliar-etapa.md)) is **gitignored** — it is a local-only tool for the professor and is never committed to the template or inherited by student repositories.
- **[docs/atas/](docs/atas/)**: per-student feedback portals, filled in by the evaluator agent.
- **[docs/feedback/](docs/feedback/)**: per-stage feedback panels, filled in by the evaluator agent.

## Development Workflow

### Documentation-First Approach

Students should complete documentation templates in sequential order (ETAPA 1 → 5) before or alongside implementation. Each documentation file includes:
- Guided sections with descriptive prompts
- Task planning tables (weekly task tracking with status indicators)
- Reference links to relevant resources and best practices

### Task Planning Tables

Each documentation stage includes standardized task tracking tables with:
- **Responsável**: Team member assigned to the task
- **Tarefa/Requisito**: Task or requirement description
- **Iniciado em**: Start date
- **Prazo**: Deadline
- **Status**: Progress indicator (✔️ complete, 📝 in progress, ⌛ delayed, ❌ not started)
- **Terminado em**: Completion date

### Architecture Expectations

Based on [docs/contexto.md](docs/contexto.md), projects should define:
- Component-based architecture diagram showing system structure
- Technology stack for each layer (backend, web frontend, mobile frontend)
- Hosting and deployment infrastructure
- Security mechanisms across all components

## Working with This Template

### When Starting a New Project

1. Fill in the main [README.md](README.md) with project title, team members, and project description
2. Complete [CITATION.cff](CITATION.cff) with team and project metadata
3. Work through each ETAPA sequentially, filling in the documentation templates
4. Add source code to [src/](src/) as development progresses
5. Update the main README.md with installation and usage instructions once implementation begins

### When Modifying Documentation

- Follow the existing template structure in each documentation file
- Keep task planning tables updated with current progress
- Replace placeholder text (marked with brackets like `[Inclua...]` or `[Descreva...]`)
- Add diagrams and wireframes to [docs/img/](docs/img/)
- Update references section with actual sources used

### When Adding Source Code

- Place implementation code in [src/](src/) directory
- Organize code by application type (backend, web-frontend, mobile-frontend)
- Update [src/README.md](src/README.md) with build, test, and run instructions
- Keep documentation in sync with actual implementation

### Working with Evaluation and Feedback

**For Students:**
- Make regular, meaningful commits to show consistent participation
- Contribute to both code (`src/`) and documentation (`docs/`)
- Use descriptive commit messages to document your work
- Check your feedback in [docs/atas/](docs/atas/) (individual) and [docs/feedback/](docs/feedback/) (per-stage panel) — these are filled in by the professor, not by students

**For Professors:**
- Run the `/avaliar-etapa` Claude Code command (requires the local, gitignored `ai/` and `.claude/` folders) to evaluate a stage and write feedback directly into `docs/atas/` and `docs/feedback/`
- See [ai/README.md](ai/README.md) for the full evaluation workflow and rubric blueprint

## Key Principles

- **Template Nature**: This repository is a starting point, not a complete application
- **Academic Project**: Designed for semester-long course projects with specific deliverable stages
- **Distributed Systems Focus**: Projects should demonstrate distributed application architecture
- **Multi-Platform**: Expected to include backend APIs, web interface, and mobile interface
- **Documentation Quality**: Documentation templates emphasize security, testing, and deployment considerations

## Notes for Claude Code

- When asked about build/test/lint commands, check [src/README.md](src/README.md) - students will add these as they implement
- Documentation files are in Portuguese (Brazilian)
- This is a template; many sections contain placeholder text to be replaced by students
- Architecture decisions should align with distributed systems principles taught in the course
- All file modifications should maintain the academic documentation structure
- Student evaluation runs through the local `ai/` agent ecosystem and the `/avaliar-etapa` command, not through a GitHub Action — see [ai/README.md](ai/README.md)
- The `ai/` and `.claude/` folders are gitignored on purpose; never remove them from `.gitignore` or commit them to this template
