import path from 'path';
import dotenv from 'dotenv';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { HNSWLib } from "langchain/vectorstores/hnswlib";


// .envファイルから環境変数を読み込み
dotenv.config();


const main = async function () {
  console.log("start");

  // 自前で準備したドキュメントを保存しているディレクトリの絶対パス
  const documentPath = path.join(__dirname, '../documents/');

  const directoryLoader = new DirectoryLoader(documentPath, {
    '.txt': (path) => {
      return new TextLoader(path)
    }
  });
  const documents = await directoryLoader.load();

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,
    chunkOverlap: 10,
  });

  const texts = await splitter.splitDocuments(documents);
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  const vectorStore = await HNSWLib.fromDocuments(texts, embeddings);

  const databasePath = path.join(__dirname, '../database/');
  await vectorStore.save(databasePath);

  console.log("end");
};

main();
