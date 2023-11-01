import React, { useState } from "react";
import TaskCard from "../TaskCard/TaskCard";
import styles from "./DataTable.module.css"; 
import ModalContainer from "../ModalContainer/ModalContainer"; 

const CustomDataTable = ({
  data,
  onEdit,
  deleteItem,
  sortTasks,
  onToggleComplete,
}) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleViewTask = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const sortedTasks = sortTasks(data); 

  return (
    <div className={`${styles["card-container"]} ${styles.datatable}`}>
      {sortedTasks.map((row) => (
        <TaskCard
          key={row._id}
          title={row.title}
          description={row.description}
          completed={row.completed}
          onEdit={() => onEdit(row)}
          onDelete={() => deleteItem(row)}
          onToggleComplete={() => onToggleComplete(row._id)}
          onTaskView={() => handleViewTask(row)}
          task={row}
        />
      ))}
      {showModal && (
        <ModalContainer
          isOpen={showModal}
          onRequestClose={() => setShowModal(false)}
          title="Detalles de la Tarea"
        >
          <p>Título: {selectedTask.title}</p>
          <p>Descripción: {selectedTask.description}</p>
          <p>Completado: {selectedTask.completed ? "Sí" : "No"}</p>
        </ModalContainer>
      )}
    </div>
  );
};

export default CustomDataTable;
