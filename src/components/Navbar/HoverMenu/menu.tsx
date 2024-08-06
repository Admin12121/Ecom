// "use client";
// import React, { useState } from "react";
// import { Menu, MenuItem, ProductItem } from "./navbar-menu";


// export default function ShopMenu() {
//     const [active, setActive] = useState<string | null>("Shop");
//   return (
//     <Menu setActive={setActive}>
//         <MenuItem setActive={setActive} active={active} item="Shop">
//             <div className="  text-sm flex  gap-10 p-4 ">
//                 <ProductItem
//                 title="Algochurn"
//                 href="https://algochurn.com"
//                 src="http://localhost:8000/media/a84c4cfb786d493607160dce783a7352.jpg"
//                 />
//                 <ProductItem
//                 title="Algochurn"
//                 href="https://algochurn.com"
//                 src="http://localhost:8000/media/e1157e383f9c6af59d8953d0fcf36a53.jpg"
//                 />
//                 <ProductItem
//                 title="Algochurn"
//                 href="https://algochurn.com"
//                 src="http://localhost:8000/media/3f511c05d47e3e54c1b882d61d284468.jpg"
//                 />
//                 <ProductItem
//                 title="Algochurn"
//                 href="https://algochurn.com"
//                 src="http://localhost:8000/media/a84c4cfb786d493607160dce783a7352.jpg"
//                 />
//                 <ProductItem
//                 title="View All"
//                 href="https://algochurn.com"
//                 />
//             </div>
//         </MenuItem>
//   </Menu>
//   );
// }


"use client";
import React, { useState, useEffect } from "react";
import { Menu, MenuItem, ProductItem } from "./navbar-menu";

const products = [
    { title: "Algochurn", href: "https://algochurn.com", src: "http://localhost:8000/media/a84c4cfb786d493607160dce783a7352.jpg" },
    { title: "Algochurn", href: "https://algochurn.com", src: "http://localhost:8000/media/e1157e383f9c6af59d8953d0fcf36a53.jpg" },
    { title: "Algochurn", href: "https://algochurn.com", src: "http://localhost:8000/media/3f511c05d47e3e54c1b882d61d284468.jpg" },
    { title: "Algochurn", href: "https://algochurn.com", src: "http://localhost:8000/media/a84c4cfb786d493607160dce783a7352.jpg" },
];

export default function ShopMenu() {
    const [active, setActive] = useState<string | null>(null);
    const [itemsToShow, setItemsToShow] = useState(products.length);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 950) {
                setItemsToShow(1);
            } else if (width < 1150) {
                setItemsToShow(2);
            } else if (width < 1250) {
                setItemsToShow(3);
            } else {
                setItemsToShow(products.length);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initialize on mount

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <Menu setActive={setActive}>
            <MenuItem setActive={setActive} active={active} item="Shop">
                <div className="text-sm flex gap-10 p-4">
                    {products.slice(0, itemsToShow).map((product, index) => (
                        <ProductItem
                            key={index}
                            title={product.title}
                            href={product.href}
                            src={product.src}
                        />
                    ))}
                    <ProductItem
                        title="View All"
                        href="/collections"
                    />
                </div>
            </MenuItem>
        </Menu>
    );
}
