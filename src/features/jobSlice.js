import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addJob, getJobs, editJob, deleteJob } from "./JobAPI";

const initialState = {
  jobs: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
};

// async thunks
export const fetchJobs = createAsyncThunk("job/fetchJobs", async () => {
  const jobs = await getJobs();
  return jobs;
});

export const createJob = createAsyncThunk("job/createJob", async (data) => {
  const job = await addJob(data);
  return job;
});

export const changeJob = createAsyncThunk(
  "job/changeJob",
  async ({ id, data }) => {
    const job = await editJob(id, data);
    return job;
  }
);

export const removeJob = createAsyncThunk("job/removeJob", async (id) => {
  const job = await deleteJob(id);
  return job;
});

// create slice
const jobSlice = createSlice({
  name: "job",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
        state.jobs = [];
      })
      .addCase(createJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.jobs.push(action.payload);
      })
      .addCase(createJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(changeJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(changeJob.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        const indexToUpdate = state.jobs.findIndex(
          (t) => t.id === action.payload.id
        );

        state.jobs[indexToUpdate] = action.payload;
      })
      .addCase(changeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(removeJob.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeJob.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;

        state.jobs = state.jobs.filter((t) => t.id !== action.meta.arg);
      })
      .addCase(removeJob.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default jobSlice.reducer;
