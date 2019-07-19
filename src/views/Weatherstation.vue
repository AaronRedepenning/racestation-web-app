<template>
  <div class="weather">
    <v-container grid-list-lg>
      <v-layout row wrap>
        <v-flex xs12 class="mb-2">
          <h1 class="title grey--text">Weatherstation</h1>
          <div style="margin: 8px 4px;">
            <span :class="`circle ${this.weatherStation.online ? 'online' : 'offline'}`"></span>
            <span>{{ weatherStation.description }}</span>
          </div>
        </v-flex>

        <!-- Current conditions from weatherstation -->
        <v-flex xs12>
          <v-card>
            <v-card-title style="background-color: #e7e7e7;">
              <h3>Current Conditions</h3>
            </v-card-title>
            <v-card-text style="background-color: #fafafa;">
              <v-layout row wrap>
                <v-flex xs12 md4>
                  <div>
                    <span class="display-3" style="color: rgb(182, 198, 9);">77&#176;</span>
                    <span class="title font-weight-light"> F</span>
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Wind Direction
                  </div>
                  <div>
                    {{ toHeading( currentWeather.WindDirection ) || '--' }}
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
                    Relative Humidity
                  </div>
                  <div>
                    {{ currentWeather.RelativeHumidity || '--' }}
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
                    Vapor Pressure
                  </div>
                  <div>
                    {{ currentWeather.VaporPressure || '--' }}
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

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Adjusted Altitude
                  </div>
                  <div>
                    {{ currentWeather.AdjustedAltitude || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Density Altitude
                  </div>
                  <div>
                    {{ currentWeather.DensityAltitude || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Pressure Altitude
                  </div>
                  <div>
                    {{ currentWeather.PressureAltitude || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Air Density Ratio
                  </div>
                  <div>
                    {{ currentWeather.AirDensityRatio || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Grains
                  </div>
                  <div>
                    {{ currentWeather.Grains || '--' }}
                  </div>
                </v-flex>

                <v-flex xs6 md4>
                  <div class="grey--text text-uppercase">
                    Ambient Light
                  </div>
                  <div>
                    {{ currentWeather.AmbientLight || '--' }}
                  </div>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>

        <!-- Current conditions from weatherstation -->
        <v-flex xs12>
          <v-card>
            <v-card-title style="background-color: #e7e7e7;">
              <h3>History</h3>
            </v-card-title>
            <v-card-text style="background-color: #fafafa;">
              <p class="grey--text text-xs-center pt-3">TODO</p>
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
  name: 'Weatherstation',
  data: () => ({
    weather: []
  }),
  firestore: {
    // TODO: Get weather from past 12 hours?
    weather: db.collection('weather').orderBy('Timestamp')
  },
  computed: {
    currentWeather () {
      if (this.weather.length > 0) {
        return this.weather[0]
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
  },
  methods: {
    toHeading (val) {
      if (!val) return null

      // TODO: Does this actually work?
      const headings = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
      const angle = Math.round((val / 22.5) + 0.5)

      return headings[(angle % 16)]
    }
  }
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
