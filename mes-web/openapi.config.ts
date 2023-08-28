// @ts-ignore
const { generateService, } = require("@yxgr/openapi")

// const BASE_URL = "http://10.10.1.162:8059"
const BASE_URL = "http://43.139.101.117:30059"

// generateService({
//   requestLibPath: "import { request } from '@/utils/http'",
//   schemaPath: BASE_URL + "/auth/v2/api-docs",
//   serversPath: "./src/api/",
//   projectName: "auth",
//   apiPrefix: "'/auth'",
//   namespace: "AUTH",
// })

// generateService({
//   requestLibPath: "import { request } from '@/utils/http'",
//   schemaPath: BASE_URL + "/idp/v2/api-docs",
//   serversPath: "./src/api/",
//   projectName: "idp",
//   apiPrefix: "'/idp'",
//   namespace: "IDP",
// })

generateService({
  requestLibPath: "import { request } from '@/utils/http'",
  schemaPath: BASE_URL + "/mes/v2/api-docs",
  serversPath: "./src/api/",
  projectName: "mes",
  apiPrefix: "'/mes'",
  namespace: "MES",
})

// generateService({
//   requestLibPath: "import { request } from '@/utils/http'",
//   schemaPath: BASE_URL + "/iot/v2/api-docs",
//   serversPath: "./src/api/",
//   projectName: "iot",
//   apiPrefix: "'/iot'",
//   namespace: "IOT",
// })

// generateService({
//   requestLibPath: "import { request } from '@/utils/http'",
//   schemaPath: "http://10.10.1.189:8060/v3/api-docs",
//   serversPath: "./src/api/",
//   projectName: "mes",
//   apiPrefix: "'/mes'",
//   namespace: "MES",
// })
