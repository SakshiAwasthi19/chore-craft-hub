
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import { Task, deleteTask, setTaskStatus } from "@/store/tasksSlice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useToast } from "@/hooks/use-toast";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    toast({
      title: "Task deleted",
      description: "The task has been successfully deleted.",
    });
  };
  
  const handleComplete = () => {
    dispatch(setTaskStatus({ id: task.id, status: "completed" }));
    toast({
      title: "Task completed",
      description: "The task has been marked as completed.",
    });
  };

  return (
    <Card className="task-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold line-clamp-1">{task.title}</CardTitle>
          <Badge className={`status-${task.status}`}>
            {task.status === "in-progress" ? "In Progress" : 
             task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-muted-foreground text-sm line-clamp-2 h-10">
          {task.description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <Badge variant="outline" className={`priority-${task.priority}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
          </Badge>
          <span className="text-xs text-muted-foreground">Due: {task.dueDate}</span>
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex space-x-2">
          <Link to={`/task/${task.id}`}>
            <Button variant="outline" size="sm">View</Button>
          </Link>
          <Link to={`/edit/${task.id}`}>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-1" /> Edit
            </Button>
          </Link>
        </div>
        <div className="flex space-x-2">
          {task.status !== "completed" && (
            <Button variant="outline" size="sm" onClick={handleComplete} className="text-green-500 border-green-500 hover:bg-green-50">
              <Check className="h-4 w-4 mr-1" /> Done
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleDelete} className="text-red-500 border-red-500 hover:bg-red-50">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
