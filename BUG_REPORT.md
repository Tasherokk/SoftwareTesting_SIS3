# Bug Report: Cloud CI Runners Blocked by Cloudflare Bot Management (WAF)

- **Bug ID:** BUG-CI-001
- **Title:** Cloudflare WAF blocks GitHub Actions runner IP addresses with a "Verify you are human" CAPTCHA on `/auth/login`
- **Severity:** High
- **Priority:** High
- **Status:** Open (External Infrastructure Limitation)

## Environment
- **Target URL:** `https://practicesoftwaretesting.com/auth/login`
- **CI Platform:** GitHub Actions (`ubuntu-latest`, Azure Datacenter IP range)
- **Node.js / Runner:** Node.js 22 LTS, `@playwright/test` (Chromium Headless)
- **Cloudflare Ray ID:** `a58c945d2bca07d1`

## Preconditions
1. Repository variables (`BASE_URL`, `TEST_EMAIL`) and secret (`TEST_PASSWORD`) are configured in GitHub Settings → Secrets and variables → Actions.
2. All E2E tests pass 100% locally in both normal mode (`npx playwright test`) and CI simulation mode (`CI=true npx playwright test`).

## Steps to Reproduce
1. Push a commit or open a Pull Request to trigger `.github/workflows/playwright.yml` on GitHub Actions.
2. Wait for the `Tests (shard i/4)` jobs to execute `npx playwright test --shard=i/4`.
3. In `tests/auth.setup.ts`, Playwright calls `await this.page.goto('/auth/login')` and attempts to fill `page.getByTestId('email')`.
4. Download the generated `test-results-N` artefact from the GitHub Actions run page and inspect `test-failed-1.png` and `trace.zip`.

## Expected Result
The application loads the Angular login form at `/auth/login`, allowing the global setup script (`auth.setup.ts`) to enter credentials, verify redirection to `/account`, and save the authentication state to `playwright/.auth/user.json`.

## Actual Result
Cloudflare Bot Management detects that the HTTP request originates from a known datacenter IP address (GitHub Actions runner) and intercepts navigation with a security challenge page:
> *"practicesoftwaretesting.com Performing security verification. This website uses a security service to protect against malicious bots. Verify you are human (Cloudflare)."*

Because the login form is never rendered in the DOM, `locator.fill` waiting for `getByTestId('email')` times out after 30,000ms across the initial attempt and 2 CI retries (`Retry #1`, `Retry #2`).

## Visual Evidence & Artefacts
- **Failure Screenshot (`test-failed-1.png`):** Extracted from the `test-results-1` GitHub Actions artefact (shows Cloudflare Turnstile CAPTCHA and Ray ID `a58c945d2bca07d1`).
- **Playwright Trace (`trace.zip`):** Recorded automatically on `Retry #1` via `trace: 'on-first-retry'` and verified in `trace.playwright.dev`.
- **Local Verification:** Running the exact same CI workflow commands locally (`CI=true`, 4 shards + `merge-reports`) from a residential IP address completes 100% green and produces `reports/junit.xml` and `reports/junit-merged.xml`.