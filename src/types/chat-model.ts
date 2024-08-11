const GroqModelIdList = [
  "llama3-70b-8192",
  "llama3-8b-8192",
  "mixtral-8x7b-32768",
  "gemma-7b-it",
] as const;

type GroqModelId = (typeof GroqModelIdList)[number];

const GroqModelId2Name: Record<GroqModelId, string> = {
  "llama3-70b-8192": "Llama-3 70B",
  "llama3-8b-8192": "Llama-3 8B",
  "mixtral-8x7b-32768": "Mistral 8x7B",
  "gemma-7b-it": "Gemma 7B",
};

const OllamaModelIdList = [
  "llama3.1:8b-instruct-q8_0",
  "gemma2:9b-instruct-q8_0",
] as const;

type OllamaModelId = (typeof OllamaModelIdList)[number];

const OllamaModelId2Name: Record<OllamaModelId, string> = {
  "llama3.1:8b-instruct-q8_0": "Llama-3.1 8B",
  "gemma2:9b-instruct-q8_0": "Gemma-2 9B",
};

export const ChatModelIdList = [...OllamaModelIdList] as const;
export type ChatModelId = (typeof ChatModelIdList)[number];
export const ChatModelId2Name: Record<ChatModelId, string> = {
  ...OllamaModelId2Name,
};
