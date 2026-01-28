import fs from 'fs';
import path from 'path';

export function writeToCsv(fileName, headers, rows) {
  const outputDir = path.join(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  const filePath = path.join(outputDir, fileName);

  const csvContent = [
    headers.join(','),
    ...rows.map(row =>
      headers.map(header => `"${row[header] || ''}"`).join(',')
    )
  ].join('\n');

  fs.writeFileSync(filePath, csvContent, 'utf8');
  return filePath;
}
