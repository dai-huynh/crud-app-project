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

const EditCampusView = (props) => {
  const { handleChange, handleSubmit, campus, errors } = props;
  const classes = useStyles();

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
              {campus.name || "Edit Campus"}
            </Typography>
          </div>

          <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            {/* Campus Name */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Name:{" "}
            </label>
            <input
              type="text"
              name="name"
              value={campus.name || ""}
              onChange={handleChange}
            />
            {errors?.name && <p style={{ color: "red" }}>{errors.name}</p>}
            <br />
            <br />

            {/* Campus Address */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Address:{" "}
            </label>
            <input
              type="text"
              name="address"
              value={campus.address || ""}
              onChange={handleChange}
            />
            {errors?.address && (
              <p style={{ color: "red" }}>{errors.address}</p>
            )}
            <br />
            <br />

            {/* Campus Description */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Description:{" "}
            </label>
            <input
              type="text"
              name="description"
              value={campus.description || ""}
              onChange={handleChange}
            />
            {errors?.description && (
              <p style={{ color: "red" }}>{errors.description}</p>
            )}
            <br />
            <br />

            {/* Campus Image URL */}
            <label style={{ color: "#11153e", fontWeight: "bold" }}>
              Campus Image URL:{" "}
            </label>
            <input
              type="text"
              name="imageUrl"
              value={campus.imageUrl || ""}
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
