import { addTask, advanceTask, filterByStatus } from "./model.js";
import type { Task, TaskStatus } from "./model.js";

type TaskFilter = "all" | TaskStatus;

const taskForm = document.getElementById("task-form") as HTMLFormElement;
const titleInput = document.getElementById("title") as HTMLInputElement;
const addButton = document.getElementById("add-task") as HTMLButtonElement;
const taskList = document.getElementById("task-list") as HTMLUListElement;
const taskSummary = document.getElementById("task-summary") as HTMLParagraphElement;
const filterControls = document.getElementById("filter-controls") as HTMLDivElement;

let tasks: Task[] = [];
let activeFilter: TaskFilter = "all";

const statusLabels: Record<TaskStatus, string> = {
  todo: "To do",
  "in-progress": "In progress",
  done: "Done",
};

function isTaskStatus(value: string | undefined): value is TaskStatus {
  return value === "todo" || value === "in-progress" || value === "done";
}

function renderTasks(): void {
  taskList.replaceChildren();

  const visibleTasks =
    activeFilter === "all" ? tasks : filterByStatus(tasks, activeFilter);

  if (visibleTasks.length === 0) {
    const emptyItem = document.createElement("li");
    emptyItem.className = "empty-state";

    const message = document.createElement("p");
    if (tasks.length === 0) {
      message.append(
        "Your list is a blank page.",
        document.createElement("br"),
        "Add a task to get started.",
      );
    } else {
      message.textContent =
        activeFilter === "all"
          ? "No tasks match this filter."
          : `No ${statusLabels[activeFilter].toLowerCase()} tasks right now.`;
    }

    const spark = document.createElement("span");
    spark.className = "empty-spark";
    spark.setAttribute("aria-hidden", "true");
    emptyItem.append(spark, message);
    taskList.append(emptyItem);
  } else {
    for (const task of visibleTasks) {
      const item = document.createElement("li");
      item.className = "task-card";
      item.dataset.status = task.status;

      const copy = document.createElement("div");
      copy.className = "task-card-copy";

      const title = document.createElement("span");
      title.className = "task-title";
      title.textContent = task.title;

      const status = document.createElement("span");
      status.className = "task-status";
      status.textContent = statusLabels[task.status];
      copy.append(title, status);

      const advanceButton = document.createElement("button");
      advanceButton.type = "button";
      advanceButton.className = "advance-button";
      advanceButton.disabled = task.status === "done";
      const actionLabel =
        task.status === "todo"
          ? "Start"
          : task.status === "in-progress"
            ? "Mark done"
            : "Completed";
      advanceButton.textContent =
        task.status === "todo"
          ? "Start task"
          : task.status === "in-progress"
            ? "Mark done"
            : "Completed";
      advanceButton.setAttribute(
        "aria-label",
        `${actionLabel} ${task.title}`,
      );
      advanceButton.addEventListener("click", () => {
        tasks = advanceTask(tasks, task.id);
        renderTasks();
      });

      item.append(copy, advanceButton);
      taskList.append(item);
    }
  }

  const remaining = tasks.filter((task) => task.status !== "done").length;
  taskSummary.textContent =
    tasks.length === 0
      ? "No tasks yet. Your next small win starts here."
      : `${tasks.length} ${tasks.length === 1 ? "task" : "tasks"} · ${remaining} still in motion`;

  for (const button of filterControls.querySelectorAll<HTMLButtonElement>("[data-status]")) {
    const isActive = button.dataset.status === activeFilter;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  }
}

taskForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  if (title.length === 0) return;

  tasks = addTask(tasks, title);
  titleInput.value = "";
  addButton.disabled = true;
  renderTasks();
  titleInput.focus();
});

titleInput.addEventListener("input", () => {
  addButton.disabled = titleInput.value.trim().length === 0;
});

for (const button of filterControls.querySelectorAll<HTMLButtonElement>("[data-status]")) {
  button.addEventListener("click", () => {
    const status = button.dataset.status;
    if (status !== "all" && !isTaskStatus(status)) {
      throw new Error(`Unsupported task status filter: ${status ?? "missing"}`);
    }

    activeFilter = status;
    renderTasks();
  });
}

renderTasks();
