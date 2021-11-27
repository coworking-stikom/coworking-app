import { forwardRef, useImperativeHandle, useState } from 'react'

import { motion, AnimatePresence } from 'framer-motion'

const Modals = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false)
  useImperativeHandle(ref, () => {
    return {
      open: () => setOpen(true),
      close: () => setOpen(false)
    }
  })
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 0.5,
              transition: {
                duration: 0.3
              }
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0.3
              }
            }}
            onClick={() => setOpen(false)}
            className="modal-backdrop fade"
          />
          <motion.div
            initial={{
              scale: 0
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{
              scale: 0,
              transition: {
                delay: 0.3
              }
            }}
            style={{
              zIndex: 1999,
              position: 'fixed',
              right: 0,
              left: 0,
              marginRight: 'auto',
              marginLeft: 'auto',
              minHeight: '10em',
            }}
            className={'modal-dialog'}
          >
            <motion.div
              className="modal-content"
              initial={{
                x: 100,
                opacity: 0
              }}
              animate={{
                x: 0,
                opacity: 1,
                transition: {
                  delay: 0.3,
                  duration: 0.3
                }
              }}
              exit={{
                x: 100,
                opacity: 0,
                transition: {
                  duration: 0.3
                }
              }}
            >
              {props.children}
            </motion.div>
          </motion.div>
          <style jsx>{`
            .custom-modal {
              transform: translate(-50%, -50%) !important;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  )
})

export default Modals
