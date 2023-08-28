// @ts-ignore
const { generateService, } = require("@umijs/openapi");

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: "http://192.168.6.162:8089/api/v3/api-docs",
  serversPath: "./src/",
});
