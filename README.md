# UI Scaffold Kit

An AI-powered project scaffolding tool that generates **frontend architecture previews instantly** and allows **on-demand, per-file content generation** with full **partial recovery** and **rate-limit safety**.

This project is designed to work reliably even under strict AI quotas by separating **architecture planning** from **file content generation**.

---

## ✨ Key Features

* ⚡ **Instant Architecture Preview**
* 🧠 **AI-generated file plan (paths only)**
* 📄 **On-demand per-file content generation**
* 🔁 **Retry failed files individually**
* 🛡️ **Streaming-safe & partial recovery**
* 📦 **Download complete project as ZIP**
* 🚫 **No monolithic AI responses**
* 🔌 Supports **Gemini** and **ChatGPT**

---

## 🧩 Why This Architecture?

Large AI responses are:

* Slow
* Fragile
* Rate-limit prone
* Hard to recover when partially failing

This system solves that by:

1. **Generating only file paths first**
2. **Generating file contents only when needed**
3. **Allowing retries per file**
4. **Never blocking the entire job due to one failure**

---

## 🏗️ High-Level Flow

```text
User clicks Generate
        ↓
AI generates file plan (paths only)
        ↓
Architecture preview rendered instantly
        ↓
Files marked as TODO placeholders
        ↓
User generates files individually (on-demand)
        ↓
Completed project downloaded as ZIP
```

---

## 📂 Project Structure (Generated Output)

```txt
src/
  app/
  features/
  components/
  hooks/
  utils/
  styles/
  store/
  types/
  config/
```

Files are grouped **by feature/domain**, not by file type.

---

## 🧠 AI Generation Strategy

### 1️⃣ File Plan Generation

The AI generates **ONLY file paths**.

```json
[
  "src/main.tsx",
  "src/App.tsx",
  "src/features/auth/pages/LoginPage.tsx"
]
```

✔ Fast
✔ Cheap
✔ Reliable
✔ Retry-safe

---

### 2️⃣ File Content Generation (On-Demand)

Each file can be generated **individually**:

```ts
POST /api/generate/file
{
  "path": "src/features/auth/pages/LoginPage.tsx"
}
```

✔ Minimal scaffolding
✔ TODO comments
✔ Safe retries
✔ No global failure

---

### 3️⃣ Partial Recovery

If AI fails:

* Other files still succeed
* Placeholder content is used
* User can retry later

Example fallback:

```ts
// TODO: Implement src/features/auth/pages/LoginPage.tsx
```

---

## 🔌 API Routes

### `POST /api/generate`

Generates the **architecture plan** and initializes a job.

#### Request

```json
{
  "framework": { "id": "react" },
  "description": "Admin dashboard for fintech app"
}
```

#### Response

```json
{
  "jobId": "uuid",
  "files": [
    { "path": "src/App.tsx", "content": "// TODO..." }
  ]
}
```

---

### `POST /api/generate/file`

Generates content for **a single file**.

#### Request

```json
{
  "path": "src/App.tsx"
}
```

#### Response

```json
{
  "content": "export default function App() { ... }"
}
```

---

### `GET /api/generate?id=JOB_ID`

* ⏳ Returns progress if job is still running
* 📦 Streams ZIP if job is complete

#### ZIP Download Headers

```
Content-Type: application/zip
Content-Disposition: attachment
```

---

## 📦 ZIP Download Behavior

The ZIP includes:

* Static framework files
* AI-generated files
* TODO placeholders for unfinished files

The ZIP is **always valid**, even if generation was partial.

---

## 🧠 Prompt Design Philosophy

### File Plan Prompt

* JSON array only
* No markdown
* No explanations
* Paths only

### File Content Prompt

* Minimal scaffolding
* TODO comments
* Valid syntax
* One file or small batches only

This prevents:

* Token overflow
* JSON corruption
* Timeout failures

---

## 🛡️ Rate Limit Protection

* IP-based rate limiting
* Per-file generation limits
* Automatic fallback to TODO content
* Graceful error handling

Example error handled safely:

```
429 Too Many Requests
```

---

## 🧪 Error Handling Strategy

| Scenario           | Behavior              |
| ------------------ | --------------------- |
| AI timeout         | File marked failed    |
| Rate limit         | Retry allowed         |
| Invalid JSON       | Safe parse + fallback |
| Partial generation | Still downloadable    |

---

## 🧑‍💻 Developer Experience

* Zustand state management
* Framer Motion UI animations
* Tree-based architecture preview
* Clear per-file generation status
* Toast notifications

---

## 🚀 Future Improvements

* Streaming file generation
* Folder-level generation
* File diff regeneration
* AI model switching per file
* Resume interrupted jobs
* Cached AI responses

---

## 📜 License

MIT

---

## 🤝 Contributing

PRs welcome.
This architecture is intentionally modular and extensible.

---

## 🧠 Final Note

This system is designed the same way **large-scale AI developer tools** work internally:

> *Plan first. Generate later. Recover always.*