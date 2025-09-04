import { Button } from "@material-ui/core";
import { Link } from "react-router-dom/cjs/react-router-dom";

/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student, deleteStudent } = props;
  console.log("StudentView props:", student);

  // Render a single Student view
  return (
    <div>
      <h1>{student.firstname + " " + student.lastname}</h1>

      <div className="student-image-container">
        <img
          src={student.imageUrl || "/student-fallback.png"} // fallback image
          alt={`${student.firstname} ${student.lastname}`}
          style={{ width: "250px", height: "auto", borderRadius: "5px" }}
        />
      </div>

      <p>Student ID: {student.id}</p>

      {!student.campusId ? (
        <h2>This student is not enrolled in any campus</h2>
      ) : (
        <Link to={`/campus/${student.campusId}`}>
          <h2>Campus: {student.campus.name}</h2>
        </Link>
      )}

      <div className="button-group">
        <Link to={`/`}>
          <Button
            onClick={() => deleteStudent && deleteStudent(student.id)}
            variant="contained"
          >
            Delete Student
          </Button>
        </Link>
        <Link to={`/editstudent/${student.id}`}>
          <Button variant="contained">Edit Student</Button>
        </Link>
      </div>
    </div>
  );
};

export default StudentView;
