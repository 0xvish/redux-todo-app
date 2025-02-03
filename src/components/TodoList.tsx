import { useSelector, useDispatch } from "react-redux";
import { reorderTodos } from "../features/todo/todoSlice";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import { MultiBackend, TouchTransition } from "dnd-multi-backend";
import { useState, useCallback, useEffect } from "react";
import { Todo } from "../lib/types";
import TodoItem from "./TodoItem";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector(
    (state: { todos: { todos: Todo[] } }) => state.todos.todos || []
  );
  const [localTodos, setLocalTodos] = useState<Todo[]>(todos);
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setLocalTodos(todos);
  }, [todos]);

  const moveTodo = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const updatedTodos = [...localTodos];
      const [movedTodo] = updatedTodos.splice(dragIndex, 1);
      updatedTodos.splice(hoverIndex, 0, movedTodo);
      setLocalTodos(updatedTodos);
      dispatch(reorderTodos(updatedTodos));
    },
    [localTodos, dispatch]
  );

  const filteredTodos = localTodos.filter((todo) => {
    if (filter === "completed" && !todo.completed) return false;
    if (filter === "pending" && todo.completed) return false;
    return todo.text.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const DND_BACKEND = {
    backends: [
      { backend: HTML5Backend },
      {
        backend: TouchBackend,
        preview: true,
        transition: TouchTransition,
      },
    ],
  };

  return (
    <DndProvider backend={MultiBackend} options={DND_BACKEND}>
      <div className="w-full max-w-md mx-auto mt-4 sm:mt-6 p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mb-3 sm:mb-4 text-center">
          Todos
        </h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-3 border border-gray-300 rounded-md text-sm sm:text-base"
        />

        {/* Filters */}
        <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
          <button
            className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded ${
              filter === "completed" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className={`px-2 sm:px-3 py-1 text-sm sm:text-base rounded ${
              filter === "pending" ? "bg-yellow-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>
        </div>

        {/* Todo List */}
        <ul className="space-y-2 max-h-[70vh] overflow-y-auto">
          {filteredTodos.length > 0 ? (
            filteredTodos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
                moveTodo={moveTodo}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm sm:text-base">
              No todos found.
            </p>
          )}
        </ul>
      </div>
    </DndProvider>
  );
};

export default TodoList;
