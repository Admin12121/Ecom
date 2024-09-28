"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
// import { useUpdateUserProfileMutation } from "@/fetch_Api/service/user_Auth_Api";
// import { useDashboardData } from "@/pages/dashboard/Dashboard";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {DateValue, parseDate, getLocalTimeZone, today} from "@internationalized/date";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@nextui-org/react";
import { DatePicker } from "@nextui-org/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Avatar, AvatarGroup, AvatarIcon} from "@nextui-org/avatar";

interface User {
  id: number;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile: string;
  is_enable: boolean;
  gender: string;
  dob: string;
}

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  phone: z.string().max(160).min(4),
  gender: z.string().min(1, "Gender is required"),
  dob: z.string().min(1, "Date of Birth is required"),
  profile: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  // const { userData, Refetch } = useDashboardData();
  const [User, setUser] = useState<User | null>(null);
  const [selectedDate, setSelectedDate] = useState<DateValue>(parseDate("2024-04-04"));
  const [profileImage, setProfileImage] = useState<File | null>(null); // State for profile image file
  // const [UpdateProfile, { isLoading: isLoadingProfile }] = useUpdateUserProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
  });

  // useEffect(() => {
  //   if (userData) {
  //     setUser(userData);
  //     if (userData.dob) {
  //       setSelectedDate(new Date(userData.dob));
  //     }
  //     form.reset({
  //       name: userData.name,
  //       first_name: userData.first_name,
  //       last_name: userData.last_name,
  //       email: userData.email,
  //       phone: userData.phone,
  //       gender: userData.gender,
  //       dob: userData.dob,
  //     });
  //   }
  // }, [userData, form]);

  async function onSubmit(data: ProfileFormValues) {
    if (User) {
      let id = User.id;
      const NewFormData = new FormData();
      NewFormData.append("name", data.name);
      NewFormData.append("first_name", data.first_name);
      NewFormData.append("last_name", data.last_name);
      NewFormData.append("phone", data.phone);
      NewFormData.append("gender", data.gender);
      NewFormData.append("dob", data.dob);
      if (profileImage) {
        NewFormData.append("profile", profileImage);
      }
      // const res = await UpdateProfile({ NewFormData, id });
      // if (res.data) {
      //   setProfileImage(null);
      //   Refetch();
      //   toast.success(res.data.msg, {
      //     action: {
      //       label: "X",
      //       onClick: () => toast.dismiss(),
      //     },
      //   });
      // } else {
      //   console.log(res.error);
      // }
    }
  }

  function handleProfileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, profile: reader.result as string } : null
        );
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="profile"
          render={() => (
            <FormItem className="relative h-32">
              <FormLabel>Profile Picture</FormLabel>
              <FormControl>
                <label className="absolute top-16 left-36 cursor-pointer">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() =>
                      document.getElementById("fileInput")?.click()
                    }
                  >
                    Upload Profile
                  </Button>
                  <input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleProfileChange}
                    style={{ display: "none" }}
                  />
                </label>
              </FormControl>
              {/* {User?.profile && ( */}
                <Avatar 
                    src={User?.profile}
                    className="w-20 h-20 text-large" 
                    icon={<AvatarIcon />}
                    classNames={{
                      base: "bg-gradient-to-br from-[#FFB457] to-[#FF705B]",
                      icon: "text-black/80",
                    }}/>
              {/* )} */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  radius="sm"
                  variant="bordered"
                  placeholder="User Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  radius="sm"
                  variant="bordered"
                  placeholder="First Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  radius="sm"
                  variant="bordered"
                  placeholder="Last Name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  radius="sm"
                  variant="bordered"
                  placeholder="Email"
                  {...field}
                  value={User?.email}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input
                  radius="sm"
                  variant="bordered"
                  placeholder="Phone"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Birth</FormLabel>
              <FormControl>
                <DatePicker
                  label="Birth Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  maxValue={today(getLocalTimeZone())}
                  variant="bordered"
                  showMonthAndYearPickers
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary" type="submit">
          Update profile
        </Button>
        {/* <Button loading={isLoadingProfile} disabled={isLoadingProfile} type="submit">Update profile</Button> */}
      </form>
    </Form>
  );
}
