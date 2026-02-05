import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div>
      <h1>Redux Toolkit Todo App</h1>
      <TodoInput />
      <TodoList />
    </div>
  );
};

export default App;
