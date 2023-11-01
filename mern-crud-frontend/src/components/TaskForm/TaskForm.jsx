import React, { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./TaskForm.module.css";

const TaskForm = ({ onSubmit, onCancel, selectedTask, setIsEditing }) => {
  const [task, setTask] = useState(
    selectedTask || { title: "", description: "", completed: false }
  );

  const [isFormEmpty, setIsFormEmpty] = useState(!selectedTask);

  useEffect(() => {
    setTask(selectedTask || { title: "", description: "", completed: false });
    setIsFormEmpty(!selectedTask);
  }, [selectedTask]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTask({
      ...task,
      [name]: type === "checkbox" ? checked : value,
    });

    setIsFormEmpty(
      Object.values(task).some((field) => {
        if (typeof field === "string") {
          return field.trim() === "";
        }
        return field === null;
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(task);

    if (selectedTask) {
      toast.success("Tarea actualizada con éxito!");
    } else {
      toast.success("Tarea creada con éxito!");
    }

    setTask({ title: "", description: "", completed: false });

    setIsFormEmpty(true);
  };

  const handleCancel = () => {
    setTask({ title: "", description: "", completed: false });
    setIsEditing(false);
    onCancel();
  };

  return (
    <div className={styles.form_container}>
      <span className={styles.form_title}>
        {selectedTask ? "Editar tarea" : "Crear nueva tarea"}
      </span>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Descripción:
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </label>

        {selectedTask && (
          <label className={styles.checkboxContainer}>
            <span className={styles.textLabel}>Completado?</span>
            <input
              type="checkbox"
              name="completed"
              checked={task.completed}
              onChange={handleChange}
            />
            <span className={styles.checkmark}></span>
          </label>
        )}

        <div className={styles.buttonContainer}>
          <button
            type="reset"
            onClick={handleCancel}
            className={styles.cancelButton}
            disabled={isFormEmpty}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className={styles.submitButton}
            disabled={isFormEmpty}
          >
            Guardar
          </button>
        </div>
      </form>
      <span className={styles.helpText}>
        * Doble click para marcar una tarea como completada
      </span>
    </div>
  );
};

export default TaskForm;
