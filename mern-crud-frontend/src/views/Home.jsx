import React, { useState, useEffect } from "react";
import CustomDataTable from "../components/DataTable/DataTable";
import Header from "../components/Header/Header";
import Taskform from "../components/TaskForm/TaskForm";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/taskService";
import styles from "../styles/Home.module.css";

const Home = () => {
  const [data, setData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let tasks = await getTasks();

        tasks = tasks.reverse();

        setData(tasks);
      } catch (error) {
        console.error(
          "Hubo un error al obtener las tareas:",
          error.response.data
        );
      }
    };
    fetchData();
  }, []);

  const handleSave = async (editedItem) => {
    if (editedItem._id) {

      await updateTask(editedItem._id, editedItem);

      setData((prevData) => {

        return prevData.map((task) =>
          task._id === editedItem._id ? editedItem : task
        );
      });
      setIsEditing(false);
      setSelectedTask(null);
    } else {
      const createdTask = await createTask(editedItem);

      setData((prevData) => [createdTask, ...prevData]);
    }
    setShowEditModal(false);
  };

  const onCancel = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };

  const sortTasks = (tasks) => {
    return tasks.sort((a, b) => {
      if (!a.completed && b.completed) {
        return -1;
      }
      else if (a.completed && !b.completed) {
        return 1;
      }
      return 0;
    });
  };

  const toggleTaskCompletion = async (taskId) => {

    const updatedTasks = data.map((task) => {
      if (task._id === taskId) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setData(updatedTasks);

    try {
      await updateTask(taskId, { completed: !taskId.completed });
    } catch (error) {
      console.error("Error al actualizar la tarea en la base de datos:", error);
    }
  };

  const handleEditTask = (taskData) => {
    setSelectedTask(taskData);
    setIsEditing(true);
  };

  const onDelete = (task) => {
    setSelectedTask(task);
    setShowConfirmModal(true);
  };

  const handleConfirmDeletion = () => {
    if (selectedTask && selectedTask._id) {
      deleteTask(selectedTask._id)
        .then(() => {
          const updatedTasks = data.filter((t) => t._id !== selectedTask._id);
          setData(updatedTasks);
        })
        .catch((error) => {
          console.error("Error al eliminar la tarea:", error);
        });
      setShowConfirmModal(false);
      setSelectedTask(null);
    }
  };

  const handleCancelDeletion = () => {
    setShowConfirmModal(false);
    setSelectedTask(null);
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.formcontainer}>
          <Taskform
            onSubmit={handleSave}
            isEditing={!!isEditing}
            initialValues={selectedTask}
            selectedTask={selectedTask}
            setIsEditing={setIsEditing}
            onCancel={onCancel}
          />
        </div>
        <div className={styles.tablecontainer}>
          <CustomDataTable
            data={data}
            deleteItem={onDelete}
            sortTasks={sortTasks}
            onToggleComplete={toggleTaskCompletion}
            onEdit={handleEditTask}
          />
        </div>
      </div>
      {showConfirmModal && (
        <ConfirmModal
          isOpen={showConfirmModal}
          onRequestClose={handleCancelDeletion}
          onConfirm={handleConfirmDeletion}
        />
      )}
    </div>
  );
};

export default Home;
