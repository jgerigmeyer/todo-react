// @flow

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from '@salesforce/design-system-react/components/button';
import Input from '@salesforce/design-system-react/components/input';
import { createStore } from 'redux';

import type { Store } from 'redux';

type State = {
  +name: string,
};
type Action = { type: 'NAME_CHANGED', payload: string };
type AppStore = Store<State, Action>;

const initialState: State = {
  name: '',
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'NAME_CHANGED':
      return { ...state, name: action.payload };
  }
  return state;
};

const appStore: AppStore = createStore(reducer);

const Content = ({ name }: { +name: string }) => {
  if (!name) {
    return <p>No name...</p>;
  }
  return <h1>Hello, {name}!</h1>;
};

class App extends React.Component<{ store: AppStore }, State> {
  constructor(props) {
    super(props);
    const { store } = props;
    this.state = store.getState();
    store.subscribe(() => {
      this.setState(store.getState());
    });
  }

  updateName(name) {
    const { store } = this.props;
    store.dispatch({ type: 'NAME_CHANGED', payload: name });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.updateName(e.target[0].value);
  };

  render(): React.Node {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Input type="text" name="name" label="What is your name?" />
          <Button type="submit" label="Save" />
        </form>
        <Content name={this.state.name} />
      </div>
    );
  }
}

const el = document.getElementById('app');
if (el) {
  ReactDOM.render(<App store={appStore} />, el);
}
