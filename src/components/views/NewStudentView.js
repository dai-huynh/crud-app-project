/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
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

const NewStudentView = (props) => {
  const {
    handleChange,
    handleSubmit,
    errors,
    firstname,
    lastname,
    email,
    gpa,
    campusId,
    imageUrl,
  } = props;
  const classes = useStyles();

  // Render a New Student view with an input form
  return (
    <div>
      <h1>New Student</h1>

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
              Add a Student
            </Typography>
          </div>
          <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            {/* First Name */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              First Name:{" "}
            </label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleChange}
            />
            {errors?.firstname && (
              <p style={{ color: "red" }}>{errors.firstname}</p>
            )}
            <br />
            <br />

            {/* Last Name */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Last Name:{" "}
            </label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleChange}
            />
            {errors?.lastname && (
              <p style={{ color: "red" }}>{errors.lastname}</p>
            )}
            <br />
            <br />

            {/* Email */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Email:{" "}
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
            />
            {errors?.email && <p style={{ color: "red" }}>{errors.email}</p>}
            <br />
            <br />

            {/* GPA */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              GPA:{" "}
            </label>
            <input
              type="number"
              step="0.1"
              name="gpa"
              value={gpa}
              onChange={handleChange}
            />
            {errors?.gpa && <p style={{ color: "red" }}>{errors.gpa}</p>}
            <br />
            <br />

            {/* Campus ID */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Id:{" "}
            </label>
            <input
              type="text"
              name="campusId"
              value={campusId}
              onChange={handleChange}
            />
            {errors?.campusId && (
              <p style={{ color: "red" }}>{errors.campusId}</p>
            )}
            <br />
            <br />

            {/* Student Image URL */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Student Image URL:{" "}
            </label>
            <input
              type="text"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
            />
            {errors?.imageUrl && (
              <p style={{ color: "red" }}>{errors.imageUrl}</p>
            )}
            <br />
            <br />

            {/* Buttons */}
            <Button variant="contained" type="submit">
              Submit
            </Button>
            <Link to={`/students`}>
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

export default NewStudentView;
