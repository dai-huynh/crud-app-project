/*==================================================
/src/store/thunks.js

It contains all Thunk Creators and Thunks.
================================================== */
import * as ac from "./actions/actionCreators"; // Import Action Creators ("ac" keyword Action Creator)
const axios = require("axios");

//All Campuses
// THUNK CREATOR:
export const fetchAllCampusesThunk = () => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get "campuses" data from database
    let res = await axios.get(`/api/campuses`);
    // Call Action Creator to return Action object (type + payload with "campuses" data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.fetchAllCampuses(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Add Campus
// THUNK CREATOR:
export const addCampusThunk = (campus) => async (dispatch) => {
  // The THUNK
  try {
    // API "post" call to add "campus" object's data to database
    let res = await axios.post(`/api/campuses`, campus);
    console.log("Added campus: ", campus);
    // Call Action Creator to return Action object (type + payload with new campuses data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.addCampus(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Delete Campus
// THUNK CREATOR:
export const deleteCampusThunk = (campusId) => async (dispatch) => {
  // The THUNK
  try {
    let res = await axios.get(`/api/campuses/${campusId}`);
    let students = res.data.students;
    console.log("Students to unassign: ", students);
    // If there are students assigned to this campus, we need to unassign them first
    if (students && students.length > 0) {
      await Promise.all(
        students.map((student) =>
          axios.put(`/api/students/${student.id}`, { campusId: null })
        )
      );
    }

    // API "delete" call to delete student (based on "campusID") from database
    await axios.delete(`/api/campuses/${campusId}`);
    // Delete successful so change state with dispatch
    dispatch(ac.deleteCampus(campusId));
  } catch (err) {
    console.error(err);
  }
};

// Edit Campus
// THUNK CREATOR:
export const editCampusThunk = (campus) => async (dispatch) => {
  // The THUNK
  try {
    console.log("Editing campus: ", campus);
    // API "put" call to update student (based on "id" and "campus" object's data) from database
    let res = await axios.put(`/api/campuses/${campus.id}`, campus);
    // Update successful so change state with dispatch
    dispatch(ac.editCampus(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Single Campus
// THUNK CREATOR:
export const fetchCampusThunk = (id) => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get a student data (based on "id")from database
    let res = await axios.get(`/api/campuses/${id}`);
    dispatch(ac.fetchCampus(res.data));
  } catch (err) {
    console.error(err);
  }
};

// All Students
// THUNK CREATOR:
export const fetchAllStudentsThunk = () => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get "students" data from database
    let res = await axios.get(`/api/students`);
    // Call Action Creator to return Action object (type + payload with "students" data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.fetchAllStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Add Student
// THUNK CREATOR:
export const addStudentThunk = (student) => async (dispatch) => {
  // The THUNK
  try {
    // API "post" call to add "student" object's data to database
    let res = await axios.post(`/api/students`, student);
    // Call Action Creator to return Action object (type + payload with new students data)
    // Then dispatch the Action object to Reducer to update state
    dispatch(ac.addStudent(res.data));
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

// Delete Student
// THUNK CREATOR:
export const deleteStudentThunk = (studentId) => async (dispatch) => {
  // The THUNK
  try {
    // API "delete" call to delete student (based on "studentID") from database
    await axios.delete(`/api/students/${studentId}`);
    // Delete successful so change state with dispatch
    dispatch(ac.deleteStudent(studentId));
  } catch (err) {
    console.error(err);
  }
};

// Edit Student
// THUNK CREATOR:
export const editStudentThunk = (student) => async (dispatch) => {
  try {
    const response = await axios.put(`/api/students/${student.id}`, student);
    dispatch(ac.editStudent(response.data));
    return response.data; // ✅ return updated student
  } catch (err) {
    console.error(err);
    throw err; // optional: rethrow to handle errors in container
  }
};

// Single Student
// THUNK CREATOR:
export const fetchStudentThunk = (id) => async (dispatch) => {
  // The THUNK
  try {
    // API "get" call to get a specific student (based on "id") data from database
    let res = await axios.get(`/api/students/${id}`);
    // Call Action Creator to return Action object (type + payload with student data)
    // Then dispatch the Action object to Reducer to display student data
    dispatch(ac.fetchStudent(res.data));
  } catch (err) {
    console.error(err);
  }
};

// Assign existing student to a campus
export const assignStudentToCampusThunk =
  (studentId, campusId) => async (dispatch) => {
    try {
      const res = await axios.put(`/api/students/${studentId}`, { campusId });

      dispatch(ac.editStudent(res.data));
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

export const unassignStudentFromCampusThunk = (student) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/students/${student.id}`, {
      campusId: null,
    });
    dispatch({ type: "UNASSIGN_STUDENT_FROM_CAMPUS", payload: res.data });
    dispatch(fetchCampusThunk(student.campusId));
  } catch (err) {
    console.error(err);
  }
};

// thunks.js
export const fetchUnassignedStudentsThunk = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/students/unassigned");
    dispatch(ac.fetchUnassignedStudents(res.data));
  } catch (err) {
    console.error(err);
  }
};
