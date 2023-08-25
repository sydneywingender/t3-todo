import { api } from "~/utils/api";

export default function Home() {
  const todos = api.todos.getAll.useQuery();

  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <p className="text-2xl font-semibold">To Dos</p>
      {todos.data?.map((todo) => (
        <p key={todo.id}>{todo.title}</p>
      ))}
    </main>
  );
}
