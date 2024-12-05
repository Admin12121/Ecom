"use client";
import React, { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  useUpdateUserProfileMutation,
  useGetLoggedUserQuery,
} from "@/lib/store/Service/api";
import { useAuthUser } from "@/hooks/use-auth-user";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { UserRound } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { delay } from "@/lib/utils";

interface User {
  id: number;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  profile: string;
  is_enable: boolean;
  gender: string;
  dob: string;
}

const profileFormSchema = z.object({
    username: z
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
  profile: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { accessToken } = useAuthUser();
  const { data, isLoading, refetch } = useGetLoggedUserQuery(
    { token: accessToken },
    { skip: !accessToken }
  );
  const [user, setUser] = useState<User | null>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [updateProfile, { isLoading: isLoadingProfile }] =
    useUpdateUserProfileMutation();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: "",
      profile: "",
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
      form.reset({
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        gender: data.gender || user?.gender,
      });
    }
  }, [data, form, user]);

  const onSubmit = useCallback( async (data: ProfileFormValues) => {
    if (user) {
      const NewFormData = new FormData();
      NewFormData.append("name", data.username);
      NewFormData.append("first_name", data.first_name);
      NewFormData.append("last_name", data.last_name);
      NewFormData.append("phone", data.phone);
      NewFormData.append("gender", data.gender);
      if (profileImage) {
        NewFormData.append("profile", profileImage);
      }
      const toastId = toast.loading("Updating Profile...", {
        position: "top-center",
      });
      await delay(500);
      const res = await updateProfile({ NewFormData, token: accessToken});
      if (res.data) {
        setProfileImage(null);
        refetch();
        toast.success(res.data, {
          id: toastId,
          action: {
            label: "X",
            onClick: () => toast.dismiss(),
          },
        });
      } else {
        toast.error("Something went wrong!", {
          id: toastId,
          position: "top-center",
        });
      }
    }
  }, [user, accessToken]);

  const handleProfileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 max-w-2xl pb-10"
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
              <Avatar className="w-28 h-28">
                <AvatarImage src={user?.profile} alt="profile" />
                <AvatarFallback>
                  <UserRound className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input className="bg-white" placeholder="user Name" {...field} />
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
                <Input className="bg-white" placeholder="First Name" {...field} />
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
                <Input className="bg-white" placeholder="Last Name" {...field} />
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
                <Input className="bg-white"
                  placeholder="Email"
                  {...field}
                  value={user?.email || ''}
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
                <Input className="bg-white" placeholder="Phone" {...field} />
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
              <Select onValueChange={field.onChange} value={user?.gender || ''}>
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
        <Button variant="secondary" type="submit" loading={isLoadingProfile || isLoading}>
          Update profile
        </Button>
      </form>
    </Form>
  );
}
