<template>
  <div class="run-page" style="height: 100%;">
    <v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <h1>Run #{{ run.runNumber }} at {{ run.location }}</h1>
          <p>{{ timeDateString }}</p>
        </v-flex>

        <v-flex xs12 mt-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12  mt-2>
          <h3>SUMMARY</h3>
          <v-layout row wrap>
            <v-flex xs4 class="run-stat">
              <div class="value">{{ run.elapsedTime.etActual }}</div>
              <div class="label">Actual ET</div>
            </v-flex>
            <v-flex xs4 class="run-stat">
              <div class="value">{{ run.driver }}</div>
              <div class="label">Driver</div>
            </v-flex>
            <v-flex xs4 class="run-stat">
              <div class="value">{{ run.result }}</div>
              <div class="label">Result</div>
            </v-flex>
            <v-flex xs4 class="run-stat">
              <div class="value">{{ run.reactionTime }}</div>
              <div class="label">Reaction Time</div>
            </v-flex>
            <v-flex xs4 class="run-stat">
              <div class="value">{{ run.dialIn }}</div>
              <div class="label">Dial In</div>
            </v-flex>
            <v-flex xs4 class="run-stat">
              <div class="value">{{ run.lane }}</div>
              <div class="label">Lane</div>
            </v-flex>
          </v-layout>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>WEATHER</h3>
              </template>
              <div style="text-align: center; margin: 10px;">TODO</div>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>SPLITS</h3>
              </template>
              <table>
                <tr>
                  <td>60' ET</td>
                  <td>{{ run.elapsedTime.et60 }}</td>
                </tr>
                <tr>
                  <td>330' ET</td>
                  <td>{{ run.elapsedTime.et330 }}</td>
                </tr>
                <tr>
                  <td>660' ET</td>
                  <td>{{ run.elapsedTime.et660 }}</td>
                </tr>
                <tr>
                  <td>1000' ET</td>
                  <td>{{ run.elapsedTime.et1000 }}</td>
                </tr>
                <tr>
                  <td>1320' ET</td>
                  <td>{{ run.elapsedTime.et1320 }}</td>
                </tr>
                <tr>
                  <td>Actual ET</td>
                  <td>{{ run.elapsedTime.etActual }}</td>
                </tr>
                <tr>
                  <td>660' MPH</td>
                  <td>{{ run.elapsedTime.mph660 }}</td>
                </tr>
                <tr>
                  <td>1320' MPH</td>
                  <td>{{ run.elapsedTime.mph1320 }}</td>
                </tr>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>CAR ADJUSTMENTS</h3>
              </template>
              <table>
                <tr>
                  <td>Primary Jet</td>
                  <td>{{ run.carAdjustments.primaryJet || '--' }}</td>
                </tr>
                <tr>
                  <td>Secondary Jet</td>
                  <td>{{ run.carAdjustments.secondaryJet || '--' }}</td>
                </tr>
                <tr>
                  <td>Squirter Size</td>
                  <td>{{ run.carAdjustments.squirterSize || '--' }}</td>
                </tr>
                <tr>
                  <td>Pilot Jet</td>
                  <td>{{ run.carAdjustments.pilotJet || '--' }}</td>
                </tr>
                <tr>
                  <td>Needle</td>
                  <td>{{ run.carAdjustments.needle || '--' }}</td>
                </tr>
                <tr>
                  <td>Clip Position</td>
                  <td>{{ run.carAdjustments.clipPosition || '--' }}</td>
                </tr>
                <tr>
                  <td>Slide</td>
                  <td>{{ run.carAdjustments.slide || '--' }}</td>
                </tr>
                <tr>
                  <td>Idle Screw</td>
                  <td>{{ run.carAdjustments.idleScrew || '--' }}</td>
                </tr>
                <tr>
                  <td>Air Screw</td>
                  <td>{{ run.carAdjustments.airScrew || '--' }}</td>
                </tr>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>THROTTLE STOP ADJUSTMENTS</h3>
              </template>
              <table>
                <tr>
                  <th>Timer</th>
                  <th>Value</th>
                </tr>
                <tr>
                  <td>1</td>
                  <td>{{ run.throttleStopAdjustments.timer1 || '--' }}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{{ run.throttleStopAdjustments.timer2 || '--' }}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{{ run.throttleStopAdjustments.timer3 || '--' }}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>{{ run.throttleStopAdjustments.timer4 || '--' }}</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>{{ run.throttleStopAdjustments.timer5 || '--' }}</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>{{ run.throttleStopAdjustments.timer6 || '--' }}</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>{{ run.throttleStopAdjustments.timer7 || '--' }}</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td>{{ run.throttleStopAdjustments.timer8 || '--' }}</td>
                </tr>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>DELAY BOX SETTINGS</h3>
              </template>
              <table>
                <tr>
                  <td>Delay Time</td>
                  <td>{{ run.delayBoxSettings.delayTime || '--' }}</td>
                </tr>
                <tr>
                  <td>RPM Shift Value</td>
                  <td>{{ run.delayBoxSettings.rpmShiftValue || '--' }}</td>
                </tr>
                <tr>
                  <td>Time Shift Value 1</td>
                  <td>{{ run.delayBoxSettings.timeShiftValue1 || '--' }}</td>
                </tr>
                <tr>
                  <td>Time Shift Value 2</td>
                  <td>{{ run.delayBoxSettings.timeShiftValue2 || '--' }}</td>
                </tr>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>SUSPENSION SETTINGS</h3>
              </template>
              <table>
                <tr>
                  <td>Strut Setting</td>
                  <td>{{ run.suspensionSettings.strutSetting || '--' }}</td>
                </tr>
                <tr>
                  <td>Rear Shock Compress</td>
                  <td>{{ run.suspensionSettings.rearShockCompress || '--' }}</td>
                </tr>
                <tr>
                  <td>Rear Shock Rebound</td>
                  <td>{{ run.suspensionSettings.rearShockRebound || '--' }}</td>
                </tr>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

        <v-flex xs12 my-2>
          <v-divider></v-divider>
        </v-flex>

        <v-flex xs12>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <template v-slot:header>
                <h3>GEARING</h3>
              </template>
              <table>
                <tr>
                  <td>Primary Gear</td>
                  <td>{{ run.gearing.primaryGear || '--' }}</td>
                </tr>
                <tr>
                  <td>Secondary Gear</td>
                  <td>{{ run.gearing.secondaryGear || '--' }}</td>
                </tr>
              </table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      run: {
        location: 'BIR',
        datetime: new Date('August 19, 1975 23:15:30'),
        runNumber: 3,
        reactionTime: -0.103,
        dialIn: 12.36,
        lane: 'Left',
        driver: 'Skylar',
        result: 'Won',
        weatherInformation: {
          densityAltitude: 2068,
          adjustedAltitude: 1568,
          temperature: 65.2,
          humidity: 35,
          barometricPressure: 28.66,
          waterGrains: 33,
          lightValue: null,
          windSpeed: 8,
          windDirection: 0
        },
        elapsedTime: {
          et60: 2.565,
          et330: 7.696,
          et660: 12.331,
          et1000: null,
          et1320: null,
          etActual: 12.325,
          mph660: 51.48,
          mph1320: null
        },
        carAdjustments: {
          primaryJet: 96,
          secondaryJet: null,
          squirterSize: null,
          pilotJet: 32,
          needle: null,
          clipPosition: null,
          slide: 'Black',
          idleScrew: null,
          airScrew: null
        },
        gearing: {
          primaryGear: 15,
          secondaryGear: 84
        },
        throttleStopAdjustments: {
          timer1: null,
          timer2: null,
          timer3: null,
          timer4: null,
          timer5: null,
          timer6: null,
          timer7: null,
          timer8: null
        },
        delayBoxSettings: {
          delayTime: null,
          rpmShiftValue: null,
          timeShiftValue1: null,
          timeShiftValue2: null
        },
        suspensionSettings: {
          strutSetting: null,
          rearShockCompress: null,
          rearShockRebound: null
        },
        notes: 'Put everything back like first run.'
      }
    }
  },
  computed: {
    timeDateString() {
      var weekday = this.run.datetime.toLocaleString('en-US', { weekday: 'long' })
      var month = this.run.datetime.toLocaleString('en-US', { month: 'short' })
      var day = this.run.datetime.toLocaleString('en-US', { day: 'numeric' })
      var time = this.run.datetime.toLocaleTimeString('en-US')

      return `${weekday}, ${month} ${day} at ${time}`
    }
  }
}
</script>

<style scoped>
  .run-stat {
    text-align: center;
  }
  .run-stat .value {
    font-size: 24px;
    font-weight: bold;
    color: black;
  }
  .run-stat .label {
    font-size: 12px;
    text-transform: uppercase;
    color: grey;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  td, th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
</style>
