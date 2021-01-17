# 目錄結構、各模組範圍及依賴關係

[1. 目錄結構、各模組範圍](#1-目錄結構各模組範圍)

[2. 依賴關係](#2-依賴關係)

---

## 1. 目錄結構、各模組範圍

  - ### 1.1. 目錄結構

    - #### app

      - #### cms app: cms 主功能

      - #### render app: 實際看到的網頁內容

    - #### library

      - #### @neux/cms-core: cms 核心功能 library

      - #### @neux/render: render 核心功能 library

        - #### common: 共通模組
        - #### data-access: 資料存取模組
        - #### public-component: ui 模組
        - #### renderer: renderer 模組
        - #### render-templates: renderer 版型模組
        - #### server-app: 啟動 render 模組



  - ### 1.2. 各模組範圍圖示

    <img src="./assets/image/folder-structure-and-dependency/folder-structure.png" style="width: 700px"/>
    <div class="text-center" style="width: 700px">【圖片】目錄結構、各模組範圍</div>
<br/>

## 2. 依賴關係

  ![depemdency](./assets/image/folder-structure-and-dependency/dependency.png)
  <div class="text-center">【圖片】依賴關係</div>
<br/>

<link rel="stylesheet" type="text/css" href="./style/style.css" />

<div class="back-to-top-wrapper">
    <a href="#目錄結構各模組範圍及依賴關係" class="back-to-top-link" aria-label="Scroll to Top">↑</a>
</div>