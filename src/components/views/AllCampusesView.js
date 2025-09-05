/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import { Button } from "@material-ui/core";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  // If there is at least one campus, render All Campuses view
  return (
    <div>
      <h1>All Campuses</h1>
      {!props.allCampuses.length ? (
        <p>There are no campuses.</p>
      ) : (
        <div className="card-container">
          {props.allCampuses.map((campus) => (
            <div key={campus.id} className="card">
              <Link to={`/campus/${campus.id}`}>
                <h2>{campus.name}</h2>
                <h4>campus id: {campus.id}</h4>
                <p>{campus.address}</p>
                <p>{campus.description}</p>
              </Link>
              <Button
                onClick={() => props.deleteCampus(campus.id)}
                variant="contained"
              >
                Delete Campus
              </Button>
            </div>
          ))}
        </div>
      )}

      <Link to={`/newcampus`}>
        <Button variant="contained">Add New Campus</Button>
      </Link>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
