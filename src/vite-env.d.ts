/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VIT_API_URL: string
    readonly VIT_GOOGLE_CLIENT_ID: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}