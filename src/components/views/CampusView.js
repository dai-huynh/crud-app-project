/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus, editCampus } = props;

  if (!props.campus.students.length) {
    return (
      <>
        <div>There are no students in this campus.</div>
        <Button onClick={() => deleteCampus(campus.id)} variant="contained">
          Delete Campus
        </Button>
        <Button onClick={() => editCampus(campus)} variant="contained">
          Edit Campus
        </Button>
        <Link to={`/newstudent`}>
          <Button variant="contained">Add New Student</Button>
        </Link>
      </>
    );
  }

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <h2>Students</h2>
      <div className="card-container">
        {campus.students.map((student) => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id} className="card">
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>
            </div>
          );
        })}
      </div>

      <Button onClick={() => deleteCampus(campus.id)} variant="contained">
        Delete Campus
      </Button>
      <Button onClick={() => deleteCampus(campus)} variant="contained">
        Edit Campus
      </Button>
      <Link to={`/newstudent`}>
        <Button variant="contained">Add New Student</Button>
      </Link>
    </div>
  );
};

export default CampusView;
