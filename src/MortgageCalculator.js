import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Button, Form as BootstrapForm, Card, Row, Col, Container } from 'react-bootstrap';
import NavigationBar from './Components/Navbar/NavigationBar';

const MortgageCalculator = () => {
  const calculateMonthlyPayment = (values) => {
    const loanAmount = values.propertyPrice - values.deposit;
    const monthlyInterestRate = values.interestRate / 100 / 12;
    const numPayments = values.loanTerm * 12;

    const monthlyPayment =
      (loanAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -numPayments));

    return parseFloat(monthlyPayment.toFixed(2));
  };

  return (
    <>
    <NavigationBar/>
     <Container>
      <Row>
        <Col xs={6}>
        <Formik
  initialValues={{
    propertyPrice: 100000,
    deposit: 20000,
    loanTerm: 30,
    interestRate: 5.94,
    monthlyPayment: null,
  }}
  onSubmit={(values, { setSubmitting, setFieldValue }) => {
    const monthlyPayment = calculateMonthlyPayment(values);
    setFieldValue('monthlyPayment', monthlyPayment);
    setSubmitting(false);
  }}
>
  {({ values }) => (
    <Form>
      <h2>Home Loan Repayment Calculator</h2>
      <p>This calculator helps you estimate your monthly loan repayments.</p>

      {/* Estimated Property Price Field */}
      <BootstrapForm.Group>
        <BootstrapForm.Label>Estimated Property Price ($):</BootstrapForm.Label>
        <Field type="number" name="propertyPrice" as={BootstrapForm.Control} />
      </BootstrapForm.Group>

      {/* Your Deposit Field */}
      <BootstrapForm.Group>
        <BootstrapForm.Label>Your Deposit ($):</BootstrapForm.Label>
        <Field type="number" name="deposit" as={BootstrapForm.Control} />
      </BootstrapForm.Group>

      {/* Loan Term Field */}
      <BootstrapForm.Group>
        <BootstrapForm.Label>Loan Term (years):</BootstrapForm.Label>
        <Field type="number" name="loanTerm" as={BootstrapForm.Control} />
      </BootstrapForm.Group>

      {/* Interest Rate Field */}
      <BootstrapForm.Group>
        <BootstrapForm.Label>Interest Rate (%):</BootstrapForm.Label>
        <Field type="number" name="interestRate" as={BootstrapForm.Control} />
      </BootstrapForm.Group>

      {/* Calculate Button */}
      <Button type="submit">Calculate</Button>

      {/* Monthly Payment Result */}
      {values.monthlyPayment && (
        <Card style={{ marginTop: '30px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)', height: '50px' }}>
          <Card.Body>
            <Card.Text>The estimated monthly repayment is: ${values.monthlyPayment} / month</Card.Text>
          </Card.Body>
        </Card>
      )}
    </Form>
  )}
</Formik>

        </Col>
      </Row>
      <img
      src='https://res.akamaized.net/domain/image/upload/t_web/v1604624704/Screen_Shot_2020-11-06_at_12.02.30_PM_dhnzsl.png'
      style={{ position: 'absolute', left: '55%', top: '38%' ,width:'470px'}}
      alt="Right-aligned Image"
    />
     
    </Container>
    </>
   
  );
};

export default MortgageCalculator;
