"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "Information we collect and information you provide",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6 ">
          <span>
            <p>
              Personal Information is any information that can be directly or
              indirectly associated with you.
            </p>
            <p>
              We automatically collect information about you when you visit our
              Site, interact with us, or shop one of our products, as well as
              when you register an account or complete a transaction through our
              Site:
            </p>
          </span>
          <ul className="list-disc list-inside px-3 text-base">
            <li>
              Profile Information: Name, title, profile picture, VAT number.
            </li>
            <li>Contact Information: Email address, phone number, address.</li>
            <li>
              Device Information: Information about the devices you use or
              interact with our Site, namely IP address, device identifiers,
              cookie IDs, browser, network connection, and other unique
              identifiers or device information.
            </li>
            <li>Billing Information: Billing information and purchase data.</li>
            <li>
              Site Interactions: Viewed and visited products, product reviews
              and ratings written and shared by you, your order history, and
              marketing activities.
            </li>
            <li>
              Communication Information: Message and email content when you
              communicate with us.
            </li>
            <li>
              Social Network Accounts: Information when you link, connect, or
              link to our Site through a third-party online service.
            </li>
            <li>Other Similar Information: Additional relevant data.</li>
          </ul>
          <h4 className="text-base ">
            Here you can find a more detailed list of the data we process:
          </h4>
          <ul className="list-inside space-y-4">
            <li>
              <p>
                When you visit, register, or make orders on our Site, we
                collect:
              </p>
              <ul className="list-disc list-inside ml-6">
                <li>Contact details, such as your name and email.</li>
                <li>Demographic data, such as your age and gender.</li>
                <li>
                  Your account login details, which will be your email address.
                </li>
                <li>
                  Some specific data you have shared with Social network
                  accounts: when you link, connect, or link to our Site through
                  a third-party online service.
                </li>
                <li>Billing information and purchase data.</li>
                <li>
                  Email and shopping service integrations: information from the
                  email that you link to your Loyalty Rewards Program account.
                </li>
              </ul>
            </li>
            <li>
              <p>
                When you answer questions in surveys or on our Site, we collect:
              </p>
              <ul className="list-disc list-inside ml-6">
                <li>Your opinions on our brand.</li>
                <li>
                  Information about your behaviors, for example, what shops you
                  like to shop in, what TV shows you have recently watched, or
                  what kind of things you own.
                </li>
                <li>
                  Device and browser metadata, including IP address, the make,
                  model, and operating system of the device you have used, and
                  browser type.
                </li>
              </ul>
            </li>
            <li>
              <p>When you browse our Site, we collect:</p>
              <ul className="list-disc list-inside ml-6">
                <li>
                  Information through the use of cookies and similar
                  technologies. <a href="#cookies-section">Click here</a> to go
                  to the section about the data we collect using cookies.
                </li>
              </ul>
            </li>
            <li>
              <p>
                When you contact us or interact with our Site or social media
                pages, we collect:
              </p>
              <ul className="list-disc list-inside ml-6">
                <li>
                  Any personal data that you may provide about yourself,
                  including your name and contact details and the conversation
                  history of our communications with you.
                </li>
                <li>
                  Any comments you make on our website or social media pages.
                </li>
              </ul>
            </li>
          </ul>
        </section>
      </div>
    ),
  },
  {
    id: "2",
    title: "Use of information",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6">
          <p>
            We generally process Personal Information that we collect to fulfill
            our contractual obligations to you, in furtherance of our legitimate
            interests in operating the Services and our business and where you
            have consented to such usage. We may also process your Personal
            Information to comply with a legal obligation, namely regarding
            fraud prevention.
          </p>
          <p>
            If your data is being processed based on your consent, you may
            withdraw your consent at any time. The withdrawal of consent will
            not affect the lawfulness of processing based on consent that Nepal
            Heritage Handicraft carried out before the withdrawal.
          </p>
          <h4 className="text-base">
            More specifically, Nepal Heritage Handicraft processes your Personal
            Information:
          </h4>
          <ul className="list-disc list-inside px-3 space-y-2">
            <li>
              To provide, update, maintain, protect, improve, and customize the
              Services and our business. This includes processing of Personal
              Information to support delivery of the Services, transaction
              processing, prevent or address service errors, security or
              technical issues, analyze and monitor usage, trends, and other
              activities or at your request.
            </li>
            <li>
              Nepal Heritage Handicraft may use your email address or phone
              number to send you notices (including any notices required by law,
              in lieu of communication by postal mail). If you correspond with
              Nepal Heritage Handicraft by email, we may retain the content of
              your email messages, your email address, and our responses.
            </li>
            <li>
              To personalize your experience, when you register an account or
              complete a transaction. This includes Personal Information to
              understand your buying/shopping preferences so that we may be able
              to advertise other products that you might be interested in, to
              notify you of items left as uncompleted transactions in your
              shopping cart, and related communications. Nepal Heritage
              Handicraft has a legitimate interest in collecting and using your
              email and information about your abandoned shopping cart to
              communicate with you about your uncompleted transaction.
            </li>
            <li>
              To improve customer service. Your information enables us to more
              effectively respond to your customer service requests and support
              needs.
            </li>
            <li>
              To communicate with you by responding to your transactions,
              requests, comments, and questions.
            </li>
            <li>
              To provide advertisement and promotion services and send you
              marketing communications, including offers and discounts, when you
              have consented to it.
            </li>
            <li>
              To track and implement your privacy preferences and settings.
            </li>
            <li>
              For reasons of authentication, integrity, security, and safety.
            </li>
            <li>
              We also use Information as otherwise described in this Privacy
              Policy.
            </li>
          </ul>
          <h4 className="text-base">Transfer of Personal Information:</h4>
          <p>
            For providing you our Services, we may transfer and share your
            Personal Information to other entities of Nepal Heritage
            Handicraft’s group and to third parties that may be located in other
            countries. Namely, we use service providers and intermediaries, such
            as companies that provide technological support and electronic
            payment processing companies, which must have access to some of your
            Personal Information, including but not limited to purposes of
            transaction processing and fraud prevention.
          </p>
          <p>
            However, these transfers are made solely and exclusively for the
            fulfillment of the purposes for which your Personal Information is
            collected and in accordance with our instructions, in strict
            compliance with the regulations on the processing of personal data
            and information security.
          </p>
          <ul className="list-disc list-inside px-3 space-y-2">
            <li>You have expressly consented to it; or</li>
            <li>
              The communication is made in order to comply with a legal
              obligation or a court order.
            </li>
          </ul>
          <h4 className="text-base">Storage of Personal Information:</h4>
          <p>
            Your Personal Information will only be kept for the period of time
            necessary to achieve the purposes for which it was collected or for
            the periods of time required by law.{" "}
            <span className="text-xs">
              (under the Constitution of Nepal (Constitution), Individual
              Privacy Act 2075 (2018) (Privacy Act) and the Individual Privacy
              Regulation 2077 (2020) (Privacy Regulation) along with other
              legislations such as the National Civil Code 2074 (2017) and
              National Penal Code (2074) 2017 can be regarded as laws which
              govern data protection in Nepal. )
            </span>
          </p>
          <p>
            Purchase and billing data will be kept during the execution of the
            purchase and sale agreement and, after its termination, it may still
            be kept for a reasonable period if you decide to use our Services
            again or to comply with our legal obligations, particularly those of
            a tax nature.
          </p>
        </section>
      </div>
    ),
  },
  {
    id: "3",
    title: "Your data protection rights",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <p>
          The entity responsible for the processing of your personal data
          (Controller) is Nepal Heritage Handicraft Shop Trading LTD, a private
          limited liability company constituted under the laws of Nepal and
          registered under number 980803543, with registered office at Patan,
          Lalitpur, Nepal 44700, hereinafter referred as “Nepal Heritage
          Handicraft,” “us,” or “we.” If you have any questions about this
          Privacy Policy or how we process your data, please refer to the
          ‘Contact Us’ section below.
        </p>
        <p>
          If you would like to: access, correct, amend or delete any personal
          information we have about you, register a complaint, or simply want
          more information, contact our Privacy Compliance Officer at
          contact@nepalheritagehandicraft.com or by mail at Nepal Heritage
          Handicraft.
        </p>
      </div>
    ),
  },
];

export default function PolicyAccordion() {
  return (
    <div className="space-y-4 max-w-[95rem] w-full lg:w-auto">
      <Accordion
        type="single"
        collapsible
        className="w-full space-y-2"
        defaultValue="3"
      >
        {items.map((item) => (
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
