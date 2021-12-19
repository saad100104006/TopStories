import * as Types from './actionTypes';

const updateSection = (section: string): Types.UpdateSection => ({
  type: Types.UPDATE_SECTION,
  payload: section,
});

export default { updateSection };
