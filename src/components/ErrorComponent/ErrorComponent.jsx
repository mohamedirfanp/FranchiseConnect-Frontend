import React from 'react'


function parseGrpcErrorMessage(grpcErrorMessage) {
  const detailRegex = /Detail="([^"]+)"/;

  const detailMatch = grpcErrorMessage.match(detailRegex);

  const detail = detailMatch ? detailMatch[1] : 'Unknown';

  return {
    detail,
  };
}

function ErrorComponent(props) {
    const {message} = props;
    const errorMessage = parseGrpcErrorMessage(message.data);
  return (
    <span className='text-red-600 font-light'>Oops! {errorMessage.detail}</span>
  )
}

export default ErrorComponent
