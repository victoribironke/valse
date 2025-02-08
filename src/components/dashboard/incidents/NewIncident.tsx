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
import { NewIncident } from "@/types/dashboard";
import { DEPARTMENTS } from "@/constants/constants";
import { Textarea } from "@/components/ui/textarea";

const NewIncidentDialog = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, toggleShowPassword] = useToggle(false);
  const [formData, setFormData] = useState<NewIncident>({
    department: "IT",
    description: "",
  });

  const updateFormData = (text: string | boolean, which: string) => {
    setFormData((k) => {
      return { ...k, [which]: text };
    });
  };

  // const signUpUser = async () => {
  //   setLoading(true);

  //   const { error } = await createUser(formData as any);

  //   setLoading(false);

  //   if (error) {
  //     toast.error(error);

  //     return;
  //   }

  //   push(PAGES.dashboard);
  // };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="w-full flex items-center justify-start gap-2 py-1 px-4 rounded-lg text-left bg-white text-black hover:text-main hover:bg-gray-100">
          <FiPlus />
          <p>New incident</p>
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("w-full border", is.className)}>
        <DialogHeader>
          <DialogTitle>New incident</DialogTitle>
          <DialogDescription className="text-firebase-orange">
            Fill in the details of the incident
          </DialogDescription>
        </DialogHeader>

        <div className="w-full max-h-[32rem] py-2 px-1 overflow-scroll">
          <p className="mb-1">Describe the incident</p>
          <Textarea cols={30} />

          <p className="mt-4 mb-1">Department to respond</p>
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
                {DEPARTMENTS.map((d, i) => (
                  <SelectItem value={d} key={i} className="cursor-pointer">
                    {d}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button
            className="bg-main font-normal text-white w-full hover:bg-main/90 gap-2"
            disabled={loading}
          >
            {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
            Report incident
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NewIncidentDialog;
