// @ts-ignore
const { generateService, } = require("@yxgr/openapi")
const baseURL = "http://43.139.101.117:30059" // 开发

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: baseURL + "/auth/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "auth",
  apiPrefix: "'/auth'",
  namespace: "AUTH",
})

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: baseURL + "/idp/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "idp",
  apiPrefix: "'/idp'",
  namespace: "IDP",
})

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: baseURL + "/mes/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "mes",
  apiPrefix: "'/mes'",
  namespace: "MES",
})

// generateService({
//   requestLibPath: "import { request } from '@/utils/http'",
//   schemaPath: "http://10.10.1.162:8059" + "/mes/v2/api-docs",
//   serversPath: "./src/api/",
//   projectName: "mes",
//   apiPrefix: "'/mes'",
//   namespace: "MES",
// })
