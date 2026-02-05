import { useDispatch } from "react-redux";
import { addTodo } from "../features/TodoSlice.jsx";

const TodoInput = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.todo.value.trim();

    if (value) {
      dispatch(addTodo(value));
      e.target.reset();
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="todo" placeholder="Enter todo" />
      <button type="submit">Add</button>
    </form>
  );
};

export default TodoInput;
