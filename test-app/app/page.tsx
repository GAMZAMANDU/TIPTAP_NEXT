"use client"

import { useState } from "react"
import { SimpleEditor, SimpleEditorViewer } from "@tiptap/simple-editor"
import "@tiptap/simple-editor/dist/index.css"
import type { JSONContent } from "@tiptap/core"

export default function Home() {
  const [content, setContent] = useState<JSONContent | null>(null)

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1 style={{ marginBottom: "2rem" }}>
        Simple Editor 패키지 테스트
      </h1>

      <div style={{ marginBottom: "3rem" }}>
        <h2 style={{ marginBottom: "1rem" }}>에디터</h2>
        <SimpleEditor
          onChange={(json) => {
            console.log("Content changed:", json)
            setContent(json)
          }}
        />
      </div>

      {content && (
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>뷰어 (읽기 전용)</h2>
          <SimpleEditorViewer content={content} />
        </div>
      )}
    </main>
  )
}
