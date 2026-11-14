import { build } from './helpers'

export const physics = build('physics', 'p', [
  ['What is the SI unit of force?', ['Joule', 'Watt', 'Newton', 'Pascal'], 2, 'Force = mass × acceleration, measured in kg·m/s², which is called the Newton (N).'],
  ['The approximate speed of light in a vacuum is', ['3 × 10⁶ m/s', '3 × 10⁸ m/s', '3 × 10⁵ m/s', '3 × 10¹⁰ m/s'], 1, 'Light travels at about 300,000 km/s, which is 3 × 10⁸ m/s.'],
  ['Which of the following is a vector quantity?', ['Speed', 'Mass', 'Velocity', 'Time'], 2, 'Velocity has both magnitude and direction. Speed, mass and time have magnitude only.'],
  ['The SI unit of energy is the', ['Watt', 'Joule', 'Newton', 'Pascal'], 1, 'Energy and work are both measured in joules (J).'],
  ['The SI unit of power is the', ['Watt', 'Joule', 'Pascal', 'Hertz'], 0, 'Power is the rate of doing work: 1 watt = 1 joule per second.'],
  ['A car accelerates from rest to 20 m/s in 5 s. What is its acceleration?', ['2 m/s²', '4 m/s²', '5 m/s²', '100 m/s²'], 1, 'a = (v − u)/t = (20 − 0)/5 = 4 m/s².'],
  ['A 4 Ω resistor carries a current of 3 A. What is the potential difference across it?', ['0.75 V', '7 V', '12 V', '1.33 V'], 2, "Ohm's law: V = IR = 3 × 4 = 12 V."],
  ['Which of these is a good conductor of heat?', ['Wood', 'Rubber', 'Plastic', 'Copper'], 3, 'Metals such as copper have many free electrons that carry heat energy quickly.'],
  ['Which mirror always forms an upright, diminished, virtual image?', ['Concave', 'Plane', 'Convex', 'Parabolic'], 2, 'A convex mirror diverges light, so images are always virtual, upright and smaller. This is why it is used as a car side mirror.'],
  ['A wave has a period of 0.02 s. What is its frequency?', ['0.02 Hz', '2 Hz', '50 Hz', '200 Hz'], 2, 'f = 1/T = 1/0.02 = 50 Hz.'],
  ['Which of these is NOT an electromagnetic wave?', ['Radio wave', 'X-ray', 'Sound wave', 'Visible light'], 2, 'Sound is a mechanical wave and needs a medium. Electromagnetic waves can travel through a vacuum.'],
  ['A force of 200 N acts on an area of 0.5 m². What is the pressure?', ['100 Pa', '400 Pa', '200 Pa', '0.0025 Pa'], 1, 'Pressure = force/area = 200/0.5 = 400 Pa.'],
  ['How much work is done when a force of 10 N moves an object 5 m in its own direction?', ['2 J', '15 J', '50 J', '5 J'], 2, 'Work = force × distance = 10 × 5 = 50 J.'],
  ['Heat transfer in liquids and gases mainly occurs by', ['Conduction', 'Convection', 'Radiation', 'Evaporation'], 1, 'In fluids, warmer parts rise and cooler parts sink, setting up convection currents.'],
  ['Which lens is used to correct short-sightedness?', ['Convex', 'Concave', 'Plane', 'Cylindrical'], 1, 'A concave (diverging) lens spreads light so the image falls correctly on the retina.'],
  ['Find the kinetic energy of a 2 kg object moving at 3 m/s.', ['6 J', '9 J', '18 J', '12 J'], 1, 'KE = ½mv² = ½ × 2 × 3² = 9 J.'],
  ["Newton's first law of motion is also called the law of", ['Acceleration', 'Action and reaction', 'Gravitation', 'Inertia'], 3, 'It states that an object stays at rest or moves uniformly unless an external force acts on it. This tendency is inertia.'],
  ['The charge carriers in a metallic conductor are', ['Protons', 'Neutrons', 'Electrons', 'Ions'], 2, 'Metals have free electrons that drift to form an electric current.'],
  ['A device that converts mechanical energy into electrical energy is a', ['Motor', 'Generator', 'Transformer', 'Rectifier'], 1, 'A generator turns a coil in a magnetic field to produce electricity. A motor does the opposite.'],
  ['A body of mass 500 g has a volume of 250 cm³. What is its density?', ['0.5 g/cm³', '2 g/cm³', '125 g/cm³', '250 g/cm³'], 1, 'Density = mass/volume = 500/250 = 2 g/cm³.'],
])