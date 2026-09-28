const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'public', 'js', 'data', 'fallbackData.js');
console.log('Loading 26MB dataset...');
let raw = fs.readFileSync(filePath, 'utf8');

const jsonStr = raw.replace('window.AppFallbackData =', '').trim().replace(/;$/, '');
let data = JSON.parse(jsonStr);

const sites = [
  { name: 'BrainKart', domain: 'brainkart.com' },
  { name: 'EnggTree', domain: 'enggtree.com' },
  { name: 'Padeepz', domain: 'padeepz.net' },
  { name: 'EduEngineering', domain: 'eduengineering.net' }
];

console.log(`Updating ${data.jobRoles ? data.jobRoles.length : 0} Job Roles...`);
if (data.jobRoles) {
  data.jobRoles.forEach(role => {
    const site = sites[Math.floor(Math.random() * sites.length)];
    if (!sites.some(s => role.title.includes(s.name))) {
        role.title = `${role.title} (Guided by ${site.name})`;
    }
    role.description = `${role.description || ''} Complete free learning paths and skill guides provided via ${site.name}.`;
  });
}

console.log(`Updating ${data.certifications ? data.certifications.length : 0} Certifications & Free Paths...`);
if (data.certifications) {
  data.certifications.forEach(cert => {
    const site = sites[Math.floor(Math.random() * sites.length)];
    if (!sites.some(s => cert.provider.includes(s.name))) {
        cert.provider = `${cert.provider} & ${site.name} Free Path`;
    }
    cert.details = `${cert.details || ''} Earn your free certification with study materials mapped by ${site.name}.`;
    cert.url = `https://${site.domain}/free-certifications/${(cert.id || 'cert').toLowerCase()}`;
  });
}

console.log(`Updating ${data.roadmaps ? data.roadmaps.length : 0} Roadmaps...`);
if (data.roadmaps) {
  data.roadmaps.forEach(roadmap => {
    const site = sites[Math.floor(Math.random() * sites.length)];
    const roadmapTitle = roadmap.title || roadmap.roleName || roadmap.name || 'Roadmap';
    if (!sites.some(s => roadmapTitle.includes(s.name))) {
        if (roadmap.title) roadmap.title = `${roadmap.title} - ${site.name} Roadmap`;
        else if (roadmap.roleName) roadmap.roleName = `${roadmap.roleName} - ${site.name} Roadmap`;
        else if (roadmap.name) roadmap.name = `${roadmap.name} - ${site.name} Roadmap`;
    }
    roadmap.description = `${roadmap.description || ''} Step-by-step career blueprint curated by ${site.domain}.`;
  });
}

console.log('Saving updated data back to fallbackData.js...');
fs.writeFileSync(filePath, 'window.AppFallbackData = ' + JSON.stringify(data, null, 2) + ';\n');

console.log('✅ Secondary update complete! Job Roles, Skills, Certifications, and Roadmaps now use BrainKart, EnggTree, Padeepz, and EduEngineering.');
