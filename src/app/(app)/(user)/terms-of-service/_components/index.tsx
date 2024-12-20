"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown } from "lucide-react";

const items = [
  {
    id: "1",
    title: "Ownership of the Site",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6 ">
          <span>
            <p>
              This website is operated by Nepal Heritage Handicraft, a private
              limited liability company incorporated in Patan,Lalitpur,Nepal.
              Throughout the site, the terms “we”, “us” and “our” refer to Nepal
              Heritage Handicraft. Nepal Heritage Handicraft offers this
              website, including all information, tools, and services available
              from this site to you, the user, conditioned upon your acceptance
              of all terms, conditions, policies, and notices stated here.
            </p>
          </span>
        </section>
      </div>
    ),
  },
  {
    id: "2",
    title:
      "Terms & Conditions regarding use of the online store nepalheritagehandicraft.com",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <section className="space-y-6">
          <p>
            These Terms & Conditions regulate the use of the online store
            nepalheritagehandicraft.com, including the purchase of any available
            products. Through this Site, Nepal Heritage Handicraft sells
            exclusively to consumers. If we conclude that a certain order is not
            placed by a consumer or, in general, if an order is deemed to be
            fraudulent or presumed as such, we will consider it null and void.
            By visiting our Site, completing a purchase or engaging in any other
            available activity, you agree to comply with these Terms &
            Conditions, which constitute an agreement between the person
            accepting these Terms & Conditions (hereinafter “Customer", “you” or
            “your”) and Nepal Heritage Handicraft. The acceptance of these Terms
            and Conditions entails that the purchase of any products on our Site
            is not directly related to any professional activity and is limited
            to strictly personal use. The Customer, before placing an order,
            declares to have legal capacity that allows him to fully comply with
            the commitments arising from the conclusion of the agreement, namely
            payment. Nepal Heritage Handicraft shall not be held liable for any
            purchases placed by a person without full legal capacity. If an
            order is placed by a person without legal capacity, the legal
            representatives shall be responsible for such order and all related
            obligations. Nepal Heritage Handicraft may, at its own discretion
            and convenience, at any time and without prior notice, suspend the
            Site, in particular to ensure its repair and maintenance, or close
            it completely.
          </p>
          <p>
            If your data is being processed based on your consent, you may
            withdraw your consent at any time. The withdrawal of consent will
            not affect the lawfulness of processing based on consent that Nepal
            Heritage Handicraft carried out before the withdrawal.
          </p>
        </section>
      </div>
    ),
  },
  {
    id: "3",
    title: "Intellectual Property",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <p>
          All copyright, trademarks and other intellectual or industrial
          property rights inherent to the products, texts, images and other
          content in general, shared on our Site, are owned by Nepal Heritage
          Handicraft or are being used by us with the permission of the
          respective owner. Access, viewing or downloading of Site content must
          respect the intellectual property rights that protect such content. In
          particular, it is prohibited to extract, use, reproduce or disseminate
          the content of the Site for commercial purposes and to alter or
          incorporate it into any article, publication or other Site. Nothing on
          this Site can be interpreted as granting any license, authorization or
          right to use any intellectual property right mentioned. Incorrect or
          abusive use or use of the brand or any other content of this Site is
          expressly prohibited, except as provided in these Terms and
          Conditions.
        </p>
      </div>
    ),
  },
  {
    id: "5",
    title: "Links to Other Websites and Apps",
    content: (
      <div className="flex flex-col pb-3 pt-3 text-base dark:text-muted-foreground">
        <p>
          Our Site may display links to other websites or applications that are
          not under the control of Nepal Heritage Handicraft and for which Nepal
          Heritage Handicraft is not responsible. Nepal Heritage Handicraft does
          not have control over and assumes no responsibility for the content,
          privacy policies or practices of any third party websites or services.
          In particular, Nepal Heritage Handicraft does not guarantee the
          reliability of the contents of these links nor is it responsible for
          changes to them. You further acknowledge and agree that Nepal Heritage
          Handicraft shall not be responsible or liable, directly or indirectly,
          for any damage or loss alleged to be caused by or in connection with
          the use of any content, goods or services available on or through any
          such websites, apps or services.
        </p>
      </div>
    ),
  },
  {
    id: "6",
    title: "Prices",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>
          Prices for our products are subject to change without notice. We
          reserve the right at any time to modify or discontinue the Service (or
          any part or content thereof) without notice at any time. We shall not
          be liable to you or to any third-party for any modification, price
          change, suspension or discontinuance of the Service.
        </p>
        <p>
          These prices displayed do not include shipping fees, which are added
          to the price of the products purchased. Shipping rates are indicated
          before the Customer confirms and finishes the order.
        </p>
        <p>
          Prices include value added tax (VAT) in force on the date of the
          order. Any change in the applicable VAT rate will be automatically
          reflected in the price of products sold on this Site.
        </p>
      </div>
    ),
  },
  {
    id: "7",
    title: "Purchase of Products",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>Customers may purchase any of the products available on our Site.</p>
        <p>
          Before placing an order, the Customer is obliged to consider all the
          information available on our Site about the essential characteristics
          of the product or products they wish to purchase.
        </p>
        <p>
          Nepal Heritage Handicraft does not assure that the product package
          information is translated in every language. However, this information
          will be available at least in English.
        </p>

        <h2>1. Product Availability</h2>
        <p>
          Products displayed for sale on our Site will be available as long as
          they are displayed and up to the stock limits.
        </p>
        <p>
          Nepal Heritage Handicraft may change the variety of products offered
          for sale on the Site at any time, in accordance with specific
          limitations related to its suppliers, without prejudice to the orders
          already placed by the Customer.
        </p>
        <p>
          If the product ordered by the Customer is no longer available, Nepal
          Heritage Handicraft will immediately inform the Customer and refund
          the price of the product to the payment method used by the Customer
          during the purchase, within 10 days of becoming aware of the
          unavailability of the product.
        </p>

        <h2>2. Placing an Order</h2>
        <p>
          Any order placed by the Customer implies the acceptance of these Terms
          & Conditions and the Privacy Policy.
        </p>
        <p>
          Before concluding the order and proceeding to payment, Customers have
          the opportunity to verify the details of the order, make adjustments
          as needed, and correct any mistakes.
        </p>
        <p>
          The distance agreement is considered concluded when the Customer
          confirms the order and validates payment. After confirming the order
          and validating the payment, the Customer may no longer cancel the
          order.
        </p>
        <p>
          Nepal Heritage Handicraft will send an email confirmation to the
          address indicated by the Customer, including a copy of these Terms &
          Conditions. Nepal Heritage Handicraft is not responsible for
          unreceived confirmation emails if there are errors in the email
          provided by the Customer.
        </p>
        <p>
          Nepal Heritage Handicraft reserves the right to suspend or cancel any
          order and/or delivery, regardless of its nature and level of
          execution, in case of lack of or partial payment of any amount owed by
          the Customer, in case of payment incidents, or in the event of fraud
          or attempted fraud related to the use of our Site, including in
          relation to previous orders.
        </p>

        <h2>3. Payment</h2>
        <p>
          The Customer may pay for the order using the following payment
          methods:
        </p>
        <ul className="ml-6">
          <li>{`a ) Credit card`}</li>
          <li>{`b ) Debit card`}</li>
          <li>{`c ) Esewa`}</li>
        </ul>
        <p>
          The Customer guarantees they have the necessary authorizations to use
          the chosen payment method when confirming the order.
        </p>
        <p>
          All bank card payments are subject to validation and authorization
          checks by the card issuer. If the bank card issuer denies, or for any
          reason does not authorize the payment, Nepal Heritage Handicraft will
          not be responsible for any delay or non-delivery of any orders.
        </p>

        <h2>4. Shipping and Delivery</h2>
        <p>
          Nepal Heritage Handicraft offers a variety of shipping methods and
          rates, from which the Customer may choose. The availability of
          shipping methods may be changed at any time by Nepal Heritage
          Handicraft.
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Delivery Time</TableHead>
              <TableHead>Costs</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Standard</TableCell>
              <TableCell>5-7 business days</TableCell>
              <TableCell>Calculated at checkout</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Expedited</TableCell>
              <TableCell>2-3 business days</TableCell>
              <TableCell>Calculated at checkout</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>International</TableCell>
              <TableCell>7-14 business days</TableCell>
              <TableCell>Calculated at checkout</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <p>
          The shipping price is calculated at checkout, depending on each order
          and the address indicated by the Customer.
        </p>
        <p>
          The products ordered will be delivered to the address indicated by the
          Customer during the order placement.
        </p>

        <h2>5. Damages and Anomalies</h2>
        <p>
          The Customer or the person authorized to receive the order shall
          verify the order and the products upon its receipt. In case the
          Customer or the person authorized to receive the order detects any
          damage or anomaly in the package or in the product, or the absence of
          any product ordered, they must refuse the delivery and promptly
          contact Nepal Heritage Handicraft’s Customer Service (contact details
          below).
        </p>
        <p>
          If the damage or anomaly is detected only after the conclusion of the
          delivery, the Customer or the person authorized to receive the order
          must promptly contact Nepal Heritage Handicraft’s Customer Service.
        </p>
        <p>
          Any damage or anomaly must be reported to Customer Service within 5
          working days after receipt. Customer Service will conduct a thorough
          analysis of the issue reported. In the event that Customer Service
          concludes that the damage or anomaly was Nepal Heritage Handicraft’s
          or the carrier’s fault, Nepal Heritage Handicraft will replace the
          defective/damaged items by sending a new shipment OR refund the amount
          spent on the items with anomalies, according to the Customer’s best
          interests.
        </p>

        <h2>6. Delivery Times and Delays</h2>
        <p>
          The above-mentioned delivery times are merely indicative and may vary
          during promotional campaigns, sales, or other. If the delivery times
          are not met, the Customer may contact Customer Service. The Customer
          is not entitled to a refund or a discount merely due to delays in
          delivery.
        </p>
        <p>
          Notwithstanding the foregoing, Nepal Heritage Handicraft will ship the
          order at most 30 days after the conclusion of the agreement in
          accordance with paragraph 9.2. If Nepal Heritage Handicraft is unable
          to deliver the order within this timeframe due to the unavailability
          of the products, we will inform the Customer and fully reimburse them
          within 30 days of such unavailability.
        </p>
      </div>
    ),
  },
  {
    id: "8",
    title: "Customer Reviews System",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>
          Customers may write reviews for the products displayed on our Site.
          Writing a review implies the acceptance of these Terms & Conditions
          and the Privacy Policy.
        </p>
        <p>
          The system that allows Customers to publish reviews permits them to
          leave reviews, advice, tips, suggestions, information, and
          recommendations regarding products sold by Nepal Heritage Handicraft
          and assign them a rating that can vary between one and five stars.
        </p>
        <p>
          Nepal Heritage Handicraft will eliminate any review that we conclude
          was published in breach of these Terms & Conditions.
        </p>
        <p>
          All reviews are divided into divisions: Score, Title, Review,
          Recommended, Fitting, and ‘Did your order arrive within the time
          mentioned?’. Customers may also add a photo of the product when
          submitting a review.
        </p>
        <p>
          The writing and publishing of reviews cannot be used as a means of
          disseminating content that violates morality, public order, the rights
          of third parties, or applicable legislation and regulations, namely:
        </p>
        <ul className="list-disc list-inside ml-6">
          <li>
            Statements or messages of a libelous, abusive, obscene, racist,
            offensive nature or that, in any way, refer to illegal activities;
          </li>
          <li>
            Any abuse of freedom of expression, such as comments that include
            systematic and non-objective criticism, as well as comments of a
            derogatory or malicious nature;
          </li>
          <li>
            Content of a violent or pornographic nature, or that may jeopardize
            respect for the human person or their dignity, equality between
            women and men, or the protection of children and teenagers;
          </li>
          <li>
            Statements or messages that incite crimes or offenses, violence,
            discrimination, or racial hatred;
          </li>
          <li>Unauthorized use of a name, email address, or company name;</li>
          <li>
            The total or partial reproduction of content protected by
            intellectual property rights and over which the Customer does not
            have the necessary rights, as well as messages that constitute an
            infringement of a registered trademark.
          </li>
        </ul>
        <p>
          Customers must not use the system for advertising, prospecting,
          canvassing, or proselytizing purposes, for professional, commercial,
          or political purposes, including advertising messages, spam content,
          or references to other products, commercial offers, brands, or
          websites.
        </p>
        <p>Reviews must not comprise:</p>
        <ul className="list-disc list-inside ml-6">
          <li>
            Any information prone to identify the Customer or a third party,
            including emails, URLs, telephone numbers, and addresses;
          </li>
          <li>
            Comments criticizing other reviews published on the Site or their
            authors;
          </li>
          <li>
            Comments regarding another product or problems that occurred when
            ordering;
          </li>
          <li>
            Comments that encourage the purchase of products from a competitor
            of Nepal Heritage Handicraft.
          </li>
        </ul>
        <p>
          Customers are fully responsible for the content written on their
          respective reviews.
        </p>
        <p>
          Upon completion of the review, Nepal Heritage Handicraft will send a
          communication to the email provided to verify if the person wrote the
          review.
        </p>
        <p>
          Nepal Heritage Handicraft reserves the right not to publish or to
          eliminate any review that contends with these Terms & Conditions. In
          this situation, the Customer will be notified by email.
        </p>
      </div>
    ),
  },
  {
    id: "9",
    title: "Customer Service and Contacts",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>
          For any additional information or if you need assistance, you may
          reach Nepal Heritage Handicraft through the following contacts: ·
        </p>
        <a
          href="mailto:info@nepalheritagehandicraft.com"
          className="cursor-pointer dark:text-white text-black"
        >
          info@nepalheritagehandicraft.com
        </a>
      </div>
    ),
  },
  {
    id: "10",
    title: "Limitation of Liability",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>
          Nepal Heritage Handicraft is not liable for failure to comply with the
          obligations set forth herein if the failure to comply is due to any
          act of any third party, even if foreseeable, results from any fault of
          the Customer, or from a force majeure event, or any other event that
          is not reasonably within the control of Nepal Heritage Handicraft.
        </p>
        <p>
          Nepal Heritage Handicraft assumes no responsibility for any failure or
          non-conformity of its services caused by circumstances beyond its
          control. These circumstances may include, but are not limited to,
          failures in the functioning of the Site resulting from the law, acts
          of the State or public authorities, acts of war, terrorism, strikes,
          physical blockades and natural disasters.
        </p>
        <p>
          The information available on our Site is provided “as is” without any
          type of warranty, express or implied, particularly in relation to the
          integrity, accuracy, timeliness, non-infringement, availability,
          reliability or completeness of the information, products, accessories
          or services contained on our Site or its suitability for the use that
          the Customer intends to make.
        </p>
        <p>
          Nepal Heritage Handicraft rejects any responsibility for any direct,
          indirect and/or accidental damages resulting from the Customer's use
          or inability to use the content and services contained on our Site.
        </p>
      </div>
    ),
  },
  {
    id: "11",
    title: "Applicable Law and Dispute Resolution",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>These Terms and Conditions are governed by the laws of Nepal.</p>
      </div>
    ),
  },
  {
    id: "12",
    title: "Update of the Terms and Conditions",
    content: (
      <div className="flex flex-col pb-3 gap-2 pt-3 text-base dark:text-muted-foreground">
        <p>
          These Terms and Conditions may be updated at any time. Therefore,
          Nepal Heritage Handicraft recommends that you visit this document
          regularly. Visiting our Site or completing a purchase are subject to
          the Terms and Conditions in force in that moment.
        </p>
        <p>
          Whenever there is a change to these Terms and Conditions, Nepal
          Heritage Handicraft will publish it on this page. Furthermore, if the
          changes can impact the relationship between Nepal Heritage Handicraft
          and its Customers, we will publish a more detailed notice and/or
          notify you by email, if you have registered in our Site.
        </p>
      </div>
    ),
  },
];

export default function TermsofConditionsAccordion() {
  return (
    <div className="space-y-4 max-w-[95rem] w-full lg:w-auto">
      <Accordion
        type="multiple"
        className="w-full space-y-2"
      >
        {items.map((item) => (
          <AccordionItem
            value={item.id}
            key={item.id}
            className="rounded-lg bg-background dark:bg-neutral-900 px-4 py-1"
          >
            <AccordionTrigger icon={<ChevronDown className="text-neutral-700"/>} className="py-2 text-base leading-6 hover:no-underline w-full md:w-[50rem]">
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
