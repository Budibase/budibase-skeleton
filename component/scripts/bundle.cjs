// .cjs extension required to run a node script inside a ES6 module repo
const tar = require("tar")
const fs = require("fs")
const pkg = require("../package.json")

const bundleName = `${pkg.name}-${pkg.version}.tar.gz`

tar.c(
    {
        gzip: true,
        cwd: "dist"
    },
    ["plugin.min.js", "schema.json", "package.json"]
).pipe(fs.createWriteStream(`dist/${bundleName}`))
