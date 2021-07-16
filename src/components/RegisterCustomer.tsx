import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { Paper } from "@material-ui/core";
import { Link } from "react-router-dom";

interface InitialState {
  firstName: string;
  lastName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
}

class RegisterCustomer extends Component<{}, InitialState> {
  constructor(props: any) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phone: "",
      street: "",
      city: "",
      state: "",
      zip: "",
      email: "",
      password: "",
    };
  }

  handleSubmit = (values: any, { props = this.props, setSubmitting }: any) => {
    alert("Submitting form");
    setSubmitting(false);
    return;
  };

  render() {
    const validationSchema = yup.object().shape({
      firstName: yup
        .string()
        .max(40, "Please enter no more than 40 characters")
        .required("Please enter your first name"),
      lastName: yup
        .string()
        .max(40, "Please enter no more than 40 characters")
        .required("Please enter a last name"),
      email: yup
        .string()
        .email("Please enter a valid email")
        .required("Please enter an email"),
      phone: yup.string().required("Please enter a phone number"),
      street: yup.string().required("Please enter a street"),
      city: yup.string().required("Please enter a city"),
      zip: yup.string().required("Please enter a zip"),
      password: yup
        .string()
        .required("Please enter a password")
        .min(8, "Password must be a minimum of 8 characters"),
    });

    return (
      <div>
        <Paper>
          <Formik
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
            render={(formProps) => {
              const {
                values: {
                  firstName,
                  lastName,
                  phone,
                  street,
                  city,
                  state,
                  zip,
                  email,
                  password,
                },
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
                    Create a Customer Account
                  </Typography>
                  <Typography
                    variant='subtitle1'
                    color='textSecondary'
                    style={{ paddingBottom: "30px" }}
                  >
                    Already have an account?{" "}
                    <Link to='/login'>Log in here</Link>
                  </Typography>
                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    id='firstName'
                    name='firstName'
                    label='First Name'
                    helperText={touched.firstName ? errors.firstName : ""}
                    error={touched.firstName && Boolean(errors.firstName)}
                    value={firstName}
                    onChange={change.bind(null, "firstName")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    name='lastName'
                    label='Last Name'
                    helperText={touched.lastName ? errors.lastName : ""}
                    error={touched.lastName && Boolean(errors.lastName)}
                    value={lastName}
                    onChange={change.bind(null, "lastName")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    name='street'
                    label='Address'
                    helperText={touched.street ? errors.street : ""}
                    error={touched.street && Boolean(errors.street)}
                    value={street}
                    onChange={change.bind(null, "street")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    name='city'
                    label='City'
                    helperText={touched.city ? errors.city : ""}
                    error={touched.city && Boolean(errors.city)}
                    value={city}
                    onChange={change.bind(null, "city")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    name='state'
                    label='State'
                    helperText={touched.firstName ? errors.state : ""}
                    error={touched.state && Boolean(errors.state)}
                    value={state}
                    onChange={change.bind(null, "state")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    name='zip'
                    label='Zip'
                    helperText={touched.zip ? errors.zip : ""}
                    error={touched.zip && Boolean(errors.zip)}
                    value={zip}
                    onChange={change.bind(null, "zip")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='text'
                    variant='outlined'
                    name='phone'
                    label='Phone number'
                    helperText={touched.phone ? errors.phone : ""}
                    error={touched.phone && Boolean(errors.phone)}
                    value={phone}
                    onChange={change.bind(null, "phone")}
                    fullWidth
                  />

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
                    Register
                  </Button>
                  <Link to='/'style={{ textDecoration: 'none' }}>
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

export default RegisterCustomer;
