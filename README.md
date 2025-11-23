# Tiptap Simple Editor

Tiptap 기반의 풍부한 기능을 제공하는 Rich Text Editor 패키지입니다.

## 특징

✨ **풍부한 편집 기능**
- 텍스트 포맷팅 (Bold, Italic, Underline, Strike, Code, etc.)
- 헤딩 (H1~H4), 리스트 (Bullet, Ordered, Task)
- 인용구, 코드 블록 (구문 강조 포함)
- 텍스트 정렬, 색상 및 하이라이트

🎨 **미디어 임베드**
- 이미지 업로드 및 관리
- YouTube 비디오 임베드
- Figma 디자인 임베드

🌙 **다크 모드 지원**
- 라이트/다크 테마 자동 전환
- localStorage 기반 설정 저장

📱 **반응형 디자인**
- 모바일 최적화 UI
- 터치 친화적 인터페이스

## 설치

### GitHub에서 설치

```bash
npm install git+https://github.com/GAMZAMANDU/TIPTAP_NEXT.git
```

## 사용법

### 기본 에디터

```tsx
import { SimpleEditor } from '@tiptap/simple-editor'
import '@tiptap/simple-editor/dist/index.css'

function MyEditor() {
  const handleChange = (json) => {
    console.log('Content changed:', json)
  }

  return (
    <SimpleEditor
      initialContent={yourContent}
      onChange={handleChange}
    />
  )
}
```

### 읽기 전용 뷰어

```tsx
import { SimpleEditorViewer } from '@tiptap/simple-editor'
import '@tiptap/simple-editor/dist/index.css'

function MyViewer() {
  return (
    <SimpleEditorViewer
      content={savedContent}
    />
  )
}
```

### 커스텀 이미지 업로드

```tsx
import { SimpleEditor } from '@tiptap/simple-editor'

function MyEditor() {
  const handleImageUpload = async (file: File): Promise<string> => {
    // 이미지를 서버에 업로드하고 URL 반환
    const formData = new FormData()
    formData.append('image', file)

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const { url } = await response.json()
    return url
  }

  return (
    <SimpleEditor
      imageUploadHandler={handleImageUpload}
    />
  )
}
```

## 프로젝트 구조

```
tiptap/
├── demo/                  # Next.js 데모 앱
│   ├── app/
│   ├── components/
│   └── package.json
├── packages/
│   └── simple-editor/     # npm 패키지
│       ├── src/           # 소스 코드
│       ├── dist/          # 빌드된 파일
│       └── package.json
└── package.json           # Workspace 루트
```

## 개발

### 데모 앱 실행

```bash
npm run dev
# 또는
cd demo && npm run dev
```

### 패키지 빌드

```bash
npm run build:package
```

패키지를 수정한 후에는 반드시 빌드하고 커밋해야 합니다:

```bash
npm run build:package
git add packages/simple-editor/dist
git commit -m "build: 패키지 재빌드"
git push
```

## API

### SimpleEditor Props

| Prop | Type | 설명 |
|------|------|------|
| `initialContent` | `JSONContent` | 초기 에디터 콘텐츠 (선택) |
| `onChange` | `(json: JSONContent) => void` | 콘텐츠 변경 시 호출 (선택) |
| `onUpdate` | `(data: { html: string, json: JSONContent }) => void` | HTML과 JSON 모두 받는 콜백 (선택) |
| `imageUploadHandler` | `(file: File) => Promise<string>` | 커스텀 이미지 업로드 핸들러 (선택) |

### SimpleEditorViewer Props

| Prop | Type | 설명 |
|------|------|------|
| `content` | `JSONContent` | 표시할 콘텐츠 (필수) |
| `className` | `string` | 추가 CSS 클래스 (선택) |

## 라이선스

MIT

