/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import NewStudentView from "../views/NewStudentView";
import { addStudentThunk } from "../../store/thunks";

class NewStudentContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      gpa: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
    };
  }

  validateStudent = (student) => {
    const errors = {};

    if (!student.firstname || student.firstname.trim().length < 2) {
      errors.firstname = "First name is required (min 2 characters).";
    }

    if (!student.lastname || student.lastname.trim().length < 2) {
      errors.lastname = "Last name is required (min 2 characters).";
    }
    if (!student.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(student.email)) {
      errors.email = "A valid email address is required.";
    }

    if (
      student.gpa &&
      (isNaN(student.gpa) || student.gpa < 0 || student.gpa > 4)
    ) {
      errors.gpa = "GPA must be a number between 0.0 and 4.0.";
    }

    if (student.imageUrl) {
      try {
        new URL(student.imageUrl);
      } catch {
        errors.imageUrl = "Image URL must be a valid URL.";
      }
    }

    return errors;
  };

  // Capture input data when it is entered
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const errors = this.validateStudent(this.state);
      this.setState({ errors });
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let student = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      gpa: this.state.gpa,
      campusId: this.state.campusId,
      imageUrl: this.state.imageUrl,
    };

    const errors = this.validateStudent(student);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    // Add new student in back-end database
    let newStudent = await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      gpa: "",
      imageUrl: "",
      redirect: true,
      redirectId: newStudent.id,
      errors: {},
    });
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new student input form
  render() {
    // Redirect to new student's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <NewStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          firstname={this.state.firstname}
          lastname={this.state.lastname}
          email={this.state.email}
          gpa={this.state.gpa}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

// The following input argument is passed to the "connect" function used by "NewStudentContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    addStudent: (student) => dispatch(addStudentThunk(student)),
  };
};

// Export store-connected container by default
// NewStudentContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(null, mapDispatch)(NewStudentContainer);
