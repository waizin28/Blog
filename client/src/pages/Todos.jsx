import React from "react";
import { getTodos } from "../api/todos";
import { useLoaderData } from "react-router-dom";
import { TodoItem } from "../components/TodoItem";

function Todos() {
  const todoData = useLoaderData();

  return (
    <>
      <h1 className="page-title">Todos</h1>
      <ul>
        {todoData.map((todo) => {
          <TodoItem key={todo.id} {...todo} />;
        })}
      </ul>
    </>
  );
}

function loader({ request: { signal } }) {
  return getTodos(signal);
}

export const todosRoute = {
  loader,
  element: <Todos />,
};
