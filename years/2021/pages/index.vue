<template>
  <div id="content">
    <LandingPast />
    <LandingHero />
    <LandingWatch id="lectures" />
    <LandingSpeakersGrid id="speakers" />
    <LandingAgenda id="agenda" />
    <LandingSponsors id="sponsors" />
    <LandingFooter />
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Vimconf 2021 - it's on!",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'October 29/30th',
        },

        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: "Vim Virtual's Conf",
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.vimconf.live/',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: "Join the world's first virtual Vim conference Oct 29/30th",
        },
        {
          hid: 'theme-color',
          property: 'theme-color',
          content: '#111827',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Connecting the vim community to share their love and passion for all things vim!',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/vimconf.jpg',
        },
        {
          property: 'og:image:width',
          content: '256',
        },
        {
          property: 'og:image:height',
          content: '256',
        },

        {
          name: 'twitter:site',
          content: '@VimconfLive',
        },
        { name: 'twitter:card', content: '/vimconf.jpg' },
        {
          hid: 'twitter:url',
          name: 'twitter:url',
          content: 'https://www.vimconf.live',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: "Join the world's first virtual Vim conference Oct 29/30th",
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Connecting the vim community to share their love and passion for all things vim!',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: '/vimconf.jpg',
        },
      ],
    }
  },
}
</script>
