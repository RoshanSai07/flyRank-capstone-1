# Project Context

## Product

This repository contains a SaaS product that provides AI-powered lead qualification widgets for businesses.

The product should allow businesses to create and eventually deploy high-quality interactive widgets that engage website visitors and help qualify potential leads.

The platform itself should eventually use its own lead-qualification experience as part of the product and marketing experience.

## Product Philosophy

This should feel like a real product, not a tutorial project or a generic AI demo.

Prioritize:

- Clear product value
- Strong user experience
- Thoughtful interactions
- High-quality visual design
- Simplicity over unnecessary features
- Useful AI integration rather than AI for decoration

When making product decisions, favor ideas that make the experience feel more polished, distinctive, and genuinely useful.

## UI & Design Direction

The visual quality of the product is a major priority.

The interface should feel:

- Premium
- Modern
- Clean
- Sophisticated
- Interactive
- Confident
- Technically polished

Avoid:

- Generic SaaS templates
- Generic AI landing pages
- Excessive gradients
- Purple/pink AI aesthetics
- Unnecessary glassmorphism
- Excessive rounded cards
- Cluttered dashboards
- Stock-looking layouts
- Decorative elements without purpose

Do not make the interface look like it was assembled from a component library without design thought.

Prioritize strong typography, spacing, hierarchy, composition, subtle motion, meaningful micro-interactions, and visual consistency.

Every major UI element should have a reason to exist.

## UX Principles

- Design for the user's goal first.
- Keep important flows obvious and easy to understand.
- Provide clear feedback for user actions.
- Handle loading, empty, error, and unexpected states.
- Make interactions feel intentional rather than flashy.
- Design responsive experiences from the beginning.
- Use semantic and accessible UI patterns.
- Do not sacrifice usability for visual effects.

## AI Development

AI is a development tool as well as a core part of the product.

When generating or modifying code:

1. Understand the existing implementation before changing it.
2. Prefer small, focused changes.
3. Avoid unnecessary abstractions.
4. Avoid introducing dependencies without a clear reason.
5. Review generated code before accepting it.
6. Preserve existing functionality unless a change is intentional.
7. Do not invent product requirements that have not been established.

For product AI features, prefer structured and predictable outputs where appropriate and account for loading, failure, and unexpected responses.

## Code Quality

- Keep code readable and maintainable.
- Prefer reusable components and utilities where they provide real value.
- Keep components focused.
- Use clear and descriptive naming.
- Avoid duplicated logic.
- Avoid premature optimization.
- Do not over-engineer simple problems.

## Git

Use Conventional Commits.

Examples:

- `feat: add qualification widget`
- `fix: handle failed qualification response`
- `docs: update project documentation`
- `chore: update project configuration`
- `refactor: simplify widget state`

Keep each commit focused on one logical change.

## Important

The technology stack is intentionally not defined in this file yet.

Do not assume a framework, library, styling system, or architecture unless it has been explicitly established in the project.

When the stack is chosen, update this file with the relevant technical conventions.
