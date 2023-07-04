import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@mui/material';

function DeleteConfirmationDialog({ open, onClose, onDelete,rowDatas }) {
  const handleClose = () => {
    onClose(false);
  };

  const handleDelete = (rowDatas) => {
    onDelete(rowDatas);
    onClose(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Xác nhận xóa</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn có chắc chắn muốn xóa? (Hành động này không thể hoàn tác.)
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button onClick={()=>handleDelete(rowDatas)} color="secondary" autoFocus>
          Xóa
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default DeleteConfirmationDialog