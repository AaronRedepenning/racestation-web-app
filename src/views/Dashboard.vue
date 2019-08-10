<template>
  <div class="dashboard-page">
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 class="mb-4">
          <h1 class="title grey--text">Dashboard</h1>
        </v-flex>

        <!-- Weather station card -->
        <v-flex xs12 md6>
          <v-card>
            <v-card-title style="background-color: #e7e7e7;">
              <h3>Weatherstation</h3>
              <v-spacer/>
              <div>
                <span :class="`circle ${this.weatherStation.online ? 'online' : 'offline'}`"></span>
                {{ weatherStation.description }}
              </div>
            </v-card-title>
            <v-card-text style="background-color: #fafafa;">
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <div>
                    <span class="display-3" style="color: rgb(182, 198, 9);">{{ Math.floor(currentWeather.Temperature) || '--' }}&#176;</span>
                    <span class="title font-weight-light"> F</span>
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Wind Direction
                  </div>
                  <div>
                    {{ toHeading(currentWeather.WindDirection) || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Wind & Gust
                  </div>
                  <div>
                    {{ currentWeather.WindSpeed || '--' }} | {{ currentWeather.WindGust || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Absolute Humidity
                  </div>
                  <div>
                    {{ currentWeather.AbsoluteHumidity || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Absolute Pressure
                  </div>
                  <div>
                    {{ currentWeather.AbsolutePressure || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Dew Point
                  </div>
                  <div>
                    {{ currentWeather.DewPoint || '--' }}
                  </div>
                </v-flex>

                <v-flex xs12 class="text-xs-right">
                  <v-btn small outline color="primary" @click="$router.push('/weatherstation')">
                    All Conditions
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- Race results -->
        <v-flex xs12>
          <v-card>
            <v-card-title style="background-color: #e7e7e7;">
              <h3>Recent Races</h3>
              <v-spacer/>
              <v-spacer></v-spacer>
              <v-btn small outline color="primary" class="hidden-sm-and-down">
                Export to CSV
              </v-btn>
            </v-card-title>
            <v-card-text style="background-color: #fafafa;">
              <table>
                <tr>
                  <th>Location</th>
                  <th>Date/Time</th>
                  <th>Actions</th>
                </tr>
                <tr v-for="(run, index) in runs" :key="index">
                  <td>{{ run.location }}</td>
                  <td>{{ dateTimeString(run.datetime) }}</td>
                  <td>
                    <v-btn small
                      flat
                      fab
                      color="primary"
                      @click="$router.push({ path: `/run/${run.id}` })"
                    >
                      <v-icon>info</v-icon>
                    </v-btn>
                    <v-btn small flat fab color="primary">
                      <v-icon>delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { db } from '../db'

export default {
  data () {
    return {
      runs: [],
      weather: []
    }
  },
  firestore: {
    runs: db.collection('runs'),
    // TODO: Get weather from past 12 hours?
    weather: db.collection('weather').orderBy('Timestamp')
  },
  methods: {
    toHeading (val) {
      if (!val) return null

      // TODO: Does this actually work?
      const headings = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      const angle = Math.round((val / 22.5) + 0.5)

      return headings[(angle % 16)]
    },
    dateTimeString (datetime) {
      datetime = new Date('August 19, 1975 23:15:00 GMT+00')
      var month = datetime.toLocaleString('en-US', { month: 'numeric' })
      var day = datetime.toLocaleString('en-US', { day: 'numeric' })
      var time = datetime.toLocaleTimeString('en-US').replace(/:00([^:00]*)$/, '$1')

      return `${month}/${day} at ${time}`
    }
  },
  computed: {
    currentWeather () {
      if (this.weather.length > 0) {
        return this.weather[this.weather.length - 1]
      } else {
        return {}
      }
    },
    weatherStation () {
      var online = false
      var description = 'Offline'

      if ('Timestamp' in this.currentWeather) {
        const seconds = Math.floor(Date.now() / 1000) - this.currentWeather.Timestamp.seconds
        const minutes = Math.floor(seconds / 60)
        const hours = Math.floor(minutes / 60)
        const days = Math.floor(hours / 24)

        var time = 0
        var units = ''

        if (days > 0) {
          time = days
          units = 'days'
        } else if (hours > 0) {
          time = hours
          units = 'hours'
        } else if (minutes > 0) {
          time = minutes
          units = 'minutes'

          if (minutes >= 30) {
            online = true
          }
        } else {
          time = seconds
          units = 'seconds'
          online = true
        }

        if (online) {
          description = `Online(updated ${time} ${units} ago)`
        } else {
          description = `Offline(updated ${time} ${units} ago)`
        }
      }

      return {
        online: online,
        description: description
      }
    }
  }
  // created() {
  //   this.runsUnsubscribe = db.collection('runs').onSnapshot(res => {
  //     const changes = res.docChanges()

  //     changes.forEach(change => {
  //       if(change.type === 'added') {
  //         this.runs.push({
  //           ...change.doc.data(),
  //           id: change.doc.id
  //         })
  //       }
  //     })
  //   })

  //   this.weatherUnsubscribe = db.collection("weather").onSnapshot(res => {
  //     const changes = res.docChanges()

  //     if(changes.length > 0) {
  //       this.weather = {
  //         ...changes[0].doc.data(),
  //         id: changes[0].doc.id
  //       }
  //     }
  //   })

  //   this.intervalHandle = setInterval(() => {
  //     this.now = Math.floor(Date.now() / 1000)
  //   }, 5000)
  // },
  // destroyed() {
  //   this.runsUnsubscribe()
  //   this.weatherUnsubscribe()

  //   clearInterval(this.intervalHandle)
  // }
}
</script>

<style scoped>
.circle {
  height: 10px;
  width: 10px;
  border-radius: 50%;
  display: inline-block;
  margin-right: .2em;
}

.circle.online {
  background-color: green;
}

.circle.offline {
  background-color: red;
}
</style>
