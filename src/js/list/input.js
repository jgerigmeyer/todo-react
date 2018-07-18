// @flow

import * as React from 'react';
import Button from '@salesforce/design-system-react/components/button';
import Input from '@salesforce/design-system-react/components/input';
import PopoverTooltip from '@salesforce/design-system-react/components/popover-tooltip';
import { connect } from 'react-redux';

import { addToDoItem } from './actions';

class ListInput extends React.Component<
  {
    doAddToDoItem: typeof addToDoItem,
  },
  { value: string },
> {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.doAddToDoItem(this.state.value);
    this.setState({ value: '' });
  };

  render(): React.Node {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          type="text"
          label="Add To-Do Item"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <PopoverTooltip content="Add To-Do Item" align="right">
          <Button
            type="submit"
            iconCategory="utility"
            iconName="add"
            iconSize="large"
            iconVariant="border-filled"
            variant="icon"
          />
        </PopoverTooltip>
      </form>
    );
  }
}

const actions = {
  doAddToDoItem: addToDoItem,
};

export default connect(
  null,
  actions,
)(ListInput);
