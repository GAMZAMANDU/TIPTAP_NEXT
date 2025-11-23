# Tiptap Simple Editor Workspace

Tiptap 기반의 Simple Editor 프로젝트 워크스페이스입니다.

## 구조

```
tiptap/
├── demo/                  # Next.js 데모 앱
│   ├── app/
│   ├── components/
│   │   └── tiptap-templates/simple/  # SimpleEditor 소스
│   ├── hooks/
│   ├── lib/
│   └── package.json
├── packages/
│   └── simple-editor/     # npm 패키지
│       ├── src/           # 소스 코드
│       ├── package.json
│       └── ...
└── package.json           # Workspace 루트
```

## 시작하기

### 데모 앱 실행

```bash
npm run dev
# 또는
cd demo && npm run dev
```

### 패키지 빌드

```bash
npm run build:package
# 또는
cd packages/simple-editor && npm run build
```

## 패키지 설치

다른 프로젝트에서 SimpleEditor를 설치하려면:

```bash
npm install git+https://github.com/your-username/tiptap.git#packages/simple-editor
```

자세한 내용은 `packages/simple-editor/README.md`를 참고하세요.

