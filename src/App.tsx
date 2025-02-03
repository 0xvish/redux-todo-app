import AddTodo from "./components/AddTodo";
import Todos from "./components/Todos";

function App() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto p-6 bg-gray-200 min-h-screen">
      <div className="bg-white w-96 p-4 rounded-lg shadow-lg flex justify-center items-center">
        <h1 className="text-2xl font-bold text-gray-700">Redux Todo App</h1>
      </div>
      <AddTodo />
      <Todos />
    </div>
  );
}

export default App;
