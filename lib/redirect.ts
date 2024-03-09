export const redirect = (path: string) =>
	new Response(null, { status: 302, headers: { Location: path } });
