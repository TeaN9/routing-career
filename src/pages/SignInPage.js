import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Alert,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormProvider, FTextField, FCheckbox } from "../components/form/index";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuthenticationContext } from "../context/Auth";
import { useLocation, useNavigate } from "react-router-dom";

const schema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

function SignInPage() {
  const defaultValues = {
    username: "AnthonyBolder",
    email: "Abc@gmail.vn",
    password: "123@",
    remember: true,
  };

  const methods = useForm({ defaultValues, resolver: yupResolver(schema) });

  const {
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const [showPassword, setShowPassword] = useState(false);

  const { handleLogIn } = useAuthenticationContext();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = (data, event) => {
    event.preventDefault();
    handleLogIn(defaultValues);
    navigate(from, { replace: true });
  };

  return (
    <div>
      <Typography variant="h3" textAlign="center" mb={3}>
        LOG IN
      </Typography>

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {!!errors.afterSubmit && (
            <Alert severity="error">{errors.afterSubmit.message}</Alert>
          )}

          <FTextField name="username" label="Username" />
          <FTextField name="email" label="Email address" />

          <FTextField
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ my: 3 }}
        >
          <FCheckbox name="remember" label="Remember me" />
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Login
        </LoadingButton>
      </FormProvider>
    </div>
  );
}

export default SignInPage;
