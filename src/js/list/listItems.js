// @flow

import * as React from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Checkbox from '@salesforce/design-system-react/components/checkbox';
import PopoverTooltip from '@salesforce/design-system-react/components/popover-tooltip';
import { connect } from 'react-redux';

import {
  removeToDoItem,
  completeToDoItem,
  uncompleteToDoItem,
} from './actions';

import type { ListItem as ListItemType } from './reducers';

class ListItem extends React.Component<{
  item: ListItemType,
  doRemoveToDoItem: typeof removeToDoItem,
  doCompleteToDoItem: typeof completeToDoItem,
  doUncompleteToDoItem: typeof uncompleteToDoItem,
}> {
  handleChange = (e, { checked }: { checked: boolean }) => {
    const { id } = this.props.item;
    if (checked) {
      this.props.doCompleteToDoItem(id);
    } else {
      this.props.doUncompleteToDoItem(id);
    }
  };

  handleClick = () => {
    const { id } = this.props.item;
    this.props.doRemoveToDoItem(id);
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
        <PopoverTooltip content="Remove To-Do Item" align="right">
          <Button
            iconCategory="utility"
            iconName="delete"
            iconVariant="border"
            variant="icon"
            onClick={this.handleClick}
          />
        </PopoverTooltip>
      </li>
    );
  }
}

const actions = {
  doRemoveToDoItem: removeToDoItem,
  doCompleteToDoItem: completeToDoItem,
  doUncompleteToDoItem: uncompleteToDoItem,
};

const ListItems = ({
  items,
  doRemoveToDoItem,
  doCompleteToDoItem,
  doUncompleteToDoItem,
}: {
  items: Array<ListItemType>,
  doRemoveToDoItem: typeof removeToDoItem,
  doCompleteToDoItem: typeof completeToDoItem,
  doUncompleteToDoItem: typeof uncompleteToDoItem,
}) => {
  const listItems = items.map(item => (
    <ListItem
      key={item.id}
      item={item}
      doRemoveToDoItem={doRemoveToDoItem}
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
