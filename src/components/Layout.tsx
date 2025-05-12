
import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, Plus, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Layout = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <List className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">TaskManager</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button 
                variant={isActive("/") ? "default" : "ghost"} 
                className="flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            <Link to="/add">
              <Button 
                variant={isActive("/add") ? "default" : "ghost"}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Task</span>
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 container py-6">
        <Outlet />
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-muted-foreground">
            TaskManager &copy; {new Date().getFullYear()}. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-20 bg-background border-t">
        <div className="flex items-center justify-around p-2">
          <Link to="/">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "flex flex-col items-center justify-center h-16 w-16 rounded-md",
                isActive("/") && "bg-accent text-accent-foreground"
              )}
            >
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Dashboard</span>
            </Button>
          </Link>
          <Link to="/add">
            <Button 
              variant="ghost" 
              size="icon"
              className={cn(
                "flex flex-col items-center justify-center h-16 w-16 rounded-md",
                isActive("/add") && "bg-accent text-accent-foreground"
              )}
            >
              <Plus className="h-5 w-5" />
              <span className="text-xs mt-1">Add Task</span>
            </Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Layout;
