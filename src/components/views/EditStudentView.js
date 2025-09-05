import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom/cjs/react-router-dom";

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

const EditStudentView = (props) => {
  const { handleChange, handleSubmit, student, errors } = props;
  const classes = useStyles();
  console.log("view", student);

  return (
    <div>
      <h1>Editing Student</h1>

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
              {student.firstname
                ? `${student.firstname} ${student.lastname}`
                : "Edit Student"}
            </Typography>
          </div>

          <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            {/* First name */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              First name:{" "}
            </label>
            <input
              type="text"
              name="firstname"
              value={student.firstname || ""}
              onChange={handleChange}
            />
            {errors?.firstname && (
              <p style={{ color: "red" }}>{errors.firstname}</p>
            )}
            <br />
            <br />

            {/* Last name */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Last name:{" "}
            </label>
            <input
              type="text"
              name="lastname"
              value={student.lastname || ""}
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
              value={student.email || ""}
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
              value={student.gpa || ""}
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
              value={student.campusId || ""}
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
              value={student.imageUrl || ""}
              onChange={handleChange}
            />
            {errors?.imageUrl && (
              <p style={{ color: "red" }}>{errors.imageUrl}</p>
            )}
            <br />
            <br />

            {/* Buttons */}
            <div className="button-group">
              <Button variant="contained" type="submit">
                Submit
              </Button>
              <Link to={`/student/${student.id}`}>
                <Button variant="contained">Cancel</Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditStudentView;
