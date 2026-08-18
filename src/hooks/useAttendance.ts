import { useEffect, useState } from "react";
import {
  attendanceRecords as initialAttendanceRecords,
  type AttendanceRecord,
} from "../data/attendance";

export function useAttendance() {
  const [records, setRecords] = useState<AttendanceRecord[]>(() => {
    const savedRecords = localStorage.getItem("attendance");

    return savedRecords
      ? JSON.parse(savedRecords)
      : initialAttendanceRecords;
  });

  useEffect(() => {
    localStorage.setItem("attendance", JSON.stringify(records));
  }, [records]);

  return {
    records,
    setRecords,
  };
}