import yargs from "yargs";
import { readFileSync, writeFileSync } from "fs";
import { dirname, basename, extname, join } from "path";

const parser = yargs(process.argv.slice(2)).
    usage("$0 [filename]").
    demandCommand(1);

Promise.resolve(parser.argv).then(async argv => {
    const filename = argv['_'][0].toString();
    const dir = dirname(filename);
    const ext = extname(filename);
    const base = basename(filename, ext)
    const filename_new = join(dir, base + "m" + ext);

    const playitems = readFileSync(filename).toString();
    const normalized = playitems.split("\n").map(playitem => playitem.normalize("NFD"));
    writeFileSync(filename_new, normalized.join("\n"))
});
