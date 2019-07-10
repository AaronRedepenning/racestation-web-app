<template>
  <v-card>
    <v-card-title>
    <v-toolbar dark fixed color="primary">
      <v-btn icon dark @click="close">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>New Run</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn dark flat @click="save">Save</v-btn>
      </v-toolbar-items>
    </v-toolbar>
    </v-card-title>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-list two-line subheader>
        <v-subheader>General</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <!-- Location -->
            <v-flex xs12>
              <v-text-field
                v-model="location"
                :rules="[rules.required]"
                prepend-inner-icon="place"
                label="Location"
                required>
              </v-text-field>
            </v-flex>

            <!-- Date -->
            <v-flex xs12 sm6>
              <v-menu
                ref="dateSelector"
                v-model="dateSelector"
                :close-on-content-click="false"
                :return-value.sync="date"
                lazy
                transition="scale-transition"
                full-width
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="dateFormatted"
                    label="Run Date"
                    prepend-inner-icon="event"
                    readonly
                    v-on="on"
                    :rules="[rules.required]"
                    required>
                  </v-text-field>
                </template>
                <v-date-picker v-model="date" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="dateSelector = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.dateSelector.save(date)">OK</v-btn>
                </v-date-picker>
              </v-menu>
            </v-flex>

            <!-- Time -->
            <v-flex xs12 sm6>
              <v-menu ref="timeSelector"
                :close-on-content-click="false"
                v-model="timeSelector"
                :return-value.sync="time"
                lazy
                transition="scale-transition"
                full-width
                offset-y
                max-width="290px"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="timeFormatted"
                    label="Run Time"
                    prepend-inner-icon="access_time"
                    readonly
                    v-on="on"
                    :rules="[rules.required]"
                    required>
                  </v-text-field>
                </template>
                <v-time-picker v-if="timeSelector" v-model="time">
                  <v-spacer></v-spacer>
                  <v-btn flat color="primary" @click="timeSelector = false">Cancel</v-btn>
                  <v-btn flat color="primary" @click="$refs.timeSelector.save(time)">OK</v-btn>
                </v-time-picker>
              </v-menu>
            </v-flex>

            <!-- Run Number -->
            <v-flex xs6 sm2>
              <v-text-field
                v-model="runNumber"
                :rules="[rules.required, rules.number]"
                type="number"
                label="Run Number"
                required
              >
              </v-text-field>
            </v-flex>

            <!-- Reaction Time -->
            <v-flex xs12 sm5>
              <v-text-field
                v-model="reaction"
                :rules="[rules.number]"
                label="Reaction Time"
                suffix="s"
              >
              </v-text-field>
            </v-flex>

            <!-- Dial In -->
            <v-flex xs12 sm5>
              <v-text-field
                v-model="dialIn"
                :rules="[rules.number]"
                label="Dial In"
                suffix="s"
              >
              </v-text-field>
            </v-flex>

            <!-- Lane -->
            <v-flex xs12 sm6 lg4>
              <span class="dark--text">Lane:</span>
              <v-radio-group
                row
                v-model="lane"
                :rules="[rules.required]"
                required>
                <v-radio
                  v-for="(lane, idx) in lanes"
                  :key="idx"
                  :label="lane"
                  :value="lanes[idx]"
                >
                </v-radio>
              </v-radio-group>
            </v-flex>

            <!-- Driver -->
            <v-flex xs12 sm6 lg4>
              <span class="dark--text">Driver:</span>
              <v-radio-group
                row
                v-model="driver"
                :rules="[rules.required]"
                required>
                <v-radio
                  v-for="(driver, idx) in drivers"
                  :key="idx"
                  :label="driver"
                  :value="driver[idx]"
                >
                </v-radio>
              </v-radio-group>
            </v-flex>

            <!-- Result -->
            <v-flex xs12 sm6 lg4>
              <span class="dark--text">Result:</span>
              <v-radio-group
                row
                v-model="result"
                :rules="[rules.required]"
                required>
                <v-radio
                  v-for="(result, idx) in results"
                  :key="idx"
                  :label="result"
                  :value="results[idx]">
                </v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Split Times</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- 60' -->
              <v-text-field
                v-model="time60"
                :rules="[rules.number]"
                outline
                label="60'"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- 330' -->
              <v-text-field
                v-model="time330"
                :rules="[rules.number]"
                outline
                label="330'"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- 660' -->
              <v-text-field
                v-model="time660"
                :rules="[rules.number]"
                outline
                label="660'"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- 1000' -->
              <v-text-field
                v-model="time1000"
                :rules="[rules.number]"
                outline
                label="1000'"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- 1320' -->
              <v-text-field
                v-model="time1320"
                :rules="[rules.number]"
                outline
                label="1320'"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Actual' -->
              <v-text-field
                v-model="timeActual"
                :rules="[rules.number]"
                outline
                label="Actual'"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Split Speeds</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- 660' -->
              <v-text-field
                v-model="speed660"
                :rules="[rules.number]"
                outline
                label="660'"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- 1320' -->
              <v-text-field
                v-model="speed1320"
                :rules="[rules.number]"
                outline
                label="1320'"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Car Adjustments</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- Primary Jet -->
              <v-text-field
                v-model="primaryJet"
                :rules="[rules.number]"
                outline
                label="Primary Jet"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Secondary Jet -->
              <v-text-field
                v-model="secondaryJet"
                :rules="[rules.number]"
                outline
                label="Secondary Jet"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Squirter Size -->
              <v-text-field
                v-model="squirterSize"
                :rules="[rules.number]"
                outline
                label="Squirter Size"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Pilot Jet -->
              <v-text-field
                v-model="pilotJet"
                :rules="[rules.number]"
                outline
                label="Pilot Jet"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Needle -->
              <v-text-field
                v-model="needle"
                :rules="[rules.number]"
                outline
                label="Needle"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Clip Position -->
              <v-text-field
                v-model="clipPosition"
                :rules="[rules.number]"
                outline
                label="Clip Position"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Slide -->
              <v-text-field
                v-model="slide"
                :rules="[rules.number]"
                outline
                label="Slide"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Idle Screw -->
              <v-text-field
                v-model="idleScrew"
                :rules="[rules.number]"
                outline
                label="Idle Screw "
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Air Screw -->
              <v-text-field
                v-model="airScrew"
                :rules="[rules.number]"
                outline
                label="Air Screw"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Gearing</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- Primary Gear -->
              <v-text-field
                v-model="primaryGear"
                :rules="[rules.number]"
                outline
                label="Primary Gear"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Secondary Gear -->
              <v-text-field
                v-model="secondaryGear"
                :rules="[rules.number]"
                outline
                label="Secondary Gear"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Throttle Stop Adjustments</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- Timer 1 -->
              <v-text-field
                v-model="timer1"
                :rules="[rules.number]"
                outline
                label="Timer 1"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 2 -->
              <v-text-field
                v-model="timer2"
                :rules="[rules.number]"
                outline
                label="Timer 2"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 3 -->
              <v-text-field
                v-model="timer3"
                :rules="[rules.number]"
                outline
                label="Timer 3"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 4 -->
              <v-text-field
                v-model="timer4"
                :rules="[rules.number]"
                outline
                label="Timer 4"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 5 -->
              <v-text-field
                v-model="timer5"
                :rules="[rules.number]"
                outline
                label="Timer 5"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 6 -->
              <v-text-field
                v-model="timer6"
                :rules="[rules.number]"
                outline
                label="Timer 6"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 7 -->
              <v-text-field
                v-model="timer7"
                :rules="[rules.number]"
                outline
                label="Timer 7"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Timer 8 -->
              <v-text-field
                v-model="timer8"
                :rules="[rules.number]"
                outline
                label="Timer 8"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Delay Box Settings</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- Delay Time -->
              <v-text-field
                v-model="delayTime"
                :rules="[rules.number]"
                outline
                label="Delay Time"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- RPM Shift Value -->
              <v-text-field
                v-model="rpmShiftValue"
                :rules="[rules.number]"
                outline
                label="RPM Shift Value"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Time Shift Value 1 -->
              <v-text-field
                v-model="timeShiftValue1"
                :rules="[rules.number]"
                outline
                label="Time Shift Value 1"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Time Shift Value 2 -->
              <v-text-field
                v-model="timeShiftValue2"
                :rules="[rules.number]"
                outline
                label="Time Shift Value 2"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Suspension Settings</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs6>
              <!-- Strut Setting -->
              <v-text-field
                v-model="strutSetting"
                :rules="[rules.number]"
                outline
                label="Strut Setting"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Rear Shock Compress -->
              <v-text-field
                v-model="rearShockCompress"
                :rules="[rules.number]"
                outline
                label="Rear Shock Compress"
                hide-details
              >
              </v-text-field>
            </v-flex>
            <v-flex xs6>
              <!-- Rear Shock Rebound -->
              <v-text-field
                v-model="rearShockRebound"
                :rules="[rules.number]"
                outline
                label="Rear Shock Rebound"
                hide-details
              >
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>

        <v-subheader>Other</v-subheader>
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <!-- Notes -->
            <v-flex xs12>
              <v-textarea
                v-model="notes"
                label="Notes"
                maxlength="250"
                counter
                auto-grow
                box>
              </v-textarea>
            </v-flex>
          </v-layout>
        </v-container>
      </v-list>
    </v-form>
  </v-card>
