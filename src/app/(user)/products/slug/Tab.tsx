import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardFooter,
  Pagination,
  Chip,
  Textarea,
  ScrollShadow,
  Button,
} from "@nextui-org/react";
import DropDown from "./DropDown";
import ReviewCard from "./ReviewCard";
import Comments from "./Comments";
export default function Review_data() {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs size="md" variant="light" aria-label="Options">
          <Tab key="details" title="Details">
            <Card data-lenis-prevent className="min-h-[60vh] max-h-[60vh] p-3 overflow-hidden overflow-y-auto bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
              <ScrollShadow hideScrollBar size={100} className="w-[100%] h-[60vh]">      
                <CardBody className="discription_scroll">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </CardBody>
              </ScrollShadow>
            </Card>
          </Tab>
          <Tab key="review" title="Reviews">
            <Card className="min-h-[60vh] max-h-[80vh] overflow-hidden overflow-y-auto bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
              <CardBody className="flex gap-3 items-start justify-start flex-col">
                <DropDown />
                <ReviewCard />
                <ReviewCard />
                <ReviewCard />
              </CardBody>
              <CardFooter className="gap-3 justify-center">
                <Pagination total={10} color="secondary" />
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="discussion" title="Discussion">
            <Card className="min-h-[60vh] max-h-[80vh] overflow-hidden overflow-y-auto bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
              <CardBody className="flex gap-3 items-start justify-start flex-col">
                <Chip radius="sm">Discussion</Chip>
                <Comments />
                <Comments />
                {/* <Comments/> */}
              </CardBody>
              <CardFooter className="gap-3 justify-center flex-col">
                <Pagination total={10} color="secondary" />
                <form action="" className="flex flex-col justify-end items-end gap-2 w-full">
                <Textarea
                  label="Your Message"
                  classNames={{
                    input: "min-h-[40px] w-full",
                  }}
                  />
                <Button radius="sm" color="secondary">Comment</Button>
                </form>
              </CardFooter>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
