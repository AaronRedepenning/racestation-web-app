<template>
  <v-toolbar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    color="blue darken-3"
    dark
    app
    fixed
  >
    <v-toolbar-title style="width: 300px;" class="ml-0 pl-3">
      <v-toolbar-side-icon></v-toolbar-side-icon>
      <span class="title ml-3 mr-5">Race<span class="font-weight-light">station</span></span>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
