import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { REACT_APP_ACCESS_TOKEN_COOKIE_NAME } from "environmentVariables";
import { toastError } from "components/Toastify";
import { useHistory } from "react-router-dom";
import { useCookie } from "contexts/cookieContext";
import { login } from "lib/axios/Users/requests";

export function Login(): React.ReactElement {
    const history = useHistory();
    const { setCookie } = useCookie();

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onLogin = async () => {
        if (email === "" || password === "") {
            return toastError("Missing email or password");
        }

        try {
            const accessToken = await login(email, password);

            setCookie(REACT_APP_ACCESS_TOKEN_COOKIE_NAME, accessToken, 60 * 24);

            history.push("/");
        } catch (error) {
            toastError(error.message);
        }
    };

    const onRegistration = async () => {
        history.push("/registration");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "10px",
                padding: "20px",
                maxWidth: "300px",
                margin: "auto",
                marginTop: "20vh",
            }}
        >
            <Typography variant="h5" sx={{ marginBottom: "20px" }}>
                Login
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setEmail(event.target.value);
                }}
                sx={{ marginBottom: "20px", width: "100%" }}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(event.target.value);
                }}
                sx={{ marginBottom: "5px", width: "100%" }}
            />
            <Button
                variant="text"
                onClick={onRegistration}
                sx={{ marginRight: "auto", paddingLeft: "0px" }}
            >
                Register
            </Button>

            <Button variant="contained" color="primary" onClick={onLogin}>
                Login
            </Button>
        </Box>
    );
}
