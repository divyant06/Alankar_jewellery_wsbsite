---
version: alpha
name: "BlueStone Jewellery — Navy & Rose Luxury Commerce"
description: "Primary visual anchor uses #e2e8f0 with universal border and divider colour across inputs, cards, and layout separators. Typography baseline relies on Domine for section headings and editorial display text."
colors:
  slate-border: "#e2e8f0"
  coral-cta: "#f15d47"
  mauve-accent: "#9d7792"
  page-white: "#ffffff"
  rose-blush-surface: "#fff8f9"
  brand-navy: "#011e38"
  deep-navy: "#032c5e"
  near-black: "#020817"
typography:
  display-heading:
    fontFamily: "Domine"
    fontSize: "24px"
    fontWeight: "400"
    lineHeight: "30px"
  section-subheading:
    fontFamily: "Domine"
    fontSize: "18px"
    fontWeight: "400"
    lineHeight: "20px"
  body-default:
    fontFamily: "Mulish"
    fontSize: "16px"
    fontWeight: "400"
    lineHeight: "24px"
  body-small:
    fontFamily: "Mulish"
    fontSize: "14px"
    fontWeight: "400"
    lineHeight: "20px"
  label-medium:
    fontFamily: "Mulish"
    fontSize: "14px"
    fontWeight: "500"
    lineHeight: "20px"
  caption-uppercase:
    fontFamily: "Mulish"
    fontSize: "12px"
    fontWeight: "600"
    lineHeight: "16px"
    letterSpacing: "0.9px"
  domine-label:
    fontFamily: "Domine"
    fontSize: "14px"
    fontWeight: "600"
    lineHeight: "20px"
  strong-body:
    fontFamily: "Mulish"
    fontSize: "18px"
    fontWeight: "700"
    lineHeight: "28px"
rounded:
  radius-sm: "4px"
  radius-md: "8px"
  radius-lg: "10px"
  radius-xl: "24px"
  radius-pill: "9999px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-5: "24px"
  space-6: "30px"
  space-7: "40px"
  space-8: "48px"
  space-9: "65px"
---

## Overview

Primary visual anchor uses #e2e8f0 with universal border and divider colour across inputs, cards, and layout separators. Typography baseline relies on Domine for section headings and editorial display text.

This system uses a 8px base grid with scale values 4, 8, 12, 16, 24, 30, 40, 48, 65.

**Signature traits:**
- Core token rhythm: Token evidence indicates consistent color, spacing, and radius rhythm across visible UI.

## Colors

The palette uses 8 validated color tokens across 1 theme profile. Semantic roles stay attached to observed usage so generation agents can choose accents without inventing new color meaning.

**Semantic naming:**
- **surface-text** maps to `brand-navy`: Role "text" is grounded by usage context "Primary brand colour used in the category navigation bar background, key text, and brand identity elements".
- **surface-background** maps to `page-white`: Role "background" is grounded by usage context "Primary page and card background; also used for header utility bar and text on dark backgrounds".
- **border-primary** maps to `slate-border`: Role "primary" is grounded by usage context "Universal border and divider colour across inputs, cards, and layout separators".
- **content-text** maps to `near-black`: Role "text" is grounded by usage context "Primary body and heading text colour across the page".

