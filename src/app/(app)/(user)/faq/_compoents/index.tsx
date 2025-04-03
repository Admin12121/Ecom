"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const shipping = [
  {
    id: "1",
    title: "What are the shipping fees and delivery times?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6 ">
          <span>
            <p>
              Delivery estimates are just that. They are not guaranteed delivery
              times and should not be relied upon as such.
            </p>
            <p>
              Delivery times will depend on where you are located, our shipping
              partners, and the service of your choice. We are not responsible
              for any delays in delivery caused by customs clearance or other
              events beyond our control.
            </p>
            <p>Standard: 7 to 14 business days - Free</p>
          </span>
        </section>
      </div>
    ),
  },
  {
    id: "2",
    title: "IS a signature required on delivery?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6">
          <p>
            A signature will not be required upon delivery of any of our
            shipping services.
          </p>
        </section>
      </div>
    ),
  },
  {
    id: "3",
    title: "What should i do if my delivery is late?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <p>
          Delivery time refers to the number of days between the collection of
          the package from our warehouse and the first delivery attempt. This
          does not account for the order preparation time, additional delivery
          attempts, or the date or days available at a carrier pick-up point.
          Please note that delivery estimates are just that. They are not
          guaranteed delivery times and should not be relied upon as such. If
          your order is late and you don't have any recent update on your
          tracking number, we kindly ask for you contact our Customer Support
          Team at info@nepalheritagehandicraft.com.
        </p>
      </div>
    ),
  },
];

const payment = [
  {
    id: "1",
    title: "What currencies do you accept?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6 ">
          <span>
            <p>All payments on our website are processed in USD and NRP.</p>
          </span>
        </section>
      </div>
    ),
  },
  {
    id: "2",
    title: "What method of payment do you accept?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section>
          <p>We accept the following payment methods:</p>
          <ul className="list-disc pl-5 pt-2">
            <li>eSewa for Nepal</li>
            <li>Visa</li>
            <li>Mastercard</li>
            <li>PayPal</li>
          </ul>
        </section>
      </div>
    ),
  },
];

const order = [
  {
    id: "1",
    title: "Can I cancel my order?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6 ">
          <span>
            <p>
              Please note that as our team is constantly making efforts to get
              your order dispatched as quickly as possible, we may not be able
              to cancel your order upon request. Please send an email to
              contact@nepalheritagehandicraft.com requesting to cancel the order
              and provide us with the name of the person who made the order, the
              email address, and the transactionuid or if your payment failed
              you can cancled your order by yourself.
            </p>
          </span>
        </section>
      </div>
    ),
  },
  {
    id: "2",
    title: "Can I change my delivery address?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section>
          <p>
            As a customer, you can change your address during the first 15
            minutes after completing a purchase.
          </p>
          <p>
            Please note that as our team is constantly making efforts to get
            your order dispatched as quickly as possible, we&apos;re unable to
            guarantee changes to the delivery address. Once the order is
            shipped, we at Nepal heritage handicraft will be unable to change
            the delivery address.
          </p>
        </section>
      </div>
    ),
  },
  {
    id: "3",
    title: "Can I change my order?",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section>
          <p>
            Please note that as our team is constantly making efforts to get
            your order dispatched as quickly as possible, we may not be able to
            update your order upon request, either on items or delivery details.
            Please send an email to info@nepalheritagehandicraft.com, if the order was not
            sent out when our support assistant reads your request, he/she may
            be able to update it.
          </p>
        </section>
      </div>
    ),
  },
];

export default function FAQAccordion() {
  return (
    <div className="space-y-4 max-w-[50rem] w-full lg:w-auto">
      <p className="text-lg text-neutral-500">Shipping</p>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
      >
        {shipping.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="rounded-lg bg-background dark:bg-neutral-900 px-4 py-1"
          >
            <AccordionTrigger className="py-2 text-base leading-6 hover:no-underline w-full md:w-[50rem]">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground max-w-[50rem]">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-lg text-neutral-500">Payment</p>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
      >
        {payment.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="rounded-lg bg-background dark:bg-neutral-900 px-4 py-1"
          >
            <AccordionTrigger className="py-2 text-base leading-6 hover:no-underline w-full md:w-[50rem]">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground max-w-[50rem]">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <p className="text-lg text-neutral-500">Order</p>
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
      >
        {order.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="rounded-lg bg-background dark:bg-neutral-900 px-4 py-1"
          >
            <AccordionTrigger className="py-2 text-base leading-6 hover:no-underline w-full md:w-[50rem]">
              {item.title}
            </AccordionTrigger>
            <AccordionContent className="pb-2 text-muted-foreground max-w-[50rem]">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
