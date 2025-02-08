import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { is } from "@/pages/_app";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiEdit2, FiPlus } from "react-icons/fi";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToggle } from "@/hooks/general";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { DEPARTMENTS, PAGES } from "@/constants/constants";
import { createUser } from "@/lib/firebase";
import { NewUser } from "@/types/auth";

const NewUserDialog = () => {
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [formData, setFormData] = useState<NewUser>({
    department: "IT",
    email: "",
    first_name: "",
    last_name: "",
    role: "user",
    password: "",
  });

  const updateFormData = (text: string | boolean, which: string) => {
    setFormData((k) => {
      return { ...k, [which]: text };
    });
  };

  const signUpUser = async () => {
    setLoading(true);

    const { data, error } = await createUser(formData);

    setLoading(false);

    if (error) {
      toast.error(error);

      return;
    }

    toast.success(data);
    setOpen(false);
    // push(PAGES.dashboard);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full flex items-center justify-start gap-2 py-1 px-4 rounded-lg text-left bg-white text-black hover:text-main hover:bg-gray-100">
          <FiPlus />
          <p>New user</p>
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("w-full border", is.className)}>
        <DialogHeader>
          <DialogTitle>New user</DialogTitle>
          <DialogDescription className="text-firebase-orange">
            Fill in the details of the new user
          </DialogDescription>
        </DialogHeader>

        <div className="w-full max-h-[32rem] py-2 px-1 overflow-scroll">
          <p className="mb-1">First name</p>
          <Input
            onChange={(e) => updateFormData(e.target.value, "first_name")}
            placeholder="First name"
            value={formData.first_name}
          />

          <p className="mb-1 mt-4">Last name</p>
          <Input
            onChange={(e) => updateFormData(e.target.value, "last_name")}
            placeholder="Last name"
            value={formData.last_name}
          />

          <p className="mb-1 mt-4">Email address</p>
          <Input
            onChange={(e) => updateFormData(e.target.value, "email")}
            placeholder="Email address"
            value={formData.email}
            type="email"
          />

          <p className="mt-4 mb-1">Role</p>
          <Select
            value={formData.role}
            onValueChange={(e) => updateFormData(e, "role")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent className={cn("border", is.className)}>
              <SelectGroup>
                <SelectLabel>Roles</SelectLabel>
                {["admin", "user"].map((h, i) => (
                  <SelectItem value={h} key={i} className="cursor-pointer">
                    {h}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <p className="mt-4 mb-1">Department</p>
          <Select
            value={formData.department}
            onValueChange={(e) => updateFormData(e, "department")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a department" />
            </SelectTrigger>
            <SelectContent className={cn("border", is.className)}>
              <SelectGroup>
                <SelectLabel>Departments</SelectLabel>
                {DEPARTMENTS.map((h, i) => (
                  <SelectItem value={h} key={i} className="cursor-pointer">
                    {h}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <p className="mt-4 mb-1">Password</p>
          <div className="relative flex items-center justify-center">
            <Input
              onChange={(e) => updateFormData(e.target.value, "password")}
              placeholder="Password"
              value={formData.password}
              type={showPassword ? "text" : "password"}
            />
            <button className="absolute right-2" onClick={toggleShowPassword}>
              {showPassword ? (
                <LuEyeOff className="text-main" />
              ) : (
                <LuEye className="text-main" />
              )}
            </button>
          </div>
        </div>

        <DialogFooter>
          <Button
            className="bg-main font-normal text-white w-full hover:bg-main/90 gap-2"
            disabled={loading}
            onClick={signUpUser}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            Create user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewUserDialog;
