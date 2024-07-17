import { deleteData } from "@/firebase/firestore/deleteDoc";
import { getAndModifyDoc } from "@/firebase/firestore/getAndModifyDoc";
import { manualRefreshNews } from "@/firebase/firestore/addData";

export const updateNewsItem = async (
  itemId,
  updatedFormData,
  showModal,
  closeModal
) => {
  try {
    const { result, error } = await getAndModifyDoc(
      "news",
      itemId,
      updatedFormData
    );

    if (error) {
      console.error("Error updating document:", error);
      showModal(`So sorry - there's an error!`, `${error}`);
      return;
    }

    showModal(`News updated!`, `All done`);

    manualRefreshNews();
  } catch (error) {
    console.error("Unexpected error:", error);
    showModal(`So sorry - there's an error!`, `${error}`);
  }
};

export const deleteNewsItem = async (itemId, showModal) => {
  try {
    const { success, error } = await deleteData("news", itemId);
    if (error) {
      console.error("Error deleting document:", error);
      showModal(`So sorry - there's an error!`, `${error}`);
    } else {
      showModal(`News item deleted!`, `All done`);
      manualRefreshNews();
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
