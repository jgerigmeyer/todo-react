// @flow

import 'babel-polyfill';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore } from 'redux';

type State = {
  +name: string,
};
type Props = {
  state: State,
};
type Action = { type: 'NAME_CHANGED', payload: string };
type AppProps = {
  store: {
    dispatch: Action => Action,
    getState: () => State,
  },
};

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

const appStore = createStore(reducer);

const Content = ({ state }: Props) => {
  const { name } = state;
  if (!name) {
    return <p>No name...</p>;
  }
  return <h1>Hello, {name}!</h1>;
};

class App extends React.Component<AppProps, State> {
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

  render(): React.Node {
    return (
      <div>
        <form
          onSubmit={e => {
            e.preventDefault();
            const name = e.target[0].value;
            e.target[0].value = '';
            this.updateName(name);
          }}
        >
          <label>What is your name?</label>
          <input type="text" name="name" />
          <button type="submit">Save</button>
        </form>
        <Content state={this.state} />
      </div>
    );
  }
}

const el = document.getElementById('app');
if (el) {
  ReactDOM.render(<App store={appStore} />, el);
}
