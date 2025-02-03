import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";
import { ThemeContext } from "../context/ThemeContext";

const AddTodo = () => {
  const [todoText, setTodoText] = useState("");
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const addTodoHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    dispatch(addTodo(todoText));
    setTodoText("");
  };

  return (
    <div
      className={`
        w-full max-w-md mx-auto mt-4 p-4 sm:p-6 
        bg-white dark:bg-gray-800 
        rounded-lg 
        shadow-lg
        transition-colors
        duration-300
      `}
    >
      <h1
        className="
          text-xl sm:text-2xl 
          font-bold 
          text-gray-700 dark:text-gray-200 
          mb-3 sm:mb-4 
          text-center
        "
      >
        Add Todo
      </h1>
      <form
        onSubmit={addTodoHandler}
        className="w-full flex flex-col space-y-3 sm:space-y-4"
      >
        <input
          type="text"
          placeholder="Add a new task..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="
            w-full px-3 py-2 sm:px-4 sm:py-2
            text-sm sm:text-base
            border border-gray-300 dark:border-gray-600
            rounded-lg
            bg-white dark:bg-gray-700
            text-gray-900 dark:text-gray-100
            focus:outline-none focus:ring-2 focus:ring-blue-500
          "
        />
        <button
          type="submit"
          className="
            w-full bg-blue-500 text-white
            px-3 py-2 sm:px-4 sm:py-2
            text-sm sm:text-base
            rounded-lg
            hover:bg-blue-600
            transition
          "
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
