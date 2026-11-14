import { build } from './helpers'

export const math = build('math', 'm', [
  ['Simplify 3/4 + 5/8.', ['8/12', '11/8', '15/32', '7/4'], 1, 'Convert 3/4 to eighths: 6/8. Then 6/8 + 5/8 = 11/8.'],
  ['Express 0.00045 in standard form.', ['4.5 × 10⁻⁴', '4.5 × 10⁻³', '45 × 10⁻⁵', '4.5 × 10⁴'], 0, 'Move the decimal point 4 places to the right to get 4.5, so the index is −4.'],
  ['If 3x − 7 = 11, find x.', ['4', '6', '18', '−6'], 1, 'Add 7 to both sides: 3x = 18. Divide by 3: x = 6.'],
  ['Find the HCF of 24 and 36.', ['6', '12', '24', '72'], 1, '24 = 2³ × 3 and 36 = 2² × 3². Common factors: 2² × 3 = 12.'],
  ['Find the LCM of 4, 6 and 10.', ['12', '30', '60', '120'], 2, '4 = 2², 6 = 2 × 3, 10 = 2 × 5. LCM = 2² × 3 × 5 = 60.'],
  ['A radio bought for ₦8,000 is sold for ₦9,200. Find the percentage profit.', ['12%', '15%', '13%', '10%'], 1, 'Profit = 9,200 − 8,000 = ₦1,200. Percentage profit = 1,200/8,000 × 100 = 15%.'],
  ['Find the simple interest on ₦5,000 at 8% per annum for 3 years.', ['₦1,200', '₦400', '₦1,000', '₦2,400'], 0, 'I = PRT/100 = 5,000 × 8 × 3 / 100 = ₦1,200.'],
  ['Solve x² − 5x + 6 = 0.', ['x = 2 or 3', 'x = −2 or −3', 'x = 1 or 6', 'x = −1 or 6'], 0, 'Factorise: (x − 2)(x − 3) = 0, so x = 2 or x = 3.'],
  ['Factorise x² − 9.', ['(x − 3)²', '(x + 3)(x − 3)', '(x + 9)(x − 1)', '(x − 9)(x + 1)'], 1, 'This is a difference of two squares: a² − b² = (a + b)(a − b).'],
  ['Find the gradient of the line through (1, 2) and (3, 8).', ['2', '3', '4', '1/3'], 1, 'Gradient = (8 − 2)/(3 − 1) = 6/2 = 3.'],
  ['What is the sum of the interior angles of a hexagon?', ['540°', '720°', '900°', '360°'], 1, 'Sum = (n − 2) × 180° = (6 − 2) × 180° = 720°.'],
  ['Find the area of a triangle with base 12 cm and height 5 cm.', ['60 cm²', '30 cm²', '17 cm²', '25 cm²'], 1, 'Area = ½ × base × height = ½ × 12 × 5 = 30 cm².'],
  ['Find the circumference of a circle of radius 7 cm. (π = 22/7)', ['22 cm', '44 cm', '154 cm', '14 cm'], 1, 'C = 2πr = 2 × 22/7 × 7 = 44 cm.'],
  ['Find the volume of a cuboid measuring 5 cm by 4 cm by 3 cm.', ['12 cm³', '47 cm³', '60 cm³', '94 cm³'], 2, 'Volume = length × width × height = 5 × 4 × 3 = 60 cm³.'],
  ['A fair die is tossed once. What is the probability of getting a prime number?', ['1/6', '1/3', '1/2', '2/3'], 2, 'Prime numbers on a die are 2, 3 and 5, so 3 out of 6 outcomes: 3/6 = 1/2.'],
  ['Find the mean of 2, 4, 6, 8 and 10.', ['5', '6', '7', '8'], 1, 'Sum = 30. Mean = 30 ÷ 5 = 6.'],
  ['Find the median of 3, 7, 5, 9 and 1.', ['5', '7', '4.5', '9'], 0, 'Arrange in order: 1, 3, 5, 7, 9. The middle value is 5.'],
  ['Evaluate 2³ × 2².', ['10', '25', '32', '64'], 2, 'Add the indices when multiplying the same base: 2^(3+2) = 2⁵ = 32.'],
  ['Simplify √48.', ['4√3', '2√6', '6√2', '3√4'], 0, '√48 = √(16 × 3) = √16 × √3 = 4√3.'],
  ['y varies directly as x. If y = 12 when x = 4, find y when x = 7.', ['18', '21', '28', '15'], 1, 'y = kx, so k = 12/4 = 3. When x = 7, y = 3 × 7 = 21.'],
])