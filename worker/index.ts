/** Cloudflare Worker entry point for the JJWine site. */
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    // Redirect retired legal routes before the router normalizes trailing slashes.
    const url = new URL(request.url);
    const retiredLegal = /^\/(?:es|fr)\/(privacy|legal)\/?$/.exec(url.pathname);
    if (retiredLegal) {
      url.pathname = `/en/${retiredLegal[1]}`;
      return Response.redirect(url.href, 308);
    }

    // The app router does not expose the pathname to the root layout, which
    // needs it to emit the locale-specific <html lang>. Forward it as a
    // trusted header (overwriting any client-supplied value).
    const headers = new Headers(request.headers);
    headers.set("x-jjwine-pathname", url.pathname);
    return handler.fetch(new Request(request, { headers }), env, ctx);
  },
};

export default worker;
