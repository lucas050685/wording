import { NextRequest, NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { readFileSync } from 'fs';
import { join } from 'path';

// Função para ler palavras de um arquivo específico
function loadWordsFromFile(size: number): string[] {
  try {
    const filePath = join(process.cwd(), 'src', `words_${size}.txt`);
    const fileContent = readFileSync(filePath, 'utf-8');
    
    return fileContent
      .split('\n')
      .map(word => word.trim().toUpperCase())
      .filter(word => word.length === size && /^[A-Z]+$/.test(word));
  } catch (error) {
    console.error(`Error loading words_${size}.txt:`, error);
    return [];
  }
}

export async function GET(request: NextRequest) {
  noStore();
  const { searchParams } = new URL(request.url);
  const size = parseInt(searchParams.get('size') || '5');
  
  if (size < 3 || size > 8) {
    return NextResponse.json({ error: 'Size must be between 3 and 8' }, { status: 400 });
  }
  
  const words = loadWordsFromFile(size);
  
  if (words.length === 0) {
    return NextResponse.json({ error: `No words found with ${size} letters` }, { status: 404 });
  }
  
  const randomWord = words[Math.floor(Math.random() * words.length)];
  
  return NextResponse.json({ 
    word: randomWord,
    totalWords: words.length,
    size: size
  });
}
