import React from "react";
import { useState } from "react";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    if (text.trim() === "") return;
    setTodos([...todos, text]);
    console.log("Todo added:", text);
    setText("");
  };

  const deleteTodo = (index) => {
    // filter membuat array baru, hanya simpan todo yang index-nya BUKAN yang mau dihapus
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos); // update state
    console.log("Todo deleted at index:", index), newTodos;
  };
  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
        <h1 className="text-3xl font-bold mb-6">Todo App</h1>

        {/* Input */}
        <div className="flex gap-2 w-full max-w-md">
          <input
            className="flex-1 border rounded px-3 py-2 outline-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan todo..."
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addTodo}
          >
            Tambah
          </button>
        </div>

        <ul className="w-full max-w-md mt-6">
          {todos.map((todo, index) => (
            <li
              key={index}
              className="flex items-center justify-between bg-white p-4 my-2 rounded shadow"
            >
              <span className="text-black">{todo}</span>
              <button
                className="bg-red-500 p-2 text-white rounded-sm"
                onClick={() => deleteTodo(index)}
              >
                Hapus
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
