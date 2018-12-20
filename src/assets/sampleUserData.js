const sampleUserData = {
  trainingData: {
    '11/19/2018': {
      type: 'Power',
      description: 'Hangboard, 7on 3off, x10, 3min rest',
      completed: true
    },
    '11/21/2018': {
      type: 'Fitness',
      description: 'Ring core, 7 flys, x5, 2min rest',
      completed: false
    }
  },
  projects: [
    {
      name: 'Big Worm',
      grade: 14,
      location: 'Mt. Evans, CO',
      caption: 'Really psyched on this one, sweet compression on awesome holds. Not necessarily my style but I had a lot of fun on it the first session and the setting is unreal.',
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
      grade: 13,
      location: 'RMNP, CO',
      caption: 'Really psyched on this one, sweet compression on awesome holds. Not necessarily my style but I had a lot of fun on it the first session and the setting is unreal.',
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
      name: 'Nuthin\' But Sunshine',
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