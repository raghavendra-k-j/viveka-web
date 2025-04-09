const fs = require('fs');
const path = require('path');

const inputPath = path.resolve(__dirname, 'index.json');
const outputCssPath = path.resolve(__dirname, '../../src/app/theme.css');

const tokens = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));

const flatTokens = flattenTokens(tokens);

const cssLines = Object.entries(flatTokens).map(
  ([key, value]) => `  --${key}: ${value};`
);

const cssContent = `:root {\n${cssLines.join('\n')}\n}\n`;

// ✅ Ensure build directory exists
fs.mkdirSync(path.dirname(outputCssPath), { recursive: true });

fs.writeFileSync(outputCssPath, cssContent);
console.log(`✅ theme.css generated at ${outputCssPath}`);

// Helper to flatten nested tokens with prefix
function flattenTokens(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const fullKey = prefix ? `${prefix}-${key}` : key;
    if (typeof val === 'object' && val !== null) {
      Object.assign(acc, flattenTokens(val, fullKey));
    } else {
      acc[fullKey] = val;
    }
    return acc;
  }, {});
}
