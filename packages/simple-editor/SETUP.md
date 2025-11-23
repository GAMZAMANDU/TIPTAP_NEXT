# 패키지 설정 가이드

## GitHub 저장소 설정

1. **package.json의 repository 필드 업데이트**

   `packages/simple-editor/package.json` 파일에서 `your-username`을 실제 GitHub 사용자명으로 변경하세요:

   ```json
   {
     "repository": {
       "type": "git",
       "url": "git+https://github.com/YOUR-USERNAME/tiptap.git",
       "directory": "packages/simple-editor"
     }
   }
   ```

2. **README.md 업데이트**

   `packages/simple-editor/README.md` 파일에서도 `your-username`을 실제 GitHub 사용자명으로 변경하세요.

## 패키지 구조

```
packages/simple-editor/
├── package.json          # 패키지 설정
├── tsconfig.json         # TypeScript 설정
├── tsup.config.ts        # 빌드 설정
├── README.md             # 사용 가이드
├── INSTALL.md            # 설치 가이드
├── SETUP.md              # 이 파일
├── .npmignore            # npm 배포 시 제외할 파일
├── .gitignore            # Git 제외 파일
└── src/                  # 소스 코드 (별도로 복사 필요)
    ├── index.ts
    ├── simple-editor.tsx
    ├── simple-editor-viewer.tsx
    ├── types.ts
    ├── utils/
    │   └── extensions.ts
    └── ...
```

## 소스 코드 준비

현재 소스 코드는 `my-app/components/tiptap-templates/simple/`에 있습니다.

패키지로 배포하려면:
1. 소스 코드를 `packages/simple-editor/src/`로 복사
2. 모든 `@/` 경로를 상대 경로로 변경
3. 의존성 컴포넌트들도 함께 포함

## 빌드

```bash
cd packages/simple-editor
npm install
npm run build
```

## 배포

### GitHub에서 직접 설치

다른 프로젝트에서 사용하려면:

```bash
npm install git+https://github.com/YOUR-USERNAME/tiptap.git#packages/simple-editor
```

### npm에 배포 (선택사항)

```bash
cd packages/simple-editor
npm login
npm publish
```

