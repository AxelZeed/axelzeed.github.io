import os
import re

folders = [
    # other folders if needed
]

allowed_ext = [".html", ".css", ".js"]

extra_files = [
]

output = ""


def compact_text(text):
    lines = text.splitlines()
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            stripped = re.sub(r"\s+", " ", stripped)
            cleaned.append(stripped)
    return "".join(cleaned)


def dump_file(path):
    global output

    if path.endswith("project_file.txt"):
        return

    if os.path.exists(path):
        with open(path, "r", encoding="utf-8", errors="ignore") as f:
            raw = f.read()

        compacted = compact_text(raw)
        output += f"\n=== FILE: {path} ===\n" + compacted + "\n"


def scan_folder(folder):
    for root, dirs, files in os.walk(folder):
        for file in files:
            if any(file.endswith(ext) for ext in allowed_ext):
                dump_file(os.path.join(root, file))


# scan current folder
scan_folder(".")

# scan additional folders
for folder in folders:
    if os.path.exists(folder):
        scan_folder(folder)

# include extra single files
for p in extra_files:
    dump_file(p)

with open("project_file.txt", "w", encoding="utf-8") as out:
    out.write(output)

print("Done → project_file.txt")