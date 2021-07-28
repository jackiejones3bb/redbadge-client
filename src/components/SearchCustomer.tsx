import { Button, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { Paper } from "@material-ui/core";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { Session } from "../models/models";
import APIURL from "../lib/environment";

interface InitialState {
  searchTerm: string;
  results?: any[];
}

interface Props extends RouteComponentProps {
  session: Session;
}

class SearchCustomer extends Component<Props, InitialState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearch = (values: any, { props = this.props, setSubmitting }: any) => {
    fetch(`${APIURL}/customers/search`, {
      method: "POST",
      body: JSON.stringify({
        searchTerm: values.searchTerm,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        this.setState({
          searchTerm: values.searchTerm,
          results: data,
        });
      });
    setSubmitting(false);
  };

  render() {
    const validationSchema = yup.object().shape({
      searchTerm: yup.string().required("Please enter a customer name"),
    });

    return (
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Paper style={{ width: "25vw" }}>
            <Formik
              initialValues={this.state}
              validationSchema={validationSchema}
              onSubmit={this.handleSearch}
              render={(formProps) => {
                const {
                  values: { searchTerm },
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
                      Search by customer name
                    </Typography>

                    <TextField
                      style={{ paddingBottom: "20px" }}
                      type='text'
                      variant='outlined'
                      name='searchTerm'
                      label='Enter customer name'
                      helperText={touched.searchTerm ? errors.searchTerm : ""}
                      error={touched.searchTerm && Boolean(errors.searchTerm)}
                      value={searchTerm}
                      onChange={change.bind(null, "searchTerm")}
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
                      Search
                    </Button>
                    <Link to='/' style={{ textDecoration: "none" }}>
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
        <div   style={{ display: "flex", justifyContent: "center"}}>
          <div
          style={{ width: "25vw", marginTop: "50px"}}
          >
            {this.state.results?.map((customer) => {
              return (
                <div style={{ display: "flex", justifyContent: "start", marginTop: "15px" }}>
                  <Typography>{`${customer.user.lastName}, ${customer.user.firstName}, ${customer.street}, ${customer.city}, ${customer.state}, ${customer.zip}`}</Typography>{" "}
                  <Link to={`/business/customer-details/${customer.id}`} style={{marginLeft: "20px"}}>
                    Edit Rewards
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchCustomer);
