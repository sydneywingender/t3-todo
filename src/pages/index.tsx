import { CheckCircle2, Pencil, Trash, XCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { toast } from "~/components/ui/use-toast";
import { api } from "~/utils/api";
import { cn } from "~/utils/utils";

export default function Home() {
  const [createInput, setCreateInput] = useState("");
  const [editingTask, setEditingTask] = useState("");
  const [editingValue, setEditingValue] = useState("");

  const ctx = api.useContext();

  const tasks = api.tasks.getAll.useQuery();
  const { mutate: createTask, isLoading: isCreating } =
    api.tasks.create.useMutation({
      onSuccess: () => {
        toast({
          description: "Task created",
          duration: 1500,
          action: <CheckCircle2 className="text-green-600" />,
        });
        setCreateInput("");
        void ctx.tasks.getAll.invalidate();
      },
      onError: () => {
        console.log("Error!");
      },
    });

  const { mutate: deleteTask, isLoading: isDeleting } =
    api.tasks.delete.useMutation({
      onSuccess: () => {
        toast({
          description: "Task deleted",
          duration: 1500,
          action: <XCircle className="text-red-600" />,
        });
        void ctx.tasks.getAll.invalidate();
      },
      onError: () => {
        console.log("Error!");
      },
    });

  const { mutate: updateTask, isLoading: isUpdating } =
    api.tasks.update.useMutation({
      onSuccess: () => {
        console.log("Success!");
        setEditingTask("");
        setEditingValue("");
        void ctx.tasks.getAll.invalidate();
      },
      onError: () => {
        console.log("Error!");
      },
    });

  function handleCreate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    createTask({ title: createInput });
  }

  function handleEdit(id: string, value: string) {
    setEditingTask(id);
    setEditingValue(value);
  }

  function handleSave(event: React.FormEvent<HTMLFormElement>, id: string) {
    event.preventDefault();
    updateTask({ id, title: editingValue });
  }

  return (
    <>
      <h1>All tasks</h1>
      <Card>
        <CardContent className="flex items-center justify-between p-4">
          <form className="flex w-full gap-4" onSubmit={(e) => handleCreate(e)}>
            <Input
              type="text"
              className="w-full"
              value={createInput}
              onChange={(e) => setCreateInput(e.target.value)}
            />
            <Button type="submit">Add</Button>
          </form>
        </CardContent>
      </Card>
      <ul className="flex flex-col gap-4">
        {tasks.data?.map((task) => (
          <li key={task.id}>
            <Card>
              <CardContent className="flex items-center justify-between p-4">
                <div
                  className={cn(
                    "flex items-center gap-4",
                    editingTask === task.id && "w-full"
                  )}
                >
                  {editingTask === task.id ? (
                    <form
                      className="flex w-full gap-4"
                      onSubmit={(e) => handleSave(e, task.id)}
                    >
                      <Input
                        type="text"
                        value={editingValue}
                        onChange={(e) => setEditingValue(e.target.value)}
                      />
                      <Button>Save</Button>
                    </form>
                  ) : (
                    <>
                      <Checkbox
                        checked={task.isCompleted}
                        onClick={() =>
                          updateTask({
                            id: task.id,
                            isCompleted: !task.isCompleted,
                          })
                        }
                      />
                      <span className={cn(task.isCompleted && "line-through")}>
                        {task.title}
                      </span>
                    </>
                  )}
                </div>
                {editingTask === task.id ? (
                  <></>
                ) : (
                  <div>
                    <Button
                      variant="ghost"
                      className={cn("px-2", task.isCompleted && "hidden")}
                    >
                      <Pencil
                        className="h-5 w-5"
                        onClick={() => handleEdit(task.id, task.title)}
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      className="px-2 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash
                        className="h-5 w-5"
                        onClick={() => deleteTask({ id: task.id })}
                      />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </>
  );
}
