/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'coordtransform' {
  export default {
		bd09togcj02: (...number) => string,
		gcj02tobd09: (...number) => string,
		wgs84togcj02: (...number) => string,
		gcj02towgs84: (...number) => string
	}
}
