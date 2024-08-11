from typing import Iterator, Literal

import ollama
from ollama._types import Message
from pydantic import BaseModel, Field

ModelType = Literal["llama3.1:8b-instruct-q8_0", "gemma2:9b-instruct-q8_0"]


class Request(BaseModel):
    messages: list[Message] = Field(description="messages")
    model: ModelType = Field(description="model id")
    noteContents: list[str] = Field(description="note contents")


SYSTEM_PROMPT = "You are a helpful assistant. Answer question accordingly and accurately."
CONTEXT_TEMPLATE = " Below are some notes of the user. Use them as context and answer questions. {context}"


def get_streaming_response(
    model: ModelType,
    messages: list[Message],
    context: str,
) -> Iterator:
    system_message = {
        "role": "system",
        "content": SYSTEM_PROMPT,
    }

    if context:
        system_message["content"] += CONTEXT_TEMPLATE.format(context=context)

    stream = ollama.chat(
        model=model,
        messages=[system_message] + messages,
        stream=True,
    )

    for chunk in stream:
        yield chunk["message"]["content"]


if __name__ == "__main__":
    stream = ollama.chat(
        model="llama3.1:8b-instruct-q8_0",
        messages=[{"role": "user", "content": "Why is the sky blue?"}],
        stream=True,
    )

    for chunk in stream:
        print(chunk["message"]["content"], end="", flush=True)
