# Email Notifications Setup (EmailJS)

The contact form on this portfolio uses **EmailJS** to deliver real
notifications to your Gmail inbox whenever someone hits *transmit*.

EmailJS is **free** for up to 200 emails / month — no credit card, no
backend, perfect for static GitHub Pages hosting.

---

## 1 · Create an EmailJS account

1. Go to <https://www.emailjs.com/> and sign up (use your Gmail).
2. Verify your email.

---

## 2 · Connect your Gmail as the email service

1. In the EmailJS dashboard go to **Email Services** → **Add New Service**.
2. Pick **Gmail** and click **Connect Account**.
3. Authorize EmailJS to send mail on your behalf.
4. Copy the generated **Service ID** (looks like `service_xxxxxxx`).
   → This is `NEXT_PUBLIC_EMAILJS_SERVICE_ID`.

---

## 3 · Create an email template

1. Go to **Email Templates** → **Create New Template**.
2. Set the template content roughly like this:

```
Subject: {{subject}}

You have a new message from your portfolio:

  Name : {{from_name}}
  Email: {{from_email}}
  Time : {{time}}

  Message:
  --------
  {{message}}

Reply directly to this email to respond.
```

3. Set the **To email** field to: `chanvithapraween@gmail.com`
4. Set the **Reply To** field to: `{{reply_to}}`
5. Save and copy the **Template ID** (looks like `template_xxxxxxx`).
   → This is `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`.

The template variables already wired by the contact form are:
`from_name`, `from_email`, `message`, `subject`, `time`, `reply_to`,
`to_email`.

---

## 4 · Grab your Public Key

1. Go to **Account** → **General**.
2. Copy your **Public Key** (looks like `xxxxxxxxxxxxxxxx`).
   → This is `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`.

---

## 5 · Configure local development

Create a file named `.env.local` in the project root:

```bash
cp .env.example .env.local
```

Then open `.env.local` and paste your three values:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_xxxxxxx
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xxxxxxx
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxx
```

Restart the dev server and try the contact form. You should see a
**[ ✓ packet dispatched ]** confirmation and the email lands in your
inbox within a few seconds.

> If you see a yellow ⚠ banner saying "EmailJS not configured" the form
> falls back to a `mailto:` link automatically.

---

## 6 · Configure GitHub Pages deployment

Because this is a static site, the values are baked into the build at
build time. Add them as **GitHub Actions secrets**:

1. Go to your repo → **Settings** → **Secrets and variables** →
   **Actions** → **New repository secret**.
2. Add three secrets with the same names as above:
   - `NEXT_PUBLIC_EMAILJS_SERVICE_ID`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`
   - `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`

3. Open `.github/workflows/nextjs.yml` and add the env block to the
   *Build with Next.js* step (already done if you cloned this template
   recently — otherwise replace the existing build step with this):

```yaml
      - name: Build with Next.js
        env:
          NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_SERVICE_ID }}
          NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID }}
          NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }}
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
```

Push to `main`, the workflow runs, and the live site is wired up.

---

## Security notes

- The `NEXT_PUBLIC_*` prefix means these values are *embedded into the
  client bundle*. EmailJS' "Public Key" is **designed to be public** —
  it identifies your account but cannot send mail without a matching
  template + service. Don't worry, no secret is leaking.
- For extra safety, in your EmailJS dashboard go to **Account → Security**
  and **enable "Allowed Domains"**. Add `chanvithapraveen.github.io`
  (and `localhost` for dev). This blocks anyone who copies your public
  key from another origin.
- Enable EmailJS **reCAPTCHA** on the template page if you start getting
  spam.

---

## Free tier limits

- **200 emails / month** — resets monthly.
- **2 services**, **2 templates**.
- Upgrades start around $7/mo if you ever need more.
