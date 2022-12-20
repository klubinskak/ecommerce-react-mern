import styled from 'styled-components';


const Container = styled.div`
    height: 40px;
    background-color: #b08968;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;

`



const Announcement = () => {
  return (
    <Container>
      SALE! SUPER DEAL! Free Shipping an orders over $50!! 😵
    </Container>
  )
}

export default Announcement