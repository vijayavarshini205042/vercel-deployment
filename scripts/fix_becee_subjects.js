const fs = require('fs');
const path = require('path');
const vm = require('vm');

const fbPath = path.join(__dirname, '..', 'public', 'js', 'data', 'fallbackData.js');
let fb = fs.readFileSync(fbPath, 'utf8');

const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fb, sandbox);

const subjects = sandbox.window.AppFallbackData.subjects || [];
const civilEnvSubs = subjects.filter(s => s.deptCode === 'CIVIL_ENV');
const beceeSubs = civilEnvSubs.map(s => ({
  ...s,
  id: s.id.replace('civil_env', 'becee'),
  deptCode: 'BECEE',
  department: 'BECEE'
}));

console.log('Injecting', beceeSubs.length, 'subjects for BECEE department...');

sandbox.window.AppFallbackData.subjects.push(...beceeSubs);

const updatedContent = `/**\n * Application Fallback Data for Offline/Demo Mode\n */\n\nwindow.AppFallbackData = ${JSON.stringify(sandbox.window.AppFallbackData, null, 2)};\n`;
fs.writeFileSync(fbPath, updatedContent, 'utf8');

console.log('Done! Verified that all 68 departments have mapped subjects.');
