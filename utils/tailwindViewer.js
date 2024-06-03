import fs from 'fs';
function extractRootVariables(filePath = './assets/styles/tailwind.scss') {
  const cssFile = fs.readFileSync(filePath, 'utf-8'); // Read the CSS File

  const rootVariables = new Map();

  // Regular expression to match CSS variables inside :root
  const regex = /:root\s*{([^}]*)}/g;
  const match = regex.exec(cssFile);

  if (match && match[1]) {
    // Extract CSS variables inside :root
    const variables = match[1].split(';').filter(Boolean);

    variables.forEach(variable => {
      const [name, value] = variable.trim().split(':');
      if (name && value) {
        rootVariables.set(name.trim(), value.trim());
      }
    });
  }

  return rootVariables;
}

function getThemeReplacementsValues(filePath) {
  const rootVariablesMap = extractRootVariables(filePath);
  let tmpObj = {};
  for (const [k, v] of rootVariablesMap) {
    tmpObj = { ...tmpObj, [`hsl(var(${k}))`]: `hsl(${v})` };
  }
  return tmpObj;
}

export { extractRootVariables, getThemeReplacementsValues };
