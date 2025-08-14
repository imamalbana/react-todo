import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem("todos");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (text.trim() === "") return;
    setTodos([...todos, { text, completed: false }]);
    setText("");
  };

  const toggleTodo = (index) => {
    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (index) => {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6 justify-center">
      <h1 className="text-3xl font-bold mb-6">Todo App</h1>

      {/* Input */}
      <div className="flex gap-2 w-full max-w-md">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Masukkan todo..."
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          onClick={addTodo}
        >
          Tambah
        </button>
      </div>

      <ul className="w-full max-w-md mt-6 space-y-3">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-3 flex-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(index)}
                className="w-5 h-5 accent-blue-500 cursor-pointer"
              />
              <span
                className={`text-lg ${
                  todo.completed
                    ? "line-through text-gray-500"
                    : "text-gray-800"
                }`}
              >
                {todo.text}
              </span>
            </div>

            <button
              className="bg-red-500 px-3 py-1 text-white rounded hover:bg-red-600 transition"
              onClick={() => deleteTodo(index)}
            >
              Hapus
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
