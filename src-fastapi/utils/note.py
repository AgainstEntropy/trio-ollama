import json


def parse_node(node: dict | list[dict]) -> str:
    text_content = ""

    if isinstance(node, dict) and "type" in node:
        if node["type"] == "text" and "text" in node:
            text_content += node["text"] + " "
        elif "content" in node:
            if node["type"] == "paragraph":
                text_content += "\n"
            for child_node in node["content"]:
                text_content += parse_node(child_node)

    elif isinstance(node, list):
        for item in node:
            text_content += parse_node(item)

    return text_content


def extract_text(notes: list[str]) -> str:
    all_text = ""
    for content in notes:
        content_json = json.loads(content)
        all_text += parse_node(content_json)
    return all_text



if __name__ == "__main__":
    # Define the defaultEditorContent data
    defaultEditorContent = {
        "type": "doc",
        "content": [
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "This is a sample text."
                    }
                ]
            },
            {
                "type": "paragraph",
                "content": [
                    {
                        "type": "text",
                        "text": "This is another sample text."
                    }
                ]
            }
        ]
    }

    # Call the function with the defaultEditorContent data
    test_content = [json.dumps(defaultEditorContent, indent=4)]

    print(extract_text(test_content))