### Primary Brand
- **Slate Border** (#e2e8f0): Universal border and divider colour across inputs, cards, and layout separators. Role: primary. {authored: rgb(226, 232, 240), space: rgb}
- **Coral CTA** (#f15d47): Primary call-to-action colour for hover states and promotional highlights. Role: accent.

### Text Scale
- **Brand Navy** (#011e38): Primary brand colour used in the category navigation bar background, key text, and brand identity elements. Role: text. {authored: rgb(1, 30, 56), space: rgb}
- **Deep Navy** (#032c5e): Secondary navy used for footer backgrounds, secondary text, and supporting brand elements. Role: text. {authored: rgb(3, 44, 94), space: rgb, alpha: 0.2}
- **Near Black** (#020817): Primary body and heading text colour across the page. Role: text. {authored: rgb(2, 8, 23), space: rgb}

### Surface & Shadows
- **Mauve Accent** (#9d7792): Store PLP top bar background; accent colour for in-store category pages. Role: background. {authored: rgb(157, 119, 146), space: rgb}
- **Page White** (#ffffff): Primary page and card background; also used for header utility bar and text on dark backgrounds. Role: background. {authored: rgb(255, 255, 255), space: rgb, alpha: 0.1}
- **Rose Blush Surface** (#fff8f9): Warm off-white surface used for product card backgrounds and section fills. Role: background. {authored: rgb(255, 248, 249), space: rgb}

## Typography

Typography uses Domine, Mulish across extracted hierarchy roles. Keep hierarchy mapped to these token rows before adding decorative type styles.

Mixes Domine and Mulish for visual contrast. Weight range spans regular, medium, semi-bold, bold. Sizes range from 12px to 24px.

### Font Roles
- **Headline Font**: Domine
- **Body Font**: Domine

### Type Scale Evidence
| Role | Font | Size | Weight | Line Height | Letter Spacing | Stack / Features | Notes |
|------|------|------|--------|-------------|----------------|------------------|-------|
| Section headings and editorial display text | Domine | 24px | 400 | 30px | normal | Domine, serif | Extracted token |
| Sub-section titles and product category labels | Domine | 18px | 400 | 20px | normal | Domine, serif | Extracted token |
| Primary body text, navigation labels, and general UI copy | Mulish | 16px | 400 | 24px | normal | Mulish, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif | Extracted token |
| Secondary body text, product metadata, and supporting copy | Mulish | 14px | 400 | 20px | normal | Mulish, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif | Extracted token |
| UI labels, filter chips, and medium-emphasis interactive text | Mulish | 14px | 500 | 20px | normal | Mulish, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif | Extracted token |
| Category tags, badges, and uppercase caption labels | Mulish | 12px | 600 | 16px | 0.9px | Mulish, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif | Extracted token |
| Serif-weight labels for editorial callouts and product names | Domine | 14px | 600 | 20px | normal | Domine, serif | Extracted token |
| Promotional headings and featured product titles | Mulish | 18px | 700 | 28px | normal | Mulish, sans-serif, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif | Extracted token |

## Layout

Responsive system uses 4 breakpoint tier(s): mobile, tablet, desktop, wide.

### Responsive Strategy
- **mobile (380-768px)**: Constrain layout for small viewports and prioritize vertical stacking.
- **tablet (>= 640px)**: Increase spacing and column structure for medium-width viewports.
- **desktop (>= 1100px)**: Expand layout density and horizontal composition for wide viewports.
- **wide (>= 1440px)**: Stretch composition with generous gutters and wider layout spans.

### Spacing System
| Token | Value | Px | Notes |
|------|-------|----|-------|
| space-1 | 4px | 4 | Extracted spacing token |
| space-2 | 8px | 8 | Extracted spacing token |
| space-3 | 12px | 12 | Extracted spacing token |
| space-4 | 16px | 16 | Extracted spacing token |
| space-5 | 24px | 24 | Extracted spacing token |
| space-6 | 30px | 30 | Extracted spacing token |
| space-7 | 40px | 40 | Extracted spacing token |
| space-8 | 48px | 48 | Extracted spacing token |
| space-9 | 65px | 65 | Extracted spacing token |

## Elevation & Depth

Keep depth flat unless validated shadow or interaction evidence appears in the extraction payload. Do not invent shadows beyond this evidence boundary.

### Shadow Evidence
| Shadow Token | Layers | Details |
|--------------|--------|---------|
| shadow-card-rose | 3 | 0px 0px 0px 0px rgba(0, 0, 0, 0) |
| shadow-card-neutral | 4 | 0px 0px 0px 0px rgba(0, 0, 0, 0) |
| shadow-ambient | 1 | 0px 0px 15px 0px rgba(0, 0, 0, 0.1) |
| shadow-drop-sm | 3 | 0px 0px 0px 0px rgba(0, 0, 0, 0) |

### Interaction Signals
| Theme | Signal | Evidence |
|-------|--------|----------|
| Light | outline-color | rgb(2, 8, 23) ; rgb(3, 44, 94) ; rgb(255, 255, 255) |
| Light | outline-width | 3px |
| Light | outline-offset | 0px |
| Light | transform | matrix(1, 0, 0, 1, 0, 0) ; matrix(1, 0, 0, 1, -66.3125, -66.3125) ; matrix(1, 0, 0, 1, -159.625, 0) |

## Shapes

Shape language maps directly to rounded tokens. Keep component corners consistent with the role mapping below before introducing bespoke geometry.

### Radius Roles
| Token | Value | Px | Role Mapping |
|------|-------|----|--------------|
| radius-sm | 4px | 4 | Subtle corner |
| radius-md | 8px | 8 | Control corner |
| radius-lg | 10px | 10 | Control corner |
| radius-xl | 24px | 24 | Large surface corner |
| radius-pill | 9999px | 9999 | Large surface corner |

### Geometry Evidence
| Radius Token | Shape | Units |
|--------------|-------|-------|
| radius-sm | 4px | px |
| radius-md | 8px | px |
| radius-lg | 10px | px |
| radius-xl | 24px | px |
| radius-pill | 9999px | px |

## Components

(none detected)

## Do's and Don'ts

Guardrails protect Core token rhythm without adding unsupported visual claims.

| Do | Don't |
|----|---------|
| Do maintain consistent spacing using the base grid | Don't make unsupported claims about absent visual features |
| Do maintain WCAG AA contrast ratios (4.5:1 for normal text) | Don't mix rounded and sharp corners in the same view |
| Do use the primary color only for the single most important action per screen |  |
| Do verify evidence before writing new design-system guidance |  |

## Responsive Evidence

### Breakpoints
| Name | Width | Key Changes |
|------|-------|-------------|
| Breakpoint 1 | <= 768px | (max-width: 768px) |
| Mobile | >= 380px | (min-width: 380px) |
| Mobile | >= 501px | (min-width: 501px) |
| Mobile | >= 640px | (min-width: 640px) |
| Mobile | >= 701px | (min-width: 701px) |
| Tablet | >= 768px | (min-width: 768px) |
| Tablet | >= 970px | (min-width: 970px) |
| Desktop | >= 1100px | (min-width: 1100px) |
| Desktop | >= 1200px | (min-width: 1200px) |
| Desktop | >= 1280px | (min-width: 1280px) |
| Desktop | >= 1440px | (min-width: 1440px) |
| Desktop | >= 1536px | (min-width: 1536px) |
| Breakpoint 13 | Unknown | (prefers-reduced-motion: reduce) |

## Agent Prompt Guide

### Example Component Prompts
- Create button component using validated primary color role and spacing tokens.
- Create card component with mapped radius role and evidence-backed elevation.
- Create form input component using inferred typography hierarchy and border roles.

### Iteration Guide
1. Start with extracted palette and typography roles only.
2. Map spacing and radius directly from token tables before visual polish.
3. Apply component patterns one section at a time and compare against source intent.
4. Keep elevation claims tied to explicit evidence in output.
5. Iterate with smallest diffs and re-check section hierarchy after each change.
