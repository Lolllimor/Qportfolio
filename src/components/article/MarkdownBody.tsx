import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

type Block =
  | { type: 'h2' | 'h3' | 'p' | 'quote'; text: string }
  | { type: 'ul' | 'ol'; items: string[] }
  | { type: 'img'; src: string; alt: string; caption?: string };

function unescapeMd(text: string) {
  return text.replace(/\\([\\`*_[\]#])/g, '$1');
}

function renderInline(text: string): ReactNode[] {
  const pattern =
    /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(unescapeMd(text.slice(lastIndex, match.index)));
    }

    if (match[1]) {
      const href = match[3];
      const label = unescapeMd(match[2]);
      const className =
        'text-[#353F50] underline decoration-[#E66001]/40 underline-offset-4 transition-colors hover:text-[#E66001] hover:decoration-[#E66001]';

      nodes.push(
        href.startsWith('/') ? (
          <Link key={key} href={href} className={className}>
            {label}
          </Link>
        ) : (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {label}
          </a>
        )
      );
    } else if (match[4]) {
      nodes.push(
        <strong key={key} className="font-medium text-[#353F50]">
          {unescapeMd(match[5])}
        </strong>
      );
    } else {
      nodes.push(<em key={key}>{unescapeMd(match[7])}</em>);
    }

    key += 1;
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(unescapeMd(text.slice(lastIndex)));
  }

  return nodes;
}

function parseBlocks(markdown: string): Block[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trimEnd();

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const imageMatch = /^!\[([^\]]*)\]\(([^)]+)\)$/.exec(line.trim());
    if (imageMatch) {
      const next = lines[index + 1]?.trim() ?? '';
      const captionMatch = /^\*(.+)\*$/.exec(next);
      blocks.push({
        type: 'img',
        alt: imageMatch[1],
        src: imageMatch[2],
        caption: captionMatch ? captionMatch[1] : undefined,
      });
      index += captionMatch ? 2 : 1;
      continue;
    }

    if (line.startsWith('## ')) {
      blocks.push({ type: 'h2', text: line.slice(3).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith('### ')) {
      blocks.push({ type: 'h3', text: line.slice(4).trim() });
      index += 1;
      continue;
    }

    if (line.startsWith('> ')) {
      const quote: string[] = [];
      while (index < lines.length && lines[index].startsWith('> ')) {
        quote.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push({ type: 'quote', text: quote.join(' ') });
      continue;
    }

    if (/^[-*] /.test(line.trim())) {
      const items: string[] = [];
      while (index < lines.length && /^[-*] /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*] /, ''));
        index += 1;
      }
      blocks.push({ type: 'ul', items });
      continue;
    }

    if (/^\d+\. /.test(line.trim())) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\. /.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\. /, ''));
        index += 1;
      }
      blocks.push({ type: 'ol', items });
      continue;
    }

    const paragraph: string[] = [line];
    index += 1;
    while (
      index < lines.length &&
      lines[index].trim() &&
      !lines[index].startsWith('#') &&
      !lines[index].startsWith('>') &&
      !/^[-*] /.test(lines[index].trim()) &&
      !/^\d+\. /.test(lines[index].trim()) &&
      !/^!\[/.test(lines[index].trim())
    ) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: 'p', text: paragraph.join(' ') });
  }

  return blocks;
}

export function MarkdownBody({ content }: { content: string }) {
  const blocks = parseBlocks(content);

  return (
    <div className="max-w-[640px] space-y-6 font-campton text-base leading-relaxed text-[#5C5C5C]">
      {blocks.map((block, index) => {
        if (block.type === 'h2') {
          return (
            <h2
              key={index}
              className="pt-8 font-apple-garamond text-2xl font-normal text-[#353F50] md:text-[28px]"
            >
              {renderInline(block.text)}
            </h2>
          );
        }

        if (block.type === 'h3') {
          return (
            <h3
              key={index}
              className="pt-4 font-campton text-lg font-medium text-[#353F50]"
            >
              {renderInline(block.text)}
            </h3>
          );
        }

        if (block.type === 'quote') {
          return (
            <blockquote
              key={index}
              className="border-l-2 border-[#E66001] pl-4 italic text-[#353F50]"
            >
              {renderInline(block.text)}
            </blockquote>
          );
        }

        if (block.type === 'ul' || block.type === 'ol') {
          const List = block.type === 'ul' ? 'ul' : 'ol';
          return (
            <List
              key={index}
              className={
                block.type === 'ul'
                  ? 'list-disc space-y-2 pl-5'
                  : 'list-decimal space-y-2 pl-5'
              }
            >
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex} className="leading-relaxed">
                  {renderInline(item)}
                </li>
              ))}
            </List>
          );
        }

        if (block.type === 'img') {
          return (
            <figure key={index} className="py-2">
              <Image
                src={block.src}
                alt={block.alt}
                width={1200}
                height={675}
                sizes="(max-width: 1024px) 100vw, 640px"
                className="h-auto w-full rounded-2xl"
              />
              {block.caption ? (
                <figcaption className="mt-3 font-campton text-sm leading-relaxed text-[#5C5C5C]">
                  {block.caption}
                </figcaption>
              ) : null}
            </figure>
          );
        }

        if (block.type === 'p') {
          return <p key={index}>{renderInline(block.text)}</p>;
        }

        return null;
      })}
    </div>
  );
}
