import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'visits.json');

async function readCount() {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const parsed = JSON.parse(data);
    return Number(parsed.count || 0);
  } catch {
    return 0;
  }
}

async function writeCount(nextCount: number) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify({ count: nextCount }, null, 2), 'utf-8');
}

export async function GET() {
  const count = await readCount();
  return Response.json({ count });
}

export async function POST() {
  const current = await readCount();
  const nextCount = current + 1;
  await writeCount(nextCount);
  return Response.json({ count: nextCount });
}
