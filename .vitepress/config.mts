import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "docs",

  title: "Riso PDF Print",
  description: "リソグラフでPDFから直接印刷するための方法とツール群",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "トップ", link: "/" },
      { text: "全体の流れ", link: "/intro/flow" },
      { text: "準備", link: "/prepare/driver-setup" },
      { text: "印刷", link: "/print/pdf-sort" },
    ],

    sidebar: [
      {
        text: "Examples",
        items: [
          { text: "Markdown Examples", link: "/markdown-examples" },
          { text: "Runtime API Examples", link: "/api-examples" },
        ],
      },
      {
        text: "はじめに",
        items: [{ text: "全体の流れ", link: "/intro/flow" }],
      },
      {
        text: "準備",
        items: [
          {
            text: "ドライバ・ツールのインストール",
            link: "/prepare/driver-setup",
          },
          { text: "USBメモリの準備", link: "/prepare/usb-setup" },
        ],
      },
      {
        text: "印刷",
        items: [
          { text: "PDFの並び替え・分割", link: "/print/pdf-sort" },
          { text: "USBメモリへのデータ注入", link: "/print/usb-inject" },
          { text: "リソグラフでの製版・印刷", link: "/print/riso-print" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
  vite: {
    server: {
      hmr: {
        clientPort: 5173,
      },
      watch: {
        usePolling: true,
      },
    },
  },
  base: "/riso-pdf-print/",
});
