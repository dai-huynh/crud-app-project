/*==================================================
AssignStudentView.js

The Views component is responsible for rendering a page
to assign an existing student to a specific campus.
==================================================*/
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const AssignStudentView = (props) => {
  const { campusId, students = [], assignStudent } = props;
  console.log("AssignStudentView props:", props);
  if (!students.length) {
    return (
      <div>
        <p>There are no unassigned students.</p>
        <Link to={`/newstudent`}>
          <Button variant="contained">Add New Student</Button>
        </Link>
        <Link to={`/campus/${campusId}`}>
          <Button variant="contained">Back to Campus</Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1>Assign Existing Student</h1>
      <div className="card-container">
        {students.map((student) => {
          const name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} className="card">
              <h2>{name}</h2>
              <Button
                variant="contained"
                onClick={() => assignStudent(student.id)}
              >
                Assign to Campus
              </Button>
            </div>
          );
        })}
      </div>

      <Link to={`/campus/${campusId}`}>
        <Button variant="contained">Back to Campus</Button>
      </Link>
      <br />
      <br />
    </div>
  );
};

export default AssignStudentView;
