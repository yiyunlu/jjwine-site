/** Cloudflare Worker entry point for the JJWine site. */
import handler from "vinext/server/app-router-entry";
import { handleEnquiry, type EnquiryEnv } from "./enquiry";

interface Env extends EnquiryEnv {
  ASSETS: Fetcher;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const hostname = url.hostname.toLowerCase();
    const isTestHost = hostname === "ecomm101.cc" ||
      hostname.endsWith(".ecomm101.cc") || hostname.endsWith(".workers.dev");
    const wrapResponse = (response: Response): Response => {
      if (!isTestHost) return response;
      // Copy even redirects, whose original headers may be immutable.
      const wrapped = new Response(response.body, response);
      wrapped.headers.set("X-Robots-Tag", "noindex, nofollow");
      return wrapped;
    };

    // Block crawling only on test hosts; production keeps the app's robots behavior.
    if (isTestHost && url.pathname === "/robots.txt" &&
      (request.method === "GET" || request.method === "HEAD")) {
      return wrapResponse(new Response(
        request.method === "HEAD" ? null : "User-agent: *\nDisallow: /\n",
        { headers: { "Content-Type": "text/plain; charset=utf-8" } },
      ));
    }

    if (url.pathname === "/api/enquiry") return wrapResponse(await handleEnquiry(request, env));

    // Redirect retired legal routes before the router normalizes trailing slashes.
    const retiredLegal = /^\/(?:es|fr)\/(privacy|legal)\/?$/.exec(url.pathname);
    if (retiredLegal) {
      url.pathname = `/en/${retiredLegal[1]}`;
      return wrapResponse(Response.redirect(url.href, 308));
    }

    // The app router does not expose the pathname to the root layout, which
    // needs it to emit the locale-specific <html lang>. Forward it as a
    // trusted header (overwriting any client-supplied value).
    const headers = new Headers(request.headers);
    headers.set("x-jjwine-pathname", url.pathname);
    return wrapResponse(await handler.fetch(new Request(request, { headers }), env, ctx));
  },
};

export default worker;
