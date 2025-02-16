import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { logOut } from "@/lib/auth";
import { User } from "@/types/dashboard";
import { useEffect, useState } from "react";

const DashboardHeader = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("valse_user_data");

    if (!user) return;

    setUser(JSON.parse(user));
  }, []);

  return (
    <header className="flex items-center justify-center gap-4 w-full">
      <div className="bg-muted/50 rounded-full flex gap-4 items-center justify-center p-2">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user?.profile_pic} alt={user?.display_name} />
          <AvatarFallback className="rounded-lg">DP</AvatarFallback>
        </Avatar>

        <p className="pr-3 font-medium hidden sm:block">{user?.display_name}</p>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="mr-auto">
            <p className="bg-main/90 w-fit rounded-md text-white py-1 px-3 text-xs">
              {user?.credits}{" "}
              <span className="hidden xs:inline-block">credits left</span>
            </p>
          </TooltipTrigger>
          <TooltipContent>
            <p>Each playlist arrangement costs 1 credit.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Button variant="ghost">Feedback</Button>

      <Button variant="ghost" onClick={logOut}>
        Log out
      </Button>
    </header>
  );
};

export default DashboardHeader;
