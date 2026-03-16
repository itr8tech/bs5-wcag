#!/usr/bin/env node

/**
 * Axe accessibility testing using Puppeteer
 * No ChromeDriver version issues
 */

const { AxePuppeteer } = require('@axe-core/puppeteer');
const puppeteer = require('puppeteer');

const testUrl = process.argv[2] || 'http://localhost:8080/docs/index.html';

(async () => {
  console.log('🔍 Running axe-core accessibility tests with Puppeteer');
  console.log(`URL: ${testUrl}\n`);

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto(testUrl, { waitUntil: 'networkidle0' });

    console.log('Running accessibility analysis...\n');

    const results = await new AxePuppeteer(page)
      .withTags(['wcag2a', 'wcag2aa', 'wcag2aaa'])
      .analyze();

    // Save results
    const fs = require('fs');
    fs.writeFileSync('axe-results.json', JSON.stringify(results, null, 2));

    // Display summary
    console.log('=== Results Summary ===');
    console.log(`✓ Passes: ${results.passes.length}`);
    console.log(`✗ Violations: ${results.violations.length}`);
    console.log(`⚠ Incomplete: ${results.incomplete.length}`);
    console.log(`ℹ Inapplicable: ${results.inapplicable.length}`);

    if (results.violations.length > 0) {
      console.log('\n❌ Accessibility Violations Found:\n');
      results.violations.forEach((violation, index) => {
        console.log(`${index + 1}. ${violation.id} (${violation.impact || 'unknown'})`);
        console.log(`   ${violation.description}`);
        console.log(`   Help: ${violation.helpUrl}`);
        console.log(`   Affected elements: ${violation.nodes.length}`);

        if (violation.nodes.length > 0) {
          violation.nodes.forEach((node, nodeIndex) => {
            console.log(`   ${nodeIndex + 1}) ${node.html.substring(0, 100)}...`);
            console.log(`      Target: ${node.target.join(' > ')}`);
            if (node.failureSummary) {
              console.log(`      ${node.failureSummary.split('\n')[0]}`);
            }
            // Show contrast data if available
            if (node.any && node.any.length > 0) {
              node.any.forEach(check => {
                if (check.data && check.data.contrastRatio) {
                  console.log(`      Contrast: ${check.data.contrastRatio.toFixed(2)}:1 (expected ≥7:1)`);
                  console.log(`      FG: ${check.data.fgColor}, BG: ${check.data.bgColor}`);
                }
              });
            }
          });
        }
        console.log('');
      });

      await browser.close();
      process.exit(1);
    } else {
      console.log('\n✅ No accessibility violations found!');
      console.log('   All WCAG 2.0 Level A, AA, and AAA checks passed.\n');

      await browser.close();
      process.exit(0);
    }
  } catch (error) {
    console.error('❌ Error running accessibility tests:', error.message);
    if (browser) await browser.close();
    process.exit(1);
  }
})();
