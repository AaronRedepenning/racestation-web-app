import XLSX from 'xlsx'

const sheetFormat = [
  // Run Number
  {
    header: 'Run Number',
    value: {
      key: 'runNumber'
    }
  },
  {
    header: ''
  },

  // Weather Information
  {
    header: 'Weather Information'
  },
  {
    header: 'Density Altitude - DA'
  },
  {
    header: 'Adjusted Altitude - AA'
  },
  {
    header: 'Temperature'
  },
  {
    header: 'Humidity'
  },
  {
    header: 'Barometric Pressure'
  },
  {
    header: 'Water Grains'
  },
  {
    header: 'Light Value'
  },
  {
    header: 'Wind Speed'
  },
  {
    header: 'Wind Direction'
  },
  {
    header: ''
  },

  // Other Details
  {
    header: 'Other Details'
  },
  {
    header: 'Location',
    value: {
      key: 'location'
    }
  },
  {
    header: 'Date'
  },
  {
    header: 'Time'
  },
  {
    header: 'Reaction Time',
    value: {
      key: 'reaction'
    }
  },
  {
    header: 'Dial in',
    value: {
      key: 'dialIn'
    }
  },
  {
    header: 'Lane',
    value: {
      key: 'lane'
    }
  },
  {
    header: 'Driver',
    value: {
      key: 'driver'
    }
  },
  {
    header: 'Result',
    value: {
      key: 'result'
    }
  },
  {
    header: ''
  },

  // Elapsed Time
  {
    header: 'Elaspsed Time'
  },
  {
    header: "60' ET",
    value: {
      key: 'splitTimes.at60'
    }
  },
  {
    header: "330' ET",
    value: {
      key: 'splitTimes.at330'
    }
  },
  {
    header: "660' ET",
    value: {
      key: 'splitTimes.at660'
    }
  },
  {
    header: "1000' ET",
    value: {
      key: 'splitTimes.at1000'
    }
  },
  {
    header: "1320' ET",
    value: {
      key: 'splitTimes.at1320'
    }
  },
  {
    header: 'Actual ET',
    value: {
      key: 'splitTimes.actual'
    }
  },
  {
    header: "660' MPH",
    value: {
      key: 'splitSpeeds.at660'
    }
  },
  {
    header: "1320' MPH",
    value: {
      key: 'splitTimes.at1320'
    }
  },
  {
    header: ''
  },

  // Car Adjustments
  {
    header: 'Car Adjustments'
  },
  {
    header: 'Primary Jet',
    value: {
      key: 'carAdjustments.primaryJet'
    }
  },
  {
    header: 'Secondary Jet',
    value: {
      key: 'carAdjustments.secondaryJet'
    }
  },
  {
    header: 'Squirter size',
    value: {
      key: 'carAdjustments.squirterSize'
    }
  },
  {
    header: 'Pilot Jet',
    value: {
      key: 'carAdjustments.pilotJet'
    }
  },
  {
    header: 'Nozzle'
    // TODO
  },
  {
    header: 'Needle',
    value: {
      key: 'carAdjustments.needle'
    }
  },
  {
    header: 'Clip position',
    value: {
      key: 'carAdjustments.clipPosition'
    }
  },
  {
    header: 'Slide',
    value: {
      key: 'carAdjustments.slide'
    }
  },
  {
    header: 'Idle Screw - Turns out',
    value: {
      key: 'carAdjustments.idleScrew'
    }
  },
  {
    header: 'Air screw - Turns out',
    value: {
      key: 'carAdjustments.airScrew'
    }
  },
  {
    header: ''
  },

  // Gearing
  {
    header: 'Gearing'
  },
  {
    header: 'Primary Gear',
    value: {
      key: 'gearing.primaryGear'
    }
  },
  {
    header: 'Secondary Gear',
    value: {
      key: 'gearing.secondaryGear'
    }
  },
  {
    header: ''
  },

  // Throttle Stop Adjustments
  {
    header: 'Throttle Stop Adjustments'
  },
  {
    header: 'Timer 1',
    value: {
      key: 'throttleStopAdjustments.timer1'
    }
  },
  {
    header: 'Timer 2',
    value: {
      key: 'throttleStopAdjustments.timer2'
    }
  },
  {
    header: 'Timer 3',
    value: {
      key: 'throttleStopAdjustments.timer3'
    }
  },
  {
    header: 'Timer 4',
    value: {
      key: 'throttleStopAdjustments.timer4'
    }
  },
  {
    header: 'Timer 5',
    value: {
      key: 'throttleStopAdjustments.timer5'
    }
  },
  {
    header: 'Timer 6',
    value: {
      key: 'throttleStopAdjustments.timer6'
    }
  },
  {
    header: 'Timer 7',
    value: {
      key: 'throttleStopAdjustments.timer7'
    }
  },
  {
    header: 'Timer 8',
    value: {
      key: 'throttleStopAdjustments.timer8'
    }
  },
  {
    header: ''
  },

  // Delay Box Settings
  {
    header: 'Delay Box Settings'
  },
  {
    header: 'Delay Time',
    value: {
      key: 'delayBoxSettings.delayTime'
    }
  },
  {
    header: 'RPM Shift Value',
    value: {
      key: 'delayBoxSettings.rpmShiftValue'
    }
  },
  {
    header: 'Time Shift Value 1',
    value: {
      key: 'delayBoxSettings.timeShiftValue1'
    }
  },
  {
    header: 'Time Shift Value 2',
    value: {
      key: 'delayBoxSettings.timeShiftValue2'
    }
  },
  {
    header: ''
  },

  // Suspension Settings
  {
    header: 'Suspension settings'
  },
  {
    header: 'Strut Setting',
    value: {
      key: 'suspensionSettings.strutSetting'
    }
  },
  {
    header: 'Rear Shock Compress',
    value: {
      key: 'delayBoxSettings.rearShockCompress'
    }
  },
  {
    header: 'Rear Shock Rebound',
    value: {
      key: 'delayBoxSettings.rearShockRebound'
    }
  },
  {
    header: ''
  },

  // Notes
  {
    header: 'Notes',
    value: {
      key: 'notes'
    }
  }
]

var CSV = {}

CSV.export = function (runs) {
  var sheet = [[]]

  sheetFormat.forEach((element, n) => {
    var row = []
    row.push(element.header)

    if ('value' in element) {
      runs.forEach((run) => {
        row.push(run[element.value.key])
      })
    }

    sheet.push(row)
  })

  // Create worksheet
  var ws = XLSX.utils.aoa_to_sheet(sheet)

  // Create workbook
  var wb = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  // Export the workbook
  XLSX.writeFile(wb, 'export.xlsx')
}

export default CSV
