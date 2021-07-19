import { Button, MenuItem, TextField } from "@material-ui/core";
import React, { Component } from "react";
import { Typography } from "@material-ui/core";
import * as yup from "yup";
import { Formik, FormikProps, Form, Field, ErrorMessage } from "formik";
import { Paper } from "@material-ui/core";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { rewardTypes, Session } from "../models/models";
import APIURL from "../lib/environment";

interface InitialState {
  name: string;
  numOfPunches: number;
  rewardType: number;
  rewardAmount: number;
  id?: number;
}

interface Params {
  id: string;
}

interface Props extends RouteComponentProps<Params> {
  session: Session;
}

class LoyaltyForm extends Component<Props, InitialState> {
  constructor(props: Props) {
    super(props);

    const loyalty_id = this.props.match.params.id;

    const id =
      loyalty_id === null || isNaN(parseInt(loyalty_id))
        ? 0
        : parseInt(loyalty_id);
    this.state = {
      name: "",
      numOfPunches: 0,
      rewardType: 0,
      rewardAmount: 0,
      id: id,
    };
  }

  handleSubmit = (values: any, { props = this.props, setSubmitting }: any) => {

const url = values.id > 0 ? `${APIURL}/programs/${values.id}` : `${APIURL}/programs`
const method = values.id > 0 ? 'PUT' : 'POST'
    fetch(url, {
      method: method,
      body: JSON.stringify({
        name: values.name,
        numOfPunches: values.numOfPunches,
        rewardType: values.rewardType,
        rewardAmount: values.rewardAmount,
        busId: this.props.session.user?.businessId ?? 0,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.session.token,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('response data: ', data);
        this.props.history.push(`/business/dashboard`);
      })
      .catch((error) => {
        console.log(error);
      }); 
    setSubmitting(false);
  };

  getFormData = () => {
    fetch(`${APIURL}/programs/${this.state.id}`, {
      method: "GET",
      
      headers: new Headers({
        "Content-Type": "application/json",
        "Authorization": this.props.session.token
      }),
    })
      .then((response) => response.json())
      .then((program) => {
        console.log(program);
        this.setState(program[0])
       
      });
  }

  componentDidMount() {
    if((this.state.id ?? 0) > 0 ) {
      this.getFormData();
    }
    
  }




  render() {
    const validationSchema = yup.object().shape({
      name: yup
        .string()
        .required("Please enter an name for your loyalty program"),
      numOfPunches: yup
        .number()
        .required("Please enter a value greater than zero"),
      rewardType: yup.number().required("Please select a reward type"),
      rewardAmount: yup.number().required("Please enter a reward amount"),
    });


    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Paper style={{ width: "25vw" }}>
          <Formik
            enableReinitialize
            initialValues={this.state}
            validationSchema={validationSchema}
            onSubmit={this.handleSubmit}
            render={(formProps) => {
              const {
                values: { name, numOfPunches, rewardType, rewardAmount, id },
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
                  {this.state.id === 0 ? `Create a` : `Update Your`} Loyalty Program
                  </Typography>

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='name'
                    variant='outlined'
                    name='name'
                    label='Name of Loyalty Program'
                    helperText={touched.name ? errors.name : ""}
                    error={touched.name && Boolean(errors.name)}
                    value={name}
                    onChange={change.bind(null, "name")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='number'
                    variant='outlined'
                    name='numOfPunches'
                    label='Number of punches needed for reward'
                    helperText={touched.numOfPunches ? errors.numOfPunches : ""}
                    error={touched.numOfPunches && Boolean(errors.numOfPunches)}
                    value={numOfPunches}
                    onChange={change.bind(null, "numOfPunches")}
                    fullWidth
                  />

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    select
                    name='rewardType'
                    variant='outlined'
                    label='Select Reward Type'
                    helperText={touched.rewardType ? errors.rewardType : ""}
                    error={touched.rewardType && Boolean(errors.rewardType)}
                    value={rewardType}
                    onChange={change.bind(null, "rewardType")}
                    fullWidth
                  >
                    {rewardTypes.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    style={{ paddingBottom: "20px" }}
                    type='number'
                    variant='outlined'
                    name='rewardAmount'
                    label='Reward Amount (enter a number to represent % Off, $ Off, or # of free product'
                    helperText={touched.rewardAmount ? errors.rewardAmount : ""}
                    error={touched.rewardAmount && Boolean(errors.rewardAmount)}
                    value={rewardAmount}
                    onChange={change.bind(null, "rewardAmount")}
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
                    {this.state.id === 0 ? `Create` : `Update`} your loyalty
                    program
                  </Button>
                  <Link
                    to='/business/dashboard'
                    style={{ textDecoration: "none" }}
                  >
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

export default withRouter(LoyaltyForm);
