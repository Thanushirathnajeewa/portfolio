# Personal Portfolio Website — Starter Project

This is a complete, working starter for the ITC 3179 portfolio assignment. It's
built with plain **HTML, CSS, and JavaScript** (no build tools needed) and covers
every required section: Home, About Me, Skills, Projects, and Contact.

## 1. What to edit before submitting

| File | Replace |
|---|---|
| `index.html` | Your name, branding statement, headline text |
| `about.html` | Your real biography, education timeline, interests, qualifications |
| `skills.html` | Your actual skill levels, soft skills, tools |
| `projects.html` | At least 3 of your **own** real projects, with real links |
| `contact.html` | Your real email, phone, LinkedIn, GitHub links |
| `assets/img/profile.svg` | Replace with your own photo (e.g. `profile.jpg`) and update the `<img src>` in `index.html` |
| `assets/cv/Your_Name_CV.pdf` | Replace with your real CV, same filename (or update the `href` in `index.html`/`about.html`) |

Search every HTML file for the word **"Your"** / **"your.email"** / **"#"** links
to find every placeholder that needs replacing.

## 2. Run it locally

No installation required — just open `index.html` in a browser. For live-reload
while editing, you can optionally use the VS Code "Live Server" extension.

## 3. Host it for free (required by the assignment)

**Option A — GitHub Pages (recommended)**
1. Create a new GitHub repository (e.g. `my-portfolio`).
2. Push all these files to the repository (`main` branch), keeping this folder
   structure.
3. Go to **Settings → Pages** in the repo, set Source to `main` branch, `/root`.
4. Your live URL will be `https://your-username.github.io/my-portfolio/`.

**Option B — Netlify**
1. Go to [netlify.com](https://www.netlify.com) → "Add new site" → "Deploy manually".
2. Drag the whole project folder into the upload area.
3. Netlify gives you a live URL instantly.

**Option C — Vercel**
1. Push the project to a GitHub repo.
2. Import the repo at [vercel.com](https://www.vercel.com) → deploy with default settings.

## 4. Contact form note

The form on `contact.html` validates input and shows a confirmation message, but
it does **not** send real emails on its own (plain static sites can't send email).
To make it fully functional, connect it to a free form backend such as
[Formspree](https://formspree.io) or [Netlify Forms](https://docs.netlify.com/forms/setup/) —
both take about 5 minutes to wire up, and are explained in the comment inside
`js/script.js`.

## 5. Accessibility & responsiveness already included

- Semantic HTML structure, one `<h1>` per page
- Visible keyboard focus outlines
- Respects `prefers-reduced-motion`
- Mobile nav menu below 760px width
- Responsive grid layouts down to small phone widths

## 6. Submission checklist

- [ ] Replace all placeholder content with your real information
- [ ] Replace the profile photo and CV
- [ ] Test every link, the mobile menu, and the contact form
- [ ] Deploy and copy the live URL
- [ ] Push source code to GitHub (or zip it)
- [ ] Write your 1–2 page report (see `report-template.md`) covering your design
      approach and technologies used
