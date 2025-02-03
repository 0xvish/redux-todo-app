// src/App.tsx
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <div
      className="
        flex flex-col justify-center items-center
        mx-auto p-4 sm:p-6
        bg-gray-200 dark:bg-gray-900
        min-h-screen
        transition-colors duration-300
      "
    >
      <div
        className="
          bg-white dark:bg-gray-800
          w-full sm:w-96
          p-4
          rounded-lg
          shadow-lg
          flex
          justify-between
          items-center
        "
      >
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700 dark:text-gray-200">
          Redux Todo App
        </h1>
        <ThemeToggle />
      </div>
      <div className="w-full sm:w-96">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
