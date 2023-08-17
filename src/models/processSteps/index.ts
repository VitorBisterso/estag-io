export interface Applicant {
   id: number;
   name: string;
}

export interface ProcessStep {
   id: number;
   title: string;
   description: string;
   deadline: string;
   onlyOnDeadline: boolean;
   applicants: Array<Applicant>;
}

export interface CreateProcessStepParams {
   opportunityId: number;
   processStep: {
      title: string;
      description: string;
      deadline: string;
      onlyOnDeadline: boolean;
      applicants: Array<number>;
   };
}

export interface UpdateProcessStepParams {
   id: number;
   title: string;
   description: string;
   deadline: string;
   onlyOnDeadline: boolean;
   newApplicants: Array<number>;
   removedApplicants: Array<number>;
}
