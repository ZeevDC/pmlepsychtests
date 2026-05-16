export interface TestAdministration {
  type: string;
  items: string;
  ageRange: string;
  time: string;
  trainingNeeded: string;
}

export interface PsychologyTest {
  id: string;
  name: string;
  category: string;
  developer: string;
  quickInfo: string;
  purpose: string;
  administration: TestAdministration;
  scoring: string;
  interpretation: string;
  mnemonics?: string;
  versions: string;
  factorsMeasured: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
}
