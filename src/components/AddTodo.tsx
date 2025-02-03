import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../features/todo/todoSlice";

const AddTodo = () => {
  const [todoText, setTodoText] = useState("");
  const dispatch = useDispatch();

  const addTodoHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!todoText.trim()) return;
    dispatch(addTodo(todoText));
    setTodoText("");
  };

  return (
    <div className="flex flex-col justify-center p-6 bg-white rounded-lg shadow-lg w-96 mx-auto mt-10">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Add Todo</h1>
      <form onSubmit={addTodoHandler} className="w-full flex flex-col gap-4">
        <input
          type="text"
          placeholder="Add a new task..."
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Add Task
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
