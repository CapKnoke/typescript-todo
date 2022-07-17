import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './state/store';
import { hydrate } from './state/todoSlice';

jest
  .useFakeTimers()
  .setSystemTime(new Date('2020-01-01T13:37:00'));

store.dispatch(hydrate({
  ids: ['1234', '4321'],
  entities: {
    '1234': {
      id: '1234',
      title: 'Test Todo 1',
      description: 'test description',
      complete: false,
    },
    '4321': {
      id: '4321',
      title: 'Test Todo 2',
      description: null,
      complete: true,
    },
  },
}));

it('renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <App />
      </Provider>
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
