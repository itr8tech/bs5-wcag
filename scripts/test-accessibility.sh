#!/bin/bash

# Accessibility Testing Script
# Runs Lighthouse and axe-core tests locally

set -e

echo "🔍 BS5-WCAG Accessibility Testing"
echo "================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if dependencies are installed
if ! command -v lhci &> /dev/null; then
    echo -e "${YELLOW}Installing Lighthouse CI...${NC}"
    npm install -g @lhci/cli@0.13.x
fi

if ! [ -f "node_modules/@axe-core/puppeteer/index.js" ]; then
    echo -e "${YELLOW}Installing axe-core Puppeteer...${NC}"
    npm install --no-save @axe-core/puppeteer puppeteer
fi

# Build the project
echo -e "${YELLOW}Building project...${NC}"
npm run build

# Start server in background
echo -e "${YELLOW}Starting local server on port 8080...${NC}"
npx http-server -p 8080 > /dev/null 2>&1 &
SERVER_PID=$!

# Wait for server to be ready
sleep 3

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}Stopping server...${NC}"
    kill $SERVER_PID 2>/dev/null || true
}

# Trap EXIT to ensure cleanup runs
trap cleanup EXIT

echo ""
echo "Running Lighthouse CI..."
echo "------------------------"
if lhci autorun; then
    echo -e "${GREEN}✓ Lighthouse tests passed!${NC}"
    LIGHTHOUSE_PASS=true
else
    echo -e "${RED}✗ Lighthouse tests failed${NC}"
    LIGHTHOUSE_PASS=false
fi

echo ""
echo "Running axe-core accessibility tests..."
echo "---------------------------------------"
if node scripts/test-axe-puppeteer.js http://localhost:8080/docs/index.html; then
    echo -e "${GREEN}✓ axe tests passed!${NC}"
    AXE_PASS=true
else
    echo -e "${RED}✗ axe tests failed${NC}"
    AXE_PASS=false
fi

echo ""
echo "Results Summary"
echo "==============="
echo -e "Lighthouse CI: $([ "$LIGHTHOUSE_PASS" = true ] && echo "${GREEN}PASS${NC}" || echo "${RED}FAIL${NC}")"
echo -e "axe-core:      $([ "$AXE_PASS" = true ] && echo "${GREEN}PASS${NC}" || echo "${RED}FAIL${NC}")"
echo ""

if [ "$LIGHTHOUSE_PASS" = true ] && [ "$AXE_PASS" = true ]; then
    echo -e "${GREEN}🎉 All accessibility tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some accessibility tests failed${NC}"
    echo "See results above for details"
    exit 1
fi
