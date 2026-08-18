export type AttendanceStatus = "Present" | "Absent" | "Late";

export type AttendanceRecord = {
  id: number;
  studentId: number;
  date: string;
  status: AttendanceStatus;
};

export const attendanceRecords: AttendanceRecord[] = [
  {
    id: 1,
    studentId: 1,
    date: "2026-08-17",
    status: "Present",
  },
  {
    id: 2,
    studentId: 2,
    date: "2026-08-17",
    status: "Late",
  },
  {
    id: 3,
    studentId: 3,
    date: "2026-08-17",
    status: "Absent",
  },
];