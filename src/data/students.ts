export interface Student {
  id: number;
  name: string;
  course: string;
  email: string;
  status: "Active" | "Inactive";
}

export const students: Student[] = [
    {
      id: 1,
      name: "Suprim",
      course: "Mathematics",
      email: "suprim@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Swostika",
      course: "Science",
      email: "swostika@gmail.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Manju",
      course: "History",
      email: "manju@gmail.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "suv",
      course: "Geography",
      email: "suv@gmail.com",
      status: "Active",
    },
    {
      id: 5,
      name: "Erisen",
      course: "Physics",
      email: "erisen@gmail.com",
      status: "Inactive",
    },
    {
  id: 6,
  name: "Subekshya",
  course: "Mathematics",
  email: "subekshya@gmail.com",
  status: "Active",
},
{
  id: 7,
  name: "Lily",
  course: "Science",
  email: "lily@gmail.com",
  status: "Active",
},
{
  id: 8,
  name: "Sweety",
  course: "History",
  email: "sweety@gmail.com",
  status: "Inactive",
},
{
  id: 9,
  name: "Rani",
  course: "Geography",
  email: "rani@gmail.com",
  status: "Active",
},
{
  id: 10,
  name: "John",
  course: "Physics",
  email: "john@gmail.com",
  status: "Active",
},
{
  id: 11,
  name: "Motu",
  course: "Mathematics",
  email: "motu@gmail.com",
  status: "Inactive",
},
{
  id: 12,
  name: "Patlu",
  course: "Science",
  email: "patlu@gmail.com",
  status: "Active",
},
  ];