export interface MyInternship {
   initialDate: string;
   until: string;
   managerName: string;
   job: {
      title: string;
      type: string;
      company: {
         name: string;
      };
      salary: string;
      weeklyWorkload: string;
   };
}
