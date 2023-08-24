const adjectives: string[] = [
   'Dedicado(a)',
   'Curioso(a)',
   'Inteligente',
   'Criativo(a)',
   'Empenhado(a)',
   'Entusiasta',
   'Determinado(a)',
   'Motivado(a)',
   'Organizado(a)',
   'Persistente',
   'Analítico(a)',
   'Talentoso(a)',
   'Proativo(a)',
   'Colaborativo(a)',
   'Comunicativo(a)',
   'Resiliente',
   'Empenhado(a)',
   'Flexível',
   'Inspirador(a)',
   'Empreendedor(a)',
];

// eslint-disable-next-line import/prefer-default-export
export function getRandomName(studentLabel: string): string {
   const randomIndex: number = Math.floor(Math.random() * adjectives.length);
   return `${studentLabel} ${adjectives[randomIndex]}`;
}
