export const UPDATE_SECTION = 'section/UPDATE_SECTION';

export interface UpdateSection {
  type: typeof UPDATE_SECTION;
  payload: string;
}

export type SectionActionTypes = UpdateSection;
