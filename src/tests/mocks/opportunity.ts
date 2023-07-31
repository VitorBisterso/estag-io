// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from '@faker-js/faker';

import { Opportunity } from '@/models/opportunities';

// eslint-disable-next-line import/prefer-default-export
export function mockOpportunities(amount: number): Array<Opportunity> {
   return Array.from({ length: amount }, (_, index) => {
      const isEven = index % 2 === 0;
      return {
         id: index,
         title: faker.word.noun(3),
         description: faker.word.words(20),
         type: isEven ? 'REMOTE' : 'LOCAL',
         salary: Number(faker.commerce.price({ min: 1000, max: 3000 })),
         deadline: faker.date.soon({ days: 30 }).toISOString(),
         weeklyWorkload: isEven ? 20 : 30,
         isActive: isEven,
      };
   });
}
