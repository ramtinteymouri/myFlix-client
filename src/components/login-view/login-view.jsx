import { useDispatch } from "react-redux";
import { setUser } from "../../redux/reducers/user";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
export const LoginView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            username: username,
            password: password
        };
        fetch("https://ramtin-movies-flix-1cd0d9c183b1.herokuapp.com/login", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    dispatch(setUser({ user: data.user, token: data.token }));
                }                
                else {
                    alert("No such user!");
                }
            }).catch((e) => {
                console.error("Login error: ", e);
                alert("Something went wrong!");
            });

        };
    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3" 
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};