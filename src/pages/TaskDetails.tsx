
import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { deleteTask, setTaskStatus } from "@/store/tasksSlice";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  ArrowLeft, 
  Calendar,
  Check, 
  Edit, 
  Trash2 
} from "lucide-react";

const TaskDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { toast } = useToast();
  
  const task = useAppSelector((state) => 
    state.tasks.tasks.find((t) => t.id === id)
  );
  
  useEffect(() => {
    if (!task && id) {
      navigate("/");
      toast({
        title: "Error",
        description: "Task not found.",
        variant: "destructive",
      });
    }
  }, [task, id, navigate, toast]);
  
  if (!task) {
    return null;
  }
  
  const handleDelete = () => {
    dispatch(deleteTask(task.id));
    navigate("/");
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
    <div className="max-w-3xl mx-auto">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back
      </Button>
      
      <Card className="mb-6">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-bold">{task.title}</CardTitle>
            <Badge className={`status-${task.status}`}>
              {task.status === "in-progress" 
                ? "In Progress" 
                : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant="outline" className={`priority-${task.priority}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Due: {task.dueDate}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">
              {task.description}
            </p>
          </div>
          
          <div className="pt-2">
            <p className="text-xs text-muted-foreground">
              Created on: {task.createdAt}
            </p>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between pt-4 border-t">
          <Link to={`/edit/${task.id}`}>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" /> Edit Task
            </Button>
          </Link>
          
          <div className="space-x-2">
            {task.status !== "completed" && (
              <Button 
                variant="outline" 
                onClick={handleComplete}
                className="text-green-500 border-green-500 hover:bg-green-50"
              >
                <Check className="h-4 w-4 mr-2" /> Mark as Complete
              </Button>
            )}
            
            <Button 
              variant="outline" 
              onClick={handleDelete}
              className="text-red-500 border-red-500 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4 mr-2" /> Delete Task
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskDetails;
