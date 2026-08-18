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
      name: "Ram",
      course: "Mathematics",
      email: "ram@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Sita",
      course: "Science",
      email: "sita@example.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Gita",
      course: "History",
      email: "gita@example.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Hari",
      course: "Geography",
      email: "hari@example.com",
      status: "Active",
    },
    {
      id: 5,
      name: "Shyam",
      course: "Physics",
      email: "shyam@example.com",
      status: "Inactive",
    },
    {
  id: 6,
  name: "Anita",
  course: "Mathematics",
  email: "anita@example.com",
  status: "Active",
},
{
  id: 7,
  name: "Bikash",
  course: "Science",
  email: "bikash@example.com",
  status: "Active",
},
{
  id: 8,
  name: "Mina",
  course: "History",
  email: "mina@example.com",
  status: "Inactive",
},
{
  id: 9,
  name: "Ramesh",
  course: "Geography",
  email: "ramesh@example.com",
  status: "Active",
},
{
  id: 10,
  name: "Puja",
  course: "Physics",
  email: "puja@example.com",
  status: "Active",
},
{
  id: 11,
  name: "Kiran",
  course: "Mathematics",
  email: "kiran@example.com",
  status: "Inactive",
},
{
  id: 12,
  name: "Nisha",
  course: "Science",
  email: "nisha@example.com",
  status: "Active",
},
  ];