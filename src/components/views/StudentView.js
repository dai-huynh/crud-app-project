import { Link } from "react-router-dom/cjs/react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;
  console.log(student);

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>

      <Link to={`/campus/${student.campus.id}`}>
        <h2>Campus: {student.campus.name}</h2>
      </Link>
      <h4>Student ID: {student.id}</h4>
    </div>
  );
};

export default StudentView;
