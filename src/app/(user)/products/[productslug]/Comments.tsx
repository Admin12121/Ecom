import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import Star from "./star";

export default function Comments() {
  const [isFollowed, setIsFollowed] = React.useState(false);

  return (
    <Card className="w-full min-h-36 flex flex-col gap-2">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="md" src="https://nextui.org/avatars/avatar-1.png" />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">Zoey Lang</h4>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-default-400">
        <p>
          Frontend developer and UI/UX enthusiast. Join me on this coding adventure!
        </p>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1 cursor-pointer">
          <p className="font-semibold text-default-400 text-small">reply</p>
        </div>
      </CardFooter>
    </Card>
  );
}
