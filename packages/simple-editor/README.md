# @tiptap/simple-editor

A rich text editor built with Tiptap, featuring YouTube and Figma embeds, syntax highlighting, and a comprehensive toolbar.

## Installation

### From GitHub

GitHub 저장소에서 직접 설치할 수 있습니다. `your-username`과 `tiptap`을 실제 GitHub 사용자명과 저장소명으로 변경하세요.

```bash
# Using npm
npm install git+https://github.com/your-username/tiptap.git#packages/simple-editor

# Using yarn
yarn add git+https://github.com/your-username/tiptap.git#packages/simple-editor

# Using pnpm
pnpm add git+https://github.com/your-username/tiptap.git#packages/simple-editor
```

**package.json에 직접 추가:**

```json
{
  "dependencies": {
    "@tiptap/simple-editor": "git+https://github.com/your-username/tiptap.git#packages/simple-editor"
  }
}
```

**특정 브랜치나 태그 사용:**

```bash
# 특정 브랜치
npm install git+https://github.com/your-username/tiptap.git#branch-name:packages/simple-editor

# 특정 태그
npm install git+https://github.com/your-username/tiptap.git#v1.0.0:packages/simple-editor
```

### From npm (if published)

```bash
npm install @tiptap/simple-editor
# or
yarn add @tiptap/simple-editor
# or
pnpm add @tiptap/simple-editor
```

## Usage

### Basic Editor

```tsx
import { SimpleEditor } from "@tiptap/simple-editor"
import "@tiptap/simple-editor/dist/style.css"

function App() {
  return <SimpleEditor />
}
```

### With Initial Content

```tsx
import { SimpleEditor, type SimpleEditorRef } from "@tiptap/simple-editor"
import { useRef } from "react"

function App() {
  const editorRef = useRef<SimpleEditorRef>(null)
  
  const initialContent = {
    type: "doc",
    content: [
      {
        type: "paragraph",
        content: [
          {
            type: "text",
            text: "Hello, World!",
          },
        ],
      },
    ],
  }

  return (
    <SimpleEditor
      ref={editorRef}
      initialContent={initialContent}
      onChange={(json) => {
        console.log("Content changed:", json)
      }}
      onUpdate={({ html, json }) => {
        console.log("HTML:", html)
        console.log("JSON:", json)
      }}
    />
  )
}
```

### Get Editor Data

```tsx
import { SimpleEditor, type SimpleEditorRef } from "@tiptap/simple-editor"
import { useRef } from "react"

function App() {
  const editorRef = useRef<SimpleEditorRef>(null)

  const handleSave = () => {
    if (editorRef.current) {
      const { html, json } = editorRef.current.getData()
      // Save to your backend
      console.log("HTML:", html)
      console.log("JSON:", json)
    }
  }

  return (
    <>
      <SimpleEditor ref={editorRef} />
      <button onClick={handleSave}>Save</button>
    </>
  )
}
```

### Static Viewer

```tsx
import { SimpleEditorViewer } from "@tiptap/simple-editor"
import "@tiptap/simple-editor/dist/style.css"

function App() {
  const content = {
    type: "doc",
    content: [
      // ... your content
    ],
  }

  return <SimpleEditorViewer content={content} />
}
```

### Custom Image Upload Handler

```tsx
import { SimpleEditor } from "@tiptap/simple-editor"

function App() {
  const handleImageUpload = async (
    file: File,
    onProgress?: (event: { progress: number }) => void,
    abortSignal?: AbortSignal
  ): Promise<string> => {
    // Your upload logic here
    const formData = new FormData()
    formData.append("image", file)

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
      signal: abortSignal,
    })

    const data = await response.json()
    return data.url
  }

  return <SimpleEditor imageUploadHandler={handleImageUpload} />
}
```

## API

### SimpleEditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `JSONContent` | `undefined` | Initial editor content (JSON format) |
| `onChange` | `(content: JSONContent) => void` | `undefined` | Callback when content changes |
| `onUpdate` | `({ html: string, json: JSONContent }) => void` | `undefined` | Callback when content updates (provides both HTML and JSON) |
| `imageUploadHandler` | `ImageUploadHandler` | `undefined` | Custom image upload handler |

### SimpleEditorRef Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `getData()` | `{ html: string, json: JSONContent }` | Get current editor content |

### SimpleEditorViewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `JSONContent` | **required** | Content to display (JSON format) |
| `className` | `string` | `""` | Additional CSS class name |

## Features

- Rich text editing with Tiptap
- YouTube embed support
- Figma embed support
- Syntax highlighting for code blocks
- Image upload support
- Dark/Light theme toggle
- Responsive design
- Static rendering support (SSR compatible)

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Watch mode
npm run dev
```

## License

MIT
