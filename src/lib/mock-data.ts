import type { TargetFact } from '@/types';

export const destinations: TargetFact[] = [
  {
    id: 'earth',
    name: 'Earth',
    type: 'planet',
    description: 'Our home planet, the only place known to harbor life. A pale blue dot in the vastness of space.',
    facts: {
      'Diameter': '12,742 km',
      'Day Length': '24 hours',
      'Orbital Period': '365.25 days',
      'Surface Gravity': '9.807 m/s²',
      'Moons': 1,
    },
    assets: [
      { id: 'asset-earth-1', source: 'Generated', url: 'https://placehold.co/1200x800.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA/JPL-Caltech', description: 'View of Earth from space, showing continents and oceans.' },
      { id: 'asset-earth-2', source: 'Generated', url: 'https://placehold.co/600x400.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA', description: 'The Aurora Borealis as seen from the International Space Station.'},
      { id: 'asset-earth-3', source: 'Generated', url: 'https://placehold.co/600x400.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA', description: 'A swirling hurricane over the ocean.'},
    ],
    events: [
      { date: '2024-04-22', title: 'Lyrid Meteor Shower Peak', source: 'NASA' },
    ],
    missions: [
      { name: 'International Space Station', status: 'Ongoing', url: '#' },
      { name: 'Hubble Space Telescope', status: 'Ongoing', url: '#' },
    ],
  },
  {
    id: 'mars',
    name: 'Mars',
    type: 'planet',
    description: 'The "Red Planet," known for its iron-oxide-rich soil, polar ice caps, and potential for past life.',
    facts: {
      'Diameter': '6,779 km',
      'Day Length': '24.6 hours',
      'Orbital Period': '687 Earth days',
      'Surface Gravity': '3.721 m/s²',
      'Moons': 2,
    },
    assets: [
      { id: 'asset-mars-1', source: 'Generated', url: 'https://placehold.co/1200x800.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA/JPL-Caltech', description: 'A detailed mosaic of Mars showing its reddish surface and polar caps.' },
      { id: 'asset-mars-2', source: 'Generated', url: 'https://placehold.co/600x400.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA/JPL-Caltech', description: 'The surface of Mars as seen by the Curiosity rover.' },
      { id: 'asset-mars-3', source: 'Generated', url: 'https://placehold.co/600x400.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA/JPL-Caltech', description: 'A Martian sunset, with the sun appearing smaller and bluer than on Earth.' },
    ],
    events: [],
    missions: [
      { name: 'Perseverance Rover', status: 'Ongoing', url: '#' },
      { name: 'Curiosity Rover', status: 'Ongoing', url: '#' },
    ],
  },
  {
    id: 'proxima-centauri-b',
    name: 'Proxima Centauri b',
    type: 'exoplanet',
    description: 'The closest known exoplanet to the Solar System, orbiting within the habitable zone of the red dwarf star Proxima Centauri.',
    facts: {
      'Distance': '4.24 light-years',
      'Discovered': 2016,
      'Mass': '1.17 Earths',
      'Orbital Period': '11.2 Earth days',
      'Host Star': 'Proxima Centauri',
    },
    assets: [
      { id: 'asset-proxima-1', source: 'Generated', url: 'https://placehold.co/1200x800.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'CC-BY 4.0', credit: 'ESO/M. Kornmesser', description: "An artist's impression of Proxima Centauri b." },
    ],
    events: [
      { date: '2016-08-24', title: 'Discovery Announced', source: 'ESO' },
    ],
    missions: [
        { name: 'James Webb Space Telescope', status: 'Observing', url: '#' }
    ],
  },
  {
    id: 'orion-nebula',
    name: 'Orion Nebula (M42)',
    type: 'nebula',
    description: 'A stellar nursery and one of the brightest nebulae, visible to the naked eye in the night sky.',
    facts: {
      'Distance': '1,344 light-years',
      'Apparent Magnitude': '4.0',
      'Constellation': 'Orion',
      'Radius': '12 light-years',
      'Age': 'Approx. 3 million years'
    },
    assets: [
      { id: 'asset-orion-1', source: 'Generated', url: 'https://placehold.co/1200x800.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA, ESA, M. Robberto (STScI/ESA) and the Hubble Space Telescope Orion Treasury Project Team', description: 'A stunning composite image of the Orion Nebula from Hubble.' },
    ],
    events: [],
    missions: [],
  },
  {
    id: 'andromeda-galaxy',
    name: 'Andromeda Galaxy (M31)',
    type: 'galaxy',
    description: 'The nearest major galaxy to the Milky Way, on a collision course with our own galaxy in about 4.5 billion years.',
    facts: {
        'Distance': '2.537 million light-years',
        'Type': 'Spiral',
        'Diameter': '220,000 light-years',
        'Number of Stars': '1 trillion',
        'Constellation': 'Andromeda',
    },
    assets: [
        { id: 'asset-andromeda-1', source: 'Generated', url: 'https://placehold.co/1200x800.png', thumbnailUrl: 'https://placehold.co/400x300.png', license: 'Public Domain', credit: 'NASA/JPL-Caltech', description: 'A wide-field view of the Andromeda Galaxy.' },
    ],
    events: [],
    missions: [],
  }
];

export const featuredDestinations = destinations.slice(0, 4);

export const getDestinationById = (id: string) => {
  return destinations.find(dest => dest.id === id);
};
