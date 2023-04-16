# LangChainのRetrievalQAChainを使ったサンプルプログラム

## 概要

LangChainのLangChainのRetrievalQAChainを使って、自前のドキュメントに関する質問の回答を得るためのサンプルプログラムです。

このプログラムでは、documentsディレクトリに保存しているテキストドキュメントに関する回答をするプログラムです。

このリポジトリのducumentsディレクトリには、架空の設定の社内用語や架空のシステムに関する説明文が保存してあります。このドキュメントはBingのAIに書いてもらいました。

## Node.jsのバージョン

18.14.2

## 動作確認手順

### Opena AIのAPIキーの設定

以下の２箇所に .env ファイルを作成し以下の内容を記載します。

* <プロジェクトディレクトリ>/call-query/.env

* <プロジェクトディレクトリ>/create-vectore-store/.env

内容

```env
OPENAI_API_KEY="<API KEYの文字列>"
```

### ライブラリのインストール

```shell
$ cd <プロジェクトディレクトリ>/call-query/
$ npm ci

$ cd <プロジェクトディレクトリ>/create-vectore-store/
$ npm ci
```

### ベクターストアの作成

```shell
$ cd <プロジェクトディレクトリ>/create-vectore-store/
$ npm run start
```

### 質問をする

```shell
$ cd <プロジェクトディレクトリ>/create-vectore-store/
$ npm run start --query=<質問>
```

例1）

```shell
$ cd <プロジェクトディレクトリ>/create-vectore-store/
$ npm run start --query=なんすか、SHAZOって。

# 実行結果
# Q: なんすか、SHAZOって。
# A:  SHAZOは、会計管理アプリケーション（SHAZO 経理）、グループチャットやビデオ通話（SHAZO Chat）、ドキュメント作成アプリケーション（SHAZO Docs）などのアプリケーションを提供する企業です。
```

例2）

```shell
$ cd <プロジェクトディレクトリ>/create-vectore-store/
$ npm run start --query=上司から昨日「てめぇのプロジェクトマグロじゃねえか！」と怒られました 。どういうことですか？

# 実行結果
# Q: 上司から昨日「てめぇのプロジェクトマグロじゃねえか！」と怒られました。どういうことですか？
# A:  おそらく動かないプロジェクトの状況を指していると思われます。
```

例3）

documentsフォルダ内のテキストに記載が無い内容についての質問

```shell
$ cd <プロジェクトディレクトリ>/create-vectore-store/
$ npm run start --query=ガンダムエアリアルって何ですか？

# 実行結果
# Q: ガンダムエアリアルって何ですか？
# A:  申し訳ございませんが、私はわかりません。
```
