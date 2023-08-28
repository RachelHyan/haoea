// @ts-ignore
const { generateService, } = require("@umijs/openapi")

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: "http://43.139.101.117:30059/auth/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "auth",
  apiPrefix: "'/auth'",
  namespace: "AUTH",
})

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: "http://43.139.101.117:30059/idp/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "idp",
  apiPrefix: "'/idp'",
  namespace: "IDP",
})

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: "http://43.139.101.117:30059/mes/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "mes",
  apiPrefix: "'/mes'",
  namespace: "MES",
})
