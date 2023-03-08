import {createSelector} from '@reduxjs/toolkit';

import {RootState} from '@types';

const selectors = (state: RootState) => state.appContainer;

export const appSelector = createSelector([selectors], mapState => mapState);
