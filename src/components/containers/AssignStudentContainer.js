import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AssignStudentView from "../views/AssignStudentView";
import {
  fetchUnassignedStudentsThunk,
  assignStudentToCampusThunk,
} from "../../store/thunks";
import Header from "./Header";

class AssignStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campusId: null,
      redirect: false,
    };
  }

  componentDidMount() {
    const campusId = this.props.match.params.campusId;
    this.setState({ campusId });

    this.props.fetchUnassignedStudents(); // populate Redux store
  }

  assignStudent = async (studentId) => {
    await this.props.assignStudent(studentId, this.state.campusId);
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.campusId}`} />;
    }

    return (
      <>
        <Header />
        <AssignStudentView
          campusId={this.state.campusId}
          students={this.props.students}
          assignStudent={this.assignStudent}
        />
      </>
    );
  }
}

const mapState = (state) => ({
  students: state.allStudents,
});

const mapDispatch = (dispatch) => ({
  fetchUnassignedStudents: () => dispatch(fetchUnassignedStudentsThunk()),
  assignStudent: (studentId, campusId) =>
    dispatch(assignStudentToCampusThunk(studentId, campusId)),
});

export default connect(mapState, mapDispatch)(AssignStudentContainer);
