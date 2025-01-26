"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "./backbutton";
import { Header } from "./header";
import Social from "./social";
import { cn } from "@/lib/utils";
interface CardwrapperProps {
  title: string;
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButton: string;
  backButtonHref: string;
  showSocial?: boolean;
  classNames?: {
    card?: string;
    header?: string;
    content?: string;
    footer?: string;
    backButton?: string;
    social?: string;
  };
}

const Cardwrapper = ({
  title,
  children,
  headerLabel,
  backButtonLabel,
  backButton,
  backButtonHref,
  showSocial,
  classNames = {},
}: CardwrapperProps) => {
  return (
    <Card
      className={cn(
        `w-full border-0 shadow-none p-4 !bg-neutral-900/10 rounded-2xl`
      )}
    >
      <Card
        className={cn(
          `w-full border-0 shadow-none p-7 bg-white rounded-2xl`,
          classNames?.card
        )}
      >
        <Header
          title={title}
          label={headerLabel}
          className={classNames.header || ""}
        />
        {showSocial && (
          <>
            <CardFooter className={classNames.social || ""}>
              <Social />
            </CardFooter>
            <div className="my-8 w-full relative">
              <div className="backdrop-blur-md text-nowrap p-2 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                or
              </div>
              <Separator orientation="horizontal" />
            </div>
          </>
        )}
        <CardContent className={classNames.content || ""}>
          {children}
        </CardContent>
        <CardFooter
          className={`flex items-center justify-center mt-4 font-normal ${classNames.footer || ""}`}
        >
          <p className="text-xs ">{backButtonLabel}</p>
          <BackButton
            label={backButton}
            href={backButtonHref}
            className={classNames.backButton || ""}
          />
        </CardFooter>
      </Card>
    </Card>
  );
};

export default Cardwrapper;
