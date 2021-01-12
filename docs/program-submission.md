# 程式提交

[1. 前言](#1-前言)

[2. 提交流程](#2-提交流程)
  - [2.1. 新增 issues](#21-新增-issues細部說明)
  - [2.2. 創建分支](#22-創建分支細部說明)
  - [2.3. 處理 pull Request](#23-處理-pull-request細部說明)
  - [2.4. 發佈 npm](#24-發佈-npm細部說明)
  - [2.5. 發佈 npm 通知](#25-發佈-npm-通知細部說明)

[3. 提交流程細部說明](#3-提交流程細部說明)
  - [3.1. 新增 issues](#31-新增-issues)
  - [3.2. 創建分支](#32-創建分支)
  - [3.3. 處理 pull Request](#33-處理-pull-request)
  - [3.4. 發佈 npm](#34-發佈-npm)
  - [3.5. 發佈 npm 通知](#35-發佈-npm-通知)

[4. 附錄](#4-附錄)
  - [4.1. github actions 做的事情](#41-github-actions-做的事情)

## 1. 前言

  訂立從接收到 issue 到發佈過程中，各階段的注意事項。請務必遵守規範，以利程式開發者之間的快速協同開發。

<br/>

## 2. 提交流程

- ### 2.1. 新增 issues（[細部說明](#31-新增-issues)）

  - 將 mantis 或是 features 都紀錄在 github issues，以利追蹤問題修復情況

- ### 2.2. 創建分支（[細部說明](#32-創建分支)）

  - 為了將任務單一化及避免開發者提交互相影響，當要著手處理一個 issues 時就會從當前最新的程式 (dev 分支) 開一條新的分支

  - 通常一個分支僅處理一個 issues，視情況或 issues 顆粒度太小，也可以同分支一併處理多個 issues

  - 後續若審核者審核通過此分支的 pull request，便會將程式合併到 dev 並 <span style="color: red">"刪除此分支"</span>，若因為特殊原因需要保留此分支，請在分支名稱後綴帶上 no-delete

- ### 2.3. 處理 pull request（[細部說明](#33-處理-pull-request)）

  - 開發者 - 在創建的分支上提交程式後，新增一個 pull request 給審核者

  - 審核者 - 審核 pull request，若同意即把程式合併到 dev，並刪除該分支 (若分支後綴帶有 no-delete，<span style="color: red">"不要刪除"</span> 此分支)

- ### 2.4. 發佈 npm（[細部說明](#34-發佈-npm)）

  - cms 為 library 的角色，所以要定期發佈程式到 npm 上供 app 做使用

- ### 2.5. 發佈 npm 通知（[細部說明](#35-發佈-npm-通知)）

  - 當 cms 發佈程式到 npm 上時，主動通知以利 app 開發者更新 dependency，目前以 slack 當通知平台

<br/>

## 3. 提交流程細部說明

- ### 3.1. 新增 issues

  - 3.1.1. 點擊 github issues（1） ➞ New issue（2）

      ![github issues](./assets/image/program-submission/github-issues.png)
      <div class="text-center">【圖片】github issues 畫面</div>

    <br/>

  - 3.1.2. 填入相關資訊（1, 2, 3, 4） ➞ Submit new issue

      <span id="create-issues"></span>

      ![create issues](./assets/image/program-submission/create-issues.png)
      <div class="text-center">【圖片】新增 issues 畫面</div>


      ◎ 欄位說明

      |欄位|說明|
      |--|--|
      |標題 (1)|設定此 issue 的標題，說明 bug 或 feature，簡單扼要即可|
      |描述 (2)|設定此 issue 的描述，詳細說明 bug 還原步驟，有 mantis 也請附上網址（例: relative to mantis: https://mantis-url...）|
      |分配修復者 (3)|分配此 issue 的修復者 <br/> <img src="./assets/image/program-submission/issues-assignees.png" style="width: 300px"/>|
      |標籤 (4)|設定此 issue 的標籤(通常為 feature / bug / refactor) <br/> <img src="./assets/image/program-submission/issues-labels.png" style="width: 300px"/>|

      <br/>

  - 3.1.3. 預覽此次新增的 issue

      [【圖片】預覽 issues 畫面](#issues-preview) 能對應到 [【圖片】新增 issues 畫面](#create-issues) 的 1、2、3、4 欄位

      <span id="issues-preview"></span>

      ![issues preview](./assets/image/program-submission/issues-preview.png)
      <div class="text-center">【圖片】預覽 issues 畫面</div>

      ◎ 欄位說明

      |欄位|說明|
      |--|--|
      |github issue 序號（Ａ）|此為 github 自動產生的獨特序號，後續 Pull Request 需要標記設定修復哪個/些 issues，就是拿此序號作為標記|

  <br/>

- ### 3.2. 創建分支

  - 3.2.1. 從當前 dev 分支創建另一條分支做程式新增/修改/重構

    `git checkout -b <branch-name>`

    此指令相當於 `git branch <branch-name> && git checkout <branch-name>`

- ### 3.3. 處理 pull Request

    每次新增/修復/重構完成的程式，會先交由 RD Leader 檢閱並核可過該程式，才可以合併回 dev 分支，確保程式的邏輯正確及品質

  - 3.3.1. 點擊 Pull requests(1) ➞ New pull request(2)

    ![pull request](./assets/image/program-submission/pr.png)
    <div class="text-center">【圖片】pull request 畫面</div>

  <br/>

  - 3.3.2. 選取分支並點擊 Create pull request

    ![pull request branch](./assets/image/program-submission/create-pr-branch.png)
    <div class="text-center">【圖片】新增 pull request 畫面 (選取分支)</div>

    ◎ 欄位說明

    |欄位|說明|
    |--|--|
    |目標分支 (1)|設定欲合併的目標分支 (通常為 dev, 除非要發佈時會選擇 master)|
    |來源分支 (2)|設定欲合併的來源分支|
    |新增 pull request 按鈕 (3)|點擊會出現新增 pull request 畫面 (填寫詳細資訊)|

    <br/>

  - 2.3.3. 填寫相關資訊並點擊 Create pull request

      <span id="pr-detail"></span>

      ![pull request detail](./assets/image/program-submission/create-pr-detail.png)
      <div class="text-center">【圖片】新增 pull request 畫面 (填寫詳細資訊)</div>

      ◎ 欄位說明

      |欄位|說明|
      |--|--|
      |標題 (1)|設定此 pr 的標題，說明主要改動的地方|
      |描述 (2)|設定此 pr 的描述，<span style="color: red">"一定要" </span>填寫此 pr 修復哪個/些 issues（使用#&lt;pr-編號&gt;來標記，範例: #41）|
      |分配審核者 (3)|分配此 pr 的審核者 <br/> <img src="./assets/image/program-submission/pr-reviewers.png" style="width: 300px"/>|

      <br/>

  - 2.3.4. 通知審核者處理 pull request

    [【圖片】預覽 pull request 畫面](#pr-preview) 能對應到 [【圖片】新增 pull request 畫面 (填寫詳細資訊)](#pr-detail) 的 1、2、3 欄位

    <span id="pr-preview"></span>

    ![pr-preview](./assets/image/program-submission/pr-preview.png)
    <div class="text-center">【圖片】預覽 pull request 畫面</div>

    ◎ 欄位說明

    |欄位|說明|
    |--|--|
    |pr 紀錄（A）|顯示此 pr 的詳細記錄|
    |合併 pr 按鈕（B-1）|a. feature 分支 -> dev 分支: 若審核此 pr 為通過，點擊此按鈕，會將改動合併到 dev 分支，並請押上 <img src="./assets/image/program-submission/merged-dev-label.png" style="width: 100px"/> label <br/> b. dev 分支 -> master 分支: 若審核此 pr 為通過，<span style="color: red">"請先在 B-2 標註 closes #&lt;issue-number&gt;"</span>，點擊此按鈕，會將改動合併到 master 分支，github 會自動關閉被標註的 issess|
    |新增評論區塊 （B-2）|若審核此 pr 為"不"通過或是對於 pr 想做特別說明，請於此處註明原因|

  <br/>

- ### 3.4. 發佈 npm

  - 3.4.1. 更改版號(TODO 版號吃同一個地方 )

    - cms 版號: lib / render / package.json
    - render 版號: lib / cms-core / package.json

  - 3.4.2. github commit && push 觸發 github actions

    根據 commit message 決定是否發佈此程式到 npm, 發佈 next 還是 latest 版本

    ### commit message 格式

    ```
    git commit -m <msg>
    <msg> = npm-publish-next | npm-publish-latest
    ```
    <br/>

- ### 3.5. 發佈 npm 通知

    <span id="npm-publish-notification"></span>

    <img style="width: 600px" src="./assets/image/program-submission/npm-publish-notification.png">
    <div class="text-center" style="width: 600px">【圖片】發佈 npm 後 slack 通知畫面</div>

    <br/>

---

## 4. 附錄

- ### 4.1. github actions 做的事情

  1. **Setup npmrc** : 為了取得 private repo dependency access

  2. **Install Dependency** : `rm -rf ./node_nodules && npm install`

  3. **Build** :

      3.1. render : `npm run build-render-lib`

      3.2. cms : `npm run build-cms-lib`

  4. **Npm publish** :

      4.1. render : `cd ./dist/libs/render && npm publish --tag = next | latest`

      4.2. cms : `cd ./dist/libs/cms-core && npm publish --tag = next | latest`

  5. **Read npm publish 版本號碼** : 從 ./package.json 取得版本號碼

  6. **在 github 押 tag** :

      <img style="width: 600px" src="./assets/image/program-submission/npm-publish-tag.png">
      <div class="text-center" style="width: 600px">【圖片】github tags</div>

  7. **Slack notification** : 發佈通知, 提醒大家更新 dependency

      同 [【圖片】發佈 npm 後 slack 通知畫面](#npm-publish-notification)

<link rel="stylesheet" type="text/css" href="./style/style.css" />

<div class="back-to-top-wrapper">
    <a href="#程式提交" class="back-to-top-link" aria-label="Scroll to Top">↑</a>
</div>