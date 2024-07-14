import React, { useState } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

interface LabelsMap {
  merge: string;
  squash: string;
  rebase: string;
}

const DropDown: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<Set<string>>(new Set(["merge"]));

  const labelsMap: LabelsMap = {
    merge: "Newest",
    squash: "Oldest",
    rebase: "Popular",
  };

  const selectedOptionValue = Array.from(selectedOption)[0];

  return (
    <>
      <ButtonGroup variant="flat">
        <Button>{labelsMap[selectedOptionValue as keyof LabelsMap]}</Button>
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Button isIconOnly>
              <ChevronDownIcon />
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            disallowEmptySelection
            aria-label="Merge options"
            selectedKeys={selectedOption}
            selectionMode="single"
            onSelectionChange={(keys) => setSelectedOption(keys as Set<string>)}
            className="max-w-[300px]"
          >
            <DropdownItem key="merge" >
              {labelsMap["merge"]}
            </DropdownItem>
            <DropdownItem key="squash" >
              {labelsMap["squash"]}
            </DropdownItem>
            <DropdownItem key="rebase" >
              {labelsMap["rebase"]}
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </ButtonGroup>
    </>
  );
};

export default DropDown;

const ChevronDownIcon: React.FC = () => {
  return (
    <svg
      fill="none"
      height="14"
      viewBox="0 0 24 24"
      width="14"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9188 8.17969H11.6888H6.07877C5.11877 8.17969 4.63877 9.33969 5.31877 10.0197L10.4988 15.1997C11.3288 16.0297 12.6788 16.0297 13.5088 15.1997L15.4788 13.2297L18.6888 10.0197C19.3588 9.33969 18.8788 8.17969 17.9188 8.17969Z"
        fill="currentColor"
      />
    </svg>
  );
};
