import { Link } from "react-router-dom/cjs/react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;
  console.log("StudentView props:", student);

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>

      {!student.campusId ? (
        <h2>This student is not enrolled in any campus</h2>
      ) : (
        <Link to={`/campus/${student.campusId}`}>
          <h2>Campus: {student.campus.name}</h2>
        </Link>
      )}
    </div>
  );
};

export default StudentView;
