import json
import os
import re

from pathlib import Path

# Set input and output paths
base_dir = Path(__file__).resolve().parent
input_path = base_dir / 'tokens.json'
output_path = Path(r'D:\Projects\vivekasafe\viveka-web\src\app\css\theme.css')

# Load JSON tokens
with open(input_path, 'r', encoding='utf-8') as f:
    tokens = json.load(f)

# Flatten tokens
def flatten_tokens(obj, prefix=''):
    flat = {}
    for key, value in obj.items():
        full_key = f"{prefix}-{key}" if prefix else key
        if isinstance(value, dict):
            flat.update(flatten_tokens(value, full_key))
        else:
            flat[full_key] = value
    return flat

flat_tokens = flatten_tokens(tokens)

# Resolve references like ${color.primary}
ref_pattern = re.compile(r'\$\{([a-zA-Z0-9.-_]+)\}')

def resolve_value(val, flat_map):
    def replace_match(match):
        ref_key = match.group(1).replace('.', '-')
        return flat_map.get(ref_key, match.group(0))  # leave as-is if not found
    if isinstance(val, str):
        return ref_pattern.sub(replace_match, val)
    return val

resolved_tokens = {k: resolve_value(v, flat_tokens) for k, v in flat_tokens.items()}

# Generate CSS content
css_lines = [f"  --{k}: {v};" for k, v in resolved_tokens.items()]
css_content = f":root {{\n{chr(10).join(css_lines)}\n}}\n"

# Ensure output directory exists
output_path.parent.mkdir(parents=True, exist_ok=True)

# Write to CSS file
with open(output_path, 'w', encoding='utf-8') as f:
    f.write(css_content)

print(f"✅ theme.css generated at {output_path}")
