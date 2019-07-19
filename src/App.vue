<template>
  <v-app>
    <Navbar/>

    <v-content class="mt-2">
      <router-view></router-view>
    </v-content>

    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          bottom
          right
          color="primary"
          dark
          fixed
          v-on="on"
        >
          <v-icon>flag</v-icon>
        </v-btn>
      </template>

      <NewRun @close="dialog = !dialog"/>

    </v-dialog>
  </v-app>
</template>

<script>
import Navbar from './components/Navbar'
import NewRun from './views/NewRun'

export default {
  name: 'App',
  components: {
    Navbar,
    NewRun
  },
  data () {
    return {
      dialog: false
    }
  }
}
</script>
