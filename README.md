# GDGoC NDU — Techverse

A mobile-first, five-question interactive tech experience for GDGoC NDU recruitment day. It uses HTML, CSS, and vanilla JavaScript and can be published directly with GitHub Pages.

## Project files

```text
gdgoc-techverse/
├── index.html
├── style.css
├── script.js
├── questions.js
├── assets/
│   └── icons/
│       └── favicon.svg
└── README.md
```

- `index.html` contains the experience screens and semantic page structure.
- `style.css` contains the responsive theme, animations, and mobile layouts.
- `script.js` handles question selection, scoring, identities, voucher display, session restoration, and scorecard sharing.
- `questions.js` is the editable question bank. It currently contains 15 unique questions at each of the three levels (45 total).
- `assets/icons/favicon.svg` is a small custom Techverse icon; it is not an official Google or club logo.

## How to publish on GitHub Pages

You do not need to install anything or run a build command.

1. Sign in to GitHub and create a new repository, for example `gdgoc-techverse`.
2. On the new repository page, choose **Add file → Upload files**.
3. Upload `index.html`, `style.css`, `script.js`, and `questions.js`, plus the `assets` folder and `README.md`. Keep the folder structure as shown above.
4. Commit the uploaded files to the repository's default branch (usually `main`).
5. Open **Settings → Pages** in the repository.
6. Under the build/deployment source, select **Deploy from a branch**.
7. Select branch `main` and folder `/(root)`, then save.
8. Wait for GitHub Pages to finish the deployment shown on the Pages screen. The public URL will be displayed there. For a project repository, it usually has the form `https://YOUR-USERNAME.github.io/gdgoc-techverse/`.
9. Open the published URL on a phone and complete the test checklist below before putting it behind a recruitment-day QR code.

If GitHub Pages is already enabled, upload changes to the same repository and branch. The site will update after Pages deploys the new commit.

## Create a QR code for recruitment day

1. Copy the exact published GitHub Pages URL from **Settings → Pages**.
2. Use a QR-code generator you trust and paste that URL into it. Choose a high-resolution PNG or SVG export.
3. Add the QR code to your poster or printout with a quiet white margin around it. Avoid warping the square or placing text over it.
4. Print a test copy and scan it with both an iPhone and an Android phone. Confirm it opens the published Techverse page and that the primary **Start the Experience** button works.
5. Keep the published URL unchanged after printing the code. If you change repository name or deployment path, regenerate the QR code.

## Configure the voucher threshold

Open `script.js` and edit the configuration near the top:

```js
const WINNING_SCORE = 2;
```

The default means that **2 or more correct answers out of 5 wins a voucher**. For example, set it to `3` if you want three correct answers required. The winning result, not the performance message, follows this threshold.

The current code creates a reference like `GDG-7K4P2` for each winning attempt. This is a visual reference for the team to inspect at the physical table, not a secure redemption token. A static GitHub Pages site cannot centrally validate one-time voucher redemptions or prevent someone reusing a screenshot/reference. Use a backend if secure, central redemption becomes necessary.

## Edit the questions

Open `questions.js`. Each entry looks like this:

```js
{
  id: "exp-01",
  difficulty: "explorer",
  category: "Code",
  type: "code_output",
  question: "What will this tiny Python program print?",
  snippet: "x = 4\ny = 3\nprint(x + y)",
  language: "python",
  options: ["7", "12", "43", "1"],
  answer: 0,
  explanation: "The + operator adds the two numbers: 4 + 3 = 7."
}
```

Important fields:

- `id`: unique identifier for the question.
- `difficulty`: exactly one of `explorer`, `enthusiast`, or `geek`.
- `category`: used to help assign a fun tech identity, for example `AI`, `Code`, `Logic`, `Cybersecurity`, `Web`, `Data`, `Networking`, `Hardware`, `Tech`, or `Innovation`.
- `type`: a label for the question category. Supported display labels include `code_output`, `ai_facts`, `myth_fact`, `tech_myth`, `guess_technology`, and `cs_trivia`.
- `question`: the question text.
- `snippet` and `language`: optional. Add `snippet` for a code example; omit them for a normal question.
- `options`: four answer choices.
- `answer`: the **zero-based index** of the correct option before the game starts (0 is the first option, 1 the second, and so on).
- `explanation`: a short explanation shown after the participant answers.

Techverse randomizes both the five questions selected from the chosen level and the order of the four answer options on each attempt. It preserves the correct answer while shuffling options. Do not manually shuffle the options and change `answer` at the same time unless you intend to.

Keep at least five questions for every level. The provided bank has 15 for each level. Aim for clear, unambiguous questions and brief explanations. The selected level changes the question pool, but any level can win.

## Customize the Instagram profile

The profile link is currently:

`https://www.instagram.com/gdgoncampus_ndu.nlc?dlrf=ejlyM3B3cWZxbDY2`

To change it, update both Instagram `<a>` elements in `index.html` and the `INSTAGRAM_URL` constant near the top of `script.js`. The constant is informational/configuration only; the visible link targets live in `index.html`.

Following is never required to get results or claim a voucher. The static website cannot verify Instagram follows, and it does not pretend that it can.

## Customize the design

Open `style.css`. The main palette and general design tokens are near the top in `:root`, including `--bg`, `--cyan`, `--blue`, `--purple`, `--green`, and the border/radius variables. Adjust these for a different theme.

Headings use Space Grotesk, interface text uses Inter, and code/technical labels use DM Mono when those optional Google Fonts can load. System fallbacks are provided, so the website remains usable if the external font service is unavailable. No image API, JavaScript framework, package install, or build step is required.

## Session and privacy notes

- No account, email address, name, or phone number is requested.
- The current game state is stored in `sessionStorage` so a refresh in the same browser tab can restore the quiz or result, including the current voucher reference. It is scoped to that browser tab/session and is not sent to a server.
- The share/download scorecard does not include the voucher reference by default.
- The website does not include analytics or third-party tracking scripts.
- Instagram opens in a new tab where supported. The browser may still show an external-link confirmation depending on device settings.
- The voucher reference is not secure, centrally verified, or guaranteed unique across different devices.

## Pre-event test checklist

Run this checklist against the **published** URL as well as, optionally, by opening `index.html` in a modern browser:

- [ ] Landing page and all buttons render correctly on mobile and desktop.
- [ ] All three level cards can be selected and their selected state is visible.
- [ ] Explorer, Enthusiast, and Geek use different question pools.
- [ ] Each attempt has exactly five questions and no repeated question IDs.
- [ ] The answer-option order changes between attempts while the correct answers still validate.
- [ ] Correct answers show positive feedback; incorrect answers show the right answer and a helpful explanation.
- [ ] Score and percentage match the answers selected.
- [ ] `WINNING_SCORE = 2` produces a voucher for scores of 2–5 and no voucher for scores of 0–1.
- [ ] Each winning attempt receives a generated reference and the result survives a refresh in the same tab.
- [ ] Following the Instagram link opens the specified profile.
- [ ] The voucher can be reopened from the home screen if the participant returns home during the same session.
- [ ] Share and scorecard download work in the target phones/browsers; clipboard or text-sharing fallback is sensible.
- [ ] A reduced-motion preference disables celebratory animation.
- [ ] The page works with no tracking blockers or permissions granted; no personal data is requested.
- [ ] The printed QR code resolves to the correct published URL on both iPhone and Android.

## Known static-site limitation

GitHub Pages serves static files only. It cannot centrally reserve, validate, or redeem voucher claims, and it cannot verify that a participant followed Instagram. The site intentionally does not claim those capabilities. The recruitment team should visually inspect the voucher screen in person.
