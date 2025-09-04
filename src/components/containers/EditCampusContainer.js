/*==================================================
NewCampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from "./Header";
import { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { EditCampusView } from "../views";
import { editCampusThunk, fetchCampusThunk } from "../../store/thunks";

class EditCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      campusId: null,
      redirect: false,
      redirectId: null,
      errors: {},
    };
  }

  componentDidMount() {
    // Grab campusId from route params
    const campusId = this.props.match.params.id;
    this.props.fetchCampus(campusId);
  }

  componentDidUpdate(prevProps) {
    // When campus data is loaded, sync it into local state
    if (prevProps.campus !== this.props.campus && this.props.campus) {
      this.setState({
        name: this.props.campus.name || "",
        address: this.props.campus.address || "",
        description: this.props.campus.description || "",
        imageUrl: this.props.campus.imageUrl || "",
        campusId: this.props.campus.id,
      });
    }
  }

  validateCampus = (campus) => {
    const errors = {};
    if (!campus.name || campus.name.trim().length < 2) {
      errors.name = "Campus name is required (min 2 characters).";
    }
    if (!campus.address || campus.address.trim().length < 2) {
      errors.address = "Address is required (min 2 characters).";
    }
    if (campus.imageUrl) {
      try {
        new URL(campus.imageUrl);
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
      const errors = this.validateCampus({
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl,
      });
      this.setState({ errors });
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let updatedCampus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
      id: this.state.campusId,
    };

    const errors = this.validateCampus(updatedCampus);
    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return; // stop submission
    }

    // Add new Campus in back-end database
    let editedCampus = await this.props.editCampus(updatedCampus);

    // Update state, and trigger redirect to show the new Campus
    this.setState({
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      campusId: null,
      redirect: true,
      redirectId: editedCampus.id,
      errors: {},
    });
  };

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
    this.setState({ redirect: false, redirectId: null });
  }

  // Render new Campus input form
  render() {
    // Redirect to new Campus's page after submit
    if (this.state.redirect) {
      return <Redirect to={`/campus/${this.state.redirectId}`} />;
    }

    // Display the input form via the corresponding View component
    return (
      <div>
        <Header />
        <EditCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          campus={this.state}
          errors={this.state.errors}
        />
      </div>
    );
  }
}
const mapState = (state) => {
  return {
    campus: state.campus, // assumes reducer stores single campus object
  };
};
// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    editCampus: (campus) => dispatch(editCampusThunk(campus)),
  };
};

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(EditCampusContainer);
