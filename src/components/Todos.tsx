import { useSelector, useDispatch } from "react-redux";
import { removeTodo } from "../features/todo/todoSlice";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const Todos = () => {
  const todos = useSelector(
    (state: { todos: { todos: Todo[] } }) => state.todos.todos || []
  );
  const dispatch = useDispatch();

  return (
    <div className="w-96 mx-auto mt-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Todos</h1>
      <ul className="space-y-2">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-lg"
            >
              <span>{todo.text}</span>
              <button
                onClick={() => dispatch(removeTodo(todo.id))}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
              >
                X
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No todos yet. Add one!</p>
        )}
      </ul>
    </div>
  );
};

export default Todos;
