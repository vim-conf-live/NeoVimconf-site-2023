<template>
  <div class="scrollbar scrollbar-thumb-blue-700 scrollbar-track-blue-300">
    <portal to="destination"></portal>
    <div class="bg-gray-900 min-h-screen sm:h-auto lg:h-full">
      <Nuxt />
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },
}
</script>
