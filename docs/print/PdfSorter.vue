<template>
  <h3>ファイルを選択</h3>
  <input ref="fileInput" type="file" id="input" accept=".pdf">
  <h3>モード選択</h3>
  <div class="buttons">
    <div @click="run('hisho1')" class="button">
      <span class="name">飛翔1</span>
      <span class="desc">冊子用に4ページごとに並び替える。2ページを1面に印刷する想定。</span>
      <img src="./sort-sort1.svg" alt="sort1" class="image">
    </div>
    <div @click="run('hisho2')" class="button">
      <span class="name">飛翔2</span>
      <span class="desc">冊子用に4ページごとに並び替え、表・裏の2つのPDFに分ける。2ページを1面にリソ2台で印刷する想定。</span>
      <img src="./sort-sort2.svg" alt="sort2" class="image">
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { PDFDocument } from 'pdf-lib'

type Mode = "hisho1" | "hisho2";
const fileInput = ref<HTMLInputElement | null>(null);

async function run(mode: Mode) {
  const selectedFile = fileInput.value?.files?.[0]
  if (!selectedFile) {
    alert("ファイルを選択してください。");
    return
  }
  // PDFを読み込む
  const pdfBytes = await selectedFile.arrayBuffer()
  const pdfDoc = await PDFDocument.load(pdfBytes);
  fixPage(pdfDoc, 4);

  if (mode === 'hisho1') {
    // 4ページずつ処理 [A,B,C,D] -> [A,D,C,B]
    const sortedIndex = [];
    for (let i = 0; i < pdfDoc.getPageCount() / 4; i++) {
      sortedIndex.push(i * 4, i * 4 + 3, i * 4 + 2, i * 4 + 1);
    }
    const newPdfBytes = await sortPage(pdfDoc, sortedIndex);
    downloadPdf(newPdfBytes, addFileName(selectedFile.name, '_sorted'));
  }
  if (mode === 'hisho2') {
    // 4ページずつ処理 [A,B,C,D] -> [A,D],[C,B]
    const sortedIndexA = [];
    const sortedIndexB = [];
    for (let i = 0; i < pdfDoc.getPageCount() / 4; i++) {
      sortedIndexA.push(i * 4, i * 4 + 3);
      sortedIndexB.push(i * 4 + 2, i * 4 + 1);
    }
    const newPdfBytesA = await sortPage(pdfDoc, sortedIndexA);
    const newPdfBytesB = await sortPage(pdfDoc, sortedIndexB);
    downloadPdf(newPdfBytesA, addFileName(selectedFile.name, '_sorted_a'));
    downloadPdf(newPdfBytesB, addFileName(selectedFile.name, '_sorted_b'));
  }
  fileInput.value!.value = "";
}

function fixPage(pdfDoc: PDFDocument, multiple: number) {
  // 空白のページを追加して、ページ数をmultipleの倍数にする
  const base = pdfDoc.getPage(0);
  const { width, height } = base.getSize();
  while (pdfDoc.getPageCount() % multiple !== 0) {
    pdfDoc.addPage([width, height]);
  }
}

async function sortPage(pdfDoc: PDFDocument, sortedIndex: number[]) {
  // 新しいPDFを作成して、ページを追加
  const newPdfDoc = await PDFDocument.create();
  const sortedPages = await newPdfDoc.copyPages(pdfDoc, sortedIndex);
  sortedPages.forEach((page) => newPdfDoc.addPage(page));
  const newPdfBytes = await newPdfDoc.save();
  return newPdfBytes;
}

function addFileName(fileName: string, addText: string) {
  const dotIndex = fileName.lastIndexOf(".");
  if (dotIndex === -1) {
    return fileName + addText;
  } else {
    return fileName.slice(0, dotIndex) + addText + fileName.slice(dotIndex);
  }
}

function downloadPdf(pdfBytes: Uint8Array | ArrayBuffer, fileName: string) {
  const normalizedBytes = new Uint8Array(pdfBytes);
  const blob = new Blob([normalizedBytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.button {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 16px;
  cursor: pointer;
}

.button:hover {
  background-color: #f0f0f0;
}

.name {
  font-weight: bold;
  font-size: 18px;
}

.desc {
  font-size: 14px;
  color: #666;
  margin-top: 4px;
  text-align: center;
}

.image {
  width: 100%;
  max-width: 400px;
  margin-top: 8px;
}
</style>