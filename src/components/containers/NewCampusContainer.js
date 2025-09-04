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

import { NewCampusView } from "../views";
import { addCampusThunk } from "../../store/thunks";

class NewCampusContainer extends Component {
  // Initialize state
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: false,
      redirectId: null,
      errors: {},
    };
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
      const errors = this.validateCampus(this.state);
      this.setState({ errors });
    });
  };

  // Take action after user click the submit button
  handleSubmit = async (event) => {
    event.preventDefault(); // Prevent browser reload/refresh after submit.

    let campus = {
      name: this.state.name,
      address: this.state.address,
      description: this.state.description,
      imageUrl: this.state.imageUrl,
    };

    const errors = this.validateCampus(campus);

    if (Object.keys(errors).length > 0) {
      this.setState({ errors });
      return;
    }

    // Add new Campus in back-end database
    let newCampus = await this.props.addCampus(campus);

    // Update state, and trigger redirect to show the new Campus
    this.setState({
      name: "",
      address: "",
      description: "",
      imageUrl: "",
      redirect: true,
      redirectId: newCampus.id,
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
        <NewCampusView
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
          name={this.state.name}
          address={this.state.address}
          description={this.state.description}
          imageUrl={this.state.imageUrl}
        />
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    campus: state.campus, // Get the State object from Reducer "student"
  };
};

// The following input argument is passed to the "connect" function used by "NewCampusContainer" component to connect to Redux Store.
// The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    addCampus: (campus) => dispatch(addCampusThunk(campus)),
  };
};

// Export store-connected container by default
// NewCampusContainer uses "connect" function to connect to Redux Store and to read values from the Store
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(NewCampusContainer);
