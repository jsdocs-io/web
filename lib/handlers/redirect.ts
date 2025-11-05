export function redirect(path: string): Response {
	return new Response(null, { status: 302, headers: { Location: path } });
}
