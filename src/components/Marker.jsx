import React from 'react';
import styled from 'styled-components';

const MarkerStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 18px;
  height: 18px;

  border-radius: 100%;
  user-select: none;
  transform: translate(-50%, -50%);
`;


class Marker extends React.Component {

  render() {
    return (
      <MarkerStyle>
        <img src="https://i.imgur.com/1Kzw486.png" alt="sushi"/>
      </MarkerStyle>
    )
  }
}
export default Marker;
