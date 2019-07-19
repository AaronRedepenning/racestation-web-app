<template>
  <nav>
    <v-navigation-drawer v-model="drawer" fixed clipped app>
      <v-list>
        <v-list-tile
          v-for="route in routes"
          :key="route.title"
          @click="navigate(route.path)"
        >
          <v-list-tile-action>
            <v-icon>{{ route.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ route.name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px;">
        <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        <span class="title ml-3 mr-5">Race<span class="font-weight-light">station</span></span>
      </v-toolbar-title>
    </v-toolbar>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data: () => ({
    drawer: false,
    routes: [
      { name: 'Home', path: '/', icon: 'home' },
      { name: 'Weatherstation', path: '/weatherstation', icon: 'cloud' }
    ]
  }),
  methods: {
    navigate (path) {
      this.$router.push(path)
      this.drawer = false
    }
  }
}
</script>
