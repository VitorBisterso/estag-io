// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import { Internship } from '@/models/internships';

// eslint-disable-next-line import/prefer-default-export
export function mockInternships(amount: number): Array<Internship> {
   return Array.from({ length: amount }, (_, index) => ({
      id: index,
      student: {
         id: index,
         name: faker.person.fullName(),
      },
      initialDate: faker.date.soon({ days: 30 }).toISOString(),
      until: faker.date.future({ years: 1 }).toISOString(),
      managerName: faker.person.fullName(),
      advisorName: faker.person.fullName(),
      job: {
         id: 0,
         title: faker.word.words(5),
         type: index % 2 === 0 ? 'REMOTE' : 'LOCAL',
         company: {
            name: faker.company.name(),
         },
         salary: Number(faker.commerce.price({ min: 1000, max: 3000 })),
         weeklyWorkload: index % 2 === 0 ? 24 : 30,
      },
   }));
}
