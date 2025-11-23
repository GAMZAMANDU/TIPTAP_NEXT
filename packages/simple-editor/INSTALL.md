# Installation Guide

## GitHub에서 직접 설치하기

이 패키지는 GitHub 저장소에서 직접 설치할 수 있습니다.

### npm 사용

```bash
npm install git+https://github.com/your-username/tiptap.git#packages/simple-editor
```

### yarn 사용

```bash
yarn add git+https://github.com/your-username/tiptap.git#packages/simple-editor
```

### pnpm 사용

```bash
pnpm add git+https://github.com/your-username/tiptap.git#packages/simple-editor
```

## package.json에 직접 추가

```json
{
  "dependencies": {
    "@tiptap/simple-editor": "git+https://github.com/your-username/tiptap.git#packages/simple-editor"
  }
}
```

## 특정 브랜치나 태그 사용

```bash
# 특정 브랜치
npm install git+https://github.com/your-username/tiptap.git#branch-name:packages/simple-editor

# 특정 태그
npm install git+https://github.com/your-username/tiptap.git#v1.0.0:packages/simple-editor
```

## 주의사항

1. GitHub 저장소가 private인 경우, GitHub Personal Access Token이 필요할 수 있습니다.
2. 설치 후 `npm run build`를 실행하여 패키지를 빌드해야 할 수 있습니다.
3. 필요한 스타일 파일을 import하는 것을 잊지 마세요:
   ```tsx
   import "@tiptap/simple-editor/dist/style.css"
   ```

