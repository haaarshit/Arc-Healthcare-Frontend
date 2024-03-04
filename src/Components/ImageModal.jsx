import { Avatar } from '@material-tailwind/react'
import { Box, Modal } from '@mui/material'
import React from 'react'

function ImageModal({ isAvatarModal, handleClick, avatar }) {

  return (
    <div>
      <Modal
        open={isAvatarModal}
        onClose={handleClick}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        className='flex items-center justify-center p-1 '
      >
        <Box className='relative border  border-none'>
          <Avatar src={avatar} className='h-[60vh] w-[60vh]' />
        </Box>
      </Modal>
    </div>
  )
}

export default ImageModal
