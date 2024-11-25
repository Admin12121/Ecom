"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "./backbutton";
import { Header } from "./header";
import Social from "./social";
interface CardwrapperProps {
  title: string;
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
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
  backButtonHref,
  showSocial,
  classNames = {},
}: CardwrapperProps) => {
  return (
    <Card className={`w-full border-0 shadow-none p-7 ${classNames.card || ""}`}>
      <Header title={title} label={headerLabel} className={classNames.header || ""} />
      <CardContent className={classNames.content || ""}>{children}</CardContent>
      {showSocial && (
        <>
          <div className="my-10 w-full relative">
            <div className="bg-black text-nowrap p-3 absolute text-themeTextGray text-xs top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              OR CONTINUE WITH
            </div>
            <Separator orientation="horizontal" className="bg-themeGray" />
          </div>
          <CardFooter className={classNames.social || ""}>
            <Social />
          </CardFooter>
        </>
      )}
      <CardFooter className={`flex justify-center ${classNames.footer || ""}`}>
        <BackButton
          label={backButtonLabel}
          href={backButtonHref}
          className={classNames.backButton || ""}
        />
      </CardFooter>
    </Card>
  );
};

export default Cardwrapper;
