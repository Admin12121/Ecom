"use client"
import React from "react";
import { Separator } from "@/components/ui/separator";
import ProfileForm  from "@/app/(user)/(auth)/profile/profile-form";
import dynamic from "next/dynamic";

const Profile = dynamic(
  () => import("@/components/User/[Auth]/Profile/Profile"),
  { ssr: false }
);

// export default function Page() {
//   return (
//      <Profile />
//     );
//   }

export default function SettingsProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator />
      <ProfileForm />
    </div>
  );
}
