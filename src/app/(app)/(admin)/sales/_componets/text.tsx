import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
  useCallback,
} from "react";
import { Plus as FiPlus, ShoppingCart, Truck } from "lucide-react";
import { color, motion, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  price: number;
  qty: number;
  total: number;
  transition: number;
  product: string;
  variant: string;
  categoryname?: string;
  description?: string;
  images?: string;
  product_name?: string;
  productslug?: string;
}

export interface Order {
  id: number;
  products: CartItem[];
  costumer_name: string;
  transactionuid: string;
  status: string;
  total_amt: number;
  sub_total: number;
  shipping: {
    city: string;
    country: string;
  };
  discount: number;
  payment_method: string;
  redeem_data: any;
  payment_intent_id: any;
  created: string;
  updated_at: string;
}

export interface CategorizedOrders {
  onShipping: Order[];
  arrived: Order[];
  canceled: Order[];
  delivered: Order[];
}

export const CustomKanban = ({ data }: { data: CategorizedOrders }) => {
  return (
    <div className="h-screen w-full">
      <div className="grid grid-cols-4 h-full w-full gap-3 overflow-scroll px-6">
        <Column
          title="OnShipping"
          column="onshipping"
          headingColor="text-orange-400"
          headingBgColor="bg-orange-400"
          cards={data.onShipping}
        />
        <Column
          title="Arrived"
          column="arrived"
          headingColor="text-blue-400"
          headingBgColor="bg-blue-400"
          cards={data.arrived}
        />
        <Column
          title="Delivered"
          column="delivered"
          headingColor="text-green-400"
          headingBgColor="bg-green-400"
          cards={data.delivered}
        />
        <Column
          title="Canceled"
          column="canceled"
          headingColor="text-red-400"
          headingBgColor="bg-red-400"
          cards={data.canceled}
        />
      </div>
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  headingBgColor: string;
  cards: Order[];
  column: any;
};

const Column = ({
  title,
  headingColor,
  headingBgColor,
  cards,
  column,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    // if (before !== cardId) {
    //   let copy = [...cards];

    //   let cardToTransfer = copy.find((c) => c.id === cardId);
    //   if (!cardToTransfer) return;
    //   cardToTransfer = { ...cardToTransfer, column };

    //   copy = copy.filter((c) => c.id !== cardId);

    //   const moveToBack = before === "-1";

    //   if (moveToBack) {
    //     copy.push(cardToTransfer);
    //   } else {
    //     const insertAtIndex = copy.findIndex((el) => el.id === before);
    //     if (insertAtIndex === undefined) return;

    //     copy.splice(insertAtIndex, 0, cardToTransfer);
    //   }

    //   setCards(copy);
    // }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  return (
    <div className="w-full shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3
          className={`font-medium flex gap-2 relative items-center px-2 ${headingColor}`}
        >
          <span
            className={cn(
              "animate-ping absolute inline-flex h-2 w-2  rounded-full ",
              headingBgColor
            )}
          ></span>
          <span
            className={cn(
              "inline-flex h-2 w-2 right-0 top-0 rounded-full ",
              headingBgColor
            )}
          ></span>
          {title}
        </h3>
        <span className="rounded text-sm text-neutral-400">{cards.length}</span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? "bg-neutral-800/50" : "bg-neutral-800/0"
        }`}
      >
        {cards.map((c) => {
          return <Card key={c.id} {...c} handleDragStart={handleDragStart} />;
        })}
        <DropIndicator beforeId={null} column={column} />
      </div>
    </div>
  );
};

type DragStartHandler = (e: DragEvent, card: CardType) => void;

const Card = ({
  transactionuid,
  id,
  status,
  total_amt,
  created,
  handleDragStart,
}: Order & {
  handleDragStart: DragStartHandler;
}) => {
  const truncateText = useCallback(
    (text: string, maxLength: number): string => {
      return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    },
    []
  );
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };
  const calculateEstimatedArrival = (
    created: string,
    daysToAdd: number
  ): string => {
    const createdDate = new Date(created);
    createdDate.setDate(createdDate.getDate() + daysToAdd);
    return formatDate(createdDate);
  };
  const handleMotionDragStart = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const dragEvent = event as unknown as DragEvent;
    handleDragStart(dragEvent, { transactionuid, id: id.toString(), status });
  };

  return (
    <>
      <DropIndicator beforeId={id.toString()} column={status} />
      <motion.div
        layout
        layoutId={id.toString()}
        draggable="true"
        onDragStart={handleMotionDragStart}
        className="cursor-grab rounded-lg border border-neutral-700 bg-neutral-800 p-2 active:cursor-grabbing"
      >
        <p className="text-sm text-neutral-100 flex items-center gap-1">
          <Truck className="w-4 h-4" />
          {truncateText(transactionuid, 15)}
        </p>
        <p className="text-sm text-neutral-500 flex items-center gap-1 pt-2">
          Estimated arrival: {calculateEstimatedArrival(created, 7)}
        </p>
        <div className="w-full flex justify-between items-end">
          <p>Total: $ {total_amt}</p>
          <Button size="sm">Details</Button>
        </div>
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};




type CardType = {
  transactionuid: string;
  id: string;
  status: any;
};
