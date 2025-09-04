/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const { campus, deleteCampus } = props;
  console.log("CampusView props:", props);

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>

      <div className="campus-image-container">
        <img
          src={campus.imageUrl || "/campus-fallback.png"} // fallback image
          alt={`${campus.name} campus`}
          style={{ width: "300px", height: "auto", borderRadius: "5px" }}
        />
      </div>

      <p>{campus.address}</p>
      <p>{campus.description}</p>
      <p>Campus ID: {campus.id}</p>
      <h2>Students</h2>

      {!campus.students.length ? (
        <p>There are no students in this campus.</p>
      ) : (
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
      )}

      <div className="button-group">
        <Link to={`/`}>
          <Button onClick={() => deleteCampus(campus.id)} variant="contained">
            Delete Campus
          </Button>
        </Link>
        <Link to={`/editcampus/${campus.id}`}>
          <Button variant="contained">Edit Campus</Button>
        </Link>
        <Link to={`/newstudent`}>
          <Button variant="contained">Add New Student</Button>
        </Link>
        <Link to={`/assignstudent/${campus.id}`}>
          <Button variant="contained">Assign Existing Student</Button>
        </Link>
      </div>
    </div>
  );
};

export default CampusView;
