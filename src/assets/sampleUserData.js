const sampleUserData = {
  trainingData: {
    '12/13/18': {
      type: 'Power',
      description: 'Hangboard, 7on 3off, x10, 3min rest',
      completed: true
    },
    '12/15/18': {
      type: 'Fitness',
      description: 'Ring core, 7 flys, x5, 2min rest',
      completed: false
    }
  },
  projects: [
    {
      name: 'Big Worm',
      grade: 'V14',
      location: 'Mt. Evans, CO',
      priority: 9,
      movesTotal: 20,
      movesDone: 20,
      highPoint: 10,
      season: 'Summer',
      sent: false,
      sessions: [
        {
          date: '8/25/18',
          entry: 'High point today, made it to the right hand bump move!'
        },
        {
          date: '9/12/18',
          entry: 'About the same, thinking I am ready to call it for the season on this one, while I still have some motivation to come back next year!'
        }
      ]
    },
    {
      name: 'Top Notch',
      grade: 'V13',
      location: 'RMNP, CO',
      priority: 7,
      movesTotal: 7,
      movesDone: 5,
      highPoint: 0,
      season: 'Summer',
      sent: false,
      sessions: [
        {
          date: '8/25/18',
          entry: 'High point today, made it to the right hand bump move!'
        },
        {
          date: '9/12/18',
          entry: 'About the same, thinking I am ready to call it for the season on this one, while I still have some motivation to come back next year!'
        }
      ]
    }
  ],
  ascents: [
    {
      name: 'William Shatner',
      grade: 12,
      location: 'Newlin Creek, CO',
      entry: 'Yay, I did it!'
    },
    {
      name: 'Nuthin But Sunshine',
      grade: 13,
      location: 'RMNP, CO',
      entry: 'Finally!'
    },
    {
      name: 'Sabretooth',
      grade: 13,
      location: 'Thunder Ridge, CO',
      entry: 'FA!'
    },
    {
      name: 'Casualties of a Dice Game',
      grade: 10,
      location: 'Newlin Creek, CO',
      entry: 'Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry Long entry'
    }
  ]
}

export default sampleUserData