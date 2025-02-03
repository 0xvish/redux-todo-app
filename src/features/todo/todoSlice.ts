import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
}

const loadTodos = () => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
};

const initialState: TodosState = {
  todos: loadTodos(),
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload,
        completed: false,
      };
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    updateTodo: (
      state,
      action: PayloadAction<{ id: string; text: string }>
    ) => {
      const { id, text } = action.payload;
      const todo = state.todos.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Persist update
    },
    toggleComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find((t) => t.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
      localStorage.setItem("todos", JSON.stringify(state.todos)); // Persist completion status
    },
    reorderTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
});

export const { addTodo, removeTodo, updateTodo, toggleComplete, reorderTodos } =
  todoSlice.actions;
export default todoSlice.reducer;
