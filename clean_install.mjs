import fs from 'fs';
import path from 'path';

function nukeNodeModules(dir) {
  const nmPath = path.join(dir, 'node_modules');
  if (fs.existsSync(nmPath)) {
    console.log(`Nuking ${nmPath}`);
    try {
      fs.rmSync(nmPath, { recursive: true, force: true });
    } catch(e) {
      console.error(`Failed to completely remove ${nmPath}`, e);
    }
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file.startsWith('.')) continue;
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      nukeNodeModules(fullPath);
    }
  }
}

console.log("Starting deep purge of all Node Modules...");
nukeNodeModules(process.cwd());
console.log("Deep purge complete.");
