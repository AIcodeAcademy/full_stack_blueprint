import { $ } from "bun";

await Promise.all([$`bun server`, $`bun client`]);
