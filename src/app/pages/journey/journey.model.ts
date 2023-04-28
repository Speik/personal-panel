export interface IJourney {
  id?: string;
  employerName: string;
  jobTitle: string;
  shortDescription: string;
  startedAt: Date;
  endedAt: Nullable<Date>;
  description: string;
  skills: string[];
}
