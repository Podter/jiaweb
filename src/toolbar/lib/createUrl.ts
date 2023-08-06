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
    parsedUrl.type !== ParseResultType.NotListed &&
    input.includes(".")
  ) {
    const urlObj = new URL(`https://${input}`);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } else {
    const googleUrl =
      "https://www.google.com/search?q=" + encodeURIComponent(input);

    if (input.includes("/") && isValidUrl("https://" + input)) {
      const urlObj = new URL(`https://${input}`);
      const parsedHost = parseDomain(urlObj.hostname);
      if (
        parsedHost.type !== ParseResultType.Invalid &&
        parsedHost.type !== ParseResultType.NotListed
      ) {
        return urlObj.toString();
      } else {
        return googleUrl;
      }
    }
    return googleUrl;
  }
}
