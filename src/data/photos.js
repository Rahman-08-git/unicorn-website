/*
  Photographs. Every one is a licensed stand-in from Wikimedia Commons (credits on /credits/),
  chosen to show the materials of hands-on learning without passing anyone off as
  Unicorn Learning Lab's own learners or staff. Replace them with the lab's own photographs
  as they become available: keep the key, change the files, width, height and alt.
*/
const img = (id) => `/assets/img/photo-${id}`

const photo = (id, width, height, alt, subject, big = 1920) => ({
  src: `${img(id)}.webp`,
  srcSet: `${img(id)}-500.webp 500w, ${img(id)}-960.webp 960w, ${img(id)}.webp 1280w, ${img(id)}-1920.webp ${big}w`,
  width,
  height,
  alt,
  subject,
})

export const PHOTOS = {
  microscope: photo('f113354322', 1280, 727, 'A microscope beside a rack of test tubes and flasks of red, green, yellow and blue liquid', 'science equipment'),
  circuit: photo('f128474532', 1280, 962, 'Multimeter probes testing a small circuit with a red LED on a breadboard', 'electronics on a breadboard'),
  soldering: photo('f4071999', 1280, 853, 'Fingers guiding a soldering tool onto a tiny component on a green circuit board', 'soldering a circuit board'),
  pencilWheel: photo('f2915474', 1280, 853, 'Coloured pencils laid in a full circle, their points meeting in the middle', 'coloured pencils', 1884),
  pencilRow: photo('f57965238', 1280, 853, 'A fan of sharpened coloured pencils on a wooden table', 'coloured pencils'),
  origami: photo('f3244373', 1280, 780, 'Two folded paper cranes, one plain and one red with white dots', 'origami cranes'),
  seedling: photo('f93473375', 1280, 962, 'A young seedling with two leaves growing out of red soil', 'a seedling'),
  glassware: photo('f126591287', 1280, 1008, 'Glass laboratory apparatus with taps and tubes laid out on a white surface', 'laboratory glassware'),
}
