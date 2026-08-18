import type { Student } from "../data/students";

type StudentCardProps = {
  student: Student;
};

function StudentCard({student} : StudentCardProps) {
    return (
        <div>
            <h3>{student.name}</h3>
            <p>{student.course}</p>
            <p>{student.email}</p>
            <p>{student.status}</p>
        </div>
    )
}
export default StudentCard;