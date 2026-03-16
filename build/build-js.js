const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const srcDir = path.join(__dirname, '..', 'js');
const distDir = path.join(__dirname, '..', 'dist', 'js');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Read source file
const srcFile = path.join(srcDir, 'bs5-wcag.js');
const sourceCode = fs.readFileSync(srcFile, 'utf8');

// Copy unminified version
const destFile = path.join(distDir, 'bs5-wcag.js');
fs.writeFileSync(destFile, sourceCode);
console.log('✓ Created bs5-wcag.js');

// Create minified version
minify(sourceCode, {
  compress: {
    dead_code: true,
    drop_console: false,
    drop_debugger: true,
    keep_classnames: false,
    keep_fargs: true,
    keep_fnames: false,
    keep_infinity: true
  },
  mangle: {
    keep_classnames: false,
    keep_fnames: false
  },
  format: {
    comments: /^!/
  },
  sourceMap: {
    filename: 'bs5-wcag.min.js',
    url: 'bs5-wcag.min.js.map'
  }
}).then(result => {
  const minFile = path.join(distDir, 'bs5-wcag.min.js');
  const mapFile = path.join(distDir, 'bs5-wcag.min.js.map');

  fs.writeFileSync(minFile, result.code);
  console.log('✓ Created bs5-wcag.min.js');

  if (result.map) {
    fs.writeFileSync(mapFile, result.map);
    console.log('✓ Created bs5-wcag.min.js.map');
  }

  console.log('\nJavaScript build complete!');
}).catch(err => {
  console.error('Error minifying JavaScript:', err);
  process.exit(1);
});
