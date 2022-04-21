import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  Grid,
  makeStyles,
  Container,
  Button,
  Typography,
  Snackbar,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./validation";
import api from "../../services/api";
import useAuth from "../../hooks/useAuth";
import { useCallback, useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

function Profile() {
  const classes = useStyles();
  const auth = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      setIsLoading(true);
      const { data: user } = await api.auth.updateProfile(data);

      auth.setUser(user);
      setIsOpen(true);
    } catch (e) {
      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: e.response.data.errors[key],
          });
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = useCallback(async () => {
    const { data } = await api.auth.getProfile();

    reset({
      firstName: data.firstName,
      lastName: data.lastName,
    });
  }, [reset]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className={classes.root}>
      <h6>Update profile</h6>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.firstName?.message)}
                  label="First name"
                  variant="filled"
                />
              )}
            />
          </div>

          <div>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  error={Boolean(errors.lastName?.message)}
                  label="Last name"
                  variant="filled"
                />
              )}
            />
          </div>

          <div>
            <button type="submit" disabled={isLoading}>
              Update
            </button>
          </div>
        </div>
      </form>
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={() => setIsOpen(false)}
        message="Profile updated successfully"
      />
    </div>
  );
}

export default Profile;
