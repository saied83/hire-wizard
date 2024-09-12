const users = [
  {
    username: "johndoe90",
    password: "BCfTTzpUvo3tkXjD81C5sQ",
    firstName: "John",
    lastName: "Doe",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    email: "test@user.com",
    phone_no: "01600000000",
    dob: "2002-02-11",
    gender: "male",
    time_stamp: "2024-09-12T11:31:21.068Z",
  },
  {
    username: "johndoe90",
    password: "BCfTTzpUvo3tkXjD81C5sQ",
    firstName: "John",
    lastName: "Doe",
    bio: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    email: "test@user.com",
    phone_no: "01600000000",
    dob: "2002-02-11",
    gender: "male",
    time_stamp: "2024-09-12T11:31:21.068Z",
  },
];

const job_hunters = [
  {
    username: "jhondoe90",
    city: "Dhaka",
    street: "123 Bir Uttom",
    zipCode: 1234,
    county: "Bangladesh",
    workingRole: "Database Engineer",
    skills: [
      {
        name: "Python",
        yearExp: 2,
      },
      {
        name: "Java",
        yearExp: 1,
      },
      {
        name: "C++",
        yearExp: 5,
      },
    ],
    projects: [
      {
        title: "Ecommerce clothing store",
        link: "https://fashion-fizz.vercel.app",
        description: "An fully responsive E-commerce web app.",
        technology: ["react", "react-router"],
      },
      {
        title: "Food Delivery App",
        link: "https://instafood-saied83.vercel.app",
        description: "An fully responsive Food Delivery web app.",
        technology: ["react", "react-router"],
      },
    ],
  },
];

const recruiter = [
  {
    username: "recruiter90",
    designation: "Hiring Manager",
    city: "Dhaka",
    company: {
      name: "Tech55",
      city: "Dhaka",
      street: "225 Gulshan",
      country: "Bangladesh",
      zipCode: 2254,
    },
  },
];

const JobPosts = [
  {
    id: 2345,
    createdBy: "recruiter1 name",
    title: "Front-end Developer",
    description:
      "Looking for a software engineer.Access the top 1% of talent on Upwork, and a full suite of hybrid workforce management tools. This is how innovation works now.",
    location: "North Badda, Dhaka",
    salary: "55-56",
    yearExp: 2,
    deadline: "2024-12-01",
    time_stamp: "2024-09-12T12:45:38.422Z",
    applyLimit: 20,
    skills: ["react", "framer-motion", "js", "ts", "html"],
    applicant: [
      {
        username: "h_username",
        is_decline: false,
        accepted: false,
        name: "h_username name",
        email: "example@gmail.com",
        cv: `The curriculum vitae, also known as a CV or vita, is a comprehensive statement of your
        educational background, teaching, and research experience. It is the standard representation
        of credentials within academia.
         The full CV is only used when applying for academic positions in four-year institutions.
         Do not use a CV when applying to community colleges—use a teacher-focused
        résumé instead.
         Tailor your CV to the specific positions to which you are applying and place more
        relevant sections earlier in the document.
        – For a position at a teaching-focused liberal arts college, the CV will strongly
        emphasize teaching.
        – For a position at a research-intensive university, the CV will accentuate
        research.
         Format can vary by field, so also seek disciplinary-specific advice from advisers,
        professors, and others within your field.
         There are no length restrictions for CVs.`,
      },
    ],
  },
];
