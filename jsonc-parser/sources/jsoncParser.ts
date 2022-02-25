
import { readFileSync, PathLike } from "fs";

type JsonPrimitives = string | number | boolean | null

/** Valid JSON primitive, array or object. */
type JsonValues = JsonPrimitives | JsonPrimitives[] | Record<string,unknown>


/** Parameters that can be parsed by `readFileSync` function of `fs` module. */
type FsReadFileSyncParams = {
    /** Path to file, same as `path` parameter in `readFileSync` function of `fs` module. */
    path: PathLike;
    /**
     * Encoding to use for convertion of text file data from Buffer to String.
     */
    encoding?: BufferEncoding;
};

/** JSON with Comments parser module.
 * 
 * Allows for management over `*.jsonc` files, right now only by reading it.
 * 
 * @todo Creating JSONC files, JSONC templates, parsing JSONC to JSONC template.
 * (JSONC template = comments + data)
 */

const JSONC = {
    /**
     * A funtion that parses the non-standard JSON file with comments.
     * 
     * This is achieved by parsing JSONC file to standard JSON format (by
     * ommiting comments) and parsing it using `JSON.parse()` method.
     * 
     * **Note**: Currently parsing `*.json` files that includes comments will
     * cause a syntax error, as comments are not a part of JSON standard.
     * 
     * @param file Object containing `path` to file and optionally its `encoding`.
     * 
     * @param rules An array of global regular expressions matching the comment in string.
     * 
     * @example
     * 
     * // Read standard JSON file and save its content as string:
     * 
     * const myRegularJson = readFileSync('/path/to/file.json').toString();
     * 
     * // Read 'JSON with comments' file and save its content as string:
     * 
     * const myJsonWithComments = readFileSync('/path/to/fileWithComments.json').toString();
     * 
     * // Parse both JSON files:
     * 
     * JSON.parse(myRegularJson) // returns object
     * JSON.parse(myJsonWithComments) // syntax error!
     * jsonParseWithComments({path:'/path/to/fileWithComments.json'}) // returns object
     * jsonParseWithComments({path:'/path/to/file.json'}) // returns object
     * 
     */
    parse: (file: FsReadFileSyncParams, rules?: RegExp[]): JsonValues => {

        /* Do not parse JSON files (*.json) as JsonWithComments files (*.jsonc). */
        if (typeof (file.path) === 'string' && file.path.endsWith('.json'))
            return JSON.parse(readFileSync(file.path).toString(file.encoding));

        let data = readFileSync(file.path).toString(file.encoding);

        /* Here lies the essencial part of comments parsing logic. */
        const commentRules: RegExp[] = [
            /("[^"]*"|'[^']*')?\s*\/\/.*$/g,       // single line comments: `// example`
            /("[^"]*"|'[^']*')?\s*\/\*[^]*?\*\//g  // block comments: `/* example */`
        ];

        /* Allow for injecting additional comment rules. */
        if (rules) commentRules.concat(rules);

        /* Actual code parsing the JSONC string (yep, that's all). */
        for (const rule of commentRules) data = data.replace(rule, '$1');
        return JSON.parse(data);
    }
};

export default JSONC;