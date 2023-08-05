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
  if (isValidUrl(input)) {
    return input;
  } else if (
    parseDomain(input).type !==
    (ParseResultType.Invalid || ParseResultType.NotListed)
  ) {
    const parsedUrl = new URL(`https://${input}`);
    return `${parsedUrl.protocol}//${parsedUrl.hostname}`;
  } else {
    return "https://www.google.com/search?q=" + encodeURIComponent(input);
  }
}
