import os
import re

# Project configuration for Next.js / TypeScript
folders = [
    "app/lore"
]

# allowed file types for folder scanning
allowed_ext = [".ts", ".tsx", ".css", ".js", ".jsx", ".html", ".json"]

# single files you want to include even if they're outside those folders
extra_files = [
    "package.json",
    "tsconfig.json",
    "next.config.js",
    "next.config.mjs"
]

output = ""

def compact_text(text):
    """
    Removes newlines, leading/trailing whitespace, 
    and collapses multiple spaces into one.
    """
    lines = text.splitlines()
    cleaned = []
    for line in lines:
        stripped = line.strip()
        if stripped:
            # Collapse multiple spaces into one
            collapsed = re.sub(r"\s+", " ", stripped)
            cleaned.append(collapsed)
    return "".join(cleaned)

def dump_file(path):
    global output
    if os.path.exists(path) and os.path.isfile(path):
        try:
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                raw = f.read()
            compacted = compact_text(raw)
            # Use relative path for cleaner output headers
            output += f"\n=== FILE: {path} ===\n" + compacted + "\n"
            print(f"Processed: {path}")
        except Exception as e:
            print(f"Error processing {path}: {e}")

def scan_folder(folder):
    for root, dirs, files in os.walk(folder):
        # Skip node_modules and .next directories
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
            
        for file in files:
            if any(file.endswith(ext) for ext in allowed_ext):
                dump_file(os.path.join(root, file))

# Start scanning
print("Starting export scan...")

for folder in folders:
    if os.path.exists(folder):
        scan_folder(folder)
    else:
        print(f"Folder not found: {folder}")

for p in extra_files:
    if os.path.exists(p):
        dump_file(p)

# Write final output
with open("project_file.txt", "w", encoding="utf-8") as out:
    out.write(output)

print("-" * 30)
print("Done -> project_file.txt")
print(f"Total size: {len(output)} characters")
