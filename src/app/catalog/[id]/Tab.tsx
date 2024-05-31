import { Tabs, Tab, Card, CardBody,CardFooter,Pagination, Button } from "@nextui-org/react";
import DropDown from "./DropDown";
import ReviewCard from "./ReviewCard";
export default function Review_data() {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs size="md" variant="light" aria-label="Options">
          <Tab key="details" title="Details">
            <Card className="min-h-[60vh] bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="review" title="Reviews">
            <Card className="min-h-[60vh] max-h-[80vh] overflow-hidden overflow-y-auto bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
              <CardBody className="flex gap-3 items-start justify-start flex-col">
              <DropDown/>
              <ReviewCard/>
              <ReviewCard/>
              <ReviewCard/>
              </CardBody>
              <CardFooter className="gap-3 justify-center">
                <Pagination
                  total={10}
                  color="secondary"
                />
              </CardFooter>
            </Card>
          </Tab>
          <Tab key="discussion" title="Discussion">
            <Card className="min-h-[60vh] bg-gradient-to-br from-white to-default-200 dark:from-default-50 dark:to-black">
              <CardBody>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
