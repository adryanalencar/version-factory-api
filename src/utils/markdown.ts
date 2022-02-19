import markdownLinkExtractor from 'markdown-link-extractor';

type Link = {
    type: string,
    raw: string,
    href: string,
    title: string,
    text: string
  }

function extractLinks(markdown: string): Link[] {
  return markdownLinkExtractor(markdown, true);
}

export { extractLinks };