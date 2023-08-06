import { parseDomain, ParseResultType } from "parse-domain";

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
}

export default function createUrl(input: string): string {
  const parsedUrl = parseDomain(input);

  if (isValidUrl(input)) {
    return input;
  } else if (
    parsedUrl.type !== ParseResultType.Invalid &&
    parsedUrl.type !== ParseResultType.NotListed
  ) {
    const parsedUrl = new URL(`https://${input}`);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
  } else {
    return "https://www.google.com/search?q=" + encodeURIComponent(input);
  }
}
