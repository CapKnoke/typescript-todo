import todoReducer, {
  addTodo,
  completeTodo,
  deleteTodo,
} from './todoSlice';

describe('todo reducer', () => {
  test('should handle initial state', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual({
      entities: {},
      ids: [],
    });
  });
  describe('adding todo', () => {
    const initialState = {
      entities: {},
      ids: [],
    };
    const actual = todoReducer(initialState, addTodo({ title: 'Test', description: ''}));
    test('added id to ids array', () => {
      expect(actual.ids.length).toEqual(1);
    })
    test('added todo in correct format', () => {
      const id = actual.ids[0];
      expect(actual.entities[id])
        .toEqual(
          {
            id: id,
            title: 'Test',
            description: null,
            complete: false
          }
        );
    })
  });
  describe('completing a todo', () => {
    const initialState = {
      ids: ['1234', '4321'],
      entities: {
        '1234': {
          id: '1234',
          title: 'Test',
          description: null,
          complete: false,
        },
        '4321': {
          id: '4321',
          title: 'Test',
          description: null,
          complete: false,
        }
      },
    };
    const actual = todoReducer(initialState, completeTodo('1234'));
    test('should not change ids array', () => {
      expect(actual.ids).toEqual(['1234', '4321']);
    });
    test('should complete todo with correct id', () => {
      expect(actual.entities['1234'])
        .toEqual(
          {
            id: '1234',
            title: 'Test',
            description: null,
            complete: true,
          }
        );
    });
    test('should not complete todo with non matching id', () => {
      expect(actual.entities['4321'])
        .toEqual(
          {
            id: '4321',
            title: 'Test',
            description: null,
            complete: false,
          }
        );
    });
  });
  describe('deleting a todo', () => {
    const initialState = {
      ids: ['1234', '4321'],
      entities: {
        '1234': {
          id: '1234',
          title: 'Test',
          description: null,
          complete: false,
        },
        '4321': {
          id: '4321',
          title: 'Test',
          description: null,
          complete: false,
        }
      },
    };
    const actual = todoReducer(initialState, deleteTodo('1234'));
    test('should have removed correct id from ids array', () => {
      expect(actual.ids).toEqual(['4321']);
    });
    test('should have removed correct todo from enteties', () => {
      expect(actual.entities)
        .toEqual(
          {
            '4321': {
              id: '4321',
              title: 'Test',
              description: null,
              complete: false,
            },
          }
        );
    });
  });
});
