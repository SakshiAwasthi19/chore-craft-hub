
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useAppSelector";
import TaskCard from "@/components/TaskCard";
import TaskFilters from "@/components/TaskFilters";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const { status, priority, searchTerm } = useAppSelector((state) => state.filter);

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = status === "all" || task.status === status;
    const matchesPriority = priority === "all" || task.priority === priority;
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage and track all your tasks in one place.
          </p>
        </div>
        <Link to="/add">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add New Task
          </Button>
        </Link>
      </div>

      <TaskFilters />
      
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'Task' : 'Tasks'} Found
        </h2>
        
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10 border rounded-lg bg-muted/10">
            <p className="text-muted-foreground">No tasks found matching your filters.</p>
            <Button 
              variant="link" 
              asChild 
              className="mt-2"
            >
              <Link to="/add">Add your first task</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
