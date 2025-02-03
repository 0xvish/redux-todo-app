import {
  Check,
  CircleX,
  Edit,
  GripVertical,
  Square,
  CheckSquare,
} from "lucide-react";
import {
  removeTodo,
  updateTodo,
  toggleComplete,
} from "../features/todo/todoSlice";
import { useDrag, useDrop } from "react-dnd";
import { useDispatch } from "react-redux";
import { useRef, useState, useContext } from "react";
import { DragItem, Todo } from "../lib/types";
import { ThemeContext } from "../context/ThemeContext";

const TodoItem = ({
  todo,
  index,
  moveTodo,
}: {
  todo: Todo;
  index: number;
  moveTodo: (dragIndex: number, hoverIndex: number) => void;
}) => {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const [{ isDragging }, drag, preview] = useDrag({
    type: "TODO",
    item: { id: todo.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TODO",
    hover: (draggedItem: DragItem) => {
      if (draggedItem.index !== index) {
        moveTodo(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  preview(drop(ref));

  const handleSave = () => {
    if (editText.trim() !== "" && editText !== todo.text) {
      dispatch(updateTodo({ id: todo.id, text: editText }));
    }
    setIsEditing(false);
  };

  return (
    <li
      ref={ref}
      className={`
          flex items-center p-2 
          bg-gray-100 dark:bg-gray-700 
          rounded-lg
          space-x-2 sm:space-x-3
          transition-all duration-300
          ${isDragging ? "opacity-50" : "opacity-100"}
        `}
    >
      {/* Drag Handle */}
      <div
        ref={drag}
        className="
            cursor-grab p-1 sm:p-2 
            flex-shrink-0 
            text-gray-500 dark:text-gray-400
            hover:text-gray-700 dark:hover:text-gray-200
            transition-colors
          "
      >
        <GripVertical className="w-4 h-4 sm:w-5 sm:h-5" />
      </div>

      {/* Complete Toggle */}
      <button
        onClick={() => dispatch(toggleComplete(todo.id))}
        className="
            text-green-500 hover:text-green-700 
            dark:text-green-400 dark:hover:text-green-300
            transition flex-shrink-0
          "
      >
        {todo.completed ? (
          <CheckSquare className="w-5 h-5" />
        ) : (
          <Square className="w-5 h-5" />
        )}
      </button>

      {/* Todo Text / Edit Input */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="
                w-full p-1 text-sm sm:text-base
                border border-gray-300 dark:border-gray-600
                rounded-md
                bg-white dark:bg-gray-800
                text-gray-900 dark:text-gray-100
                focus:outline-none focus:ring-2 focus:ring-blue-500
                truncate
              "
            autoFocus
          />
        ) : (
          <span
            className={`
                block w-full truncate text-sm sm:text-base
                ${
                  todo.completed
                    ? "line-through text-gray-500 dark:text-gray-400"
                    : "text-gray-900 dark:text-gray-100"
                }
                cursor-pointer
                hover:text-gray-700 dark:hover:text-gray-300
                transition-colors
              `}
            onClick={() => setIsEditing(true)}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="
                text-green-500 hover:text-green-800 
                dark:text-green-400 dark:hover:text-green-300
                p-1 sm:px-2
                transition-colors
              "
          >
            <Check className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="
                text-blue-500 hover:text-blue-800 
                dark:text-blue-400 dark:hover:text-blue-300
                p-1 sm:px-2
                transition-colors
              "
          >
            <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
        <button
          onClick={() => dispatch(removeTodo(todo.id))}
          className="
              text-red-500 hover:text-red-800 
              dark:text-red-400 dark:hover:text-red-300
              p-1 sm:px-2 
              rounded-lg 
              transition-colors
            "
        >
          <CircleX className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
