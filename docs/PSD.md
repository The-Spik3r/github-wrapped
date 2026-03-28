# Product Specification Document (PSD)

## 1. Document Info
- **Project:** GitHub Wrapped
- **Type:** Web application (Next.js 16, React 19, TypeScript)
- **Version:** MVP (v0.1.0)
- **Date:** 2026-03-28

## 2. Product Overview
GitHub Wrapped is a public-profile analytics experience that generates an annual, card-based summary of a GitHub user's activity. A visitor enters any public GitHub username and receives a visual "wrapped" including total commits, top languages, coding schedule, longest streak, top repository, and a final summary card that can be shared.

The product is designed to make developer activity understandable, attractive, and socially shareable in under one minute.

## 3. Problem Statement
GitHub activity data is spread across repositories, events, and contribution surfaces, which makes quick self-reflection and social sharing difficult.

Users need:
- A fast way to understand yearly coding patterns.
- A lightweight, no-login experience for public data.
- Share-ready visuals for social platforms.

## 4. Goals and Success Criteria
### Primary Goals
- Generate a yearly GitHub summary from public profile data.
- Present the summary in a visual, mobile-friendly card flow.
- Enable one-click sharing and image export.

### Success Criteria (Product)
- User can generate wrapped view with a valid username in one flow.
- User can navigate all cards and understand each metric.
- User can download/share results without errors in common browsers.

### Suggested KPIs
- Username-to-wrapped completion rate.
- Average number of cards viewed per session.
- Share/download action rate.
- Error rate for invalid usernames and API limit issues.

## 5. Target Users
- **Primary:** Developers wanting a yearly snapshot of public coding activity.
- **Secondary:** Recruiters, teammates, and communities consuming shared developer stats.

## 6. Scope
### In Scope (MVP)
- Public GitHub username input.
- Wrapped page generation for current UTC year.
- Six analytics cards:
  1. Total Commits
  2. Top Languages
  3. Coding Schedule
  4. Longest Streak
  5. Top Repo
  6. Summary
- Card carousel navigation (buttons, dots, swipe, keyboard arrows).
- Download current card area as PNG.
- Share link actions for Twitter and LinkedIn.
- Dynamic OG image endpoint per username.
- Graceful states for user-not-found and GitHub rate limit.

### Out of Scope (MVP)
- Private repository analytics.
- Multi-year comparison or historical year selector.
- User auth/account system.
- Persistent saved reports.
- Internationalization framework (current copy is mostly Spanish).

## 7. User Experience Requirements
### Core User Journey
1. User lands on home page.
2. User enters GitHub username.
3. App routes to `/{username}` and fetches public data.
4. App computes stats and renders wrapped cards.
5. User browses cards and optionally downloads/shares.

### UX/Interaction Requirements
- Input should accept usernames with or without `@` prefix.
- Empty input should not navigate.
- Wrapped page must surface avatar, username, bio, year, and rate-limit info.
- Carousel should support mouse, touch, and keyboard navigation.
- Share actions must open external share URLs in a new tab.

## 8. Functional Requirements
### FR-01 Username Capture and Routing
- System must accept a public GitHub username from the landing page form.
- System must normalize input by trimming spaces and removing leading `@`.
- System must route to `/{normalizedUsername}`.

### FR-02 GitHub Data Retrieval
- System must retrieve user profile, repositories, and public events from GitHub API.
- System may use `GITHUB_TOKEN` when available for higher API limits.
- System must return a not-found state for unknown usernames.
- System must return a rate-limit state when GitHub API returns limit errors.

### FR-03 Stats Computation
- System must compute all wrapped stats for current UTC year.
- System must compute top languages by total bytes across sampled repos.
- System must compute total commits with fallback precedence:
  1. Authored commits
  2. Push events
  3. Commit activity stats
- System must compute longest streak by consecutive active days.
- System must compute coding schedule buckets: `madrugada`, `manana`, `tarde`, `noche`.

