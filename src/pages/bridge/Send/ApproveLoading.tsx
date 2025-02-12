import { makeStyles } from "tss-react/mui"

import CloseIcon from "@mui/icons-material/Close"
import { CircularProgress, Dialog, DialogContent, DialogTitle, IconButton, Typography } from "@mui/material"

import { useRainbowContext } from "@/contexts/RainbowProvider"

const useStyles = makeStyles()(theme => {
  return {
    title: {
      padding: "2.4rem 2.8rem",
    },
    closeButton: {
      padding: 0,
    },
    content: {
      textAlign: "center",
    },
    section: {
      padding: "0.8rem 6.2rem 5rem",
      [theme.breakpoints.up("sm")]: {
        padding: "0.8rem 4.2rem 4rem",
      },
    },
  }
})

const ApproveLoading = props => {
  const { open, onClose } = props
  const { walletName } = useRainbowContext()
  const { classes } = useStyles()

  return (
    <Dialog open={open} disableScrollLock>
      <DialogTitle className={classes.title}>
        <div className="flex justify-end">
          {onClose ? (
            <IconButton
              sx={[
                theme => ({
                  color: "text.primary",
                  "&:hover": {
                    backgroundColor: theme.palette.background.default,
                  },
                }),
              ]}
              onClick={onClose}
            >
              <CloseIcon />
            </IconButton>
          ) : null}
        </div>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <CircularProgress
          size={50}
          thickness={3}
          sx={{
            color: "tagSuccess.main",
            mb: "2.4rem",
          }}
        ></CircularProgress>
        <Typography variant="h4" gutterBottom>
          Pending Approve
        </Typography>
        <div className={classes.section}>
          <Typography variant="body1" gutterBottom sx={{ fontWeight: 600 }}>
            Approve USDC
          </Typography>
          <Typography variant="body1">Approve on your {walletName} wallet</Typography>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ApproveLoading
