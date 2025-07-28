import { DashboardType } from "@/types";

export const fakedashboard: DashboardType = {
  userId: "64dcbf9f7f6c0b001f0a1a2b",
  name: "Fake Dashboard",
  defines: [
    {
      key: "taskName",
      type: "text",    // TypeScript יודע שזה אחד מהערכים המותרים
      required: true,
    },
    {
      key: "dueDate",
      type: "date",
      required: false,
    },
    {
      key: "assignedTo",
      type: "user",
      required: false,
    },
  ],
  groups: [
    {
      name: "Group A",
      color: "#FF5733",
      items: [
        {
          taskName: "Prepare report",
          dueDate: new Date("2025-08-01T00:00:00.000Z"),
          assignedTo: "John Doe",
        },
        {
          taskName: "Review PR",
          dueDate: new Date("2025-08-03T00:00:00.000Z"),
          assignedTo: "Jane Smith",
        },
      ],
    },
    {
      name: "Group B",
      color: "#33C1FF",
      items: [
        {
          taskName: "Design new UI",
          dueDate: new Date("2025-08-10T00:00:00.000Z"),
          assignedTo: "Emily",
        },
      ],
    },
  ],
  createdAt: "2025-07-28T11:00:00.000Z",  // לפי ההגדרה שלך ב-DashboardType זה מחרוזת
  updatedAt: "2025-07-28T11:00:00.000Z",
};