</template>

<script>
export default {
  name: 'RecordRun',
  data: () => ({
    valid: true,

    // General
    location: null,

    date: null,
    dateFormatted: null,
    dateSelector: false,

    time: null,
    timeFormatted: null,
    timeSelector: false,

    runNumber: null,
    reaction: null,
    dialIn: null,

    lane: null,
    lanes: [
      'Right',
      'Left'
    ],

    driver: null,
    drivers: [
      'Jerry',
      'Sylar',
      'Other'
    ],

    result: null,
    results: [
      'Win',
      'Loss',
      'Time Trial'
    ],

    // Split Times
    time60: null,
    time330: null,
    time660: null,
    time1000: null,
    time1320: null,
    timeActual: null,

    // Split Speeds
    speed660: null,
    speed1320: null,

    // Car Adustments
    primaryJet: null,
    secondaryJet: null,
    squirterSize: null,
    pilotJet: null,
    needle: null,
    clipPosition: null,
    slide: null,
    idleScrew: null,
    airScrew: null,

    // Gearing
    primaryGear: null,
    secondaryGear: null,

    // Throttle Stop Adustments
    timer1: null,
    timer2: null,
    timer3: null,
    timer4: null,
    timer5: null,
    timer6: null,
    timer7: null,
    timer8: null,

    // Delay Box Settings
    delayTime: null,
    rpmShiftValue: null,
    timeShiftValue1: null,
    timeShiftValue2: null,

    // Suspension Settings
    strutSetting: null,
    rearShockCompress: null,
    rearShockRebound: null,

    // Other
    notes: null,

    rules: {
      required: val => !!val || 'Required',
      number: val => {
        const re = /^\d+(\.\d+)?$/
        if(val)
          return re.test(val) || 'Invalid'
        else
          return true
      }
    }
  }),
  watch: {
    date() {
      this.dateFormatted = this.formatDate(this.date)
    },
    time() {
      this.timeFormatted = this.formatTime(this.time)
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    formatTime(time) {
      if (!time) return null

      const [hr, min] = time.split(':')
      var hour = Number(hr)
      var minute = Number(min)
      var isAm

      if (hour === 0) {
        hour = 12
        isAm = true
      } else if (hour > 0) {
        isAm = true
      } else if (hour > 12) {
        hour -= 12
        isAm = false
      }

      return `${hour}:${minute} ${isAm ? "AM" : "PM"}`
    },
    save() {
      if (this.$refs.form.validate()) {
        // Create a new run object
        const run = {
          location: this.location,
          datetime: new Date(this.date + " " + this.time),
          runNumber: this.runNumber,
          reaction: this.reaction,
          dialIn: this.dialIn,
          lane: this.lane,
          driver: this.driver,
          result: this.result,
          splitTimes: {
            at60: this.time60,
            at330: this.time330,
            at660: this.time660,
            at1000: this.time1000,
            at1320: this.time1320,
            actual: this.actualEt
          },
          splitSpeeds: {
            at660: this.speed660,
            at1320: this.speed1320
          },
          carAdjustments: {
            primaryJet: this.primaryJet,
            secondaryJet: this.secondaryJet,
            squirterSize: this.squirterSize,
            pilotJet: this.pilotJet,
            needle: this.needle,
            clipPosition: this.clipPosition,
            slide: this.slide,
            idleScrew: this.idleScrew,
            airScrew: this.airScrew
          },
          gearing: {
            primaryGear: this.primaryGear,
            secondaryGear: this.secondaryGear
          },
          throttleStopAdjustments: {
            timer1: this.timer1,
            timer2: this.timer2,
            timer3: this.timer3,
            timer4: this.timer4,
            timer5: this.timer5,
            timer6: this.timer6,
            timer7: this.timer7,
            timer8: this.timer8
          },
          delayBoxSettings: {
            delayTime: this.delayTime,
            rpmShiftValue: this.rpmShiftValue,
            timeShiftValue1: this.timeShiftValue1,
            timeShiftValue2: this.timeShiftValue2
          },
          suspensionSettings: {
            strutSetting: this.strutSetting,
            rearShockCompress: this.rearShockCompress,
            rearShockRebound: this.rearShockRebound
          },

          notes: this.notes
        }

        // TODO
        // db.collection('runs').add(run).then(() => {
        //   this.reset()
        // })

        this.$emit('close')
        this.reset()
      }
    },
    close() {
      this.$emit('close')
      this.reset()
    },
    reset() {
      this.$refs.form.reset()
      // TODO:
      // document.getElementById('popup-content').scrollTop = 0
    }
  }
}
</script>
