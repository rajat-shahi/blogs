interface Env {
  ASSETS: Fetcher;
}

function withHeaders(response: Response): Response {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    let response = await env.ASSETS.fetch(request);

    if (response.status !== 404) {
      return withHeaders(response);
    }

    if (request.method !== "GET" && request.method !== "HEAD") {
      return withHeaders(response);
    }

    const url = new URL(request.url);
    url.pathname = url.pathname.endsWith("/")
      ? `${url.pathname}index.html`
      : `${url.pathname}/index.html`;
    response = await env.ASSETS.fetch(new Request(url, request));

    return withHeaders(response);
  },
};
