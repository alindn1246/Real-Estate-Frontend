import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import { FaFacebookF, FaTwitter, FaGoogle, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Footer.css'



export default function Footer() {
  return (
    <MDBFooter className=' FooterDesign   text-center text-lg-start text-muted  text-white'>
      <section className=' TopFooterSection d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
  <a href='' className='me-4 '>
    <FaFacebookF />
  </a>
  <a href='' className='me-4 '>
    <FaTwitter />
  </a>
  <a href='' className='me-4 '>
    <FaGoogle />
  </a>
  <a href='' className='me-4 '>
    <FaInstagram />
  </a>
  <a href='' className='me-4 '>
    <FaLinkedin />
  </a>
  <a href='' className='me-4 '>
    <FaGithub />
  </a>
</div>
      </section>

      <section className='MiddleFooterSection'>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
               Mi-Casa Real Estate
              </h6>
              <p>
              Mi-Casa Group is a leading Australian property marketplace made-up of a portfolio of brands.
               We are united in our Purpose to inspire confidence in life’s property decisions.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Find property</h6>
              <p className='myspecfic'>
                <a href='#!' className='myspecfic '>
                Buy
                </a>
              </p>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                  Rent
                </a>
              </p>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                House & Land
                </a>
              </p>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                Rural
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                Agent
                </a>
              </p>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                Property News
                </a>
              </p>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                Living
                </a>
              </p>
              <p  className='myspecfic'>
                <a href='#!' className='myspecfic'>
                MortgageCalculator
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p  className='myspecfic'>
                <MDBIcon icon="home" className="me-2" />
                Sydney, nsw 10012, au
              </p>
              <p  className='myspecfic'>
                <MDBIcon icon="envelope" className="me-3" />
                MiCasa1990@gmail.com
              </p>
              <p  className='myspecfic'>
                <MDBIcon icon="phone" className="me-3" /> + 01 234 567 88
              </p>
              <p  className='myspecfic'>
                <MDBIcon icon="print" className="me-3" /> + 01 234 567 89
              </p>
            </MDBCol>
          </MDBRow>
         
        </MDBContainer>
      
      </section>
      <div className=' LastFooterSection text-center p-3' >
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='myspecfic' href='https://mdbootstrap.com/'>
          Mi-Casa
        </a>
      </div>
    
    </MDBFooter>
  );
}