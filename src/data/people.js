const base = 'https://www.uni.lu/fhse-en/people/';
export const people = [
  { group: 'Head of institute', name: 'Luc Nijs', role: 'Associate professor in Early Childhood Music Education', page: base + 'luc-nijs/', photo: '/images/people/luc-nijs.jpg' },
  { group: 'Researchers', name: 'Solomiya Moroz', role: 'Postdoctoral researcher', page: base + 'solomiya-moroz/', photo: '/images/people/solomiya-moroz.jpg' },
  { group: 'Researchers', name: 'Bahareh Behzadaval', role: 'Doctoral researcher', page: base + 'bahareh-behzadaval/', photo: '/images/people/bahareh-behzadaval.jpg' },
  { group: 'Researchers', name: 'Laura Serra Marin', role: 'Doctoral researcher', page: base + 'laura-serra-marin/', photo: '/images/people/laura-serra-marin.jpg' },
];
export const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');
