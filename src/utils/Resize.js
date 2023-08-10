import { useEffect, useState } from "react";
import { ADD_ITEMS, ITEMS_PER_PAGE } from "./constants";

export function useHandleResize() {
  const [itemsPerPage, setItemsPerPage] = useState({
    itemsPerPage: ITEMS_PER_PAGE,
    addItemsPerPage: ADD_ITEMS,
  });

  useEffect(() => {
    function handleWindowResize() {
      const screenWidth = window.innerWidth;

      let itemsPerPage = ITEMS_PER_PAGE;
      let addItemsPerPage = ADD_ITEMS;

      if (screenWidth < 1100) {
        itemsPerPage = itemsPerPage - 4;
        addItemsPerPage = addItemsPerPage - 1;
      }

      if (screenWidth < 768) {
        itemsPerPage = itemsPerPage - 3;
        addItemsPerPage = addItemsPerPage - 1;
      }

      setItemsPerPage({ itemsPerPage, addItemsPerPage });
    }

    handleWindowResize();

    let resizeTimeout;

    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleWindowResize, 1000);
    });

    return () => {
      window.removeEventListener("resize", handleWindowResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return itemsPerPage;
}
