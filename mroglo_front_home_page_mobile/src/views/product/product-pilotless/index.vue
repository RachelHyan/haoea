<template>
  <div class="root-page product-pilotless">
    <TopBanner />
    <ProductInfo />
    <MiddleBanner />
    <ContactUs />
  </div>
</template>
<script lang="ts">
import { ContactUs } from "@/components";
import { defineComponent } from "vue";
import MiddleBanner from "./components/middle-banner.vue";
import ProductInfo from "./components/product-info.vue";
import TopBanner from "./components/top-banner.vue";

export default defineComponent({
  name: "ProductPilotless",
  components: {
    TopBanner,
    ProductInfo,
    MiddleBanner,
    ContactUs,
  },
})
</script>
