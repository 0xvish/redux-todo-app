import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto p-4 sm:p-6 bg-gray-200 min-h-screen">
      <div className="bg-white w-full sm:w-96 p-4 rounded-lg shadow-lg flex justify-center items-center">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
          Redux Todo App
        </h1>
      </div>
      <div className="w-full sm:w-96">
        <AddTodo />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
