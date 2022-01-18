import React from 'react'
import PropTypes from 'prop-types'
import postRequest from '../utils/postRequest'

export default function CloudinaryUploadWidget({ text, onSuccessHandler, publicId, uploadPreset, aspectRatio  }) {

  React.useEffect(async () => {
    const response = await fetch('/api/storage/details')
    const data = await response.json()

    function generateSignature(callback, paramsToSign) {
      postRequest('/api/storage/sign', paramsToSign)
        .then(signature => callback(signature))
    }

    const options = {
      cloudName: data.cloudName,
      apiKey: data.apiKey,
      publicId,
      uploadSignature: generateSignature,
      uploadPreset,
      cropping: true,
      croppingAspectRatio: aspectRatio,
      multiple: false,
      maxFiles: 1,
      sources: ['local', 'camera', 'url'],
      clientAllowedFormats: 'image',
      styles: {
        fonts: {
          default: null,
          '"Poppins", sans-serif': {
            url: 'https://fonts.googleapis.com/css?family=Poppins',
            active: true
          }
        }
      },
    }

    const myWidget = window.cloudinary.createUploadWidget(options, (err, result) => {
      if (err) {
        console.log('An error has occured: ', err)
      } else if (result.event === 'success') {
        onSuccessHandler(result.info)
      }
    })
    document.getElementById('upload_widget').addEventListener('click', () => myWidget.open())
  }, [])

  return (
    <button id='upload_widget' className='btn primary mt-4 text-xl h-10 w-40'>
      {text}
    </button>
  )
}

CloudinaryUploadWidget.propTypes = {
  text: PropTypes.string.isRequired,
  onSuccessHandler: PropTypes.func.isRequired,
  publicId: PropTypes.any.isRequired,
  uploadPreset: PropTypes.string.isRequired,
  aspectRatio: PropTypes.number.isRequired,
}