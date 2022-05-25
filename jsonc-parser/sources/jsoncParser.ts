import lib from "./jsoncParser.cjs";
// Removes duplicate '.default' property.
export default (lib as unknown as {default: typeof lib}).default;