# AI Assistance Documentation

**Model used:** Google Gemini 3.1 Pro

### How I used it
For this assignment, I used Google Gemini primarily as an analytical and formatting assistant. Specifically, I used AI to:
1. **Understand the Assignment:** I fed the assignment requirements to AI to help me break down strict grading criteria and build step-by-step execution plan.
2. **Clarify CI/CD Concepts:** I used AI to explain how environment variables differ from secrets in GitHub Actions, and how the `dotenv` package works for local development versus cloud environments without hardcoding credentials.
3. **Translation and Formatting:** I drafted my thoughts, and asked the AI to help translate them into clear, professional English for the README and the final report.
4. **Debugging Cloudflare Blocking:** When my GitHub Actions run failed due to timeout on public test stand, the AI guided me to check the downloaded artifacts (`test-failed-1.png`). This helped me discover that the test application was blocking GitHub Actions IP addresses via a Cloudflare CAPTCHA.
5. **Root-Cause Debugging & Bug Reporting:** When my cloud runs timed out on `page.goto('/auth/login')`, I inspected the logs and downloaded the failure artefacts with the AI's guidance. After identifying the Cloudflare CAPTCHA (`test-failed-1.png`), I used the AI to structure a formal QA document (`BUG_REPORT.md`).

### Prompts I used
* "I read the assignment, but can you explain exactly what the 'merge-reports' job does and why we need separate `merge.config.ts`?"
* "How do I safely test my credentials locally without hardcoding them, while keeping code compatible with GitHub Actions variables and secrets?"
* "My GitHub Action failed with timeout on `page.goto`. Locally it works fine. What could be causing this in CI environment, and how can I check the artifacts to prove it?"
* "Please help me format my draft notes into clean Google Docs report template and markdown for the README, ensuring it meets all the teacher's checklist items."
* "I downloaded the `test-results` artifact from GitHub Actions and found a Cloudflare 'Verify you are human' screenshot on `test-failed-1.png`. Help me structure a formal QA bug report (`BUG_REPORT.md`) and update my report and README to document this infrastructure block."
