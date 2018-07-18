// @flow

import * as React from 'react';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ListInput from './input';
import ListItems from './listItems';

import type { ListItem, ListState } from './reducers';

const selectListState = (appState): ListState => appState.list;

const selectItems = createSelector(
  selectListState,
  (listState): Array<ListItem> => listState.items,
);

const select = appState => ({
  items: selectItems(appState),
});

const List = ({ items }: { items: Array<ListItem> }) => {
  const length = items.filter(item => !item.done).length;
  const info = `${length} unfinished item${length === 1 ? '' : 's'}`;
  return (
    <div>
      <PageHeader
        title="My To-Do List"
        iconName="list"
        iconCategory="utility"
        info={info}
      />
      <ListInput />
      <ListItems items={items} />
    </div>
  );
};

export default connect(select)(List);
