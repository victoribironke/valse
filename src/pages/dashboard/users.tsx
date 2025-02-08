import { user } from "@/atoms/atoms";
import PageLoader from "@/components/general/PageLoader";
import { PAGES } from "@/constants/constants";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/services/firebase";
import { Departments, User } from "@/types/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { is } from "../_app";
import { IoEllipsisVertical } from "react-icons/io5";
import { setUserAsHOD } from "@/lib/firebase";
import toast from "react-hot-toast";

const Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState("");
  const userInfo = useRecoilValue(user);
  const { push } = useRouter();

  const filtered_users = users.filter(
    (u) =>
      u.first_name.toLowerCase().includes(filter.toLowerCase()) ||
      u.last_name.toLowerCase().includes(filter.toLowerCase())
  );

  // THE FILTERS WILL BE BASED ON THESE: DEPARTMENT, ROLE, HOD STATUS

  const setAsHOD = async (uid: string, department: Departments) => {
    const { data, error } = await setUserAsHOD(uid, department);

    if (error) {
      toast.error(error);
      return;
    }

    toast.success(data);
  };

  useEffect(() => {
    if (userInfo?.role !== "admin") {
      push(PAGES.dashboard);
    }

    const unsub = onSnapshot(collection(db, "users"), (d) => {
      const data = d.docs.map((doc) => {
        return { ...doc.data(), uid: doc.id } as User;
      });
      // when rendering the users, show everybody except the currently logged in user
      // they will be able to take action on themselves in the account settings page

      setUsers(data);
      setLoading(false);
    });

    return unsub;
  }, []);

  if (loading) return <PageLoader type="small" />;

  return (
    <section className="w-full max-w-[1440px] flex flex-col gap-4">
      <h1 className="font-bold text-2xl">ALL USERS ({users.length})</h1>

      <Input
        placeholder="Filter users..."
        className="max-w-96"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      <Table>
        <TableHeader>
          <TableRow>
            {/* <TableHead>
              <Checkbox />
            </TableHead> */}
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filtered_users.map((u, i) => (
            <TableRow key={i}>
              {/* <TableCell>
                <Checkbox />
              </TableCell> */}
              <TableCell className="font-medium">
                {u.first_name} {u.last_name}
              </TableCell>
              <TableCell>{u.email}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  {u.department}{" "}
                  {u.is_hod && (
                    <div className="bg-purple text-white px-1 py-0.5 rounded-md text-xs w-fit">
                      HOD
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>{u.role}</TableCell>
              <TableCell>
                {userInfo?.uid == u.uid && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <IoEllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className={is.className}>
                      <DropdownMenuItem
                        className="cursor-pointer hover:bg-gray-100"
                        onClick={() => setAsHOD(u.uid, u.department)}
                        disabled={u.is_hod}
                      >
                        Set as HOD
                      </DropdownMenuItem>
                      {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer hover:bg-red hover:text-white">
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default Users;
