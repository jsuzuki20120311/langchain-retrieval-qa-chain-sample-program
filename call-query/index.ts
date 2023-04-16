import path from 'path';
import dotenv from 'dotenv';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { OpenAI } from "langchain/llms/openai";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";


// .envファイルから環境変数を読み込み
dotenv.config();


const main = async function () {
  // 実行時引数が指定されているか確認
  if (process.argv.length < 3) {
    return;
  }

  const databasePath = path.join(__dirname, '../database/');
  const embeddings = new OpenAIEmbeddings();

  // 保存済のベクターストアから読み込み
  const vectorStore = await HNSWLib.load(databasePath, embeddings);

  const model = new OpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY
  });
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());

  // 実行時引数から質問内容を取得
  const query = process.argv[2];

  const { text } = await chain.call({ 
    query
  });

  // 質問内容と回答内容をコンソールに表示
  console.log(`Q: ${ query }\nA: ${ text }`);

};

main();
