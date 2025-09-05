/*==================================================
EditStudentContainer.js

The Container component is responsible for stateful logic and data fetching,
and passes data as props to the corresponding View component.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { EditStudentView } from "../views";
import { editStudentThunk, fetchStudentThunk } from "../../store/thunks";

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      gpa: "",
      imageUrl: "",
      studentId: null,
      redirect: false,
      redirectId: null,
      errors: {},
    };
  }

  componentDidMount() {
    const studentId = this.props.match.params.id;
    this.props.fetchStudent(studentId);
  }

  componentDidUpdate(prevProps) {
    const student = this.props.student;
    console.log("container", student);
    if (student && student.id && prevProps.student !== student) {
      this.setState({
        firstname: student.firstname || "",
        lastname: student.lastname || "",
        email: student.email || "",
        gpa: student.gpa || "",
        imageUrl: student.imageUrl || "",
        studentId: student.id,
        campusId: student.campusId || "",
      });
    }
  }

  validateStudent = (student) => {
    const errors = {};
    if (!student.firstname || student.firstname.trim().length < 2) {
      errors.firstname = "First name is required (min 2 characters).";
    }
    if (!student.lastname || student.lastname.trim().length < 2) {
      errors.lastname = "Last name is required (min 2 characters).";
    }
    if (
      !student.email ||
      (student.email && !/\S+@\S+\.\S+/.test(student.email))
    ) {
      errors.email = "Please use a valid email.";
    }
    if (student.gpa && (student.gpa < 0 || student.gpa > 4)) {
      errors.gpa = "GPA must be between 0.0 and 4.0.";
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

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, () => {
      const errors = this.validateStudent({
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        gpa: this.state.gpa,
        imageUrl: this.state.imageUrl,
      });
      this.setState({ errors });
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    const updatedStudent = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      gpa: this.state.gpa,
      imageUrl: this.state.imageUrl,
      id: this.state.studentId,
      campusId: this.state.campusId,
    };

    const errors = this.validateStudent(updatedStudent);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    const editedStudent = await this.props.editStudent(updatedStudent);

    if (!editedStudent || !editedStudent.id) {
      console.error("Edit failed, no student returned");
      return;
    }

    this.setState({
      redirect: true,
      redirectId: editedStudent.id,
    });
  };

  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.state.redirectId}`} />;
    }

    return (
      <div>
        <Header />
        <EditStudentView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          student={this.state}
          errors={this.state.errors}
        />
      </div>
    );
  }
}

const mapState = (state) => ({
  student: state.student, // assumes reducer stores single student object
});

const mapDispatch = (dispatch) => ({
  fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
  editStudent: (student) => dispatch(editStudentThunk(student)),
});

export default connect(mapState, mapDispatch)(EditStudentContainer);
