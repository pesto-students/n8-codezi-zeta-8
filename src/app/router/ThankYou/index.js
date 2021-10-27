import { Container } from 'react-bootstrap'
import thankyou from 'thankyou.png'

export default function Thankyou() {
   return (
      <Container className="main">
         <div className="d-flex align-items-center flex-column mb-5">
            <img
               src={thankyou}
               width="300"
               height="350"
               className="img-fluid"
               alt="thankyou"
            />
            <p className="thankyou-title">
               We will sent and result on your email soon.
            </p>
         </div>
      </Container>
   )
}