### FR-04 Wrapped Presentation
- System must render six cards using computed stats.
- System must support next/previous, dot selection, and swipe transitions.
- System must display friendly empty-data text where a metric cannot be derived.

### FR-05 Share and Export
- System must allow screenshot-like PNG download of wrapped card container.
- System must provide share actions for Twitter and LinkedIn using current page URL.

### FR-06 OG Image Generation
- System must provide endpoint `GET /api/og/{username}` returning social preview image.
- OG image must include username avatar and key metrics (commits, top language, streak).

## 9. Data and Calculation Specification
### Data Sources
- GitHub Users API (`users.getByUsername`).
- GitHub Repos API (`repos.listForUser`, `repos.listLanguages`, `repos.getCommitActivityStats`, `repos.listCommits`).
- GitHub Activity API (`activity.listPublicEventsForUser`).

### Sampling/Performance Constraints (Current Implementation)
- Repositories fetched: up to 100.
- Language analysis repos: first 18.
- Commit activity repos: first 10.
- Commit listing repos: first 15.
- Commit pagination depth per repo: 2 pages.

### Derived Metrics
- `totalCommits` (yearly)
- `topLanguages` (top 3 with percentage)
- `codingSchedule` (4 time buckets with counts and percentages)
- `longestStreak` (days)
- `topRepo` (repo with highest commit count)
- `summary` (aggregate headline)

## 10. Non-Functional Requirements
- **Performance:** Initial wrapped render should be responsive on modern desktop/mobile networks.
- **Reliability:** API failures must surface explicit fallback states instead of crashing UI.
- **Security:** No requirement for GitHub OAuth or write permissions; public data only.
- **Accessibility:** Basic semantic structure, keyboard navigation for carousel, readable contrast in UI theme.
- **SEO/Social:** Dynamic metadata and OG image for per-user share previews.

## 11. Technical Architecture (High Level)
- **Framework:** Next.js App Router.
- **Server-side modules:** GitHub data fetch (`lib/github.ts`), stat computation (`lib/stats.ts`).
- **UI layer:** Route pages in `app/`, card components in `components/cards/`.
- **Animation:** Framer Motion for card transitions.
- **Image export:** `html-to-image` on client side.
- **OG rendering:** `next/og` image response route.

## 12. Error Handling Requirements
- **User not found:** Show dedicated page state with retry path back to home.
- **Rate limit reached:** Show guidance to configure `GITHUB_TOKEN` and estimated reset time.
- **Partial data availability:** Compute with fallbacks and display best-effort metrics.

## 13. Deployment and Environment
- Required scripts: `dev`, `build`, `start`, `lint`.
- Environment variables:
  - `GITHUB_TOKEN` (optional but recommended for higher limit)
  - `NEXT_PUBLIC_APP_URL` (application base URL)

## 14. Risks and Mitigations
- **Risk:** GitHub API rate limiting for unauthenticated traffic.
  - **Mitigation:** Token support + explicit rate-limit UI.
- **Risk:** Public event data incompleteness for some users.
  - **Mitigation:** Multi-source fallback (commits, push events, commit activity).
- **Risk:** Social share behavior differs by platform/browser.
  - **Mitigation:** Use standard intent/share URLs and URL-based sharing.

## 15. Future Enhancements
- Year selector and year-over-year comparisons.
- Additional metrics (PRs, issues, stars, review activity).
- More export formats (full report image/PDF).
- Localization and language toggle.
- Personalized visual themes.

## 16. Acceptance Criteria (MVP)
- Valid username produces complete wrapped view without manual refresh.
- Invalid username returns a clear not-found message.
- Rate-limited request returns dedicated rate-limit guidance.
- User can navigate all six cards via buttons, dots, and keyboard arrows.
- User can successfully download PNG and open Twitter/LinkedIn share dialogs.
- `GET /api/og/{username}` returns an image response for valid public usernames.
