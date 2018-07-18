// @flow

import * as React from 'react';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import PageHeader from '@salesforce/design-system-react/components/page-header';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import ListInput from './input';
import ListItems from './listItems';
import { toggleShowCompleted } from './actions';

import type { ListItem, ListState } from './reducers';

const selectListState = (appState): ListState => appState.list;

const selectShowCompleted = createSelector(
  selectListState,
  (listState): boolean => listState.showCompleted,
);

const selectItems = createSelector(
  selectListState,
  (listState): Array<ListItem> => listState.items,
);

const selectVisibleItems = createSelector(
  selectListState,
  selectItems,
  (listState, items): Array<ListItem> => {
    if (listState.showCompleted) {
      return items;
    }
    return items.filter(item => !item.done);
  },
);

const select = appState => ({
  items: selectVisibleItems(appState),
  showCompleted: selectShowCompleted(appState),
});

const actions = {
  doToggleShowCompleted: toggleShowCompleted,
};

class Toggle extends React.Component<{
  showCompleted: boolean,
  doToggleShowCompleted: typeof toggleShowCompleted,
}> {
  handleChange = (e, { checked }) => {
    this.props.doToggleShowCompleted(checked);
  };

  render(): React.Node {
    return (
      <Checkbox
        labels={{
          label: 'Show completed items',
          toggleDisabled: false,
          toggleEnabled: false,
        }}
        variant="toggle"
        checked={this.props.showCompleted}
        onChange={this.handleChange}
      />
    );
  }
}

const List = ({
  items,
  showCompleted,
  doToggleShowCompleted,
}: {
  items: Array<ListItem>,
  showCompleted: boolean,
  doToggleShowCompleted: typeof toggleShowCompleted,
}) => {
  const length = items.filter(item => !item.done).length;
  const info = `${length} unfinished item${length === 1 ? '' : 's'}`;
  return (
    <div>
      <PageHeader
        title="My To-Do List"
        iconName="list"
        iconCategory="utility"
        info={info}
        contentRight={
          <div>
            <Toggle
              showCompleted={showCompleted}
              doToggleShowCompleted={doToggleShowCompleted}
            />
          </div>
        }
        variant="objectHome"
      />
      <ListInput />
      <ListItems items={items} />
    </div>
  );
};

export default connect(
  select,
  actions,
)(List);
