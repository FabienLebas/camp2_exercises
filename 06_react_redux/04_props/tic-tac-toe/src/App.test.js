import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App key="5"/>, div);
});

it("should look the same", () => {
  const component = renderer.create(
    <App page="http://localhost:3000">Tic Tac Toe</App>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
