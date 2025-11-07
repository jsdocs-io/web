import { mkdtempDisposable, realpath } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export async function tempDir() {
	const realTmpDir = await realpath(tmpdir());
	return await mkdtempDisposable(join(realTmpDir, "jsdocs-io-web-"));
}
