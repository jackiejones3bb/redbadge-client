import { Button, TextField } from "@material-ui/core";
import { Component } from "react";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Paper } from "@material-ui/core";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Session } from "../models/models";
import APIURL from "../lib/environment";

interface InitialState {
  email: string;
  password: string;
}

interface Props  extends RouteComponentProps{
  updateSession(newSession: Session): any;

}

class Login extends Component<Props, InitialState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (values: any, { props = this.props, setSubmitting }: any) => {
    fetch(`${APIURL}/users/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: values.email,
        password: values.password
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const session: Session = {
        token: data.token,
        user: {
          id:        data.user.id,
          email:     data.user.email,
          firstName: data.user.firstName,
          lastName:  data.user.lastName,
          role:      data.user.role,
          businessId: data.user.business?.id, 
          customerId: data.user.customer?.id,
        }
      }
      this.props.updateSession(session)
      this.props.history.push(`/${data.user.role}/dashboard`);
    })
    setSubmitting(false);
  };

  render() {
    const validationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
      password: yup
        .string()
        .required("Please enter a password")
        .min(8, "Password must be a minimum of 8 characters"),
    });

    return (
      
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "25vw" }}>
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
            render={(formProps) => {
              const {
                values: { email, password },
                errors,
                touched,
                handleChange,
                setFieldTouched,
              } = formProps;

              const change = (name: any, e: any) => {
                e.persist();
                handleChange(e);
                setFieldTouched(name, true, false);
              };

              return (
                <Form style={{ padding: "40px" }}>
                  <Typography variant='h4' color='primary' gutterBottom>
                    Login
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    style={{ paddingBottom: "30px" }}
                  >
                    Don't have an account?{" "}
                    <Link to='/register'>Register here</Link>
                  </Typography>

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='email'
                    variant='outlined'
                    name='email'
                    label='Email'
                    helperText={touched.email ? errors.email : ""}
                    error={touched.email && Boolean(errors.email)}
                    value={email}
                    onChange={change.bind(null, "email")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='password'
                    variant='outlined'
                    name='password'
                    label='Create a password'
                    helperText={touched.password ? errors.password : ""}
                    error={touched.password && Boolean(errors.password)}
                    value={password}
                    onChange={change.bind(null, "password")}
                    fullWidth
                  />
                  <Button
                    style={{ marginBottom: "10px", padding: "10px" }}
                    size='large'
                    type='submit'
                    variant='contained'
                    color='primary'
                    fullWidth
                    disabled={formProps.isSubmitting}
                  >
                    Login
                  </Button>
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <Button
                      
                      size='large'
                      type='submit'
                      variant='outlined'
                      color='primary'
                      fullWidth
                      disabled={formProps.isSubmitting}
                    >
                      Cancel
                    </Button>
                  </Link>
                </Form>
              );
            }}
          />
        </Paper>
      </div>
    );
  }
}

export default withRouter(Login);
