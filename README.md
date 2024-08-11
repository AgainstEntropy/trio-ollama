# Trio-Ollama

Trio consists of three parts: to-do, note and chat!

## Getting Started

### Package installation

```shell
npm i
pip install -r requirements.txt
```

### Database ProtoType

Create a `.env.local` file first and write in

```
NEXT_PORT=3030
FASTAPI_PORT=8080
DATABASE_URL=sqlite.db
```

then run the following line:

```shell
npx drizzle-kit push:sqlite
```

### Start Trio

```shell
python src-fastapi/main_ollama.py   # start FastAPI backend
npm run dev                         # start next.js frontend
```

## Trouble Shooting

To make `ollama` works with `FastAPI`, one needs to import `TypedDict` from `typing_extensions` (instead of `typing`), maybe via adding the following line to `ollama._types`:

```python
from typing_extensions import TypedDict
```
