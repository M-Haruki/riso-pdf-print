<script setup lang="ts">
  import PdfSorter from "./pdf-sort/PdfSorter.vue"
</script>

# PDFの並び替え・分割

::: tip
ここからの手順は、印刷したいPDFごとに行う必要があります。
:::

PDFをリソグラフで印刷する際には、正しく印刷するためにPDF並び替えが必要な場合があります。  
ここでは、いくつかの自動並び替えツールを提供します。  
印刷に必須の手順ではないので、必要に応じて利用してください。

## PDF自動並び替えツール

ファイルを選択後、モードをクリックして並び替え・ダウンロードできます。  
並び替えの都合上、ページ数が4の倍数でない場合は自動的に白紙が挿入されます。
<PdfSorter />

## その他のPDF編集

PDFの結合、分割、手動並び替え等に使えるツールを紹介します。

### CubePDF Utility

PCで使えるPDFの手動並び替え、分割ツールです。 
PDFファイルを開いて並び替えやページの削除ができます。  
下記リンクからダウンロード・インストールできます。  
[CubePDF Utility](https://www.cube-soft.jp/cubepdfutility/)

### CubePDF Page

PCで使えるPDFの結合ツールです。  
複数のPDFファイルをドラッグ&ドロップすることで、1つのPDFフォルダにまとめられます。  
下記リンクからダウンロード・インストールできます。  
[CubePDF Page](https://www.cube-soft.jp/cubepdfpage/)

### BentoPDF(PDF Multi Tool)

ブラウザ上で使えるPDFの手動並び替え、分割ツールです。  
PDFファイルを開いて並び替えやページの削除ができます。  
下記リンクから利用できます。  
[BentoPDF PDF Multi Tool](https://bentopdf.com/pdf-multi-tool.html)
