import type { RemovableRef } from "@vueuse/core"
import { useLocalStorage } from "@vueuse/core"
import { computed } from "vue"

const token: RemovableRef<undefined | null | string> = useLocalStorage("X-Token", undefined)
const userInfo: RemovableRef<undefined | null | string > = useLocalStorage("userInfo", null)
const userInfoValue = computed(() => {
  return userInfo.value ? JSON.parse(userInfo.value) : null
})

export {
  token,
  userInfo,
  userInfoValue
}
