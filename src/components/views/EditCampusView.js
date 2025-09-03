/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new Campus page.
================================================== */
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom/cjs/react-router-dom";

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer: {
    width: "500px",
    borderRadius: "5px",
    margin: "auto",
  },
  title: {
    flexGrow: 1,
    textAlign: "left",
    textDecoration: "none",
  },
  customizeAppBar: {
    shadows: ["none"],
  },
  formTitle: {
    marginBottom: "15px",
    textAlign: "center",
    borderRadius: "5px 5px 0px 0px",
    padding: "3px",
  },
}));

const EditCampusView = (props) => {
  const { handleChange, handleSubmit, campus } = props;
  const classes = useStyles();

  // Render a New Campus view with an input form
  return (
    <div>
      <h1>Editing Campus</h1>

      <div className={classes.root}>
        <div className={classes.formContainer}>
          <div className={classes.formTitle}>
            <Typography
              style={{
                fontWeight: "bold",
                fontFamily: "Courier, sans-serif",
                fontSize: "20px",
                color: "#11153e",
              }}
            >
              {campus.name}
            </Typography>
          </div>
          <form
            style={{ textAlign: "center" }}
            onSubmit={(e) => handleSubmit(e)}
          >
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={campus.name || ""}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Address:{" "}
            </label>
            <input
              type="text"
              name="address"
              value={campus.address || ""}
              onChange={(e) => handleChange(e)}
              required
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              value={campus.description || ""}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Image URL:{" "}
            </label>
            <input
              type="text"
              name="imageUrl"
              value={campus.imageUrl || ""}
              onChange={(e) => handleChange(e)}
            />
            <br />
            <br />

            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Link to={`/campus/${campus.campusId}`}>
              <Button variant="contained">Cancel</Button>
            </Link>
            <br />
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCampusView;
