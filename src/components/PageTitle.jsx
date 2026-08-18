import { useEffect } from "react";

function PageTitle() {
  useEffect(() => {
    document.title = "Student Dashboard";
  }, []);

  return <h1>Student Management Dashboard</h1>;
}
export default PageTitle;
