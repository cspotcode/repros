// @ts-check

/** @type import('dts-bundle-generator/config-schema').BundlerConfig */
const config = module.exports = {
    entries: [{
        filePath: 'src/index.d.ts',
        outFile: 'dist/index.d.ts',
        libraries: {
            // /// <reference-d> libraries
            allowedTypesLibraries: [
            ],
            // imported libraries
            importedLibraries: [
            ],
            // inlined (bundled) libraries
            inlinedLibraries: [
                "ora"
            ],
        }
    }]
}