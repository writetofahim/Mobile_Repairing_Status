import React, { useState } from "react";
import TableModal from "../../components/modal/TableModal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const modalData = {
    title: "Modal Title",
    content: "Modal content goes here",
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <TableModal isOpen={isModalOpen} onClose={closeModal} data={modalData} />
      Home
    </div>
  );
};

export default Home;
