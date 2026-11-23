const base = 'https://www.uni.lu/fhse-en/people/';
export const people = [
  { group: 'Head of institute', name: 'Luc Nijs', role: 'Associate professor in Early Childhood Music Education', photo: '/images/luc-nijs.jpg', page: base + 'luc-nijs/' },
  { group: 'Researchers', name: 'Solomiya Moroz', role: 'Postdoctoral researcher', page: base + 'solomiya-moroz/' },
  { group: 'Researchers', name: 'Bahareh Behzadaval', role: 'Doctoral researcher', page: base + 'bahareh-behzadaval/' },
  { group: 'Researchers', name: 'Laura Serra Marin', role: 'Doctoral researcher', page: base + 'laura-serra-marin/' },
  { group: 'Administrative staff', name: 'Satoko Bizzotto', role: 'Research facilitator', page: base + 'satoko-bizzotto/' },
  { group: 'Administrative staff', name: 'Michèle Schmitt', role: 'Administrative assistant', page: base + 'michele-schmitt/' },
];
export const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
