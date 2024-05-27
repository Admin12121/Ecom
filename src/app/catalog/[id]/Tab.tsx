import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

export default function Review_data() {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs size="md" variant="light" aria-label="Options">
          <Tab key="details" title="Details">
            <Card className="min-h-[60vh]">
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="review" title="Reviews">
            <Card className="min-h-[60vh]">
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="discussion" title="Discussion">
            <Card className="min-h-[60vh]">
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
