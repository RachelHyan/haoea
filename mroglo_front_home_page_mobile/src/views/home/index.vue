<template>
  <div class="root-page home">
    <BannerSwiper />
    <CompanyProfile />
    <ProductDescription />
    <ImageText />
    <MediaReport />
    <CooperativePartner />
    <PublicWelfare />
    <ContactUs />
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

import { ContactUs } from "@/components";
import BannerSwiper from "./components/banner-swiper.vue";
import CompanyProfile from "./components/company-profile.vue";
import CooperativePartner from "./components/cooperative-partner.vue";
import ImageText from "./components/image-text.vue";
import MediaReport from "./components/media-report.vue";
import ProductDescription from "./components/product-description.vue";
import PublicWelfare from "./components/public-welfare.vue";

export default defineComponent({
  name:"HomePage",
  components:{
    BannerSwiper,
    CompanyProfile,
    ProductDescription,
    CooperativePartner,
    ImageText,
    MediaReport,
    PublicWelfare,
    ContactUs,
  },
})
</script>
