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
      { text: "はじめに", link: "/intro/flow" },
      { text: "準備", link: "/prepare/driver-setup" },
      { text: "印刷", link: "/print/pdf-sort" },
      { text: "おわりに", link: "/outro/reset" },
    ],

    sidebar: [
      {
        text: "はじめに",
        items: [
          { text: "トップ", link: "/" },
          { text: "全体の流れ", link: "/intro/flow" },
        ],
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
          { text: "USBメモリへの保存", link: "/print/usb-save" },
          { text: "リソグラフでの製版・印刷", link: "/print/riso-print" },
        ],
      },
      {
        text: "おわりに",
        items: [{ text: "USBメモリやPCをもとに戻す", link: "/outro/reset" }],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/M-Haruki/riso-pdf-print" },
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
