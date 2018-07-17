// @flow

import * as React from 'react';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import { connect } from 'react-redux';

import { completeToDoItem, uncompleteToDoItem } from './actions';

import type { ListItem as ListItemType } from './reducers';

class ListItem extends React.Component<{
  item: ListItemType,
  doCompleteToDoItem: typeof completeToDoItem,
  doUncompleteToDoItem: typeof uncompleteToDoItem,
}> {
  handleChange = (e, { checked }) => {
    const { id } = this.props.item;
    if (checked) {
      this.props.doCompleteToDoItem(id);
    } else {
      this.props.doUncompleteToDoItem(id);
    }
  };

  render(): React.Node {
    const { item } = this.props;
    return (
      <li className={item.done ? 'todo-item done' : 'todo-item'}>
        <Checkbox
          checked={item.done}
          label={item.text}
          onChange={this.handleChange}
        />
      </li>
    );
  }
}

const actions = {
  doCompleteToDoItem: completeToDoItem,
  doUncompleteToDoItem: uncompleteToDoItem,
};

const ListItems = ({
  items,
  doCompleteToDoItem,
  doUncompleteToDoItem,
}: {
  items: Array<ListItemType>,
  doCompleteToDoItem: typeof completeToDoItem,
  doUncompleteToDoItem: typeof uncompleteToDoItem,
}) => {
  const listItems = items.map(item => (
    <ListItem
      key={item.id}
      item={item}
      doCompleteToDoItem={doCompleteToDoItem}
      doUncompleteToDoItem={doUncompleteToDoItem}
    />
  ));
  return <ul>{listItems}</ul>;
};

export default connect(
  null,
  actions,
)(ListItems);
