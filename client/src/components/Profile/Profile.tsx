import React, { useState } from 'react'
import './Profile.css'

const ProfilePage: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]

    if (file) {
      const maxSizeInPixels = 150
      const image = new Image()

      image.onload = () => {
        if (image.width > maxSizeInPixels || image.height > maxSizeInPixels) {
          const canvas = document.createElement('canvas')
          const context = canvas.getContext('2d')!

          const aspectRatio = image.width / image.height

          if (image.width > image.height) {
            canvas.width = maxSizeInPixels
            canvas.height = maxSizeInPixels / aspectRatio
          } else {
            canvas.width = maxSizeInPixels * aspectRatio
            canvas.height = maxSizeInPixels
          }

          context.drawImage(image, 0, 0, canvas.width, canvas.height)
          const resizedDataURL = canvas.toDataURL('image/jpeg')

          setProfilePicture(resizedDataURL)
          setErrorMessage(null)
        } else {
          setProfilePicture(URL.createObjectURL(file))
          setErrorMessage(null)
        }
      }

      image.src = URL.createObjectURL(file)
    }
  }

  return (
    <div className="profile-container">
      <header>
        <h1>User Profile</h1>
      </header>
      <section>
        <label htmlFor="profilePictureInput">
          <img
            src={profilePicture || 'default-profile-picture.jpg'}
            alt="Profile Picture"
          />
          <input
            type="file"
            id="profilePictureInput"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <h2>John Doe</h2>
        <p>Email: john.doe@example.com</p>
        <p>Location: City, Country</p>
        <p>
          Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          eget justo vel purus accumsan consectetur. Duis non ante vel lacus
          venenatis varius ac vel odio.
        </p>
      </section>
    </div>
  )
}

export default ProfilePage
